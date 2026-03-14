/** @file CategoryPieChart.jsx */
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Oversized', value: 400 },
  { name: 'Regular', value: 300 },
  { name: 'Accessories', value: 200 },
  { name: 'Trackpants', value: 150 },
];

const COLORS = ['var(--accent)', '#888', '#444', '#222'];

const CategoryPieChart = () => {
  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ background: '#111', border: '1px solid #222', fontSize: '12px' }}
            itemStyle={{ color: 'var(--white)' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
