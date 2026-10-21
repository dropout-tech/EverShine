import React, { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { useMembers } from '../../hooks/useMembers';
import { formatTaiwanPhoneDisplay, formatTaiwanPhoneTelHref } from '../../lib/phoneFormat';
import type { Member } from '../../types';
import MemberDetailModal from '../members/MemberDetailModal';
import { resolveMemberPhotoObjectPosition } from '../../lib/memberPhotoPosition';

/** 三尊幹部：站方設定職稱與預設聯絡；與會員庫 name 對應時由 Supabase members 覆寫公司／電話／信箱／產業 */
const LEADERSHIP = [
    {
        title: '現任主席',
        name: '鄭雅菁',
        industry: '共享空間',
        company: '小島好日 LifeArt Studio',
        phone: '0970-862-180',
        email: 'islanday.life@gmail.com',
    },
    {
        title: '現任副主席',
        name: '洪智威',
        industry: '空調工程',
        company: '昇宏空調工程有限公司',
        phone: '0956-865-098',
        email: '',
    },
    {
        title: '現任秘書財務',
        name: '王執定',
        industry: '信託規劃顧問',
        company: '問大師家族辦公室',
        phone: '0927-860-882',
        email: 'garfiwang@gmail.com',
    },
] as const;

type LeadershipRow = {
    title: string;
    name: string;
    industry: string;
    company: string;
    phone: string;
    email: string;
    member: Member | null;
};

function buildLeaderMemberForModal(row: LeadershipRow, fallback: (typeof LEADERSHIP)[number], index: number): Member {
    if (row.member) return row.member;
    const phoneDigits = row.phone.replace(/\D/g, '');
    return {
        id: -(100_000 + index),
        name: row.name,
        photo: `/images/members/${row.name}.jpg`,
        industry: row.industry,
        company: row.company,
        position: fallback.title.replace(/^現任/, ''),
        title: fallback.title.replace(/^現任/, ''),
        shortIntro: '',
        fullIntro: '',
        links: row.email ? { mail: `mailto:${row.email}` } : {},
        services: [],
        hashtags: [],
        email: row.email || undefined,
        phone: phoneDigits || undefined,
    };
}

const Contact: React.FC = () => {
    const { members } = useMembers();
    const [detailMember, setDetailMember] = useState<Member | null>(null);

    const leadership = useMemo(() => {
        return LEADERSHIP.map((role) => {
            const member = members.find((m) => m.name === role.name) ?? null;
            return {
                ...role,
                member,
                company: member?.company?.trim() || role.company,
                phone: formatTaiwanPhoneDisplay(member?.phone?.trim() || role.phone),
                email: (member?.email?.trim() || role.email || '').trim(),
                industry: member?.industry?.trim() || role.industry,
            } satisfies LeadershipRow;
        });
    }, [members]);

    const openLeaderDetail = useCallback((row: LeadershipRow, fallback: (typeof LEADERSHIP)[number], index: number) => {
        setDetailMember(buildLeaderMemberForModal(row, fallback, index));
    }, []);

    return (
        <section
            className="relative flex flex-col justify-center overflow-hidden py-20 md:py-28 lg:py-32"
            id="contact"
            aria-labelledby="contact-heading"
        >
            {/* 背景：網格＋漸層（不搶前景可讀性） */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.22]"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(79, 176, 227, 0.28) 1px, transparent 0)`,
                    backgroundSize: '28px 28px',
                }}
                aria-hidden
            />
            <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#030712] via-[#061525] to-[#030712]"
                aria-hidden
            />
            <div className="pointer-events-none absolute top-1/4 left-1/2 h-[420px] w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-[#4FB0E3]/[0.06] blur-[100px]" aria-hidden />

            <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
                {/* 標題區 */}
                <div className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
                    <motion.h2
                        id="contact-heading"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-5 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl"
                    >
                        聯繫 <span className="text-[#4FB0E3]">EverShine</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.08 }}
                        className="text-base leading-relaxed text-gray-400 sm:text-lg"
                    >
                        歡迎與台灣 BNI 長輝白金分會聯繫。無論是業務合作、商會參訪申請，或是想了解更多關於台灣 BNI 商會的資訊，我們隨時為您服務。
                    </motion.p>
                </div>

                {/* 三尊卡片 */}
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
                    {leadership.map((item, index) => {
                        const fallback = LEADERSHIP[index];
                        return (
                        <motion.article
                            key={item.name}
                            role="button"
                            tabIndex={0}
                            aria-label={`查看 ${item.name} 完整會員介紹`}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ delay: index * 0.08, duration: 0.45 }}
                            onClick={() => openLeaderDetail(item, fallback, index)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    openLeaderDetail(item, fallback, index);
                                }
                            }}
                            className="group flex h-full min-h-0 cursor-pointer flex-col rounded-2xl border border-[#4FB0E3]/25 bg-gradient-to-b from-[#0c1a2e]/95 to-[#081018]/95 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:border-[#4FB0E3]/45 hover:shadow-[0_16px_48px_rgba(79,176,227,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4FB0E3]/60 sm:p-7"
                        >
                            {/* 頭像 */}
                            <div className="mb-6 flex flex-col items-center text-center">
                                <div className="relative mb-5 h-[7.5rem] w-[7.5rem] shrink-0 sm:h-32 sm:w-32">
                                    <div
                                        className="absolute inset-0 scale-[1.08] rounded-full bg-gradient-to-br from-[#4FB0E3]/30 to-transparent opacity-70 blur-xl transition-opacity group-hover:opacity-100"
                                        aria-hidden
                                    />
                                    <div className="relative h-full w-full overflow-hidden rounded-full border-[3px] border-[#4FB0E3]/50 shadow-[0_0_0_1px_rgba(79,176,227,0.15),0_8px_32px_rgba(0,0,0,0.4)] ring-4 ring-[#4FB0E3]/10">
                                        <img
                                            src={item.member?.photo || `/images/members/${item.name}.jpg`}
                                            alt={item.name}
                                            className="h-full w-full object-cover"
                                            style={{
                                                objectPosition: resolveMemberPhotoObjectPosition(item.member?.photoPosition),
                                            }}
                                            onError={(e) => {
                                                e.currentTarget.src = '/images/assets/logo/白色正方形logo.png';
                                            }}
                                        />
                                    </div>
                                </div>
                                <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#94a3b8]">
                                    {item.title}
                                </p>
                                <p className="mb-2 text-2xl font-black tracking-tight text-[#4FB0E3] sm:text-[1.65rem]">{item.name}</p>
                                <p className="text-sm font-medium text-white/90">{item.industry}</p>
                            </div>

                            {/* 聯絡區：左對齊、固定間距，避免擠成一團 */}
                            <div className="mt-auto flex flex-1 flex-col border-t border-white/10 pt-6">
                                <p className="mb-5 text-center text-sm font-medium leading-relaxed text-white/95">
                                    {item.company}
                                </p>

                                <div className="space-y-3.5">
                                    <a
                                        href={`tel:${formatTaiwanPhoneTelHref(item.phone)}`}
                                        onClick={(e) => e.stopPropagation()}
                                        onKeyDown={(e) => e.stopPropagation()}
                                        className="flex items-start gap-3 rounded-lg px-1 py-1 text-gray-200 transition-colors hover:bg-white/5 hover:text-[#7dd3fc]"
                                    >
                                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#4FB0E3]/12 text-[#4FB0E3]">
                                            <Phone size={18} strokeWidth={2} aria-hidden />
                                        </span>
                                        <span className="min-w-0 pt-1.5 text-[15px] font-medium tabular-nums tracking-wide">
                                            {item.phone}
                                        </span>
                                    </a>
                                    {item.email ? (
                                        <a
                                            href={`mailto:${item.email}`}
                                            onClick={(e) => e.stopPropagation()}
                                            onKeyDown={(e) => e.stopPropagation()}
                                            className="flex items-start gap-3 rounded-lg px-1 py-1 text-gray-200 transition-colors hover:bg-white/5 hover:text-[#7dd3fc]"
                                        >
                                            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#4FB0E3]/12 text-[#4FB0E3]">
                                                <Mail size={18} strokeWidth={2} aria-hidden />
                                            </span>
                                            <span className="min-w-0 break-words pt-1.5 text-[13px] leading-snug sm:text-sm">
                                                {item.email}
                                            </span>
                                        </a>
                                    ) : (
                                        <p className="pl-1 text-xs text-gray-500">聯絡請優先使用電話</p>
                                    )}
                                </div>
                            </div>
                        </motion.article>
                    );
                    })}
                </div>
            </div>

            <MemberDetailModal member={detailMember} open={detailMember !== null} onClose={() => setDetailMember(null)} />
        </section>
    );
};

export default Contact;
