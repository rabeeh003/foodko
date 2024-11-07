import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const revenueData = [
  { month: 'Jan', year2020: 10000, year2021: 20000 },
  { month: 'Feb', year2020: 15000, year2021: 25000 },
  { month: 'Mar', year2020: 20000, year2021: 30000 },
  { month: 'Apr', year2020: 25000, year2021: 40000 },
  { month: 'May', year2020: 30000, year2021: 50000 },
  { month: 'Jun', year2020: 35000, year2021: 45000 },
  { month: 'Jul', year2020: 30000, year2021: 40000 },
  { month: 'Aug', year2020: 20000, year2021: 35000 },
  { month: 'Sep', year2020: 22000, year2021: 30000 },
  { month: 'Oct', year2020: 27000, year2021: 28000 },
  { month: 'Nov', year2020: 32000, year2021: 35000 },
  { month: 'Dec', year2020: 28000, year2021: 32000 },
];

const LineChartComponent = () => {
  return (
    <div className="p-5">
      <h3 className="text-lg font-semibold mb-4">Total Revenue</h3>
      <LineChart width={1000} height={300} className="w-full mx-auto" data={revenueData}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="month" />
        <YAxis />
        {/* <Tooltip /> */}
        <Legend />
        <Line type="monotone" dataKey="year2020" stroke="#FF6384" dot={{ r: 5 }} />
        <Line type="monotone" dataKey="year2021" stroke="#36A2EB" dot={{ r: 5 }} />
      </LineChart>
    </div>
  );
};

export default LineChartComponent;
