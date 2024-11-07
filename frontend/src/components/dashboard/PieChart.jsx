import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { name: 'Total Order', value: 81, color: '#FF6384' },
  { name: 'Growth', value: 22, color: '#4CAF50' },
  { name: 'Total Revenue', value: 62, color: '#36A2EB' },
];

const PieChartComponent = () => {
  const [showValue, setShowValue] = useState(true);

  return (
    <div className="py-6 w-full ">
      <div className="px-6 flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Pie Chart</h3>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked
              disabled
              className="accent-gray-400"
            />
            <span className="text-gray-500">Chart</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showValue}
              onChange={() => setShowValue(!showValue)}
              className="accent-red-400"
            />
            <span className="text-gray-500">Show Value</span>
          </label>
        </div>
      </div>
      
      <div className="relative flex justify-around">
        {data.map((entry, index) => (
          <div key={index} className="text-center text-xs md:text-sm">
            <PieChart width={100} height={100}>
              <Pie
                data={[{ value: entry.value }]}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={50}
                fill={entry.color}
              >
                <Cell fill={entry.color} />
              </Pie>
              <Tooltip />
            </PieChart>
            {showValue && (
              <div className="absolute  pl-8 text-xl font-bold top-9">
                {entry.value}%
              </div>
            )}
            <p className="font-semibold mt-2">{entry.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartComponent;
