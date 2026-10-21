import React, { useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useReferrals } from '../hooks/useReferrals';
import { queryKeys } from '../api/queryKeys';
import PageHero from '../components/common/PageHero';
import SEO from '../components/common/SEO';
import { CardSkeleton, ErrorFallback, EmptyState } from '../components/loading';
import ReferralCard from '../components/referrals/ReferralCard';
import ReferralFilterBar from '../components/referrals/ReferralFilterBar';
import {
    REFERRAL_ALL_CATEGORY,
    countReferralsByCategory,
    filterReferrals,
} from '../lib/referralFilter';

/** 手機單欄、平板兩欄、桌面三欄；items-start 避免展開故事時整列被撐高 */
const REFERRALS_GRID_CLASS =
    'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 pb-12 md:pb-16 max-w-7xl mx-auto items-start';

const Referrals: React.FC = () => {
    const queryClient = useQueryClient();
    const { referrals, loading, error } = useReferrals();
    const [selectedReferralId, setSelectedReferralId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState(REFERRAL_ALL_CATEGORY);

    const categoryCounts = useMemo(() => countReferralsByCategory(referrals), [referrals]);

    const filteredReferrals = useMemo(
        () => filterReferrals(referrals, { query: searchQuery, category: activeCategory }),
        [referrals, searchQuery, activeCategory]
    );

    if (loading) {
        return (
            <div className="min-h-[70vh] container mx-auto px-4 py-12 pt-24 md:pt-28 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4 py-20">
                <ErrorFallback
                    title="無法載入引薦資料"
                    message={error}
                    onRetry={() => void queryClient.invalidateQueries({ queryKey: queryKeys.referrals.list })}
                    className="max-w-md w-full"
                />
            </div>
        );
    }

    const toggleReferral = (id: string) => {
        setSelectedReferralId((current) => (current === id ? null : id));
    };

    return (
        <div className="min-h-screen relative overflow-x-hidden">
            <SEO
                structuredData={{
                    '@type': 'CollectionPage',
                    name: '2.6 萬張引薦｜長輝成交案例',
                    description: '創會至 2026 年 1 月，長輝白金分會累計 26,459 張引薦單、成交新台幣 6.29 億。',
                    url: 'https://evershine.tw/referrals',
                    isPartOf: { '@id': 'https://evershine.tw/#website' },
                    inLanguage: 'zh-TW'
                }}
            />
            <PageHero
                compact
                title="台灣商會引薦案例"
                subtitle={
                    <>
                        BNI 長輝白金分會真實的商務引薦案例<br />展現台灣商會的商業價值，每一次的引薦都是信任的傳遞
                    </>
                }
            />

            <div className="relative z-10 bg-bg-primary/98 border-t border-white/5">
            <div className="container mx-auto px-4 py-8 md:py-10">

                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6 text-center max-w-2xl mx-auto">
                    <p className="text-primary font-bold text-lg mb-1">每週精選案例</p>
                    <p className="text-gray-400 text-sm">
                        實際上門引薦單遠大於此，目前已累積 <span className="text-white font-mono font-bold">16,800+</span> 筆引薦商機，這裡僅展示每週精選的成功故事。
                    </p>
                </div>

                <ReferralFilterBar
                    query={searchQuery}
                    onQueryChange={setSearchQuery}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                    totalCount={referrals.length}
                    filteredCount={filteredReferrals.length}
                    categoryCounts={categoryCounts}
                />

                <div data-testid="referrals-grid" className={REFERRALS_GRID_CLASS}>
                    {filteredReferrals.length === 0 && referrals.length > 0 && (
                        <div className="col-span-full max-w-xl mx-auto">
                            <EmptyState
                                title="找不到符合的案例"
                                description="試試其他關鍵字，或切換分類篩選。"
                                className="border-white/10 bg-white/[0.03]"
                            />
                        </div>
                    )}
                    {referrals.length === 0 && (
                        <div className="col-span-full max-w-xl mx-auto">
                            <EmptyState
                                title="尚無引薦案例"
                                description="目前沒有可顯示的引薦資料。"
                                className="border-white/10 bg-white/[0.03]"
                            />
                        </div>
                    )}
                    {filteredReferrals.map((referral, index) => (
                        <ReferralCard
                            key={referral.id}
                            referral={referral}
                            index={index}
                            isSelected={selectedReferralId === referral.id}
                            onToggle={() => toggleReferral(referral.id)}
                        />
                    ))}
                </div>
            </div>
            </div>
        </div>
    );
};

export default Referrals;
