'use client';

import { TableCell, TableRow, Text, TableBody } from '@tremor/react'
import React, { useState } from 'react'
import { formatDistance } from 'date-fns';
import { convertDateStringToDate } from '../../utils/helpers';
import numeral from 'numeral';
import Button from '../Button';
import { Rentals } from './RentalsTable';
import ConfirmPayment from '../ConfirmPayment';
import { toast } from 'react-hot-toast';
import paymentsApiService from '../../../api/payment';

export default function RentalTableRow({ rentals }: { rentals: Rentals[] }) {
    const [confirmPaymentId, setConfirmPaymentId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleConfirmPayment = async (id: number | null) => {
        try {
            setConfirmPaymentId(null)
            setIsLoading(true);
            if (!id) {
                setConfirmPaymentId(null);
                return;
            };
            const selectedRental = rentals?.find((rental) => rental?.id === id);
            await paymentsApiService.addPayment({
                guest_id: Number(selectedRental?.guest_id??1),
                motel_id: Number(selectedRental?.motel_id??1),
                room_id: Number(selectedRental?.room_id),
                amount: Number(selectedRental?.price_of_room),
                service_id: Number(selectedRental?.id),
                added_by: Number(selectedRental?.added_by)
            });
            toast.success('Payment confirmed successfully');
        } catch (error:any) {
            toast.error(error?.response?.data?.data?.join(', ') ?? error?.message ?? 'Something went wrong')
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
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
                            <Button loadingText='Paying...' isLoading={isLoading} onClick={()=>setConfirmPaymentId(rental?.id)} size='xs' >Pay</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

            <ConfirmPayment 
                title={`Confirm Payment For Rental`}
                message={`Are you sure you want to confirm payment for this rental for ${rentals?.find((rental) => rental.id === confirmPaymentId)?.guest_first_name} ${rentals?.find((rental) => rental.id === confirmPaymentId)?.guest_other_names} for the amount GHS${numeral(rentals?.find((rental) => rental.id === confirmPaymentId)?.price_of_room).format("0.00")}? This action will be recorded under the rental history.`}
                open={!!confirmPaymentId}
                onClose={() => setConfirmPaymentId(null)}
                onConfirm={()=>handleConfirmPayment(confirmPaymentId)}
            />
        </>
    )
}
