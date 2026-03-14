import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from 'recharts';
import { formatCurrency } from '@/utils/formatters';

const PaymentStatusChart = ({ paid, pending }) => {
  const data = [
    { name: 'PAID SETTLEMENT', value: paid, color: '#e8ff3b' },
    { name: 'UNPAID PENDING', value: pending, color: '#252525' }
  ];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0a0a0a', 
              border: '1px solid #252525', 
              borderRadius: '0',
              fontSize: '12px',
              fontFamily: 'Barlow'
            }}
            formatter={(value) => formatCurrency(value)}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="rect"
            formatter={(value) => <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div >
  );
};

export default PaymentStatusChart;
