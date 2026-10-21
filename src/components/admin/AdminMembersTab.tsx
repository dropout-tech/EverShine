import React, { useMemo, useState } from 'react';
import { Plus, Search, Users, Snowflake } from 'lucide-react';
import MemberList from './MemberList';

export interface AdminMembersTabProps {
    memberSearch: string;
    onMemberSearch: (v: string) => void;
    onAddMember: () => void;
    /** 全部會員（含冷凍）— 由父層傳入已過濾 search 前的完整清單 */
    allMembers: Record<string, unknown>[];
    /** 經 search 過濾後的會員（含冷凍與在籍） */
    filteredMembers: Record<string, unknown>[];
    loading: boolean;
    onRefresh: () => void;
}

type SubTab = 'active' | 'frozen';

const AdminMembersTab: React.FC<AdminMembersTabProps> = ({
    memberSearch,
    onMemberSearch,
    onAddMember,
    allMembers,
    filteredMembers,
    loading,
    onRefresh,
}) => {
    const [subTab, setSubTab] = useState<SubTab>('active');

    const isActive = (m: Record<string, unknown>) =>
        ((m.status as string | undefined) || 'active') === 'active';

    const counts = useMemo(
        () => ({
            active: allMembers.filter(isActive).length,
            frozen: allMembers.filter((m) => !isActive(m)).length,
        }),
        [allMembers]
    );

    const listMembers = useMemo(() => {
        return filteredMembers.filter((m) => (subTab === 'active' ? isActive(m) : !isActive(m)));
    }, [filteredMembers, subTab]);

    return (
        <div className="bg-bg-dark/50 border border-white/10 rounded-2xl p-4 md:p-6 overflow-hidden">
            {/* Sub-tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
                <button
                    type="button"
                    onClick={() => setSubTab('active')}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                        subTab === 'active'
                            ? 'bg-primary text-bg-dark'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                >
                    <Users size={15} /> 在籍會員
                    <span className="rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-mono">{counts.active}</span>
                </button>
                <button
                    type="button"
                    onClick={() => setSubTab('frozen')}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                        subTab === 'frozen'
                            ? 'bg-sky-500 text-white'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                >
                    <Snowflake size={15} /> 冷凍會員
                    <span className="rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-mono">{counts.frozen}</span>
                </button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-6">
                <div className="relative flex-1 sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder={subTab === 'frozen' ? '搜尋冷凍會員...' : '搜尋會員...'}
                        value={memberSearch}
                        onChange={(e) => onMemberSearch(e.target.value)}
                        className="w-full bg-black/20 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-primary"
                    />
                </div>
                {subTab === 'active' && (
                    <button
                        type="button"
                        onClick={onAddMember}
                        className="flex items-center justify-center gap-2 bg-primary text-bg-dark px-4 py-2.5 rounded-lg font-bold hover:bg-primary/90 transition-colors shrink-0"
                    >
                        <Plus size={18} /> 新增會員
                    </button>
                )}
            </div>

            {subTab === 'frozen' && (
                <div className="mb-4 rounded-lg border border-sky-400/20 bg-sky-500/5 p-3 text-xs leading-relaxed text-sky-100/80">
                    冷凍會員不會顯示於前台、不能被登入或認領，資料永久保留於資料庫。點選「還原」可恢復為在籍會員。
                </div>
            )}

            <MemberList
                members={listMembers as never}
                loading={loading}
                onRefresh={onRefresh}
                mode={subTab}
            />
        </div>
    );
};

export default AdminMembersTab;
