const SITE_URL = 'https://evershine.tw';

/** Social cards (LINE / Facebook / Slack) expect 1.91:1, 1200×630. */
const OG = {
    width: 1200,
    height: 630,
    type: 'image/jpeg',
};

const seoRoutes = {
    '/': {
        title: '每週三線上商會｜BNI 長輝白金',
        description: '一個產業只留一席，全程線上，來賓免費。每週三 6:30 例會，會員互相引薦。創會至 2026 年 1 月，累計 2.6 萬張引薦、成交逾 6.29 億。先來坐一場。',
        keywords: '線上商會, 台灣商會, BNI, BNI長輝, 長輝白金分會, 商務引薦, 來賓免費, 台北商會, 每週三例會, 一產業一席',
        canonical: `${SITE_URL}/`,
        ogImage: `${SITE_URL}/images/og/home.jpg`,
        ogImageAlt: 'BNI 長輝白金分會：來賓免費，每週三早上全程線上，一個產業只留一席',
    },
    '/bni': {
        title: '什麼是 BNI｜76 國的引薦商會',
        description: 'BNI 要會員每週見面、互相引薦，一個產業只留一席。遍及 76 國、34 萬會員，台灣有 245 個分會。長輝每週三全程線上，來賓免費。',
        keywords: '什麼是BNI, BNI商會, 商務引薦, 付出者收穫, Givers Gain, 台灣商會, 線上商會, BNI台灣',
        canonical: `${SITE_URL}/bni`,
        ogImage: `${SITE_URL}/images/og/bni.jpg`,
        ogImageAlt: '什麼是 BNI：會員每週互相引薦，遍及 76 國、34 萬會員',
        breadcrumbs: [
            { name: '首頁', path: '/' },
            { name: '認識 BNI', path: '/bni' },
        ],
    },
    '/members': {
        title: '一產業一席｜長輝企業家名錄',
        description: '工程、行銷、金融、法稅、AI、健康，60 多種產業各只有一位代表。先看長輝白金分會的會員，再來當來賓。',
        keywords: '商會會員, BNI會員, 企業家名錄, 一產業一席, 長輝白金分會, 商務媒合, 台灣企業家',
        canonical: `${SITE_URL}/members`,
        ogImage: `${SITE_URL}/images/og/members.jpg`,
        ogImageAlt: 'BNI 長輝白金分會會員名錄：一個產業只留一席',
        breadcrumbs: [
            { name: '首頁', path: '/' },
            { name: '會員介紹', path: '/members' },
        ],
    },
    '/referrals': {
        title: '2.6 萬張引薦｜長輝成交案例',
        description: '看長輝會員怎麼把引薦做成合作。創會至 2026 年 1 月，累計 26,459 張引薦單、成交新台幣 6.29 億。先看案例，再來當來賓。',
        keywords: '引薦案例, BNI引薦, 商務合作, 長輝白金分會, 引薦成交, 台灣商會',
        canonical: `${SITE_URL}/referrals`,
        ogImage: `${SITE_URL}/images/og/referrals.jpg`,
        ogImageAlt: 'BNI 長輝白金分會引薦案例：至 2026 年 1 月累計 26,459 張引薦、成交 6.29 億',
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
        ogImageAlt: 'BNI 長輝白金分會：來賓免費，每週三早上全程線上，一個產業只留一席',
        breadcrumbs: [
            { name: '首頁', path: '/' },
            { name: '隱私權政策', path: '/privacy' },
        ],
    },
};

export { OG, SITE_URL };
export default seoRoutes;
