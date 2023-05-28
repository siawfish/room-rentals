import React from 'react'

interface Props {
    className?: string;
    type?: "button"|"submit"|"reset";
    children?: React.ReactNode | string;
    onClick?: () => void;
    isLoading?: boolean;
    disabled?: boolean;
}

export default function Button({
    className="w-full text-white text-[13px] font-mono bg-black hover:bg-gray-700 transition-all rounded-md w-[220px] h-10 flex items-center justify-center whitespace-nowrap",
    type="submit",
    children="Sign in",
    onClick,
    isLoading,
    disabled
}:Props) {
    return (
        <button disabled={isLoading || disabled} onClick={onClick} type={type} className={className}>{children}</button>
    )
}
