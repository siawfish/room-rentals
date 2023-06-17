import { Card } from '@tremor/react';
import UsersTable from '../../../components/tables/UserTable';
import EmptyList from '../../../components/EmptyList';

async function getData(id: string, search: string) {
  const url = search ? `filter/all/users?search=${search}&motel_id=${id}` : `get/all/users/${id}`;
  const res = await fetch(`${process.env.BASE_URL}/api/${url}`, {
    cache: 'no-cache'
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Users({
  searchParams,
  params
}: {
  searchParams: { q: string };
  params: { id: string };
}) {
  const search = searchParams.q ?? '';
  const users = await getData(params.id, search);
  return (
    <Card className="mt-6">
      {
        users?.length > 0 ? 
        <UsersTable users={users} /> :
        <EmptyList title="No user found" caption="Create a new user to get started" />
      }
    </Card>
  );
}
