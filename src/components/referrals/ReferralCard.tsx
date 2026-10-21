import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { Referral } from '../../types';
import { getReferralEcosystem } from '../../lib/referralFilter';
import ReferralPeoplePair from './ReferralPeoplePair';

interface ReferralCardProps {
    referral: Referral;
    isSelected: boolean;
    onToggle: () => void;
    index: number;
}

const ReferralCard: React.FC<ReferralCardProps> = ({
    referral,
    isSelected,
    onToggle,
    index,
}) => {
    const ecosystem = getReferralEcosystem(referral);
    const showMetricsType =
        Boolean(referral.metrics.type) &&
        referral.metrics.type !== referral.title &&
        referral.metrics.type !== ecosystem;
    const hasStories = Boolean(referral.referrer?.story || referral.referee?.story);

    const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onToggle();
        }
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(index * 0.04, 0.32), duration: 0.4 }}
            onClick={onToggle}
            onKeyDown={onKeyDown}
            role="button"
            tabIndex={0}
            aria-expanded={isSelected}
            className={`min-w-0 bg-bg-dark/60 backdrop-blur-md border rounded-2xl overflow-hidden transition-colors duration-300 flex flex-col cursor-pointer h-full ${
                isSelected
                    ? 'border-primary ring-1 ring-primary shadow-[0_8px_30px_rgba(59,130,246,0.15)]'
                    : 'border-white/10 hover:border-primary/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
            }`}
        >
            <div className="h-1.5 bg-gradient-to-r from-primary-light via-primary to-primary-dark" />

            <div className="p-4 sm:p-5 flex-grow flex flex-col">
                <ReferralPeoplePair referrer={referral.referrer} referee={referral.referee} />

                <h3
                    className={`mt-4 text-center text-[1.05rem] sm:text-lg font-bold transition-colors leading-snug ${
                        isSelected ? 'text-primary' : 'text-white'
                    }`}
                >
                    {referral.title}
                </h3>

                <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5">
                    <span className="inline-block text-[10px] font-medium text-primary/90 bg-primary/10 border border-primary/20 rounded-full px-2.5 py-0.5 max-w-full">
                        {ecosystem}
                    </span>
                    <span className="inline-block text-[10px] font-bold text-white bg-primary/20 border border-primary/30 rounded-full px-2.5 py-0.5 max-w-full">
                        {referral.metrics.amount}
                    </span>
                    {showMetricsType && (
                        <span className="inline-block text-[10px] text-gray-300 bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5 max-w-full line-clamp-1">
                            {referral.metrics.type}
                        </span>
                    )}
                </div>

                <p className={`mt-3 text-gray-300 text-sm leading-relaxed text-center ${isSelected ? '' : 'line-clamp-3'}`}>
                    {referral.description}
                </p>

                {isSelected && hasStories && (
                    <div className="mt-4 space-y-3 text-left">
                        {referral.referrer?.story && (
                            <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-primary/80 mb-1.5">
                                    引薦人真心話
                                </div>
                                <p className="text-gray-200 text-sm leading-relaxed italic">
                                    「{referral.referrer.story}」
                                </p>
                                <div className="mt-2 text-right text-xs text-primary/70">— {referral.referrer.name}</div>
                            </div>
                        )}
                        {referral.referee?.story && (
                            <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/5 p-3.5">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-200/80 mb-1.5">
                                    被引薦人回饋
                                </div>
                                <p className="text-gray-200 text-sm leading-relaxed">
                                    {referral.referee.story}
                                </p>
                                <div className="mt-2 text-right text-xs text-cyan-200/70">— {referral.referee.name}</div>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-auto pt-4 flex items-center justify-center gap-1 text-[11px] text-gray-500">
                    <span>{isSelected ? '點擊收合' : '點擊展開完整故事'}</span>
                    <ChevronDown
                        size={12}
                        className={`transition-transform ${isSelected ? 'rotate-180' : ''}`}
                        aria-hidden
                    />
                </div>
            </div>
        </motion.article>
    );
};

export default ReferralCard;
