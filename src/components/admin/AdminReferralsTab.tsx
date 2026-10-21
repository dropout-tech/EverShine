import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Save, Pencil, Trash2 } from 'lucide-react';
import { EmptyState } from '../loading';

export interface ReferralFormState {
    title: string;
    description: string;
    referrer_name: string;
    referee_name: string;
    referrer_id: string;
    referee_id: string;
    referrer_story: string;
    referee_story: string;
    metrics_amount: string;
    metrics_type: string;
}

export interface AdminReferralsTabProps {
    members: Record<string, unknown>[];
    referrals: Record<string, unknown>[];
    referralForm: ReferralFormState;
    onReferralFormChange: (next: ReferralFormState) => void;
    editingReferralId: string | null;
    onCancelEdit: () => void;
    onSubmitReferral: () => void;
    onEditReferral: (ref: Record<string, unknown>) => void;
    onDeleteReferral: (id: string) => void;
}

const AdminReferralsTab: React.FC<AdminReferralsTabProps> = ({
    members,
    referrals,
    referralForm,
    onReferralFormChange,
    editingReferralId,
    onCancelEdit,
    onSubmitReferral,
    onEditReferral,
    onDeleteReferral,
}) => {
    const setField = <K extends keyof ReferralFormState>(key: K, value: ReferralFormState[K]) => {
        onReferralFormChange({ ...referralForm, [key]: value });
    };

    return (
        <div className="space-y-6">
            <p className="text-sm text-gray-400 -mt-2 mb-2">
                此處管理<strong className="text-primary">引薦案例</strong>（前台{' '}
                <Link to="/referrals" className="text-primary hover:underline">
                    /referrals
                </Link>
                ）。首頁「引薦成果」數字請至<strong className="text-white">設定</strong>分頁更新。
            </p>
            <div className="bg-bg-dark/50 border border-white/10 rounded-2xl p-4 md:p-6">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2 flex-wrap">
                    {editingReferralId ? (
                        <>
                            <Pencil size={20} className="text-primary" /> 編輯引薦案例
                        </>
                    ) : (
                        <>
                            <Plus size={20} className="text-primary" /> 新增引薦案例
                        </>
                    )}
                </h3>
                {editingReferralId && (
                    <p className="text-xs text-amber-200/90 mb-4">編輯中：儲存後將更新資料庫並同步至引薦案例頁。</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">引薦案例標題</label>
                        <input
                            type="text"
                            value={referralForm.title}
                            onChange={(e) => setField('title', e.target.value)}
                            placeholder="例如：【💼 合作共創新價值】"
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">簡短描述</label>
                        <input
                            type="text"
                            value={referralForm.description}
                            onChange={(e) => setField('description', e.target.value)}
                            placeholder="例如：生醫公司新產品線包裝設計引薦"
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                        />
                    </div>
                    {(['referrer', 'referee'] as const).map((role) => (
                        <div key={role}>
                            <label htmlFor={`${role}-member`} className="block text-gray-400 text-sm mb-1">
                                {role === 'referrer' ? '引薦人' : '被引薦人'}（依產業與公司區分同名會員）
                            </label>
                            <select id={`${role}-member`} value={referralForm[`${role}_id`]}
                                onChange={(e) => {
                                    const member = members.find((m) => String(m.id) === e.target.value);
                                    onReferralFormChange({ ...referralForm, [`${role}_id`]: e.target.value, [`${role}_name`]: String(member?.name ?? '') });
                                }}
                                className="w-full bg-bg-dark border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none">
                                <option value="">請選擇會員</option>
                                {members.map((member) => <option key={String(member.id)} value={String(member.id)}>
                                    {String(member.name)}｜{String(member.industry || '')}｜{String(member.company || member.Company || '')}
                                </option>)}
                            </select>
                        </div>
                    ))}
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">成效（顯示於案例卡）</label>
                        <input
                            type="text"
                            value={referralForm.metrics_amount}
                            onChange={(e) => setField('metrics_amount', e.target.value)}
                            placeholder="例如：洽談中、$120萬"
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">類型</label>
                        <input
                            type="text"
                            value={referralForm.metrics_type}
                            onChange={(e) => setField('metrics_type', e.target.value)}
                            placeholder="例如：專案合作"
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-gray-400 text-sm mb-1">引薦人自述 (Referrer Story)</label>
                        <textarea
                            rows={3}
                            value={referralForm.referrer_story}
                            onChange={(e) => setField('referrer_story', e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-gray-400 text-sm mb-1">被引薦人自述 (Referee Story)</label>
                        <textarea
                            rows={3}
                            value={referralForm.referee_story}
                            onChange={(e) => setField('referee_story', e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                        />
                    </div>
                </div>
                <div className="mt-6 flex flex-wrap justify-end gap-3">
                    {editingReferralId && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="px-5 py-3 border border-white/20 text-gray-300 rounded-lg hover:bg-white/5"
                        >
                            取消編輯
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={onSubmitReferral}
                        className="px-6 py-3 bg-primary text-bg-dark font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                        {editingReferralId ? <Save size={18} /> : <Plus size={18} />}
                        {editingReferralId ? '儲存變更' : '提交引薦案例'}
                    </button>
                </div>
            </div>

            <div className="bg-bg-dark/50 border border-white/10 rounded-2xl p-4 md:p-6 overflow-hidden">
                <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">引薦案例列表</h3>

                <div className="md:hidden space-y-3">
                    {referrals.length === 0 ? (
                        <EmptyState
                            title="尚無引薦單資料"
                            description="建立第一筆引薦案例後會顯示於此列表。"
                            className="border-white/5 bg-transparent py-8"
                        />
                    ) : (
                        referrals.map((ref) => (
                            <div key={String(ref.id)} className="bg-white/5 border border-white/10 rounded-xl p-4">
                                <div className="flex justify-between items-start mb-2 gap-2">
                                    <div className="text-sm font-bold text-white line-clamp-1 flex-1 mr-2">{String(ref.title)}</div>
                                    <div className="flex gap-1 shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => onEditReferral(ref)}
                                            className="p-1.5 hover:bg-primary/20 text-primary rounded-lg transition-colors"
                                            title="編輯"
                                        >
                                            <Pencil size={14} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => onDeleteReferral(String(ref.id))}
                                            className="p-1.5 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                            title="刪除"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-400 mb-2 line-clamp-1">{String(ref.description || '')}</div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-primary">
                                        {String(ref.referrer_name)} → {String(ref.referee_name)}
                                    </span>
                                    <span className="text-gray-500">
                                        {new Date((ref.createdAt || ref.created_at) as string).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-gray-400 text-sm border-b border-white/10">
                                <th className="p-4">日期</th>
                                <th className="p-4">引薦人</th>
                                <th className="p-4">被引薦人</th>
                                <th className="p-4">標題/內容</th>
                                <th className="p-4 text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {referrals.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-6">
                                        <EmptyState
                                            title="尚無引薦單資料"
                                            description="於上方表單新增案例後，將出現在此表格。"
                                            className="border-white/5 bg-transparent py-8"
                                        />
                                    </td>
                                </tr>
                            ) : (
                                referrals.map((ref) => (
                                    <tr key={String(ref.id)} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="p-4 text-gray-300 text-sm">
                                            {new Date((ref.createdAt || ref.created_at) as string).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-white font-medium">{String(ref.referrer_name)}</td>
                                        <td className="p-4 text-white text-sm">{String(ref.referee_name)}</td>
                                        <td className="p-4">
                                            <div className="text-white text-sm">{String(ref.title)}</div>
                                            <div className="text-xs text-gray-400 line-clamp-1">{String(ref.description || '')}</div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => onEditReferral(ref)}
                                                    className="p-2 hover:bg-primary/20 text-primary rounded-full transition-colors"
                                                    title="編輯"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => onDeleteReferral(String(ref.id))}
                                                    className="p-2 hover:bg-red-500/20 text-red-400 rounded-full transition-colors"
                                                    title="刪除"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminReferralsTab;
