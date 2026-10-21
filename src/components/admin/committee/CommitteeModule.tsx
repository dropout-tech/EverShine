import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CalendarPlus, Database, Loader2, RefreshCw } from 'lucide-react';
import {
    COMMITTEE_MIGRATION_FILE,
    CommitteeSetupRequiredError,
    createMeeting,
    fetchCommitteeBundle,
} from '../../../api/committee';
import { queryKeys } from '../../../api/queryKeys';
import { formatMeetingDate, nextMeetingDate } from '../../../lib/committee';
import { ErrorFallback } from '../../loading';
import ActionBoard from './ActionBoard';
import MeetingEditor from './MeetingEditor';
import { toMemberOptions, type RunCommittee, type SaveState } from './memberOptions';

export type CommitteeView = 'meetings' | 'actions';

interface CommitteeModuleProps {
    members: Record<string, unknown>[];
    view: CommitteeView;
    onViewChange: (view: CommitteeView) => void;
}

const SetupNotice: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
    <div className="rounded-2xl border border-amber-300/30 bg-amber-400/5 p-6">
        <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-white">
            <Database size={20} className="text-amber-300" /> 需要先建立資料表
        </h3>
        <ol className="mb-4 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-gray-300">
            <li>到 Supabase 專案 → SQL Editor → New query。</li>
            <li>
                貼上 repo 裡 <code className="rounded bg-black/40 px-1.5 py-0.5 text-amber-200">{COMMITTEE_MIGRATION_FILE}</code>{' '}
                的全部內容並執行。
            </li>
            <li>回到這裡按「重新檢查」。</li>
        </ol>
        <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-bg-dark hover:bg-primary/90"
        >
            <RefreshCw size={16} /> 重新檢查
        </button>
    </div>
);

const CommitteeModule: React.FC<CommitteeModuleProps> = ({ members, view, onViewChange }) => {
    const queryClient = useQueryClient();
    const [searchParams, setSearchParams] = useSearchParams();
    const [pending, setPending] = useState(0);
    const [savedAt, setSavedAt] = useState<Date | null>(null);
    const [saveFailed, setSaveFailed] = useState(false);
    const busy = pending > 0;

    const query = useQuery({
        queryKey: queryKeys.committee.bundle,
        queryFn: fetchCommitteeBundle,
        retry: (count, error) => !(error instanceof CommitteeSetupRequiredError) && count < 2,
        staleTime: 15_000,
    });

    const options = useMemo(() => toMemberOptions(members), [members]);
    const nameById = useMemo(() => new Map(options.map((o) => [o.id, o.name])), [options]);
    const nameOf = useCallback((id: number | null | undefined) => (id == null ? '' : nameById.get(id) ?? ''), [nameById]);

    const run: RunCommittee = useCallback(
        async (fn) => {
            setPending((n) => n + 1);
            try {
                await fn();
                await queryClient.invalidateQueries({ queryKey: queryKeys.committee.bundle });
                setSavedAt(new Date());
                setSaveFailed(false);
                return true;
            } catch (e) {
                setSaveFailed(true);
                alert('儲存失敗：' + (e instanceof Error ? e.message : String(e)));
                return false;
            } finally {
                setPending((n) => n - 1);
            }
        },
        [queryClient]
    );

    useEffect(() => {
        if (!busy) return;
        const warn = (e: BeforeUnloadEvent) => e.preventDefault();
        window.addEventListener('beforeunload', warn);
        return () => window.removeEventListener('beforeunload', warn);
    }, [busy]);

    const saveState: SaveState = busy ? 'saving' : saveFailed ? 'failed' : savedAt ? 'saved' : 'idle';

    const meetings = useMemo(() => query.data?.meetings ?? [], [query.data]);
    const selectedId = searchParams.get('meeting');
    const selected = meetings.find((m) => m.id === selectedId) ?? meetings[0] ?? null;

    const selectMeeting = useCallback(
        (id: string | null) =>
            setSearchParams(
                (prev) => {
                    const next = new URLSearchParams(prev);
                    if (id) next.set('meeting', id);
                    else next.delete('meeting');
                    return next;
                },
                { replace: true }
            ),
        [setSearchParams]
    );

    useEffect(() => {
        if (selectedId && query.data && !meetings.some((m) => m.id === selectedId)) selectMeeting(null);
    }, [selectedId, query.data, meetings, selectMeeting]);

    const openMeeting = (id: string) => {
        selectMeeting(id);
        onViewChange('meetings');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const addMeeting = async () => {
        const date = nextMeetingDate();
        if (meetings.some((m) => m.meeting_date === date) && !confirm(`${formatMeetingDate(date)} 已經有紀錄，還要再新增一場嗎？`))
            return;
        let createdId: string | null = null;
        const ok = await run(async () => {
            const created = await createMeeting({ meeting_date: date, recorder_id: meetings[0]?.recorder_id ?? null });
            createdId = created.id;
        });
        if (ok && createdId) selectMeeting(createdId);
    };

    if (query.isLoading) {
        return (
            <div className="flex items-center justify-center gap-2 py-24 text-gray-400">
                <Loader2 className="animate-spin" size={18} /> 載入委員會紀錄…
            </div>
        );
    }
    if (query.error instanceof CommitteeSetupRequiredError) {
        return <SetupNotice onRetry={() => void query.refetch()} />;
    }
    if (query.isError || !query.data) {
        return <ErrorFallback message={(query.error as Error)?.message} onRetry={() => void query.refetch()} />;
    }

    const bundle = query.data;

    if (view === 'actions') {
        return <ActionBoard bundle={bundle} options={options} nameOf={nameOf} run={run} onOpenMeeting={openMeeting} />;
    }

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[17rem_minmax(0,1fr)]">
            <aside className="space-y-3 lg:sticky lg:top-28 lg:self-start">
                <button
                    type="button"
                    disabled={busy}
                    onClick={() => void addMeeting()}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-bold text-bg-dark hover:bg-primary/90 disabled:opacity-60"
                >
                    <CalendarPlus size={18} /> 新增會議紀錄
                </button>
                {meetings.length > 0 && (
                    <select
                        value={selected?.id ?? ''}
                        onChange={(e) => selectMeeting(e.target.value)}
                        aria-label="選擇會議"
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm font-bold text-white focus:border-primary focus:outline-none lg:hidden"
                    >
                        {meetings.map((m) => {
                            const open = bundle.actions.filter((a) => a.meeting_id === m.id && a.status === 'open').length;
                            return (
                                <option key={m.id} value={m.id}>
                                    {formatMeetingDate(m.meeting_date)}
                                    {m.status === 'finalized' ? '・已定稿' : '・草稿'}
                                    {open > 0 ? `・追蹤中 ${open}` : ''}
                                </option>
                            );
                        })}
                    </select>
                )}
                <div className="hidden max-h-[60vh] space-y-1.5 overflow-y-auto pr-1 [scrollbar-width:thin] lg:block">
                    {meetings.length === 0 && (
                        <p className="rounded-xl border border-white/5 px-3 py-6 text-center text-sm text-gray-500">
                            還沒有會議紀錄
                        </p>
                    )}
                    {meetings.map((m) => {
                        const own = bundle.actions.filter((a) => a.meeting_id === m.id);
                        const open = own.filter((a) => a.status === 'open').length;
                        const active = selected?.id === m.id;
                        return (
                            <button
                                key={m.id}
                                type="button"
                                onClick={() => selectMeeting(m.id)}
                                className={`w-full rounded-xl border px-3 py-2.5 text-left transition-colors ${
                                    active
                                        ? 'border-primary/50 bg-primary/10 ring-1 ring-primary/40'
                                        : 'border-white/5 bg-white/[0.03] hover:border-primary/30 hover:bg-white/[0.06]'
                                }`}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-sm font-bold text-white">{formatMeetingDate(m.meeting_date)}</span>
                                    <span
                                        className={`text-[10px] font-bold ${
                                            m.status === 'finalized' ? 'text-emerald-300' : 'text-amber-300'
                                        }`}
                                    >
                                        {m.status === 'finalized' ? '已定稿' : '草稿'}
                                    </span>
                                </div>
                                <div className="mt-1 text-xs text-gray-400">
                                    紀錄：{nameOf(m.recorder_id) || '未指定'} · 行動 {own.length}
                                    {open > 0 && <span className="text-amber-300">（追蹤中 {open}）</span>}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </aside>

            <div className="min-w-0">
                {selected ? (
                    <MeetingEditor
                        key={selected.id}
                        meeting={selected}
                        bundle={bundle}
                        options={options}
                        nameOf={nameOf}
                        run={run}
                        saveState={saveState}
                        savedAt={savedAt}
                        onOpenMeeting={openMeeting}
                        onDeleted={() => selectMeeting(null)}
                    />
                ) : (
                    <div className="rounded-2xl border border-white/10 bg-bg-dark/50 px-6 py-16 text-center text-gray-400">
                        按「新增會議紀錄」開始第一次的委員會會議。
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommitteeModule;
