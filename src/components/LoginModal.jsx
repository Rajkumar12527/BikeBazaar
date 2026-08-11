import React, { useState } from 'react';
import { X, User, Phone, Mail, Lock, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LoginModal({ onClose, onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('otp'); // 'otp' | 'password'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      setErrorMsg('Kripya 10-digit mobile number darj karein.');
      return;
    }
    setErrorMsg('');
    setOtpSent(true);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 4) {
      setErrorMsg('Kripya valid 4-digit OTP enter karein (e.g., 1234).');
      return;
    }
    const userObj = {
      name: name || 'Customer (' + phoneNumber.slice(-4) + ')',
      phone: phoneNumber,
      email: email || `${phoneNumber}@bikebazaar.in`,
      isLoggedIn: true,
      joinedDate: 'August 2026'
    };
    onLoginSuccess(userObj);
  };

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Kripya Email aur Password enter karein.');
      return;
    }
    const userObj = {
      name: email.split('@')[0],
      email: email,
      phone: '9876543210',
      isLoggedIn: true,
      joinedDate: 'August 2026'
    };
    onLoginSuccess(userObj);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '440px', padding: '2rem 1.5rem', borderRadius: '20px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#dbeafe',
            color: '#1e40af',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.75rem auto'
          }}>
            <User size={28} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
            Bike Bazaar Account Login
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
            Saved Wishlist, Test Drive Booking & Instant Resale Offers access karein
          </p>
        </div>

        {/* Auth Mode Tabs */}
        <div style={{
          display: 'flex',
          backgroundColor: '#f1f5f9',
          padding: '0.25rem',
          borderRadius: '10px',
          marginBottom: '1.25rem'
        }}>
          <button
            type="button"
            onClick={() => { setAuthMode('otp'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '0.45rem',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              backgroundColor: authMode === 'otp' ? '#ffffff' : 'transparent',
              color: authMode === 'otp' ? '#1e40af' : '#64748b',
              boxShadow: authMode === 'otp' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            OTP Login
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('password'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '0.45rem',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              backgroundColor: authMode === 'password' ? '#ffffff' : 'transparent',
              color: authMode === 'password' ? '#1e40af' : '#64748b',
              boxShadow: authMode === 'password' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Password Login
          </button>
        </div>

        {errorMsg && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '0.6rem 0.85rem',
            borderRadius: '8px',
            fontSize: '0.82rem',
            marginBottom: '1rem',
            fontWeight: 600
          }}>
            {errorMsg}
          </div>
        )}

        {/* OTP Mode Form */}
        {authMode === 'otp' && (
          <div>
            {!otpSent ? (
              <form onSubmit={handleSendOtp}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                    Mobile Number
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, fontSize: '0.9rem', color: '#475569' }}>
                      +91
                    </span>
                    <input 
                      type="tel"
                      maxLength={10}
                      placeholder="9876543210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                      style={{
                        width: '100%',
                        padding: '0.7rem 0.7rem 0.7rem 3rem',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.95rem',
                        fontWeight: 600
                      }}
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                    Aapka Naam (Optional)
                  </label>
                  <input 
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.7rem',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}>
                  <span>Send OTP via SMS</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp}>
                <div style={{
                  backgroundColor: '#d1fae5',
                  color: '#065f46',
                  padding: '0.6rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  <CheckCircle2 size={16} />
                  <span>OTP Sent to +91 {phoneNumber} (Demo OTP: <strong>1234</strong>)</span>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                    Enter 4-Digit OTP
                  </label>
                  <input 
                    type="text"
                    maxLength={4}
                    placeholder="1234"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      textAlign: 'center',
                      letterSpacing: '0.5em',
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      borderRadius: '10px',
                      border: '1.5px solid #1e40af'
                    }}
                    autoFocus
                    required
                  />
                </div>

                <button type="submit" className="btn-accent" style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}>
                  <span>Verify OTP & Login</span>
                </button>

                <button 
                  type="button" 
                  onClick={() => setOtpSent(false)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'center',
                    marginTop: '0.75rem',
                    backgroundColor: 'transparent',
                    color: '#64748b',
                    fontSize: '0.82rem',
                    fontWeight: 600
                  }}
                >
                  Change Mobile Number
                </button>
              </form>
            )}
          </div>
        )}

        {/* Password Mode Form */}
        {authMode === 'password' && (
          <form onSubmit={handlePasswordLogin}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.7rem 0.7rem 2.4rem',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.9rem'
                  }}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.7rem 0.7rem 2.4rem',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.9rem'
                  }}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}>
              <span>Login to Account</span>
            </button>
          </form>
        )}

        {/* Security Footer Note */}
        <div style={{
          marginTop: '1.5rem',
          paddingTop: '1rem',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          fontSize: '0.78rem',
          color: '#64748b'
        }}>
          <ShieldCheck size={16} style={{ color: '#10b981' }} />
          <span>Your personal data is 100% Encrypted & Safe</span>
        </div>

      </div>
    </div>
  );
}
