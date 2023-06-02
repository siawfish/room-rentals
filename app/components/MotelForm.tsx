'use client'

import React from 'react'
import { Formik, Form } from 'formik';
import Input from './Input';
import Button from './Button';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import motelsApiService from '../../api/motel';
import { useRouter } from 'next/navigation';

interface FormValues {
    motel_name: string;
    location: string;
}

const validationSchema = Yup.object().shape({
    motel_name: Yup.string().required('Required'),
    location: Yup.string()
});

const initialValues = {
    motel_name: '',
    location: ''
};

export default function MotelForm() {
    const router = useRouter();

    const onSubmit = async (values:FormValues, { setSubmitting, resetForm }:any) => {
        try {
            await motelsApiService.createMotel(values);
            toast.success('Motel created successfully');
            resetForm?.()
            router.push('/motels');
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
                        label="Motel Name"
                        id="motel_name"
                        name="motel_name"
                        type="text"
                        onChange={handleChange}      
                        error={errors.motel_name && touched.motel_name ? errors.motel_name : ''}   
                        value={values.motel_name}    
                    />

                    <Input
                        label="Location"
                        id="location"
                        name="location"
                        type="text"
                        onChange={handleChange}
                        error={errors.location && touched.location ? errors.location : ''}
                        value={values.location}
                    />

                    <div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            isLoading={isSubmitting}
                            onClick={handleSubmit}
                            loadingText='Creating Motel...'
                        >
                            Create Motel
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
