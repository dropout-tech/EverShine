import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { fetchPublicMembers } from '../api/members';
import { queryKeys } from '../api/queryKeys';

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
    gold_medal_count?: number;
    has_gold_medal?: boolean;
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
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: queryKeys.members.list,
        queryFn: fetchPublicMembers,
        staleTime: 60_000,
    });

    useEffect(() => {
        // 每個 hook 實例使用唯一 channel 名稱：多處同時 useMembers() 時，若共用名稱會在 subscribe 後重複 .on() 而拋錯導致白畫面
        const channelName = `members_changes_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
        const subscription = supabase
            .channel(channelName)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'members' }, () => {
                void queryClient.invalidateQueries({ queryKey: queryKeys.members.list });
            })
            .subscribe();

        return () => {
            void supabase.removeChannel(subscription);
        };
    }, [queryClient]);

    return {
        members: query.data ?? [],
        loading: query.isPending,
        error: query.isError ? '無法載入會員資料' : null,
    };
};
