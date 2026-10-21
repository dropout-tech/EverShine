import type { Member } from '../types';

/** 金質獎章：1 = 單金質，2 = 雙金質（引薦 12 人加入） */
export type GoldMedalCount = 0 | 1 | 2;

const DOUBLE_GOLD_REFERRAL_COUNT = 12;

/** 從 DB 欄位解析金質獎章數（相容舊版 has_gold_medal boolean；雙金質可依 name 辨識） */
export function resolveGoldMedalCount(
    member: Pick<Member, 'gold_medal_count' | 'has_gold_medal' | 'name'>,
): GoldMedalCount {
    const raw = member.gold_medal_count;
    if (typeof raw === 'number' && raw >= 2) return 2;
    if (typeof raw === 'number' && raw === 1) return 1;
    if (!member.has_gold_medal) return 0;
    if (member.name === GOLD_MEDAL_DOUBLE_MEMBER) return 2;
    return 1;
}

export function getGoldMedalLabel(count: GoldMedalCount): string {
    if (count >= 2) return `雙金質獎章｜成功引薦 ${DOUBLE_GOLD_REFERRAL_COUNT} 位會員加入分會`;
    if (count === 1) return '金質獎章｜分會年度卓越貢獻表揚';
    return '';
}

export const GOLD_MEDAL_SINGLE_MEMBERS = [
    '吳介輝',
    '楊承樺',
    '杜宗樺',
    '江學洋',
    '何昇軒',
    '王執定',
    '郭家宏',
    '李彥慶',
] as const;

export const GOLD_MEDAL_DOUBLE_MEMBER = '孫成育';
