import { SkeletonBlock } from './skeleton-primitives';
import { cn } from '../../lib/cn';

export interface CardSkeletonProps {
    isLoading?: boolean;
    className?: string;
}

export function CardSkeleton({ isLoading = true, className }: CardSkeletonProps) {
    if (!isLoading) return null;

    return (
        <div
            className={cn(
                'rounded-2xl border border-white/10 bg-bg-dark/50 p-4 overflow-hidden',
                className
            )}
            aria-busy
            aria-label="載入中"
        >
            <SkeletonBlock className="aspect-[16/10] w-full rounded-xl mb-4" />
            <SkeletonBlock className="h-5 w-2/5 rounded mb-3" />
            <SkeletonBlock className="h-3 w-full rounded mb-2" />
            <SkeletonBlock className="h-3 w-[92%] rounded mb-2" />
            <SkeletonBlock className="h-3 w-[78%] rounded" />
        </div>
    );
}
