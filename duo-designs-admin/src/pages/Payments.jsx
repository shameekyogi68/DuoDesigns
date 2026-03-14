import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { paymentsApi } from '@/api';

const Payments = () => {
  const { data, isLoading } = useQuery({ queryKey: ['payments'], queryFn: async () => { const res = await paymentsApi.getAll(); return res.data.data; }});

  const handleExport = async () => {
    try {
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const res = await paymentsApi.getGSTReport(month, year);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `GST_Report_${month}_${year}.xlsx`);
      document.body.appendChild(link);
      link.click();
      toast.success('Report downloaded');
    } catch (err) {
      toast.error('Failed to export report');
    }
  };

  return (
    <>
      <Helmet><title>Payments — Duo Admin</title></Helmet>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
        <button className="btn-form" onClick={handleExport}>Download GST Report</button>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Revenue</div>
          <div className="stat-num">₹48,240</div>
          <div className="stat-icon">💰</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Razorpay Fees (2%)</div>
          <div className="stat-num">₹964</div>
          <div className="stat-icon">💳</div>
        </div>
      </div>
      
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Order ID</th><th>Customer</th><th>Amount</th><th>CGST</th><th>SGST</th><th>IGST</th><th>Razorpay ID</th><th>Status</th></tr>
          </thead>
          <tbody>
            {isLoading ? <tr><td colSpan="8">Loading...</td></tr> :
              (data?.payments || []).length === 0 ? <tr><td colSpan="8" style={{textAlign:'center', padding:'32px'}}>No payments found</td></tr> :
              data.payments.map(p => (
                <tr key={p._id}>
                  <td><div className="td-id">#{p.order?.orderId}</div></td>
                  <td>{p.order?.user?.name}</td>
                  <td>₹{p.amount}</td>
                  <td>—</td>
                  <td>—</td>
                  <td>—</td>
                  <td>{p.razorpayPaymentId}</td>
                  <td><span className="status-badge s-paid">Paid</span></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Payments;
