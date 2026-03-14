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
    { name: 'SETTLED', value: paid, color: '#c8ff00' },
    { name: 'OUTSTANDING', value: pending, color: '#0a0a0a' }
  ];

  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #E5E5DF', 
              borderRadius: '8px',
              fontSize: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              fontFamily: 'Inter'
            }}
            formatter={(value) => formatCurrency(value)}
          />
          <Legend 
            verticalAlign="bottom" 
            height={40}
            iconType="circle"
            formatter={(value) => <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div >
  );
};

export default PaymentStatusChart;
