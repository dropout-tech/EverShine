import { siteConfig } from '../config/site.config';
import type { Referral } from '../types';
import { resolveMemberPhotoUrl } from './memberPhotoUrl';

/** 已被 es-case-* 完整版取代的舊 ID（Supabase 可一併刪除） */
export const LEGACY_SUPERSEDED_REFERRAL_IDS = new Set([
    'ref-001',
    'ref-002',
    'ref-003',
    'ref-004',
    'ref-005',
    'ref-006',
    'ref-007',
    'ref-008',
    'ref-009',
    'ref-010',
    'ref-011',
    'ref-012',
    'ref-013',
    'new-case-1',
    'new-case-2',
    'new-case-3',
    'new-case-4',
    'new-case-5',
    'new-case-6',
]);

function pairKey(referral: Referral): string {
    return `${referral.referrer.memberId ?? referral.referrer.name}\0${referral.referee.memberId ?? referral.referee.name}`;
}

/**
 * 內容去重：若同一引薦人＋被引薦人已有 es-case-* 完整案例，
 * 隱藏所有舊版 ref-* / new-case-*（以及任何非 es-case 的舊 ID），避免與 es-case 完整案例重疊。
 * 同一組合的多筆不同 es-case 案例（不同故事）仍會全部保留。
 */
export function dedupeReferralsForDisplay(referrals: Referral[]): Referral[] {
    const esCasePairs = new Set(
        referrals.filter((r) => r.id.startsWith('es-case-')).map(pairKey)
    );

    return referrals.filter((referral) => {
        if (referral.id.startsWith('es-case-')) return true;
        if (!esCasePairs.has(pairKey(referral))) return true;
        // 已有新版 es-case，略過舊批次（ref-*、new-case-* 等）
        return false;
    });
}

/** 會員名錄尚未建檔時，嘗試使用既有靜態頭像路徑 */
const LEGACY_MEMBER_PHOTO_PATHS: Record<string, string> = {
    劉祐沁: 'images/members/劉祐沁.jpg',
    李逸強: 'images/members/李逸強.jpg',
    徐幼璇: 'images/members/徐幼璇.jpg',
    陸韻如: 'images/members/陸韻如.jpg',
    廖乙宸: 'images/members/廖乙宸.jpg',
    周律廷: 'images/members/周律廷.jpg',
};

export function resolveReferralMemberPhoto(name: string, memberPhoto?: string | null): string {
    const trimmed = memberPhoto?.trim();
    if (trimmed) return resolveMemberPhotoUrl(trimmed);
    const legacy = LEGACY_MEMBER_PHOTO_PATHS[name.trim()];
    if (legacy) return resolveMemberPhotoUrl(legacy);
    return siteConfig.defaultPhoto;
}
