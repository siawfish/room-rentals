import { Card, Title, Text, Flex } from '@tremor/react';
import Search from '../../../components/Search';
import ListTable from '../../table';
import Link from 'next/link';
import Button from '../../../components/Button';
import { convertRouteToString } from '../../../utils/helpers';
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
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Flex>
        <div>
          <Title>Rooms</Title>
          <Text>
            A list of rooms in motel.
          </Text>
          <Search />
        </div>
        <Link href={`/motels/${convertRouteToString(id)}/rooms/form`}>
            <Button className="hidden md:block text-white text-[13px] font-mono bg-black hover:bg-gray-700 transition-all rounded-md w-[150px] h-10 flex items-center justify-center whitespace-nowrap"> + Add Room </Button>
        </Link>
      </Flex>
      <Card className="mt-6">
        {/* @ts-expect-error Server Component */}
        <RoomsTable rooms={rooms} />
      </Card>
      <div className="md:hidden absolute left-0 w-full flex flex-row align-center justify-center">
          <Link href={`/motels/${convertRouteToString(id)}/rooms/form`}>
              <Button className="text-white text-[13px] font-mono bg-black hover:bg-gray-700 transition-all rounded-md w-[150px] h-10 flex items-center justify-center whitespace-nowrap"> + Add Room </Button>
          </Link>
      </div>
    </main>
  );
}
