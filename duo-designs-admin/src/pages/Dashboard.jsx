/** @file Dashboard.jsx */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDashboard } from '@/hooks/useDashboard';
import { useOrders } from '@/hooks/useOrders';
import { useProducts } from '@/hooks/useProducts';
import PageLoader from '@/components/ui/PageLoader';
import StatCard from '@/components/ui/StatCard';
import StatusBadge from '@/components/ui/StatusBadge';
import RevenueChart from '@/components/charts/RevenueChart';
import OrdersChart from '@/components/charts/OrdersChart';
import CategoryPieChart from '@/components/charts/CategoryPieChart';
import StockStatusChart from '@/components/charts/StockStatusChart';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { IndianRupee, ShoppingBag, Shirt, Users, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: stats, isLoading: statsLoading } = useDashboard();
  const { data: ordersData, isLoading: ordersLoading } = useOrders({ limit: 5 });
  const { data: productsData, isLoading: productsLoading } = useProducts();

  if (statsLoading || ordersLoading || productsLoading) return <PageLoader />;

  const recentOrders = ordersData?.orders || [];
  const lowStockProducts = (productsData?.products || [])
    .flatMap(p => p.variants.map(v => ({ ...v, productName: p.name })))
    .filter(v => v.stock < 10)
    .slice(0, 5);

  return (
    <>
      <Helmet><title>Dashboard — Duo Admin</title></Helmet>

      <div className="stats-grid">
        <StatCard 
          label="Total Revenue" 
          value={formatCurrency(stats?.totalRevenue || 48240)} 
          trend="up" 
          trendValue="18% this month" 
          icon={IndianRupee}
        />
        <StatCard 
          label="Total Orders" 
          value={stats?.totalOrders || 124} 
          trend="up" 
          trendValue="12 new today" 
          icon={ShoppingBag}
        />
        <StatCard 
          label="Products Live" 
          value={productsData?.total || 24} 
          trend="up" 
          trendValue="2 added this week" 
          icon={Shirt}
        />
        <StatCard 
          label="Active Customers" 
          value={stats?.totalCustomers || 89} 
          trend="up" 
          trendValue="5 new this week" 
          icon={Users}
        />
      </div>

      <div className="chart-row">
        <div className="chart-box">
          <div className="sec-title" style={{ fontSize: '18px', marginBottom: '24px' }}>Revenue This Week</div>
          <RevenueChart />
        </div>
        <div className="chart-box">
          <div className="sec-title" style={{ fontSize: '18px', marginBottom: '24px' }}>Orders This Week</div>
          <OrdersChart />
        </div>
      </div>

      <div className="chart-row" style={{ borderTop: 'none' }}>
        <div className="chart-box">
          <div className="sec-title" style={{ fontSize: '16px', marginBottom: '16px' }}>Category Wise Sales</div>
          <CategoryPieChart />
        </div>
        <div className="chart-box">
          <div className="sec-title" style={{ fontSize: '16px', marginBottom: '16px' }}>Inventory Health</div>
          <StockStatusChart />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', border: '1px solid #222' }}>
        <div style={{ padding: '24px', borderRight: '1px solid #222' }}>
          <div className="sec-title">
            Recent Orders 
            <span onClick={() => navigate(ROUTES.ORDERS)}>View All →</span>
          </div>
          <div className="table-wrap" style={{ border: 'none', margin: '0' }}>
            <table>
              <thead>
                <tr><th>Order ID</th><th>Customer</th><th>Amount</th><th>Status</th></tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 ? (
                  <tr><td colSpan="4" style={{textAlign:'center', padding:'20px'}}>No recent orders</td></tr>
                ) : (
                  recentOrders.map(order => (
                    <tr key={order._id}>
                      <td><div className="td-id">#{order.orderId}</div></td>
                      <td><div className="td-name">{order.shippingAddress.name}</div></td>
                      <td style={{fontWeight:800}}>{formatCurrency(order.totalAmount)}</td>
                      <td><StatusBadge status={order.status} /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ padding: '24px' }}>
          <div className="sec-title">
            Low Stock Alert
            <span onClick={() => navigate(ROUTES.STOCK)}>Inventory →</span>
          </div>
          <div className="table-wrap" style={{ border: 'none', margin: '0' }}>
            <table>
              <thead>
                <tr><th>Product</th><th>Variant</th><th>Stock</th><th>Action</th></tr>
              </thead>
              <tbody>
                {lowStockProducts.length === 0 ? (
                  <tr><td colSpan="4" style={{textAlign:'center', padding:'20px'}}>All items healthy</td></tr>
                ) : (
                  lowStockProducts.map((v, idx) => (
                    <tr key={idx}>
                      <td><div className="td-name">{v.productName}</div></td>
                      <td>{v.name}</td>
                      <td>
                        <span style={{ fontWeight: 800, color: 'var(--red)' }}>{v.stock} left</span>
                      </td>
                      <td>
                        <button className="action-btn" onClick={() => navigate(ROUTES.STOCK)}>Update</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
