'use client';

import { Form, Formik } from 'formik'
import React from 'react'
import Input from './Input'
import Button from './Button'
import * as Yup from 'yup'
import SwitchToggle from './Toggle';
import roomsApiService from '../../api/room';
import { toast } from 'react-hot-toast';
import { useRouter, useParams } from 'next/navigation';
import { convertRouteToString } from '../utils/helpers';
import { useSession } from 'next-auth/react';

export interface RoomsDTO {
    cost_of_room: number;
    percentage_discount: number;
    added_by?: number;
    is_reserved: 0 | 1;
    room_number: string;
    motel_id?: number;
}

const validationSchema = Yup.object().shape({
    cost_of_room: Yup.number().required('Required'),
    percentage_discount: Yup.number().required('Required'),
    room_number: Yup.string().required('Required'),
    is_reserved: Yup.number().required('Required'),
});

const initialValues:RoomsDTO = {
    cost_of_room: 0,
    percentage_discount: 0,
    room_number: '',
    is_reserved: 0
};

const STATUSES = [
    {label: 'Available', value: '0'},
    {label: 'Reserved', value: '1'},
];

export default function RoomsForm() {
    const router = useRouter();
    const params = useParams();
    const { data:session } = useSession();
    const user = session?.user;
    const id = params?.id??"";

    const onSubmit = async (values:RoomsDTO, { setSubmitting, resetForm }:any) => {
        try {
            await roomsApiService.createRoom({
                ...values,
                // @ts-ignore
                added_by: user?.id,
                motel_id: Number(convertRouteToString(id))
            });
            toast.success('Motel created successfully, redirecting...');
            resetForm?.()
            router.push(`/motels/${id}/rooms`);
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
                    <Input 
                        label="Room Number"
                        id="room_number"
                        name="room_number"
                        type="text"
                        onChange={handleChange}      
                        error={errors.room_number && touched.room_number ? errors.room_number : ''}   
                        value={values.room_number}    
                    />

                    <Input
                        label="Price"
                        id="cost_of_room"
                        name="cost_of_room"
                        type="number"
                        onChange={handleChange}
                        error={errors.cost_of_room && touched.cost_of_room ? errors.cost_of_room : ''}
                        value={values.cost_of_room}
                    />

                    <Input
                        label="Discount (%)"
                        id="percentage_discount"
                        name="percentage_discount"
                        type="number"
                        onChange={handleChange}
                        error={errors.percentage_discount && touched.percentage_discount ? errors.percentage_discount : ''}
                        value={values.percentage_discount}
                    />


                    <SwitchToggle 
                        label="Availability"
                        options={STATUSES}
                        defaultValue={values.is_reserved?.toString()}
                        onValueChange={(value) => {
                            handleChange({
                                target: {
                                    name: 'is_reserved',
                                    value
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
                            loadingText='Creating Room...'
                        >
                            Create Room
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
