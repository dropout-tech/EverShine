const FALLBACK_PHOTO = '/images/assets/logo/白色正方形logo.png';

function normalizePhotoPath(photo: string | undefined): string {
    if (!photo) return '';
    const clean = photo.trim();
    if (!clean) return '';
    if (clean.startsWith('http://') || clean.startsWith('https://')) return clean;
    return clean.startsWith('/') ? clean : `/${clean}`;
}

/** 列表與跑馬燈用 256px WebP；原圖留給需要大圖的地方。遠端網址沒有縮圖，原樣使用。 */
export function memberPhotoSrc(photo: string | undefined, variant: 'thumb' | 'full' = 'full'): string {
    const path = normalizePhotoPath(photo);
    if (!path) return FALLBACK_PHOTO;
    if (variant === 'full' || path.startsWith('http')) return path;

    const match = path.match(/^\/images\/members\/([^/]+)\.(jpe?g|png|webp)$/i);
    if (!match) return path;
    return `/images/members/thumbs/${match[1]}.webp`;
}

function pathOf(value: string): string {
    if (value.startsWith('http://') || value.startsWith('https://')) {
        try {
            return new URL(value).pathname;
        } catch {
            return value;
        }
    }
    return value;
}

export function memberPhotoFallback(current: string, photo: string | undefined): string {
    const full = memberPhotoSrc(photo, 'full');
    if (pathOf(current) !== full) return full;
    return FALLBACK_PHOTO;
}
