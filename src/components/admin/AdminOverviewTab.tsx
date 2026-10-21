import React from 'react';
import { Users, Activity, DollarSign, Calendar, Shield } from 'lucide-react';
import StatsCard from '../common/StatsCard';
import { EmptyState, SmartImage } from '../loading';
import { resolveMemberPhotoObjectPosition } from '../../lib/memberPhotoPosition';
import { siteConfig } from '../../config/site.config';
import type { AdminStaffItem } from '../../api/dashboard';

/** 相對時間：x 分鐘前 / x 小時前 / x 天前；超過 14 天直接顯示日期 */
function formatRelativeTime(date: Date): string {
    const diffMs = Date.now() - date.getTime();
    if (diffMs < 0) return date.toLocaleDateString();
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 1) return '剛剛';
    if (minutes < 60) return `${minutes} 分鐘前`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} 小時前`;
    const days = Math.floor(hours / 24);
    if (days < 14) return `${days} 天前`;
    return date.toLocaleDateString();
}

export interface AdminOverviewTabProps {
    stats: {
        totalMembers: number;
        totalReferrals: number;
        totalValue: number;
        monthlyVisits: number;
        industryCount: number;
        completionRate: string;
    };
    recentUpdates: Record<string, unknown>[];
    marketingStats: { socialClicks: number };
    admins: AdminStaffItem[];
}

const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({ stats, recentUpdates, marketingStats, admins }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <StatsCard title="總會員數" value={stats.totalMembers} icon={<Users className="text-blue-400" />} diff="活躍中" />
            <StatsCard title="資料完整度" value={stats.completionRate} icon={<Activity className="text-pink-400" />} diff="會員有照片比例" />
            <StatsCard title="涵蓋產業數" value={`${stats.industryCount} 項`} icon={<Users className="text-purple-400" />} diff="會員多元度" />
            <StatsCard title="總引薦單數" value={stats.totalReferrals.toLocaleString()} icon={<Calendar className="text-green-400" />} diff="歷史累計" />
            <StatsCard
                title="總交易價值"
                value={`$${(stats.totalValue / 100000000).toFixed(1)}億`}
                icon={<DollarSign className="text-yellow-400" />}
                diff="歷史累計"
            />
            <StatsCard title="本月網站瀏覽" value={stats.monthlyVisits.toLocaleString()} icon={<Activity className="text-purple-400" />} diff="+15% 上月" />
            <StatsCard title="社群連結點擊" value={marketingStats.socialClicks.toLocaleString()} icon={<Users className="text-pink-500" />} diff="本月累計" />

            <div className="col-span-2 lg:col-span-3 bg-bg-dark/50 border border-white/10 rounded-2xl p-4 md:p-6 flex flex-col min-h-[280px]">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 shrink-0">
                    <Activity size={20} className="text-primary" />
                    最近更新紀錄
                    {recentUpdates.length > 0 && (
                        <span className="ml-auto text-xs font-normal text-gray-500 font-mono">{recentUpdates.length} 筆</span>
                    )}
                </h3>
                <div className="grid gap-3 max-h-[28rem] overflow-y-auto pr-1 [scrollbar-width:thin] [scrollbar-color:rgba(148,163,184,0.45)_transparent]">
                    {recentUpdates.length === 0 ? (
                        <EmptyState
                            title="尚無更新紀錄"
                            description="會員編輯後，近期異動會顯示於此。"
                            className="border-white/5 bg-transparent py-10"
                        />
                    ) : (
                        recentUpdates.map((item) => {
                            const ts = (item.updatedAt || item.updated_at || item.createdAt || item.created_at) as string | undefined;
                            const editCount = Number(item.editCount ?? item.edit_count ?? 0);
                            const updatedDate = ts ? new Date(ts) : null;
                            const relative = updatedDate ? formatRelativeTime(updatedDate) : '—';
                            const exact = updatedDate ? `${updatedDate.toLocaleDateString()} ${updatedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : '';

                            return (
                                <div
                                    key={String(item.id)}
                                    className="flex items-center justify-between gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-primary/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3 min-w-0 flex-1">
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800 shrink-0">
                                            <SmartImage
                                                src={(item.photo as string) || siteConfig.defaultPhoto}
                                                alt={String(item.name)}
                                                className="w-full h-full object-cover"
                                                style={{
                                                    objectPosition: resolveMemberPhotoObjectPosition(
                                                        (item.photoPosition ?? item.photo_position) as string | undefined
                                                    ),
                                                }}
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-bold text-white truncate">{String(item.name)}</div>
                                            <div className="text-xs text-gray-400 truncate">{(item.company as string) || '未填寫公司'}</div>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className="text-primary text-sm font-medium" title={exact}>
                                            {relative}
                                        </div>
                                        <div className="text-[11px] text-gray-500 mt-0.5">
                                            {editCount > 0 ? `已編輯 ${editCount} 次` : '尚未編輯'}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            <div className="col-span-2 lg:col-span-1 bg-primary/5 border border-primary/20 rounded-2xl p-4 md:p-6 min-h-[280px] flex flex-col">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Shield size={20} className="text-primary" /> 系統維運團隊
                </h3>
                <div className="space-y-3 flex-grow">
                    {admins.length === 0 ? (
                        <div className="text-xs text-gray-500 leading-relaxed">
                            尚無系統管理員。請在會員列表為指定會員勾選 is_admin。
                        </div>
                    ) : (
                        admins.map((a) => (
                            <div
                                key={a.id}
                                className="flex items-center gap-3 p-2.5 bg-white/5 rounded-xl border border-white/5 hover:border-primary/30 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 border border-primary/20 shrink-0">
                                    <SmartImage
                                        src={a.photo || siteConfig.defaultPhoto}
                                        alt={a.name}
                                        className="w-full h-full object-cover"
                                        style={{
                                            objectPosition: resolveMemberPhotoObjectPosition(a.photoPosition),
                                        }}
                                    />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-sm font-bold text-white truncate">{a.name}</div>
                                    <div className="text-[10px] text-primary/70 uppercase tracking-widest font-medium truncate">
                                        {a.position || a.title || '系統管理員'}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="text-[10px] text-gray-500 text-center uppercase tracking-widest">EverShine Tech Support</div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverviewTab;
