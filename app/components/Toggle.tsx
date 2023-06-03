import React from 'react'
import { Toggle, ToggleItem } from "@tremor/react";

interface Props {
    options?: {label:string, value:string}[];
    defaultValue?: string;
    onValueChange?: (value:string) => void;
    label?: string;
}

export default function SwitchToggle({
    options=[],
    defaultValue="1",
    onValueChange=(value:string) => console.log(value),
    label
}:Props) {
    return (
        <div>
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">{label}</label>
            <Toggle
                color="zinc"
                defaultValue={defaultValue}
                onValueChange={onValueChange}
            >
                {
                    options.map((item, index) => (
                        <ToggleItem key={index} value={item?.value} text={item?.label} />
                    ))
                }
            </Toggle>
        </div>
    )
}
