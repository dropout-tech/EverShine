
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/common/SEO';

const Privacy: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 container mx-auto max-w-4xl">
            <SEO />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-bg-dark/80 backdrop-blur border border-white/10 rounded-2xl p-8 md:p-12 shadow-xl"
            >
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft size={20} /> 返回
                </button>

                <h1 className="text-3xl font-bold text-white mb-2 pb-4">隱私權政策與服務條款</h1>
                <p className="text-sm text-gray-400 mb-8 border-b border-white/10 pb-4">最後更新日期：{new Date().toISOString().split('T')[0]}</p>

                <div className="space-y-8 text-gray-300 leading-relaxed">

                    {/* Privacy Policy Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 bg-primary/10 p-2 rounded border-l-4 border-primary inline-block">隱私權保護政策</h2>
                        <p className="mb-4">
                            歡迎使用 BNI EverShine 長輝白金分會官方網站（以下簡稱「本網站」）。為了讓您能夠安心使用本網站的各項服務與資訊，特此向您說明本網站的隱私權保護政策，以保障您的權益，請您詳閱下列內容：
                        </p>

                        <h3 className="text-lg font-bold text-primary mt-6 mb-2">一、隱私權保護政策的適用範圍</h3>
                        <p>
                            隱私權保護政策內容，包括本網站如何處理在您使用網站服務時收集到的個人識別資料。隱私權保護政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的人員。
                        </p>

                        <h3 className="text-lg font-bold text-primary mt-6 mb-2">二、個人資料的蒐集、處理及利用方式</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>當您造訪本網站或使用本網站所提供之功能服務時，我們將視該服務功能性質，請您提供必要的個人資料，並在該特定目的範圍內處理及利用您的個人資料；非經您書面同意，本網站不會將個人資料用於其他用途。</li>
                            <li>於一般瀏覽時，伺服器會自行記錄相關行徑，包括您使用連線設備的IP位址、使用時間、使用的瀏覽器、瀏覽及點選資料記錄等，做為我們增進網站服務的參考依據，此記錄為內部應用，決不對外公佈。</li>
                        </ul>

                        <h3 className="text-lg font-bold text-primary mt-6 mb-2">三、資料之保護</h3>
                        <p>
                            本網站主機均設有防火牆、防毒系統等相關的各項資訊安全設備及必要的安全防護措施，加以保護網站及您的個人資料採用嚴格的保護措施，只由經過授權的人員才能接觸您的個人資料。
                        </p>

                        <h3 className="text-lg font-bold text-primary mt-6 mb-2">四、網站對外的相關連結</h3>
                        <p>
                            本網站的網頁提供其他網站的網路連結，您也可經由本網站所提供的連結，點選進入其他網站。但該連結網站不適用本網站的隱私權保護政策，您必須參考該連結網站中的隱私權保護政策。
                        </p>
                    </section>

                    <hr className="border-white/10 my-8" />

                    {/* Terms of Service Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 bg-primary/10 p-2 rounded border-l-4 border-primary inline-block">服務條款</h2>

                        <h3 className="text-lg font-bold text-primary mt-6 mb-2">一、認知與接受條款</h3>
                        <p>
                            當您開始使用本網站服務時，即表示您已閱讀、瞭解並同意接受本服務條款之所有內容。如果您不同意本服務條款的內容，或者您所屬的國家或地域排除本服務條款內容之全部或一部時，您應立即停止使用本服務。
                        </p>

                        <h3 className="text-lg font-bold text-primary mt-6 mb-2">二、會員註冊義務</h3>
                        <p>為了能使用本服務，您同意以下事項：</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>依本服務註冊表之提示提供您本人正確、最新及完整的資料。</li>
                            <li>維持並更新您個人資料，確保其為正確、最新及完整。若您提供任何錯誤、不實或不完整的資料，本網站有權暫停或終止您的帳號，並拒絕您使用本服務之全部或一部。</li>
                        </ul>

                        <h3 className="text-lg font-bold text-primary mt-6 mb-2">三、會員帳號、密碼及安全</h3>
                        <p>
                            完成本服務的登記程序之後，您將收到一個密碼及帳號。維持密碼及帳號的機密安全，是您的責任。利用該密碼及帳號所進行的一切行動，您將負完全的責任。
                        </p>

                        <h3 className="text-lg font-bold text-primary mt-6 mb-2">四、使用者的守法義務及承諾</h3>
                        <p>
                            您承諾絕不為任何非法目的或以任何非法方式使用本服務，並承諾遵守中華民國相關法規及一切使用網際網路之國際慣例。您若係中華民國以外之使用者，並同意遵守所屬國家或地域之法令。
                        </p>
                    </section>

                </div>

                <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} BNI EverShine 長輝白金分會. All rights reserved.</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Privacy;
