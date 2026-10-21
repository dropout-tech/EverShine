-- 會員委員會會議紀錄：會議、議程項目、會後行動
-- 在 Supabase SQL Editor 執行一次即可；可重跑。
--
-- 會後行動不複製到下一次會議：前端依「來源會議日期 < 本次日期 且 尚未結案（或在本次之後才結案）」
-- 自動列為本次的「上次追蹤事項」，延到哪一次都只有一筆資料。
--
-- 權限：目前只有 is_admin 且在籍的會員可讀寫。之後要開放給委員會成員，只改 can_access_committee()。

CREATE OR REPLACE FUNCTION public.can_access_committee()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.members
    WHERE CAST(user_id AS text) = CAST(auth.uid() AS text)
      AND is_admin = true
      AND COALESCE(status, 'active') = 'active'
  );
$$;

CREATE OR REPLACE FUNCTION public.committee_touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TABLE IF NOT EXISTS public.committee_meetings (
    id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    meeting_date      date NOT NULL,
    title             text NOT NULL DEFAULT '會員委員會會議',
    recorder_id       bigint REFERENCES public.members(id) ON DELETE SET NULL,
    absent_member_ids bigint[] NOT NULL DEFAULT '{}',
    status            text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'finalized')),
    created_by        uuid DEFAULT auth.uid(),
    created_at        timestamptz NOT NULL DEFAULT now(),
    updated_at        timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.committee_agenda_items (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    meeting_id  uuid NOT NULL REFERENCES public.committee_meetings(id) ON DELETE CASCADE,
    section     text NOT NULL CHECK (section IN ('member_tracking', 'meeting_suggestion', 'special_discussion', 'other')),
    member_id   bigint REFERENCES public.members(id) ON DELETE SET NULL,
    content     text NOT NULL DEFAULT '',
    sort_order  integer NOT NULL DEFAULT 0,
    created_at  timestamptz NOT NULL DEFAULT now(),
    updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.committee_action_items (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    meeting_id          uuid NOT NULL REFERENCES public.committee_meetings(id) ON DELETE CASCADE,
    agenda_item_id      uuid REFERENCES public.committee_agenda_items(id) ON DELETE SET NULL,
    section             text NOT NULL CHECK (section IN ('member_tracking', 'meeting_suggestion', 'special_discussion', 'other')),
    content             text NOT NULL,
    owner_id            bigint REFERENCES public.members(id) ON DELETE SET NULL,
    due_date            date,
    status              text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'done', 'cancelled')),
    resolved_meeting_id uuid REFERENCES public.committee_meetings(id) ON DELETE SET NULL,
    resolved_at         timestamptz,
    resolution_note     text,
    created_at          timestamptz NOT NULL DEFAULT now(),
    updated_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS committee_meetings_date_idx ON public.committee_meetings (meeting_date DESC);
CREATE INDEX IF NOT EXISTS committee_agenda_items_meeting_idx ON public.committee_agenda_items (meeting_id, section, sort_order);
CREATE INDEX IF NOT EXISTS committee_action_items_meeting_idx ON public.committee_action_items (meeting_id);
CREATE INDEX IF NOT EXISTS committee_action_items_status_idx ON public.committee_action_items (status);

DROP TRIGGER IF EXISTS committee_meetings_touch ON public.committee_meetings;
CREATE TRIGGER committee_meetings_touch BEFORE UPDATE ON public.committee_meetings
  FOR EACH ROW EXECUTE FUNCTION public.committee_touch_updated_at();
DROP TRIGGER IF EXISTS committee_agenda_items_touch ON public.committee_agenda_items;
CREATE TRIGGER committee_agenda_items_touch BEFORE UPDATE ON public.committee_agenda_items
  FOR EACH ROW EXECUTE FUNCTION public.committee_touch_updated_at();
DROP TRIGGER IF EXISTS committee_action_items_touch ON public.committee_action_items;
CREATE TRIGGER committee_action_items_touch BEFORE UPDATE ON public.committee_action_items
  FOR EACH ROW EXECUTE FUNCTION public.committee_touch_updated_at();

ALTER TABLE public.committee_meetings     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.committee_agenda_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.committee_action_items ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.committee_meetings, public.committee_agenda_items, public.committee_action_items FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE
  ON public.committee_meetings, public.committee_agenda_items, public.committee_action_items
  TO authenticated;

DROP POLICY IF EXISTS "committee_meetings_access" ON public.committee_meetings;
CREATE POLICY "committee_meetings_access" ON public.committee_meetings
  FOR ALL TO authenticated
  USING ( public.can_access_committee() )
  WITH CHECK ( public.can_access_committee() );

DROP POLICY IF EXISTS "committee_agenda_items_access" ON public.committee_agenda_items;
CREATE POLICY "committee_agenda_items_access" ON public.committee_agenda_items
  FOR ALL TO authenticated
  USING ( public.can_access_committee() )
  WITH CHECK ( public.can_access_committee() );

DROP POLICY IF EXISTS "committee_action_items_access" ON public.committee_action_items;
CREATE POLICY "committee_action_items_access" ON public.committee_action_items
  FOR ALL TO authenticated
  USING ( public.can_access_committee() )
  WITH CHECK ( public.can_access_committee() );

NOTIFY pgrst, 'reload schema';

SELECT 'committee_meetings' AS table_name, count(*) FROM public.committee_meetings
UNION ALL SELECT 'committee_agenda_items', count(*) FROM public.committee_agenda_items
UNION ALL SELECT 'committee_action_items', count(*) FROM public.committee_action_items;
