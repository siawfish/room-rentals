'use client';

import React from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Input from '../Input';
import Button from '../Button';
import toast from 'react-hot-toast';
import usersApiService from '../../../api/user';
import { useParams, useRouter } from 'next/navigation';
import { convertRouteToString } from '../../utils/helpers';
import SwitchToggle from '../Toggle';

export interface UserDTO {
    first_name: string;
    phone_number: string;
    email: string;
    role: "superadmin" | "admin";
    other_names: string;
    motel_id?: string;
    employee_id?: string;
}

const initialValues:UserDTO = {
    first_name: '',
    phone_number: '',
    email: '',
    role: "admin",
    other_names: '',
    employee_id: ''
}

const validationSchema = Yup.object({
    first_name: Yup.string().required('Required'),
    phone_number: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    role: Yup.string().required('Required'),
    other_names: Yup.string().required('Required'),
    employee_id: Yup.string()
})

const STATUSES = [
    {label: 'Admin', value: 'admin'},
    {label: 'Super Admin', value: 'superadmin'},
];

interface UserFormProps {
    defaultValues?: UserDTO;
}

export default function UserForm({
    defaultValues
}:UserFormProps) {
    const params = useParams();
    const router = useRouter();
    const id = params?.id??"";
    
    const onSubmit = async (values:UserDTO, { setSubmitting, resetForm }:any) => {
        try {
            await usersApiService.createUser({
                ...values,
                motel_id: convertRouteToString(id)
            });
            toast.success('User created successfully. Redirecting...');
            resetForm?.()
            setTimeout(() => {
                router.push(`/motels/${id}/users`);
            }, 3000);
        } catch (error:any) {
            toast.error(error?.response?.data?.data?.join(', ') ?? error?.message ?? 'Something went wrong')
        } finally {
            setSubmitting(false)
        }
    }

    const onSubmitUpdate = async (values:UserDTO, { setSubmitting, resetForm }:any) => {
        try {
            await usersApiService.updateUser({
                ...values,
                motel_id: convertRouteToString(id)
            });
            toast.success('User updated successfully');
            router.refresh();
        } catch (error:any) {
            toast.error(error?.response?.data?.data?.join(', ') ?? error?.message ?? 'Something went wrong')
        } finally {
            setSubmitting(false)
        }
    }


    return (
        <Formik
            initialValues={defaultValues??initialValues}
            validationSchema={validationSchema}
            onSubmit={defaultValues ? onSubmitUpdate : onSubmit}
            enableReinitialize
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
                        label="Email Address"
                        id="email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        error={errors.email && touched.email ? errors.email : ''}
                        value={values.email}
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
                        label="Employee ID"
                        id="employee_id"
                        name="employee_id"
                        type="text"
                        onChange={handleChange}
                        error={errors.employee_id && touched.employee_id ? errors.employee_id : ''}
                        value={values.employee_id}
                    />

                    <SwitchToggle 
                        label="Role"
                        options={STATUSES}
                        defaultValue={values.role}
                        onValueChange={(value:string) => {
                            handleChange({
                                target: {
                                    name: 'role',
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
                            loadingText={`${defaultValues ? "Creating" : "Updating"} User...`}
                        >
                            {`${defaultValues ? "Update" : "Create"}`} User
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
