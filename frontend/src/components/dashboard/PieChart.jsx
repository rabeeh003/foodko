import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { name: 'Total Order', value: 81, color: '#FF6384', bg: '#F9C6C6' },
  { name: 'Growth', value: 22, color: '#4CAF50', bg: '#B4DFC4' },
  { name: 'Total Revenue', value: 62, color: '#36A2EB', bg: '#B7D9F8' },
];

const PieChartComponent = () => {
  const [showValue, setShowValue] = useState(true);
  const backgroundColor = '#E0E0E0'; // Light gray background for empty space

  return (
    <div className="py-6 w-full">
      <div className="px-6 flex justify-between items-center mb-4 h-full">
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
          <div key={index} className="text-center my-auto text-xs md:text-sm relative">
            <PieChart width={100} height={100}>
              <Pie
                data={[{ value: entry.value }, { value: 100 - entry.value }]} // Fill remaining space
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={50}
                startAngle={90}
                endAngle={-270} // Full circle
              >
                <Cell fill={entry.color} />
                <Cell fill={entry.bg} /> {/* Light gray background */}
              </Pie>
              <Tooltip />
            </PieChart>
            {showValue && (
              <div className="absolute pb-7 inset-0 flex items-center justify-center text-xl font-bold">
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
