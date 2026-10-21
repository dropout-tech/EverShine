import React from 'react';
import { Crown } from 'lucide-react';
import { getGoldMedalLabel, type GoldMedalCount } from '../../lib/goldMedal';

interface GoldMedalBadgeProps {
    /** 金質獎章數：1 = 單金質，2 = 雙金質 */
    count: GoldMedalCount;
    /** 圖示尺寸（px）。預設 14（卡片用），個別頁/Modal 建議傳 16～18。 */
    size?: number;
    /** 額外的 className（用於精確定位，例如 absolute / 邊距）。 */
    className?: string;
}

const crownButtonClass =
    'flex items-center justify-center rounded-full border border-amber-300/40 bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-600 text-amber-950 shadow-[0_0_12px_rgba(251,191,36,0.5)]';

/**
 * 金質獎章徽章（王冠）：單金質一枚、雙金質兩枚疊放；hover 顯示說明 tooltip。
 */
const GoldMedalBadge: React.FC<GoldMedalBadgeProps> = ({ count, size = 14, className = '' }) => {
    if (count < 1) return null;

    const label = getGoldMedalLabel(count);
    const isDouble = count >= 2;
    const shell = isDouble ? 'h-8 w-11 sm:h-9 sm:w-12' : 'h-7 w-7 sm:h-8 sm:w-8';

    return (
        <span className={`group/medal relative inline-flex shrink-0 items-center justify-center ${className}`}>
            <span
                aria-label={label}
                title={label}
                className={`relative flex ${shell} ${crownButtonClass}`}
            >
                {isDouble ? (
                    <>
                        <Crown
                            size={size - 2}
                            strokeWidth={2.4}
                            className="absolute left-1 top-1/2 -translate-y-1/2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
                        />
                        <Crown
                            size={size - 2}
                            strokeWidth={2.4}
                            className="absolute right-1 top-1/2 -translate-y-1/2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
                        />
                    </>
                ) : (
                    <Crown size={size} strokeWidth={2.4} className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]" />
                )}
            </span>

            <span
                role="tooltip"
                className="pointer-events-none absolute top-full left-1/2 z-30 mt-2 max-w-[min(16rem,70vw)] -translate-x-1/2 whitespace-normal rounded-lg border border-amber-300/30 bg-slate-950/95 px-3 py-1.5 text-center text-xs font-medium text-amber-100 opacity-0 shadow-xl backdrop-blur-md transition-opacity duration-150 group-hover/medal:opacity-100 group-focus-within/medal:opacity-100"
            >
                {label}
            </span>
        </span>
    );
};

export default GoldMedalBadge;
