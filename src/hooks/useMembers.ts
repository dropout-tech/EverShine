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

const PUBLIC_MEMBER_COLUMNS = [
    'id', 'name', 'industry', 'photo', 'photoPosition', 'category', 'position',
    'company', 'shortIntro', 'fullIntro', 'services', 'hashtags', 'links',
    'editCount', 'updatedAt', 'phone', 'email', 'status',
].join(',');

function normalizePhoto(photo: string) {
    if (!photo) return '';
    const clean = photo.trim();
    if (clean.startsWith('http') || clean.startsWith('/')) return clean;
    return `/${clean}`;
}

function toMember(row: Record<string, unknown>, index: number): Member {
    return {
        id: Number(row.id ?? index + 1),
        name: String(row.name || ''),
        industry: String(row.industry || ''),
        photo: normalizePhoto(String(row.photo || '')),
        photoPosition: row.photoPosition ? String(row.photoPosition) : undefined,
        category: String(row.category || ''),
        title: String(row.title || row.position || ''),
        company: String(row.company || ''),
        shortIntro: String(row.shortIntro || ''),
        fullIntro: String(row.fullIntro || ''),
        services: Array.isArray(row.services) ? row.services as string[] : [],
        hashtags: Array.isArray(row.hashtags) ? row.hashtags as string[] : [],
        links: (row.links || []) as Member['links'],
        editCount: typeof row.editCount === 'number' ? row.editCount : undefined,
        updatedAt: row.updatedAt ? String(row.updatedAt) : undefined,
        phone: row.phone ? String(row.phone) : undefined,
        email: row.email ? String(row.email) : undefined,
    };
}

function isListedMember(row: { name?: string; status?: string }) {
    if (!row.name || row.name === '人名' || row.name === '系統管理員') return false;
    if (row.status && row.status !== 'active') return false;
    return true;
}

async function loadStaticMembers(): Promise<Member[]> {
    const response = await fetch('/data/members.json');
    if (!response.ok) throw new Error('static members missing');
    const payload = await response.json();
    const rows = Array.isArray(payload.members) ? payload.members : [];
    return rows
        .filter((row: { name?: string; status?: string }) => isListedMember(row))
        .map((row: Record<string, unknown>, index: number) => toMember(row, index));
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
                    .select(PUBLIC_MEMBER_COLUMNS)
                    .order('id', { ascending: true });

                if (error) throw error;
                const rows = (data || []) as unknown as Record<string, unknown>[];
                setMembers(rows.filter((row) => isListedMember(row as { name?: string; status?: string })).map(toMember));
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
