import { TopProgressBar } from './TopProgressBar';
import { CardSkeleton } from './CardSkeleton';

/** 路由 lazy chunk 載入時：頂部進度條 + 卡片骨架 */
export function RouteFallback() {
    return (
        <>
            <TopProgressBar active />
            <div className="min-h-[50dvh] pt-28 flex flex-col items-center justify-center px-4">
                <CardSkeleton className="w-full max-w-lg" />
            </div>
        </>
    );
}
