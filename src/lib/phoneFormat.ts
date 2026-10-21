/**
 * 台灣電話顯示格式：手機 09xx-xxx-xxx；市話 02-xxxx-xxxx 或 0xx-xxx-xxxx。
 * `tel:` 連結僅用數字，以利撥號。
 */

function onlyDigits(s: string): string {
    return s.replace(/\D/g, '');
}

/** 正規化為國內 0 開頭數字（處理 +886 / 886） */
export function normalizePhoneDigits(raw: string | null | undefined): string {
    if (!raw || typeof raw !== 'string') return '';
    let d = onlyDigits(raw.trim());
    if (!d) return '';
    if (d.startsWith('886') && d.length >= 11) {
        d = '0' + d.slice(3);
    }
    if (d.startsWith('86') && d.length >= 12 && !d.startsWith('886')) {
        // 少見：略過
    }
    return d;
}

/**
 * 顯示用：含連字號。無法辨識時回傳去除非法字元後的原字串（若全為數字則盡量分段）。
 */
export function formatTaiwanPhoneDisplay(raw: string | null | undefined): string {
    const trimmed = (raw ?? '').trim();
    if (!trimmed) return '';

    const d = normalizePhoneDigits(trimmed);
    if (!d) return trimmed;

    // 手機 10 碼 09xxxxxxxx
    if (d.length === 10 && /^09\d{8}$/.test(d)) {
        return `${d.slice(0, 4)}-${d.slice(4, 7)}-${d.slice(7, 10)}`;
    }
    // 9 碼且為 9 開頭（缺 0）
    if (d.length === 9 && /^9\d{8}$/.test(d)) {
        const full = `0${d}`;
        return `${full.slice(0, 4)}-${full.slice(4, 7)}-${full.slice(7, 10)}`;
    }
    // 市話 02 + 8 碼
    if (d.length === 10 && /^02\d{8}$/.test(d)) {
        return `${d.slice(0, 2)}-${d.slice(2, 6)}-${d.slice(6, 10)}`;
    }
    // 其他 10 碼市話 0xx-xxx-xxxx
    if (d.length === 10 && /^0\d{9}$/.test(d) && !d.startsWith('09')) {
        return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6, 10)}`;
    }
    // 已含正確分段且可再正規化
    if (/^\d{2,4}-\d{3,4}-\d{3,4}$/.test(trimmed) && normalizePhoneDigits(trimmed) === d) {
        return trimmed;
    }

    return trimmed;
}

/** `tel:` 用：僅數字 */
export function formatTaiwanPhoneTelHref(raw: string | null | undefined): string {
    if (raw?.trim().startsWith('+') && !raw.trim().startsWith('+886')) {
        return '+' + onlyDigits(raw);
    }
    return normalizePhoneDigits(raw);
}
