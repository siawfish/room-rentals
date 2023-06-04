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
import numeral from 'numeral';
import Button from '../Button';

export interface Rentals {
    id: number;
    guest_first_name: string;
    guest_other_names: string;
    phone_number: string;
    end_of_residence: string;
    email?: string;
    advert?: string;
    added_by: number;
    created_at: string;
    updated_at: string;
    price_of_room: number;
}

export default async function GuestTable({ rentals=[] }: { rentals: Rentals[] }) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeaderCell>#</TableHeaderCell>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Phone Number</TableHeaderCell>
                    <TableHeaderCell>Email Address</TableHeaderCell>
                    <TableHeaderCell>Check-Out</TableHeaderCell>
                    <TableHeaderCell>{`Amount (GHS)`}</TableHeaderCell>
                    <TableHeaderCell></TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rentals?.map((rental) => (
                    <TableRow key={rental.id}>
                        <TableCell>
                            <Text>{rental?.id}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{`${rental?.guest_first_name} ${rental?.guest_other_names}`}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{rental?.phone_number}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{rental?.email}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{formatDistance(new Date(), convertDateStringToDate(rental?.end_of_residence))}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{numeral(rental?.price_of_room).format('0,00.00')}</Text>
                        </TableCell>
                        <TableCell>
                            <Button size='xs' >Pay</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
  