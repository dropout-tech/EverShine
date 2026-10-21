import React from 'react';
import { Activity, Save, History } from 'lucide-react';
import type { HomepageStatsRow } from '../../api/dashboard';

export interface HomeStatsForm {
    referral_count: number;
    referral_value: number;
    guest_count: number;
    month: string;
}

export interface AdminSettingsTabProps {
    homeStats: HomeStatsForm;
    onHomeStatsChange: (next: HomeStatsForm) => void;
    onSaveHomeStats: () => void;
    /** 已存在的歷史紀錄；點擊任一筆會把表單切換到該月份方便編輯 */
    homeStatsHistory: HomepageStatsRow[];
}

/** 將 'YYYY-MM' 轉為「2025年5月」之類好讀文字 */
const formatMonthLabel = (month: string): string => {
    if (!/^\d{4}-\d{2}$/.test(month)) return month;
    const [y, m] = month.split('-');
    return `${y} 年 ${parseInt(m, 10)} 月`;
};

const AdminSettingsTab: React.FC<AdminSettingsTabProps> = ({
    homeStats,
    onHomeStatsChange,
    onSaveHomeStats,
    homeStatsHistory,
}) => {
    const isExisting = homeStatsHistory.some((h) => h.month === homeStats.month);

    const loadFromHistory = (row: HomepageStatsRow) => {
        onHomeStatsChange({
            month: row.month,
            referral_count: row.referral_count,
            referral_value: row.referral_value,
            guest_count: row.guest_count,
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 編輯表單 */}
            <div className="bg-bg-dark/50 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Activity size={20} className="text-primary" /> 引薦成果（每月數據）
                </h3>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                    每筆對應一個月份，會用於首頁「引薦成果」圖表（最近 12 個月）。
                    {isExisting ? (
                        <span className="text-amber-300/90 ml-1">⚠ 此月份已存在，儲存將覆蓋。</span>
                    ) : (
                        <span className="text-emerald-300/90 ml-1">✓ 將新增此月份。</span>
                    )}
                </p>
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">統計月份</label>
                        <input
                            type="month"
                            value={homeStats.month}
                            onChange={(e) => onHomeStatsChange({ ...homeStats, month: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">引薦單數（張）</label>
                        <input
                            type="number"
                            min={0}
                            value={homeStats.referral_count}
                            onChange={(e) =>
                                onHomeStatsChange({ ...homeStats, referral_count: Number(e.target.value) })
                            }
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">引薦金額（元）</label>
                        <input
                            type="number"
                            min={0}
                            value={homeStats.referral_value}
                            onChange={(e) =>
                                onHomeStatsChange({ ...homeStats, referral_value: Number(e.target.value) })
                            }
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                        />
                        <div className="text-right text-xs text-gray-500 mt-1">
                            預覽：{homeStats.referral_value.toLocaleString()} 元 ≈ ${(homeStats.referral_value / 10000).toFixed(1)} 萬
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">來賓人數</label>
                        <input
                            type="number"
                            min={0}
                            value={homeStats.guest_count}
                            onChange={(e) =>
                                onHomeStatsChange({ ...homeStats, guest_count: Number(e.target.value) })
                            }
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={onSaveHomeStats}
                        className="w-full py-3 bg-primary text-bg-dark font-bold rounded-lg hover:bg-primary/90 transition-colors flex justify-center items-center gap-2"
                    >
                        <Save size={18} />
                        {isExisting ? '更新此月份' : '新增此月份'}
                    </button>
                </div>
            </div>

            {/* 歷史月份列表 */}
            <div className="bg-bg-dark/50 border border-white/10 rounded-2xl p-6 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <History size={20} className="text-primary" /> 歷史月份
                    <span className="ml-auto text-xs font-normal text-gray-500 font-mono">
                        {homeStatsHistory.length} 筆
                    </span>
                </h3>
                <p className="text-xs text-gray-500 mb-4">點擊任一列即可載入到左側表單編輯。</p>
                {homeStatsHistory.length === 0 ? (
                    <div className="text-sm text-gray-500 text-center py-12 border border-white/5 rounded-xl">
                        尚無歷史資料
                    </div>
                ) : (
                    <div className="flex-1 max-h-[28rem] overflow-y-auto pr-1 space-y-2 [scrollbar-width:thin]">
                        {homeStatsHistory.map((row) => {
                            const active = row.month === homeStats.month;
                            return (
                                <button
                                    key={row.month}
                                    type="button"
                                    onClick={() => loadFromHistory(row)}
                                    className={`w-full text-left rounded-xl border px-4 py-3 transition-colors ${
                                        active
                                            ? 'border-primary/50 bg-primary/10 ring-1 ring-primary/40'
                                            : 'border-white/5 bg-white/[0.03] hover:border-primary/30 hover:bg-white/[0.06]'
                                    }`}
                                >
                                    <div className="flex items-center justify-between gap-3 mb-1">
                                        <span className="font-bold text-white text-sm">
                                            {formatMonthLabel(row.month)}
                                        </span>
                                        {active && (
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                                                編輯中
                                            </span>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-400">
                                        <div>
                                            <span className="text-gray-500">引薦</span>
                                            <span className="ml-1 font-mono text-white">{row.referral_count}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">$</span>
                                            <span className="ml-1 font-mono text-white">
                                                {(row.referral_value / 10000).toFixed(0)} 萬
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">來賓</span>
                                            <span className="ml-1 font-mono text-white">{row.guest_count}</span>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminSettingsTab;
