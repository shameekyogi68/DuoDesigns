import React, { useState, useEffect } from 'react';
import { useOrdersStore } from '@/store/ordersStore';
import { Save, Shield, Database, Building, Landmark, Percent } from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const { adminToken, setAdminToken, commissionRate, setCommissionRate } = useOrdersStore();
  
  const [tokenInput, setTokenInput] = useState(adminToken || '');
  const [rateInput, setRateInput] = useState(commissionRate * 100);

  // Agency Details (stored in localSettings)
  const [agencyDetails, setAgencyDetails] = useState(() => {
    const saved = localStorage.getItem('art_agency_details');
    return saved ? JSON.parse(saved) : {
      name: '',
      address: '',
      email: '',
      bankName: '',
      accountNo: '',
      ifsc: ''
    };
  });

  const handleSaveAPI = (e) => {
    e.preventDefault();
    setAdminToken(tokenInput);
    setCommissionRate(rateInput / 100);
    toast.success('API Configuration Saved');
  };

  const handleSaveAgency = (e) => {
    e.preventDefault();
    localStorage.setItem('art_agency_details', JSON.stringify(agencyDetails));
    toast.success('Agency Details Saved');
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="heading-lg mb-1">System Settings</h2>
        <p className="text-gray-500 text-sm">Configure API connectivity and business logic.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* API Settings */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="heading-sm mb-6 flex items-center gap-2">
              <Shield size={16} className="text-indigo-500" /> API Connectivity
            </h3>
            <form onSubmit={handleSaveAPI} className="space-y-4">
              <div>
                <label className="form-label block mb-2">Duo Designs Admin Token</label>
                <input 
                  type="password" 
                  className="input" 
                  placeholder="Paste JWT Admin Token"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                />
                <p className="text-[10px] text-gray-500 mt-2 uppercase font-bold">Never share this token with clients</p>
              </div>

              <div>
                <label className="form-label block mb-2">Commission Rate (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    step="0.1"
                    className="input pr-10" 
                    value={rateInput}
                    onChange={(e) => setRateInput(e.target.value)}
                  />
                  <Percent className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                </div>
              </div>

              <button type="submit" className="btn w-full mt-2">
                <Save size={16} /> Save API Config
              </button>
            </form>
          </div>
        </div>

        {/* Agency Details for PDF */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="heading-sm mb-6 flex items-center gap-2">
              <Building size={16} className="text-indigo-500" /> Agency Identity (for PDF)
            </h3>
            <form onSubmit={handleSaveAgency} className="space-y-4">
              <div>
                <label className="form-label block mb-2">Agency Name</label>
                <input 
                  type="text" 
                  className="input" 
                  value={agencyDetails.name}
                  onChange={(e) => setAgencyDetails({...agencyDetails, name: e.target.value})}
                />
              </div>
              <div>
                <label className="form-label block mb-2">Support Email</label>
                <input 
                  type="email" 
                  className="input" 
                  value={agencyDetails.email}
                  onChange={(e) => setAgencyDetails({...agencyDetails, email: e.target.value})}
                />
              </div>
              <button type="submit" className="btn btn-outline w-full mt-2">
                <Save size={16} /> Update Branding
              </button>
            </form>
          </div>
        </div>
      </div >

      {/* Bank Details */}
      <div className="card">
        <h3 className="heading-sm mb-6 flex items-center gap-2">
          <Landmark size={16} className="text-indigo-500" /> Payout Destination
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="form-label block mb-2">Bank Name</label>
            <input 
              type="text" 
              className="input" 
              value={agencyDetails.bankName}
              onChange={(e) => setAgencyDetails({...agencyDetails, bankName: e.target.value})}
            />
          </div>
          <div>
            <label className="form-label block mb-2">Account Number</label>
            <input 
              type="text" 
              className="input" 
              value={agencyDetails.accountNo}
              onChange={(e) => setAgencyDetails({...agencyDetails, accountNo: e.target.value})}
            />
          </div>
          <div>
            <label className="form-label block mb-2">IFSC Code</label>
            <input 
              type="text" 
              className="input" 
              value={agencyDetails.ifsc}
              onChange={(e) => setAgencyDetails({...agencyDetails, ifsc: e.target.value})}
            />
          </div>
        </div>
        <button onClick={handleSaveAgency} className="btn w-full mt-8 bg-[#252836] border border-[#2e3347] hover:bg-[#2e3347]">
          <Database size={16} /> Save Billing Profile
        </button>
      </div>
    </div>
  );
};

export default Settings;
