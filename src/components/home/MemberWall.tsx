import React, { useState } from 'react';
import { useMembers } from '../../hooks/useMembers';
import { resolveMemberPhotoObjectPosition } from '../../lib/memberPhotoPosition';
import { motion } from 'framer-motion';

const MemberThumbnail: React.FC<{ photo: string, name: string, industry: string, photoPosition?: string }> = ({ photo, name, industry, photoPosition }) => {
    // Helper to get normalized/secure URL
    const getPhotoUrl = (p: string) => {
        if (!p) return '/images/assets/logo/白色正方形logo.png';
        const cleanP = p.trim();
        if (cleanP.startsWith('http')) return cleanP;
        return cleanP.startsWith('/') ? cleanP : `/${cleanP}`;
    };

    const [imgSrc, setImgSrc] = useState(getPhotoUrl(photo));

    // Reactive update
    React.useEffect(() => {
        setImgSrc(getPhotoUrl(photo));
    }, [photo]);

    return (
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 mx-4 relative group cursor-pointer border-2 border-transparent hover:border-primary/50 transition-all duration-300">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-300 z-10" />
            <img
                src={imgSrc}
                alt={name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ objectPosition: resolveMemberPhotoObjectPosition(photoPosition) }}
                onError={() => setImgSrc('/images/assets/logo/白色正方形logo.png')}
            />
            {/* Name and Industry overlay on hover */}
            <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 p-2">
                <span className="text-white text-sm md:text-base font-bold tracking-widest leading-tight drop-shadow-md text-center mb-1">{name}</span>
                <span className="text-primary-300 text-[10px] md:text-xs font-medium tracking-wide bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/10">{industry}</span>
            </div>
        </div>
    );
};

const MarqueeRow: React.FC<{ children: React.ReactNode, direction?: 'left' | 'right', speed?: number }> = ({ children, direction = 'left', speed = 20 }) => {
    return (
        <div className="flex overflow-hidden py-4 select-none">
            <motion.div
                className="flex items-center"
                initial={{ x: direction === 'left' ? '0%' : '-50%' }}
                animate={{ x: direction === 'left' ? '-50%' : '0%' }}
                transition={{ repeat: Infinity, ease: "linear", duration: speed }}
            >
                {children}
                {children}
                {children}
                {children}
            </motion.div>
        </div>
    );
}

const MemberWall: React.FC = () => {
    const { members, loading } = useMembers();

    if (loading) return <div className="py-20 text-center text-gray-500">Loading Members...</div>;
    if (!members.length) return null;

    // Filter out valid members with photos first if possible, or just used all
    const validMembers = members.filter(m => m.name !== '系統管理員');

    const chunkSize = Math.ceil(validMembers.length / 3);
    const row1 = validMembers.slice(0, chunkSize);
    const row2 = validMembers.slice(chunkSize, chunkSize * 2);
    const row3 = validMembers.slice(chunkSize * 2);

    return (
        <section className="min-h-screen flex flex-col justify-center py-16 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-primary/5 blur-[100px] -z-10 rounded-full"></div>

            <div className="text-center mb-12 relative z-10">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-3">我們的會員</h2>
                <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-3"></div>
                <p className="text-gray-400 text-lg tracking-wide">匯聚 50+ 位各行各業的菁英</p>
            </div>

            <div className="relative w-full max-w-[1920px] mx-auto mask-linear-gradient">
                <MarqueeRow speed={50}>
                    <div className="flex">
                        {row1.map(m => <MemberThumbnail key={m.id} photo={m.photo} name={m.name} industry={m.industry} photoPosition={m.photoPosition} />)}
                    </div>
                </MarqueeRow>

                <MarqueeRow direction="right" speed={55}>
                    <div className="flex">
                        {row2.map(m => <MemberThumbnail key={m.id} photo={m.photo} name={m.name} industry={m.industry} photoPosition={m.photoPosition} />)}
                    </div>
                </MarqueeRow>

                <MarqueeRow speed={60}>
                    <div className="flex">
                        {row3.map(m => <MemberThumbnail key={m.id} photo={m.photo} name={m.name} industry={m.industry} photoPosition={m.photoPosition} />)}
                    </div>
                </MarqueeRow>
            </div>
        </section>
    );
};

export default MemberWall;
