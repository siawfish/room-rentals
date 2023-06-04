import { Grid } from '@tremor/react'
import React from 'react'
import MotelCard, { MotelType } from '../components/MotelCard'

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
        <Grid className="gap-6 mt-6 mb-6" numCols={2} numColsMd={3} numColsLg={4}>
            {data?.map((item:MotelType) => (
                <MotelCard key={item?.id} motel={item} />
            ))}
        </Grid>
    )
}
