'use client';

import { Form, Formik } from 'formik'
import React, { useState, useEffect } from 'react'
import Button from '../Button'
import * as Yup from 'yup'
import { toast } from 'react-hot-toast';
import { useRouter, useParams } from 'next/navigation';
import { convertRouteToString } from '../../utils/helpers';
import { useSession } from 'next-auth/react';
import rentalsApiService from '../../../api/rental';
import SwitchToggle from '../Toggle';
import Select from '../Select';
import { DateRange } from '../DateRangePicker';
import guestsApiService from '../../../api/guest';
import roomsApiService from '../../../api/room';
import { format } from 'date-fns';
import { RoomsDTO } from './RoomsForm';

export interface RentalDTO {
    room_id?: number;
    start_of_residence: string | Date;
    end_of_residence?: string | Date;
    added_by?: number;
    motel_id?: number;
    guest_id?: number;
    is_reservation?: 0 | 1;
    duration_extended?: unknown;
    duration_reduced?: unknown;
    cost_of_service?: number;
}

const validationSchema = Yup.object().shape({
    start_of_residence: Yup.string().required('Required'),
    end_of_residence: Yup.string().required('Required'),
    is_reservation: Yup.number().required('Required'),
    guest_id: Yup.number().required('Required'),
    room_id: Yup.number().required('Required')
});

const initialValues:RentalDTO = {
    start_of_residence: '',
    is_reservation: 0,
    end_of_residence: '',
    guest_id: undefined,
    room_id: undefined
};

const STATUSES = [
    {label: 'Yes', value: '1'},
    {label: 'No', value: '0'},
];

export default function GuestsForm() {
    const router = useRouter();
    const params = useParams();
    const { data:session } = useSession();
    const user = session?.user;
    const id = params?.id??"";
    const [isLoading, setIsLoading] = useState(true);

    const [guests, setGuests] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [roomRawData, setRoomRawData] = useState<RoomsDTO[]>();


    const fetchRooms = async () => {
        try {
            const { data } = await roomsApiService.getRooms(convertRouteToString(id));
            const formattedData = data?.map((item:any) => {
                if(item?.is_reserved) return null;
                return {
                    label: item?.room_number,
                    value: item?.id?.toString()
                }
            }).filter((item:any) => item !== null);
            setRoomRawData(data);
            setRooms(formattedData);
        } catch (error:any) {
            toast.error(error?.response?.data?.data?.join(', ') ?? error?.message ?? 'Something went wrong')
        }
    };


    const fetchGuests = async () => {
        try {
            const { data } = await guestsApiService.getGuests(convertRouteToString(id));
            const formattedData = data?.map((item:any) => ({
                label: `${item?.first_name} ${item?.other_names}`,
                value: item?.id?.toString()
            }));
            setGuests(formattedData);
        } catch (error:any) {
            toast.error(error?.response?.data?.data?.join(', ') ?? error?.message ?? 'Something went wrong')
        }
    };

    useEffect(() => {
        Promise.all([fetchGuests(), fetchRooms()])
        .then(() => setIsLoading(false))
    }, []);

    const onSubmit = async (values:RentalDTO, { setSubmitting, resetForm }:any) => {
        try {
            await rentalsApiService.recordRental({
                ...values,
                // @ts-ignore
                added_by: user?.id,
                motel_id: Number(convertRouteToString(id)),
                cost_of_service: roomRawData?.find((item:any) => item?.id === Number(values?.room_id))?.price_of_room
            });
            toast.success('Rental recorded successfully, redirecting...');
            resetForm?.()
            router.push(`/motels/${id}/rentals`);
        } catch (error:any) {
            toast.error(error?.response?.data?.data?.join(', ') ?? error?.message ?? 'Something went wrong')
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                <Form className="space-y-6">
                    <DateRange 
                        label="Check-In Date"
                        name="start_of_residence"
                        onChange={(values) => {
                            values?.[0] && handleChange({
                                target: {
                                    name: 'start_of_residence',
                                    value: format(values[0], 'dd-MM-yyyy HH:mm:ss')
                                }
                            })
                            values?.[1] && handleChange({
                                target: {
                                    name: 'end_of_residence',
                                    value: format(values[1], 'dd-MM-yyyy HH:mm:ss')
                                }
                            })
                        }}
                        error={errors.start_of_residence && touched.start_of_residence ? errors.start_of_residence : ''}
                    />

                    <Select 
                        label="Guest"
                        name="guest_id"
                        onChange={(value) => {
                            handleChange({
                                target: {
                                    name: 'guest_id',
                                    value: value
                                }
                            })
                        }}
                        error={errors.guest_id && touched.guest_id ? errors.guest_id : ''}
                        value={values.guest_id?.toString()}
                        placeholder='Select Guest'
                        options={guests}
                        emptyText='No guests available'
                    />

                    <Select
                        label="Room"
                        name="room_id"
                        onChange={(value) => {
                            handleChange({
                                target: {
                                    name: 'room_id',
                                    value: value
                                }
                            })
                        }}
                        error={errors.room_id && touched.room_id ? errors.room_id : ''}
                        value={values.room_id?.toString()}
                        placeholder='Select Room'
                        options={rooms}
                        emptyText='No rooms available'
                    />

                    <SwitchToggle 
                        label="Is Reservation"
                        options={STATUSES}
                        defaultValue={values.is_reservation?.toString()}
                        onValueChange={(value) => {
                            handleChange({
                                target: {
                                    name: 'is_reservation',
                                    value: value
                                }
                            })
                        }}
                    />

                    <div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            isLoading={isSubmitting}
                            onClick={handleSubmit}
                            loadingText='Recording Rental...'
                        >
                            Record Rental
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
