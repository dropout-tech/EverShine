/** TanStack Query 鍵集中管理，避免字串散落 */
export const queryKeys = {
    members: {
        all: ['members'] as const,
        list: ['members', 'list'] as const,
    },
    referrals: {
        all: ['referrals'] as const,
        list: ['referrals', 'list'] as const,
    },
    admin: {
        dashboard: ['admin', 'dashboard'] as const,
    },
    committee: {
        bundle: ['committee', 'bundle'] as const,
    },
    homepageStats: {
        all: ['homepage_stats'] as const,
        history: ['homepage_stats', 'history'] as const,
        chart: ['homepage_stats', 'chart'] as const,
    },
} as const;
