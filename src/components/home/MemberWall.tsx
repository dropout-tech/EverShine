import React, { useEffect, useRef, useState } from 'react';
import { useMembers } from '../../hooks/useMembers';
import { memberPhotoFallback, memberPhotoSrc } from '../../lib/memberPhoto';

const MemberThumbnail: React.FC<{ photo: string, name: string, industry: string, photoPosition?: string, decorative?: boolean }> = ({ photo, name, industry, photoPosition, decorative }) => {
    const thumb = memberPhotoSrc(photo, 'thumb');
    const [imgSrc, setImgSrc] = useState(thumb);

    useEffect(() => {
        setImgSrc(memberPhotoSrc(photo, 'thumb'));
    }, [photo]);

    return (
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 mx-4 relative group border-2 border-transparent hover:border-primary/50 transition-colors duration-300">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-300 z-10" />
            <img
                src={imgSrc}
                alt={decorative ? '' : name}
                width={128}
                height={128}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ objectPosition: photoPosition || 'center 20%' }}
                onError={() => setImgSrc(memberPhotoFallback(imgSrc, photo))}
            />
            {!decorative && (
                <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 p-2">
                    <span className="text-white text-sm md:text-base font-bold tracking-widest leading-tight drop-shadow-md text-center mb-1">{name}</span>
                    <span className="text-primary-300 text-[10px] md:text-xs font-medium tracking-wide bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/10">{industry}</span>
                </div>
            )}
        </div>
    );
};

const MemberRow: React.FC<{ members: { id: number, photo: string, name: string, industry: string, photoPosition?: string }[], copy?: boolean }> = ({ members, copy }) => (
    <div className="flex" aria-hidden={copy || undefined}>
        {members.map(member => (
            <MemberThumbnail
                key={copy ? `${member.id}-copy` : member.id}
                photo={member.photo}
                name={member.name}
                industry={member.industry}
                photoPosition={member.photoPosition}
                decorative={copy}
            />
        ))}
    </div>
);

const MarqueeRow: React.FC<{ members: { id: number, photo: string, name: string, industry: string, photoPosition?: string }[], direction?: 'left' | 'right', duration?: number, paused: boolean }> = ({ members, direction = 'left', duration = 50, paused }) => {
    if (!members.length) return null;
    return (
        <div className="overflow-hidden py-4">
            <div
                className={`marquee-track ${paused ? 'is-paused' : ''}`}
                data-direction={direction}
                style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
            >
                <MemberRow members={members} />
                <MemberRow members={members} copy />
            </div>
        </div>
    );
};

const MemberWall: React.FC = () => {
    const { members, loading } = useMembers();
    const sectionRef = useRef<HTMLElement>(null);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section || !('IntersectionObserver' in window)) return;
        const observer = new IntersectionObserver(
            ([entry]) => setPaused(!entry.isIntersecting),
            { rootMargin: '120px' }
        );
        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    if (loading) return <div className="py-20 text-center text-gray-500">載入會員中…</div>;
    if (!members.length) return null;

    const validMembers = members.filter(member => member.name !== '系統管理員');
    const chunkSize = Math.ceil(validMembers.length / 3);
    const row1 = validMembers.slice(0, chunkSize);
    const row2 = validMembers.slice(chunkSize, chunkSize * 2);
    const row3 = validMembers.slice(chunkSize * 2);

    return (
        <section ref={sectionRef} className="min-h-screen flex flex-col justify-center py-16 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-primary/5 blur-[100px] -z-10 rounded-full"></div>

            <div className="text-center mb-12 relative z-10">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-3">我們的會員</h2>
                <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-3"></div>
                <p className="text-gray-400 text-lg tracking-wide">匯聚 50+ 位各行各業的菁英</p>
            </div>

            <div className="relative w-full max-w-[1920px] mx-auto mask-linear-gradient">
                <MarqueeRow members={row1} duration={50} paused={paused} />
                <MarqueeRow members={row2} direction="right" duration={55} paused={paused} />
                <MarqueeRow members={row3} duration={60} paused={paused} />
            </div>
        </section>
    );
};

export default MemberWall;
