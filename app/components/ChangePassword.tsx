import { Dialog, Transition } from '@headlessui/react'
import { Form, Formik } from 'formik';
import { Fragment } from 'react'
import Input from './Input';
import Button from './Button';
import * as yup from 'yup';
import usersApiService from '../../api/user';
import { toast } from 'react-hot-toast';
import { Title } from '@tremor/react';
import { signOut } from 'next-auth/react';

interface ChangePasswordProps {
    open: boolean;
    onClose: () => void;
}

export interface ChangePasswordDTO {
    user_id?: number;
    password: string;
    new_password: string;
    confirm_password: string;
}

const initialValues:ChangePasswordDTO = {
    password: '',
    new_password: '',
    confirm_password: ''
}

const validationSchema = yup.object().shape({
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required'),
    new_password: yup
        .string()
        .min(8, 'New password must be at least 8 characters long')
        .required('New password is required'),
    confirm_password: yup
        .string()
        //@ts-ignore
        .oneOf([yup.ref('new_password'), null], 'Passwords must match')
        .required('Confirm password is required'),
  });

export default function ChangePassword({
    open,
    onClose
}:ChangePasswordProps) {

    const onSubmit = async (values:ChangePasswordDTO, { setSubmitting, resetForm }:any) => {
        try {
            toast.loading('Changing password...', {id: 'change-password'});
            await usersApiService.changePassword({
                ...values,
                user_id: 1
            });
            toast.success('Password changed successfully. Redirecting to login page...', {id: 'change-password'});
            signOut();
        } catch (error:any) {
            toast.error(error?.response?.data?.data?.join(', ') ?? error?.message ?? 'Something went wrong')
            setSubmitting(false);
            resetForm();
        }
    }

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Title className="text-center subpixel-antialiased text-xl mb-5">
                                    Change Password
                                </Title>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
                                >
                                    {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                                        <Form className="space-y-6">
                                            <Input
                                                label="Password"
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                onChange={handleChange}
                                                error={errors.password && touched.password ? errors.password : ''}
                                                value={values.password}
                                            />

                                            <Input
                                                label="New Password"
                                                id="new_password"
                                                name="new_password"
                                                type="password"
                                                autoComplete="current-password"
                                                onChange={handleChange}
                                                error={errors.new_password && touched.new_password ? errors.new_password : ''}
                                                value={values.new_password}
                                            />

                                            <Input
                                                label="Confirm New Password"
                                                id="confirm_password"
                                                name="confirm_password"
                                                type="password"
                                                autoComplete="current-password"
                                                onChange={handleChange}
                                                error={errors.confirm_password && touched.confirm_password ? errors.confirm_password : ''}
                                                value={values.confirm_password}
                                            />

                                            <div>
                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    isLoading={isSubmitting}
                                                    loadingText='Updating Password...'
                                                    onClick={handleSubmit}
                                                >
                                                    Update Password
                                                </Button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
