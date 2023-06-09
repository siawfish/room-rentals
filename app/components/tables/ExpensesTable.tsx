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

export interface Expenses {
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

export default async function ExpensesTable({ expenses }: { expenses: Expenses[] }) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeaderCell>#</TableHeaderCell>
                    <TableHeaderCell>Date</TableHeaderCell>
                    <TableHeaderCell>Description</TableHeaderCell>
                    <TableHeaderCell>Cost</TableHeaderCell>
                    <TableHeaderCell>Added By</TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {expenses.map((guest) => (
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
  