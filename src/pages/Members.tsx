import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useMembers } from '../hooks/useMembers';
import { queryKeys } from '../api/queryKeys';
import MemberCard from '../components/members/MemberCard';
import MemberDetailModal from '../components/members/MemberDetailModal';
import type { Member } from '../types';
import CategoryFilter from '../components/members/CategoryFilter';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Search, Edit } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import SEO from '../components/common/SEO';
import { siteConfig } from '../config/site.config';
import { CardSkeleton, ErrorFallback, EmptyState } from '../components/loading';

const CATEGORIES: string[] = [...siteConfig.industries];

const CATEGORY_MAPPING: { [key: string]: string } = {
    '工程裝修': '居住空間與工程',
    '居住與空間工程': '居住空間與工程',
    '企業行銷': '品牌整合與行銷',
    '企業顧問': '企業經營與法稅',
    '企業營運與法稅': '企業經營與法稅',
    '資訊系統': '數位科技與應用',
    '數位AI與創新科技': '數位科技與應用',
    '數位科技與智能應用': '數位科技與應用',
    '健康美麗': '健康照護與身心',
    '身心健康與醫療': '健康照護與身心',
    '美食餐飲': '生活服務與消費',
    '飲食文化與食品': '生活服務與消費',
    '休閒教育': '學習成長與探索',
    '教育學習與休閒': '學習成長與探索',
    '投資理財': '金融財富與資產',
};

const Members: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isAdmin, setIsAdmin] = useState(false);
    const [detailMember, setDetailMember] = useState<Member | null>(null);
    const { members, loading, error } = useMembers();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('全部');

    // ... existing hooks

    // Check Admin Status
    React.useEffect(() => {
        const checkAdmin = async () => {
            if (!user) {
                setIsAdmin(false);
                return;
            }
            const { data } = await supabase
                .from('members')
                .select('is_admin')
                .eq('user_id', user.id)
                .single();
            setIsAdmin(data?.is_admin === true);
        };
        checkAdmin();
    }, [user]);

    // ... existing filtering logic

    // ... inside render loop


    // Use fixed categories
    const categories = useMemo(() => ['全部', ...CATEGORIES], []);

    // Filter logic
    const filteredMembers = useMemo(() => {
        return members.filter(member => {
            if (member.name === '人名') return false; // Filter out template placeholders if any

            // Normalize member categories for filtering
            const memberCats = (member.category || '').split(/[,|、]/).map(c => {
                let t = c.trim();
                // Map old legacy names to new ones
                if (CATEGORY_MAPPING[t]) t = CATEGORY_MAPPING[t];
                // Remove suffix if present
                const noSuffix = t.replace('生態圈', '');
                if (CATEGORIES.includes(noSuffix)) t = noSuffix;
                return t;
            });

            const matchesCategory = activeCategory === '全部' || memberCats.some(c => c === activeCategory);
            const normalizedSearch = searchQuery.toLowerCase();
            const matchesSearch =
                member.name.toLowerCase().includes(normalizedSearch) ||
                (member.category && member.category.toLowerCase().includes(normalizedSearch)) ||
                (member.industry && member.industry.toLowerCase().includes(normalizedSearch)) ||
                (member.company && member.company.toLowerCase().includes(normalizedSearch)) ||
                (member.services && member.services.some(s => s.toLowerCase().includes(normalizedSearch))) ||
                (member.hashtags && member.hashtags.some(h => h.toLowerCase().includes(normalizedSearch)));

            return matchesCategory && matchesSearch;
        });
    }, [members, activeCategory, searchQuery]);

    if (loading) {
        return (
            <div className="min-h-[70vh] container mx-auto px-3 py-8 pt-24 md:px-4 md:pt-28">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
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
                    title="無法載入會員資料"
                    message={error}
                    onRetry={() => void queryClient.invalidateQueries({ queryKey: queryKeys.members.list })}
                    className="max-w-md w-full"
                />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-[#030712]">
            {/* 沈浸式底紋 */}
            <div
                className="pointer-events-none fixed inset-0 z-0 opacity-[0.35]"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59,130,246,0.12) 1px, transparent 0), linear-gradient(180deg, rgba(3,7,18,0.95) 0%, rgba(15,23,42,0.98) 100%)`,
                    backgroundSize: '28px 28px, 100% 100%',
                }}
                aria-hidden
            />
            <SEO
                title="台灣商會會員 | BNI 長輝白金分會企業家名錄"
                description="探索 BNI 長輝白金分會的優秀企業家與專業人士。我們是台灣頂尖商會，涵蓋居住工程、品牌行銷、金融法稅、AI科技等 八大產業領域，為台灣企業主媒合最專業的合作夥伴。"
                keywords="台灣商會會員, BNI會員, 長輝會員, 企業家名錄, 台北商會, 商務媒合, 行業專家, 企業合作, 台灣企業家, 商會推薦"
                breadcrumbs={[{ name: '會員介紹', path: '/members' }]}
                structuredData={{
                    '@type': 'CollectionPage',
                    name: 'BNI 長輝白金分會台灣商會會員名錄',
                    description: '台灣 BNI 長輝白金分會涵蓋 八大產業的優秀企業家與專業人士。',
                    url: 'https://evershine.tw/members',
                    isPartOf: { '@id': 'https://evershine.tw/#website' },
                    inLanguage: 'zh-TW'
                }}
            />
            <PageHero
                title="台灣商會會員"
                subtitle={<>BNI 長輝白金分會 — 八大產業的優質台灣企業家<br />我們為夥伴的生意著想，也為夥伴的生意做引薦</>}
                subtitleClassName="!text-lg sm:!text-xl md:!text-2xl lg:!text-3xl text-slate-100 font-normal max-w-4xl"
            />

            <div className="container relative z-10 mx-auto px-3 py-6 pt-2 md:px-4 md:py-8 md:pt-6">
                <div className="text-center mb-8 relative z-10">

                    {/* Search Bar - Sticky on Mobile */}
                    <div className="sticky top-[60px] md:top-[80px] z-30 bg-bg-primary/95 backdrop-blur-xl py-3 -mx-4 px-4 mb-2 transition-all shadow-sm md:py-4 md:shadow-none md:static md:bg-transparent md:p-0">
                        <motion.div
                            initial={{ opacity: 0, width: "80%" }}
                            animate={{ opacity: 1, width: "100%" }}
                            className="relative max-w-lg mx-auto group"
                        >
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none sm:pl-5">
                                <Search className="text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder="搜尋會員名字、行業、公司..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-bg-dark/80 backdrop-blur-sm border border-gray-600 rounded-full py-3 pl-11 pr-5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-lg sm:py-3.5 sm:pl-12 sm:pr-6 sm:text-base"
                            />
                        </motion.div>
                    </div>

                    <CategoryFilter
                        categories={categories}
                        activeCategory={activeCategory}
                        onSelect={setActiveCategory}
                    />
                </div>

                <motion.div layout className="grid grid-cols-1 gap-4 pb-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
                    <AnimatePresence mode="popLayout">
                        {filteredMembers.map((member) => (
                            <motion.div
                                layout
                                key={member.id || member.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="relative group"
                            >
                                <MemberCard member={member} onOpenDetails={setDetailMember} />
                                {isAdmin && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/member-edit?id=${member.id}`);
                                        }}
                                        className="absolute right-2 top-2 z-20 rounded-full bg-black/60 p-2 opacity-0 shadow-lg backdrop-blur-sm transition-all hover:bg-primary hover:text-bg-dark group-hover:opacity-100"
                                        title="管理員編輯"
                                    >
                                        <Edit size={16} />
                                    </button>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <MemberDetailModal member={detailMember} open={detailMember !== null} onClose={() => setDetailMember(null)} />

                {/* Member Pledge - Moved to Bottom */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-3xl mx-auto mb-20 border border-white/10 text-left"
                >
                    <div className="text-center mb-6">
                        <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">BNI 會員宣示</h3>
                        <div className="w-12 h-1 bg-primary/50 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-gray-300 text-sm md:text-base">
                        {[
                            "我願意提供我所承諾的服務品質與價格",
                            "我願意對會員及其引薦對象誠實",
                            "我願意在會員及其引薦對象之間建立善意與信任",
                            "我願意對接收到的引薦負責並進行追蹤",
                            "我願意展現正向與支持的態度",
                            "我願意遵守我行業的道德標準"
                        ].map((text, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <span className="text-primary font-bold font-mono text-lg">{idx + 1}.</span>
                                <p>{text}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {filteredMembers.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="col-span-full max-w-xl mx-auto"
                    >
                        <EmptyState
                            title="沒有找到符合條件的會員"
                            description="試試調整搜尋關鍵字或產業篩選。"
                            action={
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchQuery('');
                                        setActiveCategory('全部');
                                    }}
                                    className="px-6 py-2.5 bg-primary text-bg-dark rounded-full hover:bg-primary/90 transition-colors font-bold"
                                >
                                    清除搜尋條件
                                </button>
                            }
                            className="border-white/10 bg-white/[0.03]"
                        />
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Members;
