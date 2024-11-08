import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const ordersData = [
  { name: 'Sunday', orders: 150 },
  { name: 'Monday', orders: 200 },
  { name: 'Tuesday', orders: 456 },
  { name: 'Wednesday', orders: 320 },
  { name: 'Thursday', orders: 280 },
  { name: 'Friday', orders: 380 },
  { name: 'Saturday', orders: 420 },
];

const AreaChartComponent = () => {
  return (
    <div className="p-4 shadow-md rounded-lg">
      <div className="flex justify-between">
        <span>
          <p className="text-lg font-semibold">Chart Order </p>
          <p className="text-xs">This is annual revenue report</p>
        </span>
        <button className="btn btn-sm btn-outline-primary">Save Report</button>
      </div>
      <AreaChart width={1500} height={500} className="lg:max-w-[30vw] max-w-[50vw] max-h-[200px] mx-auto" data={ordersData}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        {/* <YAxis /> */}
        {/* <Tooltip /> */}
        <Area type="monotone" dataKey="orders" stroke="#36A2EB" fillOpacity={0.3} fill="#36A2EB" />
      </AreaChart>
    </div>
  );
};

export default AreaChartComponent;
