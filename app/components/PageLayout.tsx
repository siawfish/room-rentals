'use client';

import { Button, Text, Title } from '@tremor/react'
import React from 'react'
import Search from './Search'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { convertFromPluralToSingular } from '../utils/helpers';

interface PageLayoutProps {
    children: React.ReactNode;
}


export default function PageLayout({
    children
}:PageLayoutProps) {
    const pathname = usePathname();
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            {
                (pathname?.split('/')?.pop()??'') !== "form" &&
                <div className="flex flex-row justify-between">
                    <div className="w-full">
                        <Title className="capitalize">{(pathname?.split('/')?.filter(Boolean)?.length??0) === 2 ? 'Dashboard' : pathname?.split('/').pop()??""}</Title>
                        <Text>{(pathname?.split('/')?.filter(Boolean)?.length??0) === 2 ? 'Metrics Summary' : `View and manage ${pathname?.split('/')?.pop()??""}`}</Text>
                        {
                            (pathname?.split('/')?.filter(Boolean)?.length??0) > 2 && 
                            <Search placeholder={`Search ${pathname?.split('/')?.pop()??""}`} />
                        }
                    </div>
                    {
                        (pathname?.split('/')?.filter(Boolean)?.length??0) > 2 && (pathname?.split('/')?.pop()??'') !== "form" && (pathname?.split('/')?.pop()??'') !== "payments" && (pathname?.split('/')?.pop()??'') !== "refunds" &&
                        <Link href={`${pathname}/form`}>
                            <Button className="hidden md:block text-white  capitalize text-[13px] font-mono bg-black hover:bg-gray-700 transition-all rounded-md w-[150px] h-10 flex items-center justify-center whitespace-nowrap"> + Add {convertFromPluralToSingular(pathname?.split('/')?.pop()??"")} </Button>
                        </Link>
                    }
                </div>
            }
            {children}
            {
                (pathname?.split('/')?.filter(Boolean)?.length??0) > 2 && (pathname?.split('/')?.pop()??'') !== "form" && (pathname?.split('/')?.pop()??'') !== "payments" && (pathname?.split('/')?.pop()??'') !== "refunds" &&
                <div className="md:hidden absolute left-0 w-full flex flex-row align-center justify-center">
                    <Link href={`${pathname}/form`}>
                        <Button className="text-white capitalize text-[13px] font-mono bg-black hover:bg-gray-700 transition-all rounded-md w-[150px] h-10 flex items-center justify-center whitespace-nowrap"> + Add {convertFromPluralToSingular(pathname?.split('/')?.pop()??"")} </Button>
                    </Link>
                </div>
            }
        </main>
    )
}
