import { useState, type ImgHTMLAttributes } from 'react';
import { ImageIcon } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    /** 載入中佔位用漸層，預設符合 evershine 深藍＋主色 */
    placeholderClassName?: string;
}

/**
 * 圖片載入完成前顯示漸層與輕量 SVG 圖示占位。
 */
export function SmartImage({
    className,
    alt = '',
    placeholderClassName,
    onLoad,
    ...rest
}: SmartImageProps) {
    const [loaded, setLoaded] = useState(false);
    const [failed, setFailed] = useState(false);

    return (
        <span className={cn('relative inline-block overflow-hidden', className)}>
            {!loaded && !failed && (
                <span
                    className={cn(
                        'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bg-dark via-[#0a2744] to-primary/20 animate-pulse',
                        placeholderClassName
                    )}
                    aria-hidden
                >
                    <svg
                        className="w-1/4 h-1/4 max-w-[80px] max-h-[80px] text-white/20"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                    >
                        <rect x="8" y="12" width="48" height="40" rx="4" stroke="currentColor" strokeWidth="2" />
                        <circle cx="24" cy="28" r="6" fill="currentColor" />
                        <path d="M8 44 L22 32 L34 40 L48 26 L56 34 V52 H8 Z" fill="currentColor" fillOpacity="0.35" />
                    </svg>
                </span>
            )}
            {failed && (
                <span
                    className="absolute inset-0 flex items-center justify-center bg-white/5 text-white/30"
                    aria-hidden
                >
                    <ImageIcon className="w-8 h-8" />
                </span>
            )}
            <img
                alt={alt}
                className={cn(
                    'relative z-10 w-full h-full object-cover transition-opacity duration-300',
                    loaded ? 'opacity-100' : 'opacity-0'
                )}
                onLoad={(e) => {
                    setLoaded(true);
                    onLoad?.(e);
                }}
                onError={() => setFailed(true)}
                {...rest}
            />
        </span>
    );
}
