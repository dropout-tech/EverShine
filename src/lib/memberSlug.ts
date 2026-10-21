import type { Member } from '../types';

/**
 * 從會員物件產出 URL slug。
 *
 * 設計原則：
 * 使用穩定 ID 避免同名會員互相覆蓋；舊姓名連結只接受唯一匹配。
 *
 * 解析端 (resolveMemberFromSlug) 同時支援兩種：
 *  - 完全相符的 name
 *  - 純數字 → 視為 id
 */

export function buildMemberSlug(member: Pick<Member, 'id' | 'name'>): string {
    return String(member.id);
}

export function resolveMemberFromSlug<T extends Pick<Member, 'id' | 'name'>>(
    slug: string,
    members: T[]
): T | null {
    if (!slug) return null;
    const decoded = (() => {
        try {
            return decodeURIComponent(slug).trim();
        } catch {
            return slug.trim();
        }
    })();
    if (!decoded) return null;

    // 姓名不是唯一識別碼，不可任意選取同名會員。
    const byName = members
        .filter((m) => (m.name || '').trim() === decoded)
        .sort((a, b) => Number(a.id) - Number(b.id));
    if (byName.length === 1) return byName[0];
    if (byName.length > 1) return null;

    // 純數字 → id 解析
    if (/^\d+$/.test(decoded)) {
        const targetId = Number(decoded);
        const byId = members.find((m) => Number(m.id) === targetId);
        if (byId) return byId;
    }

    return null;
}
