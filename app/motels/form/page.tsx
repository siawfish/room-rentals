import React from 'react'
import { Title, Text, Divider } from '@tremor/react'
import Form from '../../components/forms/MotelForm'

export default function MotelForm() {
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Title className="text-center subpixel-antialiased text-xl">Create a New Motel</Title>
                    <Text className="text-center">Kindly complete the form to create a new motel</Text>
                    <Divider />
                </div>
                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Form />
                </div>
            </div>
        </main>
    )
}
