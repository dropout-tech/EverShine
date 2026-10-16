import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const LoadingScreen: React.FC = () => {
    const { loading: authLoading } = useAuth();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!authLoading) {
            setVisible(false);
            return;
        }
        // 只有登入狀態真的卡住時才蓋住畫面，避免每次進站多等一秒。
        const timer = window.setTimeout(() => setVisible(true), 700);
        return () => window.clearTimeout(timer);
    }, [authLoading]);

    if (!visible) {
        return null;
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg-dark"
                >
                    {/* Animated background gradient */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(ellipse at center, #1B2735 0%, var(--color-bg-dark) 100%)'
                        }}
                    />

                    {/* Subtle star particles */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    opacity: [0.2, 0.8, 0.2],
                                    scale: [1, 1.5, 1],
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                }}
                            />
                        ))}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center gap-8">
                        {/* Logo */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative"
                        >
                            <img
                                src="/images/assets/logo/白色正方形logo.png"
                                alt="EverShine Logo"
                                className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl"
                            />

                            {/* Glow effect */}
                            <motion.div
                                className="absolute inset-0 bg-primary rounded-full blur-3xl opacity-20"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.2, 0.3, 0.2],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                            />
                        </motion.div>

                        {/* Welcome text */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-center"
                        >
                            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2 tracking-wide">
                                歡迎來到
                            </h1>
                            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wider">
                                長輝白金分會
                            </h2>
                        </motion.div>

                        {/* Loading indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex gap-2"
                        >
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-2 bg-primary rounded-full"
                                    animate={{
                                        y: [-8, 0, -8],
                                        opacity: [0.5, 1, 0.5],
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                    }}
                                />
                            ))}
                        </motion.div>
                    </div>

                    {/* Bottom decoration */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        transition={{ delay: 0.8 }}
                        className="absolute bottom-8 text-primary/50 text-sm tracking-widest"
                    >
                        BNI EVERSHINE
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
