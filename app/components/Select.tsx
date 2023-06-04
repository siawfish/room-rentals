import React from 'react'
import { Dropdown, DropdownItem } from "@tremor/react";

interface SelectProps {
    label: string;
    labelClassName?: string;
    name: string;
    placeholder: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
    value?: string;
    error?: string;
    inputClassName?: string;
    emptyText?: string;
}

const errorInputClassName = "h-10 block w-full rounded-md border border-red-500 pl-3 focus:border-red-500 focus:ring-red-500 sm:text-sm";

export default function Select({
    label,
    labelClassName="block text-sm font-medium leading-6 text-gray-900 mb-2",
    name,
    placeholder,
    inputClassName="h-10 block w-full rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
    options,
    onChange,
    value,
    error,
    emptyText="No options available"
}:SelectProps) {
    return (
        <div>
            <label htmlFor={name} className={labelClassName}>{label}</label>
            <Dropdown
                value={value}
                className={error ? errorInputClassName : inputClassName}
                onValueChange={(value) => onChange(value)}
                placeholder={placeholder}
            >
                {
                    options.length === 0 ? <DropdownItem className="w-full" value="" text={emptyText} /> :
                    options.map((option, index) => (
                        <DropdownItem className="w-full" key={index} value={option.value} text={option.label} />
                    ))
                }
            </Dropdown>
            {error && <small className="text-red-500">{error}</small>}
        </div>
    )
}
