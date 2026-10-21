import { SkeletonBlock } from './skeleton-primitives';
import { cn } from '../../lib/cn';

export interface ListSkeletonProps {
    isLoading?: boolean;
    /** 模擬列數，預設 8 */
    rows?: number;
    className?: string;
}

/** 寬度以索引推導，避免每次 render 隨機造成跳動 */
function rowWidthPct(index: number): string {
    const widths = [88, 72, 95, 65, 82, 91, 70, 85, 77, 93];
    return `${widths[index % widths.length]}%`;
}

export function ListSkeleton({ isLoading = true, rows = 8, className }: ListSkeletonProps) {
    if (!isLoading) return null;

    const count = Math.min(Math.max(rows, 5), 10);

    return (
        <div className={cn('space-y-3', className)} aria-busy aria-label="載入中">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                    <SkeletonBlock className="h-10 w-10 rounded-full shrink-0" />
                    <div className="flex-1 min-w-0 space-y-2">
                        <SkeletonBlock className="h-3.5 rounded" style={{ width: rowWidthPct(i) }} />
                        <SkeletonBlock className="h-3 rounded opacity-70" style={{ width: rowWidthPct(i + 3) }} />
                    </div>
                </div>
            ))}
        </div>
    );
}
