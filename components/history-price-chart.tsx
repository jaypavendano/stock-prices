'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { getHistoricalPrice, HistoricalPrice } from '@/app/api';
import dayjs from 'dayjs';

const DATE_FORMAT = 'YYYY-MM-DD';
const today = dayjs();

const weekAgo = today.subtract(1, 'week').format(DATE_FORMAT);

const monthAgo = today.subtract(1, 'month').format(DATE_FORMAT);

const yearAgo = today.subtract(1, 'year').format(DATE_FORMAT);

const filterDate = [
  {
    id: 1,
    value: 'day',
    label: '1Day',
    from: today.format(DATE_FORMAT),
    to: today.subtract(1, 'day').format(DATE_FORMAT),
  },
  {
    id: 2,
    value: 'week',
    label: '1Week',
    from: today.format(DATE_FORMAT),
    to: weekAgo,
  },
  {
    id: 3,
    value: 'month',
    label: '1Month',
    from: today.format(DATE_FORMAT),
    to: monthAgo,
  },
  {
    id: 4,
    value: 'year',
    label: '1Year',
    from: today.format(DATE_FORMAT),
    to: yearAgo,
  },
];

const chartConfig = {
  open: {
    label: 'Value',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function HistoryPriceChart({ symbol }: { symbol: string }) {
  const [data, setData] = useState<HistoricalPrice[]>([]);
  const [dateRange, setDateRange] = useState({
    id: 'day',
    from: today.format(DATE_FORMAT),
    to: today.subtract(1, 'day').format(DATE_FORMAT),
  });

  const getHistoricalPriceData = async () => {
    try {
      const data = await getHistoricalPrice(
        symbol,
        dateRange.from,
        dateRange.to
      );
      const sortData = data
        .slice()
        .sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());
      setData(sortData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHistoricalPriceData();
  }, [dateRange]);

  return (
    <Card className="my-12">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-wrap gap-2 justify-end">
            {filterDate.map((item) => (
              <label className="cursor-pointer" key={item.id}>
                <input
                  type="radio"
                  name={item.value}
                  value={item.value}
                  checked={dateRange.id === item.value}
                  onChange={() => {
                    setDateRange(() => ({
                      id: item.value,
                      from: item.from,
                      to: item.to,
                    }));
                  }}
                  className="hidden peer"
                />
                <div className="font-normal text-sm inline-block px-4 py-1 bg-gray-200 text-gray-700 rounded-lg peer-checked:bg-blue-500 peer-checked:text-white">
                  {item.label}
                </div>
              </label>
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => dayjs(value).format('MMMM, DD, YYYY')}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Area
              dataKey="open"
              type="natural"
              fill="var(--color-open)"
              fillOpacity={0.4}
              stroke="var(--color-open)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
