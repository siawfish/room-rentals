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
import expensesApiService from '../../../api/expenses';

export interface ExpensesDTO {
    purpose_of_expense: string;
    amount_involved: number;
    added_by?: number;
    motel_id?: number;
}

const validationSchema = Yup.object().shape({
    purpose_of_expense: Yup.string().required('Required'),
    amount_involved: Yup.number().required('Required')
});

const initialValues:ExpensesDTO = {
    purpose_of_expense: '',
    amount_involved: 0
};

export default function ExpensesForm() {
    const router = useRouter();
    const params = useParams();
    const { data:session } = useSession();
    const user = session?.user;
    const id = params?.id??"";

    const onSubmit = async (values:ExpensesDTO, { setSubmitting, resetForm }:any) => {
        try {
            await expensesApiService.addExpense({
                ...values,
                // @ts-ignore
                added_by: user?.id,
                motel_id: Number(convertRouteToString(id))
            });
            toast.success('Expense saved successfully, redirecting...');
            resetForm?.()
            router.push(`/motels/${id}/expenses`);
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
                        label="Amount Involved (GHS)"
                        id="amount_involved"
                        name="amount_involved"
                        type="number"
                        onChange={handleChange}      
                        error={errors.amount_involved && touched.amount_involved ? errors.amount_involved : ''}   
                        value={values.amount_involved}    
                    />

                    <Input
                        as='textarea'
                        label="Purpose of Expense"
                        id="purpose_of_expense"
                        name="purpose_of_expense"
                        type="textarea"
                        onChange={handleChange}
                        error={errors.purpose_of_expense && touched.purpose_of_expense ? errors.purpose_of_expense : ''}
                        value={values.purpose_of_expense}
                    />

                    <div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            isLoading={isSubmitting}
                            onClick={handleSubmit}
                            loadingText='Saving Expense...'
                        >
                            Save Expense
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
