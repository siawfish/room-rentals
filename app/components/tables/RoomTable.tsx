'use client';

import {
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text,
    Badge,
} from '@tremor/react';
import { useRouter, usePathname } from 'next/navigation';

export interface Room {
    id: number;
    price_of_room: number;
    room_number: string;
    percentage_discount: number;
    state_of_occupancy: number;
    date_of_availability: string;
    added_by: number;
    is_reserved: number;
    created_at: string;
    updated_at: string;
}

export default function RoomsTable({ rooms }: { rooms: Room[] }) {
    const { push } = useRouter();
    const pathname = usePathname();
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeaderCell>Room #</TableHeaderCell>
                    <TableHeaderCell>{`Price (GHS)`}</TableHeaderCell>
                    <TableHeaderCell>{`Discount (%)`}</TableHeaderCell>
                    <TableHeaderCell>Reservations</TableHeaderCell>
                    <TableHeaderCell>Availability</TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rooms.map((room) => (
                    <TableRow key={room.id}>
                        <TableCell className="cursor-pointer" onClick={()=>push(`${pathname}/form?rid=${room?.id}`)}>
                            <Text>{room?.room_number??" -- "}</Text>
                        </TableCell>
                        <TableCell className="cursor-pointer" onClick={()=>push(`${pathname}/form?rid=${room?.id}`)}>
                            <Text>{room?.price_of_room}</Text>
                        </TableCell>
                        <TableCell className="cursor-pointer" onClick={()=>push(`${pathname}/form?rid=${room?.id}`)}>
                            <Text>{room?.percentage_discount}</Text>
                        </TableCell>
                        <TableCell className="cursor-pointer" onClick={()=>push(`${pathname}/form?rid=${room?.id}`)}>
                            <Text>{room?.is_reserved === 1 ? 'Yes' : 'No'}</Text>
                        </TableCell>
                        <TableCell className="cursor-pointer" onClick={()=>push(`${pathname}/form?rid=${room?.id}`)}>
                            <Badge color={room?.state_of_occupancy === 1 ? "red" : "green"}>{room?.state_of_occupancy === 1 ? "Occupied" : "Available"}</Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
  