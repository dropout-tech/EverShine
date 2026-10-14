import { useState, useEffect } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

export interface Member {
    id: number;
    name: string;
    industry: string;
    photo: string;
    photoPosition?: string;
    category: string;
    title: string;
    company: string;
    shortIntro: string;
    fullIntro: string;
    services: string[];
    hashtags: string[];
    links: { [key: string]: string } | { type: string; url: string; icon?: string }[];

    editCount?: number;
    updatedAt?: string;
    phone?: string;
    email?: string;
}

function normalizePhoto(photo: string) {
    if (!photo) return '';
    const clean = photo.trim();
    if (clean.startsWith('http') || clean.startsWith('/')) return clean;
    return `/${clean}`;
}

async function loadStaticMembers(): Promise<Member[]> {
    const response = await fetch('/data/members.json');
    if (!response.ok) throw new Error('static members missing');
    const payload = await response.json();
    const rows = Array.isArray(payload.members) ? payload.members : [];
    return rows
        .filter((row: { name?: string }) => row.name && row.name !== '人名')
        .map((row: Record<string, unknown>, index: number) => ({
            id: index + 1,
            name: String(row.name || ''),
            industry: String(row.industry || ''),
            photo: normalizePhoto(String(row.photo || '')),
            category: String(row.category || ''),
            title: String(row.title || row.position || ''),
            company: String(row.company || ''),
            shortIntro: String(row.shortIntro || ''),
            fullIntro: String(row.fullIntro || ''),
            services: Array.isArray(row.services) ? row.services as string[] : [],
            hashtags: Array.isArray(row.hashtags) ? row.hashtags as string[] : [],
            links: (row.links || []) as Member['links'],
        }));
}

export const useMembers = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let unsubscribe = () => {};

        const fetchMembers = async () => {
            try {
                setLoading(true);
                if (!isSupabaseConfigured || !supabase) {
                    setMembers(await loadStaticMembers());
                    setError(null);
                    return;
                }

                const { data, error } = await supabase
                    .from('members')
                    .select('*')
                    .order('id', { ascending: true });

                if (error) throw error;
                setMembers(data || []);
                setError(null);
            } catch (err) {
                console.error('Error fetching members:', err);
                try {
                    setMembers(await loadStaticMembers());
                    setError(null);
                } catch {
                    setError('無法載入會員資料');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();

        if (isSupabaseConfigured && supabase) {
            const subscription = supabase
                .channel('members_changes')
                .on('postgres_changes', { event: '*', schema: 'public', table: 'members' }, fetchMembers)
                .subscribe();
            unsubscribe = () => subscription.unsubscribe();
        }

        return () => unsubscribe();
    }, []);

    return { members, loading, error };
};
