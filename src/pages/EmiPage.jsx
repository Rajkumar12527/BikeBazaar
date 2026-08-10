import React, { useState, useMemo } from 'react';
import { Calculator, CheckCircle2, Phone, ShieldCheck, DollarSign, Percent, Calendar } from 'lucide-react';

export default function EmiPage({ defaultPrice }) {
  const [vehiclePrice, setVehiclePrice] = useState(defaultPrice || 148000);
  const [downPayment, setDownPayment] = useState(25000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenureMonths, setTenureMonths] = useState(36);
  const [applied, setApplied] = useState(false);

  const loanAmount = Math.max(0, vehiclePrice - downPayment);

  const emiDetails = useMemo(() => {
    if (loanAmount <= 0) return { emi: 0, totalInterest: 0, totalPayment: vehiclePrice };
    
    const monthlyRate = interestRate / 12 / 100;
    const n = tenureMonths;
    
    // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const emiVal = Math.round(
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
    );
    
    const totalPayable = emiVal * n;
    const totalInt = totalPayable - loanAmount;

    return {
      emi: emiVal,
      totalInterest: Math.max(0, totalInt),
      totalPayment: totalPayable + downPayment
    };
  }, [loanAmount, interestRate, tenureMonths, vehiclePrice, downPayment]);

  const principalPercent = loanAmount > 0 ? Math.round((loanAmount / (loanAmount + emiDetails.totalInterest)) * 100) : 100;
  const interestPercent = 100 - principalPercent;

  return (
    <div style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem auto' }}>
          <span className="section-tag">Finance & EMI Calculator</span>
          <h1 className="section-title">Used Bike Loan EMI Calculator</h1>
          <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '0.5rem' }}>
            Aapki monthly installment kitni hogi? Down payment aur tenure set karke instant result paayein.
          </p>
        </div>

        {/* Calculator Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'flex-start' }}>
          
          {/* Controls Column */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              Loan Parameters
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Bike Price Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.9rem', color: '#334155', marginBottom: '0.4rem' }}>
                  <span>Vehicle Cost (Price)</span>
                  <span style={{ color: '#1e40af', fontWeight: 800 }}>₹{vehiclePrice.toLocaleString('en-IN')}</span>
                </div>
                <input 
                  type="range"
                  min="40000"
                  max="250000"
                  step="2000"
                  value={vehiclePrice}
                  onChange={(e) => setVehiclePrice(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#1e40af', cursor: 'pointer' }}
                />
              </div>

              {/* Down Payment Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.9rem', color: '#334155', marginBottom: '0.4rem' }}>
                  <span>Down Payment</span>
                  <span style={{ color: '#059669', fontWeight: 800 }}>₹{downPayment.toLocaleString('en-IN')}</span>
                </div>
                <input 
                  type="range"
                  min="5000"
                  max={Math.round(vehiclePrice * 0.8)}
                  step="1000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#059669', cursor: 'pointer' }}
                />
              </div>

              {/* Interest Rate Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.9rem', color: '#334155', marginBottom: '0.4rem' }}>
                  <span>Interest Rate (Annual %)</span>
                  <span style={{ color: '#dc2626', fontWeight: 800 }}>{interestRate}% P.A.</span>
                </div>
                <input 
                  type="range"
                  min="8.5"
                  max="18"
                  step="0.25"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#dc2626', cursor: 'pointer' }}
                />
              </div>

              {/* Tenure Selection */}
              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', color: '#334155', marginBottom: '0.5rem' }}>
                  Loan Tenure (Months)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                  {[12, 24, 36, 48].map((m) => (
                    <button
                      key={m}
                      onClick={() => setTenureMonths(m)}
                      style={{
                        padding: '0.6rem 0.25rem',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        border: '1px solid',
                        borderColor: tenureMonths === m ? '#1e40af' : '#cbd5e1',
                        backgroundColor: tenureMonths === m ? '#1e40af' : '#ffffff',
                        color: tenureMonths === m ? '#ffffff' : '#475569'
                      }}
                    >
                      {m} Mo ({m / 12} Yrs)
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Results Summary Box */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '1.75rem', borderRadius: '16px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>
                Estimated Monthly EMI
              </div>

              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', margin: '0.2rem 0 0.5rem 0', fontFamily: 'Outfit, sans-serif' }}>
                ₹{emiDetails.emi.toLocaleString('en-IN')} <span style={{ fontSize: '1rem', color: '#cbd5e1', fontWeight: 400 }}>/ month</span>
              </div>

              <div style={{ borderTop: '1px solid #334155', paddingTop: '1rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                  <span>Loan Amount:</span>
                  <strong style={{ color: '#ffffff' }}>₹{loanAmount.toLocaleString('en-IN')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                  <span>Total Interest Payable:</span>
                  <strong style={{ color: '#f87171' }}>₹{emiDetails.totalInterest.toLocaleString('en-IN')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                  <span>Total Loan Tenure:</span>
                  <strong style={{ color: '#ffffff' }}>{tenureMonths} Months</strong>
                </div>
              </div>

              {/* Visual Breakdown Bar */}
              <div style={{ marginTop: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.4rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Principal ({principalPercent}%)</span>
                  <span>Interest ({interestPercent}%)</span>
                </div>
                <div style={{ height: '10px', backgroundColor: '#334155', borderRadius: '5px', overflow: 'hidden', display: 'flex' }}>
                  <div style={{ width: `${principalPercent}%`, backgroundColor: '#2563eb' }}></div>
                  <div style={{ width: `${interestPercent}%`, backgroundColor: '#dc2626' }}></div>
                </div>
              </div>

              {/* Loan Apply Form Trigger */}
              {applied ? (
                <div style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '0.85rem', borderRadius: '8px', marginTop: '1.5rem', textAlign: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                  Loan Eligibility Callback Request Sent!
                </div>
              ) : (
                <button 
                  className="btn-accent"
                  onClick={() => setApplied(true)}
                  style={{ width: '100%', marginTop: '1.5rem', padding: '0.85rem', justifyContent: 'center' }}
                >
                  <span>Apply for Instant Loan Approval</span>
                </button>
              )}
            </div>

            {/* Partner Banks */}
            <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                Showroom Partner Loan Banks
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['HDFC Bank', 'ICICI Bank', 'Bajaj Finance', 'IDFC First', 'TVS Credit', 'L&T Finance'].map(bank => (
                  <span key={bank} style={{ backgroundColor: '#f1f5f9', color: '#334155', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                    {bank}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
