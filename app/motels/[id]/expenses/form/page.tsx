import { Divider, Text, Title } from '@tremor/react'
import React from 'react'
import Form from '../../../../components/forms/ExpensesForm'

export default function ExpensesForm() {
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <div className="flex min-h-full flex-col justify-center px-6 pb-12 pt-0 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Title className="text-center subpixel-antialiased text-xl">Create a New Expense</Title>
                    <Text className="text-center">Kindly complete the form to create a new expense</Text>
                    <Divider />
                </div>
                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Form />
                </div>
            </div>
        </main>
    )
}
