import { Card } from '@tremor/react';
import RentalsTable from '../../../components/tables/RentalsTable';

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
  searchParams,
  params
}: {
  searchParams: { q: string };
  params: { id: string };
}) {
  const search = searchParams.q ?? '';
  const id = params.id ?? '';

  const rentals = await getData(id);

  return (
    <Card className="mt-6">
      {/* @ts-expect-error Server Component */}
      <RentalsTable rentals={rentals?.data} />
    </Card>
  );
}
