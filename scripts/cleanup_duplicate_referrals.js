#!/usr/bin/env node
/**
 * 清除與 es-case-001～067 內容重疊的舊引薦案例（ref-001～013、new-case-1～6）。
 * 需要 SUPABASE_SERVICE_ROLE_KEY（Dashboard > Settings > API > service_role）。
 *
 * 用法：SUPABASE_SERVICE_ROLE_KEY=xxx node scripts/cleanup_duplicate_referrals.js
 */
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const LEGACY_SUPERSEDED_IDS = [
    'ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-005', 'ref-006', 'ref-007',
    'ref-008', 'ref-009', 'ref-010', 'ref-011', 'ref-012', 'ref-013',
    'new-case-1', 'new-case-2', 'new-case-3', 'new-case-4', 'new-case-5', 'new-case-6',
];

if (!url || !serviceKey) {
    console.error('請設定 VITE_SUPABASE_URL 與 SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const supabase = createClient(url, serviceKey);

const { data: before } = await supabase.from('referrals').select('id, referrer_name, referee_name');
const legacyInDb = (before || []).filter((r) => LEGACY_SUPERSEDED_IDS.includes(r.id));
console.log(`資料庫中舊版重複案例：${legacyInDb.length} 筆`);
for (const r of legacyInDb) {
    console.log(`  - ${r.id}: ${r.referrer_name} → ${r.referee_name}`);
}

if (legacyInDb.length === 0) {
    console.log('無需清理。');
    process.exit(0);
}

const { data: deleted, error } = await supabase
    .from('referrals')
    .delete()
    .in('id', LEGACY_SUPERSEDED_IDS)
    .select('id');

if (error) {
    console.error('刪除失敗:', error.message);
    process.exit(1);
}

console.log(`已刪除 ${deleted?.length ?? 0} 筆舊版重複案例。`);
