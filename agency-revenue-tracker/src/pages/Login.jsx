import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Shield, Loader2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  if (isLoggedIn) return <Navigate to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);
    
    if (success) {
      toast.success('DECRYPTED. ACCESS GRANTED.');
      navigate('/');
    } else {
      toast.error('IDENTITY NOT VERIFIED');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-8 selection:bg-[var(--accent)] selection:text-[var(--black)]">
      {/* Background Matrix Element */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden text-[10px] leading-none font-mono text-[var(--white)] whitespace-pre">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="mb-2">DUO_AGENCY_PORTAL_LOG_NODE_{i}_STATUS_ACTIVE_00x00A_HANDSHAKE_VERIFIED</div>
        ))}
      </div>

      <div className="w-full max-w-md relative z-10 transition-all duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#161600] border border-[var(--accent)] rounded-2xl mb-6 shadow-[0_0_30px_rgba(232,255,59,0.1)]">
             <Shield className="text-[var(--accent)]" size={40} />
          </div>
          <h1 className="text-5xl font-heading tracking-[6px] text-[var(--white)] leading-none mb-2">AGENCY PORTAL</h1>
          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[var(--gray)] pt-4 border-t border-[#222] w-48 mx-auto">
            Authorized Access Only
          </p>
        </div>

        <div className="bg-[#111] border border-[#222] p-10 shadow-2xl relative">
          {/* Accent Corner Labels */}
          <div className="absolute -top-[1px] -left-[1px] bg-[var(--accent)] px-2 py-0.5 text-[8px] font-black text-black">V1.0</div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[2px] text-[var(--gray)] ml-1">Terminal ID</label>
              <input 
                type="email" 
                className="form-box-input" 
                placeholder="ADMIN@DUODESIGNS.IN"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[2px] text-[var(--gray)] ml-1">Pin / Secure Code</label>
              <input 
                type="password" 
                className="form-box-input" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full btn-action primary py-4 group"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <span>ENTER TERMINAL</span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-all" />
                </div>
              )}
            </button>
          </form>
        </div>
        
        <div className="mt-12 text-center flex flex-col items-center gap-6 opacity-40">
           <div className="flex gap-1">
              {[1,2,3,4,5,6].map(i => <div key={i} className="w-10 h-[1px] bg-[var(--gray)]"></div>)}
           </div>
           <p className="text-[9px] uppercase font-bold tracking-[4px]">Duo Designs Secure Infrastructure © 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
