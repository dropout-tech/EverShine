import React, { useEffect, useState } from 'react';
import { siteConfig } from '../../config/site.config';
import { resolveMemberPhotoUrl } from '../../lib/memberPhotoUrl';
import { resolveMemberPhotoObjectPosition } from '../../lib/memberPhotoPosition';

interface ReferralAvatarProps {
    name: string;
    photo: string;
    photoPosition?: string;
    borderClassName: string;
    ringClassName: string;
    /** lg：引薦卡主人臉；md 保留給其他較小場合 */
    size?: 'sm' | 'md' | 'lg';
}

const SIZE_CLASS = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-24 w-24 sm:h-28 sm:w-28 lg:h-[5.5rem] lg:w-[5.5rem] xl:h-28 xl:w-28',
} as const;

/** 引薦案例頭像：無照片或載入失敗時顯示長輝預設 logo */
const ReferralAvatar: React.FC<ReferralAvatarProps> = ({
    name,
    photo,
    photoPosition,
    borderClassName,
    ringClassName,
    size = 'md',
}) => {
    const [src, setSrc] = useState(() => resolveMemberPhotoUrl(photo));

    useEffect(() => {
        setSrc(resolveMemberPhotoUrl(photo));
    }, [photo]);

    return (
        <div
            data-testid="referral-avatar"
            className={`${SIZE_CLASS[size]} rounded-full overflow-hidden border ${borderClassName} ring-2 ${ringClassName} bg-slate-900 shadow-[0_10px_28px_rgba(0,0,0,0.4)]`}
        >
            <img
                src={src}
                alt={name}
                className="h-full w-full object-cover"
                style={{ objectPosition: resolveMemberPhotoObjectPosition(photoPosition) }}
                onError={() => setSrc(siteConfig.defaultPhoto)}
            />
        </div>
    );
};

export default ReferralAvatar;
