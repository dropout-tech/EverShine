# 🌟 EverShine BNI 長輝白金分會 官方網站

這是一個為 **BNI 長輝白金分會 (EverShine Chapter)** 打造的現代化、全端雲端官方網站。本專案旨在展示分會成員的專業形象、簡化會員資料管理流程、並透過數據化呈現分會的優越績效。

---

## 🎨 視覺設計系統 (Design System) - 長輝藍

本專案採用 **EverShine Blue (長輝藍)** 作為核心品牌識別，展現分會的專業與凝聚力：

*   **天際藍 (Sky Blue)**：作為主色調，象徵廣闊的商業藍海與無限的合作可能。
*   **深邃黑 (Deep Black)**：底層配色營造科技感與穩重感，讓內容更顯專業。
*   **動態星空**：象徵商務引薦如繁星般閃耀，串聯起每一位會員的商機。

---

## 🗺️ 網頁架構組織圖 (Site Architecture)

### 1. 首頁 (Home Page) - 資訊總覽
*   **[Hero] 頂級導航**：強大的視覺衝擊與品牌色標語。
*   **[About] 關於長輝**：分會的核心價值與願景介紹。
*   **[MemberWall] 會員牆**：動態跑馬燈展示分會成員的專業縮影。
*   **[Results] 數據成就**：視覺化展示引薦金額與商務成果。
*   **[BNI Intro] 認識 BNI**：介紹全球最大商務機構的運作邏輯。
*   **[FAQ] 常見問題**：解答訪客對於分會運作的疑問。
*   **[Contact] 領導團隊**：動態連結最新任主席、副主席、秘財之聯繫方式。

### 2. 成員名錄 (Members Page) - 專業媒合
*   **[Filter] 行業篩選**：透過標籤快速找尋特定產業的專業人士。
*   **[Grid] 會員列表**：以簡約大氣的卡片形式展示所有成員。
*   **[Profile] 會員詳頁**：深入了解成員的服務內容、經歷與聯繫方式。

### 3. 引薦報告 (Referrals Page) - 成果展示
*   **[Referral Stats] 統計數據**：展示分會內部的互助成果。
*   **[Showcase] 引薦案例**：分享成功的商務對接故事。

### 4. 會員中心 (Member Edit) - 自主管理
*   **[Auth] 會員登入**：支援 Email 與 Google 快速登入。
*   **[Editor] 資料編輯**：固定式儲存標頭，支援即時預覽與圖片壓縮。
*   **[Self-Management] 內容掌控**：成員可隨時更新自己的產業定位與服務項目。

---

## 🚀 核心技術 (Tech Stack)

| 類別 | 技術 | 說明 |
| :--- | :--- | :--- |
| **前端** | React 18 / Vite | 極速開發與部署 |
| **樣式** | Tailwind 4 | 現代化、可擴展的 CSS 框架 |
| **資料庫** | Supabase DB | PostgreSQL 強大驅動 |
| **驗證** | Supabase Auth | 提供多方登入與安全 Session |
| **存儲** | Supabase Storage | 存儲高品質會員照片 |
| **部署** | Zeabur | 自動化容器部署與管理 |

---

## 📂 專案指南 (Project Roadmap)

本專案以 **KISS (Keep It Simple, Stupid)** 與 **DRY (Don't Repeat Yourself)** 為開發原則。所有的視覺元件皆與長輝品牌藍色調保持一致。

---

## 🔧 開發環境變數 (.env)
```bash
VITE_SUPABASE_URL=你的_URL
VITE_SUPABASE_ANON_KEY=你的_KEY
VITE_TURNSTILE_SITE_KEY=機器人防護_KEY
```

---

## 為什麼首頁會一片空白

瀏覽器套件在打包時就把 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY` 寫進去。Dockerfile 若沒有宣告這兩個 `ARG`，Zeabur 建置時拿不到變數，網站會在啟動時中斷，畫面留白。

現在有兩層保護：建置參數會進映像，執行中的 `server.js` 也會把同一組公開變數注入頁面。就算建置當下沒帶上，只要 Zeabur 服務有設定，首頁、會員與引薦仍會顯示。

## 搜尋與分享預覽

社群預覽（LINE、Facebook、Slack）讀的是伺服器回傳的 HTML，不會執行頁面上的 JavaScript。

- 分享圖在 `public/images/og/`，尺寸 1200×630。正方形 Logo 只用於 favicon，不用來當 `og:image`。
- 各頁標題、描述與分享圖集中在 `seo-routes.js`。`server.js` 依網址注入；前端 `SEO` 元件在換頁時同步同一份資料。
- 首頁的 FAQ 與每週例會結構化資料只出現在首頁。例會日期會在回應時改成下一個週三。

## 部署到 Cloudflare Pages

Pages 只放靜態檔，加一支處理 `/` 的 Function。`server.js` 的頁首改寫邏輯抽到 `seo-render.js`，Zeabur 與 Pages 共用。

| 設定 | 值 |
|---|---|
| Build command | `npm run build`（`vite build` 後跑 `scripts/prerender-routes.mjs`） |
| Build output directory | `dist` |
| 環境變數 `NODE_VERSION` | `22`（Vite 7 需要 Node 20.19+ 或 22.12+） |
| 建置環境變數 | `VITE_SUPABASE_URL`、`VITE_SUPABASE_ANON_KEY`、`VITE_CLAIM_PASSWORD`、`VITE_TURNSTILE_SITE_KEY`、`VITE_GA_ID`、`VITE_FB_PIXEL_ID`、`VITE_CLARITY_ID` |

- Pages 沒有執行中的 `server.js`，不會注入 `window.__EVERSHINE_ENV__`。上面這組變數一定要在建置時設定，否則會打包成空值。
- `npm run build` 會為每個路由產生一個檔案：`dist/index.html`（首頁）、`dist/bni.html` 等 SEO 頁、`dist/login.html` 等不索引頁，以及 `dist/404.html`。Pages 以 `/bni` 提供 `bni.html`，未知路徑回 404。
- `functions/index.js` 只處理 `/`，每次回應時把例會日期改成下一個週三。
- 快取與 `X-Robots-Tag` 寫在 `public/_headers`。
- Zeabur 用 `npm run build:zeabur`（只跑 `vite build`）：`server.js` 依每次請求改寫原始樣板，不能讀已預先產生的首頁。

## 📚 開發文件

### 核心文件
- **[Supabase 整合指南](docs/SUPABASE_INTEGRATION_GUIDE.md)** - 完整的 Supabase 互動說明，包括連接設定、資料操作、安全性設定等

### 安全性文件
- **[安全性修復指南](docs/SUPABASE_SECURITY_FIX_GUIDE.md)** - Supabase 資安警告修復步驟
- **[安全性檢查清單](SECURITY_CHECKLIST.md)** - 企業級安全性檢查項目
- **[快速安全參考](docs/QUICK_SECURITY_REFERENCE.md)** - 常見安全問題與解決方案

### 環境設定
- **[環境變數設定](ENV_SETUP.md)** - 詳細的環境變數設定說明
- **[安裝新套件指南](docs/INSTALLING_PACKAGES.md)** - 如何安裝和管理 npm 套件
- **[開發工具與擴充功能設定](docs/DEVELOPER_TOOLS_SETUP.md)** - VSCode 擴充功能與 2026 最新開發技術推薦

---

## 📮 聯絡我們
如果有任何功能建議或錯誤回報，請聯繫長輝分會行政團隊。

Built with ❤️ by **DeepMind EverShine Team**.