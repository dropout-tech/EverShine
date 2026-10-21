-- 執行環境：Supabase SQL Editor（可重複執行時請先確認物件是否已存在）
--
-- 1) members：允許本人將自己的綁定清空（改認領 / 換帳號前需先解除綁定）
-- 2) cms_pages：BlockNote JSON 內容之簡易 CMS

-- ---------------------------------------------------------------------------
-- PART A: RLS — members_self_update：允許本人將 user_id 清空（解除綁定後可改認領）
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "members_self_update" ON public.members;

CREATE POLICY "members_self_update"
  ON public.members FOR UPDATE
  USING ( CAST(user_id AS text) = CAST(auth.uid() AS text) )
  WITH CHECK (
    CAST(user_id AS text) = CAST(auth.uid() AS text)
    OR user_id IS NULL
  );

-- 說明：USING 僅限「目前列屬於本人」；WITH CHECK 允許更新後仍為本人，或改為未綁定 (NULL)。
-- 無法將 user_id 改成他人 UUID。

-- ---------------------------------------------------------------------------
-- PART B: cms_pages
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cms_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL DEFAULT '',
  content jsonb NOT NULL DEFAULT '[]'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users (id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS cms_pages_slug_idx ON public.cms_pages (slug);

ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "cms_pages_public_read" ON public.cms_pages;
DROP POLICY IF EXISTS "cms_pages_admin_write" ON public.cms_pages;

CREATE POLICY "cms_pages_public_read"
  ON public.cms_pages FOR SELECT
  USING (true);

CREATE POLICY "cms_pages_admin_write"
  ON public.cms_pages FOR ALL
  USING ( public.is_admin() )
  WITH CHECK ( public.is_admin() );
