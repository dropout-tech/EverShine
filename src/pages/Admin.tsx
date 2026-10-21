import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { RefreshCw } from 'lucide-react';
import SEO from '../components/common/SEO';
import {
    MainLayoutSkeleton,
    ErrorFallback,
    TopProgressBar,
} from '../components/loading';
import { sanitizeText } from '../lib/sanitize';
import { findReferralMember } from '../lib/referralMember';
import { fetchAdminDashboardBundle, deriveAdminDerivedState } from '../api/dashboard';
import { queryKeys } from '../api/queryKeys';
import AdminOverviewTab from '../components/admin/AdminOverviewTab';
import AdminMembersTab from '../components/admin/AdminMembersTab';
import AdminReferralsTab from '../components/admin/AdminReferralsTab';
import type { ReferralFormState } from '../components/admin/AdminReferralsTab';
import AdminSettingsTab from '../components/admin/AdminSettingsTab';
import AdminHelpBanner from '../components/admin/AdminHelpBanner';
import AdminMemberModal from '../components/admin/AdminMemberModal';
import AdminModuleNav from '../components/admin/AdminModuleNav';
import { resolveAdminRoute, type AdminModuleId } from '../components/admin/adminModules';
import CommitteeModule, { type CommitteeView } from '../components/admin/committee/CommitteeModule';

const createEmptyReferralForm = (): ReferralFormState => ({
    title: '',
    description: '',
    referrer_name: '',
    referee_name: '',
    referrer_id: '',
    referee_id: '',
    referrer_story: '',
    referee_story: '',
    metrics_amount: '洽談中',
    metrics_type: '專案合作',
});

const Admin: React.FC = () => {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [initialLoad, setInitialLoad] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const { module: activeModule, view: activeView } = resolveAdminRoute(searchParams.get('m'), searchParams.get('v'));
    const goTo = (moduleId: AdminModuleId, view?: string) =>
        setSearchParams(() => {
            const next = new URLSearchParams();
            next.set('m', moduleId);
            if (view) next.set('v', view);
            return next;
        });
    const setView = (view: string) =>
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set('m', activeModule.id);
            next.set('v', view);
            return next;
        });
    const [memberSearch, setMemberSearch] = useState('');
    const [homeStats, setHomeStats] = useState({
        referral_count: 0,
        referral_value: 0,
        guest_count: 0,
        month: new Date().toISOString().slice(0, 7),
    });
    const [referralForm, setReferralForm] = useState<ReferralFormState>(createEmptyReferralForm);
    const [editingReferralId, setEditingReferralId] = useState<string | null>(null);
    const [memberModalOpen, setMemberModalOpen] = useState(false);

    const dashboardQuery = useQuery({
        queryKey: queryKeys.admin.dashboard,
        queryFn: fetchAdminDashboardBundle,
        enabled: !!user,
        staleTime: 30_000,
    });

    useEffect(() => {
        if (dashboardQuery.data) setInitialLoad(false);
    }, [dashboardQuery.data]);

    const checkAdmin = useCallback(async () => {
        if (authLoading) return;
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            const { data, error } = await supabase.from('members').select('is_admin').eq('user_id', user.id).single();
            if (error || !data?.is_admin) navigate('/');
        } catch {
            navigate('/');
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        void checkAdmin();
    }, [checkAdmin]);

    const members = (dashboardQuery.data?.members ?? []) as Record<string, unknown>[];
    const referrals = (dashboardQuery.data?.referrals ?? []) as Record<string, unknown>[];

    useEffect(() => {
        const hs = dashboardQuery.data?.homeStats;
        if (hs) {
            setHomeStats({
                month: hs.month,
                referral_count: hs.referral_count,
                referral_value: hs.referral_value,
                guest_count: hs.guest_count,
            });
        }
    }, [dashboardQuery.data?.homeStats]);

    const homeStatsHistory = dashboardQuery.data?.homeStatsHistory ?? [];

    const derived = dashboardQuery.data ? deriveAdminDerivedState(dashboardQuery.data) : null;

    const refetchDashboard = () => queryClient.invalidateQueries({ queryKey: queryKeys.admin.dashboard });

    const saveReferralMutation = useMutation({
        mutationFn: async (payload: { row: Record<string, unknown>; id?: string }) => {
            if (payload.id) {
                const { error } = await supabase.from('referrals').update(payload.row).eq('id', payload.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('referrals').insert(payload.row);
                if (error) throw error;
            }
        },
        onSuccess: (_, v) => {
            alert(v.id ? '引薦案例已更新（前台引薦頁將顯示此內容）' : '引薦案例已新增');
            setReferralForm(createEmptyReferralForm());
            setEditingReferralId(null);
            void queryClient.invalidateQueries({ queryKey: queryKeys.referrals.list });
            void refetchDashboard();
        },
        onError: (e: Error) => alert('儲存失敗: ' + e.message),
    });

    const submitReferralForm = () => {
        const metrics = {
            amount: referralForm.metrics_amount || '洽談中',
            type: referralForm.metrics_type || '專案合作',
        };
        const row = {
            title: sanitizeText(referralForm.title, 200),
            description: sanitizeText(referralForm.description, 500),
            referrer_name: sanitizeText(referralForm.referrer_name, 50),
            referee_name: sanitizeText(referralForm.referee_name, 50),
            referrer_id: referralForm.referrer_id ? Number(referralForm.referrer_id) : null,
            referee_id: referralForm.referee_id ? Number(referralForm.referee_id) : null,
            referrer_story: sanitizeText(referralForm.referrer_story, 4000),
            referee_story: sanitizeText(referralForm.referee_story, 4000),
            metrics,
        };
        if (!row.title || !row.referrer_id || !row.referee_id) {
            alert('請填寫標題與引薦人／被引薦人姓名');
            return;
        }
        saveReferralMutation.mutate({ row, id: editingReferralId || undefined });
    };

    const startEditReferral = (ref: Record<string, unknown>) => {
        const m = ref.metrics && typeof ref.metrics === 'object' ? (ref.metrics as Record<string, string>) : {};
        setEditingReferralId(String(ref.id));
        setReferralForm({
            title: (ref.title as string) || '',
            description: (ref.description as string) || '',
            referrer_name: (ref.referrer_name as string) || '',
            referee_name: (ref.referee_name as string) || '',
            referrer_id: String(findReferralMember(members, ref.referrer_id, ref.referrer_name)?.id ?? ''),
            referee_id: String(findReferralMember(members, ref.referee_id, ref.referee_name)?.id ?? ''),
            referrer_story: (ref.referrer_story as string) || '',
            referee_story: (ref.referee_story as string) || '',
            metrics_amount: m.amount ?? '洽談中',
            metrics_type: m.type ?? '專案合作',
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteReferral = async (id: string) => {
        if (!confirm('確定要刪除這筆引薦單嗎？此動作無法復原。')) return;
        try {
            const { error } = await supabase.from('referrals').delete().eq('id', id);
            if (error) throw error;
            alert('已刪除');
            void queryClient.invalidateQueries({ queryKey: queryKeys.referrals.list });
            void refetchDashboard();
        } catch (e: unknown) {
            alert('刪除失敗: ' + (e instanceof Error ? e.message : String(e)));
        }
    };

    const saveHomeStatsMutation = useMutation({
        mutationFn: async () => {
            const { error } = await supabase.from('homepage_stats').upsert(homeStats, { onConflict: 'month' });
            if (error) throw error;
        },
        onSuccess: () => {
            alert('首頁數據已更新！');
            void refetchDashboard();
            void queryClient.invalidateQueries({ queryKey: queryKeys.homepageStats.history });
        },
        onError: (e: Error) => alert('更新失敗: ' + e.message),
    });

    const filteredMembers = members.filter(
        (m) =>
            String(m.name || '')
                .toLowerCase()
                .includes(memberSearch.toLowerCase()) ||
            String(m.company || '')
                .toLowerCase()
                .includes(memberSearch.toLowerCase()) ||
            String(m.industry || '')
                .toLowerCase()
                .includes(memberSearch.toLowerCase())
    );

    const loading = dashboardQuery.isFetching;
    const dashboardError = dashboardQuery.isError ? (dashboardQuery.error as Error).message : null;

    if (loading && initialLoad && !dashboardQuery.data) {
        return <MainLayoutSkeleton />;
    }

    if (dashboardError && !dashboardQuery.data) {
        return (
            <div className="min-h-dvh pt-24 md:pt-32 pb-24 px-4 container mx-auto flex items-start justify-center">
                <SEO title="管理後台" noindex />
                <ErrorFallback className="max-w-lg w-full mt-8" message={dashboardError} onRetry={() => void dashboardQuery.refetch()} />
            </div>
        );
    }

    const stats = derived?.stats ?? {
        totalMembers: 0,
        totalReferrals: 0,
        totalValue: 0,
        monthlyVisits: 0,
        industryCount: 0,
        completionRate: '0%',
    };
    const recentUpdates = derived?.recentUpdates ?? [];
    const marketingStats = derived?.marketingStats ?? { socialClicks: 0 };
    const admins = derived?.admins ?? [];

    const refreshActive = () => {
        if (activeModule.id === 'committee') {
            void queryClient.invalidateQueries({ queryKey: queryKeys.committee.bundle });
        } else {
            void refetchDashboard();
        }
    };

    return (
        <div className="min-h-dvh pt-24 md:pt-32 pb-24 md:pb-12 px-4 container mx-auto">
            <TopProgressBar active={dashboardQuery.isFetching && !!dashboardQuery.data} />
            <SEO title={`${activeModule.label}｜管理後台`} noindex />
            <AdminMemberModal
                open={memberModalOpen}
                onClose={() => setMemberModalOpen(false)}
                onCreated={() => {
                    void queryClient.invalidateQueries({ queryKey: queryKeys.members.list });
                    void refetchDashboard();
                }}
            />
            <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8">
                <aside className="mb-6 lg:mb-0 lg:sticky lg:top-28 lg:self-start">
                    <div className="mb-4 hidden lg:block">
                        <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary/80">EverShine OS</div>
                        <div className="text-lg font-bold text-white">長輝管理後台</div>
                    </div>
                    <AdminModuleNav active={activeModule.id} onSelect={(id) => goTo(id)} />
                </aside>

                <main className="min-w-0">
                    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="flex flex-wrap items-center gap-3 text-2xl font-bold text-white md:text-3xl">
                                <activeModule.icon className="text-primary" size={24} /> {activeModule.label}
                                <button
                                    type="button"
                                    onClick={refreshActive}
                                    className={`rounded-full p-2 transition-all hover:bg-white/10 ${loading ? 'animate-spin text-primary' : 'text-gray-400'}`}
                                    title="重新整理"
                                >
                                    <RefreshCw size={18} />
                                </button>
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">{activeModule.description}</p>
                        </div>
                        {activeModule.views.length > 1 && (
                            <div className="-mx-4 overflow-x-auto px-4 scrollbar-hide md:mx-0 md:px-0">
                                <div className="flex min-w-max rounded-lg border border-white/10 bg-white/5 p-1 backdrop-blur-sm">
                                    {activeModule.views.map((v) => (
                                        <button
                                            key={v.id}
                                            type="button"
                                            onClick={() => setView(v.id)}
                                            className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-bold transition-colors ${
                                                activeView === v.id ? 'bg-primary text-bg-dark' : 'text-gray-400 hover:text-white'
                                            }`}
                                        >
                                            {v.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {activeModule.id !== 'committee' && <AdminHelpBanner />}

                    <div className="space-y-6">
                        {activeModule.id === 'committee' && user && (
                            <CommitteeModule
                                members={members}
                                view={activeView as CommitteeView}
                                onViewChange={(v) => setView(v)}
                            />
                        )}
                        {activeModule.id === 'members' && activeView === 'overview' && (
                            <AdminOverviewTab stats={stats} recentUpdates={recentUpdates} marketingStats={marketingStats} admins={admins} />
                        )}
                        {activeModule.id === 'members' && activeView === 'list' && (
                            <AdminMembersTab
                                memberSearch={memberSearch}
                                onMemberSearch={setMemberSearch}
                                onAddMember={() => setMemberModalOpen(true)}
                                allMembers={members}
                                filteredMembers={filteredMembers}
                                loading={loading}
                                onRefresh={() => void refetchDashboard()}
                            />
                        )}
                        {activeModule.id === 'referrals' && activeView === 'cases' && (
                            <AdminReferralsTab
                                members={members}
                                referrals={referrals}
                                referralForm={referralForm}
                                onReferralFormChange={setReferralForm}
                                editingReferralId={editingReferralId}
                                onCancelEdit={() => {
                                    setEditingReferralId(null);
                                    setReferralForm(createEmptyReferralForm());
                                }}
                                onSubmitReferral={submitReferralForm}
                                onEditReferral={startEditReferral}
                                onDeleteReferral={handleDeleteReferral}
                            />
                        )}
                        {activeModule.id === 'referrals' && activeView === 'monthly' && (
                            <AdminSettingsTab
                                homeStats={homeStats}
                                onHomeStatsChange={setHomeStats}
                                onSaveHomeStats={() => saveHomeStatsMutation.mutate()}
                                homeStatsHistory={homeStatsHistory}
                            />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Admin;
