import React, { useState } from 'react';
import { X, Snowflake, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { MembershipType } from '../../types';

interface Props {
    open: boolean;
    member: { id: string; name: string } | null;
    onClose: () => void;
    onFrozen: () => void;
}

/** 二擇一冷凍會員（離會 / 信用狀）— 取代直接刪除，資料永久保留於資料庫。 */
const FreezeMemberModal: React.FC<Props> = ({ open, member, onClose, onFrozen }) => {
    const [reason, setReason] = useState<MembershipType | null>(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    React.useEffect(() => {
        if (open) {
            setReason(null);
            setError(null);
        }
    }, [open]);

    if (!open || !member) return null;

    const handleSubmit = async () => {
        if (!reason) {
            setError('請選擇冷凍原因');
            return;
        }
        setSaving(true);
        setError(null);
        try {
            const { data: authData } = await supabase.auth.getUser();
            const updates: Record<string, unknown> = {
                status: 'frozen',
                membership_type: reason,
                frozen_at: new Date().toISOString(),
                frozen_by: authData.user?.id ?? null,
                user_id: null,
                updatedAt: new Date().toISOString(),
            };
            const { error: err } = await supabase.from('members').update(updates).eq('id', member.id);
            if (err) throw err;
            onFrozen();
            onClose();
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            setError('冷凍失敗：' + msg);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="absolute inset-0" aria-hidden onClick={() => !saving && onClose()} />
            <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-bg-dark shadow-2xl">
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Snowflake className="text-sky-300" size={22} />
                        冷凍會員
                    </h2>
                    <button
                        type="button"
                        onClick={() => !saving && onClose()}
                        className="p-2 rounded-lg hover:bg-white/10 text-gray-400"
                        aria-label="關閉"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="p-5 space-y-4">
                    <div className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-100">
                        <AlertCircle size={18} className="shrink-0 mt-0.5 text-amber-300" />
                        <div className="leading-relaxed">
                            即將冷凍會員「<span className="font-bold text-white">{member.name}</span>」。
                            冷凍後此檔案將<strong className="mx-1">不會出現在前台</strong>、
                            無法被登入或認領，但資料永久保留於資料庫，日後可隨時還原。
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">冷凍原因（必選）</label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() => setReason('resigned')}
                                className={`flex flex-col items-center gap-1 rounded-xl border px-3 py-4 text-sm transition-colors ${
                                    reason === 'resigned'
                                        ? 'border-sky-400 bg-sky-500/15 text-white'
                                        : 'border-white/10 bg-white/[0.04] text-gray-300 hover:border-white/30'
                                }`}
                            >
                                <span className="text-base font-bold">離會</span>
                                <span className="text-[11px] opacity-70">主動退出或屆期未續</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setReason('credit_hold')}
                                className={`flex flex-col items-center gap-1 rounded-xl border px-3 py-4 text-sm transition-colors ${
                                    reason === 'credit_hold'
                                        ? 'border-sky-400 bg-sky-500/15 text-white'
                                        : 'border-white/10 bg-white/[0.04] text-gray-300 hover:border-white/30'
                                }`}
                            >
                                <span className="text-base font-bold">信用狀</span>
                                <span className="text-[11px] opacity-70">信用相關暫停權益</span>
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-2 pt-1">
                        <button
                            type="button"
                            onClick={() => !saving && onClose()}
                            className="flex-1 py-2.5 rounded-lg border border-white/20 text-gray-300 hover:bg-white/5"
                        >
                            取消
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={saving || !reason}
                            className="flex-1 py-2.5 rounded-lg bg-sky-500 text-white font-bold hover:bg-sky-400 disabled:opacity-50"
                        >
                            {saving ? '處理中…' : '確認冷凍'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreezeMemberModal;
