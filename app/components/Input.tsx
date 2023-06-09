import React from 'react'

interface Props {
    inputClassName?: string;
    labelClassName?: string;
    label?: string;
    id?: string;
    name?: string;
    type?: string;
    autoComplete?: string;
    required?: boolean;
    placeholder?: string;
    disabled?: boolean;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    as?: string;
}

const errorInputClassName = "h-10 block w-full rounded-md border border-red-500 pl-3 focus:border-red-500 focus:ring-red-500 sm:text-sm";

export default function Input({
    inputClassName="h-10 block w-full rounded-md border border-gray-200 pl-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
    labelClassName="block text-sm font-medium leading-6 text-gray-900",
    label,
    id,
    name,
    type,
    autoComplete,
    required,
    placeholder,
    disabled,
    value,
    onChange,
    error,
    as
}: Props) {
    return (
        <div>
            <label htmlFor={name} className={labelClassName}>{label}</label>
            <div className="mt-2">
                <input placeholder={placeholder} disabled={disabled} value={value} onChange={onChange} id={id} name={name} type={type} autoComplete={autoComplete} required={required} className={ error ? errorInputClassName : inputClassName} />
            </div>
            {error && <small className="text-red-500">{error}</small>}
        </div>
    )
}
