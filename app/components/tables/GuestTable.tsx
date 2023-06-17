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
import Button from '../Button';
import { useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import guestsApiService from '../../../api/guest';

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

export default function GuestTable({ guests }: { guests: Guests[] }) {
    const { push, refresh } = useRouter();
    const pathname = usePathname();

    const checkout = async (id: number) => {
        try {
            toast.loading('Checking out guest...', {id: 'checkout'});
            await guestsApiService.checkoutGuest(id?.toString()??"");
            toast.success('Guest checked out successfully', {id: 'checkout'});
            refresh();
        } catch (error) {
            toast.error('Error checking out guest', {id: 'checkout'});
        }
    }
    
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeaderCell>#</TableHeaderCell>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Phone Number</TableHeaderCell>
                    <TableHeaderCell>Email Address</TableHeaderCell>
                    <TableHeaderCell>Advert</TableHeaderCell>
                    <TableHeaderCell></TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {guests.map((guest) => (
                    <TableRow key={guest.id}>
                        <TableCell className="cursor-pointer" onClick={()=>push(`${pathname}/form?gid=${guest?.id}`)}>
                            <Text>{guest?.id}</Text>
                        </TableCell>
                        <TableCell className="cursor-pointer" onClick={()=>push(`${pathname}/form?gid=${guest?.id}`)}>
                            <Text>{`${guest?.first_name} ${guest?.other_names}`}</Text>
                        </TableCell>
                        <TableCell className="cursor-pointer" onClick={()=>push(`${pathname}/form?gid=${guest?.id}`)}>
                            <Text>{guest?.phone_number}</Text>
                        </TableCell>
                        <TableCell className="cursor-pointer" onClick={()=>push(`${pathname}/form?gid=${guest?.id}`)}>
                            <Text>{guest?.email}</Text>
                        </TableCell>
                        <TableCell className="cursor-pointer" onClick={()=>push(`${pathname}/form?gid=${guest?.id}`)}>
                            <Text>{guest?.advert?? "--"}</Text>
                        </TableCell>
                        <TableCell>
                            <Button onClick={()=>checkout(guest?.id)}>
                                Checkout
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
  