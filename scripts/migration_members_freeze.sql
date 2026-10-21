-- ============================================================
-- Migration: members.status / membership_type — 冷凍會員（離會 / 信用狀）
-- ============================================================
-- 使用方式：在 Supabase Dashboard → SQL Editor 貼上並執行。
-- 本檔為 idempotent，可重複執行安全。
--
-- 設計原則：
--   * 不真的刪除會員，資料永久保留做歷史依據。
--   * status='active' 為在籍；status='frozen' 為冷凍（離會/信用狀）。
--   * 冷凍後：
--       - 前台 / 認領清單不顯示
--       - 本人即使仍綁定 user_id 也不能自己改資料（RLS 擋下）
--       - claim_member RPC 也拒絕認領
--       - 產業名額視為釋出（因應用端 count 只計 active）
--   * membership_type：冷凍原因，'resigned'=離會、'credit_hold'=信用狀
-- ============================================================


-- ============================================================
-- PART 1: 新增欄位
-- ============================================================
ALTER TABLE public.members
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS membership_type text,
  ADD COLUMN IF NOT EXISTS frozen_at timestamptz,
  ADD COLUMN IF NOT EXISTS frozen_by uuid;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'members_status_check'
  ) THEN
    ALTER TABLE public.members
      ADD CONSTRAINT members_status_check
      CHECK (status IN ('active', 'frozen'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'members_membership_type_check'
  ) THEN
    ALTER TABLE public.members
      ADD CONSTRAINT members_membership_type_check
      CHECK (
        membership_type IS NULL
        OR membership_type IN ('resigned', 'credit_hold')
      );
  END IF;
END$$;

-- 僅對冷凍者建索引（熱資料 active 量大，不需要 index）
CREATE INDEX IF NOT EXISTS members_frozen_idx
  ON public.members (status)
  WHERE status = 'frozen';


-- ============================================================
-- PART 2: 更新 RLS — 冷凍會員本人不得自行更新
-- ============================================================
DROP POLICY IF EXISTS "members_self_update" ON public.members;

CREATE POLICY "members_self_update"
  ON public.members FOR UPDATE
  USING (
    CAST(user_id AS text) = CAST(auth.uid() AS text)
    AND COALESCE(status, 'active') = 'active'
  )
  WITH CHECK (
    (
      CAST(user_id AS text) = CAST(auth.uid() AS text)
      OR user_id IS NULL
    )
    AND COALESCE(status, 'active') = 'active'
  );
-- 說明：
--   admin 的 members_admin_update / members_admin_delete 不變，
--   讓管理員仍可凍結、解凍、或修正冷凍會員資料。


-- ============================================================
-- PART 3: claim_member RPC — 拒絕認領冷凍會員
-- ============================================================
CREATE OR REPLACE FUNCTION public.claim_member(p_member_id bigint, p_email_proof text DEFAULT '')
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  m RECORD;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  SELECT id, email, user_id, status
    INTO m
    FROM public.members
   WHERE id = p_member_id
   FOR UPDATE;

  IF m.id IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_found');
  END IF;

  -- 冷凍會員一律拒絕認領
  IF COALESCE(m.status, 'active') <> 'active' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'member_frozen');
  END IF;

  IF m.user_id IS NOT DISTINCT FROM auth.uid() THEN
    RETURN jsonb_build_object('ok', true, 'already_yours', true);
  END IF;

  IF m.user_id IS NOT NULL
     AND lower(btrim(COALESCE(m.email, ''))) <> lower(btrim(COALESCE(p_email_proof, ''))) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'email_mismatch');
  END IF;

  IF m.user_id IS NULL THEN
    UPDATE public.members SET user_id = auth.uid()
     WHERE id = p_member_id AND user_id IS NULL;
    IF FOUND THEN
      RETURN jsonb_build_object('ok', true);
    END IF;
    RETURN jsonb_build_object('ok', false, 'error', 'race_or_claimed');
  END IF;

  IF m.email IS NULL OR btrim(m.email) = '' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'no_email_on_file');
  END IF;

  UPDATE public.members SET user_id = auth.uid() WHERE id = p_member_id;
  RETURN jsonb_build_object('ok', true);
END;
$$;

REVOKE ALL ON FUNCTION public.claim_member(bigint, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.claim_member(bigint, text) TO authenticated;

COMMENT ON FUNCTION public.claim_member IS
  '會員認領：冷凍(status<>active) 一律拒絕；未認領直接綁定；已認領須 Email 驗證後換綁至目前 auth.uid()';


-- ============================================================
-- 驗證
-- ============================================================
SELECT column_name, data_type, column_default, is_nullable
  FROM information_schema.columns
 WHERE table_schema = 'public'
   AND table_name   = 'members'
   AND column_name IN ('status','membership_type','frozen_at','frozen_by')
 ORDER BY column_name;
