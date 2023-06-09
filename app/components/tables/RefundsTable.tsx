'use client';

import {
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text,
} from '@tremor/react';

export interface Refunds {
    id: number;
    start_of_residence: string;
    end_of_residence: string;
    guest_first_name: string;
    guest_other_names: string;
    guest_email: string;
    guest_phone_number: string;
    user_first_name: string;
    user_other_names: string;
    room_number: string;
}

export default async function RefundsTable({ refunds }: { refunds: Refunds[] }) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeaderCell>#</TableHeaderCell>
                    <TableHeaderCell>Guest Name</TableHeaderCell>
                    <TableHeaderCell>Phone Number</TableHeaderCell>
                    <TableHeaderCell>Email Address</TableHeaderCell>
                    <TableHeaderCell>Room No.</TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {refunds.map((refund) => (
                    <TableRow key={refund.id}>
                        <TableCell>
                            <Text>{refund?.id}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{`${refund?.guest_first_name} ${refund?.guest_other_names}`}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{refund?.guest_phone_number}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{refund?.guest_email}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{refund?.room_number?? "--"}</Text>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
  