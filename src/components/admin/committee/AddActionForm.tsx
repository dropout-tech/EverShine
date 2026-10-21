import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { createActionItem } from '../../../api/committee';
import { COMMITTEE_SECTIONS, type CommitteeSection } from '../../../lib/committee';
import { sanitizeText } from '../../../lib/sanitize';
import MemberSelect from './MemberSelect';
import { inputClass, type MemberOption, type RunCommittee } from './memberOptions';

interface AddActionFormProps {
    meetingId: string;
    agendaItemId: string | null;
    /** 未指定時讓使用者選分區 */
    section?: CommitteeSection;
    defaultOwnerId?: number | null;
    defaultDue: string;
    options: MemberOption[];
    run: RunCommittee;
    onDone: () => void;
}

const AddActionForm: React.FC<AddActionFormProps> = ({
    meetingId,
    agendaItemId,
    section,
    defaultOwnerId,
    defaultDue,
    options,
    run,
    onDone,
}) => {
    const [content, setContent] = useState('');
    const [ownerId, setOwnerId] = useState<number | null>(defaultOwnerId ?? null);
    const [due, setDue] = useState(defaultDue);
    const [pickedSection, setPickedSection] = useState<CommitteeSection>(section ?? 'other');

    const submit = async () => {
        const text = sanitizeText(content, 1000).trim();
        if (!text) {
            alert('請填寫要做什麼');
            return;
        }
        const ok = await run(() =>
            createActionItem({
                meeting_id: meetingId,
                agenda_item_id: agendaItemId,
                section: section ?? pickedSection,
                content: text,
                owner_id: ownerId,
                due_date: due || null,
            })
        );
        if (ok) onDone();
    };

    return (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 space-y-2">
            <input
                autoFocus
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.nativeEvent.isComposing) void submit();
                }}
                placeholder="會後行動：要做什麼？"
                className={inputClass}
            />
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto]">
                <MemberSelect value={ownerId} onChange={setOwnerId} options={options} placeholder="負責人" />
                <input type="date" value={due} onChange={(e) => setDue(e.target.value)} className={inputClass} />
                {!section && (
                    <select
                        value={pickedSection}
                        onChange={(e) => setPickedSection(e.target.value as CommitteeSection)}
                        className={inputClass}
                    >
                        {COMMITTEE_SECTIONS.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.no}. {s.label}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onDone}
                    className="rounded-lg px-3 py-1.5 text-xs font-bold text-gray-400 hover:bg-white/5"
                >
                    取消
                </button>
                <button
                    type="button"
                    onClick={() => void submit()}
                    className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-bg-dark hover:bg-primary/90"
                >
                    <Plus size={14} /> 加入會後行動
                </button>
            </div>
        </div>
    );
};

export default AddActionForm;
