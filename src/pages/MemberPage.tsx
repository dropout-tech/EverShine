import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2 } from 'lucide-react';
import { useMembers } from '../hooks/useMembers';
import { buildMemberSlug, resolveMemberFromSlug } from '../lib/memberSlug';
import SEO from '../components/common/SEO';
import { CardSkeleton, EmptyState } from '../components/loading';
import MemberDetailBody from '../components/members/MemberDetailBody';
import { siteConfig } from '../config/site.config';
import { splitIntro } from '../lib/memberIntroSplit';

const MemberPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { members, loading, error } = useMembers();

    const member = React.useMemo(
        () => resolveMemberFromSlug(slug || '', members),
        [slug, members]
    );

    if (loading) {
        return (
            <div className="min-h-dvh pt-28 pb-24 md:pt-32 md:pb-12 px-4 container mx-auto max-w-5xl">
                <CardSkeleton className="w-full" />
            </div>
        );
    }

    if (error || !member) {
        return (
            <div className="min-h-dvh pt-28 pb-24 md:pt-32 md:pb-12 px-4 container mx-auto max-w-2xl">
                <SEO title="找不到會員" noindex />
                <div className="text-center">
                    <EmptyState
                        title="找不到此會員"
                        description={error || '此會員可能已不在分會在籍名單中，或網址有誤。'}
                        action={
                            <button
                                type="button"
                                onClick={() => navigate('/members')}
                                className="px-6 py-2.5 bg-primary text-bg-dark rounded-full hover:bg-primary/90 transition-colors font-bold inline-flex items-center gap-2"
                            >
                                <ArrowLeft size={16} /> 返回會員名錄
                            </button>
                        }
                        className="border-white/10 bg-white/[0.03]"
                    />
                </div>
            </div>
        );
    }

    // 為個別會員頁產出針對性的 SEO 內容
    const { main: introMain } = splitIntro(member.fullIntro || '');
    const cleanDescription = (
        member.shortIntro ||
        introMain ||
        member.fullIntro ||
        `${member.name} | ${member.industry || ''} | ${member.company || ''} — BNI 長輝白金分會會員。`
    )
        .replace(/\\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 200);

    const titleText = `${member.name}｜${member.industry || '會員'}｜${siteConfig.branchFullName}`;

    const personSchema: Record<string, unknown> = {
        '@type': 'Person',
        name: member.name,
        jobTitle: member.position || member.title || undefined,
        worksFor: member.company
            ? { '@type': 'Organization', name: member.company }
            : undefined,
        memberOf: {
            '@type': 'Organization',
            '@id': `${siteConfig.siteUrl}/#organization`,
            name: siteConfig.branchFullName,
            url: siteConfig.siteUrl,
        },
        description: cleanDescription,
        image: member.photo
            ? member.photo.startsWith('http')
                ? member.photo
                : `${siteConfig.siteUrl}${member.photo.startsWith('/') ? '' : '/'}${member.photo}`
            : undefined,
    };

    const handleShare = async () => {
        const shareData = {
            title: titleText,
            text: cleanDescription,
            url: window.location.href,
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
                return;
            }
            await navigator.clipboard.writeText(window.location.href);
            alert('連結已複製！');
        } catch {
            // 使用者取消或不支援，靜默
        }
    };

    return (
        <div className="min-h-dvh pt-28 pb-24 md:pt-32 md:pb-16 px-4 container mx-auto max-w-5xl">
            <SEO
                title={titleText}
                description={cleanDescription}
                keywords={[
                    member.name,
                    member.industry,
                    member.company,
                    member.category,
                    'BNI',
                    siteConfig.branchFullName,
                ]
                    .filter(Boolean)
                    .join(', ')}
                breadcrumbs={[
                    { name: '會員介紹', path: '/members' },
                    { name: member.name, path: `/member/${buildMemberSlug(member)}` },
                ]}
                ogImage={member.photo && !member.photo.startsWith('http') ? member.photo : undefined}
                structuredData={personSchema}
            />

            <div className="mb-5 flex items-center justify-between gap-3">
                <Link
                    to="/members"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={16} /> 返回會員名錄
                </Link>
                <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:border-sky-400/40 hover:bg-sky-500/10"
                >
                    <Share2 size={14} />
                    分享此頁
                </button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-2xl"
            >
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 1px 1px, rgba(59,130,246,0.12) 1px, transparent 0)',
                        backgroundSize: '26px 26px',
                    }}
                    aria-hidden
                />

                <div className="relative z-10 px-4 py-6 sm:px-8 sm:py-8">
                    {/* H1：給 SEO 與盲人讀屏，視覺上靠 MemberDetailBody 內的姓名顯示 */}
                    <h1 className="sr-only">
                        {member.name} — {member.industry || siteConfig.branchFullName}
                    </h1>
                    <MemberDetailBody member={member} expanded />
                </div>
            </motion.div>
        </div>
    );
};

export default MemberPage;
