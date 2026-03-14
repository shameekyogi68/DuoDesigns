/** @file OrderDetail.jsx */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useOrder, useUpdateOrderStatus } from '@/hooks/useOrders';
import { formatCurrency, formatDate } from '@/utils/formatters';
import StatusBadge from '@/components/ui/StatusBadge';
import PageLoader from '@/components/ui/PageLoader';
import { ChevronLeft, Truck, CheckCircle, Package, Printer } from 'lucide-react';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: order, isLoading, isError } = useOrder(id);
  const { confirm, dispatch, deliver } = useUpdateOrderStatus();

  if (isLoading) return <PageLoader />;
  if (isError || !order) return <div className="sec-title">Order not found</div>;

  return (
    <>
      <Helmet><title>Order #{order.orderId} — Duo Admin</title></Helmet>
      
      <div style={{ marginBottom: '24px' }}>
        <button className="action-btn" onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0', background: 'none' }}>
          <ChevronLeft size={16} /> Back to Orders
        </button>
      </div>

      <div className="order-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '32px', letterSpacing: '2px' }}>ORDER #{order.orderId}</h1>
            <StatusBadge status={order.status} />
          </div>
          <div style={{ color: 'var(--gray)', fontSize: '13px' }}>
            Placed on {formatDate(order.createdAt, 'PPpp')}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-form" onClick={() => window.print()} style={{ background: '#222', borderColor: '#333' }}>
            <Printer size={14} style={{ marginRight: '8px' }} /> Print Invoice
          </button>
          {order.status === 'placed' && (
            <button className="btn-form" onClick={() => confirm.mutate(order._id)}>
              <CheckCircle size={14} style={{ marginRight: '8px' }} /> Confirm Order
            </button>
          )}
          {order.status === 'confirmed' && (
            <button className="btn-form" onClick={() => dispatch.mutate({ id: order._id, payload: { carrier: 'Bluedart', trackingId: 'FAKE1234' }})}>
              <Truck size={14} style={{ marginRight: '8px' }} /> Dispatch Order
            </button>
          )}
          {order.status === 'dispatched' && (
            <button className="btn-form" onClick={() => deliver.mutate(order._id)}>
              <Package size={14} style={{ marginRight: '8px' }} /> Mark Delivered
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px' }}>
        <div className="order-left">
          <div className="sec-title">Order Items ({order.items.length})</div>
          <div className="table-wrap" style={{ marginBottom: '32px' }}>
            <table>
              <thead>
                <tr><th>Item</th><th>SKU</th><th>Price</th><th>Qty</th><th>Total</th></tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="td-name">{item.product.name}</div>
                      <div className="td-meta">Variant: {item.variant.name}</div>
                    </td>
                    <td>{item.variant.sku}</td>
                    <td>{formatCurrency(item.price)}</td>
                    <td>{item.quantity}</td>
                    <td>{formatCurrency(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              <div className="sec-title">Shipping Address</div>
              <div style={{ padding: '24px', background: '#111', border: '1px solid #222', fontSize: '13px', lineHeight: '1.6' }}>
                <div style={{ fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>{order.shippingAddress.name}</div>
                <div>{order.shippingAddress.addressLine}</div>
                <div>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</div>
                <div>Phone: {order.shippingAddress.phone}</div>
              </div>
            </div>
            <div>
              <div className="sec-title">Payment Info</div>
              <div style={{ padding: '24px', background: '#111', border: '1px solid #222', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--gray)' }}>Method</span>
                  <span>{order.paymentMethod.toUpperCase()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--gray)' }}>Status</span>
                  <span style={{ color: order.paymentStatus === 'paid' ? 'var(--green)' : 'var(--red)', fontWeight: 700 }}>{order.paymentStatus.toUpperCase()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--gray)' }}>Transaction ID</span>
                  <span style={{ fontFamily: 'monospace' }}>{order.paymentId || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-right">
          <div className="sec-title">Summary</div>
          <div style={{ padding: '24px', background: '#111', border: '1px solid #222' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '13px' }}>
              <span style={{ color: 'var(--gray)' }}>Subtotal</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '13px' }}>
              <span style={{ color: 'var(--gray)' }}>Shipping</span>
              <span>{order.shippingCharge === 0 ? 'FREE' : formatCurrency(order.shippingCharge)}</span>
            </div>
            {order.couponCode && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '13px', color: 'var(--accent)' }}>
                <span>Discount ({order.couponCode})</span>
                <span>-{formatCurrency(order.discountAmount)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '13px' }}>
              <span style={{ color: 'var(--gray)' }}>GST ({order.gstType?.toUpperCase()})</span>
              <span>{formatCurrency(order.gstAmount)}</span>
            </div>
            <div style={{ height: '1px', background: '#222', margin: '16px 0' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', letterSpacing: '1px' }}>TOTAL</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--accent)' }}>{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>

          <div className="sec-title" style={{ marginTop: '32px' }}>Note</div>
          <div style={{ padding: '20px', background: '#111', border: '1px solid #222', fontSize: '13px', fontStyle: order.customerNote ? 'normal' : 'italic', color: order.customerNote ? 'inherit' : 'var(--gray)' }}>
            {order.customerNote || 'No note from customer'}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
