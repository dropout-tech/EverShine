import React, { useRef, useState, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import { fetchHomepageStatsForChart, type HomepageStatsRow } from '../../api/dashboard';
import { queryKeys } from '../../api/queryKeys';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

/** 後備假資料：DB 撈不到時才用，確保前台不會出現空白圖 */
const FALLBACK_ROWS: HomepageStatsRow[] = [
    { month: '2025-05', referral_count: 631, referral_value: 15606645, guest_count: 15 },
    { month: '2025-06', referral_count: 456,  referral_value: 2144319, guest_count: 21 },
    { month: '2025-07', referral_count: 590,  referral_value: 9160680, guest_count: 17 },
    { month: '2025-08', referral_count: 515, referral_value: 11098799, guest_count:  9 },
    { month: '2025-09', referral_count: 485,  referral_value: 2695123, guest_count: 10 },
    { month: '2025-10', referral_count: 613, referral_value: 11050631, guest_count: 16 },
    { month: '2025-11', referral_count: 441,  referral_value: 6894708, guest_count: 29 },
    { month: '2025-12', referral_count: 578, referral_value: 28846258, guest_count: 24 },
];

/** 'YYYY-MM' → 顯示用「5月」（同年內）或「2025/05」（跨年時自動帶年） */
function formatMonthLabels(rows: HomepageStatsRow[]): string[] {
    const years = new Set(rows.map((r) => r.month.slice(0, 4)));
    const crossYear = years.size > 1;
    return rows.map((r) => {
        if (!/^\d{4}-\d{2}$/.test(r.month)) return r.month;
        const [y, m] = r.month.split('-');
        if (crossYear) return `${y.slice(2)}/${parseInt(m, 10)}月`;
        return `${parseInt(m, 10)}月`;
    });
}

const ResultsChart: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chartRef = useRef<any>(null);
    const [activeTab, setActiveTab] = useState<'referrals' | 'amounts' | 'guests'>('referrals');

    const { data: rowsRaw, isLoading } = useQuery({
        queryKey: queryKeys.homepageStats.chart,
        queryFn: () => fetchHomepageStatsForChart(12),
        staleTime: 5 * 60_000,
    });

    const rows = useMemo<HomepageStatsRow[]>(() => {
        const fromDb = rowsRaw && rowsRaw.length > 0 ? rowsRaw : null;
        return fromDb ?? FALLBACK_ROWS;
    }, [rowsRaw]);

    const labels = useMemo(() => formatMonthLabels(rows), [rows]);
    const referrals = useMemo(() => rows.map((r) => r.referral_count), [rows]);
    const amounts = useMemo(() => rows.map((r) => r.referral_value), [rows]);
    const guests = useMemo(() => rows.map((r) => r.guest_count), [rows]);

    const createGradient = (ctx: CanvasRenderingContext2D, color: string) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, color.replace('1)', '0.4)'));
        gradient.addColorStop(1, color.replace('1)', '0.05)'));
        return gradient;
    };

    const getChartData = () => {
        const canvas = chartRef.current?.canvas;
        const ctx = canvas?.getContext('2d');
        let gradient;

        if (ctx) {
            switch (activeTab) {
                case 'referrals':
                    gradient = createGradient(ctx, 'rgba(76, 168, 223, 1)');
                    break;
                case 'amounts':
                    gradient = createGradient(ctx, 'rgba(135, 206, 250, 1)');
                    break;
                case 'guests':
                    gradient = createGradient(ctx, 'rgba(100, 149, 237, 1)');
                    break;
            }
        }

        switch (activeTab) {
            case 'referrals':
                return {
                    labels,
                    datasets: [{
                        label: '引薦單數',
                        data: referrals,
                        borderColor: '#4CA8DF',
                        backgroundColor: gradient || 'rgba(76, 168, 223, 0.4)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#4CA8DF',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                    }]
                };
            case 'amounts':
                return {
                    labels,
                    datasets: [{
                        label: '引薦金額 (萬)',
                        data: amounts.map(v => Math.round(v / 10000)),
                        borderColor: '#87CEFA',
                        backgroundColor: gradient || 'rgba(135, 206, 250, 0.4)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#87CEFA',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                    }]
                };
            case 'guests':
                return {
                    labels,
                    datasets: [{
                        label: '來賓人數',
                        data: guests,
                        borderColor: '#6495ED',
                        backgroundColor: gradient || 'rgba(100, 149, 237, 0.4)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#6495ED',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                    }]
                };
        }
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(5, 5, 5, 0.9)',
                titleColor: '#4CA8DF',
                bodyColor: '#f4f9ff',
                borderColor: '#4CA8DF',
                borderWidth: 1,
                padding: 12,
                displayColors: true,
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(76, 168, 223, 0.1)',
                },
                ticks: {
                    color: '#f4f9ff',
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(76, 168, 223, 0.1)',
                },
                ticks: {
                    color: '#4CA8DF',
                }
            }
        },
        animation: {
            duration: 1000,
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-bg-dark/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
                <button
                    onClick={() => setActiveTab('referrals')}
                    className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${activeTab === 'referrals'
                        ? 'bg-primary text-bg-dark shadow-[0_0_20px_rgba(76,168,223,0.4)]'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                >
                    引薦單數
                </button>
                <button
                    onClick={() => setActiveTab('amounts')}
                    className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${activeTab === 'amounts'
                        ? 'bg-primary text-bg-dark shadow-[0_0_20px_rgba(76,168,223,0.4)]'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                >
                    引薦金額
                </button>
                <button
                    onClick={() => setActiveTab('guests')}
                    className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${activeTab === 'guests'
                        ? 'bg-primary text-bg-dark shadow-[0_0_20px_rgba(76,168,223,0.4)]'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                >
                    來賓人數
                </button>
            </div>

            <div className="h-[400px] w-full">
                {isLoading && !rowsRaw ? (
                    <div className="flex h-full w-full items-center justify-center text-gray-500 text-sm">
                        載入中…
                    </div>
                ) : (
                    <Line ref={chartRef} data={getChartData()} options={options} />
                )}
            </div>
        </div>
    );
};

export default ResultsChart;
