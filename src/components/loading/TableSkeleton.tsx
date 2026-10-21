import { SkeletonBlock } from './skeleton-primitives';
import { cn } from '../../lib/cn';

export interface TableSkeletonProps {
    isLoading?: boolean;
    columns?: number;
    rows?: number;
    className?: string;
}

export function TableSkeleton({
    isLoading = true,
    columns = 5,
    rows = 5,
    className,
}: TableSkeletonProps) {
    if (!isLoading) return null;

    return (
        <div
            className={cn('w-full overflow-x-auto rounded-xl border border-white/10', className)}
            aria-busy
            aria-label="載入中"
        >
            <table className="w-full text-left border-collapse min-w-[480px]">
                <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                        {Array.from({ length: columns }).map((_, c) => (
                            <th key={`h-${c}`} className="p-3">
                                <SkeletonBlock className="h-3 w-16 rounded" />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, r) => (
                        <tr key={`row-${r}`} className="border-b border-white/5 last:border-b-0">
                            {Array.from({ length: columns }).map((_, c) => (
                                <td key={`cell-${r}-${c}`} className="p-3 align-middle">
                                    <SkeletonBlock
                                        className="h-3 rounded opacity-90"
                                        style={{
                                            width: `${68 + ((r * columns + c) % 5) * 6}%`,
                                        }}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
