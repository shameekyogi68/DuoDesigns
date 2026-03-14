/** @file Shipping.jsx */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { shippingApi } from '@/api';
import PageLoader from '@/components/ui/PageLoader';
import { Plus, Trash2, Search, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const Shipping = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['shipping-zones'], queryFn: async () => { const res = await shippingApi.getAllZones(); return res.data.data; }});
  
  const [newPincode, setNewPincode] = useState({ code: '', type: 'standard', rate: 0 });
  const [search, setSearch] = useState('');

  const createZone = useMutation({
    mutationFn: (payload) => shippingApi.createZone(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipping-zones'] });
      setNewPincode({ code: '', type: 'standard', rate: 0 });
      toast.success('Shipping zone added');
    }
  });

  if (isLoading) return <PageLoader />;

  const zones = data?.zones || [];

  return (
    <>
      <Helmet><title>Shipping Zones — Duo Admin</title></Helmet>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px' }}>
        <div>
          <div className="sec-title">Active Shipping Zones</div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Pincode</th><th>Zone Type</th><th>Delivery Rate</th><th>Action</th></tr>
              </thead>
              <tbody>
                {zones.length === 0 ? (
                  <tr><td colSpan="4" style={{textAlign:'center', padding:'32px'}}>No shipping zones configured</td></tr>
                ) : (
                  zones.filter(z => z.pincode.includes(search)).map((z) => (
                    <tr key={z._id}>
                      <td><div style={{display:'flex', alignItems:'center', gap:'8px'}}><MapPin size={12} color="var(--accent)"/> <strong>{z.pincode}</strong></div></td>
                      <td style={{textTransform:'uppercase', fontSize:'11px', fontWeight:700}}>{z.type}</td>
                      <td>{z.rate === 0 ? <span style={{color:'var(--green)', fontWeight:800}}>FREE</span> : `₹${z.rate}`}</td>
                      <td>
                        <button className="action-btn danger"><Trash2 size={14}/></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="sec-title">Add New Pincode</div>
          <div style={{ padding: '24px', background: '#111', border: '1px solid #222' }}>
            <form onSubmit={(e) => { e.preventDefault(); createZone.mutate({ pincode: newPincode.code, type: newPincode.type, rate: newPincode.rate }); }}>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Search / Filter</label>
                <div style={{ position: 'relative' }}>
                  <input type="text" className="form-input" placeholder="Quick find pincode..." value={search} onChange={e => setSearch(e.target.value)} />
                  <Search size={14} style={{ position: 'absolute', right: '12px', top: '12px', color: '#444' }} />
                </div>
              </div>
              
              <div style={{ height: '1px', background: '#222', margin: '24px 0' }}></div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">New Pincode</label>
                <input type="text" className="form-input" value={newPincode.code} onChange={e => setNewPincode({...newPincode, code: e.target.value})} required maxLength="6" placeholder="6 Digit Code" />
              </div>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Delivery Type</label>
                <select className="form-input" value={newPincode.type} onChange={e => setNewPincode({...newPincode, type: e.target.value})}>
                  <option value="standard">Standard (3-5 Days)</option>
                  <option value="express">Express (Next Day)</option>
                  <option value="local">Local Delivery</option>
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Delivery Charge (₹)</label>
                <input type="number" className="form-input" value={newPincode.rate} onChange={e => setNewPincode({...newPincode, rate: parseFloat(e.target.value)})} />
              </div>
              <button type="submit" disabled={createZone.isLoading} className="btn-form" style={{ width: '100%' }}>
                {createZone.isLoading ? 'ADDING...' : 'ADD PINCODE'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
