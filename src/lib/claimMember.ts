import { supabase } from './supabase';

export type ClaimMemberResult =
    | { ok: true; alreadyYours?: boolean }
    | { ok: false; code: string; message: string };

const MESSAGES: Record<string, string> = {
    not_authenticated: '請先登入。',
    not_found: '找不到該會員資料。',
    race_or_claimed: '此名額已被他人認領，請重新整理後再試。',
    no_email_on_file: '此會員檔案未登記 Email，無法線上驗證換帳，請聯絡管理員。',
    email_mismatch: '原登記 Email 不符，無法認領。請輸入當初綁定此檔案時使用的 Email。',
    member_frozen: '此會員目前已不在分會在籍名單中，歡迎您隨時回到長輝白金分會，我們隨時歡迎您。',
};

function mapRpcError(code: string): string {
    return MESSAGES[code] || '認領失敗，請稍後再試或聯絡管理員。';
}

/**
 * 認領會員：未認領不需 email；已認領須傳與 members.email 相符的 proof（大小寫／首尾空白不敏感）。
 * 依賴 DB function public.claim_member(bigint, text)。
 */
export async function claimMemberRpc(memberId: string | number, emailProof: string): Promise<ClaimMemberResult> {
    const id = typeof memberId === 'string' ? Number(memberId) : memberId;
    if (!Number.isFinite(id)) {
        return { ok: false, code: 'invalid_id', message: '無效的會員編號。' };
    }

    const proof = emailProof.trim();

    const { data, error } = await supabase.rpc('claim_member', {
        p_member_id: id,
        p_email_proof: proof,
    });

    if (error) {
        const msg = error.message || '';
        if (/claim_member|function.*does not exist|schema cache/i.test(msg)) {
            return {
                ok: false,
                code: 'rpc_missing',
                message: '認領功能尚未完成資料庫設定，請聯絡管理員執行 migration_claim_member_with_email.sql。',
            };
        }
        return { ok: false, code: 'rpc_error', message: msg };
    }

    const row = data as { ok?: boolean; error?: string; already_yours?: boolean; alreadyYours?: boolean } | null;
    if (!row || row.ok !== true) {
        const code = (row?.error as string) || 'unknown';
        return { ok: false, code, message: mapRpcError(code) };
    }

    return { ok: true, alreadyYours: Boolean(row.already_yours ?? row.alreadyYours) };
}
