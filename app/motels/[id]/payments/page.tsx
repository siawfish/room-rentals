import { Card } from '@tremor/react';
import PaymentsTable from '../../../components/tables/PaymentsTable';

export const dynamic = 'force-dynamic';

async function getData(id: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/get/all/payments/${id}?page[number]=1&page[size]=10`, {
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
  const id = params.id ?? '';
  const search = searchParams.q ?? '';
  const payments = await getData(id);

  return (
    <Card className="mt-6">
      {/* @ts-expect-error Server Component */}
      <PaymentsTable payments={payments?.data} />
    </Card>
  );
}
