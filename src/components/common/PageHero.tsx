import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    showScrollIndicator?: boolean;
    children?: React.ReactNode;
}

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, showScrollIndicator = false, children }) => {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center text-center relative z-10 pt-20 overflow-hidden" aria-label="BNI 長輝白金分會台灣商會頁面標題">
            {/* Hero Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url(/images/assets/background.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    mixBlendMode: 'screen',
                    maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="relative z-10 px-4 mt-[-5vh] md:mt-[-10vh]"
            >
                <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight font-sans">
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#E0F2FE] via-[#7DD3FC] to-[#0284C7] drop-shadow-[0_0_15px_rgba(14,165,233,0.6)]">
                        {title}
                    </span>
                </h1>
                {subtitle && (
                    <div className="text-base md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
                        {subtitle}
                    </div>
                )}
                {children}
            </motion.div>
        </section>
    );
};

export default PageHero;
