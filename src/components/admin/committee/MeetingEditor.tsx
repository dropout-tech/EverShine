import React, { useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, ClipboardCopy, History, Loader2, Lock, LockOpen, Plus, Trash2 } from 'lucide-react';
import { createAgendaItem, deleteMeeting, updateMeeting, type CommitteeBundle } from '../../../api/committee';
import {
    carriedActionsFor,
    COMMITTEE_SECTIONS,
    type CommitteeMeeting,
    defaultDueDate,
    formatMeetingDate,
    meetingToText,
} from '../../../lib/committee';
import AbsenteePicker from './AbsenteePicker';
import ActionItemCard from './ActionItemCard';
import AddActionForm from './AddActionForm';
import AgendaItemRow from './AgendaItemRow';
import MemberSelect from './MemberSelect';
import { inputClass, type MemberOption, type RunCommittee, type SaveState } from './memberOptions';

interface MeetingEditorProps {
    meeting: CommitteeMeeting;
    bundle: CommitteeBundle;
    options: MemberOption[];
    nameOf: (id: number | null | undefined) => string;
    run: RunCommittee;
    saveState: SaveState;
    savedAt: Date | null;
    onOpenMeeting: (id: string) => void;
    onDeleted: () => void;
}

const SaveIndicator: React.FC<{ state: SaveState; savedAt: Date | null }> = ({ state, savedAt }) => {
    if (state === 'saving')
        return (
            <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                <Loader2 size={13} className="animate-spin" /> 儲存中…
            </span>
        );
    if (state === 'failed')
        return (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-300">
                <AlertCircle size={13} /> 上一次儲存失敗
            </span>
        );
    if (state === 'saved' && savedAt)
        return (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300/90">
                <CheckCircle2 size={13} /> 已自動儲存{' '}
                {savedAt.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false })}
            </span>
        );
    return <span className="text-xs text-gray-500">內容會自動儲存</span>;
};

const panel = 'rounded-2xl border border-white/10 bg-bg-dark/50 p-4 md:p-5';

const MeetingEditor: React.FC<MeetingEditorProps> = ({
    meeting,
    bundle,
    options,
    nameOf,
    run,
    saveState,
    savedAt,
    onOpenMeeting,
    onDeleted,
}) => {
    const [addingLoose, setAddingLoose] = useState(false);
    const [focusSection, setFocusSection] = useState<string | null>(null);
    const readOnly = meeting.status === 'finalized';
    const defaultDue = defaultDueDate(meeting.meeting_date);

    const agenda = useMemo(
        () => bundle.agenda.filter((a) => a.meeting_id === meeting.id),
        [bundle.agenda, meeting.id]
    );
    const ownActions = useMemo(
        () => bundle.actions.filter((a) => a.meeting_id === meeting.id),
        [bundle.actions, meeting.id]
    );
    const carried = useMemo(
        () => carriedActionsFor(meeting, bundle.meetings, bundle.actions),
        [meeting, bundle.meetings, bundle.actions]
    );
    const looseActions = ownActions.filter((a) => !a.agenda_item_id || !agenda.some((i) => i.id === a.agenda_item_id));

    const addItem = (section: (typeof COMMITTEE_SECTIONS)[number]['id']) => {
        const max = agenda.filter((a) => a.section === section).reduce((m, a) => Math.max(m, a.sort_order), -1);
        setFocusSection(section);
        void run(() => createAgendaItem({ meeting_id: meeting.id, section, sort_order: max + 1, content: '' }));
    };

    const copyText = async () => {
        const text = meetingToText(meeting, agenda, ownActions, carried, nameOf);
        try {
            await navigator.clipboard.writeText(text);
            alert('已複製文字版紀錄，可直接貼到 LINE 或 Email。');
        } catch {
            window.prompt('請手動複製：', text);
        }
    };

    const toggleFinal = () => {
        const next = readOnly ? 'draft' : 'finalized';
        if (next === 'finalized' && !confirm('定稿後內容會鎖定，需要修改時可再「解除定稿」。確定定稿？')) return;
        void run(() => updateMeeting(meeting.id, { status: next }));
    };

    const remove = async () => {
        if (!confirm(`確定刪除 ${formatMeetingDate(meeting.meeting_date)} 的會議紀錄？議程與會後行動會一併刪除。`)) return;
        const ok = await run(() => deleteMeeting(meeting.id));
        if (ok) onDeleted();
    };

    const openCount = ownActions.filter((a) => a.status === 'open').length;

    return (
        <div className="space-y-4">
            <div className={panel}>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-bold text-white">{formatMeetingDate(meeting.meeting_date)}</h2>
                    <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            readOnly ? 'bg-emerald-400/15 text-emerald-200' : 'bg-amber-400/15 text-amber-200'
                        }`}
                    >
                        {readOnly ? '已定稿' : '草稿'}
                    </span>
                    <SaveIndicator state={saveState} savedAt={savedAt} />
                    <div className="ml-auto flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => void copyText()}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-2 text-xs font-bold text-gray-200 hover:bg-white/10"
                        >
                            <ClipboardCopy size={14} /> 複製文字版
                        </button>
                        <button
                            type="button"
                            onClick={toggleFinal}
                            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold ${
                                readOnly
                                    ? 'bg-white/5 text-gray-200 hover:bg-white/10'
                                    : 'bg-primary text-bg-dark hover:bg-primary/90'
                            }`}
                        >
                            {readOnly ? <LockOpen size={14} /> : <Lock size={14} />}
                            {readOnly ? '解除定稿' : '定稿'}
                        </button>
                        {!readOnly && (
                            <button
                                type="button"
                                onClick={() => void remove()}
                                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-gray-500 hover:bg-rose-500/10 hover:text-rose-300"
                            >
                                <Trash2 size={14} /> 刪除
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block">
                        <span className="mb-1 block text-sm text-gray-400">日期</span>
                        <input
                            type="date"
                            value={meeting.meeting_date}
                            disabled={readOnly}
                            onChange={(e) =>
                                e.target.value && void run(() => updateMeeting(meeting.id, { meeting_date: e.target.value }))
                            }
                            className={inputClass}
                        />
                    </label>
                    <label className="block">
                        <span className="mb-1 block text-sm text-gray-400">紀錄者</span>
                        <MemberSelect
                            value={meeting.recorder_id}
                            disabled={readOnly}
                            onChange={(id) => void run(() => updateMeeting(meeting.id, { recorder_id: id }))}
                            options={options}
                            placeholder="選擇紀錄者"
                        />
                    </label>
                </div>
                <div className="mt-4">
                    <span className="mb-2 block text-sm text-gray-400">請假者</span>
                    <AbsenteePicker
                        value={meeting.absent_member_ids}
                        readOnly={readOnly}
                        options={options}
                        onChange={(ids) => void run(() => updateMeeting(meeting.id, { absent_member_ids: ids }))}
                    />
                </div>
            </div>

            <section className={panel}>
                <h3 className="mb-1 flex items-center gap-2 text-lg font-bold text-white">
                    <History size={18} className="text-primary" /> 上次追蹤事項
                    <span className="ml-1 rounded-full bg-white/10 px-2 py-0.5 font-mono text-xs text-gray-300">
                        {carried.length}
                    </span>
                </h3>
                <p className="mb-3 text-xs text-gray-500">
                    之前會議留下、還沒結案的會後行動會自動列在這裡。處理完按「完成」；沒處理完就不用動，下次會繼續出現。
                </p>
                {carried.length === 0 ? (
                    <div className="rounded-xl border border-white/5 py-6 text-center text-sm text-gray-500">
                        沒有待追蹤的事項
                    </div>
                ) : (
                    <div className="space-y-2">
                        {carried.map(({ action, origin, round }) => (
                            <ActionItemCard
                                key={action.id}
                                action={action}
                                nameOf={nameOf}
                                run={run}
                                readOnly={readOnly}
                                resolveInMeetingId={meeting.id}
                                originLabel={`來自 ${formatMeetingDate(origin.meeting_date)}`}
                                onOpenOrigin={() => onOpenMeeting(origin.id)}
                                round={round}
                                showNote
                            />
                        ))}
                    </div>
                )}
            </section>

            {COMMITTEE_SECTIONS.map((section) => {
                const items = agenda.filter((a) => a.section === section.id);
                return (
                    <section key={section.id} className={panel}>
                        <h3 className="mb-1 text-lg font-bold text-white">
                            <span className="mr-2 font-mono text-primary">{section.no}.</span>
                            {section.label}
                        </h3>
                        <p className="mb-3 text-xs text-gray-500">{section.hint}</p>
                        {items.length > 0 && (
                            <ol className="mb-3 space-y-2">
                                {items.map((item, i) => (
                                    <AgendaItemRow
                                        key={item.id}
                                        item={item}
                                        index={i}
                                        section={section}
                                        actions={ownActions.filter((a) => a.agenda_item_id === item.id)}
                                        meetingId={meeting.id}
                                        defaultDue={defaultDue}
                                        options={options}
                                        nameOf={nameOf}
                                        run={run}
                                        readOnly={readOnly}
                                        autoFocus={focusSection === section.id && i === items.length - 1 && !item.content}
                                    />
                                ))}
                            </ol>
                        )}
                        {items.length === 0 && readOnly && <p className="text-sm text-gray-500">（無）</p>}
                        {!readOnly && (
                            <button
                                type="button"
                                onClick={() => addItem(section.id)}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-white/15 px-3 py-2 text-sm text-gray-300 hover:border-primary/50 hover:text-primary"
                            >
                                <Plus size={15} /> 新增一項
                            </button>
                        )}
                    </section>
                );
            })}

            <section className={`${panel} border-primary/25`}>
                <h3 className="mb-1 text-lg font-bold text-white">本次會後行動</h3>
                <p className="mb-3 text-xs text-gray-500">
                    本次共 {ownActions.length} 項，其中 {openCount} 項追蹤中。追蹤中的行動會自動帶入下一次會議的「上次追蹤事項」。
                </p>
                <div className="space-y-2">
                    {looseActions.map((a) => (
                        <ActionItemCard
                            key={a.id}
                            action={a}
                            nameOf={nameOf}
                            run={run}
                            readOnly={readOnly}
                            resolveInMeetingId={meeting.id}
                            allowDelete
                        />
                    ))}
                    {addingLoose ? (
                        <AddActionForm
                            meetingId={meeting.id}
                            agendaItemId={null}
                            defaultDue={defaultDue}
                            options={options}
                            run={run}
                            onDone={() => setAddingLoose(false)}
                        />
                    ) : (
                        !readOnly && (
                            <button
                                type="button"
                                onClick={() => setAddingLoose(true)}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-white/15 px-3 py-2 text-sm text-gray-300 hover:border-primary/50 hover:text-primary"
                            >
                                <Plus size={15} /> 新增會後行動（不屬於上面任何一項）
                            </button>
                        )
                    )}
                </div>
            </section>
        </div>
    );
};

export default MeetingEditor;
