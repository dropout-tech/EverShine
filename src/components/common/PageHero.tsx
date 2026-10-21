import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface PageHeroProps {
    /** 大標（僅一行主標題，語意為頁面唯一 h1） */
    title: React.ReactNode;
    /** 小標（大標下方、獨立段落，字級較小，與大標分開渲染） */
    heroTagline?: React.ReactNode;
    subtitle?: React.ReactNode;
    /** 套用在 subtitle 外層的額外 class（例如會員頁放大說明層級） */
    subtitleClassName?: string;
    /** 為 true 時在區塊底部顯示向下捲動提示（首頁用） */
    showScrollIndicator?: boolean;
    /** 列表頁用較矮的標題區，避免與下方篩選／內容重疊 */
    compact?: boolean;
    children?: React.ReactNode;
}

const PageHero: React.FC<PageHeroProps> = ({
    title,
    heroTagline,
    subtitle,
    subtitleClassName,
    showScrollIndicator,
    compact,
    children,
}) => {
    return (
        <section
            className={
                compact
                    ? 'relative z-10 flex flex-col items-center justify-center text-center pt-24 pb-10 md:pt-28 md:pb-12 overflow-hidden'
                    : 'min-h-screen flex flex-col justify-center items-center text-center relative z-10 pt-20 overflow-hidden'
            }
            aria-label="BNI 長輝白金分會台灣商會頁面標題"
        >
            {/* Hero Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url(/images/assets/background.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    willChange: 'transform',
                    imageRendering: '-webkit-optimize-contrast',
                    mixBlendMode: 'screen',
                    maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className={compact ? 'relative z-10 px-4' : 'relative z-10 px-4 mt-[-5vh] md:mt-[-10vh]'}
            >
                {/* 大標／小標分開：h1 僅大標；小標用 p，避免被讀成一個長標題 */}
                <h1
                    className={`font-black tracking-tight font-sans ${heroTagline ? 'mb-0' : 'mb-6'} ${
                        compact
                            ? 'text-2xl sm:text-4xl md:text-5xl'
                            : 'text-3xl sm:text-5xl md:text-7xl lg:text-8xl'
                    }`}
                >
                    <span className="block bg-clip-text text-transparent bg-gradient-to-b from-[#E0F2FE] via-[#7DD3FC] to-[#0284C7] drop-shadow-[0_0_15px_rgba(14,165,233,0.6)] px-2">
                        {title}
                    </span>
                </h1>
                {heroTagline && (
                    <p className="mt-3 md:mt-5 mb-6 text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-[#bae6fd] to-[#38bdf8] drop-shadow-[0_0_12px_rgba(56,189,248,0.45)] max-w-[95vw] leading-tight px-2 mx-auto">
                        {heroTagline}
                    </p>
                )}
                {subtitle && (
                    <div
                        className={`text-gray-200 max-w-3xl mx-auto leading-relaxed font-light ${
                            compact ? 'text-sm md:text-lg mt-3 mb-0' : 'text-base md:text-2xl'
                        } ${subtitleClassName || ''}`}
                    >
                        {subtitle}
                    </div>
                )}
                {children}
                {showScrollIndicator && (
                    <motion.div
                        className="mt-10 flex justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, 6, 0] }}
                        transition={{ opacity: { delay: 1 }, y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } }}
                        aria-hidden
                    >
                        <ChevronDown className="w-8 h-8 text-primary/80" strokeWidth={2} />
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
};

export default PageHero;
