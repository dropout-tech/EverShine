import { SkeletonBlock } from './skeleton-primitives';
import { cn } from '../../lib/cn';

export interface ModalContentSkeletonProps {
    isLoading?: boolean;
    className?: string;
}

/** 彈窗內容載入骨架，避免開啟後內容瞬間跳出 */
export function ModalContentSkeleton({ isLoading = true, className }: ModalContentSkeletonProps) {
    if (!isLoading) return null;

    return (
        <div className={cn('space-y-5 p-1', className)} aria-busy aria-label="載入中">
            <div className="flex items-start gap-3">
                <SkeletonBlock className="h-12 w-12 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                    <SkeletonBlock className="h-5 w-1/2 rounded" />
                    <SkeletonBlock className="h-3 w-1/3 rounded opacity-70" />
                </div>
            </div>
            <SkeletonBlock className="h-px w-full rounded opacity-40" />
            <div className="space-y-2">
                <SkeletonBlock className="h-3 w-full rounded" />
                <SkeletonBlock className="h-3 w-[94%] rounded" />
                <SkeletonBlock className="h-3 w-[88%] rounded" />
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
                <SkeletonBlock className="h-10 rounded-lg" />
                <SkeletonBlock className="h-10 rounded-lg" />
            </div>
        </div>
    );
}
