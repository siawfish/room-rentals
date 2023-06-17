import { Card, Metric, Text, Flex, Grid, Title } from '@tremor/react';
import Chart from '../../components/chart';
import numeral from 'numeral';

async function getData(id: string) {
  const guests = fetch(`${process.env.BASE_URL}/api/get/all/guests/${id}`);
  const rentals = fetch(`${process.env.BASE_URL}/api/get/room/rentals/${id}?page[number]=1&page[size]=100000`);
  const expenses = fetch(`${process.env.BASE_URL}/api/get/motel/expenses/${id}`);
  const res = await Promise.all([guests, rentals, expenses]);
  const data = []
  if(res?.[0]?.ok) {
    const guestsData = await res[0].json();
    data.push({
      category: 'Guests',
      stat: guestsData?.length,
      caption: 'Total guests'
    })
  } else {
    data.push({
      category: 'Guests',
      stat: 0,
      caption: 'Total guests'
    })
  }
  if(res?.[1]?.ok) {
    const rentalsData = await res[1].json();
    data.push({
      category: 'Rentals',
      stat: `GHS ${numeral(rentalsData?.data?.length).format('0,0')}`,
      caption: 'Total rentals'
    })
  } else {
    data.push({
      category: 'Rentals',
      stat: `GHS ${numeral(0).format('0,0.00')}`,
      caption: 'Total rentals'
    })
  }
  if(res?.[2]?.ok) {
    const expensesData = await res[2].json();
    const sumOfAmountInvolved = expensesData?.reduce((acc:any, item:any) => {
      return acc + Number(item.amount_involved);
    }, 0);
    data.push({
      category: 'Expenses',
      stat: `GHS ${numeral(sumOfAmountInvolved).format('0,0.00')}`,
      caption: 'Total expenses'
    })
  } else {
    data.push({
      category: 'Expenses',
      stat: `GHS ${numeral(0).format('0,0.00')}`,
      caption: 'Total expenses'
    })
  }
  return data;
}



export default async function PlaygroundPage({
  params
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  return (
    <div className="py-4 md:py-10">
      <Grid className="mt-8 gap-6" numColsSm={2} numColsLg={3}>
        {data.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex
              className="space-x-2"
              justifyContent="start"
              alignItems="baseline"
            >
              <Metric>{item.stat}</Metric>
              <Text>{item.caption}</Text>
            </Flex>
          </Card>
        ))}
      </Grid>
      <Chart />
    </div>
  );
}
