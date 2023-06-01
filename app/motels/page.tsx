import { Grid, Text, Title, Flex } from '@tremor/react'
import React from 'react'
import Search from '../components/Search'
import MotelCard, { MotelType } from '../components/MotelCard'
import Button from '../components/Button';
import Link from 'next/link';

async function getData() {
    const res = await fetch(`${process.env.BASE_URL}/api/get/motels`, {
        cache: 'no-cache'
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default async function Motels() {
    const data = await getData();
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Flex>
                <div>
                    <Title>Motels</Title>
                    <Text>
                        Click on a motel to view and manage its rooms.
                    </Text>
                    <Search placeholder="Search motel by name..." />
                </div>
                <Link href="/motels/form">
                    <Button className="hidden md:block text-white text-[13px] font-mono bg-black hover:bg-gray-700 transition-all rounded-md w-[150px] h-10 flex items-center justify-center whitespace-nowrap"> + Add Motel </Button>
                </Link>
            </Flex>
            <Grid className="gap-6 mt-6 mb-6" numCols={2} numColsMd={3} numColsLg={4}>
                {data?.map((item:MotelType) => (
                    <MotelCard key={item?.id} motel={item} />
                ))}
            </Grid>
            <div className="md:hidden absolute left-0 w-full flex flex-row align-center justify-center">
                <Link href="/motels/form">
                    <Button className="text-white text-[13px] font-mono bg-black hover:bg-gray-700 transition-all rounded-md w-[150px] h-10 flex items-center justify-center whitespace-nowrap"> + Add Motel </Button>
                </Link>
            </div>
        </main>
    )
}
