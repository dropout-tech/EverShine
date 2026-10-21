-- 認領換帳：已綁定 user_id 的會員仍可被新帳號認領，但須與 members.email 相符（大小寫／空白不敏感）
-- 未認領 (user_id IS NULL) 僅需通過前端分會密碼後呼叫 RPC，p_email_proof 可傳空字串。
-- 部署：在 Supabase SQL Editor 執行本檔，或併入 migration pipeline。

CREATE OR REPLACE FUNCTION public.claim_member(p_member_id bigint, p_email_proof text DEFAULT '')
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  m RECORD;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  SELECT id, email, user_id INTO m FROM public.members WHERE id = p_member_id FOR UPDATE;
  IF m.id IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_found');
  END IF;

  IF m.user_id IS NOT DISTINCT FROM auth.uid() THEN
    RETURN jsonb_build_object('ok', true, 'already_yours', true);
  END IF;

  -- 不可認領他人目前綁定中的檔案（未通過 email 驗證）
  IF m.user_id IS NOT NULL AND lower(btrim(COALESCE(m.email, ''))) <> lower(btrim(COALESCE(p_email_proof, ''))) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'email_mismatch');
  END IF;

  IF m.user_id IS NULL THEN
    UPDATE public.members SET user_id = auth.uid() WHERE id = p_member_id AND user_id IS NULL;
    IF FOUND THEN
      RETURN jsonb_build_object('ok', true);
    END IF;
    RETURN jsonb_build_object('ok', false, 'error', 'race_or_claimed');
  END IF;

  -- 已被他人認領：email 已在上方比對通過
  IF m.email IS NULL OR btrim(m.email) = '' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'no_email_on_file');
  END IF;

  UPDATE public.members SET user_id = auth.uid() WHERE id = p_member_id;
  RETURN jsonb_build_object('ok', true);
END;
$$;

REVOKE ALL ON FUNCTION public.claim_member(bigint, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.claim_member(bigint, text) TO authenticated;

COMMENT ON FUNCTION public.claim_member IS
  '會員認領：未認領直接綁定；已認領須 p_email_proof 與 members.email 一致才改綁至目前 auth.uid()';

-- 認領改由 RPC 處理後，可移除此政策（避免繞過 email 驗證直接 UPDATE user_id）
DROP POLICY IF EXISTS "members_claim_unclaimed" ON public.members;
