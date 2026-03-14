/** @file StockStatusChart.jsx */
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'In Stock', value: 85 },
  { name: 'Low Stock', value: 10 },
  { name: 'Out of Stock', value: 5 },
];

const COLORS = ['var(--green)', '#ffa726', 'var(--red)'];

const StockStatusChart = () => {
  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            stroke="none"
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ background: '#111', border: '1px solid #222', fontSize: '12px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockStatusChart;
