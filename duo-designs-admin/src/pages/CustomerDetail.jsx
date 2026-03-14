/** @file CustomerDetail.jsx */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCustomer, useCustomerOrders } from '@/hooks/useCustomers';
import PageLoader from '@/components/ui/PageLoader';
import StatusBadge from '@/components/ui/StatusBadge';
import { formatCurrency, formatDate, getInitials } from '@/utils/formatters';
import { ChevronLeft, Mail, Phone, Calendar, ShoppingBag } from 'lucide-react';

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: customer, isLoading: custLoading } = useCustomer(id);
  const { data: ordersData, isLoading: ordLoading } = useCustomerOrders(id);

  if (custLoading || ordLoading) return <PageLoader />;
  if (!customer) return <div className="sec-title">Customer not found</div>;

  const orders = ordersData?.orders || [];

  return (
    <>
      <Helmet><title>{customer.name} — Duo Admin</title></Helmet>

      <div style={{ marginBottom: '24px' }}>
        <button className="action-btn" onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0', background: 'none' }}>
          <ChevronLeft size={16} /> Back to Customers
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '32px' }}>
        
        <div className="customer-info-card">
          <div style={{ padding: '40px 32px', background: '#111', border: '1px solid #222', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent)', color: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 900, margin: '0 auto 24px' }}>
              {getInitials(customer.name)}
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', letterSpacing: '1px', marginBottom: '8px' }}>{customer.name.toUpperCase()}</h2>
            <div className="status-badge s-active">Verified Customer</div>
            
            <div style={{ height: '1px', background: '#222', margin: '32px 0' }}></div>
            
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
                <Mail size={16} color="var(--gray)" /> {customer.email}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
                <Phone size={16} color="var(--gray)" /> {customer.phone || 'No phone added'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
                <Calendar size={16} color="var(--gray)" /> Joined {new Date(customer.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="sec-title" style={{ marginTop: '32px' }}>Saved Addresses ({customer.addresses?.length || 0})</div>
          {customer.addresses?.map((addr, idx) => (
            <div key={idx} style={{ padding: '20px', background: '#111', border: '1px solid #222', marginBottom: '12px', fontSize: '12px', lineHeight: '1.6' }}>
               <div style={{fontWeight:800, marginBottom: '4px'}}>{addr.name}</div>
               <div>{addr.addressLine}</div>
               <div>{addr.city}, {addr.state} - {addr.pincode}</div>
            </div>
          ))}
        </div>

        <div className="customer-orders-history">
          <div className="sec-title" style={{display:'flex', alignItems:'center', gap:'12px'}}>
            <ShoppingBag size={18}/> Order History
          </div>
          
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Order ID</th><th>Items</th><th>Status</th><th>Total</th><th>Date</th><th>Action</th></tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr><td colSpan="6" style={{textAlign:'center', padding:'32px'}}>This customer hasn't placed any orders yet.</td></tr>
                ) : (
                  orders.map(order => (
                    <tr key={order._id}>
                      <td><div className="td-id">#{order.orderId}</div></td>
                      <td>{order.items.length} items</td>
                      <td><StatusBadge status={order.status} /></td>
                      <td style={{fontWeight:800}}>{formatCurrency(order.totalAmount)}</td>
                      <td style={{fontSize:'12px', color:'var(--gray)'}}>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button className="action-btn" onClick={() => navigate(`/orders/${order._id}`)}>Details</button>
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

export default CustomerDetail;
