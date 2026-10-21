import React, { useState } from 'react';
import { Edit, ChevronLeft, ChevronRight, Snowflake, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { TableSkeleton, EmptyState, SmartImage } from '../loading';
import { resolveMemberPhotoObjectPosition } from '../../lib/memberPhotoPosition';
import FreezeMemberModal from './FreezeMemberModal';
import type { MembershipType, MemberStatus } from '../../types';

interface Member {
    id: string;
    name: string;
    industry?: string;
    company?: string;
    position?: string;
    title?: string;
    photo?: string;
    photoPosition?: string;
    status?: MemberStatus;
    membership_type?: MembershipType | null;
    frozen_at?: string | null;
}

interface Props {
    members: Member[];
    loading: boolean;
    onRefresh: () => void;
    /** 'active' = 在籍列表；'frozen' = 冷凍會員列表（顯示還原按鈕） */
    mode?: 'active' | 'frozen';
}

const ITEMS_PER_PAGE = 10;

const membershipLabel = (t?: MembershipType | null) => {
    if (t === 'resigned') return '離會';
    if (t === 'credit_hold') return '信用狀';
    return '冷凍';
};

const MemberList: React.FC<Props> = ({ members, loading, onRefresh, mode = 'active' }) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [freezeTarget, setFreezeTarget] = useState<Member | null>(null);

    const totalPages = Math.max(1, Math.ceil(members.length / ITEMS_PER_PAGE));
    const startIdx = (page - 1) * ITEMS_PER_PAGE;
    const displayed = members.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    const handleUnfreeze = async (m: Member) => {
        if (!confirm(`確定要還原會員「${m.name}」為在籍嗎？還原後此人將再次顯示在前台，可登入認領。`)) return;
        const { error } = await supabase
            .from('members')
            .update({
                status: 'active',
                membership_type: null,
                frozen_at: null,
                frozen_by: null,
                updatedAt: new Date().toISOString(),
            })
            .eq('id', m.id);
        if (error) {
            alert('還原失敗: ' + error.message);
        } else {
            alert('已還原為在籍會員');
            onRefresh();
        }
    };

    if (loading) {
        return <TableSkeleton columns={4} rows={8} className="mt-2" />;
    }

    if (displayed.length === 0) {
        return (
            <EmptyState
                title={mode === 'frozen' ? '目前沒有冷凍會員' : '尚無會員資料'}
                description={
                    mode === 'frozen'
                        ? '所有會員皆為在籍。被冷凍的會員（離會 / 信用狀）會顯示在此。'
                        : '沒有符合條件的會員，或列表仍為空。可調整搜尋或新增會員。'
                }
                className="border-white/5 bg-transparent py-12"
            />
        );
    }

    const renderPrimaryAction = (member: Member) => {
        if (mode === 'frozen') {
            return (
                <button
                    onClick={() => handleUnfreeze(member)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 rounded-lg transition-colors text-sm font-medium"
                    title="還原為在籍"
                >
                    <RotateCcw size={14} /> 還原
                </button>
            );
        }
        return (
            <button
                onClick={() => setFreezeTarget(member)}
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 rounded-lg transition-colors text-sm font-medium"
                title="冷凍會員（離會 / 信用狀）"
            >
                <Snowflake size={14} /> 冷凍
            </button>
        );
    };

    return (
        <div>
            <FreezeMemberModal
                open={!!freezeTarget}
                member={freezeTarget ? { id: freezeTarget.id, name: freezeTarget.name } : null}
                onClose={() => setFreezeTarget(null)}
                onFrozen={onRefresh}
            />

            {/* Mobile: Card Layout */}
            <div className="md:hidden space-y-3">
                {displayed.map(member => (
                    <div key={member.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700 shrink-0">
                                <SmartImage
                                    src={member.photo || '/images/assets/logo/白色正方形logo.png'}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                    style={{
                                        objectPosition: resolveMemberPhotoObjectPosition(member.photoPosition),
                                    }}
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="font-bold text-white truncate flex items-center gap-2">
                                    {member.name}
                                    {mode === 'frozen' && (
                                        <span className="text-[10px] font-semibold tracking-wide px-1.5 py-0.5 rounded-full bg-sky-500/15 text-sky-200 border border-sky-400/30">
                                            {membershipLabel(member.membership_type)}
                                        </span>
                                    )}
                                </div>
                                <div className="text-sm text-primary truncate">{member.industry}</div>
                                <div className="text-xs text-gray-400 truncate">{member.company} {member.position || member.title ? `· ${member.position || member.title}` : ''}</div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {mode === 'active' && (
                                <button
                                    onClick={() => navigate(`/member-edit?id=${member.id}`)}
                                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
                                >
                                    <Edit size={14} /> 編輯
                                </button>
                            )}
                            <div className={mode === 'active' ? '' : 'flex-1'}>
                                {renderPrimaryAction(member)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop: Table Layout */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-400 text-sm border-b border-white/10">
                            <th className="p-4">會員</th>
                            <th className="p-4">產業/公司</th>
                            <th className="p-4">{mode === 'frozen' ? '凍結狀態' : '職稱'}</th>
                            <th className="p-4 text-right">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayed.map(member => (
                            <tr key={member.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700 shrink-0">
                                            <SmartImage
                                                src={member.photo || '/images/assets/logo/白色正方形logo.png'}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                                style={{
                                                    objectPosition: resolveMemberPhotoObjectPosition(member.photoPosition),
                                                }}
                                            />
                                        </div>
                                        <span className="font-medium text-white">{member.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-300">
                                    <div className="text-white text-sm">{member.industry}</div>
                                    <div className="text-xs opacity-70">{member.company}</div>
                                </td>
                                <td className="p-4 text-gray-300 text-sm">
                                    {mode === 'frozen' ? (
                                        <div className="flex flex-col gap-1">
                                            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-sky-500/15 text-sky-200 border border-sky-400/30 px-2 py-0.5 text-xs font-semibold">
                                                <Snowflake size={12} /> {membershipLabel(member.membership_type)}
                                            </span>
                                            {member.frozen_at && (
                                                <span className="text-[11px] text-gray-500">
                                                    {new Date(member.frozen_at).toLocaleDateString()}
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        member.position || member.title
                                    )}
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex gap-2 justify-end">
                                        {mode === 'active' && (
                                            <button
                                                onClick={() => navigate(`/member-edit?id=${member.id}`)}
                                                className="px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors text-sm flex items-center gap-1"
                                            >
                                                <Edit size={14} /> 編輯
                                            </button>
                                        )}
                                        {mode === 'frozen' ? (
                                            <button
                                                onClick={() => handleUnfreeze(member)}
                                                className="px-3 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 rounded-full transition-colors text-sm flex items-center gap-1"
                                            >
                                                <RotateCcw size={14} /> 還原
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => setFreezeTarget(member)}
                                                className="px-3 py-1 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 rounded-full transition-colors text-sm flex items-center gap-1"
                                                title="冷凍會員（離會 / 信用狀）"
                                            >
                                                <Snowflake size={14} /> 冷凍
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5 text-sm text-gray-400">
                <span>第 {page} / {totalPages} 頁 · 共 {members.length} 筆</span>
                <div className="flex gap-2">
                    <button
                        onClick={() => setPage(p => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="flex items-center gap-1 px-3 py-1.5 bg-black/30 rounded-lg disabled:opacity-30 hover:bg-white/10 transition-colors"
                    >
                        <ChevronLeft size={14} /> 上一頁
                    </button>
                    <button
                        onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                        className="flex items-center gap-1 px-3 py-1.5 bg-black/30 rounded-lg disabled:opacity-30 hover:bg-white/10 transition-colors"
                    >
                        下一頁 <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MemberList;
