#!/usr/bin/env python3
"""Apply brand de-identification to referral JSON sources and emit SQL updates."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPL_PATH = ROOT / "src" / "data" / "referral-brand-replacements.json"
CASES_67 = ROOT / "scripts" / "referrals_67_cases.json"
CASES_EXTRA = ROOT / "src" / "data" / "referral-cases-extra.json"
PENDING = ROOT / "scripts" / "referrals_pending_confirm.json"
PUBLIC_LEGACY = ROOT / "public" / "data" / "referrals.json"
SQL_OUT = ROOT / "scripts" / "deidentify_referrals.sql"

TRAILING = [
    ("聯華", "該食品大廠"),
    ("再興", "該校"),
    ("弘第", "該家具品牌"),
    ("北醫", "北部醫學院校"),
]


def apply_text(text: str, pairs: list[list[str]]) -> str:
    out = text
    for src, dst in pairs:
        out = out.replace(src, dst)
    for src, dst in TRAILING:
        out = out.replace(src, dst)
    return out


def walk(value, pairs):
    if isinstance(value, str):
        return apply_text(value, pairs)
    if isinstance(value, list):
        return [walk(item, pairs) for item in value]
    if isinstance(value, dict):
        return {key: walk(item, pairs) for key, item in value.items()}
    return value


def sql_str(value: str) -> str:
    return "'" + value.replace("'", "''") + "'"


def sql_json(obj: dict) -> str:
    return sql_str(json.dumps(obj, ensure_ascii=False))


def main() -> None:
    pairs = json.loads(REPL_PATH.read_text(encoding="utf-8"))
    old_67 = json.loads(CASES_67.read_text(encoding="utf-8"))
    new_67 = walk(old_67, pairs)
    CASES_67.write_text(json.dumps(new_67, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    extra = json.loads(CASES_EXTRA.read_text(encoding="utf-8"))
    CASES_EXTRA.write_text(json.dumps(walk(extra, pairs), ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    pending = json.loads(PENDING.read_text(encoding="utf-8"))
    PENDING.write_text(json.dumps(walk(pending, pairs), ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    if PUBLIC_LEGACY.exists():
        public = json.loads(PUBLIC_LEGACY.read_text(encoding="utf-8"))
        PUBLIC_LEGACY.write_text(json.dumps(walk(public, pairs), ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    lines = [
        "-- 引薦案例客戶品牌去識別化（可重複執行）",
        "-- 在 Supabase Dashboard > SQL Editor 貼上執行",
        "",
        "BEGIN;",
        "",
    ]
    changed = 0
    for old, new in zip(old_67, new_67):
        if old == new:
            continue
        changed += 1
        case_id = f"es-case-{int(new['num']):03d}"
        metrics = {
            "amount": new.get("metrics_amount") or "成功引薦",
            "type": new.get("metrics_type") or new["title"],
        }
        lines.append(f"-- case {new['num']}")
        lines.append("UPDATE public.referrals SET")
        lines.append(f"  title = {sql_str(new['title'])},")
        lines.append(f"  description = {sql_str(new.get('highlight') or new['title'])},")
        lines.append(f"  referrer_story = {sql_str(new['referrer_story'])},")
        lines.append(f"  referee_story = {sql_str(new['referee_story'])},")
        lines.append(f"  metrics = {sql_json(metrics)}::jsonb")
        lines.append(f"WHERE id = {sql_str(case_id)};")
        lines.append("")

    lines.extend(["COMMIT;", "", f"-- Updated: {changed} cases"])
    SQL_OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"Patched JSON; wrote {SQL_OUT} ({changed} updates)")


if __name__ == "__main__":
    main()
