import React, { useState } from 'react';
import type { Referral } from '../../types';
import { ArrowRight, Quote } from 'lucide-react';
import { memberPhotoFallback, memberPhotoSrc } from '../../lib/memberPhoto';

const PersonAvatar: React.FC<{ name: string, photo: string, industry: string, isReferee?: boolean }> = ({ name, photo, industry, isReferee }) => {
    const [imgSrc, setImgSrc] = useState(() => memberPhotoSrc(photo, 'thumb'));

    return (
        <div className="flex flex-col items-center text-center">
            <div className={`w-14 h-14 rounded-full p-0.5 overflow-hidden mb-2 ${isReferee ? 'border-2 border-[#c5a47e] shadow-[0_0_10px_rgba(197,164,126,0.3)]' : 'border border-[#c5a47e]/40'}`}>
                <img
                    src={imgSrc}
                    alt={name}
                    className="w-full h-full rounded-full object-cover bg-[#06203a]"
                    width={56}
                    height={56}
                    loading="lazy"
                    decoding="async"
                    onError={() => setImgSrc(memberPhotoFallback(imgSrc, photo))}
                />
            </div>
            <div className="text-sm font-bold text-white truncate max-w-[80px]">{name}</div>
            <div className="text-xs text-gray-500 truncate max-w-[80px]">{industry}</div>
        </div>
    );
}

const ReferralCard: React.FC<{ referral: Referral }> = ({ referral }) => {
    return (
        <div className="bg-[rgba(6,32,58,0.6)] backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-[#c5a47e]/50 transition-all duration-300 group h-full flex flex-col">
            <div className="flex flex-col md:flex-row gap-6 flex-1">
                {/* Left: Content */}
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-[#c5a47e]/10 text-[#c5a47e] text-xs font-bold rounded-full uppercase tracking-wider border border-[#c5a47e]/20">
                            {referral.metrics.type}
                        </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#c5a47e] transition-colors">{referral.title}</h3>

                    <div className="relative pl-6 mb-4 flex-1">
                        <Quote className="absolute left-0 top-0 text-[#c5a47e]/30" size={20} />
                        <p className="text-gray-300 text-sm leading-relaxed italic line-clamp-4">
                            "{referral.description}"
                        </p>
                    </div>

                    <div className="flex items-baseline gap-2 mt-auto pt-4 border-t border-white/5">
                        <span className="text-gray-400 text-sm">成交金額</span>
                        <span className="text-xl font-bold text-[#c5a47e] font-mono">
                            {referral.metrics.amount}
                        </span>
                    </div>
                </div>

                {/* Right: People */}
                <div className="flex items-center justify-between md:justify-center md:gap-4 md:w-auto border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 bg-white/5 md:bg-transparent rounded-xl md:rounded-none p-4 md:p-0">
                    <PersonAvatar
                        name={referral.referrer.name}
                        photo={referral.referrer.photo}
                        industry={referral.referrer.industry}
                    />

                    <div className="text-[#c5a47e]/50 flex flex-col items-center">
                        <span className="text-[10px] mb-1">引薦</span>
                        <ArrowRight size={20} />
                    </div>

                    <PersonAvatar
                        name={referral.referee.name}
                        photo={referral.referee.photo}
                        industry={referral.referee.industry}
                        isReferee
                    />
                </div>
            </div>
        </div>
    );
};

export default ReferralCard;
