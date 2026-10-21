import { SkeletonBlock } from './skeleton-primitives';
import { cn } from '../../lib/cn';

export interface MainLayoutSkeletonProps {
    isLoading?: boolean;
    className?: string;
}

/**
 * 主版面骨架：頂部導覽 + 左側欄 + 主內容，高度與實際後台版面接近以降低 CLS。
 */
export function MainLayoutSkeleton({ isLoading = true, className }: MainLayoutSkeletonProps) {
    if (!isLoading) return null;

    return (
        <div
            className={cn(
                'min-h-dvh w-full bg-bg-dark/95 pt-20 md:pt-24',
                className
            )}
            aria-busy
            aria-label="載入中"
        >
            {/* Navbar strip */}
            <div className="fixed top-0 left-0 right-0 z-40 h-16 border-b border-white/10 bg-bg-dark/90 backdrop-blur-md px-4 flex items-center gap-4">
                <SkeletonBlock className="h-9 w-9 rounded-lg shrink-0" />
                <SkeletonBlock className="h-5 w-32 md:w-48 rounded" />
                <div className="flex-1" />
                <SkeletonBlock className="h-8 w-24 rounded-full hidden sm:block" />
            </div>

            <div className="container mx-auto px-4 flex gap-4 pt-6 pb-24">
                {/* Sidebar */}
                <aside className="hidden md:flex w-52 shrink-0 flex-col gap-3">
                    {[0, 1, 2, 3].map((i) => (
                        <SkeletonBlock key={i} className="h-10 w-full rounded-lg" />
                    ))}
                </aside>

                {/* Main */}
                <main className="flex-1 min-w-0 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                        <SkeletonBlock className="h-8 w-48 rounded-lg" />
                        <SkeletonBlock className="h-10 w-full sm:w-64 rounded-lg" />
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                        {[0, 1, 2, 3].map((i) => (
                            <SkeletonBlock key={i} className="h-28 rounded-2xl" />
                        ))}
                    </div>
                    <SkeletonBlock className="h-64 w-full rounded-2xl" />
                </main>
            </div>
        </div>
    );
}
