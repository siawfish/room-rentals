import { Divider, Text, Title } from '@tremor/react'
import React from 'react'
import Form from '../../../../components/forms/RentalForm'

export default function RoomsForm() {
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <div className="flex min-h-full flex-col justify-center px-6 pb-12 pt-0 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Title className="text-center subpixel-antialiased text-xl">Record a New Rental</Title>
                    <Text className="text-center">Kindly complete the form to record a new rental</Text>
                    <Divider />
                </div>
                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Form />
                </div>
            </div>
        </main>
    )
}
