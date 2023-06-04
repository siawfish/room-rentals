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

export interface Guests {
    id: number;
    first_name: string;
    other_names: string;
    phone_number: string;
    email?: string;
    advert?: string;
    added_by: number;
    created_at: string;
    updated_at: string;
}

export default async function GuestTable({ guests }: { guests: Guests[] }) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeaderCell>#</TableHeaderCell>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Phone Number</TableHeaderCell>
                    <TableHeaderCell>Email Address</TableHeaderCell>
                    <TableHeaderCell>Advert</TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {guests.map((guest) => (
                    <TableRow key={guest.id}>
                        <TableCell>
                            <Text>{guest?.id}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{`${guest?.first_name} ${guest?.other_names}`}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{guest?.phone_number}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{guest?.email}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{guest?.advert?? "--"}</Text>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
  