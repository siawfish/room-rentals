import { Card, Metric, Text, Flex, Grid, Title } from '@tremor/react';
import Chart from '../../components/chart';

const data = [
  {
    category: 'Guests',
    stat: '10,234',
    caption: 'Total guests'
  },
  {
    category: 'Rentals',
    stat: '12,543',
    caption: 'Total rentals'
  },
  {
    category: 'Expenses',
    stat: '2,543',
    caption: 'Total expenses'
  }
];

export default function PlaygroundPage() {
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
