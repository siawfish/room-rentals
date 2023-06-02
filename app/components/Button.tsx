'use client';

import React from 'react'
import { Button } from "@tremor/react";

interface Props {
    className?: string;
    type?: "button"|"submit"|"reset";
    children?: React.ReactNode | string;
    onClick?: () => void;
    isLoading?: boolean;
    disabled?: boolean;
    loadingText?: string;
}

export default function CustomButton({
    className="text-white text-[13px] font-mono bg-black border-none hover:bg-gray-700 transition-all rounded-md w-full h-10 flex items-center justify-center whitespace-nowrap",
    type="submit",
    children="Sign in",
    onClick,
    isLoading,
    disabled,
    loadingText
}:Props) {
    return (
        <Button loadingText={loadingText} loading={isLoading} disabled={isLoading || disabled} onClick={onClick} type={type} className={className}>{children}</Button>
    )
}
