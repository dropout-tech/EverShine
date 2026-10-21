import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ListPlus, Trash2 } from 'lucide-react';
import { deleteAgendaItem, updateAgendaItem } from '../../../api/committee';
import type { CommitteeActionItem, CommitteeAgendaItem, CommitteeSectionDef } from '../../../lib/committee';
import { sanitizeText } from '../../../lib/sanitize';
import ActionItemCard from './ActionItemCard';
import AddActionForm from './AddActionForm';
import MemberSelect from './MemberSelect';
import { inputClass, type MemberOption, type RunCommittee } from './memberOptions';

interface AgendaItemRowProps {
    item: CommitteeAgendaItem;
    index: number;
    section: CommitteeSectionDef;
    actions: CommitteeActionItem[];
    meetingId: string;
    defaultDue: string;
    options: MemberOption[];
    nameOf: (id: number | null | undefined) => string;
    run: RunCommittee;
    readOnly: boolean;
    autoFocus?: boolean;
}

const AUTOSAVE_MS = 1200;

const AgendaItemRow: React.FC<AgendaItemRowProps> = ({
    item,
    index,
    section,
    actions,
    meetingId,
    defaultDue,
    options,
    nameOf,
    run,
    readOnly,
    autoFocus,
}) => {
    const [content, setContent] = useState(item.content);
    const [adding, setAdding] = useState(false);
    const savedRef = useRef(item.content);
    const latestRef = useRef(item.content);

    const saveContent = useCallback(() => {
        const next = sanitizeText(latestRef.current, 4000).trim();
        if (next === savedRef.current) return;
        savedRef.current = next;
        void run(() => updateAgendaItem(item.id, { content: next }));
    }, [run, item.id]);

    useEffect(() => {
        if (readOnly) return;
        const t = window.setTimeout(saveContent, AUTOSAVE_MS);
        return () => window.clearTimeout(t);
    }, [content, readOnly, saveContent]);

    useEffect(() => saveContent, [saveContent]);

    const remove = () => {
        const msg = actions.length
            ? `這一項有 ${actions.length} 個會後行動，刪除後行動會保留但不再連到這一項。確定刪除？`
            : '確定刪除這一項？';
        if (!confirm(msg)) return;
        void run(() => deleteAgendaItem(item.id));
    };

    return (
        <li className="rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="flex items-start gap-3">
                <span className="mt-2 w-5 shrink-0 text-right font-mono text-xs text-gray-500">{index + 1}.</span>
                <div className="min-w-0 flex-1 space-y-2">
                    {section.withMember && (
                        <MemberSelect
                            value={item.member_id}
                            disabled={readOnly}
                            onChange={(id) => void run(() => updateAgendaItem(item.id, { member_id: id }))}
                            options={options}
                            placeholder="選擇會員"
                            className="sm:max-w-[14rem]"
                        />
                    )}
                    <textarea
                        value={content}
                        disabled={readOnly}
                        rows={2}
                        autoFocus={autoFocus}
                        onChange={(e) => {
                            latestRef.current = e.target.value;
                            setContent(e.target.value);
                        }}
                        onBlur={saveContent}
                        placeholder={section.hint}
                        className={`${inputClass} resize-y leading-relaxed`}
                    />
                </div>
                {!readOnly && (
                    <button
                        type="button"
                        onClick={remove}
                        className="mt-1 shrink-0 rounded-lg p-1.5 text-gray-500 hover:bg-rose-500/10 hover:text-rose-300"
                        title="刪除這一項"
                    >
                        <Trash2 size={15} />
                    </button>
                )}
            </div>

            {(actions.length > 0 || adding || !readOnly) && (
                <div className="mt-3 space-y-2 pl-8">
                    {actions.map((a) => (
                        <ActionItemCard
                            key={a.id}
                            action={a}
                            nameOf={nameOf}
                            run={run}
                            readOnly={readOnly}
                            resolveInMeetingId={meetingId}
                            allowDelete
                        />
                    ))}
                    {adding ? (
                        <AddActionForm
                            meetingId={meetingId}
                            agendaItemId={item.id}
                            section={item.section}
                            defaultDue={defaultDue}
                            options={options}
                            run={run}
                            onDone={() => setAdding(false)}
                        />
                    ) : (
                        !readOnly && (
                            <button
                                type="button"
                                onClick={() => setAdding(true)}
                                className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-bold text-primary/90 hover:bg-primary/10 hover:text-primary"
                            >
                                <ListPlus size={14} /> 新增會後行動
                            </button>
                        )
                    )}
                </div>
            )}
        </li>
    );
};

export default AgendaItemRow;
