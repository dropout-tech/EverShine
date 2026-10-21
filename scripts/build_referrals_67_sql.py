#!/usr/bin/env python3
"""Generate idempotent SQL for 67 referral cases. Run: python3 scripts/build_referrals_67_sql.py"""

from __future__ import annotations

import json
import re
from pathlib import Path

MEMBER_NAMES = {
    "何昇軒", "劉弼凱", "劉懿德", "吳介輝", "吳宇峰", "吳睿霖", "吳貞妮", "呂學承",
    "孫成育", "廖俊瑋", "廖涌辰", "彭顯智", "徐采璇", "施秉辰", "李孟一", "李彥慶",
    "李慰祖", "李秉誠", "李維恩", "杜宗樺", "林修賢", "林庭瑀", "楊承樺", "楊明翰",
    "江學洋", "江心怡", "江沛璇", "洪儀君", "洪智威", "游凱地", "湯益承", "潘芷盈",
    "王冠勛", "王執定", "王年煜", "王祈", "王銓", "蘇子超", "蘇翊婷", "許雅婷",
    "詹謦鴻", "賴永相", "賴瑋弘", "邱宇鴻", "邱翰城", "郭孝淵", "郭家宏", "鄭雅菁",
    "陳亭儒", "陳夗媃", "陳育文", "顧心芝", "黃昱歆",
    # legacy / production members (may not be in local JSON)
    "劉祐沁", "徐幼璇", "廖乙宸", "陸韻如", "李逸強", "周律廷",
}

ALIASES = {
    "江怡玲": "江沛璇",
}


def norm_name(raw: str) -> str:
    s = raw.strip()
    if not s:
        return s
    if s in ALIASES:
        return ALIASES[s]
    if "江怡玲" in s or (s.startswith("江") and "沛璇" in s):
        return "江沛璇"
    for name in sorted(MEMBER_NAMES, key=len, reverse=True):
        if s.startswith(name):
            return name
    m = re.match(r"^([^（(]+)", s)
    base = (m.group(1) if m else s).strip()
    if base in ALIASES:
        return ALIASES[base]
    if base in MEMBER_NAMES:
        return base
    return base.split()[0]


def sql_str(value: str) -> str:
    return "'" + value.replace("'", "''") + "'"


def sql_json(obj: dict) -> str:
    return sql_str(json.dumps(obj, ensure_ascii=False))


def load_cases() -> list[dict]:
    data_path = Path(__file__).with_name("referrals_67_cases.json")
    return json.loads(data_path.read_text(encoding="utf-8"))


def main() -> None:
    cases = load_cases()
    lines: list[str] = [
        "-- EverShine 長輝白金分會：67 筆引薦案例",
        "-- 可重複執行（ON CONFLICT 依 id 更新）",
        "-- 在 Supabase Dashboard > SQL Editor 貼上執行",
        "",
        "BEGIN;",
        "",
    ]

    for case in cases:
        num = int(case["num"])
        case_id = f"es-case-{num:03d}"
        title = case["title"]
        description = case.get("highlight") or case.get("description") or title
        referrer = norm_name(case["referrer"])
        referee = norm_name(case["referee"])
        metrics = {
            "amount": case.get("metrics_amount") or "成功引薦",
            "type": case.get("metrics_type") or title,
        }
        created_at = case["date"]

        lines.append(
            "INSERT INTO public.referrals "
            "(id, title, description, referrer_name, referee_name, referrer_story, referee_story, metrics, created_at)"
        )
        lines.append("VALUES (")
        lines.append(f"  {sql_str(case_id)},")
        lines.append(f"  {sql_str(title)},")
        lines.append(f"  {sql_str(description)},")
        lines.append(f"  {sql_str(referrer)},")
        lines.append(f"  {sql_str(referee)},")
        lines.append(f"  {sql_str(case['referrer_story'])},")
        lines.append(f"  {sql_str(case['referee_story'])},")
        lines.append(f"  {sql_json(metrics)}::jsonb,")
        lines.append(f"  {sql_str(created_at)}::timestamptz")
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
    out = Path(__file__).with_name("seed_referrals_67.sql")
    out.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {out} ({len(cases)} cases)")


if __name__ == "__main__":
    main()
