import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCountUp } from '../hooks/useCountUp';
import PageHero from '../components/common/PageHero';
import SEO from '../components/common/SEO';

const StatCard: React.FC<{ value: number, label: React.ReactNode, subtext?: string, isLarge?: boolean }> = ({ value, label, subtext, isLarge }) => {
    const { count, elementRef } = useCountUp(value, 2000);

    return (
        <div ref={elementRef} className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center ${isLarge ? 'md:col-span-2 md:row-span-2 flex flex-col justify-center items-center bg-primary/10 border-primary/30 shadow-[0_0_30px_rgba(76,168,223,0.1)]' : 'hover:bg-white/10 transition-colors'}`}>
            <div className={`font-bold text-white mb-2 font-mono ${isLarge ? 'text-6xl md:text-7xl text-primary' : 'text-4xl md:text-5xl'}`}>
                {value >= 10000 ? (count / 10000).toFixed(0) + '萬' : count.toLocaleString()}
                <span className="text-2xl ml-1 align-top">+</span>
            </div>
            <div className={`text-gray-300 ${isLarge ? 'text-xl font-bold' : 'text-sm'}`}>
                {label}
            </div>
            {subtext && <div className="text-gray-500 text-xs mt-1">{subtext}</div>}
        </div>
    );
};

const BNIPage: React.FC = () => {
    return (
        <div className="min-h-screen pt-0">
            <SEO
                structuredData={{
                    '@type': 'WebPage',
                    name: '什麼是 BNI｜76 國的引薦商會',
                    description: 'BNI 要會員每週見面、互相引薦，一個產業只留一席。遍及 76 國、34 萬會員，台灣有 245 個分會。',
                    url: 'https://evershine.tw/bni',
                    isPartOf: { '@id': 'https://evershine.tw/#website' },
                    inLanguage: 'zh-TW'
                }}
            />
            <PageHero
                title="關於 BNI — 全球最大商會暨商務引薦組織"
                subtitle={
                    <>
                        台灣商會首選・全球最大商務引薦平台<br />
                        成立40年，遍及76+國家，11,300+分會，34萬+會員
                    </>
                }
            />

            {/* Data Notice */}
            <div className="bg-primary/10 border-y border-primary/20 py-3 text-center text-sm text-primary font-mono tracking-wide">
                <strong>資料截止日期：2025年10月25日</strong>
                <span className="mx-2 opacity-50">|</span>
                實際數據可能因時間推移而有所變化
            </div>

            {/* Global Stats */}
            <section className="py-20 container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">BNI 全球商會影響力數據</h2>
                    <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pb-6 md:pb-0 px-4">
                    <div className="col-span-2 md:col-span-2 md:row-span-2">
                        <StatCard isLarge value={7500} label={<>全球引薦金額<br />(億新台幣)</>} subtext="最近12個月" />
                    </div>
                    <div className="">
                        <StatCard value={76} label="全球國家" />
                    </div>
                    <div className="">
                        <StatCard value={11300} label="全球分會" />
                    </div>
                    <div className="">
                        <StatCard value={340000} label="全球會員" />
                    </div>
                    <div className="">
                        <StatCard value={16800000} label={<>全球引薦單<br />(最近12個月)</>} />
                    </div>
                </div>
            </section>

            {/* Taiwan Stats */}
            <section className="py-20 bg-white/5 relative border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">台灣商會 BNI 卓越表現</h2>
                        <div className="w-16 h-1 bg-white/20 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto text-center">
                        <div className="p-4 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-mono">245</div>
                            <div className="text-gray-300 font-medium">分會</div>
                        </div>
                        <div className="p-4 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-mono">9,932</div>
                            <div className="text-gray-300 font-medium">會員</div>
                        </div>
                        <div className="p-4 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-mono">72萬+</div>
                            <div className="text-gray-300 font-medium">引薦單數<br /><span className="text-xs text-gray-500 font-normal">(過去12個月)</span></div>
                        </div>
                        <div className="p-4 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-mono">253</div>
                            <div className="text-gray-300 font-medium">成交金額<br /><span className="text-xs text-gray-500 font-normal">(億新台幣)</span></div>
                        </div>
                        <div className="p-4 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-mono">73</div>
                            <div className="text-gray-300 font-medium">平均每位會員<br /><span className="text-xs text-gray-500 font-normal">每年引薦數</span></div>
                        </div>
                        <div className="p-4 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-mono">255</div>
                            <div className="text-gray-300 font-medium">平均每位會員<br /><span className="text-xs text-gray-500 font-normal">每年成交價值 (萬)</span></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7 Core Values */}
            <section className="py-20 container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">BNI 商會七大核心價值</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">這些核心價值是 BNI 商會文化與成功的基石，也是台灣 BNI 所有分會共同遵循的行事準則</p>
                    <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[
                        { title: "Givers Gain® 付出者收穫", desc: "這是 BNI 的哲學。我們相信透過幫助他人，自己也將受益。當您願意為他人引薦業務時，他人也會樂意為您引薦。" },
                        { title: "Building Relationships 建立關係", desc: "我們不僅僅是交換名片，而是建立長期、信任的商務關係。良好的人脈建立在信任之上。" },
                        { title: "Lifelong Learning 終身學習", desc: "我們相信持續學習是個人與企業成長的關鍵。BNI 提供豐富的培訓資源幫助會員提升。" },
                        { title: "Traditions + Innovation 傳統 + 創新", desc: "我們尊重經過驗證的系統與傳統，同時也擁抱創新，隨著時代進步不斷優化。" },
                        { title: "Positive Attitude 正面積極", desc: "積極的態度具有感染力。我們致力於營造一個互相支持、充滿正能量的商務環境。" },
                        { title: "Accountability 當責", desc: "即使是志工性質的商務組織，我們也強調責任感。信守承諾是建立信任的基礎。" },
                        { title: "Recognition 認可與表揚", desc: "我們樂於表揚會員的付出與成就。認可是推動團隊前進的重要動力。" }
                    ].map((item, idx) => (
                        <div key={idx} className="h-full">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-all hover:border-primary/50 group h-full"
                            >
                                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-white transition-colors">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Meeting Agenda */}
            {/* Meeting Agenda */}
            <section className="py-20 bg-white/5 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">標準會議流程</h2>
                        <p className="text-gray-400">高效、結構化的 90 分鐘會議，極大化商務效益</p>
                        <div className="w-16 h-1 bg-white/20 mx-auto rounded-full mt-4"></div>
                    </div>

                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                        {[
                            "01. 自由交流時間 (Open Networking)",
                            "02. 歡迎及介紹領導團隊",
                            "03. BNI 宗旨及概況說明",
                            "04. 人脈教育培訓 (Networking Education)",
                            "05. 傑出表現會員認可及表揚",
                            "06. 傳遞名片盒 (Pass Business Cards)",
                            "07. 歡迎新會員及入會儀式",
                            "08. 會員 30-60 秒專業簡報 (Weekly Presentations)",
                            "09. 歡迎來賓及其簡報",
                            "10. 副主席績效報告 (Vice President's Report)",
                            "11. 會員委員會報告 (Membership Committee Report)",
                            "12. 秘書/財務報告",
                            "13. 介紹本週專題簡報人",
                            "14. 專題主題簡報 (Featured Presentation)",
                            "15. 業務引薦及會員見證 (Referrals & Testimonials)",
                            "16. 引薦真實性核查 (Referral Reality Check)",
                            "17. 秘書/財務再次報告 (宣佈未來六週演講者)",
                            "18. 分會公告與提醒 (Announcements)",
                            "19. 門票抽獎 (Door Prize)",
                            "20. 主席結語及會議正式結束"
                        ].map((step, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors rounded-lg group">
                                <div className="w-2 h-2 rounded-full bg-primary shrink-0 group-hover:scale-150 transition-transform"></div>
                                <span className="text-gray-300 font-mono text-base group-hover:text-white transition-colors">{step}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Join */}
            <section className="py-20 container mx-auto px-4">
                <div className="max-w-5xl mx-auto bg-gradient-to-br from-primary/10 to-bg-dark border border-primary/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                    <h2 className="text-3xl font-bold text-white mb-6 relative z-10">為什麼台灣企業主選擇加入 BNI 線上商會？</h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed relative z-10">
                        BNI 長輝白金分會提供正向、支持及結構化的線上商務環境，100% 支援線上與會，透過線上人脈引薦發展您在台灣的業務。
                        我們的會員享有獨家席位權利，每個分會中每個行業類別只允許一位代表加入，
                        這意味著您將獨佔該商會分會的所有該行業引薦資源。
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                        <div className="p-4">
                            <div className="text-4xl mb-3">💻</div>
                            <h3 className="font-bold text-white mb-2">100% 線上</h3>
                            <p className="text-sm text-gray-400">全程線上與會，不受地點限制，出差也不中斷。</p>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl mb-3">🤝</div>
                            <h3 className="font-bold text-white mb-2">獨家席位</h3>
                            <p className="text-sm text-gray-400">鎖定您的行業類別，阻擋競爭對手。</p>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl mb-3">📈</div>
                            <h3 className="font-bold text-white mb-2">持續引薦</h3>
                            <p className="text-sm text-gray-400">獲得經過預先篩選的高質量業務引薦。</p>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl mb-3">🌍</div>
                            <h3 className="font-bold text-white mb-2">全球資源</h3>
                            <p className="text-sm text-gray-400">連結全球 76+ 國家、30 萬+ 企業主的商務網絡。</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Internal Links Section for SEO */}
            <section className="py-16 container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-white mb-8">探索更多 BNI 長輝白金分會台灣商會</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link to="/members" className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-primary/50 transition-all">
                            <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-white transition-colors">認識商會會員</h3>
                            <p className="text-gray-400 text-sm">探索 BNI 長輝白金分會 60+ 個產業的優秀台灣企業家</p>
                        </Link>
                        <Link to="/referrals" className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-primary/50 transition-all">
                            <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-white transition-colors">引薦成功案例</h3>
                            <p className="text-gray-400 text-sm">見證台灣商會如何透過商務引薦創造雙贏合作</p>
                        </Link>
                        <Link to="/#contact" className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-primary/50 transition-all">
                            <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-white transition-colors">聯繫我們</h3>
                            <p className="text-gray-400 text-sm">加入台灣頂尖商會，開始您的商務引薦之旅</p>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BNIPage;
