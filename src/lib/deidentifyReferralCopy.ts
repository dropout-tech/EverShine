import replacements from '../data/referral-brand-replacements.json' with { type: 'json' };

type ReplacementPair = [string, string];

const PAIRS = replacements as ReplacementPair[];

/** 剩餘短稱：須在長詞先替換後才執行，避免誤傷 */
const TRAILING_PAIRS: ReplacementPair[] = [
    ['聯華', '該食品大廠'],
    ['再興', '該校'],
    ['弘第', '該家具品牌'],
    ['北醫', '北部醫學院校'],
];

function applyPairs(input: string, pairs: ReplacementPair[]): string {
    let output = input;
    for (const [from, to] of pairs) {
        if (!from) continue;
        output = output.split(from).join(to);
    }
    return output;
}

/** 客戶／機構品牌去識別化；不改會員公司名（安麗、沐霓青等） */
export function deidentifyReferralCopy(text: string | null | undefined): string {
    if (!text) return '';
    return applyPairs(applyPairs(text, PAIRS), TRAILING_PAIRS);
}

const TEXT_KEYS = ['title', 'description', 'referrer_story', 'referee_story', 'referrer_testimonial', 'referee_value'] as const;

export function deidentifyReferralRow(row: Record<string, unknown>): Record<string, unknown> {
    const next: Record<string, unknown> = { ...row };
    for (const key of TEXT_KEYS) {
        const value = next[key];
        if (typeof value === 'string') next[key] = deidentifyReferralCopy(value);
    }
    const metrics = next.metrics;
    if (metrics && typeof metrics === 'object' && !Array.isArray(metrics)) {
        const m = { ...(metrics as Record<string, unknown>) };
        if (typeof m.amount === 'string') m.amount = deidentifyReferralCopy(m.amount);
        if (typeof m.type === 'string') m.type = deidentifyReferralCopy(m.type);
        next.metrics = m;
    }
    return next;
}
