/**
 * Site Configuration
 *
 * Clone 新分會時，只需修改此檔案即可完成品牌切換。
 * 所有品牌相關的硬編碼值都應從此處引用。
 */

import { publicEnv } from '../lib/supabase';

export const siteConfig = {
    branchName: '長輝白金分會',
    branchNameEn: 'EverShine',
    branchFullName: 'BNI 長輝白金分會',
    branchFullNameEn: 'BNI EverShine Chapter',
    organization: 'BNI',

    siteUrl: 'https://evershine.tw',
    siteDomain: 'evershine.tw',

    meeting: {
        day: 'Wednesday',
        dayZh: '週三',
        startTime: '06:30',
        endTime: '08:30',
        timezone: 'Asia/Taipei',
        format: 'online' as const,
        formatDescription: '100% 支援線上與會',
    },

    location: {
        city: '台北市',
        region: '台北',
        country: 'TW',
        countryName: '台灣',
        latitude: 25.0330,
        longitude: 121.5654,
        geoRegion: 'TW-TPE',
    },

    social: {
        facebook: 'https://www.facebook.com/BNIEverShine',
        instagram: 'https://www.instagram.com/bnievershine',
        threads: 'https://www.threads.net/@chhubni',
    },

    logos: {
        square: '/images/assets/logo/白色正方形logo.png',
        horizontal: '/images/assets/logo/透明底白字長條logo.png',
        bni: '/images/assets/logo/bni-logo-new.png',
    },

    /** 1200×630 social share card. Do not use the square logo as og:image. */
    ogImage: '/images/og/home.jpg',

    defaultPhoto: '/images/assets/logo/白色正方形logo.png',

    /** Claim 密碼應從環境變數讀取，fallback 僅供開發環境 */
    claimPassword: publicEnv('VITE_CLAIM_PASSWORD') || 'evershine2026',

    industries: [
        '居住空間與工程',
        '品牌整合與行銷',
        '健康照護與身心',
        '金融財富與資產',
        '數位科技與應用',
        '學習成長與探索',
        '生活服務與消費',
        '企業經營與法稅',
    ],
} as const;

export type SiteConfig = typeof siteConfig;
