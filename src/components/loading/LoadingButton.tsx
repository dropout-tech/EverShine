import { Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    loadingLabel?: string;
    children: ReactNode;
}

/**
 * 點擊後進入載入狀態、防止重複提交。
 */
export function LoadingButton({
    isLoading = false,
    loadingLabel = '處理中…',
    children,
    className,
    disabled,
    type = 'button',
    ...rest
}: LoadingButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            className={cn(
                'inline-flex items-center justify-center gap-2 font-bold rounded-lg transition-opacity',
                (disabled || isLoading) && 'opacity-70 cursor-not-allowed',
                className
            )}
            aria-busy={isLoading}
            {...rest}
        >
            {isLoading ? (
                <>
                    <Loader2 className="h-5 w-5 shrink-0 animate-spin" aria-hidden />
                    <span>{loadingLabel}</span>
                </>
            ) : (
                children
            )}
        </button>
    );
}
