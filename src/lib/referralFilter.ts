import { siteConfig } from '../config/site.config';
import type { Referral } from '../types';

export const REFERRAL_ALL_CATEGORY = '全部';

/** 與會員名錄一致的八大產業，供引薦案例篩選 */
export const REFERRAL_CATEGORIES = [REFERRAL_ALL_CATEGORY, ...siteConfig.industries] as const;

export type ReferralCategory = (typeof REFERRAL_CATEGORIES)[number];

const ECOSYSTEM_KEYWORDS: Record<string, string[]> = {
    居住空間與工程: ['裝修', '空調', '燈具', '除濕', '工程', '水電', '地板', '機電', '消防', '櫥櫃', '木作', '住宅', '商空'],
    企業經營與法稅: ['律師', '會計', '專利', '商標', '企業顧問', '共享空間', '法稅'],
    金融財富與資產: [
        '銀行', '融資', '保險', '產物', '黃金', '理財', '信託', '程式交易', '投資', '房貸', '卡債', 'VIP', '包租', '代管', '家族辦公室',
    ],
    品牌整合與行銷: ['品牌', '包裝', '自媒體', '行銷', 'SEO', '插畫', '文創', '團體服', '禮贈品', '策展', '創意策劃', '影像', '動畫', '配音'],
    數位科技與應用: ['網站', 'AI', '程式', '數位', '資訊', 'APP', '雲端', '弱電', '電子商品', '區塊鏈', '人才媒合'],
    健康照護與身心: [
        '營養', '物理治療', '指甲', '鞋墊', '中醫', '心靈', '芳療', '健康', '健甲', '路跑', '凍甲', '足部', '健身', '醫療',
    ],
    生活服務與消費: ['餐飲', '寵物', '寵物營養', '食物', '雞蛋糕', '澎湖', '居家鍍膜', '中古車', '汽車', '租賃', '茶葉', '外燴'],
    學習成長與探索: [
        '魔術方塊', '教育', '教學', '私立小學', '桌遊', '家教', '課程', '天賦', '命理', '風水', 'AI學習',
    ],
};

function referralSearchText(referral: Referral): string {
    return [
        referral.title,
        referral.description,
        referral.metrics.amount,
        referral.metrics.type,
        referral.referrer.name,
        referral.referrer.industry,
        referral.referrer.story,
        referral.referee.name,
        referral.referee.industry,
        referral.referee.story,
    ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
}

/** 依標題、產業與內容推斷主要生態圈（供分類 pill 與統計） */
export function getReferralEcosystem(referral: Referral): string {
    const text = [
        referral.title,
        referral.description,
        referral.metrics.type,
        referral.referrer.industry,
        referral.referee.industry,
    ].join(' ');

    let best = siteConfig.industries[siteConfig.industries.length - 1];
    let bestScore = 0;

    for (const eco of siteConfig.industries) {
        const keywords = ECOSYSTEM_KEYWORDS[eco] ?? [];
        let score = 0;
        for (const kw of keywords) {
            if (text.includes(kw)) score += kw.length;
        }
        if (score > bestScore) {
            bestScore = score;
            best = eco;
        }
    }

    return best;
}

export function countReferralsByCategory(referrals: Referral[]): Map<string, number> {
    const counts = new Map<string, number>();
    counts.set(REFERRAL_ALL_CATEGORY, referrals.length);
    for (const eco of siteConfig.industries) counts.set(eco, 0);
    for (const ref of referrals) {
        const eco = getReferralEcosystem(ref);
        counts.set(eco, (counts.get(eco) ?? 0) + 1);
    }
    return counts;
}

export function filterReferrals(
    referrals: Referral[],
    options: { query: string; category: string }
): Referral[] {
    const q = options.query.trim().toLowerCase();

    return referrals.filter((referral) => {
        const matchesCategory =
            options.category === REFERRAL_ALL_CATEGORY ||
            getReferralEcosystem(referral) === options.category;

        if (!matchesCategory) return false;
        if (!q) return true;

        return referralSearchText(referral).includes(q);
    });
}
