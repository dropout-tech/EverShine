import { supabase } from '../lib/supabase';
import type { Member } from '../hooks/useMembers';
import { formatTaiwanPhoneDisplay } from '../lib/phoneFormat';

/** 公開會員列表（與前台 MemberWall / Members / Contact 共用） — 只回傳在籍會員 */
export async function fetchPublicMembers(): Promise<Member[]> {
    // 相容舊資料：status 欄位可能尚未 migrate，故用 .or 放行 null 與 'active'
    const { data, error } = await supabase
        .from('members')
        .select('*')
        .or('status.is.null,status.eq.active')
        .order('id', { ascending: true });
    if (error) throw error;
    const rows = (data || []) as Member[];
    return rows.map((m) => ({
        ...m,
        phone: m.phone ? formatTaiwanPhoneDisplay(m.phone) : m.phone,
    }));
}
