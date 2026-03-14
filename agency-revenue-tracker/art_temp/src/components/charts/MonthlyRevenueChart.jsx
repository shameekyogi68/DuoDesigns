import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { formatCurrency } from '@/utils/formatters';

const MonthlyRevenueChart = ({ data }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1a1a1a" />
          <XAxis 
            dataKey="label" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#444', fontSize: 10, fontFamily: 'Bebas Neue' }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#444', fontSize: 10, fontFamily: 'Bebas Neue' }}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(232, 255, 59, 0.05)' }}
            contentStyle={{ 
              backgroundColor: '#0a0a0a', 
              border: '1px solid #252525', 
              borderRadius: '0',
              fontSize: '12px',
              fontFamily: 'Barlow'
            }}
            formatter={(value) => formatCurrency(value)}
          />
          <Bar dataKey="revenue">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#e8ff3b' : '#1a1a1a'} stroke={index === data.length - 1 ? 'none' : '#252525'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyRevenueChart;
