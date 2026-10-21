-- ============================================================
-- Migration: homepage_stats 加 guest_count + 13 個月歷史 backfill
-- ============================================================
-- 目的：
--   1) 為 homepage_stats 新增「來賓人數」欄位
--   2) 一次補齊 2025-05 ~ 2026-05 共 13 個月的 引薦單/金額/來賓人數
--      — 2025-05 ~ 2025-12 來自原本 ResultsChart.tsx 寫死的數字
--      — 2026-01 ~ 2026-05 為使用者最新提供
--
-- 安全：UPSERT (ON CONFLICT month)，可重複執行不會產生重複資料；
--      若使用者先前已 INSERT 部分月份（沒有 guest_count），這份會自動補上。
-- ============================================================

BEGIN;

-- 1) 新增 guest_count 欄位（已存在會跳過）
ALTER TABLE public.homepage_stats
    ADD COLUMN IF NOT EXISTS guest_count integer NOT NULL DEFAULT 0;

COMMENT ON COLUMN public.homepage_stats.guest_count IS '當月來賓人數（出席例會的非會員）';

-- 2) UPSERT 13 個月歷史資料
INSERT INTO public.homepage_stats (month, referral_count, referral_value, guest_count)
VALUES
    -- 2025（從原 ResultsChart.tsx 硬編碼搬入）
    ('2025-05', 631, 15606645, 15),
    ('2025-06', 456,  2144319, 21),
    ('2025-07', 590,  9160680, 17),
    ('2025-08', 515, 11098799,  9),
    ('2025-09', 485,  2695123, 10),
    ('2025-10', 613, 11050631, 16),
    ('2025-11', 441,  6894708, 29),
    ('2025-12', 578, 28846258, 24),
    -- 2026
    ('2026-01', 401, 15257658, 23),
    ('2026-02', 301,  2358366, 13),
    ('2026-03', 431,  1747748, 10),
    ('2026-04', 604, 46034882, 16),
    ('2026-05', 412,  4779489, 16)
ON CONFLICT (month) DO UPDATE SET
    referral_count = EXCLUDED.referral_count,
    referral_value = EXCLUDED.referral_value,
    guest_count    = EXCLUDED.guest_count;

COMMIT;

-- 驗證：應該看到 13 筆，按月份遞減
SELECT month, referral_count, referral_value, guest_count
FROM public.homepage_stats
WHERE month BETWEEN '2025-05' AND '2026-05'
ORDER BY month DESC;
