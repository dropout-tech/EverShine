import { ClipboardList, Handshake, UserPlus, Users, type LucideIcon } from 'lucide-react';

export type AdminModuleId = 'committee' | 'members' | 'referrals' | 'guests';

export interface AdminModuleView {
    id: string;
    label: string;
}

export interface AdminModuleDef {
    id: AdminModuleId;
    label: string;
    description: string;
    icon: LucideIcon;
    views: AdminModuleView[];
    /** 規劃中：顯示在選單但不能點 */
    comingSoon?: boolean;
}

export const ADMIN_MODULES: AdminModuleDef[] = [
    {
        id: 'committee',
        label: '委員會紀錄',
        description: '會議紀錄與會後行動追蹤',
        icon: ClipboardList,
        views: [
            { id: 'meetings', label: '會議紀錄' },
            { id: 'actions', label: '行動追蹤' },
        ],
    },
    {
        id: 'members',
        label: '會員管理',
        description: '會員名單、冷凍與網站總覽',
        icon: Users,
        views: [
            { id: 'list', label: '會員名單' },
            { id: 'overview', label: '網站總覽' },
        ],
    },
    {
        id: 'referrals',
        label: '引薦管理',
        description: '引薦案例與每月成果數字',
        icon: Handshake,
        views: [
            { id: 'cases', label: '引薦案例' },
            { id: 'monthly', label: '每月成果' },
        ],
    },
    {
        id: 'guests',
        label: '來賓跟進',
        description: '規劃中',
        icon: UserPlus,
        views: [],
        comingSoon: true,
    },
];

export const DEFAULT_ADMIN_MODULE: AdminModuleId = 'committee';

export const resolveAdminRoute = (
    moduleParam: string | null,
    viewParam: string | null
): { module: AdminModuleDef; view: string } => {
    const module =
        ADMIN_MODULES.find((m) => m.id === moduleParam && !m.comingSoon) ??
        ADMIN_MODULES.find((m) => m.id === DEFAULT_ADMIN_MODULE)!;
    const view = module.views.find((v) => v.id === viewParam)?.id ?? module.views[0]?.id ?? '';
    return { module, view };
};
