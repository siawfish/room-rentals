'use client';

import { Form, Formik } from 'formik'
import React from 'react'
import Input from '../Input'
import Button from '../Button'
import * as Yup from 'yup'
import { toast } from 'react-hot-toast';
import { useRouter, useParams } from 'next/navigation';
import { convertRouteToString } from '../../utils/helpers';
import { useSession } from 'next-auth/react';
import guestsApiService from '../../../api/guest';

export interface GuestsDTO {
    first_name: string;
    other_names: string;
    phone_number?: string;
    email: string;
    advert: string;
    added_by?: number;
    motel_id?: number;
}

const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('Required'),
    other_names: Yup.string().required('Required'),
    phone_number: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    advert: Yup.string()
});

const initialValues:GuestsDTO = {
    first_name: '',
    other_names: '',
    phone_number: '',
    email: '',
    advert: ''
};

export default function GuestsForm({
    defaultValues
}:{defaultValues?:GuestsDTO}) {
    const router = useRouter();
    const params = useParams();
    const { data:session } = useSession();
    const user = session?.user;
    const id = params?.id??"";

    const onSubmit = async (values:GuestsDTO, { setSubmitting, resetForm }:any) => {
        try {
            await guestsApiService.saveGuest({
                ...values,
                // @ts-ignore
                added_by: user?.id,
                motel_id: Number(convertRouteToString(id))
            });
            toast.success('Guest saved successfully, redirecting...');
            resetForm?.()
            router.push(`/motels/${id}/guests`);
        } catch (error:any) {
            toast.error(error?.response?.data?.data?.join(', ') ?? error?.message ?? 'Something went wrong')
        } finally {
            setSubmitting(false);
        }
    };
    const handleUpdate = async (values:GuestsDTO, { setSubmitting, resetForm }:any) => {
        try {
            await guestsApiService.updateGuest({
                ...values
            });
            toast.success('Guest updated successfully');
            router.refresh();
        } catch (error:any) {
            toast.error(error?.response?.data?.data?.join(', ') ?? error?.message ?? 'Something went wrong')
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={defaultValues??initialValues}
            validationSchema={validationSchema}
            onSubmit={defaultValues ? handleUpdate : onSubmit}
        >
            {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                <Form className="space-y-6">
                    <Input 
                        label="First Name"
                        id="first_name"
                        name="first_name"
                        type="text"
                        onChange={handleChange}      
                        error={errors.first_name && touched.first_name ? errors.first_name : ''}   
                        value={values.first_name}    
                    />

                    <Input
                        label="Other Names"
                        id="other_names"
                        name="other_names"
                        type="text"
                        onChange={handleChange}
                        error={errors.other_names && touched.other_names ? errors.other_names : ''}
                        value={values.other_names}
                    />

                    <Input
                        label="Phone Number"
                        id="phone_number"
                        name="phone_number"
                        type="number"
                        onChange={handleChange}
                        error={errors.phone_number && touched.phone_number ? errors.phone_number : ''}
                        value={values.phone_number}
                    />

                    <Input
                        label="Email"
                        id="email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        error={errors.email && touched.email ? errors.email : ''}
                        value={values.email}
                    />

                    <div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            isLoading={isSubmitting}
                            onClick={handleSubmit}
                            loadingText={`${defaultValues ? "Updating" : "Saving"} Guest...`}
                        >
                            {defaultValues ? "Update" : "Save"} Guest
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
