# BNI 分會官網 Clone 部署指南

> **目標讀者：** AI Agent 或開發者。按照本指南的步驟逐一詢問使用者，即可為新分會部署一個完整的官方網站。

---

## 概覽

本專案是 BNI 長輝白金分會的官方網站，採用以下技術棧：

- **前端：** React 19 + Vite 7 + Tailwind CSS 4
- **後端/資料庫：** Supabase (PostgreSQL + Auth + Storage + RLS)
- **部署：** 任何支援 Node.js 的平台（Zeabur / Vercel / Railway / Render）

Clone 新分會需要完成 **7 個步驟**，每個步驟都列出了需要向使用者詢問的問題。

---

## 步驟 1：基本資訊收集

向使用者詢問以下資訊：

| 問題 | 範例值（長輝分會） | 用途 |
|------|---------------------|------|
| 分會中文名稱？ | `長輝白金分會` | 品牌顯示 |
| 分會英文名稱？ | `EverShine` | URL、代碼 |
| 分會全名？ | `BNI 長輝白金分會` | SEO、結構化資料 |
| 分會英文全名？ | `BNI EverShine Chapter` | 法律文件 |
| 例會時間（星期幾、幾點到幾點）？ | `週三 06:30-08:30` | 結構化資料、FAQ |
| 例會形式（線上/實體/混合）？ | `線上` | SEO 關鍵字 |
| 分會所在城市？ | `台北市` | 地理 SEO |
| 網站網域？ | `evershine.tw` | 部署、SEO |
| Facebook 粉專 URL？ | `https://www.facebook.com/BNIEverShine` | 社群連結 |
| Instagram URL？ | `https://www.instagram.com/bnievershine` | 社群連結 |
| Threads URL？（可選） | `https://www.threads.net/@chhubni` | 社群連結 |
| 分會認領密碼？（會員綁定帳號用） | （由分會自訂） | 安全認證 |
| 產業類別清單？（最多 9 個） | 見 site.config.ts | 會員分類 |
| 分會聯絡人（主席/副主席/秘書）？ | 姓名、職稱、電話、信箱 | Contact 區塊 |

---

## 步驟 2：建立 Supabase 專案

### 2.1 建立新專案

1. 前往 [supabase.com](https://supabase.com) 建立新專案
2. 記下以下資訊：
   - **Project URL:** `https://xxxxxxxx.supabase.co`
   - **Anon Key:** `eyJhbGciOiJIUzI1NiIs...`
   - **Service Role Key:** （僅供後端使用，勿放前端）

### 2.2 建立資料表

在 Supabase Dashboard → SQL Editor 執行以下 SQL：

```sql
-- ============================================
-- 1. 會員資料表
-- ============================================
CREATE TABLE IF NOT EXISTS members (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    photo TEXT DEFAULT '',
    industry TEXT DEFAULT '',
    category TEXT DEFAULT '',
    company TEXT DEFAULT '',
    position TEXT DEFAULT '',
    title TEXT DEFAULT '',
    "shortIntro" TEXT DEFAULT '',
    "fullIntro" TEXT DEFAULT '',
    links JSONB DEFAULT '{}',
    services TEXT[] DEFAULT '{}',
    hashtags TEXT[] DEFAULT '{}',
    "editCount" INTEGER DEFAULT 0,
    "photoPosition" TEXT DEFAULT 'center',
    user_id UUID REFERENCES auth.users(id),
    email TEXT DEFAULT '',
    phone TEXT DEFAULT '',
    is_admin BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 2. 引薦案例表
-- ============================================
CREATE TABLE IF NOT EXISTS referrals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    referrer_name TEXT NOT NULL,
    referee_name TEXT NOT NULL,
    referrer_story TEXT DEFAULT '',
    referee_story TEXT DEFAULT '',
    metrics JSONB DEFAULT '{"amount": "", "type": ""}',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 3. 首頁統計數據表
-- ============================================
CREATE TABLE IF NOT EXISTS homepage_stats (
    month TEXT PRIMARY KEY,
    referral_count INTEGER DEFAULT 0,
    referral_value BIGINT DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 4. 頁面瀏覽紀錄表
-- ============================================
CREATE TABLE IF NOT EXISTS page_views (
    id BIGSERIAL PRIMARY KEY,
    path TEXT NOT NULL,
    user_agent TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 5. 分析事件表
-- ============================================
CREATE TABLE IF NOT EXISTS analytics_events (
    id BIGSERIAL PRIMARY KEY,
    event_name TEXT NOT NULL,
    event_data JSONB DEFAULT '{}',
    user_agent TEXT DEFAULT '',
    path TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now()
);
```

### 2.3 執行 RLS 策略

執行 `scripts/supabase-rls.sql` 中的完整 SQL（見步驟 7）。

### 2.4 建立 Storage Bucket

1. Supabase Dashboard → Storage → New Bucket
2. 名稱：`member-photos`
3. 設定為 **Public bucket**
4. 檔案大小限制：**5MB**
5. 允許的 MIME 類型：`image/jpeg, image/png, image/webp, image/gif`

### 2.5 設定 Auth

1. Supabase Dashboard → Authentication → Providers
2. 啟用 **Email** provider（預設已啟用）
3. 如需 Google 登入：啟用 **Google** provider，填入 OAuth Client ID 和 Secret
4. Authentication → URL Configuration：
   - **Site URL:** `https://你的網域.tw`
   - **Redirect URLs:** `https://你的網域.tw`, `https://你的網域.tw/login`, `http://localhost:5173`

### 2.6 設定 Cloudflare Turnstile（防機器人）

1. 前往 [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) 建立 Widget
2. Site Key 填入環境變數 `VITE_TURNSTILE_SITE_KEY`
3. Supabase Dashboard → Authentication → Attack Protection → Enable Captcha Protection
4. 選 Turnstile，填入 Secret Key

---

## 步驟 3：修改品牌配置

### 3.1 `src/config/site.config.ts`

這是最核心的配置檔。根據步驟 1 收集到的資訊，修改所有欄位：

```typescript
export const siteConfig = {
    branchName: '【新分會名稱】',
    branchNameEn: '【英文名】',
    branchFullName: 'BNI 【新分會名稱】',
    branchFullNameEn: 'BNI 【英文名】 Chapter',
    organization: 'BNI',

    siteUrl: 'https://【新網域】',
    siteDomain: '【新網域】',

    meeting: {
        day: '【星期幾英文】',        // e.g. 'Wednesday'
        dayZh: '【星期幾中文】',      // e.g. '週三'
        startTime: '【開始時間】',    // e.g. '06:30'
        endTime: '【結束時間】',      // e.g. '08:30'
        timezone: 'Asia/Taipei',
        format: '【online/offline/mixed】',
        formatDescription: '【描述】', // e.g. '100% 支援線上與會'
    },

    location: {
        city: '【城市】',
        region: '【地區】',
        country: 'TW',
        countryName: '台灣',
        latitude: 【緯度】,
        longitude: 【經度】,
        geoRegion: '【TW-XXX】',
    },

    social: {
        facebook: '【Facebook URL】',
        instagram: '【Instagram URL】',
        threads: '【Threads URL】',
    },

    logos: {
        square: '/images/assets/logo/【正方形logo檔名】',
        horizontal: '/images/assets/logo/【橫式logo檔名】',
        bni: '/images/assets/logo/bni-logo-new.png',
    },

    defaultPhoto: '/images/assets/logo/【預設頭像檔名】',

    claimPassword: import.meta.env.VITE_CLAIM_PASSWORD || '【預設密碼】',

    industries: [
        '【產業1】',
        '【產業2】',
        // ...
    ],
};
```

### 3.2 Logo 圖片

將新分會的 Logo 放入 `public/images/assets/logo/` 目錄：
- 正方形 Logo（用於 favicon、預設頭像）
- 橫式 Logo（用於 Navbar、Footer）
- 社群分享圖放在 `public/images/og/`，尺寸 **1200×630**（`home.jpg`、`bni.jpg`、`members.jpg`、`referrals.jpg`）。不要用正方形 Logo 當 `og:image`，LINE 與 Facebook 會把預覽裁得很醜。

### 3.3 `seo-routes.js`

修改每個路由的 title / description / keywords / ogImage / ogImageAlt，將「長輝」替換為新分會名稱。標題控制在約 30 個字以內，描述控制在約 70–110 個字，並與 `index.html` 首頁預設值保持一致。`server.js` 會依這個檔案注入給不執行 JavaScript 的爬蟲與社群預覽。

### 3.4 `index.html`

需要修改的區塊：
1. **`<title>`** 和所有 `<meta>` 標籤中的品牌名稱
2. **`<link rel="canonical">`** 的網域
3. **所有 `og:` 和 `twitter:` 標籤** 中的網域和品牌名
4. **Geo tags** 中的經緯度（如果不同城市）
5. **JSON-LD 結構化資料** 中的所有品牌名、URL、地址
6. **`<noscript>` 區塊** 中的所有品牌名和描述

> 提示：用全域搜尋替換 `長輝` → `【新名稱】`，`evershine.tw` → `【新網域】`

### 3.5 `public/sitemap.xml`

替換所有 `https://evershine.tw` 為新網域。

### 3.6 `public/robots.txt`

替換 Sitemap URL 為新網域。

### 3.7 `src/components/home/Contact.tsx`

更新領導團隊資訊（主席、副主席、秘書的姓名和聯絡方式）。

---

## 步驟 4：設定環境變數

建立 `.env` 檔案：

```env
# Supabase（必填）
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...

# 分會認領密碼（必填）
VITE_CLAIM_PASSWORD=【分會自訂密碼】

# Cloudflare Turnstile（建議）
VITE_TURNSTILE_SITE_KEY=【Turnstile Site Key】

# Google Analytics 4（可選）
VITE_GA_ID=G-XXXXXXXXXX

# Facebook Pixel（可選）
VITE_FB_PIXEL_ID=

# Microsoft Clarity（可選）
VITE_CLARITY_ID=
```

---

## 步驟 5：初始資料設定

### 5.1 建立管理員帳號

1. 在網站上用 Email 或 Google 註冊一個帳號
2. 到 Supabase Dashboard → Table Editor → `members`
3. 新增一筆管理員資料，填入：
   - `name`: 管理員姓名
   - `user_id`: 該帳號的 UUID（從 Authentication → Users 中複製）
   - `is_admin`: `true`
   - 其他欄位依需求填寫

### 5.2 批量匯入會員

在 Supabase Table Editor 或用 CSV 匯入所有會員基本資料（`name`, `industry`, `company` 等）。
`user_id` 留空 — 會員之後自己登入認領。

### 5.3 輸入首頁統計數據

在 `homepage_stats` 表中插入一筆資料，或登入管理後台 → 數據設定 → 填寫。

---

## 步驟 6：建構與部署

```bash
# 安裝依賴
npm install

# 開發模式預覽
npm run dev

# 正式建構
npm run build

# 本地測試正式版
npm start
```

### 部署選項

**Zeabur（推薦）：**
1. 連接 GitHub repo
2. 設定環境變數
3. 自動部署

**Vercel：**
1. Import GitHub repo
2. Framework Preset: Vite
3. 設定環境變數
4. 注意：需要額外處理 SPA routing（vercel.json rewrites）

**自架 VPS：**
1. `npm run build`
2. `node server.js`（已內建 SPA fallback + SEO meta injection）

### DNS 設定

將新網域指向部署平台的 IP/CNAME。

---

## 步驟 7：執行 RLS 安全策略

**必須執行！** 在 Supabase Dashboard → SQL Editor 執行 `scripts/supabase-rls.sql` 的完整內容。

這會啟用 Row Level Security 保護所有資料表，確保：
- 會員只能修改自己的資料
- 管理員可以管理所有資料
- 公開頁面可以讀取展示資料
- 私密欄位受到保護

---

## 步驟 8：上線後檢查清單

- [ ] 網站可正常存取
- [ ] 會員可以註冊/登入
- [ ] 會員可以認領自己的檔案
- [ ] 會員可以編輯自己的資料
- [ ] 管理員可以存取後台
- [ ] 管理員可以新增/刪除會員
- [ ] 圖片上傳正常
- [ ] Google Search Console 已提交 sitemap
- [ ] Google Business Profile 已建立
- [ ] 社群連結正確

---

## 快速搜尋替換清單

以下是在整個專案中需要替換的品牌關鍵字（方便全域搜尋替換）：

| 搜尋 | 替換為 |
|------|--------|
| `長輝白金分會` | `【新分會名稱】` |
| `長輝` | `【新分會短名】` |
| `EverShine` | `【新英文名】` |
| `evershine` | `【新英文名小寫】` |
| `evershine.tw` | `【新網域】` |
| `BNIEverShine` | `【新FB帳號名】` |
| `bnievershine` | `【新IG帳號名】` |
| `chhubni` | `【新Threads帳號】` |

---

## 檔案修改清單（按重要性排序）

| 優先序 | 檔案 | 修改內容 |
|--------|------|----------|
| 1 | `src/config/site.config.ts` | 所有品牌配置 |
| 2 | `.env` | Supabase、密碼、Analytics |
| 3 | `index.html` | Meta tags、結構化資料、noscript |
| 4 | `seo-routes.js` | Server-side SEO meta |
| 5 | `public/sitemap.xml` | 網域 |
| 6 | `public/robots.txt` | Sitemap URL |
| 7 | `public/images/assets/logo/` | Logo 圖片檔 |
| 8 | `src/components/home/Contact.tsx` | 領導團隊資訊 |
| 9 | `src/pages/Home.tsx` | 首頁文案（Hero、BNI 介紹等） |
| 10 | `src/pages/BNI.tsx` | BNI 頁面統計數據 |
| 11 | `src/components/home/FAQ.tsx` | FAQ 問答內容 |
| 12 | `src/components/home/About.tsx` | 關於我們文案 |
