/** @file Coupons.jsx */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useCoupons, useCreateCoupon, useDeleteCoupon } from '@/hooks/useCoupons';
import PageLoader from '@/components/ui/PageLoader';
import EmptyState from '@/components/ui/EmptyState';
import { formatCurrency } from '@/utils/formatters';
import { Trash2, Plus } from 'lucide-react';

const Coupons = () => {
  const { data, isLoading } = useCoupons();
  const { mutate: createCoupon, isLoading: isCreating } = useCreateCoupon();
  const { mutate: deleteCoupon } = useDeleteCoupon();
  const [showAdd, setShowAdd] = useState(false);

  const [form, setForm] = useState({
    code: '', type: 'percentage', value: 0, minPurchase: 0, maxDiscount: 0, expiresAt: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createCoupon(form, {
      onSuccess: () => {
        setShowAdd(false);
        setForm({ code: '', type: 'percentage', value: 0, minPurchase: 0, maxDiscount: 0, expiresAt: '' });
      }
    });
  };

  if (isLoading) return <PageLoader />;

  return (
    <>
      <Helmet><title>Coupons — Duo Admin</title></Helmet>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
        <button className="btn-form" onClick={() => setShowAdd(!showAdd)}>
          <Plus size={14} style={{ marginRight: '8px' }} /> {showAdd ? 'Close' : 'New Coupon'}
        </button>
      </div>

      {showAdd && (
        <div style={{ background: '#111', border: '1px solid #222', padding: '32px', marginBottom: '32px' }}>
          <div className="sec-title">Create New Promo Code</div>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Coupon Code</label>
              <input type="text" className="form-input" value={form.code} onChange={e => setForm({...form, code: e.target.value.toUpperCase()})} required placeholder="E.G. FIRST50" />
            </div>
            <div className="form-group">
              <label className="form-label">Type</label>
              <select className="form-input" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₹)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Discount Value</label>
              <input type="number" className="form-input" value={form.value} onChange={e => setForm({...form, value: parseFloat(e.target.value)})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Min. Purchase (₹)</label>
              <input type="number" className="form-input" value={form.minPurchase} onChange={e => setForm({...form, minPurchase: parseFloat(e.target.value)})} />
            </div>
            <div className="form-group">
              <label className="form-label">Max Discount (₹)</label>
              <input type="number" className="form-input" value={form.maxDiscount} onChange={e => setForm({...form, maxDiscount: parseFloat(e.target.value)})} />
            </div>
            <div className="form-group">
              <label className="form-label">Expiry Date</label>
              <input type="date" className="form-input" value={form.expiresAt} onChange={e => setForm({...form, expiresAt: e.target.value})} />
            </div>
            <div style={{ gridColumn: 'span 3', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" disabled={isCreating} className="btn-form">
                {isCreating ? 'CREATING...' : 'SAVE COUPON'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Code</th><th>Type</th><th>Value</th><th>Min. Order</th><th>Usage</th><th>Expiry</th><th>Action</th></tr>
          </thead>
          <tbody>
            {(data?.coupons || []).length === 0 ? (
              <tr><td colSpan="7"><EmptyState /></td></tr>
            ) : (
              data.coupons.map((c) => (
                <tr key={c._id}>
                  <td><div style={{ fontWeight: 900, fontSize: '14px', letterSpacing: '1px', background: '#222', display: 'inline-block', padding: '4px 8px' }}>{c.code}</div></td>
                  <td style={{ textTransform: 'uppercase', fontSize: '11px', fontWeight: 700 }}>{c.type}</td>
                  <td style={{ fontWeight: 800 }}>{c.type === 'percentage' ? `${c.value}%` : formatCurrency(c.value)}</td>
                  <td>{formatCurrency(c.minPurchase)}</td>
                  <td>{c.usageCount} users</td>
                  <td style={{ color: new Date(c.expiresAt) < new Date() ? 'var(--red)' : 'var(--gray)' }}>
                    {c.expiresAt ? new Date(c.expiresAt).toLocaleDateString() : 'Never'}
                  </td>
                  <td>
                    <button className="action-btn danger" onClick={() => { if(window.confirm('Delete this coupon?')) deleteCoupon(c._id); }}>
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Coupons;
