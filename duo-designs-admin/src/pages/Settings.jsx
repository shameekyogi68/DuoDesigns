/** @file Settings.jsx */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi } from '@/api';
import PageLoader from '@/components/ui/PageLoader';
import toast from 'react-hot-toast';
import { Save, AlertTriangle, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

const Settings = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['settings'], queryFn: async () => { const res = await settingsApi.get(); return res.data.data; }});
  
  const { register, handleSubmit, reset } = useForm();

  const updateSettings = useMutation({
    mutationFn: (payload) => settingsApi.update(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast.success('Settings saved successfully');
    }
  });

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  if (isLoading) return <PageLoader />;

  return (
    <>
      <Helmet><title>Settings — Duo Admin</title></Helmet>

      <form onSubmit={handleSubmit((data) => updateSettings.mutate(data))}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          
          <div className="settings-section">
            <div className="sec-title" style={{display:'flex', alignItems:'center', gap:'10px'}}><ShieldCheck size={18}/> Store General</div>
            <div style={{ padding: '32px', background: '#111', border: '1px solid #222', marginBottom: '32px' }}>
              <div className="form-group" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <label className="form-label" style={{marginBottom:0}}>Maintenance Mode</label>
                  <div style={{fontSize:'12px', color:'var(--gray)'}}>Disable customer access to the website</div>
                </div>
                <input type="checkbox" {...register('maintenanceMode')} style={{width:'20px', height:'20px', accentColor:'var(--accent)'}} />
              </div>
              
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Store Announcement Bar</label>
                <input type="text" className="form-input" {...register('announcementText')} placeholder="E.g. Free shipping on orders above ₹999!" />
              </div>

              <div className="form-group">
                <label className="form-label">Default GST Rate (%)</label>
                <input type="number" className="form-input" {...register('defaultGSTRate')} />
              </div>
            </div>

            <div className="sec-title" style={{display:'flex', alignItems:'center', gap:'10px'}}><Mail size={18}/> Contact Configuration</div>
            <div style={{ padding: '32px', background: '#111', border: '1px solid #222' }}>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label">Support Email</label>
                <input type="email" className="form-input" {...register('contact.email')} />
              </div>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label">Support Phone</label>
                <input type="text" className="form-input" {...register('contact.phone')} />
              </div>
              <div className="form-group">
                <label className="form-label">Warehouse Address</label>
                <textarea className="form-input" style={{minHeight:'80px'}} {...register('contact.address')}></textarea>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="sec-title">Finance & Tax</div>
            <div style={{ padding: '32px', background: '#111', border: '1px solid #222', marginBottom: '32px' }}>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label">Seller State (for GST logic)</label>
                <select className="form-input" {...register('sellerState')}>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  {/* ... other states */}
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label">GSTIN Number</label>
                <input type="text" className="form-input" {...register('gstin')} />
              </div>
              <div className="form-group">
                <label className="form-label">Minimum Order Value for Free Shipping (₹)</label>
                <input type="number" className="form-input" {...register('minFreeShipping')} />
              </div>
            </div>

            <div className="sec-title" style={{display:'flex', alignItems:'center', gap:'10px'}}><AlertTriangle size={18} color="var(--red)"/> Critical Info</div>
            <div style={{ padding: '32px', background: '#111', border: '1px solid #222' }}>
               <p style={{fontSize:'12px', color:'var(--gray)', marginBottom:'20px', lineHeight:'1.5'}}>
                 Changes here affect real-time stock availability and payment gateways. Please verify before saving.
               </p>
               <button type="submit" disabled={updateSettings.isLoading} className="btn-form" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                 <Save size={16} /> {updateSettings.isLoading ? 'SAVING...' : 'SAVE ALL SETTINGS'}
               </button>
            </div>
          </div>

        </div>
      </form>
    </>
  );
};

export default Settings;
