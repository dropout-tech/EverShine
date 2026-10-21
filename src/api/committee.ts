import { supabase } from '../lib/supabase';
import type {
    CommitteeActionItem,
    CommitteeAgendaItem,
    CommitteeMeeting,
    CommitteeSection,
} from '../lib/committee';

export const COMMITTEE_MIGRATION_FILE = 'scripts/migration_committee_meetings_20261006.sql';

export class CommitteeSetupRequiredError extends Error {
    constructor() {
        super('資料庫尚未建立委員會會議資料表');
        this.name = 'CommitteeSetupRequiredError';
    }
}

interface PgError {
    code?: string;
    message?: string;
}

const isMissingTable = (error: PgError | null): boolean =>
    !!error &&
    (error.code === '42P01' ||
        error.code === 'PGRST205' ||
        /could not find the table|does not exist/i.test(error.message ?? ''));

const raise = (error: PgError | null): void => {
    if (!error) return;
    if (isMissingTable(error)) throw new CommitteeSetupRequiredError();
    throw new Error(error.message || '資料庫錯誤');
};

export interface CommitteeBundle {
    meetings: CommitteeMeeting[];
    agenda: CommitteeAgendaItem[];
    actions: CommitteeActionItem[];
}

export async function fetchCommitteeBundle(): Promise<CommitteeBundle> {
    const [meetingsRes, agendaRes, actionsRes] = await Promise.all([
        supabase.from('committee_meetings').select('*').order('meeting_date', { ascending: false }),
        supabase.from('committee_agenda_items').select('*').order('sort_order').order('created_at'),
        supabase.from('committee_action_items').select('*').order('created_at'),
    ]);
    raise(meetingsRes.error);
    raise(agendaRes.error);
    raise(actionsRes.error);
    return {
        meetings: (meetingsRes.data ?? []).map((m) => ({
            ...m,
            absent_member_ids: (m.absent_member_ids ?? []).map(Number),
        })) as CommitteeMeeting[],
        agenda: (agendaRes.data ?? []) as CommitteeAgendaItem[],
        actions: (actionsRes.data ?? []) as CommitteeActionItem[],
    };
}

export async function createMeeting(row: {
    meeting_date: string;
    recorder_id: number | null;
}): Promise<CommitteeMeeting> {
    const { data, error } = await supabase.from('committee_meetings').insert(row).select('*').single();
    raise(error);
    return data as CommitteeMeeting;
}

export async function updateMeeting(
    id: string,
    patch: Partial<Pick<CommitteeMeeting, 'meeting_date' | 'recorder_id' | 'absent_member_ids' | 'status' | 'title'>>
): Promise<void> {
    const { error } = await supabase.from('committee_meetings').update(patch).eq('id', id);
    raise(error);
}

export async function deleteMeeting(id: string): Promise<void> {
    const { error } = await supabase.from('committee_meetings').delete().eq('id', id);
    raise(error);
}

export async function createAgendaItem(row: {
    meeting_id: string;
    section: CommitteeSection;
    member_id?: number | null;
    content?: string;
    sort_order: number;
}): Promise<void> {
    const { error } = await supabase.from('committee_agenda_items').insert(row);
    raise(error);
}

export async function updateAgendaItem(
    id: string,
    patch: Partial<Pick<CommitteeAgendaItem, 'content' | 'member_id'>>
): Promise<void> {
    const { error } = await supabase.from('committee_agenda_items').update(patch).eq('id', id);
    raise(error);
}

export async function deleteAgendaItem(id: string): Promise<void> {
    const { error } = await supabase.from('committee_agenda_items').delete().eq('id', id);
    raise(error);
}

export async function createActionItem(row: {
    meeting_id: string;
    agenda_item_id: string | null;
    section: CommitteeSection;
    content: string;
    owner_id: number | null;
    due_date: string | null;
}): Promise<void> {
    const { error } = await supabase.from('committee_action_items').insert(row);
    raise(error);
}

export async function updateActionItem(
    id: string,
    patch: Partial<
        Pick<
            CommitteeActionItem,
            'content' | 'owner_id' | 'due_date' | 'status' | 'resolved_meeting_id' | 'resolved_at' | 'resolution_note'
        >
    >
): Promise<void> {
    const { error } = await supabase.from('committee_action_items').update(patch).eq('id', id);
    raise(error);
}

export async function deleteActionItem(id: string): Promise<void> {
    const { error } = await supabase.from('committee_action_items').delete().eq('id', id);
    raise(error);
}
