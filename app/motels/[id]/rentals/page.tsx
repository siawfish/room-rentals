import { Card } from '@tremor/react';
import RentalsTable from '../../../components/tables/RentalsTable';
import EmptyList from '../../../components/EmptyList';

export const dynamic = 'force-dynamic';

async function getData(id: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/get/room/rentals/${id}?page[number]=1&page[size]=10`, {
    cache: 'no-cache'
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Rentals({
  params
}: {
  searchParams: { q: string };
  params: { id: string };
}) {
  const id = params.id ?? '';

  const rentals = await getData(id);

  return (
    <Card className="mt-6">
      {
        rentals?.data?.length > 0 ?
        <RentalsTable rentals={rentals?.data} /> :
        <EmptyList title="No rental found" caption="Create a new rental to get started" />
      }
    </Card>
  );
}
