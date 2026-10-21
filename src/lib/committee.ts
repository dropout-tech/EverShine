export type CommitteeSection = 'member_tracking' | 'meeting_suggestion' | 'special_discussion' | 'other';
export type ActionStatus = 'open' | 'done' | 'cancelled';
export type MeetingStatus = 'draft' | 'finalized';

export interface CommitteeMeeting {
    id: string;
    meeting_date: string;
    title: string;
    recorder_id: number | null;
    absent_member_ids: number[];
    status: MeetingStatus;
    created_at: string;
    updated_at: string;
}

export interface CommitteeAgendaItem {
    id: string;
    meeting_id: string;
    section: CommitteeSection;
    member_id: number | null;
    content: string;
    sort_order: number;
    created_at: string;
}

export interface CommitteeActionItem {
    id: string;
    meeting_id: string;
    agenda_item_id: string | null;
    section: CommitteeSection;
    content: string;
    owner_id: number | null;
    due_date: string | null;
    status: ActionStatus;
    resolved_meeting_id: string | null;
    resolved_at: string | null;
    resolution_note: string | null;
    created_at: string;
}

export interface CommitteeSectionDef {
    id: CommitteeSection;
    no: number;
    label: string;
    hint: string;
    /** 每一項可指定一位會員（會員追蹤用） */
    withMember?: boolean;
}

export const COMMITTEE_SECTIONS: CommitteeSectionDef[] = [
    { id: 'member_tracking', no: 1, label: '會員追蹤', hint: '個別會員的狀況、續約、出席或需要關心的事', withMember: true },
    { id: 'meeting_suggestion', no: 2, label: '對例會建議', hint: '教育簡報、出席狀況、流程與時間控制' },
    { id: 'special_discussion', no: 3, label: '特別討論事項', hint: '需要委員會決議或深入討論的議題' },
    { id: 'other', no: 4, label: '其他事項', hint: '臨時動議與其他補充' },
];

export const ACTION_STATUS_LABEL: Record<ActionStatus, string> = {
    open: '追蹤中',
    done: '已完成',
    cancelled: '取消',
};

export const sectionLabel = (id: CommitteeSection): string =>
    COMMITTEE_SECTIONS.find((s) => s.id === id)?.label ?? id;

const toIsoDate = (d: Date): string => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
};

/** 今天或之後最近的週三（例會與會後會同一天） */
export const nextMeetingDate = (from: Date = new Date()): string => {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    const diff = (3 - d.getDay() + 7) % 7;
    d.setDate(d.getDate() + diff);
    return toIsoDate(d);
};

/** 下一次會議前一天，作為會後行動的預設期限 */
export const defaultDueDate = (meetingDate: string): string => {
    const [y, m, d] = meetingDate.split('-').map(Number);
    return toIsoDate(new Date(y, m - 1, d + 6));
};

export const formatMeetingDate = (iso: string): string => {
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return iso;
    const weekday = '日一二三四五六'[new Date(y, m - 1, d).getDay()];
    return `${y}/${m}/${d}（${weekday}）`;
};

/** 會後行動在該會議之前是否已結案（用來決定是否還要帶入該次議程） */
const resolvedBefore = (
    action: CommitteeActionItem,
    meeting: CommitteeMeeting,
    meetingById: Map<string, CommitteeMeeting>
): boolean => {
    if (action.status === 'open') return false;
    if (action.resolved_meeting_id) {
        if (action.resolved_meeting_id === meeting.id) return false;
        const resolvedIn = meetingById.get(action.resolved_meeting_id);
        if (resolvedIn) return resolvedIn.meeting_date < meeting.meeting_date;
    }
    if (action.resolved_at) return action.resolved_at.slice(0, 10) < meeting.meeting_date;
    return true;
};

export interface CarriedAction {
    action: CommitteeActionItem;
    origin: CommitteeMeeting;
    /** 第幾次被帶入追蹤（1 = 第一次在下一場會議出現） */
    round: number;
}

/**
 * 本次會議的「上次追蹤事項」：所有較早會議產生、到本次開會時仍未結案的會後行動。
 * 在本次會議中結案的仍會列出，方便看到本次處理結果。
 */
export const carriedActionsFor = (
    meeting: CommitteeMeeting,
    meetings: CommitteeMeeting[],
    actions: CommitteeActionItem[]
): CarriedAction[] => {
    const meetingById = new Map(meetings.map((m) => [m.id, m]));
    const result: CarriedAction[] = [];
    for (const action of actions) {
        const origin = meetingById.get(action.meeting_id);
        if (!origin || origin.meeting_date >= meeting.meeting_date) continue;
        if (resolvedBefore(action, meeting, meetingById)) continue;
        const round = meetings.filter(
            (m) => m.meeting_date > origin.meeting_date && m.meeting_date <= meeting.meeting_date
        ).length;
        result.push({ action, origin, round: Math.max(1, round) });
    }
    return result.sort(
        (a, b) =>
            a.origin.meeting_date.localeCompare(b.origin.meeting_date) ||
            a.action.created_at.localeCompare(b.action.created_at)
    );
};

export const openActionCount = (actions: CommitteeActionItem[]): number =>
    actions.filter((a) => a.status === 'open').length;

export const isOverdue = (action: CommitteeActionItem, today: string = toIsoDate(new Date())): boolean =>
    action.status === 'open' && !!action.due_date && action.due_date < today;

type NameOf = (id: number | null | undefined) => string;

/** 文字版紀錄，可直接貼到 LINE 或 Email */
export const meetingToText = (
    meeting: CommitteeMeeting,
    agenda: CommitteeAgendaItem[],
    ownActions: CommitteeActionItem[],
    carried: CarriedAction[],
    nameOf: NameOf
): string => {
    const lines: string[] = [];
    lines.push(`【${meeting.title}】${formatMeetingDate(meeting.meeting_date)}`);
    lines.push(`紀錄者：${nameOf(meeting.recorder_id) || '未指定'}`);
    const absent = meeting.absent_member_ids.map((id) => nameOf(id)).filter(Boolean);
    lines.push(`請假：${absent.length ? absent.join('、') : '無'}`);
    lines.push('');

    lines.push('■ 上次追蹤事項');
    if (carried.length === 0) lines.push('（無）');
    carried.forEach(({ action, origin }, i) => {
        const owner = nameOf(action.owner_id);
        const note = action.resolution_note ? `｜${action.resolution_note}` : '';
        lines.push(
            `${i + 1}. [${ACTION_STATUS_LABEL[action.status]}] ${action.content}` +
                `${owner ? `（${owner}）` : ''} — 來自 ${formatMeetingDate(origin.meeting_date)}${note}`
        );
    });
    lines.push('');

    for (const section of COMMITTEE_SECTIONS) {
        lines.push(`■ ${section.no}. ${section.label}`);
        const items = agenda.filter((a) => a.section === section.id && a.content.trim());
        if (items.length === 0) lines.push('（無）');
        items.forEach((item, i) => {
            const who = section.withMember && item.member_id ? `${nameOf(item.member_id)}：` : '';
            lines.push(`${i + 1}. ${who}${item.content.trim()}`);
        });
        lines.push('');
    }

    lines.push('■ 會後行動');
    if (ownActions.length === 0) lines.push('（無）');
    ownActions.forEach((a, i) => {
        const owner = nameOf(a.owner_id);
        const due = a.due_date ? `，${formatMeetingDate(a.due_date)} 前` : '';
        lines.push(`${i + 1}. ${a.content}${owner ? `（${owner}${due}）` : due ? `（${due.slice(1)}）` : ''}`);
    });

    return lines.join('\n').trim();
};
