import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Zap, Lock, Mail, Loader2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isLoggedIn, error } = useAuthStore();
  const navigate = useNavigate();

  if (isLoggedIn) return <Navigate to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await login(email, password);
    setIsLoading(false);
    
    if (success) {
      toast.success('System Bypass Granted.');
      navigate('/');
    } else {
      toast.error('Identity Denied');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap size={40} className="text-[#e8ff3b] fill-[#e8ff3b]" />
            <h1 className="font-heading text-6xl text-white tracking-widest">AGENCY</h1>
          </div>
          <div className="h-[1px] w-12 bg-[#e8ff3b] mx-auto mb-4"></div>
          <p className="text-gray-600 text-[10px] uppercase font-black tracking-[0.4em]">Revenue Analytics Terminal</p>
        </div>

        <div className="card border-[#222]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="form-label">Authorized Email</label>
              <input 
                type="email" 
                className="input" 
                placeholder="ID@AGENCY.PRO"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="form-label">Secure Key</label>
              <input 
                type="password" 
                className="input" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn w-full py-4 text-xl"
            >
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : 'INITIALIZE SYSTEM'}
              {!isLoading && <ArrowRight size={20} className="ml-auto" />}
            </button>
          </form>
        </div>
        
        <p className="text-center text-[#222] text-[10px] mt-12 uppercase font-black tracking-[0.5em]">
          Duo Designs Private Infrastructure
        </p>
      </div>
    </div>
  );
};

export default Login;
