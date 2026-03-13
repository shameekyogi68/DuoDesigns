/**
 * @file         Login.jsx
 * @description  Authentication page for Duo Designs.
 *               Handles login and signup using email-based OTP verification.
 *               Includes form validation and session redirection.
 *
 * @module       pages/Login
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-09
 *
 * @dependencies
 *   - react (useState)
 *   - react-router-dom (Link, useNavigate, useLocation)
 *   - react-hook-form (useForm)
 *   - constants/routes (ROUTES)
 *   - store/authStore (useAuthStore)
 *   - hooks/useOTP (useOTP)
 *   - components/ui/OTPInput
 *   - react-hot-toast (toast)
 *
 * @notes
 *   - Uses a mock OTP logic ('123456') for demonstration.
 *   - Redirects user back to their intended destination after successful login.
 */

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ROUTES } from '../constants/routes';
import { useAuthStore } from '../store/authStore';
import { useOTP } from '../hooks/useOTP';
import OTPInput from '../components/ui/OTPInput';
import toast from 'react-hot-toast';

/**
 * @component Login
 * @description Page component for user authentication (Login/Signup).
 *
 * @returns {JSX.Element} Login and signup forms with OTP functionality
 *
 * @example
 *   <Login />
 */
export default function Login() {
    const [activeTab, setActiveTab] = useState('login');

    // Login State
    const [loginStep, setLoginStep] = useState(1);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginOtpValid, setLoginOtpValid] = useState('');
    const [loginOtp, setLoginOtp] = useState('');

    // Signup State
    const [signupStep, setSignupStep] = useState(1);
    const [signupOtpValid, setSignupOtpValid] = useState('');
    const [signupOtp, setSignupOtp] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const login = useAuthStore(s => s.login);
    const redirectPath = location.state?.from || ROUTES.HOME;

    const loginOTPTimer = useOTP();
    const signupOTPTimer = useOTP();

    const signupForm = useForm({
        defaultValues: { name: '', email: '', phone: '' }
    });

    // Login handlers
    const handleLoginEmailSubmit = (e) => {
        e.preventDefault();
        if (!loginEmail.includes('@')) {
            toast.error('Please enter a valid email address');
            return;
        }
        setLoginOtpValid('123456');
        setLoginStep(2);
        loginOTPTimer.start();
        toast.success('OTP sent to your email!');
    };

    const handleLoginOtpVerify = () => {
        if (loginOtp === loginOtpValid) {
            login({
                name: loginEmail.split('@')[0],
                email: loginEmail,
                phone: '9876543210'
            }, 'mock-jwt-token');
            toast.success('Welcome back!');
            navigate(redirectPath, { replace: true });
        } else {
            toast.error('Invalid OTP. Try again.');
        }
    };

    const handleResendLoginOtp = () => {
        loginOTPTimer.resend();
        toast.success('OTP resent!');
    };

    // Signup handlers
    const handleSignupSubmit = (data) => {
        setSignupOtpValid('123456');
        setSignupStep(2);
        signupOTPTimer.start();
        toast.success('OTP sent to your email!');
    };

    const handleSignupOtpVerify = () => {
        if (signupOtp === signupOtpValid) {
            const values = signupForm.getValues();
            login({
                name: values.name,
                email: values.email,
                phone: values.phone
            }, 'mock-jwt-token');
            toast.success('Account created!');
            navigate(redirectPath, { replace: true });
        } else {
            toast.error('Invalid OTP. Try again.');
        }
    };

    const handleResendSignupOtp = () => {
        signupOTPTimer.resend();
        toast.success('OTP resent!');
    };

    return (
        <>
            <style>{`
                .login-page {
                    min-height: 80vh;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                }
                .login-visual {
                    background: var(--black);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                }
                .login-visual::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 30% 70%, rgba(200,255,0,0.06) 0%, transparent 50%);
                }
                .login-visual-content {
                    text-align: center;
                    position: relative;
                    z-index: 1;
                }
                .login-visual h2 {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 80px;
                    color: var(--white);
                    letter-spacing: 4px;
                    line-height: 0.9;
                    margin-bottom: 16px;
                }
                .login-visual h2 span { color: var(--accent); }
                .login-visual p {
                    color: rgba(255,255,255,0.4);
                    font-size: 14px;
                    font-family: 'Inter', sans-serif;
                }
                .login-form-wrap {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 60px 40px;
                }
                .login-form-inner {
                    width: 100%;
                    max-width: 420px;
                }
                .login-form-inner h1 {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 48px;
                    letter-spacing: 2px;
                    margin-bottom: 8px;
                }
                .login-form-inner .subtitle {
                    font-size: 14px;
                    color: var(--gray);
                    margin-bottom: 32px;
                    font-family: 'Inter', sans-serif;
                }
                .tabs {
                    display: flex;
                    border-bottom: 2px solid var(--light-gray);
                    margin-bottom: 32px;
                }
                .tab {
                    flex: 1;
                    padding: 14px;
                    background: none;
                    border: none;
                    font-family: 'Inter', sans-serif;
                    font-weight: 700;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    cursor: pointer;
                    color: var(--muted);
                    border-bottom: 2px solid transparent;
                    margin-bottom: -2px;
                    transition: all 0.3s ease;
                }
                .tab.active {
                    color: var(--black);
                    border-bottom-color: var(--accent);
                }
                .tab:hover { color: var(--black); }
                .form-group {
                    margin-bottom: 20px;
                }
                .form-label {
                    display: block;
                    font-size: 12px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                    margin-bottom: 8px;
                    color: var(--gray);
                    font-family: 'Inter', sans-serif;
                }
                .form-input {
                    width: 100%;
                    padding: 14px 16px;
                    border: 1.5px solid var(--light-gray);
                    background: var(--white);
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    border-radius: var(--radius-sm);
                    transition: all 0.3s ease;
                    outline: none;
                }
                .form-input:focus {
                    border-color: var(--accent);
                    box-shadow: 0 0 0 3px rgba(200,255,0,0.1);
                }
                .form-input::placeholder {
                    color: var(--muted);
                }
                .form-btn {
                    width: 100%;
                    padding: 15px;
                    background: var(--black);
                    color: var(--white);
                    border: none;
                    font-family: 'Inter', sans-serif;
                    font-weight: 700;
                    font-size: 13px;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    cursor: pointer;
                    border-radius: var(--radius-sm);
                    transition: all 0.3s var(--ease-out);
                    margin-top: 8px;
                }
                .form-btn:hover {
                    background: var(--accent);
                    color: var(--black);
                    transform: translateY(-1px);
                    box-shadow: var(--shadow-md);
                }
                .otp-section {
                    text-align: center;
                }
                .otp-section p {
                    font-size: 14px;
                    color: var(--gray);
                    margin-bottom: 24px;
                    font-family: 'Inter', sans-serif;
                }
                .otp-section p strong { color: var(--black); }
                .resend-link {
                    font-size: 13px;
                    color: var(--muted);
                    font-family: 'Inter', sans-serif;
                    margin-top: 16px;
                }
                .resend-link button {
                    background: none;
                    border: none;
                    color: var(--black);
                    font-weight: 700;
                    cursor: pointer;
                    text-decoration: underline;
                    font-family: 'Inter', sans-serif;
                    font-size: 13px;
                }
                .resend-link button:disabled {
                    color: var(--muted);
                    cursor: not-allowed;
                    text-decoration: none;
                }
                .back-link {
                    display: block;
                    text-align: center;
                    margin-top: 16px;
                    font-size: 13px;
                    color: var(--muted);
                    font-family: 'Inter', sans-serif;
                }
                .back-link button {
                    background: none;
                    border: none;
                    color: var(--black);
                    font-weight: 600;
                    cursor: pointer;
                    text-decoration: underline;
                    font-family: 'Inter', sans-serif;
                    font-size: 13px;
                }
                .form-error {
                    font-size: 12px;
                    color: var(--error);
                    margin-top: 4px;
                    font-family: 'Inter', sans-serif;
                }
                @media (max-width: 768px) {
                    .login-page { grid-template-columns: 1fr; }
                    .login-visual { display: none; }
                    .login-form-wrap { padding: 40px 20px; }
                }
            `}</style>

            <div className="login-page">
                <div className="login-visual">
                    <div className="login-visual-content">
                        <h2>YOUR <span>DESIGN</span><br />YOUR RULES</h2>
                        <p>Create an account to start designing</p>
                    </div>
                </div>

                <div className="login-form-wrap">
                    <div className="login-form-inner">
                        <h1>WELCOME</h1>
                        <p className="subtitle">Sign in to your account or create a new one</p>

                        <div className="tabs">
                            <button
                                className={`tab ${activeTab === 'login' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('login'); setLoginStep(1); }}
                            >
                                Login
                            </button>
                            <button
                                className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('signup'); setSignupStep(1); }}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* LOGIN */}
                        {activeTab === 'login' && (
                            <>
                                {loginStep === 1 && (
                                    <form onSubmit={handleLoginEmailSubmit}>
                                        <div className="form-group">
                                            <label className="form-label">Email Address</label>
                                            <input
                                                type="email"
                                                className="form-input"
                                                placeholder="you@example.com"
                                                value={loginEmail}
                                                onChange={(e) => setLoginEmail(e.target.value)}
                                                required
                                                autoFocus
                                            />
                                        </div>
                                        <button type="submit" className="form-btn">
                                            Send OTP →
                                        </button>
                                    </form>
                                )}
                                {loginStep === 2 && (
                                    <div className="otp-section">
                                        <p>Enter the OTP sent to<br /><strong>{loginEmail}</strong></p>
                                        <OTPInput
                                            length={6}
                                            value={loginOtp}
                                            onChange={setLoginOtp}
                                        />
                                        <button
                                            className="form-btn"
                                            onClick={handleLoginOtpVerify}
                                            style={{ marginTop: '24px' }}
                                        >
                                            Verify & Login
                                        </button>
                                        <div className="resend-link">
                                            {loginOTPTimer.countdown > 0 ? (
                                                `Resend OTP in ${loginOTPTimer.countdown}s`
                                            ) : (
                                                <button onClick={handleResendLoginOtp} disabled={!loginOTPTimer.canResend}>
                                                    Resend OTP
                                                </button>
                                            )}
                                        </div>
                                        <div className="back-link">
                                            <button onClick={() => setLoginStep(1)}>← Change email</button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {/* SIGNUP */}
                        {activeTab === 'signup' && (
                            <>
                                {signupStep === 1 && (
                                    <form onSubmit={signupForm.handleSubmit(handleSignupSubmit)}>
                                        <div className="form-group">
                                            <label className="form-label">Full Name</label>
                                            <input
                                                className="form-input"
                                                placeholder="John Doe"
                                                {...signupForm.register('name', { required: 'Name is required' })}
                                            />
                                            {signupForm.formState.errors.name && (
                                                <p className="form-error">{signupForm.formState.errors.name.message}</p>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Email Address</label>
                                            <input
                                                type="email"
                                                className="form-input"
                                                placeholder="you@example.com"
                                                {...signupForm.register('email', {
                                                    required: 'Email is required',
                                                    pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email' }
                                                })}
                                            />
                                            {signupForm.formState.errors.email && (
                                                <p className="form-error">{signupForm.formState.errors.email.message}</p>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Phone Number</label>
                                            <input
                                                type="tel"
                                                className="form-input"
                                                placeholder="+91 98765 43210"
                                                {...signupForm.register('phone', {
                                                    required: 'Phone is required',
                                                    minLength: { value: 10, message: 'Enter a valid phone number' }
                                                })}
                                            />
                                            {signupForm.formState.errors.phone && (
                                                <p className="form-error">{signupForm.formState.errors.phone.message}</p>
                                            )}
                                        </div>
                                        <button type="submit" className="form-btn">
                                            Create Account →
                                        </button>
                                    </form>
                                )}
                                {signupStep === 2 && (
                                    <div className="otp-section">
                                        <p>Enter the OTP sent to<br /><strong>{signupForm.getValues('email')}</strong></p>
                                        <OTPInput
                                            length={6}
                                            value={signupOtp}
                                            onChange={setSignupOtp}
                                        />
                                        <button
                                            className="form-btn"
                                            onClick={handleSignupOtpVerify}
                                            style={{ marginTop: '24px' }}
                                        >
                                            Verify & Create Account
                                        </button>
                                        <div className="resend-link">
                                            {signupOTPTimer.countdown > 0 ? (
                                                `Resend OTP in ${signupOTPTimer.countdown}s`
                                            ) : (
                                                <button onClick={handleResendSignupOtp} disabled={!signupOTPTimer.canResend}>
                                                    Resend OTP
                                                </button>
                                            )}
                                        </div>
                                        <div className="back-link">
                                            <button onClick={() => setSignupStep(1)}>← Edit details</button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
