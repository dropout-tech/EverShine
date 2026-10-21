import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { ReferralPerson } from '../../types';
import ReferralAvatar from './ReferralAvatar';

interface ReferralPeoplePairProps {
    referrer: ReferralPerson;
    referee: ReferralPerson;
}

const PersonBlock: React.FC<{
    person: ReferralPerson;
    borderClassName: string;
    ringClassName: string;
    roleLabel: string;
}> = ({ person, borderClassName, ringClassName, roleLabel }) => (
    <div className="flex min-w-0 flex-1 flex-col items-center text-center">
        <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">
            {roleLabel}
        </span>
        <ReferralAvatar
            name={person.name}
            photo={person.photo}
            photoPosition={person.photoPosition}
            borderClassName={borderClassName}
            ringClassName={ringClassName}
            size="lg"
        />
        <div className="mt-2.5 w-full px-0.5 font-bold text-sm sm:text-base text-white leading-tight break-words">
            {person.name}
        </div>
        {person.industry ? (
            <div className="mt-0.5 w-full px-0.5 text-[11px] sm:text-xs text-gray-400 line-clamp-2 leading-snug">
                {person.industry}
            </div>
        ) : null}
    </div>
);

/** 引薦卡主視覺：誰把信任交給誰 */
const ReferralPeoplePair: React.FC<ReferralPeoplePairProps> = ({ referrer, referee }) => {
    return (
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1 sm:gap-2">
            <PersonBlock
                person={referrer}
                roleLabel="引薦人"
                borderClassName="border-primary/50"
                ringClassName="ring-primary/20"
            />

            <div className="flex flex-col items-center justify-center px-1 pt-5" aria-hidden>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-primary shadow-[0_0_18px_rgba(56,189,248,0.25)] sm:h-11 sm:w-11">
                    <ArrowRight size={18} strokeWidth={2.4} />
                </div>
                <span className="mt-1 text-[10px] font-bold tracking-widest text-primary/90">引薦</span>
            </div>

            <PersonBlock
                person={referee}
                roleLabel="被引薦人"
                borderClassName="border-cyan-300/50"
                ringClassName="ring-cyan-300/20"
            />
        </div>
    );
};

export default ReferralPeoplePair;
