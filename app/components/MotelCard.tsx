import { Card, Flex, Metric, Text, Title } from '@tremor/react'
import React from 'react'
import { format } from 'date-fns'
import Link from 'next/link'
import Edit from '../../public/assets/icons/edit.png'
import Image from 'next/image'
import LinkButton from './LinkButton'

export interface MotelType {
    id: number
    motel_name: string
    location: string
    created_at: string
    updated_at: string
}

interface Props {
    motel?: MotelType;
}

export default function MotelCard({
    motel,
}:Props) {
    return (
        <Link href={`/motels/${motel?.id}`}>
            <Card className="p-3 md:p-5 relative">
                <Link className="hidden absolute right-4 md:block" href={`/motels/form?id=${motel?.id}`}>
                    <Image width={25} height={25} src={Edit} alt="motel" />
                </Link>
                <Flex alignItems="start">
                    <Text>{motel?.location}</Text>
                </Flex>
                <Flex
                    className="truncate"
                    justifyContent="start"
                    alignItems="baseline"
                >
                    <Metric className="hidden md:block">{motel?.motel_name}</Metric>
                    <Title className="md:hidden block text-left">{motel?.motel_name}</Title>
                </Flex>
                <Flex alignItems="start" className="hidden md:block mt-2">
                    <Text className="truncate">Created on {format(new Date (motel?.created_at??""), "dd-MM-yyy")}</Text>
                </Flex>
                <Flex alignItems="start" className="md:hidden mt-2">
                    <Link href={`/motels/form?id=${motel?.id}`}>
                        <LinkButton className="text-xs" label="Edit" />
                    </Link>
                </Flex>
            </Card>
        </Link>
    )
}
