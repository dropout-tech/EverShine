import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useCountUp } from '../../hooks/useCountUp';
import { FileText, TrendingUp, Users } from 'lucide-react';

const ResultsChart = lazy(() => import('./ResultsChart'));

const DeferredResultsChart: React.FC = () => {
    const holderRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const holder = holderRef.current;
        if (!holder) return;
        if (!('IntersectionObserver' in window)) {
            setVisible(true);
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setVisible(true);
                observer.disconnect();
            },
            { rootMargin: '240px' }
        );
        observer.observe(holder);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={holderRef} className="min-h-[280px]">
            {visible && (
                <Suspense fallback={<div className="h-[280px]" aria-hidden="true" />}>
                    <ResultsChart />
                </Suspense>
            )}
        </div>
    );
};

const MetricCard: React.FC<{ icon: React.ReactNode, value: number, suffix: string, label: string, subtext?: string, isCurrency?: boolean }> = ({ icon, value, suffix, label, subtext, isCurrency }) => {
    const { count, elementRef } = useCountUp(value);

    return (
        <div ref={elementRef} className="bg-bg-dark/60 backdrop-blur-md border border-primary/20 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center hover:-translate-y-2 transition-transform duration-300">
            <div className="text-primary mb-6 p-4 bg-primary/10 rounded-full">
                {icon}
            </div>
            <div className="text-4xl lg:text-5xl font-bold text-white mb-2 font-mono tabular-nums">
                {isCurrency ? (count / 100).toFixed(1) : count.toLocaleString()}
                <span className="text-2xl ml-1 text-gray-400 font-sans">{suffix}</span>
            </div>
            <div className="text-gray-300 font-medium text-lg uppercase tracking-wide mt-2">{label}</div>
            {subtext && <div className="text-sm text-gray-500 mt-2">{subtext}</div>}
        </div>
    );
};

const Results: React.FC = () => {
    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">台灣商會引薦成果</h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4"></div>
                    <p className="text-gray-300 text-base">
                        創會以來 - 資料更新時間：2026/01/13
                    </p>
                </div>

                <div className="mb-20">
                    <DeferredResultsChart />
                </div>

                {/* Metrics Grid - Vertical Stack on Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 px-4">
                    <div className="w-full">
                        <MetricCard
                            icon={<FileText size={40} />}
                            value={26459}
                            suffix="張"
                            label="總引薦單數"
                        />
                    </div>
                    <div className="w-full">
                        <MetricCard
                            icon={<TrendingUp size={40} />}
                            value={629} // 6.29億
                            suffix="億+"
                            label="總交易價值 (TWD)"
                            subtext="NT$ 629,007,136"
                            isCurrency
                        />
                    </div>
                    <div className="w-full h-full">
                        <div className="bg-bg-dark/60 backdrop-blur-md border border-primary/20 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center hover:-translate-y-2 transition-transform duration-300 text-center h-full">
                            <div className="text-primary mb-6 p-4 bg-primary/10 rounded-full">
                                <Users size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">邀請來賓參與</h3>
                            <p className="text-gray-400 mb-6 text-base">誠摯邀請您前來體驗我們的聚會。</p>
                            <a href="#contact" className="inline-block px-6 py-2 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-colors shadow-md text-sm">
                                聯繫我們
                            </a>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
};

export default Results;
