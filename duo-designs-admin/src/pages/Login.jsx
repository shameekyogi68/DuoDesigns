/** @file Login.jsx */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAdminAuthStore } from '@/store/auth.store';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import toast from 'react-hot-toast';

const Login = () => {
  const [step, setStep] = useState(1); // 1 = Email, 2 = OTP
  const [email, setEmail] = useState('admin@duodesigns.in');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAdminAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || ROUTES.DASHBOARD;

  const handleSendOTP = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      toast.success('OTP sent to ' + email);
    }, 800);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate verification
    setTimeout(() => {
      login({ email, name: 'Senior Admin', role: 'admin' }, 'fake-jwt-token');
      navigate(from, { replace: true });
      toast.success('Welcome back, Admin');
    }, 1000);
  };

  return (
    <>
      <Helmet><title>Login — Duo Admin</title></Helmet>
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}>
        <div style={{ width: '400px', background: '#111', padding: '40px', border: '1px solid #222' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', letterSpacing: '2px', color: 'var(--white)', textAlign: 'center', marginBottom: '8px' }}>
            DUO<span>DESIGNS</span>
          </div>
          <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--gray)', textAlign: 'center', marginBottom: '32px' }}>
            Internal Management System
          </div>
          
          {step === 1 ? (
            <form onSubmit={handleSendOTP}>
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Admin Email</label>
                <input 
                  type="email" 
                  className="form-input" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <button type="submit" className="btn-form" style={{ width: '100%' }} disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Generate Secure OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify}>
              <div style={{ padding: '16px', background: '#1a1a1a', border: '1px solid #333', marginBottom: '24px', fontSize: '12px', color: 'var(--gray)' }}>
                Secure OTP sent to <b>{email}</b>. Please check your inbox.
              </div>
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Enter 6-Digit Code</label>
                <input 
                  type="text" 
                  maxLength="6"
                  className="form-input" 
                  style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '8px', fontFamily: 'monospace' }}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="000000"
                  required 
                />
              </div>
              <button type="submit" className="btn-form" style={{ width: '100%' }} disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Authorize Access'}
              </button>
              <button 
                type="button" 
                onClick={() => setStep(1)}
                style={{ background: 'none', border: 'none', color: 'var(--gray)', width: '100%', marginTop: '16px', fontSize: '11px', textTransform: 'uppercase', cursor: 'pointer' }}
              >
                Back to step 1
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
