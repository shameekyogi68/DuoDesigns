/** @file RevenueChart.jsx */
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'var(--accent)', color: 'var(--black)', padding: '8px 12px', fontWeight: 900, fontSize: '10px' }}>
        ₹{payload[0].value.toLocaleString()}
      </div>
    );
  }
  return null;
};

const RevenueChart = () => {
  return (
    <div style={{ width: '100%', height: 180 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff10' }} />
          <Bar dataKey="revenue" fill="var(--gray)" radius={[2, 2, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === data.length - 1 ? 'var(--accent)' : 'var(--gray)'} />
            ))}
          </Bar>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 9, fill: 'var(--gray)', fontWeight: 700 }} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
