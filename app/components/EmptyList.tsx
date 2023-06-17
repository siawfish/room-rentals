import React from 'react'
import { Text, Flex, Grid, Title } from '@tremor/react';
import Image from 'next/image';
import emptyImage from '../../public/assets/images/no-task.png';

interface EmptyListProps {
    title?: string;
    caption?: string;
    imageSrc?: any;
    children?: React.ReactNode;
}


export default function EmptyList({
    title="No task found",
    caption="Create a new task to get started",
    imageSrc=emptyImage,
    children    
}:EmptyListProps) {
    return (
        <Grid className="gap-4 p-5">
            <Flex className="justify-center mt-5">
                <Image width={100} height={80} src={imageSrc} alt="Empty" />
            </Flex>
            <Title className="text-center">{title}</Title>
            <Text className="text-center">{caption}</Text>
            {children}
        </Grid>
    )
}
