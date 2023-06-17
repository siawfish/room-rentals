import {
    Table,
    TableHead,
    TableRow,
    TableHeaderCell
} from '@tremor/react';
import RentalTableRow from './RentalTableRow';

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
    motel_id?: number;
    room_id?: number;
    guest_id?: number;
}

export default function GuestTable({ rentals=[] }: { rentals: Rentals[] }) {

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
                    <TableHeaderCell></TableHeaderCell>
                </TableRow>
            </TableHead>
            <RentalTableRow rentals={rentals} />
        </Table>
    );
}
  