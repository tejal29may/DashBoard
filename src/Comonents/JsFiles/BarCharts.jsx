import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    month: 'Jan',
    revenue: 4000,
    netProfit: 2400,
    amt: 2400,
  },
  {
    month: 'Feb',
    revenue: 3000,
    netProfit: 1398,
    amt: 2210,
  },
  {
    month: 'March',
    revenue: 2000,
    netProfit: 9800,
    amt: 2290,
  },
  {
    month: 'April',
    revenue: 2780,
    netProfit: 3908,
    amt: 2000,
  },
  {
    month: 'may',
    revenue: 1890,
    netProfit: 4800,
    amt: 2181,
  },
  {
    month: 'June',
    revenue: 2390,
    netProfit: 3800,
    amt: 2500,
  },
  {
    month: 'Jully',
    revenue: 3490,
    netProfit: 4300,
    amt: 2100,
  },
];

export default class BarCharts extends PureComponent {
 

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottom', offset: -10 }} /> */}
          <YAxis label={{ value: 'Thousand', angle: -90, position: 'insideLeft' }} />
          <Tooltip labelFormatter={(value, name, props) => (name === "revenue" ? "Revenue" : "Net Profit")} />
          <Legend />
          <Bar dataKey="revenue" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} name="Revenue" />
          <Bar dataKey="netProfit" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} name="Net Profit" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
