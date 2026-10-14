import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogIn, LogOut, User, Facebook, Instagram, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { trackEvent } from '../../lib/analytics';
import { siteConfig } from '../../config/site.config';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const { user, signOut } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const checkAdmin = async () => {
            if (!user || !supabase) {
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

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const navLinks = [
        { name: '首頁', path: '/' },
        { name: '關於 BNI', path: '/bni' },
        { name: '分會成員', path: '/members' },
        { name: '引薦案例', path: '/referrals' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a192f]/95 backdrop-blur-md py-4 shadow-lg border-b border-white/10' : 'bg-gradient-to-b from-black/50 to-transparent py-6'}`}>
            <div className="container mx-auto px-4 flex justify-center md:justify-between items-center">
                {/* Logo */}
                <NavLink to="/" className="flex items-center gap-3 group">
                    <img
                        src={siteConfig.logos.horizontal}
                        alt={`${siteConfig.branchFullName} — 台灣商會首選`}
                        className="h-14 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                </NavLink>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `text-base font-medium tracking-wider transition-colors duration-300 hover:text-primary relative group ${isActive ? 'text-primary' : 'text-gray-300'}`
                            }
                        >
                            {link.name}
                            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
                        </NavLink>
                    ))}

                    {/* Social Icons */}
                    <div className="flex items-center gap-4 border-l border-white/20 pl-8 h-6">
                        <a
                            href={siteConfig.social.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-[#1877F2] transition-colors flex items-center"
                            title="Facebook"
                            onClick={() => trackEvent('click_social', { platform: 'Facebook' })}
                        >
                            <Facebook size={20} />
                        </a>
                        <a
                            href={siteConfig.social.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-[#E1306C] transition-colors flex items-center"
                            title="Instagram"
                            onClick={() => trackEvent('click_social', { platform: 'Instagram' })}
                        >
                            <Instagram size={20} />
                        </a>
                        <a
                            href={siteConfig.social.threads}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors flex items-center"
                            title="Threads"
                            onClick={() => trackEvent('click_social', { platform: 'Threads' })}
                        >
                            <div className="flex items-center justify-center w-5 h-5">
                                <svg width="100%" height="100%" viewBox="0 0 192 192" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
                                </svg>
                            </div>
                        </a>
                    </div>

                    {/* Auth Button */}
                    {user ? (
                        <div className="flex items-center gap-4 border-l border-white/20 pl-8 h-6">
                            {isAdmin && (
                                <NavLink to="/admin" className="flex items-center gap-2 text-sm text-[#FFD700] hover:text-white transition-colors font-bold mr-2" title="管理所有會員">
                                    <Shield size={16} />
                                    <span>管理後台</span>
                                </NavLink>
                            )}
                            <NavLink to="/member-edit" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                <User size={16} />
                                <span>我的檔案</span>
                            </NavLink>
                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    ) : (
                        <NavLink
                            to="/login"
                            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-white transition-colors border border-primary/50 hover:bg-primary/10 px-4 py-2 rounded-full"
                        >
                            <LogIn size={16} />
                            <span>會員登入</span>
                        </NavLink>
                    )}
                </div>

                {/* Mobile View: Only Logo is visible here. BottomNav handles navigation. */}
            </div>
        </nav>
    );
};

export default Navbar;
