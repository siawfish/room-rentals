import { Divider, Text, Title } from '@tremor/react'
import React from 'react'
import Form from '../../../../components/forms/GuestForm'

async function getData(id: string) {
    if(id === "") return;
    const res = await fetch(`${process.env.BASE_URL}/api/get/guest/details?guest_id=${id}`, {
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
    searchParams: { gid: string };
  }) {
    const data = await getData(searchParams.gid??"");
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <div className="flex min-h-full flex-col justify-center px-6 pb-12 pt-0 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Title className="text-center subpixel-antialiased text-xl">{data ? "Update an Existing" : "Create a New"} Guest Profile</Title>
                    <Text className="text-center">Kindly complete the form to {data ? "update an existing" : "create a new"} guest profile</Text>
                    <Divider />
                </div>
                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Form defaultValues={data} />
                </div>
            </div>
        </main>
    )
}
