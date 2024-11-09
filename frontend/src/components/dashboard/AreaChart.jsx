import React from 'react';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip } from 'recharts';

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
          <p className="text-lg font-semibold">Chart Order</p>
          <p className="text-xs">This is the annual revenue report</p>
        </span>
        <button className="btn btn-sm btn-outline-primary">Save Report</button>
      </div>

      <AreaChart
        width={1500}
        height={500}
        className="lg:max-w-[30vw] sm:max-w-[50vw] max-w-[80vw] max-h-[200px] mx-auto"
        data={ordersData}
      >
        <CartesianGrid horizontal={false} vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        {/* <Tooltip /> */}
        <Area
          type="monotone"
          dataKey="orders"
          stroke="#36A2EB"
          strokeWidth={2}
          fill="none"
        />
      </AreaChart>
    </div>
  );
};

export default AreaChartComponent;
