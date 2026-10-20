import React, { useState } from 'react';
import type { Member } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Building, Briefcase, Phone, Globe, Mail } from 'lucide-react';
import clsx from 'clsx';
import { siteConfig } from '../../config/site.config';
import { memberPhotoFallback, memberPhotoSrc } from '../../lib/memberPhoto';

const MemberCard: React.FC<{ member: Member }> = ({ member }) => {
    const [expanded, setExpanded] = useState(false);

    const [imgSrc, setImgSrc] = useState(() => memberPhotoSrc(member.photo, 'thumb'));

    React.useEffect(() => {
        setImgSrc(memberPhotoSrc(member.photo, 'thumb'));
    }, [member.photo]);

    // Normalize links to array format
    const normalizedLinks = React.useMemo(() => {
        if (!member.links) return [];

        // Handle Array format (Legacy)
        if (Array.isArray(member.links)) {
            return member.links.filter(link => link.url && link.url.trim() !== '' && link.url !== '#');
        }

        // Handle Object format (New Standard)
        const links: { type: string; url: string; icon: string }[] = [];
        Object.entries(member.links).forEach(([key, url]) => {
            if (url && typeof url === 'string' && url.trim() !== '' && url !== '#') {
                links.push({
                    type: key,
                    url: url.trim(),
                    icon: key
                });
            }
        });
        return links;
    }, [member.links]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col h-full"
        >
            <div className={clsx(
                "bg-bg-dark/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-primary/50 relative group flex flex-col h-full",
            )}>
                {/* Top Border Gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="flex flex-col items-center text-center flex-grow">
                    <div className="w-28 h-28 rounded-full border-2 border-primary p-1 mb-4 relative shrink-0">
                        <img
                            src={imgSrc}
                            alt={member.name}
                            width={112}
                            height={112}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full rounded-full object-cover bg-bg-dark"
                            style={{ objectPosition: member.photoPosition || 'center 20%' }}
                            onError={() => setImgSrc(memberPhotoFallback(imgSrc, member.photo) || siteConfig.defaultPhoto)}
                        />
                    </div>

                    <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                        <span className="px-3 py-1 bg-primary/10 rounded-full text-primary border border-primary/20 text-xs font-medium">{member.industry}</span>
                    </div>

                    <div className={clsx("text-gray-300 text-sm mb-3 line-clamp-3", !expanded && "min-h-[3.6em]")}>
                        {member.shortIntro || member.fullIntro}
                    </div>

                    <div className="mt-auto w-full">
                        <AnimatePresence>
                            {expanded && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-left text-sm text-gray-300 border-t border-white/10 pt-3 mt-2 overflow-hidden"
                                >
                                    <div className="space-y-2 mb-4">
                                        {member.company && (
                                            <div className="flex items-center gap-2 text-xs"><Building size={14} className="text-primary shrink-0" /> <span className="truncate">{member.company}</span></div>
                                        )}
                                        {member.title && (
                                            <div className="flex items-center gap-2 text-xs"><Briefcase size={14} className="text-primary shrink-0" /> <span className="truncate">{member.title}</span></div>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="text-primary text-xs uppercase tracking-wider mb-2 font-bold">個人介紹</h4>
                                        <p className="leading-relaxed text-gray-300 text-sm whitespace-pre-line">
                                            {member.fullIntro ? member.fullIntro.replace(/\\n/g, '\n') : ''}
                                        </p>
                                    </div>

                                    {member.services && member.services.length > 0 && (
                                        <div className="mb-4">
                                            <h4 className="text-primary text-xs uppercase tracking-wider mb-2 font-bold">服務項目</h4>
                                            <ul className="space-y-1 text-gray-300 text-sm">
                                                {member.services.map((s, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <span className="text-primary mt-0.5">•</span>
                                                        <span>{s}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Social/Contact Links */}
                                    {normalizedLinks.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
                                            {normalizedLinks.map((link, i) => {
                                                // Determine icon based on link type
                                                const getIcon = () => {
                                                    const type = (link.type || link.icon || '').toLowerCase();

                                                    switch (type) {
                                                        case 'website':
                                                        case 'globe':
                                                            return <Globe size={18} />;
                                                        case 'phone':
                                                            return <Phone size={18} />;
                                                        case 'mail':
                                                        case 'email':
                                                            return <Mail size={18} />;
                                                        case 'facebook':
                                                        case 'fb':
                                                            return (
                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                                </svg>
                                                            );
                                                        case 'instagram':
                                                        case 'ig':
                                                            return (
                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                                                </svg>
                                                            );
                                                        case 'linkedin':
                                                            return (
                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                                </svg>
                                                            );
                                                        case 'line':
                                                            return (
                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                                                                </svg>
                                                            );
                                                        case 'youtube':
                                                            return (
                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                                                </svg>
                                                            );
                                                        case 'threads':
                                                            return (
                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                                    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142l-.126 1.974a11.881 11.881 0 0 0-2.588-.12c-1.063.062-1.901.358-2.49.882-.46.409-.703.99-.68 1.632.018.479.226.904.585 1.197.361.295.817.447 1.35.447.076 0 .152-.003.228-.01 1.125-.06 1.94-.48 2.42-1.247.48-.767.667-1.863.556-3.256l-.02-.252c-1.095-.494-2.205-.743-3.3-.743-1.63 0-3.146.506-4.384 1.463-1.238.957-1.922 2.228-1.922 3.576 0 1.348.684 2.619 1.922 3.576 1.238.957 2.754 1.463 4.384 1.463 1.63 0 3.146-.506 4.384-1.463 1.238-.957 1.922-2.228 1.922-3.576 0-.787-.156-1.54-.464-2.237.308-.097.6-.214.875-.35.275-.136.53-.29.765-.463.235-.173.45-.364.645-.573.195-.209.37-.436.525-.681.155-.245.29-.508.405-.789.115-.281.21-.58.285-.897.075-.317.13-.652.165-1.005.035-.353.052-.724.052-1.113 0-.389-.017-.76-.052-1.113-.035-.353-.09-.688-.165-1.005-.075-.317-.17-.616-.285-.897-.115-.281-.25-.544-.405-.789-.155-.245-.33-.472-.525-.681-.195-.209-.41-.4-.645-.573-.235-.173-.49-.327-.765-.463-.275-.136-.567-.253-.875-.35-.308-.097-.632-.174-.972-.231-.34-.057-.697-.086-1.071-.086-.374 0-.731.029-1.071.086-.34.057-.664.134-.972.231-.308.097-.6.214-.875.35-.275.136-.53.29-.765.463-.235.173-.45.364-.645.573-.195.209-.37.436-.525.681-.155.245-.29.508-.405.789-.115.281-.21.58-.285.897-.075.317-.13.652-.165 1.005-.035.353-.052.724-.052 1.113 0 .389.017.76.052 1.113.035.353.09.688.165 1.005.075.317.17.616.285.897.115.281.25.544.405.789.155.245.33.472.525.681.195.209.41.4.645.573.235.173.49.327.765.463.275.136.567.253.875.35z" />
                                                                </svg>
                                                            );
                                                        default:
                                                            return <Globe size={18} />;
                                                    }
                                                };

                                                const getLabel = () => {
                                                    const type = (link.type || link.icon || '').toLowerCase();
                                                    return type.charAt(0).toUpperCase() + type.slice(1);
                                                };

                                                return (
                                                    <a
                                                        key={i}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-bg-dark transition-colors text-gray-400"
                                                        title={getLabel()}
                                                    >
                                                        {getIcon()}
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            onClick={() => setExpanded(!expanded)}
                            className={clsx(
                                "w-full flex items-center justify-center py-2 mt-2 rounded-lg transition-all duration-300 text-sm font-medium",
                                expanded
                                    ? "text-bg-dark bg-primary"
                                    : "text-primary hover:bg-primary/10"
                            )}
                        >
                            {expanded ? '收起' : '完整介紹'}
                            <ChevronDown
                                size={16}
                                className={clsx("ml-1 transition-transform duration-300", expanded ? "rotate-180" : "")}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MemberCard;
