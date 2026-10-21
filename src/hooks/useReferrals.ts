import { useState, useEffect } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

// Simplified type for what we need in UI
export interface MemberInfo {
    name: string;
    industry: string;
    photo: string;
    story?: string;
    testimonial?: string;
    value?: string;
}

export interface Referral {
    id: string;
    title: string;
    description: string;
    metrics: { amount: string; type: string };
    referrer: MemberInfo;
    referee: MemberInfo;
}

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
    const [referrals, setReferrals] = useState<Referral[]>([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (!isSupabaseConfigured || !supabase) {
                    setReferrals(await loadStaticReferrals());
                    return;
                }
                // 1. Get raw referrals data with resilient ordering
                let { data: refsData, error: refsError } = await supabase
                    .from('referrals')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (refsError) {
                    // Try alternative column name
                    const altRes = await supabase
                        .from('referrals')
                        .select('*')
                        .order('createdAt', { ascending: false });

                    if (!altRes.error) {
                        refsData = altRes.data;
                        refsError = null;
                    }
                }

                if (refsError) {
                    // Try without ordering if both fail
                    const fallbackRes = await supabase.from('referrals').select('*');
                    if (!fallbackRes.error) {
                        refsData = fallbackRes.data;
                        refsError = null;
                    }
                }

                if (refsError) throw refsError;

                if (!refsData || refsData.length === 0) {
                    setReferrals([]);
                    return;
                }

                // 2. Get basic member info for mapping (Photo, Industry)
                const { data: membersData } = await supabase
                    .from('members')
                    .select('name, industry, photo');

                // Map by Name for quick lookup
                const membersMap = new Map(membersData?.map(m => [m.name, m]));

                // 3. Format data structure
                const formattedReferrals: Referral[] = refsData.map((ref: any) => {
                    const referrerDetails = membersMap.get(ref.referrer_name);
                    const refereeDetails = membersMap.get(ref.referee_name);

                    return {
                        id: ref.id,
                        title: ref.title,
                        description: ref.description,
                        metrics: ref.metrics || { amount: '0', type: 'TWD' },
                        referrer: withPhoto({
                            name: ref.referrer_name,
                            industry: referrerDetails?.industry || 'Unknown',
                            photo: referrerDetails?.photo || '',
                            story: ref.referrer_story,
                            testimonial: ref.referrer_testimonial
                        }),
                        referee: withPhoto({
                            name: ref.referee_name,
                            industry: refereeDetails?.industry || 'Unknown',
                            photo: refereeDetails?.photo || '',
                            story: ref.referee_story,
                            value: ref.referee_value || ''
                        })
                    };
                });

                setReferrals(formattedReferrals);
            } catch (err: any) {
                console.error("Error loading referrals:", err);
                try {
                    setReferrals(await loadStaticReferrals());
                } catch {
                    setReferrals([]);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { referrals, loading };
};
