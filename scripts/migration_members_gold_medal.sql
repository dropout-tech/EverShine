-- ============================================================
-- Migration: members.has_gold_medal — 金質獎章（舊版 boolean）
-- ============================================================
-- 建議改執行 migration_members_gold_medal_count.sql（支援雙金質 count=2）。
-- 本檔僅建立 has_gold_medal 欄位，供尚未升級的環境使用。
-- ============================================================

ALTER TABLE public.members
    ADD COLUMN IF NOT EXISTS has_gold_medal boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN public.members.has_gold_medal IS '金質獎章 — 分會年度卓越貢獻表揚';

-- 之後要把指定會員設為金質獎章，請執行：
--   UPDATE public.members SET has_gold_medal = true WHERE name = '李孟一';
-- 取消：
--   UPDATE public.members SET has_gold_medal = false WHERE name = '李孟一';

SELECT name, industry, has_gold_medal
FROM public.members
WHERE has_gold_medal = true
ORDER BY name;
