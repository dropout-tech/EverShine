import { cn } from '../../lib/cn';

export interface TopProgressBarProps {
    /** 是否顯示頂部進度條 */
    active?: boolean;
    className?: string;
}

/**
 * 類似 YouTube 的頂部細線進度條；以 active 控制顯示（CSS 無限滑動，無需 interval）。
 */
export function TopProgressBar({ active = false, className }: TopProgressBarProps) {
    if (!active) return null;

    return (
        <div
            className={cn(
                'fixed top-0 left-0 right-0 z-[10000] h-[3px] pointer-events-none overflow-hidden bg-white/10',
                className
            )}
            role="progressbar"
            aria-busy="true"
            aria-label="載入中"
        >
            <div
                className={cn(
                    'h-full w-1/3 bg-gradient-to-r from-primary-light via-primary to-primary-dark',
                    'shadow-[0_0_12px_rgba(76,168,223,0.8)]',
                    'animate-[top-progress-slide_1.1s_ease-in-out_infinite]'
                )}
            />
            <style>{`
                @keyframes top-progress-slide {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(400%); }
                }
            `}</style>
        </div>
    );
}
