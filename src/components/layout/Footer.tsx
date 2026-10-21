import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site.config';

const Footer: React.FC = () => {
    return (
        <footer className="relative z-10 bg-bg-dark border-t border-white/10 pt-16 pb-24 md:pb-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-center md:text-left">
                    <div className="md:col-span-2 space-y-4 flex flex-col items-center md:items-start">
                        <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
                            <img src={siteConfig.logos.horizontal} alt={`${siteConfig.branchFullName} — 台灣商會`} className="h-20 w-auto" />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto md:mx-0 text-center md:text-left">
                            BNI 長輝白金分會是台灣最具影響力的線上商會之一，100% 支援線上與會，隸屬全球最大商務引薦組織 BNI。致力於通過結構化的線上引薦行銷系統，為台灣企業主提供不受地點限制的商務合作與人脈拓展平台。
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg tracking-wide">快速連結</h4>
                        <ul className="space-y-3">
                            <li className="list-none"><Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm">首頁</Link></li>
                            <li className="list-none"><Link to="/members" className="text-gray-400 hover:text-primary transition-colors text-sm">會員介紹</Link></li>
                            <li className="list-none"><Link to="/referrals" className="text-gray-400 hover:text-primary transition-colors text-sm">引薦報告</Link></li>
                            <li className="list-none"><Link to="/bni" className="text-gray-400 hover:text-primary transition-colors text-sm">什麼是 BNI</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg tracking-wide">聯繫我們</h4>
                        <div className="space-y-3 flex flex-col items-center md:items-start">
                            <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors text-sm group" aria-label={`${siteConfig.branchFullName} Facebook 粉絲專頁`}>
                                <span className="p-2 bg-white/5 rounded-full group-hover:bg-primary group-hover:text-bg-dark transition-all"><Facebook size={16} /></span> Facebook
                            </a>
                            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors text-sm group" aria-label={`${siteConfig.branchFullName} Instagram`}>
                                <span className="p-2 bg-white/5 rounded-full group-hover:bg-primary group-hover:text-bg-dark transition-all"><Instagram size={16} /></span> Instagram
                            </a>
                            <a href={siteConfig.social.threads} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors text-sm group" aria-label={`${siteConfig.branchFullName} Threads`}>
                                <span className="p-2 bg-white/5 rounded-full group-hover:bg-primary group-hover:text-bg-dark transition-all">
                                    <svg width="16" height="16" viewBox="0 0 192 192" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
                                    </svg>
                                </span> Threads
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                        <p>&copy; {new Date().getFullYear()} BNI EverShine Chapter. All rights reserved.</p>
                        <Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors">
                            隱私權政策與服務條款
                        </Link>
                    </div>
                    <p className="text-center font-bold text-white/80">
                        本網站由{' '}
                        <a
                            href="https://dropout.tw"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-white hover:underline transition-colors"
                        >
                            琢奧科技有限公司 DropOut Tech Consulting Co., Ltd.
                        </a>
                        {' '}開發與維護，網站與系統開發歡迎洽詢{' '}
                        <a href="mailto:info@dropout.tw" className="text-primary hover:underline hover:text-white transition-colors">
                            info@dropout.tw
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
