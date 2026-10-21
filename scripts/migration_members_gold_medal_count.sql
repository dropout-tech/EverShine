-- ============================================================
-- Migration: members.gold_medal_count — 金質 / 雙金質獎章
-- ============================================================
-- gold_medal_count: 0 = 無，1 = 金質，2 = 雙金質（引薦 12 人加入）
-- has_gold_medal 保留相容（count >= 1 時為 true）
-- ============================================================

ALTER TABLE public.members
    ADD COLUMN IF NOT EXISTS gold_medal_count smallint NOT NULL DEFAULT 0;

ALTER TABLE public.members
    DROP CONSTRAINT IF EXISTS members_gold_medal_count_check;

ALTER TABLE public.members
    ADD CONSTRAINT members_gold_medal_count_check
    CHECK (gold_medal_count >= 0 AND gold_medal_count <= 9);

COMMENT ON COLUMN public.members.gold_medal_count IS '金質獎章數：0 無、1 金質、2 雙金質（引薦 12 人）';

-- 確保 has_gold_medal 欄位存在（舊 migration）
ALTER TABLE public.members
    ADD COLUMN IF NOT EXISTS has_gold_medal boolean NOT NULL DEFAULT false;

-- 先歸零，再依名單設定（可重複執行）
UPDATE public.members SET gold_medal_count = 0, has_gold_medal = false;

UPDATE public.members
SET gold_medal_count = 1, has_gold_medal = true
WHERE name IN (
    '吳介輝', '楊承樺', '杜宗樺', '江學洋',
    '何昇軒', '王執定', '郭家宏', '李彥慶'
);

UPDATE public.members
SET gold_medal_count = 2, has_gold_medal = true
WHERE name = '孫成育';

SELECT name, industry, gold_medal_count, has_gold_medal
FROM public.members
WHERE gold_medal_count > 0
ORDER BY gold_medal_count DESC, name;
