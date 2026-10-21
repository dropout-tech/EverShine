import React, { useState } from 'react';
import { Check, CornerDownRight, RotateCcw, Trash2, X } from 'lucide-react';
import { deleteActionItem, updateActionItem } from '../../../api/committee';
import {
    ACTION_STATUS_LABEL,
    type CommitteeActionItem,
    formatMeetingDate,
    isOverdue,
    sectionLabel,
} from '../../../lib/committee';
import { inputClass, type RunCommittee } from './memberOptions';

interface ActionItemCardProps {
    action: CommitteeActionItem;
    nameOf: (id: number | null | undefined) => string;
    run: RunCommittee;
    readOnly?: boolean;
    /** 在哪一場會議中處理；看板直接結案時為 null */
    resolveInMeetingId: string | null;
    originLabel?: string;
    round?: number;
    showNote?: boolean;
    allowDelete?: boolean;
    onOpenOrigin?: () => void;
}

const STATUS_STYLE: Record<CommitteeActionItem['status'], string> = {
    open: 'bg-amber-400/15 text-amber-200 border-amber-300/30',
    done: 'bg-emerald-400/15 text-emerald-200 border-emerald-300/30',
    cancelled: 'bg-white/5 text-gray-400 border-white/10',
};

const ActionItemCard: React.FC<ActionItemCardProps> = ({
    action,
    nameOf,
    run,
    readOnly,
    resolveInMeetingId,
    originLabel,
    round,
    showNote,
    allowDelete,
    onOpenOrigin,
}) => {
    const [note, setNote] = useState(action.resolution_note ?? '');
    const overdue = isOverdue(action);
    const owner = nameOf(action.owner_id);

    const resolve = (status: 'done' | 'cancelled') =>
        run(() =>
            updateActionItem(action.id, {
                status,
                resolved_meeting_id: resolveInMeetingId,
                resolved_at: new Date().toISOString(),
                resolution_note: note.trim() || null,
            })
        );

    const reopen = () =>
        run(() =>
            updateActionItem(action.id, {
                status: 'open',
                resolved_meeting_id: null,
                resolved_at: null,
            })
        );

    const saveNote = () => {
        if ((action.resolution_note ?? '') === note.trim()) return;
        void run(() => updateActionItem(action.id, { resolution_note: note.trim() || null }));
    };

    const remove = () => {
        if (!confirm('確定刪除這項會後行動？')) return;
        void run(() => deleteActionItem(action.id));
    };

    return (
        <div
            className={`rounded-xl border p-3 ${
                action.status === 'open' ? 'border-white/10 bg-white/[0.03]' : 'border-white/5 bg-black/20'
            }`}
        >
            <div className="flex flex-wrap items-start gap-2">
                <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-bold ${STATUS_STYLE[action.status]}`}
                >
                    {ACTION_STATUS_LABEL[action.status]}
                </span>
                {round && round > 1 && action.status === 'open' && (
                    <span className="shrink-0 rounded-full bg-rose-500/15 px-2 py-0.5 text-[11px] font-bold text-rose-200">
                        第 {round} 次追蹤
                    </span>
                )}
                <p
                    className={`min-w-0 flex-1 text-sm leading-relaxed ${
                        action.status === 'cancelled' ? 'text-gray-500 line-through' : 'text-white'
                    }`}
                >
                    {action.content}
                </p>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
                <span>負責：{owner || <span className="text-gray-600">未指定</span>}</span>
                {action.due_date && (
                    <span className={overdue ? 'font-bold text-rose-300' : ''}>
                        期限：{formatMeetingDate(action.due_date)}
                        {overdue && '（逾期）'}
                    </span>
                )}
                <span className="text-gray-500">{sectionLabel(action.section)}</span>
                {originLabel &&
                    (onOpenOrigin ? (
                        <button
                            type="button"
                            onClick={onOpenOrigin}
                            className="inline-flex items-center gap-1 text-primary/90 hover:text-primary"
                        >
                            <CornerDownRight size={12} /> {originLabel}
                        </button>
                    ) : (
                        <span className="inline-flex items-center gap-1 text-gray-500">
                            <CornerDownRight size={12} /> {originLabel}
                        </span>
                    ))}
            </div>

            {showNote && (
                <input
                    value={note}
                    disabled={readOnly}
                    onChange={(e) => setNote(e.target.value)}
                    onBlur={saveNote}
                    placeholder="本次進度／處理結果"
                    className={`${inputClass} mt-2`}
                />
            )}

            {!readOnly && (
                <div className="mt-2 flex flex-wrap items-center gap-2">
                    {action.status === 'open' ? (
                        <>
                            <button
                                type="button"
                                onClick={() => void resolve('done')}
                                className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/15 px-3 py-1.5 text-xs font-bold text-emerald-200 hover:bg-emerald-500/25"
                            >
                                <Check size={14} /> 完成
                            </button>
                            <button
                                type="button"
                                onClick={() => void resolve('cancelled')}
                                className="inline-flex items-center gap-1 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-bold text-gray-300 hover:bg-white/10"
                            >
                                <X size={14} /> 取消
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => void reopen()}
                            className="inline-flex items-center gap-1 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-bold text-gray-300 hover:bg-white/10"
                        >
                            <RotateCcw size={14} /> 改回追蹤中
                        </button>
                    )}
                    {allowDelete && (
                        <button
                            type="button"
                            onClick={remove}
                            className="ml-auto inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs text-gray-500 hover:bg-rose-500/10 hover:text-rose-300"
                            title="刪除"
                        >
                            <Trash2 size={14} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ActionItemCard;
