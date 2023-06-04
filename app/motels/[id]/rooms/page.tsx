import { Card } from '@tremor/react';
import RoomsTable from '../../../components/tables/RoomTable';

export const dynamic = 'force-dynamic';

async function getData(id: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/get/all/rooms/${id}`, {
    cache: 'no-cache'
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function IndexPage({
  searchParams,
  params
}: {
  searchParams: { q: string };
  params: { id: string };
}) {
  const search = searchParams.q ?? '';
  const id = params.id ?? '';

  const rooms = await getData(id);

  return (
    <Card className="mt-6">
      {/* @ts-expect-error Server Component */}
      <RoomsTable rooms={rooms} />
    </Card>
  );
}
