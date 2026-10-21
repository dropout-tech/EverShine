import type { CSSProperties } from 'react';
import { cn } from '../../lib/cn';

/** 共用閃爍底塊 */
export function SkeletonBlock({
    className,
    style,
}: {
    className?: string;
    style?: CSSProperties;
}) {
    return (
        <div
            className={cn('animate-pulse rounded-md bg-white/10', className)}
            style={style}
            aria-hidden
        />
    );
}
