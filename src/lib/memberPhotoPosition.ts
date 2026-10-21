/**
 * 會員大頭貼在 object-fit: cover 時的 object-position。
 * - 預設對齊「臉部在上半」避免圓形裁切切頭。
 * - 與 MemberEdit 儲存的值同步：`top` / `center` / `bottom` 或完整 CSS（如 `center 25%`）。
 */
export function resolveMemberPhotoObjectPosition(raw?: string | null): string {
    const v = (raw ?? '').trim();
    if (!v) return 'center top';
    if (v.includes(' ') || v.includes('%') || v.includes('px') || v.includes('(')) return v;
    if (v === 'top') return 'center top';
    if (v === 'bottom') return 'center bottom';
    if (v === 'center') return 'center';
    return v;
}
