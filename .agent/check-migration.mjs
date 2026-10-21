#!/usr/bin/env node
/**
 * EverShine 網站遷移自動檢查腳本
 * 檢查新版 React 網站是否完整實作舊版功能
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const results = {
    passed: [],
    failed: [],
    warnings: []
};

function check(id, description, condition, severity = 'error') {
    const result = {
        id,
        description,
        passed: condition
    };

    if (condition) {
        results.passed.push(result);
        console.log(`✅ [${id}] ${description}`);
    } else {
        if (severity === 'warning') {
            results.warnings.push(result);
            console.log(`⚠️  [${id}] ${description}`);
        } else {
            results.failed.push(result);
            console.log(`❌ [${id}] ${description}`);
        }
    }
}

function fileExists(filePath) {
    return fs.existsSync(path.join(rootDir, filePath));
}

function fileContains(filePath, searchString) {
    if (!fileExists(filePath)) return false;
    const content = fs.readFileSync(path.join(rootDir, filePath), 'utf-8');
    return content.includes(searchString);
}

console.log('🔍 開始檢查 EverShine 網站遷移...\n');

// ===== 基礎設施檢查 =====
console.log('\n📋 基礎設施檢查\n' + '='.repeat(50));

check('001', 'package.json 存在', fileExists('package.json'));
check('002', 'vite.config.ts 存在', fileExists('vite.config.ts'));
check('003', 'tsconfig.json 存在', fileExists('tsconfig.json'));
check('004', 'Tailwind 已設定（Vite 外掛或 postcss）',
    fileContains('vite.config.ts', 'tailwindcss') || fileContains('postcss.config.js', 'tailwindcss'));
check('005', 'Dockerfile 存在', fileExists('Dockerfile'));
check('006', 'React 依賴已安裝', fileContains('package.json', '"react"'));
check('007', 'TypeScript 依賴已安裝', fileContains('package.json', '"typescript"'));
check('008', 'Framer Motion 已安裝', fileContains('package.json', '"framer-motion"'));
check('009', 'React Router 已安裝', fileContains('package.json', '"react-router-dom"'));
check('010', 'src 目錄存在', fileExists('src'));

// ===== 頁面組件檢查 =====
console.log('\n📄 頁面組件檢查\n' + '='.repeat(50));

check('011', 'Home 頁面存在', fileExists('src/pages/Home.tsx'));
check('012', 'Members 頁面存在', fileExists('src/pages/Members.tsx'));
check('013', 'Referrals 頁面存在', fileExists('src/pages/Referrals.tsx'));
check('014', 'BNI 頁面存在', fileExists('src/pages/BNI.tsx'));
check('015', 'Edit 頁面存在', fileExists('src/pages/Edit.tsx'));

// ===== 全站版面（App 組合 Navbar / Footer；已不使用獨立 Layout.tsx）=====
console.log('\n🧭 全站版面檢查\n' + '='.repeat(50));

check('016', 'App.tsx 組合 Navbar / Footer（取代舊 Layout）', fileContains('src/App.tsx', 'Navbar') && fileContains('src/App.tsx', 'Footer'));
check('017', 'Navbar 組件存在', fileExists('src/components/layout/Navbar.tsx'));
check('018', 'Footer 組件存在', fileExists('src/components/layout/Footer.tsx'));
check('019', 'StarryBackground 組件存在', fileExists('src/components/layout/StarryBackground.tsx'));

// ===== Home 頁面組件檢查 =====
console.log('\n🏠 Home 頁面組件檢查\n' + '='.repeat(50));

check('020', 'About 組件存在', fileExists('src/components/home/About.tsx'));
check('021', 'Results 組件存在', fileExists('src/components/home/Results.tsx'));
check('022', 'MemberWall 組件存在', fileExists('src/components/home/MemberWall.tsx'));
check('023', 'FAQ 組件存在', fileExists('src/components/home/FAQ.tsx'));
check('024', 'Contact 組件存在', fileExists('src/components/home/Contact.tsx'));

// ===== Members 頁面組件檢查 =====
console.log('\n👥 Members 頁面組件檢查\n' + '='.repeat(50));

check('025', 'MemberCard 組件存在', fileExists('src/components/members/MemberCard.tsx'));
check('026', 'CategoryFilter 組件存在', fileExists('src/components/members/CategoryFilter.tsx'));

// ===== 資源檔案檢查 =====
console.log('\n🖼️  資源檔案檢查\n' + '='.repeat(50));

check('027', 'public 目錄存在', fileExists('public'));
check('028', 'images 目錄存在', fileExists('public/images'));
check('029', 'members 照片目錄存在', fileExists('public/images/members'));
check('030', 'assets 目錄存在', fileExists('public/images/assets'));
check('031', 'logo 目錄存在', fileExists('public/images/assets/logo'));
check('032', 'background.png 存在', fileExists('public/images/assets/background.png'));
check('033', 'EverShine logo 存在', fileExists('public/images/assets/logo/白色正方形logo.png'));
check('034', 'BNI logo 存在', fileExists('public/images/assets/logo/bni-logo-new.png'));
check('035', 'members.json 存在', fileExists('public/data/members.json'));
check('036', 'referrals.json 存在', fileExists('public/data/referrals.json'));

// ===== 內容檢查 =====
console.log('\n📝 內容檢查\n' + '='.repeat(50));

check('037', 'Home 頁面包含 Hero section', fileContains('src/pages/Home.tsx', 'Hero Section'));
check('038', 'Home 頁面包含主標題', fileContains('src/pages/Home.tsx', '長輝白金分會'));
check('039', 'Home 頁面包含副標題', fileContains('src/pages/Home.tsx', '我們一起，打造你的夢幻'));
check('040', 'Home 頁面包含英文標語', fileContains('src/pages/Home.tsx', 'Stand by we'));
check('041', 'Home 頁面包含加入我們按鈕', fileContains('src/pages/Home.tsx', '加入我們'));
check('042', 'Home 頁面包含 BNI 介紹區塊', fileContains('src/pages/Home.tsx', '什麼是'));
check('043', 'Home 頁面包含 About 組件', fileContains('src/pages/Home.tsx', '<About'));
check('044', 'Home 頁面包含 MemberWall 組件', fileContains('src/pages/Home.tsx', '<MemberWall'));
check('045', 'Home 頁面包含 Results 組件', fileContains('src/pages/Home.tsx', '<Results'));
check('046', 'Home 頁面包含 FAQ 組件', fileContains('src/pages/Home.tsx', '<FAQ'));
check('047', 'Home 頁面包含 Contact 組件', fileContains('src/pages/Home.tsx', '<Contact'));
check('048', 'Hero 使用背景圖（PageHero）', fileContains('src/components/common/PageHero.tsx', 'background.png'));

// ===== 路由檢查 =====
console.log('\n🛣️  路由檢查\n' + '='.repeat(50));

check('049', 'App.tsx 包含 BrowserRouter', fileContains('src/App.tsx', 'BrowserRouter'));
check('050', 'App.tsx 包含 Routes', fileContains('src/App.tsx', 'Routes'));
check('051', 'App.tsx 包含首頁路由', fileContains('src/App.tsx', '<Home'));
check('052', 'App.tsx 包含 Members 路由', fileContains('src/App.tsx', 'members'));
check('053', 'App.tsx 包含 Referrals 路由', fileContains('src/App.tsx', 'referrals'));
check('054', 'App.tsx 包含 BNI 路由', fileContains('src/App.tsx', 'bni'));

// ===== 樣式檢查 =====
console.log('\n🎨 樣式檢查\n' + '='.repeat(50));

check('055', 'index.css 存在', fileExists('src/index.css'));
check('056', 'legacy.css 存在', fileExists('src/styles/legacy.css'));
check('057', 'index.css 引入 Tailwind', fileContains('src/index.css', 'tailwindcss'));
check('058', 'legacy.css 存在（選用；主樣式為 Tailwind）', fileExists('src/styles/legacy.css'), 'warning');

// ===== StarryBackground 檢查 =====
console.log('\n⭐ StarryBackground 檢查\n' + '='.repeat(50));

check('059', 'StarryBackground 使用 Canvas', fileContains('src/components/layout/StarryBackground.tsx', 'canvas'));
check('060', 'StarryBackground 有粒子系統', fileContains('src/components/layout/StarryBackground.tsx', 'Particle'));
check('061', 'StarryBackground 有動畫', fileContains('src/components/layout/StarryBackground.tsx', 'animate'));
check('062', 'App 使用 StarryBackground', fileContains('src/App.tsx', 'StarryBackground'));

// ===== Members 功能檢查 =====
console.log('\n👥 Members 功能檢查\n' + '='.repeat(50));

check('063', 'Members 頁面有搜尋功能', fileContains('src/pages/Members.tsx', 'search'));
check('064', 'Members 頁面有分類篩選', fileContains('src/pages/Members.tsx', 'CategoryFilter'));
check('065', 'MemberCard 使用 member.photo', fileContains('src/components/members/MemberCard.tsx', 'member.photo'));
check('066', 'MemberCard 有 fallback 圖片', fileContains('src/components/members/MemberCard.tsx', 'onError'));
check('067', 'MemberCard 有展開功能', fileContains('src/components/members/MemberCard.tsx', 'expanded'));

// ===== 動畫檢查 =====
console.log('\n🎬 動畫檢查\n' + '='.repeat(50));

check('068', 'Home 使用 Framer Motion', fileContains('src/pages/Home.tsx', 'motion'));
check('069', 'Members 使用 Framer Motion', fileContains('src/pages/Members.tsx', 'motion'));
check('070', 'Home 有淡入動畫', fileContains('src/pages/Home.tsx', 'initial'));

// ===== Meta Tags 檢查 =====
console.log('\n🏷️  Meta Tags 檢查\n' + '='.repeat(50));

check('071', 'index.html 有 title', fileContains('index.html', '<title>'));
check('072', 'index.html 有 description', fileContains('index.html', 'description'));
check('073', 'index.html 有 Open Graph tags', fileContains('index.html', 'og:'));
check('074', 'index.html 有 favicon', fileContains('index.html', 'icon'));
check('075', 'index.html 引用正確的 favicon', fileContains('index.html', '白色正方形logo.png'));

// ===== Hooks 檢查 =====
console.log('\n🪝 Hooks 檢查\n' + '='.repeat(50));

check('076', 'hooks 目錄存在', fileExists('src/hooks'));
check('077', 'useMembers hook 存在', fileExists('src/hooks/useMembers.ts') || fileExists('src/hooks/useMembers.tsx'));

// ===== Types 檢查 =====
console.log('\n📐 Types 檢查\n' + '='.repeat(50));

check('078', 'types 目錄存在', fileExists('src/types'));
check('079', 'Member type 定義存在', fileExists('src/types/index.ts') || fileExists('src/types/member.ts'));

// ===== 配置檔案內容檢查 =====
console.log('\n⚙️  配置檔案內容檢查\n' + '='.repeat(50));

check('080', 'package.json 有 dev script', fileContains('package.json', '"dev"'));
check('081', 'package.json 有 build script', fileContains('package.json', '"build"'));
check('082', 'package.json 有 start script', fileContains('package.json', '"start"'));
check('083', 'vite.config.ts 有 React plugin', fileContains('vite.config.ts', 'react'));
check('084', 'Dockerfile 有 Node 20', fileContains('Dockerfile', 'node:20'));

// ===== 額外功能檢查 =====
console.log('\n🔧 額外功能檢查\n' + '='.repeat(50));

check('085', 'App.tsx 有 ScrollToTop', fileContains('src/App.tsx', 'ScrollToTop'));
check('086', 'App 有 Navbar', fileContains('src/App.tsx', 'Navbar'));
check('087', 'App 有 Footer', fileContains('src/App.tsx', 'Footer'));
check('088', 'App 有路由 Routes', fileContains('src/App.tsx', 'Routes'));

// ===== 圖片優化檢查 =====
console.log('\n🖼️  圖片優化檢查\n' + '='.repeat(50));

check('089', 'MemberCard 有 lazy loading', fileContains('src/components/members/MemberCard.tsx', 'loading'), 'warning');
check('090', 'Contact 組件有圖片', fileContains('src/components/home/Contact.tsx', 'img'), 'warning');

// ===== 響應式設計檢查 =====
console.log('\n📱 響應式設計檢查\n' + '='.repeat(50));

check('091', 'Home 有響應式 class', fileContains('src/pages/Home.tsx', 'md:'));
check('092', 'Members 有響應式 class', fileContains('src/pages/Members.tsx', 'md:') || fileContains('src/pages/Members.tsx', 'lg:'));
check('093', 'MemberCard 有響應式 grid', fileContains('src/pages/Members.tsx', 'grid-cols'));

// ===== 可訪問性檢查 =====
console.log('\n♿ 可訪問性檢查\n' + '='.repeat(50));

check('094', 'index.html 有 lang 屬性', fileContains('index.html', 'lang="zh-TW"'));
check('095', 'MemberCard 圖片有 alt', fileContains('src/components/members/MemberCard.tsx', 'alt='));

// ===== 效能優化檢查 =====
console.log('\n⚡ 效能優化檢查\n' + '='.repeat(50));

check('096', 'StarryBackground 有 cleanup', fileContains('src/components/layout/StarryBackground.tsx', 'return () =>'));
check('097', 'Members 使用 useMemo', fileContains('src/pages/Members.tsx', 'useMemo'));
check('098', 'Hero 背景有 willChange（PageHero）', fileContains('src/components/common/PageHero.tsx', 'willChange'));

// ===== 資料載入檢查 =====
console.log('\n📊 資料載入檢查\n' + '='.repeat(50));

check('099', '會員資料由 Supabase 載入（api/members）', fileContains('src/api/members.ts', "from('members')"));
check('100', 'Members 有 loading 狀態', fileContains('src/pages/Members.tsx', 'loading'));

// ===== 總結 =====
console.log('\n' + '='.repeat(50));
console.log('📊 檢查結果總結\n');
console.log(`✅ 通過: ${results.passed.length}/100`);
console.log(`❌ 失敗: ${results.failed.length}/100`);
console.log(`⚠️  警告: ${results.warnings.length}/100`);

const passRate = (results.passed.length / 100 * 100).toFixed(1);
console.log(`\n通過率: ${passRate}%`);

if (results.failed.length > 0) {
    console.log('\n❌ 需要修復的項目:');
    results.failed.forEach((item, index) => {
        console.log(`${index + 1}. [${item.id}] ${item.description}`);
    });
}

if (results.warnings.length > 0) {
    console.log('\n⚠️  警告項目:');
    results.warnings.forEach((item, index) => {
        console.log(`${index + 1}. [${item.id}] ${item.description}`);
    });
}

// 寫入檢查報告
const reportPath = path.join(rootDir, '.agent', 'migration-check-report.json');
fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    summary: {
        total: 100,
        passed: results.passed.length,
        failed: results.failed.length,
        warnings: results.warnings.length,
        passRate: passRate + '%'
    },
    results: {
        passed: results.passed,
        failed: results.failed,
        warnings: results.warnings
    }
}, null, 2));

console.log(`\n📄 詳細報告已儲存至: ${reportPath}`);

// 退出碼
process.exit(results.failed.length > 0 ? 1 : 0);
