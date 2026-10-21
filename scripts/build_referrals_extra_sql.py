#!/usr/bin/env python3
"""Generate idempotent SQL for extra referral cases (71–76).

Run: python3 scripts/build_referrals_extra_sql.py
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "src" / "data" / "referral-cases-extra.json"
OUT_PATH = Path(__file__).with_name("seed_referrals_71_76.sql")

MEMBER_NAMES = {
    "何昇軒", "劉弼凱", "劉懿德", "吳介輝", "吳宇峰", "吳睿霖", "吳貞妮", "呂學承",
    "孫成育", "廖俊瑋", "廖涌辰", "彭顯智", "徐采璇", "施秉辰", "李孟一", "李彥慶",
    "李慰祖", "李秉誠", "李維恩", "杜宗樺", "林修賢", "林庭瑀", "楊承樺", "楊明翰",
    "江學洋", "江心怡", "江沛璇", "洪儀君", "洪智威", "游凱地", "湯益承", "潘芷盈",
    "王冠勛", "王執定", "王年煜", "王祈", "王銓", "蘇子超", "蘇翊婷", "許雅婷",
    "詹謦鴻", "賴永相", "賴瑋弘", "邱宇鴻", "邱翰城", "郭孝淵", "郭家宏", "鄭雅菁",
    "陳亭儒", "陳夗媃", "陳育文", "顧心芝", "黃昱歆",
    "劉祐沁", "徐幼璇", "廖乙宸", "陸韻如", "李逸強", "周律廷",
}


def sql_str(value: str) -> str:
    return "'" + value.replace("'", "''") + "'"


def sql_json(obj: dict) -> str:
    return sql_str(json.dumps(obj, ensure_ascii=False))


def load_cases() -> list[dict]:
    cases = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    if not isinstance(cases, list) or not cases:
        raise SystemExit(f"Expected a non-empty array in {DATA_PATH}")

    required = (
        "num",
        "date",
        "title",
        "highlight",
        "referrer_name",
        "referee_name",
        "referrer_story",
        "referee_story",
        "metrics_amount",
        "metrics_type",
    )
    nums: set[int] = set()
    for case in cases:
        missing = [key for key in required if not str(case.get(key, "")).strip()]
        if missing:
            raise SystemExit(f"Case {case.get('num')} missing fields: {missing}")
        num = int(case["num"])
        if num in nums:
            raise SystemExit(f"Duplicate case number: {num}")
        nums.add(num)
        for role in ("referrer_name", "referee_name"):
            name = case[role]
            if name not in MEMBER_NAMES:
                raise SystemExit(f"Unknown member name {name!r} in case {num}")
    return cases


def main() -> None:
    cases = load_cases()
    lines: list[str] = [
        "-- EverShine 長輝白金分會：引薦案例 71–76（2026-07～08）",
        "-- 可重複執行（ON CONFLICT 依 id 更新）",
        "-- 在 Supabase Dashboard > SQL Editor 貼上執行",
        "-- 編號 68–70 本批未收錄；補錄 A、B 待當事人確認，見 scripts/referrals_pending_confirm.json",
        "",
        "BEGIN;",
        "",
    ]

    for case in cases:
        num = int(case["num"])
        case_id = f"es-case-{num:03d}"
        title = case["title"]
        description = case.get("highlight") or title
        metrics = {
            "amount": case.get("metrics_amount") or "成功引薦",
            "type": case.get("metrics_type") or title,
        }

        lines.append(
            "INSERT INTO public.referrals "
            "(id, title, description, referrer_name, referee_name, referrer_story, referee_story, metrics, created_at)"
        )
        lines.append("VALUES (")
        lines.append(f"  {sql_str(case_id)},")
        lines.append(f"  {sql_str(title)},")
        lines.append(f"  {sql_str(description)},")
        lines.append(f"  {sql_str(case['referrer_name'])},")
        lines.append(f"  {sql_str(case['referee_name'])},")
        lines.append(f"  {sql_str(case['referrer_story'])},")
        lines.append(f"  {sql_str(case['referee_story'])},")
        lines.append(f"  {sql_json(metrics)}::jsonb,")
        lines.append(f"  {sql_str(case['date'])}::timestamptz")
        lines.append(")")
        lines.append("ON CONFLICT (id) DO UPDATE SET")
        lines.append("  title = EXCLUDED.title,")
        lines.append("  description = EXCLUDED.description,")
        lines.append("  referrer_name = EXCLUDED.referrer_name,")
        lines.append("  referee_name = EXCLUDED.referee_name,")
        lines.append("  referrer_story = EXCLUDED.referrer_story,")
        lines.append("  referee_story = EXCLUDED.referee_story,")
        lines.append("  metrics = EXCLUDED.metrics,")
        lines.append("  created_at = EXCLUDED.created_at;")
        lines.append("")

    lines.extend(["COMMIT;", "", f"-- Total: {len(cases)} cases"])
    OUT_PATH.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {OUT_PATH} ({len(cases)} cases)")


if __name__ == "__main__":
    try:
        main()
    except SystemExit as exc:
        print(exc, file=sys.stderr)
        raise
