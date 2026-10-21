import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ExternalLink } from 'lucide-react';
import type { Member } from '../../types';
import { siteConfig } from '../../config/site.config';
import MemberDetailBody from './MemberDetailBody';
import { buildMemberSlug } from '../../lib/memberSlug';

const MemberDetailModal: React.FC<{
    member: Member | null;
    open: boolean;
    onClose: () => void;
}> = ({ member, open, onClose }) => {
    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        },
        [onClose]
    );

    useEffect(() => {
        if (!open) return;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [open, onKeyDown]);

    const logoSrc = siteConfig.logos.horizontal;

    if (!open || !member) return null;

    const m = member;
    const slug = buildMemberSlug(m);

    return createPortal(
        <AnimatePresence mode="wait">
            {open && member ? (
                <div className="fixed inset-0 z-[10050] flex items-end justify-center sm:items-center sm:p-4">
                    <motion.button
                        type="button"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        aria-label="關閉"
                        onClick={onClose}
                    />
                    <motion.div
                        key={String(m.id)}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="member-detail-title"
                        initial={{ opacity: 0, scale: 0.96, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 8 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10 flex max-h-[100dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl border border-white/10 bg-slate-950/90 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_32px_80px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:max-h-[92vh] sm:rounded-2xl"
                    >
                        {/* 防偽浮水印 */}
                        <div
                            className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl"
                            aria-hidden
                        >
                            <img
                                src={siteConfig.logos.square}
                                alt=""
                                className="max-h-[min(95vw,580px)] w-auto opacity-[0.02] grayscale contrast-125"
                            />
                        </div>

                        <div
                            className="pointer-events-none absolute inset-0 opacity-[0.08]"
                            style={{
                                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59,130,246,0.12) 1px, transparent 0)`,
                                backgroundSize: '26px 26px',
                            }}
                            aria-hidden
                        />

                        {/* Header：右上角 LOGO + 「分享頁面」連結 + 關閉 */}
                        <div className="relative z-20 shrink-0 px-5 pb-2 pt-5 sm:px-8 sm:pt-6">
                            <h2 id="member-detail-title" className="sr-only">
                                {m.name} — 會員檔案
                            </h2>

                            <button
                                type="button"
                                onClick={onClose}
                                className="absolute right-4 top-4 z-30 rounded-xl p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white sm:right-6 sm:top-5"
                                aria-label="關閉"
                            >
                                <X size={22} />
                            </button>

                            <div className="flex items-end justify-between gap-3 pr-12 sm:pr-14">
                                <Link
                                    to={`/member/${slug}`}
                                    onClick={onClose}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-sky-100 transition-colors hover:border-sky-300/50 hover:bg-sky-500/20 sm:text-xs"
                                    aria-label="開啟此會員的獨立頁面"
                                    title="獨立頁面（可分享）"
                                >
                                    <ExternalLink size={13} />
                                    獨立頁面
                                </Link>

                                <img
                                    src={logoSrc}
                                    alt="BNI 長輝白金分會"
                                    className="h-8 w-auto max-w-[min(60vw,260px)] object-contain object-right opacity-80 drop-shadow-[0_0_16px_rgba(59,130,246,0.25)]"
                                />
                            </div>
                        </div>

                        <div className="relative z-10 min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-4 pb-5 pt-1 sm:px-8 sm:pb-8 sm:pt-2">
                            <MemberDetailBody member={m} />
                        </div>

                        <div className="relative z-10 shrink-0 border-t border-white/10 bg-slate-950/95 p-3 sm:hidden">
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 py-3 text-sm font-bold tracking-wide text-white"
                            >
                                關閉
                            </button>
                        </div>
                    </motion.div>
                </div>
            ) : null}
        </AnimatePresence>,
        document.body
    );
};

export default MemberDetailModal;
