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

export default async function RoomsTable({ rooms }: { rooms: Room[] }) {
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
                        <TableCell>
                            <Text>{room?.room_number??" -- "}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{room?.price_of_room}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{room?.percentage_discount}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{room?.is_reserved === 1 ? 'Yes' : 'No'}</Text>
                        </TableCell>
                        <TableCell>
                            <Badge color={room?.state_of_occupancy === 1 ? "red" : "green"}>{room?.state_of_occupancy === 1 ? "Occupied" : "Available"}</Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
  