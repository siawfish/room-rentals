import { Card, Title, Text } from '@tremor/react';
import Search from '../../components/Search';
import ListTable from '../table';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  // const users = await queryBuilder
  //   .selectFrom('users')
  //   .select(['id', 'name', 'username', 'email'])
  //   .where('name', 'like', `%${search}%`)
  //   .execute();

  const users = [
    {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'mcamanor@gmail.com'
    },
    {
      id: 2,
      name: 'Jane Doe',
      username: 'janedoe',
      email: 'siaw@mail.com'
    }
  ];

  

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Rooms</Title>
      <Text>
        A list of rooms retrieved from a MySQL database (PlanetScale).
      </Text>
      <Search />
      <Card className="mt-6">
        {/* @ts-expect-error Server Component */}
        <ListTable users={users} />
      </Card>
    </main>
  );
}
