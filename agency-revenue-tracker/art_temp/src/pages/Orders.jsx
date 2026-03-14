import React, { useState } from 'react';
import { useOrdersStore } from '@/store/ordersStore';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { 
  Search, 
  Filter, 
  Download,
  Calendar,
  CheckCircle2,
  Clock
} from 'lucide-react';

const Orders = () => {
  const { orders, commissionRate, monthlyPaymentStatus } = useOrdersStore();
  const [search, setSearch] = useState('');
  const [monthFilter, setMonthFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderId.toLowerCase().includes(search.toLowerCase());
    const orderMonth = new Date(order.createdAt).toISOString().slice(0, 7); // yyyy-MM
    const matchesMonth = monthFilter === 'all' || orderMonth === monthFilter;
    return matchesSearch && matchesMonth;
  });

  const totalRevenue = filteredOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalCommission = totalRevenue * commissionRate;

  // Get unique months for filter
  const months = [...new Set(orders.map(o => new Date(o.createdAt).toISOString().slice(0, 7)))].sort().reverse();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="heading-lg mb-1">Shipment Revenue Log</h2>
          <p className="text-gray-500 text-sm">Complete audit trail of verified Duo Designs sales.</p>
        </div>
        <button className="btn btn-outline py-2">
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            className="input pl-10" 
            placeholder="Search Order ID..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <select 
            className="input pl-10 appearance-none pointer-events-auto"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          >
            <option value="all">All Time</option>
            {months.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className="card flex items-center justify-between py-2 px-4 shadow-none border-[#2e3347] bg-[#1a1d27]/30">
          <span className="text-[10px] font-bold text-gray-600 uppercase">Filtered Log Result</span>
          <span className="text-emerald-500 font-bold">{formatCurrency(totalCommission)}</span>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Order Amount</th>
              <th className="text-emerald-500">Commission ({commissionRate * 100}%)</th>
              <th>Payout Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => {
              const monthKey = new Date(order.createdAt).toISOString().slice(0, 7);
              const isPaid = monthlyPaymentStatus[monthKey] === 'paid';
              
              return (
                <tr key={order._id}>
                  <td className="font-mono text-xs">#{order.orderId}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>
                    <div className="text-xs uppercase font-bold tracking-tight">{order.shippingAddress?.name || 'Guest'}</div>
                    <div className="text-[10px] text-gray-500">{order.shippingAddress?.city}, {order.shippingAddress?.state}</div>
                  </td>
                  <td className="font-medium">{formatCurrency(order.totalAmount)}</td>
                  <td className="text-emerald-500 font-bold">{formatCurrency(order.totalAmount * commissionRate)}</td>
                  <td>
                    {isPaid ? (
                      <div className="flex items-center gap-1.5 text-emerald-500 text-[10px] font-black uppercase">
                        <CheckCircle2 size={12} /> Received
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-amber-500 text-[10px] font-black uppercase">
                        <Clock size={12} /> Pending
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
          <div className="py-20 text-center text-gray-600">No shipments found for the current filters.</div>
        )}
      </div>
    </div>
  );
};

export default Orders;
