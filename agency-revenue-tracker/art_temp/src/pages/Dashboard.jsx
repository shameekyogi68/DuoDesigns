import React, { useEffect } from 'react';
import { useOrdersStore } from '@/store/ordersStore';
import StatCard from '@/components/ui/StatCard';
import MonthlyRevenueChart from '@/components/charts/MonthlyRevenueChart';
import PaymentStatusChart from '@/components/charts/PaymentStatusChart';
import { formatCurrency } from '@/utils/formatters';
import { 
  TrendingUp, 
  Wallet, 
  Calendar, 
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/app';

const Dashboard = () => {
  const { getStats, orders, syncOrders, lastSyncedAt } = useOrdersStore();
  const stats = getStats();

  useEffect(() => {
    if (orders.length === 0) {
      syncOrders();
    }
  }, []);

  const currentMonthData = stats.monthlyBreakdown[0] || { revenue: 0, commission: 0, orderCount: 0 };
  
  const totalPaid = stats.monthlyBreakdown
    .filter(m => m.status === 'paid')
    .reduce((sum, m) => sum + m.commission, 0);
  
  const totalPending = stats.monthlyBreakdown
    .filter(m => m.status === 'pending')
    .reduce((sum, m) => sum + m.commission, 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="heading-lg mb-1">Revenue Intelligence</h2>
        <p className="text-gray-500 text-sm">Real-time performance metrics tracking 5% agency commission.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          label="Managed Ecosystem Revenue" 
          value={formatCurrency(stats.revenue)} 
          sub={`Audit of ${stats.totalOrders} total shipments`}
          icon={TrendingUp}
          colorClass="text-indigo-500"
        />
        <StatCard 
          label="Revenue (Current Cycle)" 
          value={formatCurrency(currentMonthData.revenue)} 
          sub={`${currentMonthData.orderCount} active orders`}
          icon={ShoppingBag}
          colorClass="text-indigo-400"
        />
        <StatCard 
          label="Agency Net Earnings" 
          value={formatCurrency(stats.commission)} 
          sub="Accumulated at flat 5.0%"
          icon={Wallet}
          colorClass="text-emerald-400"
        />
        <StatCard 
          label="Next Settlement Due" 
          value={formatCurrency(currentMonthData.commission)} 
          sub="Projected for current month"
          icon={Calendar}
          colorClass="text-amber-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-8">
            <h3 className="heading-sm">Revenue History (Bar: Revenue, Last 12 Months)</h3>
          </div>
          <MonthlyRevenueChart data={stats.monthlyBreakdown.slice(0, 12).reverse()} />
        </div>

        <div className="card">
          <h3 className="heading-sm mb-8">Commission Collection Status</h3>
          <PaymentStatusChart paid={totalPaid} pending={totalPending} />
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Total Paid</span>
              <span className="text-emerald-500 font-bold">{formatCurrency(totalPaid)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Total Pending</span>
              <span className="text-amber-500 font-bold">{formatCurrency(totalPending)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="heading-sm">Recent Managed Transactions</h3>
          <Link to={ROUTES.ORDERS} className="text-xs text-indigo-400 flex items-center gap-1 hover:underline font-bold">
            VIEW ALL SHIPMENTS <ArrowRight size={12} />
          </Link>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Channel</th>
                <th>Subtotal</th>
                <th>GST</th>
                <th>Order Total</th>
                <th className="text-emerald-500">5% Commission</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 8).map(order => (
                <tr key={order._id}>
                  <td className="font-mono text-xs">#{order.orderId}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</td>
                  <td>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-400 font-bold">ONLINE</span>
                  </td>
                  <td>{formatCurrency(order.totalAmount / 1.12)}</td>
                  <td className="text-gray-500">{formatCurrency(order.totalAmount - (order.totalAmount / 1.12))}</td>
                  <td className="font-bold">{formatCurrency(order.totalAmount)}</td>
                  <td className="text-emerald-500 font-bold">{formatCurrency(order.totalAmount * 0.05)}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-gray-500">No orders synced from Duo Designs yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
