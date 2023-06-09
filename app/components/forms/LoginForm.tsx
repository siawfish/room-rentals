'use client'

import React, { useTransition } from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import Button from '../Button';
import Input from '../Input';
import { useRouter } from 'next/navigation';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required')
});

const initialValues = {
  email: '',
  password: ''
};

interface FormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
    const { replace } = useRouter();
    const [isPending, startTransition] = useTransition();

    const onSubmit = async (values:FormValues, { setSubmitting }:any) => {
        try {
            const res = await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false
            });
            if(res?.error) throw new Error('Oops! Authentication failed, please try again.')
            toast.success('You are successfully signed in! Redirecting...');
            startTransition(() => {
              replace(`/motels`);
            });
        } catch (error:any) {
            toast.error(error?.response?.data?.data?.join(', ') ?? error?.message ?? 'Something went wrong');
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
                        label="Email address"
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onChange={handleChange}      
                        error={errors.email && touched.email ? errors.email : ''}   
                        value={values.email}    
                    />

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

                    <div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            isLoading={isSubmitting}
                            loadingText='Signing in...'
                            onClick={handleSubmit}
                        />
                    </div>
                </Form>
            )}
        </Formik>
    )
}
