-- User-approved new members and portrait mapping, 2026-09-21.
-- Deploy the three public/images/members portraits before running this SQL.
-- Duplicate names are not overwritten. No accounts or permissions are created.
BEGIN;
LOCK TABLE public.members IN SHARE ROW EXCLUSIVE MODE;
WITH incoming (ordinal, name, company, industry, category, photo, phone, email, slogan, intro, services) AS (
  VALUES
  (1, '劉宗霖', '維詩頓設計工程有限公司', '系統櫥櫃', '居住空間與工程', '/images/members/liu-zong-lin.png', '0913050139', 'kinghouse77@gmail.com',
   '系統櫥櫃找宗霖，用心設計第一名',
   E'服務項目：系統櫥櫃、櫥櫃、衣櫃、鞋櫃、電視櫃、收納櫃\n\n【理想引薦對象】\n室內設計師、統包工程',
   ARRAY['系統櫥櫃','櫥櫃','衣櫃','鞋櫃','電視櫃','收納櫃']),
  (2, '江啟亮', '柏橋合有限公司', '家族辦公室', '金融財富與資產', '/images/members/jiang-qi-liang.png', '+85267360566', 'kk.parkbridgeco@gmail.com',
   '全球佈局展遠威，世代傳承靠ＫＫ',
   E'服務項目：國際財富、資金出海、升學身份規劃\n\n【理想引薦對象】\n國際金融（港保）、台灣會計師、家族辦公室及有在中國開公司的台商老闆',
   ARRAY['國際財富','資金出海','升學身份規劃']),
  (3, '蔡育錚', '凱爾泰消防安全設備有限公司', '消防安全設備／消防工程', '居住空間與工程', '/images/members/cai-yu-zheng.png', '0936255561', 'u9726186@gmail.com',
   '消防工程找凱爾泰，一切泰安心',
   E'服務項目：消防工程規劃施工、消防安全設備、柴油引擎消防泵浦、消防設備檢修申報、維修保養、發電機安裝工程、消防設備批發零售\n\n【理想引薦對象】\n建設公司、營造公司、工廠、企業廠辦、社區大樓及各類商業空間',
   ARRAY['消防工程規劃施工','消防安全設備','柴油引擎消防泵浦','消防設備檢修申報','維修保養','發電機安裝工程','消防設備批發零售'])
), missing AS (
  SELECT incoming.* FROM incoming
  WHERE NOT EXISTS (SELECT 1 FROM public.members m WHERE m.name = incoming.name)
), ids AS (SELECT COALESCE(max(id), 0) AS base FROM public.members)
INSERT INTO public.members
  (id, name, company, "Company", industry, category, photo, "photoPosition", phone, email,
   "shortIntro", "fullIntro", services, hashtags, links, status)
SELECT ids.base + row_number() OVER (ORDER BY missing.ordinal), name, company, company,
  industry, category, photo, '50% 25%', phone, email, slogan, intro, services,
  ARRAY[]::text[], '[]'::jsonb, 'active'
FROM missing CROSS JOIN ids;
COMMIT;

SELECT id, name, industry, category, photo, status FROM public.members
WHERE name IN ('劉宗霖','江啟亮','蔡育錚') ORDER BY id;
