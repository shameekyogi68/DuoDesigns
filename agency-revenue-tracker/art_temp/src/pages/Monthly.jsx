import React from 'react';
import { useOrdersStore } from '@/store/ordersStore';
import { groupOrdersByMonth, getMonthLabel } from '@/utils/commission';
import { formatCurrency } from '@/utils/formatters';
import { 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight 
} from 'lucide-react';

const Monthly = () => {
  const { orders, monthlyPaymentStatus, togglePaymentStatus } = useOrdersStore();
  const grouped = groupOrdersByMonth(orders);
  
  const months = Object.keys(grouped).sort().reverse();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="heading-lg mb-1">Monthly Payout Matrix</h2>
        <p className="text-gray-500 text-sm">Aggregation of orders by month to track settlement status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {months.map(monthKey => {
          const monthOrders = grouped[monthKey];
          const totalRevenue = monthOrders.reduce((sum, o) => sum + o.totalAmount, 0);
          const commission = totalRevenue * 0.05;
          const status = monthlyPaymentStatus[monthKey] || 'pending';
          const isPaid = status === 'paid';

          return (
            <div key={monthKey} className="card hover:border-indigo-500/50 transition-colors">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{getMonthLabel(monthKey)}</h3>
                  <p className="text-xs text-gray-500 uppercase font-black tracking-widest">{monthOrders.length} Shipments Sync'd</p>
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider ${isPaid ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                  {status}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-xs text-gray-500 font-medium">Monthly Revenue</span>
                  <span className="text-sm font-bold text-white">{formatCurrency(totalRevenue)}</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-xs text-gray-500 font-medium tracking-tight">Your 5.0% Commission</span>
                  <span className="text-xl font-black text-white">{formatCurrency(commission)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => togglePaymentStatus(monthKey)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${isPaid ? 'bg-gray-800 text-gray-400' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'}`}
                >
                  {isPaid ? <Clock size={14} /> : <CheckCircle2 size={14} />}
                  {isPaid ? 'Mark Pending' : 'Mark as Paid'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {months.length === 0 && (
        <div className="card text-center py-20 bg-transparent border-dashed">
          <p className="text-gray-500 italic">No historical data available to group. Sync Duo Designs API to begin.</p>
        </div>
      )}
    </div>
  );
};

export default Monthly;
