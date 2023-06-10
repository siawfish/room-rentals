import { Card } from '@tremor/react';
import UsersTable from '../../../components/tables/UserTable';

async function getData(id: string, search: string) {
  const headers = new Headers();
  const bodyContent = JSON.stringify({ search, motel_id: id });
  headers.append('Content-Type', 'application/json');
  const res = await fetch(`${process.env.BASE_URL}/api/${search ? 'filter' : 'get'}/all/users${ search ? '' : '/' + id}`, {
    cache: 'no-cache',
    method: search ? 'POST' : 'GET',
    body: search ? bodyContent : null,
    headers: headers
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
  const id = params.id ?? '';
  const users = await getData(params.id, search);
  return (
    <Card className="mt-6">
      {/* @ts-expect-error Server Component */}
      <UsersTable users={users} />
    </Card>
  );
}
