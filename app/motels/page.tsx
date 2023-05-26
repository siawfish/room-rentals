import { Card, Flex, Grid, Metric, Text } from '@tremor/react'
import React from 'react'

export default function Motels() {
    const motels = [
        {
            title: 'Siaw Motel',
            metric: '1,072',
            metricPrev: '856',
        },
        {
            title: 'Kofi Motel',
            metric: '$ 40,598',
            metricPrev: '$ 45,564',
        },
        {
            title: 'Amanor Motel',
            metric: '1,072',
            metricPrev: '856',
        },
        {
            title: 'Kwame Motel',
            metric: '$ 40,598',
            metricPrev: '$ 45,564',
        },
        {
            title: 'Kwabena Motel',
            metric: '1,072',
            metricPrev: '856',
        }
    ]
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Grid className="gap-6" numColsSm={2} numColsLg={4}>
                {motels.map((item) => (
                    <Card key={item.title}>
                        <Flex alignItems="start">
                            <Text>{item.title}</Text>
                        </Flex>
                        <Flex
                            className="space-x-3 truncate"
                            justifyContent="start"
                            alignItems="baseline"
                        >
                            <Metric>{item.metric}</Metric>
                            <Text className="truncate">from {item.metricPrev}</Text>
                        </Flex>
                    </Card>
                ))}
            </Grid>
        </main>
    )
}
