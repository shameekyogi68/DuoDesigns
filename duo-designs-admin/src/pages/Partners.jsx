/** @file Partners.jsx */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { partnersApi } from '@/api';
import PageLoader from '@/components/ui/PageLoader';
import EmptyState from '@/components/ui/EmptyState';
import { formatCurrency } from '@/utils/formatters';
import { Plus, Check, Trash2, Handshake } from 'lucide-react';
import toast from 'react-hot-toast';

const Partners = () => {
  const queryClient = useQueryClient();
  const { data: summary, isLoading: sumLoading } = useQuery({ queryKey: ['partnersSummary'], queryFn: async () => { const res = await partnersApi.getSummary(); return res.data.data; }});
  const { data: partners, isLoading: listLoading } = useQuery({ queryKey: ['partners'], queryFn: async () => { const res = await partnersApi.getAll(); return res.data.data; }});

  const [form, setForm] = useState({ name: '', platform: 'Instagram', handle: '', commissionRate: 10 });
  const [showAdd, setShowAdd] = useState(false);

  const createPartner = useMutation({
    mutationFn: (payload) => partnersApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      setForm({ name: '', platform: 'Instagram', handle: '', commissionRate: 10 });
      setShowAdd(false);
      toast.success('Partner added successfully');
    }
  });

  const markPaid = useMutation({
    mutationFn: (id) => partnersApi.markPaid(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      toast.success('Commission marked as paid');
    }
  });

  if (sumLoading || listLoading) return <PageLoader />;

  return (
    <>
      <Helmet><title>Partnership — Duo Admin</title></Helmet>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Active Partners</div>
          <div className="stat-num">{summary?.totalPartners || 0}</div>
          <div className="stat-icon"><Handshake size={28}/></div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Affiliate Sales</div>
          <div className="stat-num">{formatCurrency(summary?.totalSales || 0)}</div>
          <div className="stat-icon">📈</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending Commission</div>
          <div className="stat-num" style={{color:'var(--red)'}}>{formatCurrency(summary?.pendingCommission || 0)}</div>
          <div className="stat-icon">🕒</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
        <button className="btn-form" onClick={() => setShowAdd(!showAdd)}>
          <Plus size={14} style={{ marginRight: '8px' }} /> {showAdd ? 'Cancel' : 'Register Partner'}
        </button>
      </div>

      {showAdd && (
        <div style={{ background: '#111', border: '1px solid #222', padding: '32px', marginBottom: '32px' }}>
          <div className="sec-title">Partner Registration</div>
          <form onSubmit={(e) => { e.preventDefault(); createPartner.mutate(form); }} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Platform</label>
              <select className="form-input" value={form.platform} onChange={e => setForm({...form, platform: e.target.value})}>
                <option value="Instagram">Instagram</option>
                <option value="Youtube">Youtube</option>
                <option value="Twitter">Twitter/X</option>
                <option value="Blog">Personal Blog</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Handle / URL</label>
              <input type="text" className="form-input" value={form.handle} onChange={e => setForm({...form, handle: e.target.value})} required placeholder="@username" />
            </div>
            <div className="form-group">
              <label className="form-label">Comm. Rate (%)</label>
              <input type="number" className="form-input" value={form.commissionRate} onChange={e => setForm({...form, commissionRate: parseInt(e.target.value)})} />
            </div>
            <div style={{ gridColumn: 'span 4', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" disabled={createPartner.isLoading} className="btn-form">SAVE PARTNER</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Partner</th><th>Handle</th><th>Sales (Qty)</th><th>Total Value</th><th>Commission</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {(partners?.partners || []).length === 0 ? (
              <tr><td colSpan="7"><EmptyState /></td></tr>
            ) : (
              partners.partners.map((p) => (
                <tr key={p._id}>
                  <td><div className="td-name">{p.name}</div><div className="td-meta">{p.platform}</div></td>
                  <td><code style={{fontSize:'12px', color:'var(--accent)'}}>{p.handle}</code></td>
                  <td>{p.salesCount || 0} orders</td>
                  <td style={{fontWeight:800}}>{formatCurrency(p.salesValue || 0)}</td>
                  <td style={{color: p.commissionPending > 0 ? 'var(--red)' : 'var(--green)', fontWeight:900}}>
                    {formatCurrency(p.commissionPending || 0)}
                  </td>
                  <td>
                    {p.commissionPending > 0 ? (
                      <span className="status-badge s-placed">Pending Pay</span>
                    ) : (
                      <span className="status-badge s-paid">Settled</span>
                    )}
                  </td>
                  <td>
                    <div style={{display:'flex', gap:'8px'}}>
                      {p.commissionPending > 0 && (
                        <button className="action-btn" onClick={() => markPaid.mutate(p._id)} style={{color:'var(--green)'}}>
                          <Check size={14} /> Pay
                        </button>
                      )}
                      <button className="action-btn danger"><Trash2 size={14} /></button>
                    </div>
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

export default Partners;
