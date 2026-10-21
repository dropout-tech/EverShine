-- EverShine 長輝白金分會：67 筆引薦案例
-- 可重複執行（ON CONFLICT 依 id 更新）
-- 在 Supabase Dashboard > SQL Editor 貼上執行

BEGIN;

INSERT INTO public.referrals (id, title, description, referrer_name, referee_name, referrer_story, referee_story, metrics, created_at)
VALUES (
  'es-case-001',
  '保險 × 工廠火險',
  '信任基礎讓報價困難期也能順利成交',
  '江沛璇',
  '楊明翰',
  '這次的引薦，是我弟媳所屬在新竹的公司要更新火險，公司商品/資材繁雜，需要保的更全面，希望找新的保險公司一起比較服務的完整性。弟媳請我協助找資源，我也自然就將這案子提供給產物保險楊明翰，請他來協助；非常感謝明翰的用心，實際場勘，並提供完整的投保建議，讓弟媳公司非常滿意的決定將服務交給他。',
  '謝謝沛璇姐提供的引薦，跟客戶初步接觸後，有先依照之前投保的內容提出建議，但是因為投保的貨物是比較高單價的電子產品，就有提出現場察勘及調整內容的建議，客戶也很配合，約好時間後就親自跑了一趟。因為剛好遇到4.5.6月地震及颱風的災害，報價上遇到了一些困難，但在跟客戶討論後，因為有沛璇姐介紹的信任基礎下，也很順利取得客戶的了解跟認同。在多次的討論跟調整後，提供最符合客戶需求的投保建議版本，並且在客戶辦公室現場完成這次的簽約。感謝沛璇姐的引薦，也感謝BNI。',
  '{"amount": "順利成交", "type": "保險 × 工廠火險"}'::jsonb,
  '2024-10-30'::timestamptz
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
  'es-case-002',
  '健身課程 × 企業員工日',
  'BNI 訓練讓引薦人能精準轉述服務內容，省去溝通時間',
  '吳介輝',
  '廖涌辰',
  '謝謝健身教練涌辰的付出，因為介紹的客戶是美容事業，老闆很重視員工的身心靈平衡，所以特別會在月會的時候安排比較不一樣的課程。很開心涌辰有提供有氧拳擊搭配瑜伽放鬆的課程，達到除了可以運動之外，還有企業員工們之間的心靈放鬆，也回饋給我這是有別於一般教練只有訓練而已，所以很放心的介紹客戶給涌辰，也謝謝有達成業主想要的結果，感謝BNI。',
  '這個案子客戶透過介輝的介紹，也因為客戶非常信任介輝，所以引薦給我們在洽談過程中也是非常順利的，溝通上非常輕鬆且愉快，並沒有向過往要承辦企業員工日時需要耗費非常多的時間來回確認，也因為BNI這個系統的訓練讓介輝再幫我介紹跟分享我們可以提供的服務時第一時間就能替我初步說明，省下不少時間跟經歷，如果不是BNI的系統肯定無法如此快速直接，感謝BNI。',
  '{"amount": "精準轉述服務", "type": "健身課程 × 企業員工日"}'::jsonb,
  '2024-11-06'::timestamptz
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
  'es-case-003',
  '裝修工程 × 燈具採購',
  '1對1深度交流讓被引薦人展現差異化，後續追加訂單',
  '杜宗樺',
  '王冠勛',
  '一個在竹科的四百多坪辦公室裝修工程標案，為順利取得案件，燈具採購的部份，我找了長輝照明科技王董配合，果然，一如既往，王董以快速、專業又具競爭力的價格協助取得標案，謝謝王董。',
  '感謝杜哥的引薦，在收到杜哥的訊息之後我就開始跟廠商的各種洽談，但為了取得最好的價格最後直接找上大陸工廠直接訂做能滿足價格的燈具，那最後也順利地拿下這個案子，甚至後續還有其他樓層的追加改裝。一般這種私人企業基本上都會有自己沿用的廠商，外面的人是很難去接觸到，但因為有BNI的關係讓我在這邊能遇到杜哥，進而跟他一對一，讓他了解更多我與其他同行不一樣的地方。這是一般業務行業很難遇到的，尤其是可以直接與公司的領導人面對面的深聊，我相信這是很多業務夢想的機會，最後感謝BNI這樣的交流方式，讓我在業務方面能做得更輕鬆，感謝BNI。',
  '{"amount": "追加訂單", "type": "裝修工程 × 燈具採購"}'::jsonb,
  '2024-11-13'::timestamptz
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
  'es-case-004',
  '網站開發 × 匹克球運動',
  '信任消除比價壓力，讓雙方得以對等合作',
  '江沛璇',
  '李維恩',
  '我們系統團隊過去一年一直在推動匹克球運動，並且在找建場館的地點，這個階段，總負責人Allen提到要開始做軟體系統建置，其中有「網站設計」的需求，立馬想到在長輝的付出者、而且引薦口碑很好、常被見證的~網站創新開發 李維恩，就引薦他們倆認識；也很感謝維恩的用心，他的專業讓Allen讚賞有加，在一眾競爭者中脫穎而出，順利承接這個建置案。',
  '謝謝沛璇姊的引薦。雖然我們執行過許多特別的專案，但我對匹克球運動知道的不多，透過引薦，沛璇成功的幫我跟客戶Allen正式介紹認識，經過一番討論，我才知道他們想做的匹克球事業有很大的願景，客戶也對於我的專業與見解也感到放心，幾次線上交談，就取得了共識。一般來說，很多大型網站的客戶都不知道自己要做的東西有多大，為了省錢都想比價，團隊為了省錢就省東省西，最後兩敗俱傷。透過BNI的引薦，我們得以與客戶在信賴的基礎上對等交談，不僅拿到門票，得到專案，雙方也能有很好的合作契機，感謝沛璇的引薦，也感謝BNI的系統。',
  '{"amount": "脫穎而出承接建置案", "type": "網站開發 × 匹克球運動"}'::jsonb,
  '2024-11-27'::timestamptz
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
  'es-case-005',
  '健康鞋墊 × 企業員工',
  '親身體驗後的口碑引薦，成交率超過70%',
  '劉祐沁',
  '林修賢',
  '這個引薦實際上是我自己親身體驗修賢的鞋墊服務，效果真的很好，就在想怎麼把這不錯的客製化鞋墊推薦給需要的人。於是在一次的公司的餐會上，我直接把話題帶到我最近做的鞋墊使用心得，然後把修賢在測量時的專業知識帶進去，最後會附加一句「他真的很專業，但不會強迫你一定要做，所以你可以放心測量諮詢，最後決定在自己」。原本不舒服的地方都舒緩很多，甚至拇指外翻的夥伴主動跟我說她的腰不痛了。',
  '成交超過七成的人，這個案子我認為祐沁的口碑與信任佔了9成的功勞，我本身的專業算是錦上添花，因為同樣的話由信任的人說出來和陌生人那是天差地別。也感謝BNI平台透過有效率的商務一對一訪談，能夠短時間內讓夥伴成為了解我專業及有介紹和開發能力的業務人員，如果你也想拓展業務，你可以選擇在104找業務經理，或是透過BNI平台，把分會內50甚至60位企業主培養成你的業務副總，替你在各產業領域做口碑式行銷及引薦，而且你還不用付他薪水，超級划算。',
  '{"amount": "成交率超過70%", "type": "健康鞋墊 × 企業員工"}'::jsonb,
  '2024-12-11'::timestamptz
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
  'es-case-006',
  '原型食物 × 健康媽媽',
  '口碑傳播：一引薦→不到一個月回購2次，再引薦2人',
  '洪儀君',
  '徐幼璇',
  '我的客戶許多是重視自己還有家人身體健康的媽媽，服務過程中了解到客人平常不太會自己開火煮飯，但又非常注意飲食新鮮健康的來源給她女兒，所以經常帶女兒在大飯店用餐消費是不手軟的。幾次抱怨真的都不知道要吃什麼，立馬就想到我們的原型食物料理的徐幼璇，無糖無奶無麩質的獨特食品加上口味非常美味，介紹給客人一定非常符合她的需求，果然服務過程中立馬就下訂幼璇家的即食包，不到一個月就回購2次，還分享推薦給兩位朋友。這也讓客戶對我更加信任，也會有其他需求會第一時間詢問我身邊有什麼資源可以協助。',
  '感謝儀君的支持與推薦，也特別感謝BNI長輝分會帶來的連結與協助！在商會中，我們彼此分享資源，建立信任，這不僅讓我認識了像儀君這樣優秀的夥伴，也開啟了更多合作的可能性。透過儀君的介紹，我們找到共同的客戶，並在這個過程中，真正體會到BNI「贈人玫瑰，手留餘香」的核心精神。透過商會夥伴的介紹，不但拓展了客群，也讓更多家庭因為信任的力量，放心選擇我們的產品。BNI對我來說，不僅是商業上的助力，更是溫暖的支持系統，幫助我找到志同道合的夥伴，並共同成長。',
  '{"amount": "一個月回購2次", "type": "原型食物 × 健康媽媽"}'::jsonb,
  '2024-12-04'::timestamptz
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
  'es-case-007',
  '升學教育 × 華德福孩子',
  '親身體驗子女教育成效的引薦，信任度極高，精準對接需求',
  '劉懿德',
  '王祈',
  '這次非常開心能引薦王祈老師給同樣是華德福體系的家長，是一位有五個女寶的五寶媽媽。華德福的孩子在學習歷程上較為獨特，進度與體制內教育截然不同，因此都會遇到面臨銜接考試的巨大壓力。而五寶媽媽在聽了我分享王祈老師如何引導我家張力的教育理念及互動後，深感認同，便主動希望能讓他們家兩位孩子與老師聊聊。原本他們家孩子對英文與數學非常排斥，但在王祈的引導下，不僅消解了排斥感，還一路穩定學習。看到孩子從抗拒到高度接受，甚至學習狀態變得很積極，真的非常感謝王祈老師專業又充滿初衷的教學。',
  '最大的收穫是見證孩子從排斥到主動的巨大轉變。華德福孩子在銜接體制考試時常面臨極大壓力，這讓我更確信：教育必須先化解心理張力、建立安全感。看著這兩位孩子穩定學習一年多並找回自信，是身為教育者最無價的回饋，一步一步嘗試，慢慢找回學習的感覺。BNI系統發揮了「深度信任背書」與「精準傳遞價值」的作用。教育極需信任，引薦人親身體驗後的口碑推薦，大幅降低了五寶媽媽的疑慮。同時，BNI的深度交流讓引薦人深刻理解我的教學初衷，精準對接到有需求的家長，感謝阿德，感謝BNI！',
  '{"amount": "孩子從排斥到主動學習", "type": "升學教育 × 華德福孩子"}'::jsonb,
  '2026-04-08'::timestamptz
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
  'es-case-008',
  '澎湖餐飲加盟 × 旅遊業者',
  'BNI 1對1合作基礎使洽談效率提升3倍以上',
  '陳夗媃',
  '郭家宏',
  '本次引薦的客戶為澎湖在地有意拓展副品牌的旅遊業者，因看準市場趨勢，希望尋找具話題性且具備成熟營運模式的雞蛋糕加盟品牌。透過春節期間與 郭家宏 先生的 雞百分 合作契機，我將品牌資訊帶入澎湖市場。雞百分提供完整加盟輔導、標準化產品系統與品牌行銷支援，成功降低創業門檻並提升營運效率。目前已順利促成一筆加盟合作，市場反應熱烈。實際接觸後，我高度肯定雞百分在品牌力與商業模式上的成熟度，是值得信賴且具成長潛力的優質加盟選擇。',
  '首先感謝媃子的引薦，媃子也是我們甜饗派活動餐點整合平台的合作夥伴，透過平時的一對一以及案件合作的默契，產生更大的信任及合作關係。這次雞百分將臺灣本島的加盟業務，拓展到以觀光事業為主的澎湖離島。從接洽到簽約，最少都需要經過1-2個月。透過夥伴的協助，我們不僅縮短洽談的時間，更是快速的完成加盟事宜，效率高達３倍以上。感謝媃子的信任，感謝BNI系統，讓我們快速開啟商務。',
  '{"amount": "效率提升3倍", "type": "澎湖餐飲加盟 × 旅遊業者"}'::jsonb,
  '2026-04-15'::timestamptz
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
  'es-case-009',
  '空調工程 × 國際會議廳',
  '產業鏈夥伴引薦，直接跳過標案程序，公部門案件縮短 3-6 個月溝通期',
  '廖乙宸',
  '洪智威',
  '大家好，我是節能除濕代表乙宸。這次要分享的外部引薦，是「國際會議廳」專案。這個案子的客戶是長期配合的工程顧問公司，他們不僅指定規劃我們家的產品，更希望我能連同後續的「施工安裝」一併包辦。說實在話，我平常是不太敢隨便推薦施工團隊的，因為對我來說，每一次的引薦都代表著我自己的信譽與責任。但自從遇到空調工程的智威哥後，我完全放心了！這兩年來，我們配合過大大小小無數個案子，智威哥每一次的施工品質與問題處理都非常理想、無可挑剔。正是因為對他有著絕對的信任，這次我才敢放心地把案件拿下來，交由智威哥專業操刀協助！',
  '感謝乙宸的引薦，這場案子比較特別是因為一般公家機關通常都會需要繁瑣的流程跟要走標案，但因為乙宸是規劃方，在裝修公司得標後就直接採納乙宸建議，直接使用他的配合廠商，而且也得知我們除濕機之外還可以一併處理冷氣的狀態下，就直接一起發包給我們昇宏空調。一般通常遇到公家案子通常都要來回溝通大概3-6個月的時間還不一定拿得到，透過夥伴的介紹不僅縮短洽談時間，連客戶對我們信任度都極高，感謝BNI感謝長輝。',
  '{"amount": "縮短3-6個月", "type": "空調工程 × 國際會議廳"}'::jsonb,
  '2026-04-22'::timestamptz
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
  'es-case-010',
  '自媒體行銷 × 大企業年度案',
  '一週內對接大企業行銷主管，省去數月溝通期，完全跳過比價',
  '洪智威',
  '黃昱歆',
  '這位客戶是常跟我拍影片的夥伴八君的朋友，因為長期我的短影音都是有昱歆處理操刀，所以不管是昱歆的創意、品質跟專業度都有非常好的評價，後來剛好身邊一個冷凍技術的朋友有拍攝需求就馬上聯絡昱歆去處理，而且已經持續一段時間的服務了，非常感謝BNI讓我認識這麼優質的人脈。',
  '感謝空調工程的洪智威，引薦我個人的夢幻引薦給我，讓我可以直接與睿豐這樣的大企業提案年度的自媒體行銷。這次透過智威哥的引薦，我跳過和業主溝通需求的流程，和避開被業主比價的風險，可以直接對接企業的行銷主管。平時開發一個年度自媒體行銷的客戶，往往要花好幾個月的時間溝通提案、建立信任。現在透過BNI系統，建立了雙方的共識與信任，一週之內直接產生精準的聚焦引薦，讓我避開了被比價風險、省去溝通時間成本。謝謝BNI系統和智威哥的引薦～',
  '{"amount": "一週內成交", "type": "自媒體行銷 × 大企業年度案"}'::jsonb,
  '2026-04-29'::timestamptz
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
  'es-case-011',
  '空調緊急維修 × 北投溫泉區',
  '僅憑照片即遠端下單，四天完工，省去現場勘查時間',
  '顧心芝',
  '洪智威',
  '長期聽到BNI夥伴分享到引薦案例，和上次辦公室冷氣相關問題，我都有請教智威，覺得非常專業，一聽到同事冷氣換掉立刻想到智威，詢問過程非常詳盡，且施工過程非常完美，同事超級滿意，非常感謝BNI讓我認識這樣優秀的廠商。',
  '感謝妃妃的引薦，這個案子最大的特別就是沒有看過現場僅憑幾張照片就完成下訂，整個過程含上安裝大概四天就完成，一般按照以往經驗透過溝通場勘至少需要一個多禮拜的時間，還要接受比價的挑戰。現在透過BNI系統，建立了雙方的共識與信任，三天之內直接產生精準的聚焦引薦，讓我避開了被比價風險、省去溝通時間成本。謝謝BNI系統和妃妃的引薦～',
  '{"amount": "四天完工", "type": "空調緊急維修 × 北投溫泉區"}'::jsonb,
  '2026-05-06'::timestamptz
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
  'es-case-012',
  '弱電資訊 × 共享空間裝修',
  '6 位數案場，一次現場勘察即成交，完全跳過比價流程',
  '邱翰城',
  '施秉辰',
  '我們公司長期配合的展覽廠商夥伴，因為有新的共享空間規劃，在裝修期間有裝設監視器、網路相關的需求，需要可以統包所有弱電的部分，所以馬上想到我們最專業的資訊弱電代表秉辰哥！',
  '感謝創意策劃邱翰城的精準引薦，案例這個空間需要整合網路及監控，並且需要計算不斷電系統的使用時間，在一次的現場勘察、報價後，這件6位數的案場立即成交。以往要開發一個陌生客戶，通常都要見面拜訪多次，才有機會報價、經過比議價、最後才能成交。現在，透過BNI的系統，夥伴們的口碑引薦，告訴客戶我們的獨立、優於同行之處，一次到位，非常有效率，再次感謝創意策劃邱翰城精準的引薦，同時也感謝BNI系統。',
  '{"amount": "六位數案場", "type": "弱電資訊 × 共享空間裝修"}'::jsonb,
  '2026-05-13'::timestamptz
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
  'es-case-013',
  '花藝課程 × 創意空間',
  '深度一對一讓引薦人精準掌握需求，雙方共同背景促成默契牽線，聖誕旺季一堂課帶入2萬營業額',
  '陳夗媃',
  '鄭雅菁',
  '上次聽到雅菁的主題簡報和一對一知道原來他找的是各項專業的老師可以開發各種有趣的課程，正好自己身邊有長期合作的花藝師，擁有專業的花藝教學經驗，好巧不巧這兩位過去都是編輯出身又有共同的喜好－空中瑜伽－在認識的過程中了解到兩者想要拓展事業的想法，以此為契機為雅菁的空間服務牽線，也讓長期合作的花藝師有更多拓展業務的可能性，很高興拓展這次的合作為我身邊的夥伴事業成長。',
  '感謝媃子，為我們引薦，專業又有質感花藝老師來空間開課，每年聖誕節是花藝開課的旺季，聖誕花圈、聖誕樹的手作課程，市場非常競爭，媃子介紹的老師，開課經驗豐富、且設計風格獨特，和坊間的聖誕花圈都不一樣，學員們都非常喜歡，一堂課2小時就為我們空間創造將近2萬元的營業額，未來跟這位花藝老師也有固定開課的場地合作正在洽談中，感謝BNI系統、感謝夥伴精準的引薦。',
  '{"amount": "一堂課近2萬營業額", "type": "花藝課程 × 創意空間"}'::jsonb,
  '2024-12-18'::timestamptz
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
  'es-case-014',
  '會計師 × 律師',
  '會計師+律師一條龍互補，從單次合約直接升級為常年法務顧問，建立完整企業制度',
  '廖俊瑋',
  '何昇軒',
  '我是一位會計師，除了服務客戶的會計稅務外，客戶也常常有法務的需求，以前為找尋律師資源，快則2~3天才會有初步的訊息，認識何律師後，何律師基本都可以當天取得聯繫，並可以了解事發緣由給予基本指引讓客戶安定，縱使認識至今5~6年，仍可以維持此聯繫的即時，客戶由單一合約審定、著作權協調等開始變成客戶的常任法務顧問，並給予何律師高度的評價，我也是因為何律師加入到BNI長輝，客戶有更多面向的企業顧問需求，都可以透過此平台找到優質且合適的專業人士，接下來由何律師分享相關案例，謝謝。',
  '感謝廖會的引薦，過去通常公司會聘任法律顧問，大多是在公司已經面臨到糾紛甚至是已經進入訴訟的時候，這種時候協助公司處理完糾紛，公司才會委任成我們成為法律顧問，但這種客戶通常沒有完整的契約或者是系統，在我們處理上面會花費很多的時間成本。透過廖會引薦，這位客戶從設立公司開始，直接委任常年法律顧問，一開始從公司對外的契約、對內的勞動關係等，就建立一系列的系統，除了避免糾紛之外，也省去很多公司制度重新調整的成本。而且廖會除了協助客戶的稅務外，也會就公司經營上法律關係，例如承攬契約工作交付跟報酬收取條件等，給予客戶很專業的建議，讓我跟客戶溝通上更容易，跟廖會合作很愉快，感謝廖會引薦！',
  '{"amount": "升級常年法務顧問", "type": "會計師 × 律師"}'::jsonb,
  '2024-12-25'::timestamptz
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
  'es-case-015',
  '運動營養師 × 物理治療師',
  '一位客戶的信任帶動整個證券部門轉介，省去溝通期直接進入治療，比辦講座更有效率',
  '楊承樺',
  '賴瑋弘',
  '因為在營養諮詢照顧客戶增肌減脂過程，有客戶身體可能因不知道如何正確使用身體，長期錯誤姿勢、不當使用身體而累積肌肉或關節不正常的疼痛。有的人不知道該怎麼處理，而瑋弘在東區的地點很方便我們這邊客戶過去。因此我一位證卷業客人在我們線上照顧時，因為過度運動出現腿酸痛到抬不起來！我在聽完症狀後初步判斷適合找物理治療，因此第一時間就介紹我們金手指 瑋弘物理治療師，馬上拉群引薦，接下來請瑋弘說明。',
  '感謝承樺的信任，通常我們的客戶在一開頭需要溝通不少時間，才能進入治療程序，但是在基於對承樺的信任後客戶可以馬上進入治療程序，而且會一直轉介紹進來，辦講座也沒有這麼高的效率，現在有一整個證卷部門的人進來了，感謝承樺高效的引薦，感謝BNI。',
  '{"amount": "整個證券部門轉介", "type": "運動營養師 × 物理治療師"}'::jsonb,
  '2025-01-08'::timestamptz
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
  'es-case-016',
  '魔術方塊 × 網站開發',
  '引薦人不只引薦一次，而是將4家廠商呈現給客戶評比，最終BNI夥伴憑專業在半年後勝出',
  '李孟一',
  '李維恩',
  '客戶是我大學室友，我結拜兄弟，竹北最漂亮的國標舞教室老闆，因為看到台灣國標舞賽事圈沒有整合性的報名平台跟系統，作為一個國標舞教練與選手他很希望可以創造整合性的資訊平台談何容易，所以他也積極去募資，找尋專業的資訊廠商可以製作整合性的教學平台，過程中我其實總共引薦了四個不同的廠商給他，而且前前後後他也討論猶豫了超過半年，跟每個廠商都有數次諮詢會議，最後他選擇了長輝最專業的網站與數位創新開發 李維恩，維恩的專業讓他與他的投資人都非常滿意，BNI的商務引薦真的幫助不僅幫助了我們擴展事業，還幫助客戶找到令人滿意的解決方案。',
  '謝謝孟一的引薦，這次的設計標的是一個國標舞的舞蹈平台，客戶是一群有理想有理念的國標舞老師，希望能推出一個自有平台，讓舞蹈比賽能更常態化。雖然預算不多，但想做的東西卻不小，經過兩次的線上討論，從一開始的相信，接著不斷累積開發的決心，然後就正式委託了，一般來說，很多大型網站的客戶都不知道自己要做的東西有多大，為了省錢都想比價，團隊為了省事就省東省西，最後兩敗俱傷。透過BNI的引薦，我們得以與客戶在信賴的基礎上對等交談，不僅得到專案，雙方也能有很好的合作契機，感謝孟一的引薦，也感謝BNI的系統。',
  '{"amount": "半年後勝出", "type": "魔術方塊 × 網站開發"}'::jsonb,
  '2025-01-15'::timestamptz
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
  'es-case-017',
  '網站開發 × 品牌設計',
  '網站需求自然延伸至品牌規劃，兩次拜訪成交35萬以上，網站+品牌形成互補一條龍',
  '李維恩',
  '江學洋',
  '欣桃天然氣是一個是桃園地區的天然氣公司，受惠於雙北的人口移入，是一個高速發展公司，他們起初跟我聯繫，是因為網站需要大改版，經過簡介後，他們對我們深具信心與期待，同時也希望我們能一起承接「公司形象品牌規劃」的工作。因為我的專業別不是品牌規劃，但身在BNI，我立刻想到品牌設計的學洋，所以我就跟他們說，沒問題！我們有很專業的團隊能協助你們！ 接下來交由學洋說明過程。',
  '感謝維恩引薦了這個欣桃天然氣的案子，雖然他們已經在桃園市市佔率第一名的公司，但是在民眾以及外界沒有多少人知道他們做的努力，以及他們在50週年，也希望做一些品牌上的調整，因此經過維恩幾次的推薦，我們一起到桃園開會過後，就順利接下這個案子。以前如果要陌生開發的話，你很難靠自己開發到公家機關，對方公務員窗口也不見得會理你，更不要說是讓你拜訪提案；但是現在透過BNI夥伴的介紹，夥伴都已經幫你的服務特點跟信任感都建立好，只要兩次的見面拜訪，就完成超過350,000以上的成交金額，這是之前想都沒想過的，見證了這個系統真的很強，再次感謝維恩引薦，使用BNI系統，真的可以讓你事業逐步成長翻倍！',
  '{"amount": "35萬以上", "type": "網站開發 × 品牌設計"}'::jsonb,
  '2025-01-22'::timestamptz
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
  'es-case-018',
  '包裝設計 × 寵物食品',
  '上市公司夢幻引薦，採購關係升級為全年合作夥伴，兩週完成簽約+3月烘焙展大規模曝光',
  '郭孝淵',
  '詹謦鴻',
  '我們公司在去年作品因緣際會受到台灣麵粉原料上市龍頭—聯華製粉的總經理賞識。與他們高層有進步的合作及交流！剛好這次聯華製粉他們想要開發多元產品設計支線，決定用台灣在地低敏的穀物原料來製作寵物產品設計以及手作課程。正當他們提到這部分時，我馬上聯想到我們分會優秀的寵物營養師-詹謦鴻，並引薦給該公司的高層。沒想到立馬吊出原來該公司近期正苦惱找不到優質的寵物營養專家！更巧的事，在之前深入與謦鴻121發現他也正在籌備相關手作鮮食課程，所以當我一將謦鴻營養師的履歷以及作品傳給經理，他們馬上拍板就決定是謦鴻了！真的非常開心可以為客戶及夥伴製作三贏局面！',
  '感謝孝淵的說明，一直以來，與原料商建立深度合作關係是我們的夢幻引薦之一，而這次透過孝淵的引薦，我們成功與合作超過10年的聯華製粉展開更緊密的合作。雖然我們長期使用聯華製粉的米穀粉作為寵物食品開發的原料，但過去僅限於採購，未曾真正接觸到核心決策層。這次透過孝淵的引薦，我們才了解到聯華對於寵物產品開發也深具興趣，並且在孝淵所建立的信任基礎下，雙方在首次通話後即決定展開合作。此次合作不僅涵蓋產品開發，更延伸至未來的烘焙展與全年合作計畫。在傳統模式下，如此規模的合作案往往需經長時間評估與談判，但透過BNI的引薦與孝淵的推薦，我們在短短兩週內即完成合約簽署，並確定3月於烘焙展大規模曝光。這次的成功案例再次印證了BNI平台的價值，不僅加速了商業合作的效率，也幫助我們與理想的合作夥伴快速建立深度信任。衷心感謝孝淵與BNI，讓我們實現這場夢幻引薦！',
  '{"amount": "兩週完成簽約", "type": "包裝設計 × 寵物食品"}'::jsonb,
  '2025-02-05'::timestamptz
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
  'es-case-019',
  '創業導師 × 運動營養師',
  '來賓帶入帶動固定合作，每梯次訓練班穩定邀請授課，引薦人的來賓成為長期業主',
  '江心怡',
  '楊承樺',
  '這個客人是1年多以前我的來賓，領袖人他們主要是做三鐵運動訓練的，在三鐵界非常有名，三鐵運動最需要合適的營養建議及補充概念才能夠協助選手保持身體理想狀態和突破個人記錄，剛好運動營養是我們承樺AKA豆漿哥哥最專業也最擅長的，承樺的服務細心又專業，讓選手持續在有系統有記錄的狀況下依不同需求調整營養的攝入，相信能夠持續和領袖人有非常精準及密切的合作，強強連手共創佳績！時間交給承樺。',
  '感謝心怡一年多前帶來的來賓 領袖鐵人三項訓練中心創辦人，在那之後續快速與鐵人訓練中心談成了往後每次開新梯次訓練班時候，就會邀請我為鐵人圈的學生們針對鐵人三項所需之的營養進行飲食營養教育，收獲好評不斷創造固定營收。參與鐵人三項運動的客群一直是我們柏飛營養諮詢中心的強項之一，感謝有BNI的系統，讓我們有機會再精準目標族群前曝光，除了有固定營收產生也會增加後續營收，也讓夥伴邀朋友來賓到分會參與例會，也能讓朋友與夥伴一起共創合作商機。',
  '{"amount": "固定營收合作", "type": "創業導師 × 運動營養師"}'::jsonb,
  '2025-02-12'::timestamptz
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
  'es-case-020',
  '信託規劃 × 銀行融資',
  '信託+融資組合拳，限貸令環境下仍取得20年寬限期，超出客戶期待',
  '王執定',
  '陳亭儒',
  '我的客戶林先生，他和老婆是頂客族，沒有房貸，薪水很高，一直想趕快靠投資退休。我就幫他做了資產健檢，評估他手上所有的動產和不動產後，可以在不動產上做資金活化。所以我就引薦能讓你成為銀行VIP的亭儒給先生。大家知道，現在是有限貸令，可是亭儒還是很順利的讓客戶貸款順利通過，而且是20年的寬限期喔！超出客戶期待，太滿意了！',
  '感謝執定的引薦。本次引薦的客戶林先生，從一開始我接觸到案件結束，整個進度流程都非常順暢，因為客戶對執定有足夠的信任，不然通常一開始接觸的客戶，都要花大量的時間溝通。雖然銀行限貸令還在持續，我還是評估客戶的狀況，幫他選擇適合的銀行，直接走VIP專案，不塞車大概正常流程，很快就把案件結案了，客戶對我們的整個服務也很滿意，真的要再次感謝執定，感謝BNI，感謝系統。',
  '{"amount": "20年寬限期", "type": "信託規劃 × 銀行融資"}'::jsonb,
  '2025-02-26'::timestamptz
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
  'es-case-021',
  '插畫設計 × 包租代管',
  '跨行業一對一的深度了解，讓清潔公司與包租代管形成長期互惠引薦鏈',
  '吳貞妮',
  '李秉誠',
  '我先生是開清潔公司，平常會需要和屋主房東往來，知道房東屋主有出租的管理需求。再和包租代管的秉誠亨利一對一商務拜訪時，了解到亨利善於協助屋主的出租管理，所以介紹我先生給亨利認識，無形中，他們已經靠這樣的合作模式，形成了長期的業務引薦，現在就換亨利來說明。',
  '感謝貞妮的引薦，我們提供協助屋主出租及管理房子或是直接跟屋主用公司合法的承租房子當二房東。透過貞妮的引薦，這一次有個清潔人員，因為在幫業主清潔打掃的時候得知屋主需要出租房子及管理，進而引薦業務給我。過去要得到好的房源，需要跟客人保持良好的信任關係，而且需要一段時間才能取得房源。這一次透過BNI精準地介紹，不僅在剛開始就建立了良好的信任感，而且客戶也都非常阿莎力！感謝BNI！感謝系統！',
  '{"amount": "長期互惠引薦", "type": "插畫設計 × 包租代管"}'::jsonb,
  '2025-03-05'::timestamptz
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
  'es-case-022',
  '魔術方塊 × AI程式教育',
  '私立名校破天荒委外資訊課，一次會面直接簽月六萬合約，首期24萬，後續有望擴展至中學部',
  '李孟一',
  '王銓',
  '本次引薦台北市文山區的知名私立小學再興小學，我們在再興開設魔術方塊社、西洋棋社、數理桌遊等社團，所以再興對我們信任值很高，有次聊天偶然知道他們小學部的資訊老師離職，並且找不到適合的穩定講師，可以滿足學校學生資訊素養學習的長期需求，我當下馬上想到長輝分會AI程式教育的王銓的團隊，不僅跟多所補習班開課，還有代理國外的專業程式證照，再興小學團隊面談後也很喜歡非常年輕有活力，馬上簽下了一個月六萬的合約把中年級的資訊課程全部包給王銓，以往學校都是請正職老師，但因為王銓團隊真的太強，這次破天荒委外給外面團隊，並且未來還希望把中學部的可以包給王銓，真的是非常感謝BNI系統，快速幫助我滿足客戶需求，也讓客戶對我的信任感增加！',
  '本次收到孟一的引薦，得到去私立再興小學上資訊課的機會。剛開始孟一收到再興小學很急著要找資訊老師的職缺，孟一就馬上聯絡我，把這個機會pass過來。那我們團隊也很快的跟學校對接了解需求，並且尋找合適的師資，派去小學當作資訊課程的正課老師。孟一也先幫我們把報價拉到比較高的價位，另外再興小學也是對孟一非常信任，所以我們只實體開會了一次，就直接談成一個月六萬元的外聘師資費用。第一次是先簽四個月，也就是24萬元。就是很感謝BNI這個系統，把我跟孟一的團隊串連起來，並且也透過系統我們時常保持聯絡。所以才可以把握住孟一給我的引薦機會，馬上的把這個客戶接下來。持續努力顧好產品品質，提供最好的服務給各位！',
  '{"amount": "首期24萬", "type": "魔術方塊 × AI程式教育"}'::jsonb,
  '2025-03-12'::timestamptz
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
  'es-case-023',
  '創意策劃 × 品牌設計',
  '引薦人預先建立完整信任基礎，被引薦人甚至未曾謀面客戶，30分鐘線上會議直接成交30萬',
  '邱翰城',
  '江學洋',
  '客戶是新創公司Flipper的老闆，蛤蠣。Flipper 是一個以智慧與靈活性為核心的教育品牌，致力於透過創新科技與專業導師經紀服務，為學員和企業提供最前沿的技術培訓。如同海豚在海洋中快速游動的尾鰭（Flipper），成為推動學員在技術領域中迅速前進的關鍵力量。客戶需求就是，因為他們是新創，什麼品牌規劃，LOGO，CIS都沒有。於是，這時候我們想到誰可以解決這個問題呢？當然是我們的品牌設計小王子，江學洋。',
  '感謝創意策劃邱翰城-多多的引薦，由於有多多在前期就已經先幫我說明我們與其他設計公司的不同，我們的獨特銷售主張，以及為什麼要找我做品牌的理由。也是如此細緻的說明後，我去拜訪一次之後，沒有多久，客戶便決定找我們做品牌識別與整體規劃，除了我們的諮詢與作品被肯定以外，最重要的就是夥伴的口碑介紹，讓我們的信賴感大大提升，我甚至還沒見到客戶，客戶就已經知道我們案例有哪些，厲害在哪裡。以前，要陌生開發一個客戶，要花費2-30萬的品牌識別設計費，可能要見面拜訪好一兩次，協助設計一些DM等三四樣內容，諮詢五六個月以後，才有機會談到品牌重塑的議題。現在，透過BNI的系統，夥伴們的口碑引薦，只要線上一次會議，就能成交一個品牌專案，30分鐘的線上會議，我都不用出門，就成交30萬的品牌引薦，這個系統真的非常有效率。這是一個打團體戰的時代，運用BNI可以讓我們一起事業成長，感謝創意策劃邱翰城-多多，感謝BNI。',
  '{"amount": "30萬", "type": "創意策劃 × 品牌設計"}'::jsonb,
  '2025-03-19'::timestamptz
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
  'es-case-024',
  '信託規劃 × 律師',
  '三位律師都給不出滿意答案，透過引薦人的信任基礎，2小時高效解決複雜婚姻財產問題',
  '王執定',
  '何昇軒',
  '俗語說得好，清官難斷家務事。我的客戶蔡先生遇到婚姻的難關，要能爭取到小孩的監護權，又要避免老婆要求一半的財產，客戶找了三個律師得不到滿意的答案。但是透過暖男律師何昇軒，短短二小時的法律諮詢就讓客戶帶著滿意的答案回去。',
  '感謝執定的引薦，離婚、子女監護權的案件本來就是我的專業，但這種案件通常基礎事實很複雜，都需要跟客戶討論比較久。透過執定的引薦，當事人一開始信任度就很高，不但把事實都先告訴執定來提供給我、甚至把財產清冊都先提供給我，讓我能在會議前就先了解客戶的情況，也幫客戶也思考好處理方式，包括透過信託、地政設定等保障權利，給客戶最好的建議，提高了效率，謝謝執定的引薦。',
  '{"amount": "2小時解決", "type": "信託規劃 × 律師"}'::jsonb,
  '2025-03-26'::timestamptz
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
  'es-case-025',
  '信託規劃 × 銀行融資',
  '信託+融資組合拳解決都更遺產規劃難題，企業貸款方案讓額度多出近1000萬，三贏局面',
  '王執定',
  '陳亭儒',
  '本案的委託人是一家小公司的負責人。因為家裡的老屋即將要都更。這間房子的名字還是老媽媽的，百年之後，這棟房子還要和三個兄妹平均分配。而且，都更後將使這間老屋的價值預期上升四到五倍，這樣可能導致未來媽媽會有很高遺產稅。所以客戶來請問我後續應該怎麼規劃比較好？我就建議他運用不動產活化策略，透過銀行貸款將不動產轉換為可運用資金。有了資金後，接著再進行信託規劃，將房子公平的分配給子女。但是，理想很豐滿，現實很骨感，客戶自己去找銀行貸款，卻到處碰壁，談不到理想的方案。於是我就推薦銀行融資顧問 陳亭儒 出馬，來解決銀行端的問題。',
  '本次引薦的客戶劉先生，因為狀況比較特殊，財力條件不是特別好，走一般房貸專案，財力不足根本貸不下來，好在劉先生是企業主，所以跟銀行特別協調，企業專案貸款，用房子加公司當擔保，比他原先的房貸額度多出快1000萬。這筆資金解決了劉先生現金不足的問題，接著才能繼續進行信託規劃。創造了3贏的局面，客戶對這次的服務非常滿意，真的要再次感謝執定，感謝BNI，感謝系統。',
  '{"amount": "額度多出近千萬", "type": "信託規劃 × 銀行融資"}'::jsonb,
  '2025-04-09'::timestamptz
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
  'es-case-026',
  'ZUMBA健身 × 弱電資訊',
  '朋友閒聊中捕捉需求，電話直接成交，安裝時才初次見面，連續承接3個工地形成滾動業務',
  '廖涌辰',
  '施秉辰',
  '這次引薦的張先生是我籃球社團的一位夥伴！透過打球之間的交流了解到他是在做建設公司工地圍籬的生意，由於現在法規的調整規定工地除了傳統告示牌之外也要增加電子銀幕設備，然而現在工地的狀態是缺工的，工作非常忙碌之際又要煩惱如何可以找到合適的配合廠商，在打球的其間閒聊得知他的煩惱，於是我第一時間就想到弱電資訊的秉辰哥，想說這個部分弱電資訊工程的秉辰哥一定可以協助我朋友張先生解決問題，於是簡單了解後便將我朋友引薦給秉辰哥，後續交由秉辰哥做說明。',
  '謝謝涌辰的引薦，客戶是專門做建築工地圍籬的廠商，因為政策規定要在圍籬上安裝LED電子看板，透過涌辰的引薦，一次電話洽談，就直接接受我的規劃建議，採用戶外型LED電子看板，防水防風，又亮又清晰。後來到現場安裝時才跟客戶第一次見面，不只這位圍籬公司老闆很滿意，建設公司現場負責人也興奮的說要把這套設備推薦給銷售部門。就這樣，我們連續裝了3個工地。做生意很少沒見過面就直接成交的，因為透過BNI夥伴的引薦，夥伴都已經幫你的服務特點跟信任感都建立好了，電話洽談就直接成交，而且是客戶繼續接一個工地案子，我就可以一直做下去的生意。這是之前想都沒想過的，見證了這個BNI系統真的很強，再次感謝涌辰引薦，使用BNI系統，真的可以讓你事業成長！',
  '{"amount": "連續3個工地", "type": "ZUMBA健身 × 弱電資訊"}'::jsonb,
  '2025-04-16'::timestamptz
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
  'es-case-027',
  '精油芳療 × 黃金理財',
  '第三年老客戶透過夥伴深度溝通重燃購買意願，隔天即復購且一次繳三個月',
  '陸韻如',
  '劉祐沁',
  '這次案例對象是之前就引薦給祐沁的朋友，已經是第三年簽約，因為聊到閒置資金的運用，而有機會再次引薦，因為平常深度交流夠熟祐沁的產品，才能講到重點引薦成功，接下來交由祐沁說明。',
  '這個案子能完成實際上是小米的功勞，也正因應了BNI的五大基本功，對會員夥伴產業的熟悉進而可以協助解決問題，這位客戶其實對我的產品不陌生，二種產品都有購買，甚至在分期預購的商品上算出來最高的CP值，但在一年合約到期順利轉換合約後，反而沒有繼續購買分期預購，我在面對客戶合約結束後沒有繼續的態度通常都是深深的尊重滿滿的祝福，之後再跟小米做121時，她說這客戶沒有繼續的原因是客戶覺得另一個標的獲利比較好，當然我還是深深的尊重滿滿的祝福，但我講了一個活生生還在進行的例子，剛開始購買500克，也是運用公司的二種營運模式，在幾年的時間擁有的黃金重量早已超過1公斤…透過小米的溝通，隔天客戶就說要開始新的分期預購，而且一次繳款3個月，這是一個很實際透過BNI會員的深入了解、商品進而溝通完成的案子，感謝BNI，感謝長輝分會所有的會員。',
  '{"amount": "隔天復購3個月", "type": "精油芳療 × 黃金理財"}'::jsonb,
  '2025-04-23'::timestamptz
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
  'es-case-028',
  '品牌設計 × 自媒體行銷',
  '品牌規劃訪談中挖掘自媒體需求，立即引薦成交，大企業年度合作已連續續約4次',
  '江學洋',
  '黃昱歆',
  '我的客戶弘第家具找我們做品牌規劃，在訪談中有提到他們想做自媒體來擴展聲量與客戶廣度，聽到這個關鍵字我馬上就開啟了引薦模式，了解需求後立馬就引薦了自媒體經營專家-昱歆去接洽，藉由昱歆豐富並且有成效的社群媒體經營經驗，可以幫助客戶拍很多豪宅開箱、奢華家具大對決等有趣的議題，增加品牌知名度與聲量。昱歆跟對方接洽後，看到他們許多成功案例，也放心地把年度的自媒體規劃交給昱歆，目前這已經是第四次續約了，接下來請昱歆來說明。',
  '感謝品牌設計江學洋，引薦我個人的夢幻引薦給我，讓我可以直接與弘第這樣的大企業提案年度的自媒體行銷，這次透過學洋哥的引薦，我跳過和業主溝通需求的流程，和避開被業主比價的風險，可以直接對接企業的行銷主管。平時開發一個年度自媒體行銷的客戶，往往要花好幾個月的時間溝通提案、建立信任，現在透過BNI系統，建立了雙方的共識與信任，一週之內直接產生精準的聚焦引薦，讓我避開了被比價風險、省去溝通時間成本，甚至至今已經連續續約四次了，謝謝BNI系統和學洋的引薦。',
  '{"amount": "連續續約4次", "type": "品牌設計 × 自媒體行銷"}'::jsonb,
  '2025-04-30'::timestamptz
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
  'es-case-029',
  '精油芳療 × 心靈諮詢',
  '兩年深度合作默契，引薦人親身體驗後持續將媽媽客群精準對接，促成年度頻率調整訂購',
  '陸韻如',
  '林庭瑀',
  '心靈諮詢的庭瑀在BNI裡是我多年固定合作，非常有默契的夥伴，因為認同他的服務與親身感受，所以我也積極將她每年會幫人量身掃描給予好頻率的服務大力推廣給自己的學生，我都笑稱這是科技光明燈，讓他的服務能夠跟我原本的本業服務做很好的結合，接下來交給庭瑀。',
  '感謝精油芳療韻如的引薦，再加入BNI之後我發現我的服務內容和韻如有非常非常多的合作契機，對於彼此的業務也都有很通透的了解，所以每當他遇到身邊有人的情緒.家庭.工作甚至是人生遇到關卡，都會用她自身的經驗推薦對方來找我聊聊。感謝有韻如這兩年真心的口碑引薦，推薦了很多的媽媽來購買一對一客製化的年度頻率調整，幫助了他們的情緒.家庭關係都更加穩定，工作財運也有明顯的改善。感謝這個系統，讓我們能夠成為一個更好的點燈人。',
  '{"amount": "年度頻率調整訂購", "type": "精油芳療 × 心靈諮詢"}'::jsonb,
  '2025-05-07'::timestamptz
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
  'es-case-030',
  '運動營養師 × 物理治療師',
  '信任連鎖：一次治療有感後全家跟進，並開始介紹朋友，遠快於通常需 3-4 次建立信任的行業慣例',
  '楊承樺',
  '賴瑋弘',
  '我一位客戶是心靈諮詢的林庭瑀轉介來的，因長期做展場設計又體重較重因此來進行減脂營養諮詢。在一次回診量INBODY時，觀察到腳指甲有黑指甲狀況，於是想到我們長輝的金手指物理治療師賴瑋弘，因跟客戶已有信賴基礎，客戶馬上就說OK幫他介紹。',
  '感謝承樺引薦，我們的行業非常吃信任感，因為患者對承樺有絕對的信任，所以對我的信任感也建立的非常快，在一次治療有感後，把全家都帶了，通常這種狀況都需要3～4次的信任建立才可能發生，最近已經開始介紹她的朋友們了，非常感謝承樺的引薦，感謝BNI系統。',
  '{"amount": "全家跟進治療", "type": "運動營養師 × 物理治療師"}'::jsonb,
  '2025-05-14'::timestamptz
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
  'es-case-031',
  '策展規劃 × 升學輔導顧問',
  '親身子女教育成果引薦，從數學不及格到段考班上第三名，阿德持續多次介紹媽媽朋友',
  '劉懿德',
  '王祈',
  '謝謝王祈將國三才轉入體制教育的大兒子，在短短的一年內幫助他的數學從C-拉到B++，讓他有信心面對學測大考。不只成績，正確的學習態度及複習時間規劃、實戰的考試策略甚至諧音梗笑話王祈老師都是毫不保留、傾囊相授。如此專業又熱忱的教學，也因此讓我願意一次次介紹身邊許多媽媽朋友給最棒的升學輔導顧問，王祈老師！',
  '感謝阿德的引薦與信任。記得當初剛接到兒子的時候，以前因為學制的關係從未考過試，當時是國二即將要升上國三的轉捩點。媽媽心情是既期待又怕受傷害，我們在經過深入的一對一後，感謝阿德願意將兒子交給我。帶領兒子從數學不及格、C-進步到了B++、段考89分班上第三名。也感謝阿德好幾次地介紹身邊也遇到孩子升學煩惱的家長，感謝BNI系統讓家教教育產業有完全全新的合作模式！',
  '{"amount": "C-進步到B++", "type": "策展規劃 × 升學輔導顧問"}'::jsonb,
  '2025-05-21'::timestamptz
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
  'es-case-032',
  '無麩質雞蛋糕加盟 × 泰安產物保險',
  '食安前端導入：在加盟主加入的第一步就完成投保，總公司推薦大幅縮短簽約流程',
  '郭家宏',
  '楊明翰',
  '我們主要是做無麩質雞蛋糕，目前正在推廣全省連鎖加盟。在拓展業務的同時，加盟主有採購及開放口味的需求，但畢竟我們是跟食品有關，要特別注意食品衛生安全問題，除了總部的嚴格要求，我們需要更強大的保護網，所以找上產物保險明翰，請他協助讓加盟主更能安心、放心。',
  '感謝家宏的信任，餐飲業是台灣產業別的大宗，但食品衛生安全問題一直是餐飲業的通病。家宏的公司雞百分就特別在意食安問題的風險保障，因此在加盟主加盟的前端作業，就導入產品責任保險的保障，讓我可以第一時間就跟加盟主對接，也因為有總公司的推薦，都能很快速地跟加盟主簽約並完成投保，感謝家宏，感謝BNI！',
  '{"amount": "快速完成投保", "type": "無麩質雞蛋糕加盟 × 泰安產物保險"}'::jsonb,
  '2025-05-28'::timestamptz
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
  'es-case-033',
  '寵物食品 × 包裝設計',
  '引薦回饋：Julia 的引薦幫助 Kevin 接到聯名案，Kevin 後來促成 Julia 與上市公司聯華製粉長期合作，付出者收穫的完美展現',
  '詹謦鴻',
  '郭孝淵',
  '我們團隊專注於寵物食品的配方設計，許多客戶在產品開發過程中，同時也會提出包裝設計的需求，而這時我們第一個想到的，就是孝淵。孝淵的設計服務細緻、貼心，能迅速掌握客戶需求，成果不僅讓客戶高度滿意，產品一上線就大受動物醫院歡迎，甚至連前總統也特別購買回家給毛孩食用！從一次性委託，逐步發展為長期合作的夥伴關係。',
  '感謝謦鴻，因為謦鴻長期對我的信任與專業引薦，我才有機會參與寵物鮮食與灶神聯名的包裝設計案。本案最大的挑戰，是如何在不過度宗教化的情況下，仍能清楚傳遞聯名的寓意與亮點。也正因謦鴻當時的極力推薦，讓我後續有機會接觸到聯華與北醫，最終促成謦鴻與上市公司聯華製粉的長期合作。這正是BNI精神的最佳展現——付出者收穫。',
  '{"amount": "聯華製粉長期合作", "type": "寵物食品 × 包裝設計"}'::jsonb,
  '2025-06-04'::timestamptz
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
  'es-case-034',
  '信託規劃師 × 地政士',
  '跨專業串接：信託規劃完成前期複雜分析，地政士只需執行文件，大幅縮短締結時間成本',
  '王執定',
  '李逸強',
  '我的楊先生名下的房子要過戶給兒子一家人。過戶這件事可大可小，不好的地政士讓你繳稅繳到住套房，好的地政士讓你省時省力省下10倍以上的稅金。當客戶提出想過戶房子的需求時，我馬上交給地政士李逸強，而客戶一聽到是我們強哥來處理房子，二話不說立馬委託我們進行辦理。',
  '感謝信託規劃執定哥的引薦。這是一件資產移轉規劃的案子，一般接到這種案件時，我們都要從不同移轉方式還有稅務成本等等各方面跟客戶分析，然後等客戶消化後再決定是否繼續辦理。然而這個案件，我竟然只有做文件、蓋章以及送申請的功能了。其實執定哥在前期做了很多功課也與客戶分析了許多面向，這就是BNI系統的優勢，夥伴間不同的專業合作，大幅縮減締結的時間成本。',
  '{"amount": "大幅縮短締結時間", "type": "信託規劃師 × 地政士"}'::jsonb,
  '2025-06-18'::timestamptz
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
  'es-case-035',
  '保健品 × 無麩質雞蛋糕',
  'Power Lunch 人脈活化：引薦夥伴進入商務中心，隔週企業論壇即成交輕食餐盒訂單',
  '江沛璇',
  '郭家宏',
  '一場午餐聚會，邀請無麩質雞蛋糕郭家宏參與寰宇商務中心的power lunch交流、擺攤，並介紹他結識秘書；正巧，隔週週五就有小型的企業論壇紅酒會，需要輕食餐盒的服務，立馬聯結引薦；也很感謝家宏的用心，在非常短短時間內，整合出符合需求的餐點。',
  '首先感謝沛璇姐的引薦，讓我們可以參加寰宇商務中心的商務交流活動，不僅有交流也有成交，更重要是人脈的鏈接。因為夥伴的介紹，信任感加重，所以順利接案也成功結案。平時在系統建立人脈及信任感，生意隨時有可能出現，感謝夥伴的引薦，也感謝分會及平台平時的培訓，讓我們可以把握機會。',
  '{"amount": "隔週即成交", "type": "保健品 × 無麩質雞蛋糕"}'::jsonb,
  '2025-06-25'::timestamptz
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
  'es-case-036',
  '標案協力 × 團體服',
  '協力團隊取代競爭，台啤台灣隊長代言 4000 件 T 恤百萬標案，透過 Power Team 快速拿下',
  '孫成育',
  '李慰祖',
  '這個案子是台灣隊長陳傑憲代言台啤後第一波製作物，客戶要求必須是商品品質，製作物是T恤，所以介紹台啤窗口給姐夫來接洽。目前這個案子已經打樣確認，品質客戶滿意，也已簽約完畢，引薦金額超過百萬。',
  '感謝成育帶給我這次夢幻引薦：台灣菸酒公司非常熱門的團體服製作，尤其更搭上了陳傑憲台灣隊長的話題，一次就要做4000件的T恤。以前我要拓展團體服的生意，總是要花好幾個月的時間去開發客戶，還不一定都有成效。但現在透過BNI系統，透過富酬者的協力團隊，只要幾次的會議就有機會拿到案子。這個案子更證明了彼此團隊合作取代競爭，是非常有效地做生意的方式。',
  '{"amount": "百萬+", "type": "標案協力 × 團體服"}'::jsonb,
  '2025-07-02'::timestamptz
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
  'es-case-037',
  '寵物食品營養師 × 寵物友善空間',
  '夢幻引薦：寵物友善空間接到「中華亞太小動物獸醫學會」48小時認證課程，有望發展長期合作',
  '詹謦鴻',
  '鄭雅菁',
  '當初寵物保母課程的老師在規劃課程時，特別問我：「有沒有寵物友善、又能讓飼主安心學習的空間？」我毫不猶豫地想到——雅菁用心打造的「小島好日」。老師第一次來訪時就深受感動，當場拍板，將完整48小時的專業課程全數交由小島好日進行。',
  '非常感謝Julia引薦，我一直想要的客戶，夢幻的開課機構——「中華亞太小動物獸醫學會」。獸醫學會預計在小島開設一個月一期共48小時的寵物保母認證課程。透過BNI平台我才能接觸到這些授證的開課機構，而且在夥伴Julia的大力推薦下，讓開課的講師們願意信任小島。學會未來也有機會在小島開設長期的課程。',
  '{"amount": "48小時認證課程", "type": "寵物食品營養師 × 寵物友善空間"}'::jsonb,
  '2025-07-09'::timestamptz
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
  'es-case-038',
  'AI 程式教育 × 升學輔導顧問',
  'BNI 催生跨界新商業模式：AI 教育 × 升學輔導 = 「AI 顧問」新角色，同時接到傳產企業顧問需求',
  '王銓',
  '王祈',
  '很高興把我的合夥人『梁崴』介紹給 『王祈』。王祈從事升學輔導顧問，我們則專注在AI程式教育。沒想到透過BNI這個商務引薦平台，促成這次跨領域的交流。短短兩個月內，大家因彼此信任而展開合作，聯手打造針對企業與成人學習者的全新服務，也接到傳產企業的顧問需求。原來升學輔導顧問與AI教育能夠結合，發展出「AI顧問」這樣的新角色。',
  '很感謝能透過BNI認識王銓，甚至進一步認識他的合夥人梁崴，發展了全新的商業模式。原本我們看似不同領域，一個專注在升學輔導，一個深耕AI教育，沒想到短短幾個月內，就因為信任，激盪出許多新的火花。我們合作的課程已經順利開班，也獲得傳產企業的顧問需求，證明大家一起合作，真的充滿無限可能。',
  '{"amount": "跨界AI顧問新模式", "type": "AI 程式教育 × 升學輔導顧問"}'::jsonb,
  '2025-07-16'::timestamptz
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
  'es-case-039',
  '保健品 × 品牌商標設計',
  'Power Lunch 預熱引薦：沛璇姊提前細緻說明 Shawn 的獨特銷售主張，讓客戶在見面前就已信任，縮短成交週期',
  '江沛璇',
  '江學洋',
  '我們系統團隊近兩年積極推廣匹克球運動，並且規劃創建球館及平台，想到應該會有品牌建置的需求，所以邀請品牌設計代表江學洋參與power lunch交流，介紹他結識匹克幫的總召Allen；Allen對他的專業，讚不絕口，也感謝學洋的用心，積極跟進，進而取得第一階段的業務引薦。',
  '感謝沛璇姊的引薦，由於有沛璇姊在前期就已經先幫我說明我們與其他設計公司的不同，我們的獨特銷售主張，以及為什麼要找我做品牌的理由。也是如此細緻的說明後，我去拜訪一次之後，客戶決定先找我們做品牌商標設計。我甚至還沒見到客戶，客戶就已經知道我們案例有哪些，厲害在哪裡。以前，要成交一個品牌設計案，可能要見面拜訪好多次，諮詢五六個月。現在，透過BNI的系統，夥伴們的口碑引薦，只要幾次會議，就能成交一個品牌專案。',
  '{"amount": "見面前即建立信任", "type": "保健品 × 品牌商標設計"}'::jsonb,
  '2025-07-23'::timestamptz
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
  'es-case-040',
  '魔術方塊教學 × AI 程式教育',
  '信任槓桿：夢想一號的信用背書讓王銓只開一次實體會議，就簽下月29萬、年349萬合約，加入BNI第一年年營收翻倍',
  '李孟一',
  '王銓',
  '我在台北市文山區的知名私立小學再興小學，因為我們團隊開立了很多才藝社團，所以再興小學對我們的團隊信任值很高，有一次了解到他們有資訊老師的空缺需求，我馬上想到AI程式教育的王銓。面談後，學校即與王銓簽下每月六萬元的合約，負責中年級資訊課程。但是故事還沒結束！小學部成功案例引發國高中部爭相合作，恭喜王銓加入BNI第一年獲得讓公司年營收翻兩倍的夢幻引薦。',
  '感謝魔術方塊教學大哥孟一的引薦。他不只會玩魔術方塊，還會幫我們公司變魔術。合作一學期後，校方覺得服務不錯，決定把國高中的課程也都包給我們。因為學校本身就對夢想一號有很大的認同與信任，所以我只與校方高層開一次實體會議，就簽下，每月29萬，一年349萬的合約。在還沒加入BNI之前我沒想過做教育可以一次簽這麼大筆的合約。',
  '{"amount": "349萬/年", "type": "魔術方塊教學 × AI 程式教育"}'::jsonb,
  '2025-07-30'::timestamptz
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
  'es-case-041',
  '運動營養師 × 手足指甲保健',
  '精準客群對接：運動族群小眾市場透過信任引薦快速建立客源，2個月回客3次，再引薦2名跑者',
  '楊承樺',
  '洪儀君',
  '我一位喜歡跑步的高端營養調整客戶，在一次回診量INBODY時，觀察到腳指甲有黑指甲狀況，於是想到我們長輝的手足指甲保健洪儀君，因跟客戶已有信賴基礎，向他介紹說明問題指甲潛藏風險後，我也給予儀君的DM幫他介紹。',
  '感謝運動營養師承樺的精準引薦，透過承樺的專業服務讓客戶產生信任，進而介紹精準客戶「路跑玩家」到我們店做足部健甲照護，客戶從6月第一次來到現在2個多月，已經回客3次，又額外介紹兩位跑者來做足部健甲照護。由於我們店的另一個主力客群是「職業運動員和運動愛好者」，目前還算小眾市場，透過BNI的系統，夥伴們商務拜訪了解彼此的獨特銷售特性，進而口碑引薦，就能快速有所成交。',
  '{"amount": "2個月回客3次", "type": "運動營養師 × 手足指甲保健"}'::jsonb,
  '2025-08-13'::timestamptz
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
  'es-case-042',
  '手足指甲保健 × 健康鞋墊',
  '一條龍服務鏈：路跑玩家從運動營養 → 指甲保健 → 鞋墊客製 → 路跑鞋改裝，BNI 信任傳遞串起完整足部照護',
  '洪儀君',
  '林修賢',
  '繼上週運動營養師楊承樺的精準引薦，優質路跑玩家客戶做足部健甲照護，處理過程中發現足弓有塌陷的狀況，腳底局部也有厚繭增生，跟客戶衛教關聯性後，就想到我們的客製鞋墊達人醫療輔具的林修賢。因有一開始對承樺的信賴基礎，加上我這邊的信任肯定，客戶積極詢問希望可以介紹鞋墊達人。',
  '感謝儀君傳遞馬鈴薯般的引薦，我立即幫這位路跑玩家安排專業的檢測評估，了解他在動態靜態下的足部使用情形，然後給予最適合他的建議，除了幫他製作日常使用的鞋墊外，還幫他將專業的路跑鞋內部修改，增加他的穩定性。加入BNI就是透過這樣信任的引薦傳遞，讓一個客戶能享受一條龍最專業的服務。',
  '{"amount": "一條龍足部照護", "type": "手足指甲保健 × 健康鞋墊"}'::jsonb,
  '2025-08-20'::timestamptz
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
  'es-case-043',
  '魔術方塊教學 × 家事律師',
  '複雜跨國案件（台灣+加拿大財產）通常需多次討論，透過引薦建立信任，一次面談即全案委託',
  '李孟一',
  '何昇軒',
  '我在臉書好友牆上看到我的朋友發文，希望幫他的朋友找能夠理解男方立場的律師協助離婚官司，我馬上想到我們分會的帥氣奶爸律師何律，何律有很豐富的家事訴訟經驗，沒想到一引薦過後何律就用專業取得客戶信賴！',
  '謝謝孟一的引薦，這位客戶是要處理離婚、子女監護，以及在臺灣、加拿大等地的婚後財產，情況複雜。通常這麼複雜的案件，我們需要多次跟當事人討論才能取得信任。但透過孟一的引薦，直接引薦我是家事案件專門律師，且處理過多次複雜案件，當事人直接就有高度信任，會面一次後就全案委託，省去很多會議時間，謝謝孟一的引薦、謝謝BNI。',
  '{"amount": "一次面談全案委託", "type": "魔術方塊教學 × 家事律師"}'::jsonb,
  '2025-08-27'::timestamptz
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
  'es-case-044',
  '策展規劃 × 弱電資訊系統',
  '協力團隊（建多室廣）深度互信：從門禁到網路總機、會議設備、全公司資訊維護，一次會議全部拿下六位數案',
  '劉懿德',
  '施秉辰',
  '這次在新竹一家氣體設備公司，因業主需要在現有樓層下方再增租一層作為擴張空間，不只涉及整體設計裝修，還包含兩層樓的門禁統一，以及新樓層的弱電規劃。第一時間，我就想到建多室廣的夥伴——資訊弱電專家秉辰哥。憑藉他專業的掌握與清晰的規劃，讓客戶非常滿意並充滿信任，當場就決定交給秉辰哥進行資訊系統的整體規劃與報價。',
  '謝謝阿德的引薦，我跟阿德是「建多室廣」協力團隊的成員，對於彼此的業務與專業能力都非常瞭解。這次客戶原本只打算更新二道門的門禁系統，透過阿德引薦，客戶立即約我過去面對面會議，就這麼一次的會議，客戶對於我的規劃與建議，完全接受，除了加裝會議室投影設備、規劃電話系統更新為網路總機系統，同時也把全公司的資訊維護外包給我，現在已進入合約階段。',
  '{"amount": "六位數案", "type": "策展規劃 × 弱電資訊系統"}'::jsonb,
  '2025-09-03'::timestamptz
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
  'es-case-045',
  'AI 程式教育 × AI 程式交易',
  '深度一對一建立的信任轉化為引薦：金融商品通常難以快速成交，但透過 BNI 夥伴的充分了解，客戶直接入金30萬',
  '王銓',
  '王年煜',
  '平常跟AI程式交易王年煜，有很多次的一對一，所以很了解老王的投資產品，也很信任老王的做事風格，知道他都是以客戶為主，確保客戶的風險在可控的範圍內進行投資與獲利。我朋友有幾位是善良的富二代，其中有一位有在投資股票，有一次跟我說有沒有推薦的股票，我就靈光一閃，給他介紹老王的外匯交易程式（長年績效高達25%年報酬），他聽了不僅不覺得擔心，反而覺得很有趣，然後就立馬跟老王拉群組，最終入金30萬台幣。',
  '感謝AI程式教育的王銓引薦！因為我們都深耕於AI相關產業，平時常交流各種應用，他對我過去六年來AI產品的演進與實際績效有著深入的了解，也因此對我的產品建立了高度的熟悉與信任。能讓陌生客戶這麼快就成交，實屬難得。這份成果，全然歸功於王銓的信任，以及他對產品的了解與支持，才能讓這次的引薦得以如此順利。',
  '{"amount": "入金30萬", "type": "AI 程式教育 × AI 程式交易"}'::jsonb,
  '2025-09-10'::timestamptz
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
  'es-case-046',
  '包裝設計 × 數位創新開發',
  '國際夢幻引薦：澳洲企業家×台灣藝人×羽球 App，開發規模大且含技術入股，引薦人全程陪同線上面談，精準且到位',
  '郭孝淵',
  '李維恩',
  '今年我們公司有幸接到一個特別的合作案：是由知名製作人周遊的乾兒子「鮑魚王子」，以及女藝人陳柏渝一同推動的羽球計畫。客戶本身是澳洲的知名企業家，希望打造一套結合預約制、賽事匹配分析、人力媒合的專屬APP。當我聽到這樣的願景，第一時間就想到我們同樣擁有金牌APP設計實績的維恩哥。在維恩哥提供的專業介紹詞下，我們很快安排了線上面談，客戶當場就決定要進一步合作。',
  '謝謝孝淵的引薦。他們希望打造一個專屬於羽球的數位平台，從球場搜尋、訂場、團主揪團、社群平台、舉辦賽事，甚至與企業合作的ESG方案都在討論的範圍，由於規模不小，對方也有提出技術入股的合作可能，算是我的夢幻引薦。孝淵相當認真，連初次線上會議都還花時間一起參與，引薦相當精準與到位。以前要開發一個陌生客戶，通常都要見面拜訪好多次，諮詢五六個月以後，才有機會成交。',
  '{"amount": "夢幻引薦", "type": "包裝設計 × 數位創新開發"}'::jsonb,
  '2025-09-17'::timestamptz
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
  'es-case-047',
  '弱電資訊系統 × SEO 行銷',
  '同組深度了解引發精準引薦：SEO 簡報超出客戶預期，原本一個需求變成兩張合約（3D病理+保養品）',
  '施秉辰',
  '潘芷盈',
  '我太太前陣子被一家生技公司邀請去擔任營運顧問，負責的一條全新的產品線需要進行關鍵字的網路行銷，腦袋第一時間就跳出「只贏不輸、有效才收費」SEO內容行銷的潘芷盈，因為每週例會的交流，而且本會期我們2個是同組，深切明白芷盈的服務內容與功力，毫不猶豫就把芷盈介紹出去，客戶對於芷盈的提案、服務內容很滿意，且已成功簽約。',
  '感謝秉辰哥的引薦！秉辰哥太太顧問的一家生技公司，主力是3D病理技術，現在想發展保養品品牌，就來找我討論SEO行銷的需求。他們需要幫網站做關鍵字的曝光，帶來精準而且穩定的流量，我就到他們新竹辦公室去做簡報。結果最後，他們不只決定要做保養品品牌的部分，還要做3D病理檢測的市場教育跟曝光，一次就簽了兩張合約！長輝真的很給力！',
  '{"amount": "兩張合約", "type": "弱電資訊系統 × SEO 行銷"}'::jsonb,
  '2025-09-24'::timestamptz
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
  'es-case-048',
  '電子商品設計 × 手足指甲保健',
  '家人引薦信任度最高，根治問題後帶女兒成為固定客戶，展現BNI讓分會成為業務軍團的力量',
  '蘇子超',
  '洪儀君',
  '本次的外部引薦是我的姐姐，她長期有凍甲的問題，平常她都是自己找美容院或是自己修剪，但是都無法解決凍甲的問題，後來一次見面她提到她又不小心撞到腳，讓凍甲更加嚴重，這時候我就趕快介紹我們的手足指甲保健儀君給她，希望能將凍甲的問題根治。',
  '感謝電子設計代表子超的引薦，由於客戶是子超姊姊，所以快速line拉群提供問題甲照片給予評估說明，因為長期修剪不當導致嚴重變形凍甲疼痛，給予建議做指甲重建的貼片處理，改善指甲的寬度避免甲溝炎反覆發生，相對費用也比較貴，但因為子超的信任介紹，馬上預約處理時間，姐姐也非常配合後續每個月的健甲療程，處理第二次到現在約半年了，回饋已經沒有嵌甲疼痛了，還帶女兒一起來體驗修剪保養。平時做一對一商務拜訪時，清楚說明服務項目，教育夥伴如何介紹精準客戶，生意隨時都有可能出現，再次感謝夥伴子超的引薦，也感謝分會及BNI系統，無形中多了5、60位業務經理幫我們開拓客源。',
  '{"amount": "帶女兒成為固定客戶", "type": "電子商品設計 × 手足指甲保健"}'::jsonb,
  '2025-10-08'::timestamptz
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
  'es-case-049',
  '弱電資訊 × 包裝設計',
  '夫妻合力引薦：弱電老公引薦，顧問太太橋接需求，設計一次過稿，直接成交上市公司案',
  '施秉辰',
  '郭孝淵',
  '這次又是我太太被一家生醫公司邀請去擔任營運顧問，負責的一條全新的產品線，趴兔，新產品新形象，所以第一步要新的產品包裝設計，這當然想到介紹我們分會的包裝設計郭孝淵，孝淵很快提供幾款設計圖樣並詳細說明設計理念，我太太回報說公司非常驚艷，對於孝淵的功力非常佩服，目前已成功簽約，收款。',
  '這次非常感謝秉辰哥對我的高度信任，透過他對我專業而具說服力的介紹，讓秉辰哥的太太對我產生極大信心，並進一步主動引薦我與他們公司合作，最終促成了合作與簽約機會。這次合作的案子，是針對上市上櫃企業、面向高端運動族群與高爾夫球俱樂部的運動保養包裝設計。由於我對高爾夫領域的實際使用情境並不熟悉，能在極短時間內聚焦方向，關鍵就在於秉辰哥太太專業的「收斂聚焦」能力——她不僅能在短短幾分鐘的電話中清晰且有邏輯地整理需求，更在事後協助統整高層們不同的意見風格，製作成明確的表單給我，讓我能迅速進入設計核心，節省大量前期溝通時間。也因為秉辰哥太太的專業協助與全力推薦，我們的設計得以一次過稿、順利完成。',
  '{"amount": "一次過稿簽約", "type": "弱電資訊 × 包裝設計"}'::jsonb,
  '2025-10-15'::timestamptz
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
  'es-case-050',
  '魔術方塊 × 升學輔導',
  'PowerTeam累積400萬引薦額的長期信任基礎，讓課程從1個社團成長為2個社團',
  '李孟一',
  '王祈',
  '教育PowerTeam星辰領航者長期針對私立小學進行合作，我們目前在台北市文山區的這所私立小學目前已經達到接近400萬元的引薦額。這所學校因為跟我們公司長期合作，因此我後來也獲得學校信任，我引薦給王祈，後來由王祈進行了數理桌遊課，把數理邏輯融合進入桌遊中，上一個學期的課程也獲得學生好評，這學期除了繼續開，還變成兩個社團，很感謝王祈的大力支援！不愧是高學歷清大猛男，把這筆引薦做到盡善盡美，也讓我很有面子！',
  '非常感謝魔術方塊教學的孟一，過去我的教學多半是一對一的家教，這次透過孟一的引薦，利用「夢想一號」與這所私立小學長期深厚的信任關係，讓老師們願意將數理邏輯班直接交給我。合作過程非常愉快，不只和孩子們建立了深厚關係，也與老師們產生更多信任。這讓我看見了教育合作的更多可能。再次感謝孟一，也謝謝BNI這個平台，讓我有機會接觸到門檻較高的私立小學，獲得如此寶貴的經驗。',
  '{"amount": "累積400萬引薦額", "type": "魔術方塊 × 升學輔導"}'::jsonb,
  '2025-10-22'::timestamptz
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
  'es-case-051',
  '澎湖餐飲 × 產物保險',
  '跨島引薦，活動前一週急件，遠距完成報價與出單，信任加速了所有程序',
  '陳夗媃',
  '楊明翰',
  '這位客戶是一位即將在澎湖舉辦沙灘派對的朋友，活動規模不小，現場人流與動線都需要良好控管。由於活動場地臨海，安全風險較高，主辦方特別希望能在活動前完成「一日活動保險」的規劃，以確保參與者、設備與工作人員的安全。我協助引薦了楊明翰，他專業提供各類活動保險服務，針對活動性質、場地條件與參與人數，迅速提供客製化方案，文件準備與保單生效都非常快速。整體服務細緻、溝通清楚，讓主辦方能安心專注在活動執行上。明翰的效率與專業，真的值得推薦！',
  '這個案子會成功，要先感謝夗媃的信任，在第一時間就先了解對方的需求，並明確且清楚的說明，讓我再跟對方聯繫時省去很多溝通的時間。而且因為有夗媃介紹的信任基礎下，很順利取得客戶的了解跟認同，就算客戶遠在澎湖，也很快速的就完成了報價跟用印出單（開始報價已經只剩一個禮拜左右活動就要開始）。感謝澎湖扛把子夗媃，感謝BNI!!!!',
  '{"amount": "一週內出單", "type": "澎湖餐飲 × 產物保險"}'::jsonb,
  '2025-10-29'::timestamptz
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
  'es-case-052',
  '弱電資訊 × 團體服',
  '六位數訂單之外還帶來意外的十年老友重逢，BNI引薦超越商業，創造了人情溫度',
  '施秉辰',
  '李慰祖',
  '大家都知道我愛打高爾夫，2026年我即將接任清華大學校友隊的總幹事，這是一個150人的大球隊，球隊要製作年度衣服、帽子的這事件當然第一時間就是想到我們團體服的李慰祖。因為出錢的會長有些獨特的客製化想法，別人做不到的，在慰祖哥的專業設計下都不是問題，很快就談妥、打樣、確認、下單，10月底我穿著打樣的球衣去打球，校友們都讚不絕口，樣式、材質都非常高檔，目前已在製作中，期待漂亮的隊服穿上身。',
  '非常感謝我們的長腿哥哥秉辰，一開始我和秉辰一對一的時候，我就知道他是清華大學EMBA的單差點的高爾夫球高手，我自己在大約十年前也非常熱愛打高爾夫球，同時我也承作了很多高爾夫球隊的衣服與帽子。所以當秉辰哥帶給我這個好引薦時，我當然非常高興，因為這是一張六位數字的訂單，然而更讓我驚訝與歡喜的事情是，在與秉辰和清華校友隊的下任隊長溝通設計的過程當中，竟然發現他們的隊長是我認識十年以上的球友兼好友，這幾年來我很少打高爾夫球，但是通過這次秉辰的引薦，我竟然又與我這位球技好人品更好的老友重逢，更巧的是他就住在我家隔壁社區，因此我立刻將打樣的樣品送到這位老友手中，並且很高興的與他敘敘舊談談以前一起打球的往事。感謝秉辰！這不只是一個好引薦，更是一個充滿快樂回憶與友情的引薦！',
  '{"amount": "六位數", "type": "弱電資訊 × 團體服"}'::jsonb,
  '2025-11-05'::timestamptz
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
  'es-case-053',
  'AI商業顧問 × AI程式交易',
  'AI同業六年深度了解，朋友轉介從未見面就成交，BNI讓開發客戶的時間成本大幅降低',
  '王銓',
  '王年煜',
  '這次又是一個善良的富二代朋友，有了些錢但不知道要怎麼用錢賺錢，又不想去上班。所以就來問我平常投資什麼標的，這時候這個問題出來的時候我馬上就想到我們的主席AI程式交易王年煜。他的產品專門都過AI分析市場進行投資，我就推薦給我的朋友，他也是二話不說，就選擇追蹤老王的信天翁交易程式，跟著投資，目前已經過了兩週都穩定獲利，儘管最近幾週川普大哥又掀起了一陣腥風血雨，但跟著老王做交易，就會持續獲利。',
  '感謝AI商業顧問王銓的引薦！因為我們都深耕於AI相關產業，平時常交流各種應用，他對我過去六年來AI產品的演進與實際績效有著深入的了解，也因此對我的產品建立了高度的熟悉與信任。在他的朋友了解並建立群組後，更是毫不猶豫地開始使用我的程式來輔助金融交易。能讓陌生客戶這麼快就成交，實屬難得。透過BNI的系統，我可以快速有效率地接觸到我過往接觸不到或是需要很長時間來經營的潛在客戶群，但透過會員的轉介紹及有效的口碑式宣傳，這位客戶我還沒見過面就成交了，BNI系統大幅降低我開發客戶的時間成本。',
  '{"amount": "未見面即成交", "type": "AI商業顧問 × AI程式交易"}'::jsonb,
  '2025-11-12'::timestamptz
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
  'es-case-054',
  '安麗保健 × 永續包裝',
  '一對一深度了解帶動Power Lunch精準引薦，90秒演說訓練讓現場商品全數售完',
  '江沛璇',
  '湯益承',
  '兩次跟益承的一對一，讓我對他的永續可分解包裝產品及專業的態度，印象非常深刻，因此邀請他到寰宇竹北的Power Lunch擺攤與分享，參與交流的朋友，有北部及南部的私廚餐飲代表、也有竹科的董娘等，當天大家對益承的永續環保食物夾鏈袋詢問度超高，也都踴躍支持。',
  '感謝沛璇的外部引薦。在第一次一對一後，沛璇很快掌握沐霓青植物基可分解袋的特色，也理解我目前需要的客戶族群，於是邀請我參加安麗新竹的Power Lunch，安排我上台做90秒短講。因為有BNI的訓練，我能在短短90秒內清楚說出我是誰、我提供什麼價值、我需要什麼樣的引薦。當天我的分享在一群講者之中特別突出，也為後面擺攤帶來很大的幫助。我帶去的商品快就銷售一空。甚至幾天後又遇到當天買過的夥伴，他主動問我有沒有帶產品，還想再買。BNI系統讓我學會精準表達、找到對的引薦，並把人脈真正轉化成業績。',
  '{"amount": "商品全數售完", "type": "安麗保健 × 永續包裝"}'::jsonb,
  '2025-11-19'::timestamptz
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
  'es-case-055',
  '信託規劃 × 銀行融資',
  '三卡債整合，每月減輕25,000元還款壓力，銀行拒絕後VIP管道成功解套',
  '王執定',
  '陳亭儒',
  '我的客戶被 房貸 信貸 卡債 壓的喘不過氣，原本彩色的人生變成黑白。經過我幫她分析資產和負債比後，建議可以運用理財型房貸來解套。可是客戶說：他找過銀行，銀行說沒有空間可以貸款！這個時候，我就介紹銀行融資業的亭儒，讓客戶立刻升級成VIP。成功為客戶爭取貸款金額，每月少繳月付金25,000！黑白人生變回彩色人生。',
  '感謝執定！精準的介紹引薦，客戶對我們也很信任，省去了溝通時間成本，這次案件，把重點擺在降低客人每個月還款的壓力，所以房貸利率+全部銀行的債務整合，對我來說是一大工程，但慶幸的所有的流程，都很順利完成，客戶的生活壓力減低，我也樂在其成，真的要再次感謝執定，感謝BNI，感謝系統，有這麼棒的夥伴一起奮鬥。',
  '{"amount": "每月少繳25,000", "type": "信託規劃 × 銀行融資"}'::jsonb,
  '2025-12-03'::timestamptz
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
  'es-case-056',
  '運動營養師 × 手足指甲保健',
  '精英跑者引薦帶來社群漣漪效應，粉絲跟進並再介紹朋友，精準引薦引爆目標客群',
  '楊承樺',
  '洪儀君',
  '我這一位客戶馬拉松成績算是台灣女子前100名的精英市民跑者，也經常在他的社群上發文分享他的運動訓練與飲食跟日常生活，算在跑圈是知名有影響力的。這次為了準備下週重要賽事台北馬拉松，2個月前回來做飲食調整，在一次回診量INBODY時，觀察到腳指甲有黑指甲狀況，於是想到我們長輝的手足指甲保健洪儀君，因跟客戶已有信賴基礎，向他介紹說明問題指甲潛藏風險後，我也給予儀君的DM幫他介紹。',
  '感謝運動營養師承樺再次精準引薦「路跑玩家」到我們店做健甲處理，這位玩家非常具有影響力，常會在IG社群分享路跑相關議題，最常見的不外乎就是黑指甲瘀血的運動傷害，分享自己在我們店處理後的感受經驗回饋文章。進而影響粉絲開始重視足部指甲的健康，也慕名前來詢問處理，這位粉絲處理完又再度接受路跑朋友來處理。我們店另一項主力客群是「職業運動員和運動愛好者」，目前還算小眾市場，現在透過BNI的系統，夥伴們商務拜訪了解彼此的獨特銷售特性，進而口碑引薦，就能快速有所成交，感謝同學承樺，感謝BNI。',
  '{"amount": "社群漣漪效應", "type": "運動營養師 × 手足指甲保健"}'::jsonb,
  '2025-12-10'::timestamptz
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
  'es-case-057',
  'AI程式交易 × 銀行融資',
  '手遊隊友累積的人情信任，第一家銀行拒絕後堅持再衝第二家，特殊案件增貸280萬成功',
  '王年煜',
  '陳亭儒',
  '客戶王先生，是我以前玩手遊認識的朋友，大概是我當團長時軍團管理得好，所以有信任感，也知道我做投資相關，持續有聯絡也會問我一些事情。因為他是拿現金收入，銀行貸款不好辦，加上已經有多項貸款要支出，需要債務整合同時增加流動資金，所以我找到長輝好夥伴-銀行融資顧問陳亭儒來協助。第一次過件，拿到的貸款條件不如預期，但是亭儒發揮了他極強的專業跟身為業務的堅持與努力，再送第二間銀行，拿到的條件完全符合客戶需求，順利簽約。如果沒有亭儒的專業跟努力不懈，這案子可能就胎死腹中。',
  '感謝年煜，這次的案件比較棘手：第一，客人的收入沒有實質的報稅銀行無法認列；第二，夫妻共同持有，想要把留部分現金留在自己身上；第三，先生有一些信貸＋外債需要整合，也不想讓老婆知道。所以一開始在幫他處理的時候，就直接選一些特定的小銀行，從申請照會對保撥款，特殊案件特殊處理，老婆從頭到尾不知道有外債的事情，最後也成功拿到7成的貸款，完成增貸280萬，客戶對我們的服務相當滿意，感謝年煜的信任，感謝BNI。',
  '{"amount": "增貸280萬", "type": "AI程式交易 × 銀行融資"}'::jsonb,
  '2025-12-17'::timestamptz
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
  'es-case-058',
  '信託規劃 × 包裝設計',
  '來賓的口耳相傳帶來意外客戶，引薦人甚至不認識最終客戶，5.7萬升級成20萬+國際農業品牌',
  '王執定',
  '郭孝淵',
  '今天要分享一個無心插柳柳橙汁的故事。我的朋友A先生因為來長輝分會當來賓，印象深刻！A先生的客戶B先生剛好需要產品包裝設計，A先生因為對孝淵的25秒簡報很有印象，所以在會後詢問我孝淵的連絡方式，我對孝淵的包裝設計服務非常有信心，所以我告訴A先生孝淵的成功案例，讓A先生去告訴B先生，最後，B先生順利委託給孝淵包裝設計！重點來了，B先生是誰？ 我不知道！這世上只有一個人知道B先生，就是包裝設計郭孝淵！',
  '感謝執定哥的引薦，起初我以為這位客戶只是在台灣引進美國甜玉米與硬玉米的貿易商。因為沒有品牌，在銷售上一直缺乏信任感，也很難像大廠一樣吸引小農與畜牧業客戶。一開始其實不太順利，客戶非常保守，只希望「標籤能用就好」，甚至對設計師有排斥。但在深入對談後，我才發現關鍵人物其實是她的先生——來自美國愛荷華州的大地主與農業科學家。剛好我過去有相關案例與人脈在當地，當我把這些實際經驗與資源攤開來談，客戶立刻卸下心防，當場簽下 5 萬 7 的包裝設計案，從結構到再生包材全面合作。原以為案子就此結束，沒想到兩週前初稿提案後，他們不只加價續約，還延伸到美國當地品牌與台灣農業通路，整體合作規模預估超過 20 萬。謝謝執定哥，也謝謝BNI，讓我說想認識小農，卻被帶到國際舞台。',
  '{"amount": "20萬+", "type": "信託規劃 × 包裝設計"}'::jsonb,
  '2025-12-31'::timestamptz
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
  'es-case-059',
  '寵物食品 × 包裝設計',
  '寵物食品+包裝設計跨專業協作，設計一次過搞，品牌上架前即售完，客戶主動要求長期合作',
  '詹謦鴻',
  '郭孝淵',
  '真心感謝包裝設計孝淵的協助，讓我們客戶對於我們的信任感直接拉滿！他做的真的不只是包裝設計，而是把產品做到一看就覺得很值得買、也很值得合作。這次合作的客戶其實是剛進入寵物產業的新手品牌，以前就算產品內容設計再好，如果賣不好，很可能就沒有第二次合作。但孝淵的包裝設計，直接大幅提升產品的專業感跟信賴度，客戶才剛下單、產品還沒正式上架，就已經全部賣完！也因為這樣，客戶對我們整個團隊的信任度大大提升，已經主動表示希望繼續長期合作。',
  '感謝謦鴻營養師，每次只要有包裝設計相關需求，總是第一個想到我。這次的客戶是前摩斯漢堡經理，對品牌策略與市場定位非常清楚，希望打造一個能在展覽與平台上被記住、兼具質感跳脫傳統可愛風格的寵物品牌。恰好我們公司夥伴也是前摩斯的員工，再加上長期與謦鴻營養師合作，熟悉台灣寵物市場突破口，最終順利促成長期合作合約。客戶在設計上也非常相信我們的專業，設計及結構方向上幾乎都是一次過搞。更重要的是，在謦鴻營養師專業團隊的輔佐下，品牌尚未正式上架就已提前完售。這樣的成果，真的只有在BNI專業夥伴的互信合作中才能實現。',
  '{"amount": "上架前即售完", "type": "寵物食品 × 包裝設計"}'::jsonb,
  '2026-01-14'::timestamptz
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
  'es-case-060',
  '中醫師 × AI程式交易',
  '醫師最難預約拜訪，透過引薦只需線上+咖啡兩次會議直接成交，信任消除約訪門檻',
  '周律廷',
  '王年煜',
  '引薦的客戶是我一位多年的中醫朋友章醫師，他接觸虛擬貨幣多年，想尋求穩定報酬的方法，於是我想起會內從事AI程式交易的年煜主席，主席在過程中，了解章醫師需求，詳細說明原理及程式交易績效，並提供交易程式租用的服務給章醫師，感謝主席在會面過程中耐心解說，接下來交給年煜主席來說明。',
  '感謝中醫師周律廷的熱情引薦！章醫師在投資領域非常專業也有獨到的見解，第一次見面問了非常多專業的問題，還好沒有被考到。非常感謝周醫師的引薦，因為他的引薦完全跳過陌生開發新客戶的不熟悉感跟不信任，章醫師可以開門見山直接切入程式交易的核心問題，我也能一一回答，讓他了解我的程式運作方式。一次線上會議再加上一次coffee meeting，非常順利就成交，讓他願意租用我的程式。這樣的客戶開發速度如果是陌生開發是很難有如此高的效率，更何況是醫師這種忙碌到很難約訪的客戶，但因為有了周醫師這樣的引薦，我才能用最有效率的方式完成此次的生意，謝謝周醫師也謝謝BNI系統。',
  '{"amount": "兩次會議成交", "type": "中醫師 × AI程式交易"}'::jsonb,
  '2026-02-04'::timestamptz
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
  'es-case-061',
  '創意策劃 × 心靈諮詢',
  '政府標案帶出夢幻跨界引薦，為全台第一個心理健康展覽館配音，引薦人主動記起分會夥伴的獨特性',
  '邱翰城',
  '林庭瑀',
  '臺南市政府「心理健康教育館」，是我們公司去年標到的標案，這案子當中需要製作一檔宣傳動畫，來讓民眾更了解心理健康的重要性，這也即將會是全台灣第一個心理健康為主題的展覽館，於是我們需要心靈與心理的女神，才能擔當這種重要的動畫旁白配音，於是我想到了我們分會的心靈諮詢林庭瑀，只有她才能擔當重任。',
  '一直以來我都朝著讓大眾有更健康的心理素質在努力前進，從來沒想到有一天可以真的走進政府單位的心理健康教育館來協助夥伴更完善他們的內容。這次的配音只是一個起頭，更期待之後還有其他延伸出去的合作空間，讓我們彼此都擁有加乘效果，感謝BNI讓我在這邊可以接觸到各種不同的資源，這是我在使用系統之前完全想像不到的收穫，再次謝謝邱翰城！',
  '{"amount": "全台首座心理健教館", "type": "創意策劃 × 心靈諮詢"}'::jsonb,
  '2026-02-11'::timestamptz
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
  'es-case-062',
  'ZUMBA健身 × 包租代管',
  '健身教練課程中捕捉到房東需求，跨界引薦形成精準對接，信任讓交易快速成立',
  '廖涌辰',
  '李秉誠',
  '這位警察先生是我的好朋友，之前買了一間房子投資置產，但由於平常警察工作非常忙碌，也無暇去做出租管理，但想要透過出租有一個穩定的租金收入。由於我也參加過秉誠的包租代管的不動產課程，也清楚理解他們的流程以及對房東的好處跟便利性，於是當我得知這個訊息之後就立馬引薦給秉誠。',
  '感謝Terry的引薦，我們提供協助屋主出租及管理房子或是直接跟屋主用公司合法的承租房子當二房東。透過Terry的引薦，這次是一位警察長官，平常無暇照顧自己出租的房子，因為找Terry教練訓練的時候得知屋主需要出租房子及管理，進而引薦業務給我。過去要得到好的房源，需要跟客人保持良好的信任關係，而且需要一段時間才能取得房源。這一次透過BNI精準地介紹，不僅在剛開始就建立了良好的信任感，而且客戶也都非常阿莎力！感謝BNI！感謝系統！',
  '{"amount": "快速成交", "type": "ZUMBA健身 × 包租代管"}'::jsonb,
  '2026-02-25'::timestamptz
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
  'es-case-063',
  '網站開發 × 魔術方塊',
  '信任讓均價破千的兒童家教課直接成交，幼教專業講師出場讓五歲孩子四堂課學會三顆方塊',
  '李維恩',
  '李孟一',
  '五歲的小女兒跟同學對魔術方塊很感興趣，所以幾個孝順的母親就想說找幾個同學一起，湊一班，可以請個老師來家裡教。初次在網路找了一個老師教，老師玩的很開心，但小孩們完全聽不懂。後來我知道了，就請媽媽們跟魔術方塊教學界的第一把交椅：孟一的夢想一號取得聯繫。派來的老師對小孩很有一套，也很認真，沒上幾次課，小孩已經玩會了兩三種魔術方塊了。',
  '感謝維恩，我們除了跟教育機構合作，也有做魔術方塊的到府家教課程，不過到府家教魔術方塊課程其實不算便宜，三個學員買四堂課是每人4190，每堂課平均是一千元以上的均價，都比很多個別的學科家教還貴，但因為維恩的信任直接推薦，雖然這個班年紀也比較小，三個五歲的小朋友一起上，我們也派出有幼教專長的講師出馬，四堂課孩子也順利學會了三顆魔術方塊，感謝BNI系統。',
  '{"amount": "四堂課學會三顆方塊", "type": "網站開發 × 魔術方塊"}'::jsonb,
  '2026-03-04'::timestamptz
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
  'es-case-064',
  '運動營養師 × 寵物食品',
  '一個月內接到兩個整年委託，印證「BNI人脈是公司的被動收入」，跨行業信任延伸成夢幻引薦',
  '楊承樺',
  '詹謦鴻',
  '可能因為認識我的朋友知道我是營養師，因此當他們朋友有營養相關問題時會詢問一下我，但剛好近期兩個來找我問的營養都不是針對人，而是寵物的。正所謂人狗（或人貓）殊途。因此要推薦這個領域專業的寵物營養師，首選就是已經有在寵物醫院駐診營養諮詢的Julia寵物營養師，跟朋友說明一下像這樣諮詢也是有基本諮詢費用，他們也認同之後，我就幫大家引薦起來。',
  '真的很感謝楊承樺學長的引薦。過年到現在短短不到一個月時間，透過學長的介紹就接到兩個新的合作案，而且都是整個系列產品的開發專案，客戶直接委託一整年的產品開發服務。這樣的合作，在過去往往需要花非常長時間溝通與建立信任，才有機會成案，真的可以說是夢幻引薦。但在BNI的人脈連結下，因為客戶本來就信任長輝夥伴，這份信任也自然延伸到我身上，讓合作能很快建立信任、快速成案。也因此很多寵物產業的朋友常常問我「公司沒有業務，為什麼還能一直有合作機會？」，我都會笑著說「在BNI，人脈引薦就是公司的被動收入。」感謝最溫暖的長輝。',
  '{"amount": "兩個整年委託", "type": "運動營養師 × 寵物食品"}'::jsonb,
  '2026-03-11'::timestamptz
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
  'es-case-065',
  '信託規劃 × 弱電資訊',
  '25秒簡報讓「買電腦找秉辰」成為分會口頭禪，前後累計超過10台，口碑持續滾動',
  '王執定',
  '施秉辰',
  '我台南的同事需要購買新電腦，正在momo、pchome比規格比價錢，比的眼花繚亂，然後又擔心買了以後有沒有附贈軟體、有沒有售後服務。這個時候，我的耳邊就響起「買電腦找秉辰、秉辰有在賣電腦」，我把他們的需求告訴秉辰哥，立馬就推薦他們CP值最高的機種，還包含完整的售後服務，客人買的開心，用的安心。',
  '感謝信託規劃顧問王執定的引薦。大家都知道：買電腦找秉辰、秉辰有在賣電腦，我也經常會找一些CP值高、品質精良的電腦產品在群組中分享給大家。這次執定就是推薦他台南同事來跟我買電腦，沒有見面，完全是執定把規格、價格告訴對方，買家就直接買單了。而且，執定已經不是第一次引薦他的周邊同事、朋友來跟我買電腦了，前前後後加起來應該10台或超過10台了。一般買電腦通常就是上網比價，透過BNI的系統，夥伴們的口碑引薦，買家非常放心就下決定，也不用擔心售後找不到賣家服務問題。',
  '{"amount": "累計超過10台", "type": "信託規劃 × 弱電資訊"}'::jsonb,
  '2026-03-18'::timestamptz
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
  'es-case-066',
  '包裝設計 × 寵物食品',
  '一個引薦開啟聯華製粉信任鏈，從寵物品牌顧問延伸到日本JINS+美國Lovita，跨國引薦連鎖效應',
  '郭孝淵',
  '詹謦鴻',
  '前年因緣際會接到上市櫃公司聯華製粉的合作邀約，請我們公司協助設計他們即將推出的寵物食品品牌包裝，當時聽到他們正在找尋專業可靠的寵物營養師，來協助確認整體品牌成分營養時，我立即想到我們的寵物營養博士Julia！最終，他們僅透過一通電話就確定彼此合作，並起開啟詹博士為聯華新品牌的一連串講座、工訪及合作代言。就在上周，我又接到詹博士的喜訊，聯華引薦她日本知名連鎖眼鏡品牌JINS以及美國知名保健品LOVITA。',
  '前年透過孝淵的介紹，我接到聯華製粉的合作機會。當時他們正在做寵物新品牌，需要一位營養師協助整體配方與營養設計。我們其實只通了一通電話，就很快建立信任，直接確定合作，一起設計了寵物DIY預拌粉，今年繼續委託，但不是單次案子，是一整年的品牌顧問合作。更關鍵的是，透過聯華的引薦，我又接到日本眼鏡品牌JINS，以及美國知名保健品Lovita的合作機會。這次讓我很深刻感受到，BNI的引薦，不只是介紹客戶，而是把信任一起帶過去，讓合作可以非常快發生。一個好的引薦，真的可以開啟一整條合作鏈。感謝孝淵，感謝長輝的大家。',
  '{"amount": "JINS+Lovita跨國合作", "type": "包裝設計 × 寵物食品"}'::jsonb,
  '2026-03-25'::timestamptz
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
  'es-case-067',
  '節能除濕 × 空調工程',
  '信任讓豪宅工程從兩個月比價壓縮到1-2週直接成交，引薦人從未到場、被引薦人從未見過業主，純電話即搞定，完美體現「信任 = 效率」',
  '廖乙宸',
  '洪智威',
  '台中一家設計公司委託我做全案規劃，因為品質要求極高，業主強烈希望連施工也能一起包辦，不想另外發包。我第一時間就想到洪智威——我對他的專業非常有信心，直接把這個案子轉介給他。我自己全程只到現場一次，其餘的都交給洪智威處理。這就是 BNI 的力量，我不需要自己懂空調，但我認識最好的空調工程師。',
  '感謝廖乙宸的信任引薦。這個案子在桃園中越百花園，是一個要求相當高的豪宅工程。通常這類案子，從洽談到比價到成交，往往需要兩個月。但因為廖乙宸的引薦背書，業主對我的信任從第一天就建立好了——我甚至全程沒有見過設計公司總監，完全透過電話溝通，1到2週就直接成交，報價完全沒有議價。這就是本週教育時間說的：信任帶來效率。引薦不是轉傳名片，是把你的信用一起交過去。感謝廖乙宸，也感謝 BNI。',
  '{"amount": "1-2週成交", "type": "節能除濕 × 空調工程"}'::jsonb,
  '2026-05-27'::timestamptz
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

-- Total: 67 cases