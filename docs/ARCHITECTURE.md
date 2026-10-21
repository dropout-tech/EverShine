# EverShine 前端架構

## 技術棧

- **React 19** + **Vite 7** + **TypeScript**
- **React Router 7**（路由）
- **Tailwind CSS v4**（樣式）
- **Supabase JS**（Auth + Postgres + Realtime）
- **TanStack Query**（伺服器狀態快取：`members`、`referrals` 列表、後台儀表板 bundle）
- **Framer Motion**（動畫）

## 目錄職責

| 路徑 | 說明 |
|------|------|
| `src/pages/` | 路由頁面，宜保持薄；複雜 UI 放在 `components/` |
| `src/components/layout/` | 全站外殼：Navbar、Footer、背景 |
| `src/components/common/` | SEO、PageHero、通用小件 |
| `src/components/loading/` | 統一載入／骨架／錯誤／SmartImage（全站視覺規範） |
| `src/components/admin/` | 後台分頁：`AdminOverviewTab`、`AdminMembersTab`、`AdminReferralsTab`、`AdminSettingsTab`、`MemberList` |
| `src/hooks/` | `useMembers`、`useReferrals`（底層呼叫 `src/api/` + Query） |
| `src/api/` | 純資料函式：`fetchPublicMembers`、`fetchReferralsForDisplay`、`fetchAdminDashboardBundle`、`queryKeys` |
| `src/lib/` | 無 UI：`supabase` 客戶端、`sanitize`、`cn`、analytics |
| `src/config/` | `site.config` 品牌與環境 fallback |
| `src/styles/` | 全域補充樣式 |
| `scripts/` | Supabase SQL、遷移 |

## 資料來源對照（避免混淆）

| 使用者看到 | 資料表 / 來源 |
|------------|----------------|
| 首頁「引薦成果」數字 | `homepage_stats`（後台 **設定** 分頁） |
| 引薦案例列表／內容 | `referrals`（後台 **引薦** 分頁；前台 `/referrals` 會再合併 `src/data/referral-cases-extra.json`，同一 id 以資料庫為準）。前台會套用 `src/data/referral-brand-replacements.json`，把客戶品牌改成通稱。 |
| 會員名錄 | `members` |

## 載入 UX

- **LoadingScreen**：僅首次訪問／較慢載入時的全屏歡迎動畫。
- **`components/loading`**：頁內骨架、錯誤、空狀態。
- **TanStack Query**：減少重複請求；`members` 表變更仍透過 Supabase Realtime `invalidate`。

## 測試

- **E2E**：Playwright，`e2e/smoke.spec.ts`（需先 `npm run build && npx vite preview` 或設定 `PLAYWRIGHT_BASE_URL`）。
- 指令：`npm run test:e2e`（需已安裝瀏覽器：`npx playwright install`）。

## 部署注意

- 環境變數見 `.env.example`、`ENV_SETUP.md`。
- **`dist/` 不納入 Git**：正式機須先 `npm run build`（Dockerfile 已於 builder 階段建置）。
- **內部檢查腳本**：`node .agent/check-migration.mjs`、`node .agent/check-file-references.mjs`（已對齊現況：App 組合 Navbar/Footer、會員資料來自 Supabase 等）。

## 對話歷程中的待辦狀態（摘要）

| 項目 | 狀態 |
|------|------|
| 登入／Turnstile／OAuth／認領邏輯 | 已於先前迭代實作 |
| 十種載入 UI + 頁面套用 | 已實作 |
| 首頁 Hero 大標／小標分離（`h1` + `p`）、捲動提示 | 已實作 |
| 首頁底部「聯繫」三尊資料與版面 | 已實作 |
| 後台引薦成果／案例 | 已實作 |
| 架構階段 A–D（Query、Admin 拆分、E2E、文件） | 已合併 `main` |
| `@tanstack/react-query` 為 **dependencies** | 已修正 |
| 會員／引薦頁錯誤「重試」改 **invalidateQueries** | 已修正 |
| `.agent` 檢查腳本（Layout、dist、useMembers 等） | 已更新，遷移檢查可 100% 通過 |
| ESLint 大量 **warning**（LoadingScreen、NotFound、Login ref 等） | 未全數消除，可分期重構 |
