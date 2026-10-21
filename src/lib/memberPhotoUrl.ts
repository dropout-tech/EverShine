import { siteConfig } from '../config/site.config';

/** 正規化會員大頭貼 URL；空值時回傳長輝預設 logo */
export function resolveMemberPhotoUrl(photo?: string | null): string {
    if (!photo?.trim()) return siteConfig.defaultPhoto;
    const clean = photo.trim();
    if (clean.startsWith('http://') || clean.startsWith('https://')) return clean;
    return clean.startsWith('/') ? clean : `/${clean}`;
}
