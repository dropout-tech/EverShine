import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMembers } from '../hooks/useMembers';
import MemberCard from '../components/members/MemberCard';
import CategoryFilter from '../components/members/CategoryFilter';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Search, Edit } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import SEO from '../components/common/SEO';
import { siteConfig } from '../config/site.config';

const CATEGORIES = [...siteConfig.industries];

const CATEGORY_MAPPING: { [key: string]: string } = {
    '工程裝修': '居住與空間工程',
    '企業行銷': '品牌整合與行銷',
    '企業顧問': '企業營運與法稅',
    '資訊系統': '數位AI與創新科技',
    '健康美麗': '身心健康與醫療',
    '美食餐飲': '飲食文化與食品',
    '休閒教育': '教育學習與休閒',
    '投資理財': '金融財富與資產',
};

const Members: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
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

    if (loading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (error) return <div className="text-center py-20 text-red-400">無法載入會員資料: {error}</div>;

    return (
        <div className="min-h-screen relative">
            <SEO
                structuredData={{
                    '@type': 'CollectionPage',
                    name: '一產業一席｜長輝企業家名錄',
                    description: '工程、行銷、金融、法稅、AI、健康，60 多種產業各只有一位代表。',
                    url: 'https://evershine.tw/members',
                    isPartOf: { '@id': 'https://evershine.tw/#website' },
                    inLanguage: 'zh-TW'
                }}
            />
            <PageHero
                title="台灣商會會員"
                subtitle={<>BNI 長輝白金分會 — 60+ 個產業的優質台灣企業家<br />我們為夥伴的生意著想，也為夥伴的生意做引薦</>}
            />

            <div className="container mx-auto px-4 py-8 relative z-10 pt-4 md:pt-10">
                <div className="text-center mb-8 relative z-10">

                    {/* Search Bar - Sticky on Mobile */}
                    <div className="sticky top-[60px] md:top-[80px] z-30 bg-bg-primary/95 backdrop-blur-xl py-4 -mx-4 px-4 mb-2 transition-all shadow-sm md:shadow-none md:static md:bg-transparent md:p-0">
                        <motion.div
                            initial={{ opacity: 0, width: "80%" }}
                            animate={{ opacity: 1, width: "100%" }}
                            className="relative max-w-lg mx-auto group"
                        >
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                <Search className="text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="搜尋會員名字、行業、公司..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-bg-dark/80 backdrop-blur-sm border border-gray-600 rounded-full py-3.5 pl-12 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-lg"
                            />
                        </motion.div>
                    </div>

                    <CategoryFilter
                        categories={categories}
                        activeCategory={activeCategory}
                        onSelect={setActiveCategory}
                    />
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredMembers.map(member => (
                            <motion.div
                                layout
                                key={member.id || member.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="relative group"
                            >
                                <MemberCard member={member} />
                                {isAdmin && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/member-edit?id=${member.id}`);
                                        }}
                                        className="absolute top-2 right-2 z-20 p-2 bg-black/60 hover:bg-primary text-white hover:text-bg-dark rounded-full backdrop-blur-sm transition-all shadow-lg opacity-0 group-hover:opacity-100 placeholder-admin-edit"
                                        title="管理員編輯"
                                    >
                                        <Edit size={16} />
                                    </button>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

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
                        className="col-span-full text-center text-gray-400 py-16 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm"
                    >
                        <p className="text-xl">沒有找到符合條件的會員</p>
                        <button
                            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                            className="mt-4 px-6 py-2 bg-primary text-bg-dark rounded-full hover:bg-[#b08d55] transition-colors font-bold"
                        >
                            清除搜尋條件
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Members;
