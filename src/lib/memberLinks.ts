import type { Member, MemberLink } from '../types';

export type NormalizedMemberLink = { type: string; url: string; icon: string };

/** 將 members.links（物件或陣列）正規化為可迭代的連結列表 */
export function normalizeMemberLinks(links: Member['links']): NormalizedMemberLink[] {
    if (!links) return [];
    if (Array.isArray(links)) {
        return (links as MemberLink[]).filter((link) => link.url && link.url.trim() !== '' && link.url !== '#');
    }
    const out: NormalizedMemberLink[] = [];
    Object.entries(links as Record<string, string>).forEach(([key, url]) => {
        if (url && typeof url === 'string' && url.trim() !== '' && url !== '#') {
            out.push({ type: key, url: url.trim(), icon: key });
        }
    });
    return out;
}
