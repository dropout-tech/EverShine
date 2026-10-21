export type ExtraReferralCase = {
    num: number;
    date: string;
    title: string;
    highlight: string;
    referrer_name: string;
    referee_name: string;
    referrer_story: string;
    referee_story: string;
    metrics_amount: string;
    metrics_type: string;
};

/** 將靜態補齊案例轉成與 Supabase referrals 列相同的形狀 */
export function extraCasesToRows(cases: ExtraReferralCase[]): Record<string, unknown>[] {
    return cases.map((item) => ({
        id: `es-case-${String(item.num).padStart(3, '0')}`,
        title: item.title,
        description: item.highlight,
        referrer_name: item.referrer_name,
        referee_name: item.referee_name,
        referrer_story: item.referrer_story,
        referee_story: item.referee_story,
        metrics: {
            amount: item.metrics_amount || '成功引薦',
            type: item.metrics_type || item.title,
        },
        created_at: item.date,
    }));
}

function createdAtMs(row: Record<string, unknown>): number {
    const raw = row.created_at ?? row.createdAt;
    if (!raw) return 0;
    const parsed = Date.parse(String(raw));
    return Number.isNaN(parsed) ? 0 : parsed;
}

/**
 * 合併資料庫列與靜態補齊列。同一 id 以資料庫為準，
 * 讓 SQL 寫入後不必再改前端，部署當下也能先顯示新案。
 */
export function mergeReferralRows(
    dbRows: Record<string, unknown>[],
    extraRows: Record<string, unknown>[]
): Record<string, unknown>[] {
    const byId = new Map<string, Record<string, unknown>>();
    for (const row of extraRows) {
        byId.set(String(row.id), row);
    }
    for (const row of dbRows) {
        byId.set(String(row.id), row);
    }

    return [...byId.values()].sort((a, b) => {
        const timeDiff = createdAtMs(b) - createdAtMs(a);
        if (timeDiff !== 0) return timeDiff;
        return String(b.id).localeCompare(String(a.id), 'en');
    });
}
