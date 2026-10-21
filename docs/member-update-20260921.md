# 2026-09-21 會員更新

正式資料來源為 Supabase `public.members`，不是 Git 內的舊名單。
網站 `src/api/members.ts` 僅讀取 `active` 或相容舊資料的空狀態會員。

| 會員 ID | 姓名 | 更新 |
| --- | --- | --- |
| 41 | 吳貞妮 | industry 改為文創商業設計；產業分組與其他介紹不變 |
| 62 | 湯益承 | status=frozen、membership_type=resigned |
| 1010 | 吳儀沂 | status=frozen、membership_type=resigned |

已透過 Supabase 後台執行對應更新並查核三筆結果；保留會員、帳號綁定及歷史引薦。
可稽核 SQL 位於 `scripts/migration_members_20260921.sql`，不會由部署自動執行。

`public/data/members.json` 是不完整的歷史匯入快照，並非正式會員名單，
其中已有的吳貞妮產業及湯益承狀態已同步修正；吳儀沂不在該舊快照中。
請勿重新匯入整份快照覆蓋線上資料。正式顯示須以 Supabase 為準。

驗證時重新載入 `/members`：兩位離會會員不應出現在現任名單，
吳貞妮產業應為文創商業設計。歷史引薦內容不因離會而刪除。
