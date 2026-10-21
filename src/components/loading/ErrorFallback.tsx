import type { ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { LoadingButton } from './LoadingButton';
import { cn } from '../../lib/cn';

export interface ErrorFallbackProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
    retryLabel?: string;
    className?: string;
    children?: ReactNode;
}

export function ErrorFallback({
    title = '載入失敗',
    message = '請檢查網路連線或稍後再試。',
    onRetry,
    retryLabel = '重新整理',
    className,
    children,
}: ErrorFallbackProps) {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center text-center px-6 py-14 rounded-2xl border border-red-500/25 bg-red-500/[0.06]',
                className
            )}
            role="alert"
        >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15 text-red-300">
                <AlertTriangle className="h-7 w-7" strokeWidth={1.75} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-300 max-w-md mb-6 leading-relaxed">{message}</p>
            {onRetry && (
                <LoadingButton
                    type="button"
                    onClick={onRetry}
                    className="bg-primary text-bg-dark px-6 py-3 hover:bg-primary/90"
                >
                    <>
                        <RefreshCw className="h-4 w-4 shrink-0" />
                        {retryLabel}
                    </>
                </LoadingButton>
            )}
            {children}
        </div>
    );
}
