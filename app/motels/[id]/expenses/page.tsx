import { Card } from '@tremor/react';
import ExpensesTable from '../../../components/tables/ExpensesTable';

export const dynamic = 'force-dynamic';

async function getData(id: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/get/motel/expenses/${id}`, {
    cache: 'no-cache'
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}


export default async function Expenses({
  params
}: {
  params: { id: string };
}) {
  const id = params.id ?? '';
  const expenses = await getData(id);
  return (
    <Card className="mt-6">
      <ExpensesTable expenses={expenses} />
    </Card>
  );
}
