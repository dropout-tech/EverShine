import React, { useMemo, useState } from 'react';
import { Search, UserMinus, X } from 'lucide-react';
import { inputClass, type MemberOption } from './memberOptions';

interface AbsenteePickerProps {
    value: number[];
    onChange: (ids: number[]) => void;
    options: MemberOption[];
    readOnly: boolean;
}

const AbsenteePicker: React.FC<AbsenteePickerProps> = ({ value, onChange, options, readOnly }) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const selected = useMemo(() => new Set(value), [value]);
    const byId = useMemo(() => new Map(options.map((o) => [o.id, o])), [options]);

    const toggle = (id: number) =>
        onChange(selected.has(id) ? value.filter((v) => v !== id) : [...value, id]);

    const candidates = options.filter((o) => (o.active || selected.has(o.id)) && o.name.includes(query.trim()));

    return (
        <div>
            <div className="flex flex-wrap items-center gap-2">
                {value.length === 0 && <span className="text-sm text-gray-500">無人請假</span>}
                {value.map((id) => (
                    <span
                        key={id}
                        className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm text-white"
                    >
                        {byId.get(id)?.name ?? `#${id}`}
                        {!readOnly && (
                            <button
                                type="button"
                                onClick={() => toggle(id)}
                                className="text-gray-400 hover:text-white"
                                aria-label="移除"
                            >
                                <X size={13} />
                            </button>
                        )}
                    </span>
                ))}
                {!readOnly && (
                    <button
                        type="button"
                        onClick={() => setOpen(!open)}
                        className="inline-flex items-center gap-1 rounded-full border border-dashed border-white/20 px-3 py-1 text-sm text-gray-300 hover:border-primary/50 hover:text-primary"
                    >
                        <UserMinus size={14} /> {open ? '完成' : '選擇請假者'}
                    </button>
                )}
            </div>

            {open && !readOnly && (
                <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3">
                    <div className="relative mb-3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="搜尋姓名"
                            className={`${inputClass} pl-9`}
                        />
                    </div>
                    <div className="grid max-h-56 grid-cols-3 gap-1.5 overflow-y-auto sm:grid-cols-5 lg:grid-cols-6 [scrollbar-width:thin]">
                        {candidates.map((o) => {
                            const on = selected.has(o.id);
                            return (
                                <button
                                    key={o.id}
                                    type="button"
                                    onClick={() => toggle(o.id)}
                                    className={`truncate rounded-lg px-2 py-1.5 text-sm transition-colors ${
                                        on
                                            ? 'bg-primary font-bold text-bg-dark'
                                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                    }`}
                                >
                                    {o.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AbsenteePicker;
