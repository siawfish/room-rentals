import { Divider, Text, Title } from '@tremor/react'
import React from 'react'
import Form from '../../../../components/forms/UserForm'

async function getData(id: string) {
    if(id === "") return;
    const res = await fetch(`${process.env.BASE_URL}/api/get/user/${id}`, {
      cache: 'no-cache'
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default async function UserForm({
    searchParams
  }: {
    searchParams: { uid: string };
  }) {
    const data = await getData(searchParams.uid??"");
    return (
        <main className="mx-auto max-w-7xl">
            <div className="flex min-h-full flex-col justify-center px-6 pb-12 pt-0 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Title className="text-center subpixel-antialiased text-xl">{data ? "Update an Existing User" : "Create a New User"}</Title>
                    <Text className="text-center">Kindly complete the form to {data ? "update an existing user" : "create a new user"}</Text>
                    <Divider />
                </div>
                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Form defaultValues={data} />
                </div>
            </div>
        </main>
    )
}
