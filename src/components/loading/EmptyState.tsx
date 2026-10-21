import type { ReactNode } from 'react';
import { Inbox } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface EmptyStateProps {
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
    icon?: ReactNode;
}

export function EmptyState({
    title,
    description,
    action,
    className,
    icon,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center text-center px-6 py-16 rounded-2xl border border-dashed border-white/15 bg-white/[0.03]',
                className
            )}
        >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/25">
                {icon ?? <Inbox className="h-8 w-8" strokeWidth={1.5} />}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            {description && (
                <p className="text-sm text-gray-400 max-w-md mb-6 leading-relaxed">{description}</p>
            )}
            {action}
        </div>
    );
}
