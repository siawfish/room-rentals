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
import { formatDistance } from 'date-fns';
import { convertDateStringToDate } from '../../utils/helpers';

export interface Payments {
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

export default async function PaymentsTable({ payments }: { payments: Payments[] }) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeaderCell>#</TableHeaderCell>
                    <TableHeaderCell>Guest Name</TableHeaderCell>
                    <TableHeaderCell>Phone Number</TableHeaderCell>
                    <TableHeaderCell>Email Address</TableHeaderCell>
                    <TableHeaderCell>Room No.</TableHeaderCell>
                    <TableHeaderCell>Check-Out</TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {payments.map((guest) => (
                    <TableRow key={guest.id}>
                        <TableCell>
                            <Text>{guest?.id}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{`${guest?.guest_first_name} ${guest?.guest_other_names}`}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{guest?.guest_phone_number}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{guest?.guest_email}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{guest?.room_number?? "--"}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{formatDistance(new Date(), convertDateStringToDate(guest?.end_of_residence))}</Text>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
  