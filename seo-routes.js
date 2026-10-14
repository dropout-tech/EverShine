const SITE_URL = 'https://evershine.tw';

/** Social cards (LINE / Facebook / Slack) expect 1.91:1, 1200×630. */
const OG = {
    width: 1200,
    height: 630,
    type: 'image/jpeg',
};

const seoRoutes = {
    '/': {
        title: 'BNI 長輝白金分會｜台灣線上商會・商務引薦',
        description: 'BNI 長輝白金分會是全台少數 100% 線上與會的商會。每週三清晨例會，用結構化商務引薦，協助台灣企業主精準對接人脈與資源。歡迎來賓免費參加。',
        keywords: '台灣商會, 線上商會, 台北商會, BNI, BNI台灣, 長輝白金分會, 商務引薦, 企業家商會, 線上例會, 線上人脈, Givers Gain, 付出者收穫',
        canonical: `${SITE_URL}/`,
        ogImage: `${SITE_URL}/images/og/home.jpg`,
        ogImageAlt: 'BNI 長輝白金分會：台灣線上商會，100% 線上與會的商務引薦平台',
    },
    '/bni': {
        title: '認識 BNI｜全球最大商務引薦組織',
        description: 'BNI 是全球最大商務引薦組織，遍及 76 國、34 萬會員；台灣有 245 個分會。長輝白金分會每週三線上例會，實踐付出者收穫。歡迎先來當來賓。',
        keywords: '什麼是BNI, BNI商會, 台灣商會, 全球商會, 商務引薦, 付出者收穫, Givers Gain, BNI台灣, 線上商會, 企業家商會',
        canonical: `${SITE_URL}/bni`,
        ogImage: `${SITE_URL}/images/og/bni.jpg`,
        ogImageAlt: '認識 BNI：全球最大商務引薦組織，遍及 76 國、34 萬會員',
        breadcrumbs: [
            { name: '首頁', path: '/' },
            { name: '認識 BNI', path: '/bni' },
        ],
    },
    '/members': {
        title: '商會會員名錄｜BNI 長輝白金分會',
        description: '瀏覽 BNI 長輝白金分會會員名錄。60 多種產業各僅一席，涵蓋工程、行銷、金融、AI 與健康，幫你找到可長期合作的企業家。歡迎先認識夥伴。',
        keywords: '台灣商會會員, BNI會員, 長輝會員, 企業家名錄, 台北商會, 商務媒合, 行業專家, 台灣企業家',
        canonical: `${SITE_URL}/members`,
        ogImage: `${SITE_URL}/images/og/members.jpg`,
        ogImageAlt: 'BNI 長輝白金分會企業家會員名錄，60+ 產業各一席',
        breadcrumbs: [
            { name: '首頁', path: '/' },
            { name: '會員介紹', path: '/members' },
        ],
    },
    '/referrals': {
        title: '引薦成功案例｜BNI 長輝白金分會',
        description: '看 BNI 長輝白金分會的真實引薦案例。會員互相引薦並成交，把信任轉成合作。歡迎來賓從案例了解這間台灣線上商會如何創造商務實績。',
        keywords: '商會引薦案例, BNI成功案例, 台灣商務合作, 引薦成功故事, 商務媒合, 台灣商會, BNI台灣',
        canonical: `${SITE_URL}/referrals`,
        ogImage: `${SITE_URL}/images/og/referrals.jpg`,
        ogImageAlt: 'BNI 長輝白金分會引薦成功案例，真實商務合作實績',
        breadcrumbs: [
            { name: '首頁', path: '/' },
            { name: '引薦案例', path: '/referrals' },
        ],
    },
    '/privacy': {
        title: '隱私權政策｜BNI 長輝白金分會',
        description: 'BNI 長輝白金分會隱私權政策與服務條款，說明本網站如何蒐集、使用與保護您的個人資料，以及使用本站服務時應遵守的約定。',
        keywords: '隱私權政策, 服務條款, BNI長輝, 個資保護',
        canonical: `${SITE_URL}/privacy`,
        ogImage: `${SITE_URL}/images/og/home.jpg`,
        ogImageAlt: 'BNI 長輝白金分會：台灣線上商會，100% 線上與會的商務引薦平台',
        breadcrumbs: [
            { name: '首頁', path: '/' },
            { name: '隱私權政策', path: '/privacy' },
        ],
    },
};

export { OG, SITE_URL };
export default seoRoutes;
