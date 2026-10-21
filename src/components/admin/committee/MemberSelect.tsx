import React from 'react';
import { inputClass, type MemberOption } from './memberOptions';

interface MemberSelectProps {
    value: number | null;
    onChange: (id: number | null) => void;
    options: MemberOption[];
    placeholder: string;
    disabled?: boolean;
    className?: string;
}

const MemberSelect: React.FC<MemberSelectProps> = ({
    value,
    onChange,
    options,
    placeholder,
    disabled,
    className,
}) => {
    const visible = options.filter((o) => o.active || o.id === value);
    return (
        <select
            value={value ?? ''}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
            className={`${inputClass} ${className ?? ''}`}
        >
            <option value="">{placeholder}</option>
            {visible.map((o) => (
                <option key={o.id} value={o.id}>
                    {o.name}
                    {o.active ? '' : '（冷凍）'}
                </option>
            ))}
        </select>
    );
};

export default MemberSelect;
