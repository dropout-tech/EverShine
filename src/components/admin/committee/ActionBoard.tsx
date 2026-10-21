import React, { useMemo, useState } from 'react';
import type { CommitteeBundle } from '../../../api/committee';
import { formatMeetingDate, isOverdue } from '../../../lib/committee';
import ActionItemCard from './ActionItemCard';
import MemberSelect from './MemberSelect';
import { type MemberOption, type RunCommittee } from './memberOptions';

type Filter = 'open' | 'overdue' | 'closed';

interface ActionBoardProps {
    bundle: CommitteeBundle;
    options: MemberOption[];
    nameOf: (id: number | null | undefined) => string;
    run: RunCommittee;
    onOpenMeeting: (id: string) => void;
}

const FILTERS: { id: Filter; label: string }[] = [
    { id: 'open', label: '追蹤中' },
    { id: 'overdue', label: '已逾期' },
    { id: 'closed', label: '已結案' },
];

const ActionBoard: React.FC<ActionBoardProps> = ({ bundle, options, nameOf, run, onOpenMeeting }) => {
    const [filter, setFilter] = useState<Filter>('open');
    const [ownerId, setOwnerId] = useState<number | null>(null);
    const meetingById = useMemo(() => new Map(bundle.meetings.map((m) => [m.id, m])), [bundle.meetings]);

    const counts = useMemo(
        () => ({
            open: bundle.actions.filter((a) => a.status === 'open').length,
            overdue: bundle.actions.filter((a) => isOverdue(a)).length,
            closed: bundle.actions.filter((a) => a.status !== 'open').length,
        }),
        [bundle.actions]
    );

    const list = bundle.actions
        .filter((a) =>
            filter === 'open' ? a.status === 'open' : filter === 'overdue' ? isOverdue(a) : a.status !== 'open'
        )
        .filter((a) => ownerId == null || a.owner_id === ownerId)
        .sort((a, b) => (a.due_date ?? '9999').localeCompare(b.due_date ?? '9999'));

    return (
        <div className="rounded-2xl border border-white/10 bg-bg-dark/50 p-4 md:p-6">
            <div className="mb-4 flex flex-wrap items-center gap-2">
                {FILTERS.map((f) => (
                    <button
                        key={f.id}
                        type="button"
                        onClick={() => setFilter(f.id)}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                            filter === f.id ? 'bg-primary text-bg-dark' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                    >
                        {f.label}
                        <span className="rounded-full bg-black/30 px-2 py-0.5 font-mono text-[10px]">{counts[f.id]}</span>
                    </button>
                ))}
                <MemberSelect
                    value={ownerId}
                    onChange={setOwnerId}
                    options={options}
                    placeholder="全部負責人"
                    className="ml-auto !w-auto min-w-[10rem]"
                />
            </div>
            <p className="mb-4 text-xs text-gray-500">
                這裡列出所有會議的會後行動。會議以外完成的事也可以直接在這裡結案。
            </p>
            {list.length === 0 ? (
                <div className="rounded-xl border border-white/5 py-12 text-center text-sm text-gray-500">沒有符合的行動</div>
            ) : (
                <div className="space-y-2">
                    {list.map((a) => {
                        const origin = meetingById.get(a.meeting_id);
                        return (
                            <ActionItemCard
                                key={a.id}
                                action={a}
                                nameOf={nameOf}
                                run={run}
                                resolveInMeetingId={null}
                                originLabel={origin ? `來自 ${formatMeetingDate(origin.meeting_date)}` : undefined}
                                onOpenOrigin={origin ? () => onOpenMeeting(origin.id) : undefined}
                                showNote
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ActionBoard;
