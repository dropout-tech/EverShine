import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface CategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onSelect: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, activeCategory, onSelect }) => {
    return (
        <div className="flex w-full items-center gap-3 overflow-x-auto md:overflow-visible no-scrollbar pb-2 md:pb-0 px-4 md:px-0 -mx-4 md:mx-auto md:flex-wrap md:justify-center max-w-4xl mb-8 md:mb-12 mask-linear-gradient md:mask-none">
            {/* Mobile Hint */}
            <div className="md:hidden absolute right-4 text-gray-500 text-xs animate-pulse pointer-events-none">
                →
            </div>
            {categories.map(cat => (
                <motion.button
                    key={cat}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelect(cat)}
                    className={clsx(
                        "rounded-full border transition-all duration-300 backdrop-blur-sm whitespace-nowrap shrink-0",
                        "px-3.5 py-1.5 text-sm sm:px-5 sm:py-2 sm:text-base",
                        activeCategory === cat
                            ? "bg-primary text-bg-dark border-primary font-bold shadow-[0_0_15px_rgba(76,168,223,0.3)]"
                            : "bg-white/5 text-gray-300 border-white/10 hover:border-primary hover:text-primary"
                    )}
                >
                    {cat}
                </motion.button>
            ))}
        </div>
    );
};

export default CategoryFilter;
