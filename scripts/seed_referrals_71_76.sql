-- EverShine 長輝白金分會：引薦案例 71–76（2026-07～08）
-- 可重複執行（ON CONFLICT 依 id 更新）
-- 在 Supabase Dashboard > SQL Editor 貼上執行
-- 編號 68–70 本批未收錄；補錄 A、B 待當事人確認，見 scripts/referrals_pending_confirm.json

BEGIN;

INSERT INTO public.referrals (id, title, description, referrer_name, referee_name, referrer_story, referee_story, metrics, created_at)
VALUES (
  'es-case-071',
  '空調工程 × 水電工程',
  '不把「順便做」硬吃下來，而是把信任一起交出去；客戶少等一次、少找一家。',
  '洪智威',
  '劉弼凱',
  '感謝夥伴的互助。我到客戶老公寓安裝冷氣時，發現電壓不足、有跳電風險，客戶另外還有增設插座的需求。這已經超出空調本業，我沒有硬接下來，第一時間想到弼凱，當場打電話請他來接手評估。',
  '感謝智威兄的信任跟引薦。老公寓電力本來就容易被忽略，夥伴在現場幫我把需求接過來，客戶配合度很高。我到場處理老宅電力不足與用電隱患，順利完成並取得客戶信任。',
  '{"amount": "已完成", "type": "空調工程 × 水電工程"}'::jsonb,
  '2026-07-08'::timestamptz
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  referrer_name = EXCLUDED.referrer_name,
  referee_name = EXCLUDED.referee_name,
  referrer_story = EXCLUDED.referrer_story,
  referee_story = EXCLUDED.referee_story,
  metrics = EXCLUDED.metrics,
  created_at = EXCLUDED.created_at;

INSERT INTO public.referrals (id, title, description, referrer_name, referee_name, referrer_story, referee_story, metrics, created_at)
VALUES (
  'es-case-072',
  '資訊弱電 × 展覽設計',
  '信任網絡加上快速回應：不是「再約下次」，是兩次會議就收案。',
  '施秉辰',
  '劉懿德',
  '這是我太太公司的案子，標的是大型生技產業展覽的展場設計。我很清楚懿德在展覽設計的專業，就直接對接，不用再比三家。雙方只見了兩次面，就確認承作，成交金額 50 萬。',
  '因為是夥伴自己的家人企業，需求講得清楚、信任也夠，兩次會面就把 50 萬的展場案定下來。感謝秉辰的精準引薦——不是「再約下次」，是兩次會議就收案。',
  '{"amount": "NT$50萬", "type": "資訊弱電 × 展覽設計"}'::jsonb,
  '2026-07-22'::timestamptz
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  referrer_name = EXCLUDED.referrer_name,
  referee_name = EXCLUDED.referee_name,
  referrer_story = EXCLUDED.referrer_story,
  referee_story = EXCLUDED.referee_story,
  metrics = EXCLUDED.metrics,
  created_at = EXCLUDED.created_at;

INSERT INTO public.referrals (id, title, description, referrer_name, referee_name, referrer_story, referee_story, metrics, created_at)
VALUES (
  'es-case-073',
  '策展規劃 × 銀行融資',
  '引薦不是當天就要單；懂時機，才幫得成大額融資。',
  '劉懿德',
  '陳亭儒',
  '朋友是建築師，房貸利率偏高，當時還在原約罰款期，不能急著轉貸。我知道亭儒走的是正規銀行專案，就先把人接上。不急著這個月成交，等窗口到了再動。',
  '這類案子最怕客戶心急、在罰款期硬轉，反而更虧。夥伴先引薦、我們等對的時間出手，罰款期一過立刻承作：1,050 萬、利率約 3%、23 年期並含 3 年寬限期，大幅改善客戶的財務彈性。引薦不是當天就要單；懂時機，才幫得成大額融資。',
  '{"amount": "NT$1,050萬", "type": "策展規劃 × 銀行融資"}'::jsonb,
  '2026-07-29'::timestamptz
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  referrer_name = EXCLUDED.referrer_name,
  referee_name = EXCLUDED.referee_name,
  referrer_story = EXCLUDED.referrer_story,
  referee_story = EXCLUDED.referee_story,
  metrics = EXCLUDED.metrics,
  created_at = EXCLUDED.created_at;

INSERT INTO public.referrals (id, title, description, referrer_name, referee_name, referrer_story, referee_story, metrics, created_at)
VALUES (
  'es-case-074',
  '策展規劃 × 抗病毒地板',
  'Power Team 不一定是把客人推過來；把你最信任的師傅帶進來，一樣是高品質引薦。',
  '劉懿德',
  '游凱地',
  '凱地需要的不只是訂單，是信得過的施工夥伴。林師傅跟我做了很多年，我願意把人交出去。雙方已順利完成兩個案場，過程順暢、修邊細緻、收尾整齊。',
  '兩個案場都做完了。有穩定的工班，品質才撐得住，謝謝懿德。引薦的是長期協力工班，不是終端客戶——把最信任的師傅帶進來，一樣是高品質引薦。',
  '{"amount": "兩個案場", "type": "策展規劃 × 抗病毒地板"}'::jsonb,
  '2026-08-05'::timestamptz
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  referrer_name = EXCLUDED.referrer_name,
  referee_name = EXCLUDED.referee_name,
  referrer_story = EXCLUDED.referrer_story,
  referee_story = EXCLUDED.referee_story,
  metrics = EXCLUDED.metrics,
  created_at = EXCLUDED.created_at;

INSERT INTO public.referrals (id, title, description, referrer_name, referee_name, referrer_story, referee_story, metrics, created_at)
VALUES (
  'es-case-075',
  '營養保健 × 品牌設計',
  '同一個客戶做成四個人的生意；團服已回購到第三刷。',
  '江沛璇',
  '江學洋',
  '服務這位客戶時，我沒有停在自己的營養保健本業，而是看出對方需要品牌，就把人交給學洋做品牌規劃。同一個客戶後來又接到團服、網站，變成四個人的生意。不要把客人吃乾抹盡，要把客人做成整個團隊的客人。',
  '沛璇把品牌需求交給我，我做完規劃之後，把團體服裝需求交給慰祖、把網站交給維恩。團服已經回購到第三刷，網站也已承接。先接下第一筆、問出還沒被滿足的需求、把分會裡對的人組起來——這就是從單筆引薦到協力團隊。',
  '{"amount": "團服第3次下單", "type": "營養保健 × 品牌設計"}'::jsonb,
  '2026-08-26'::timestamptz
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  referrer_name = EXCLUDED.referrer_name,
  referee_name = EXCLUDED.referee_name,
  referrer_story = EXCLUDED.referrer_story,
  referee_story = EXCLUDED.referee_story,
  metrics = EXCLUDED.metrics,
  created_at = EXCLUDED.created_at;

INSERT INTO public.referrals (id, title, description, referrer_name, referee_name, referrer_story, referee_story, metrics, created_at)
VALUES (
  'es-case-076',
  '品牌設計 × 運動營養師',
  '先服務會再介紹的教練，從單次諮詢做成長期 B2B。',
  '江學洋',
  '楊承樺',
  '我把一位訓練遇到瓶頸的女性健身教練，轉介給承樺做營養指導。教練的卡關不是課表問題，是營養。我跟承樺的信任夠，直接把人交過去。',
  '信任先轉到我身上，成交週期被整個壓縮。教練自己先有效果，立刻回頭介紹多位學員，從單次諮詢變成長期 B2B 合作。不是找終端消費者，是找會幫你再介紹的人。感謝學洋。',
  '{"amount": "長期B2B", "type": "品牌設計 × 運動營養師"}'::jsonb,
  '2026-08-26'::timestamptz
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  referrer_name = EXCLUDED.referrer_name,
  referee_name = EXCLUDED.referee_name,
  referrer_story = EXCLUDED.referrer_story,
  referee_story = EXCLUDED.referee_story,
  metrics = EXCLUDED.metrics,
  created_at = EXCLUDED.created_at;

COMMIT;

-- Total: 6 cases