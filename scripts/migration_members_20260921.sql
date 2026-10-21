-- Approved member corrections, applied to production Supabase on 2026-09-21.
-- Preserve profiles, user bindings, categories and historical referrals.
-- Guard against overwriting subsequent changes when this script is repeated.
BEGIN;

UPDATE public.members
SET industry = '文創商業設計', "updatedAt" = now()
WHERE id = 41 AND name = '吳貞妮' AND industry = '插畫設計';

UPDATE public.members
SET status = 'frozen', membership_type = 'resigned',
    frozen_at = COALESCE(frozen_at, now()), "updatedAt" = now()
WHERE ((id = 62 AND name = '湯益承') OR (id = 1010 AND name = '吳儀沂'))
  AND status = 'active';

COMMIT;

SELECT id, name, industry, status, membership_type
FROM public.members WHERE id IN (41, 62, 1010) ORDER BY id;
