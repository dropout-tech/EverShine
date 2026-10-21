import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Users, ArrowRight } from 'lucide-react';
import SEO from '../components/common/SEO';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-dvh flex items-center justify-center px-4 pt-24 pb-12 md:pt-32 relative overflow-hidden">
            <SEO title="找不到頁面" noindex />
            {/* Background gradient effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-bg-dark via-[#0a1628] to-bg-dark"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 text-center max-w-2xl"
            >
                {/* 404 Number with animation */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-8"
                >
                    <h1 className="text-[150px] md:text-[200px] font-bold leading-none">
                        <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
                            404
                        </span>
                    </h1>
                </motion.div>

                {/* Main message */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4 mb-8"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        你在找的頁面不存在
                    </h2>
                    <p className="text-xl md:text-2xl text-primary font-semibold">
                        但是你想要的商務鏈結，我們有！
                    </p>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        加入 BNI 長輝白金分會，建立真正有價值的商務連結，讓您的事業更上一層樓
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="grid grid-cols-3 gap-4 mb-10 max-w-md mx-auto"
                >
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                        <div className="text-2xl font-bold text-primary">40+</div>
                        <div className="text-xs text-gray-400">優質會員</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                        <div className="text-2xl font-bold text-primary">8</div>
                        <div className="text-xs text-gray-400">產業類別</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                        <div className="text-2xl font-bold text-primary">∞</div>
                        <div className="text-xs text-gray-400">商機無限</div>
                    </div>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link
                        to="/"
                        className="group relative px-8 py-4 bg-gradient-to-r from-primary to-accent text-bg-dark font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(197,164,126,0.5)] hover:scale-105 flex items-center gap-2"
                    >
                        <Home size={20} />
                        <span>返回首頁</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />

                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </Link>

                    <Link
                        to="/members"
                        className="px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-bg-dark transition-all duration-300 flex items-center gap-2"
                    >
                        <Users size={20} />
                        <span>認識會員</span>
                    </Link>
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 text-gray-500 text-sm"
                >
                    <p>迷路了嗎？讓我們為您指引方向 ✨</p>
                </motion.div>
            </motion.div>

            {/* Floating network nodes animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-primary/30 rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                        }}
                        animate={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default NotFound;
