export interface MemberOption {
    id: number;
    name: string;
    active: boolean;
}

export type SaveState = 'idle' | 'saving' | 'saved' | 'failed';

export type RunCommittee = (fn: () => Promise<unknown>) => Promise<boolean>;

export const toMemberOptions = (members: Record<string, unknown>[]): MemberOption[] =>
    members
        .filter((m) => m.id != null && m.name)
        .map((m) => ({
            id: Number(m.id),
            name: String(m.name),
            active: ((m.status as string | undefined) || 'active') === 'active',
        }))
        .sort((a, b) => a.name.localeCompare(b.name, 'zh-Hant'));

export const inputClass =
    'w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:border-primary focus:outline-none disabled:opacity-60';
