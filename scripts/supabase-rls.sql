-- ============================================================
-- BNI 分會官網 — Supabase RLS 完整策略
-- ============================================================
-- 使用方式：在 Supabase Dashboard → SQL Editor 貼上並執行
-- 可安全重複執行（DROP POLICY IF EXISTS）
--
-- 技巧：所有 user_id 與 auth.uid() 的比較
--       統一用 CAST 雙邊轉 text，相容 UUID 或 TEXT 欄位
--
-- 最後更新：2026-03-23
-- ============================================================


-- ============================================================
-- PART 0: 清除所有舊策略
-- ============================================================
DROP POLICY IF EXISTS "members_public_read" ON public.members;
DROP POLICY IF EXISTS "members_self_update" ON public.members;
DROP POLICY IF EXISTS "members_admin_update" ON public.members;
DROP POLICY IF EXISTS "members_admin_insert" ON public.members;
DROP POLICY IF EXISTS "members_admin_delete" ON public.members;
DROP POLICY IF EXISTS "members_claim_unclaimed" ON public.members;
DROP POLICY IF EXISTS "referrals_public_read" ON public.referrals;
DROP POLICY IF EXISTS "referrals_admin_insert" ON public.referrals;
DROP POLICY IF EXISTS "referrals_admin_update" ON public.referrals;
DROP POLICY IF EXISTS "referrals_admin_delete" ON public.referrals;
DROP POLICY IF EXISTS "homepage_stats_public_read" ON public.homepage_stats;
DROP POLICY IF EXISTS "homepage_stats_admin_upsert" ON public.homepage_stats;
DROP POLICY IF EXISTS "page_views_anyone_insert" ON public.page_views;
DROP POLICY IF EXISTS "page_views_admin_read" ON public.page_views;
DROP POLICY IF EXISTS "analytics_events_anyone_insert" ON public.analytics_events;
DROP POLICY IF EXISTS "analytics_events_admin_read" ON public.analytics_events;

-- 刪除舊版函式（避免簽名衝突）
DROP FUNCTION IF EXISTS public.is_admin();


-- ============================================================
-- PART 1: 輔助函式
-- ============================================================
CREATE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.members
    WHERE CAST(user_id AS text) = CAST(auth.uid() AS text)
      AND is_admin = true
  );
$$;


-- ============================================================
-- PART 2: members 表
-- ============================================================
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "members_public_read"
  ON public.members FOR SELECT
  USING (true);

CREATE POLICY "members_self_update"
  ON public.members FOR UPDATE
  USING ( CAST(user_id AS text) = CAST(auth.uid() AS text) )
  WITH CHECK (
    CAST(user_id AS text) = CAST(auth.uid() AS text)
    OR user_id IS NULL
  );

CREATE POLICY "members_admin_update"
  ON public.members FOR UPDATE
  USING ( public.is_admin() );

CREATE POLICY "members_admin_insert"
  ON public.members FOR INSERT
  WITH CHECK ( public.is_admin() );

CREATE POLICY "members_admin_delete"
  ON public.members FOR DELETE
  USING ( public.is_admin() );

-- 認領綁定 user_id 改由 public.claim_member() SECURITY DEFINER 處理（含已認領時之 Email 驗證）

-- ============================================================
-- PART 3: referrals 表
-- ============================================================
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "referrals_public_read"
  ON public.referrals FOR SELECT
  USING (true);

CREATE POLICY "referrals_admin_insert"
  ON public.referrals FOR INSERT
  WITH CHECK ( public.is_admin() );

CREATE POLICY "referrals_admin_update"
  ON public.referrals FOR UPDATE
  USING ( public.is_admin() );

CREATE POLICY "referrals_admin_delete"
  ON public.referrals FOR DELETE
  USING ( public.is_admin() );


-- ============================================================
-- PART 4: homepage_stats 表
-- ============================================================
ALTER TABLE public.homepage_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "homepage_stats_public_read"
  ON public.homepage_stats FOR SELECT
  USING (true);

CREATE POLICY "homepage_stats_admin_upsert"
  ON public.homepage_stats FOR ALL
  USING ( public.is_admin() )
  WITH CHECK ( public.is_admin() );


-- ============================================================
-- PART 5: page_views 表
-- ============================================================
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "page_views_anyone_insert"
  ON public.page_views FOR INSERT
  WITH CHECK (true);

CREATE POLICY "page_views_admin_read"
  ON public.page_views FOR SELECT
  USING ( public.is_admin() );


-- ============================================================
-- PART 6: analytics_events 表
-- ============================================================
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "analytics_events_anyone_insert"
  ON public.analytics_events FOR INSERT
  WITH CHECK (true);

CREATE POLICY "analytics_events_admin_read"
  ON public.analytics_events FOR SELECT
  USING ( public.is_admin() );


-- ============================================================
-- 驗證：確認 RLS 已啟用
-- ============================================================
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('members','referrals','homepage_stats','page_views','analytics_events')
ORDER BY tablename;
