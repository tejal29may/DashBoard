import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const data = [
  {
    month: 'Jan',
    income: 4000,
    high: 2400,
    low: 4000,
    amt: 2400,
  },
  {
    month: 'Feb',
    income: 3000,
    high: 1398,
    low: 3000,
    amt: 2210,
  },
  {
    month: 'Mar',
    income: 2000,
    high: 9800,
    low: 2000,
    amt: 2290,
  },
  {
    month: 'Apr',
    income: 2780,
    high: 3908,
    low: 2780,
    amt: 2000,
  },
  {
    month: 'May',
    income: 1890,
    high: 4800,
    low: 1890,
    amt: 2181,
  },
  {
    month: 'Jun',
    income: 2390,
    high: 3800,
    low: 2390,
    amt: 2500,
  },
  {
    month: 'Jul',
    income: 3490,
    high: 4300,
    low: 3490,
    amt: 2100,
  },
];

export default class Charts extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

  render() {
    return (
      <ResponsiveContainer width={700} height={400}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="month">
            {/* <Label value="Months" position="insideBottom" offset={-10} /> */}
          </XAxis>
          <YAxis>
            <Label value="Income" position="insideLeft" angle={-90} offset={0} />
          </YAxis>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="high" stroke="#8884d8" strokeWidth={3} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="low" stroke="#82ca9d" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
