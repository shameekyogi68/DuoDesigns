/** @file OrdersChart.jsx */
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', orders: 12 },
  { name: 'Tue', orders: 19 },
  { name: 'Wed', orders: 15 },
  { name: 'Thu', orders: 22 },
  { name: 'Fri', orders: 30 },
  { name: 'Sat', orders: 25 },
  { name: 'Sun', orders: 18 },
];

const OrdersChart = () => {
  return (
    <div style={{ width: '100%', height: 180 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
          <Tooltip 
            contentStyle={{ background: '#111', border: '1px solid #222', fontSize: '12px' }}
            itemStyle={{ color: 'var(--accent)' }}
          />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 9, fill: 'var(--gray)', fontWeight: 700 }} 
          />
          <Area 
            type="monotone" 
            dataKey="orders" 
            stroke="var(--accent)" 
            fillOpacity={1} 
            fill="url(#colorOrders)" 
          />
          <defs>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersChart;
