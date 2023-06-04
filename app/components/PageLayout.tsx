import { Button, Text, Title } from '@tremor/react'
import React from 'react'
import Search from './Search'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface PageLayoutProps {
    children: React.ReactNode;
    title: string;
    caption: string;
    btnLabel: string;
    btnLink: string;
    searchPlaceholder: string;
}

export default function PageLayout({
    children,
    title,
    caption,
    btnLabel,
    btnLink,
    searchPlaceholder
}:PageLayoutProps) {
    const pathname = usePathname();
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            {
                (pathname?.split('/')?.pop()??'') !== "form" &&
                <div className="flex flex-row justify-between">
                    <div className="w-full">
                        <Title className="capitalize">{(pathname?.split('/')?.filter(Boolean)?.length??0) === 2 ? 'Dashboard' : title}</Title>
                        <Text>{(pathname?.split('/')?.filter(Boolean)?.length??0) === 2 ? 'Metrics Summary' : caption}</Text>
                        {
                            (pathname?.split('/')?.filter(Boolean)?.length??0) > 2 && 
                            <Search placeholder={searchPlaceholder} />
                        }
                    </div>
                    {
                        (pathname?.split('/')?.filter(Boolean)?.length??0) > 2 && 
                        <Link href={btnLink}>
                            <Button className="hidden md:block text-white  capitalize text-[13px] font-mono bg-black hover:bg-gray-700 transition-all rounded-md w-[150px] h-10 flex items-center justify-center whitespace-nowrap"> + Add {btnLabel} </Button>
                        </Link>
                    }
                </div>
            }
            {children}
            {
                (pathname?.split('/')?.filter(Boolean)?.length??0) > 2 && (pathname?.split('/')?.pop()??'') !== "form" &&
                <div className="md:hidden absolute left-0 w-full flex flex-row align-center justify-center">
                    <Link href={btnLink}>
                        <Button className="text-white capitalize text-[13px] font-mono bg-black hover:bg-gray-700 transition-all rounded-md w-[150px] h-10 flex items-center justify-center whitespace-nowrap"> + Add {btnLabel} </Button>
                    </Link>
                </div>
            }
        </main>
    )
}
