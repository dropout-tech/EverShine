import { useQuery } from '@tanstack/react-query';
import { fetchReferralsForDisplay } from '../api/referrals';
import { queryKeys } from '../api/queryKeys';

function withPhoto(person: MemberInfo): MemberInfo {
    const photo = person.photo || '';
    const normalized = !photo || photo.startsWith('http') || photo.startsWith('/') ? photo : `/${photo}`;
    return { ...person, photo: normalized };
}

async function loadStaticReferrals(): Promise<Referral[]> {
    const response = await fetch('/data/referrals.json');
    if (!response.ok) throw new Error('static referrals missing');
    const payload = await response.json();
    const rows = Array.isArray(payload.referrals) ? payload.referrals : [];
    return rows.map((row: Referral) => ({
        ...row,
        referrer: withPhoto(row.referrer),
        referee: withPhoto(row.referee),
    }));
}

export const useReferrals = () => {
    const query = useQuery({
        queryKey: queryKeys.referrals.list,
        queryFn: fetchReferralsForDisplay,
        staleTime: 60_000,
    });

    return {
        referrals: query.data ?? [],
        loading: query.isPending,
        error: query.isError ? '無法載入引薦資料' : null,
    };
};
