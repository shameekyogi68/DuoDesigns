import { format, parseISO } from 'date-fns';

export const calculateCommission = (total, rate = 0.05) => {
  return parseFloat((total * rate).toFixed(2));
};

export const groupOrdersByMonth = (orders) => {
  return orders.reduce((acc, order) => {
    const date = typeof order.createdAt === 'string' ? parseISO(order.createdAt) : new Date(order.createdAt);
    const monthKey = format(date, 'yyyy-MM');
    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(order);
    return acc;
  }, {});
};

export const getMonthLabel = (monthKey) => {
  if (!monthKey) return 'N/A';
  const [year, month] = monthKey.split('-');
  const date = new Date(year, parseInt(month) - 1);
  return format(date, 'MMMM yyyy');
};

export const calculateMonthlyStats = (orders, rate = 0.05) => {
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalCommission = calculateCommission(totalRevenue, rate);
  
  return {
    revenue: totalRevenue,
    commission: totalCommission,
    orderCount: orders.length,
    avgOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0
  };
};

export const calculateAllTimeStats = (orders, rate = 0.05, paymentStatus = {}) => {
  const totals = calculateMonthlyStats(orders, rate);
  const grouped = groupOrdersByMonth(orders);
  
  const monthlyBreakdown = Object.keys(grouped).sort().reverse().map(monthKey => {
    const monthOrders = grouped[monthKey];
    const stats = calculateMonthlyStats(monthOrders, rate);
    return {
      monthKey,
      label: getMonthLabel(monthKey),
      ...stats,
      status: paymentStatus[monthKey] || 'pending'
    };
  });

  return {
    ...totals,
    totalOrders: orders.length,
    monthlyBreakdown
  };
};
