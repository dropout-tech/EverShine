import React from 'react';
import { ADMIN_MODULES, type AdminModuleId } from './adminModules';

interface AdminModuleNavProps {
    active: AdminModuleId;
    onSelect: (id: AdminModuleId) => void;
}

const AdminModuleNav: React.FC<AdminModuleNavProps> = ({ active, onSelect }) => (
    <nav aria-label="後台功能選單" className="-mx-4 overflow-x-auto px-4 scrollbar-hide lg:mx-0 lg:overflow-visible lg:px-0">
        <ul className="flex min-w-max gap-2 lg:min-w-0 lg:flex-col">
            {ADMIN_MODULES.map((m) => {
                const Icon = m.icon;
                const isActive = m.id === active;
                return (
                    <li key={m.id}>
                        <button
                            type="button"
                            disabled={m.comingSoon}
                            onClick={() => onSelect(m.id)}
                            aria-current={isActive ? 'page' : undefined}
                            className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors lg:py-3 ${
                                isActive
                                    ? 'border-primary/50 bg-primary/15 text-white ring-1 ring-primary/30'
                                    : m.comingSoon
                                      ? 'cursor-not-allowed border-white/5 bg-white/[0.02] text-gray-600'
                                      : 'border-white/5 bg-white/[0.03] text-gray-300 hover:border-primary/30 hover:bg-white/[0.06] hover:text-white'
                            }`}
                        >
                            <span
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                    isActive ? 'bg-primary text-bg-dark' : 'bg-white/5'
                                }`}
                            >
                                <Icon size={18} />
                            </span>
                            <span className="min-w-0">
                                <span className="block text-sm font-bold">{m.label}</span>
                                <span className="hidden truncate text-xs text-gray-500 lg:block">{m.description}</span>
                            </span>
                            {m.comingSoon && (
                                <span className="ml-auto shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-gray-500 lg:hidden">
                                    規劃中
                                </span>
                            )}
                        </button>
                    </li>
                );
            })}
        </ul>
    </nav>
);

export default AdminModuleNav;
