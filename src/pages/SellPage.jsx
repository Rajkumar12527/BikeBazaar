import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, DollarSign, Shield, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { BRANDS } from '../data/bikesData';

export default function SellPage() {
  const [brand, setBrand] = useState('Honda');
  const [modelName, setModelName] = useState('');
  const [year, setYear] = useState('2021');
  const [km, setKm] = useState('15000');
  const [owner, setOwner] = useState('1st Owner');
  const [condition, setCondition] = useState('Good');
  
  const [evaluatedPrice, setEvaluatedPrice] = useState(null);
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const calculateValuation = (e) => {
    e.preventDefault();
    let base = 75000;
    if (brand === 'Royal Enfield') base = 135000;
    if (brand === 'KTM') base = 150000;
    if (brand === 'Yamaha') base = 110000;
    if (brand === 'Hero' || brand === 'Honda') base = 65000;

    const y = Number(year);
    const age = 2026 - y;
    let factor = 1 - age * 0.08;
    if (owner === '2nd Owner') factor *= 0.88;
    if (condition === 'Excellent') factor *= 1.1;
    if (condition === 'Fair') factor *= 0.85;

    const finalVal = Math.max(25000, Math.round(base * factor));
    const minVal = Math.round(finalVal * 0.94);
    const maxVal = Math.round(finalVal * 1.06);

    setEvaluatedPrice({ min: minVal, max: maxVal });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const existing = JSON.parse(localStorage.getItem('bike_bazaar_sell_leads_db') || '[]');
      const newEntry = {
        id: `sell-${Date.now()}`,
        sellerName: sellerName || 'Customer Lead',
        sellerPhone: sellerPhone || '9876543210',
        brand: brand,
        modelName: modelName || 'Used Bike',
        year: year,
        km: km,
        owner: owner,
        estimatedPrice: evaluatedPrice ? `₹${evaluatedPrice.min.toLocaleString('en-IN')} - ₹${evaluatedPrice.max.toLocaleString('en-IN')}` : '₹75,000',
        status: 'New Lead',
        submittedAt: new Date().toLocaleDateString('en-IN')
      };
      const updated = [newEntry, ...existing];
      localStorage.setItem('bike_bazaar_sell_leads_db', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem auto' }}>
          <span className="section-tag">Instant Bike Valuation</span>
          <h1 className="section-title">Apni Purani Bike Bechein Best Price Pe</h1>
          <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '0.5rem' }}>
            10 Second me online estimated resale value check karein. Doorstep free inspection & Instant Bank Payment guarantee.
          </p>
        </div>

        {/* Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'flex-start' }}>
          
          {/* Valuation Form */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              Step 1: Vehicle Details Daalein
            </h2>

            <form onSubmit={calculateValuation} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Brand / Manufacturer *
                  </label>
                  <select 
                    value={brand} 
                    onChange={(e) => setBrand(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  >
                    {BRANDS.filter(b => b !== 'All Brands').map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Model Name *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Classic 350 / Activa 6G"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Model Year
                  </label>
                  <select 
                    value={year} 
                    onChange={(e) => setYear(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  >
                    {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    KM Driven
                  </label>
                  <select 
                    value={km} 
                    onChange={(e) => setKm(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  >
                    <option value="5000">Under 10,000 KM</option>
                    <option value="15000">10,000 - 25,000 KM</option>
                    <option value="30000">25,000 - 50,000 KM</option>
                    <option value="60000">Above 50,000 KM</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Ownership
                  </label>
                  <select 
                    value={owner} 
                    onChange={(e) => setOwner(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  >
                    <option value="1st Owner">1st Owner</option>
                    <option value="2nd Owner">2nd Owner</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Overall Vehicle Condition
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['Excellent', 'Good', 'Fair'].map((cond) => (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => setCondition(cond)}
                      style={{
                        flex: 1,
                        padding: '0.6rem',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        border: '1px solid',
                        borderColor: condition === cond ? '#1e40af' : '#cbd5e1',
                        backgroundColor: condition === cond ? '#1e40af' : '#ffffff',
                        color: condition === cond ? '#ffffff' : '#475569'
                      }}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '0.85rem', marginTop: '0.5rem' }}>
                <RefreshCw size={18} />
                <span>Calculate Estimated Price</span>
              </button>

            </form>
          </div>

          {/* Result & Inspection Request */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {evaluatedPrice ? (
              <div style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '1.75rem', borderRadius: '16px', border: '1px solid #334155' }}>
                <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>
                  Estimated Resale Value Range
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', margin: '0.5rem 0' }}>
                  ₹{evaluatedPrice.min.toLocaleString('en-IN')} - ₹{evaluatedPrice.max.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1.5rem' }}>
                  Based on current market data for {brand} {modelName || 'Bike'} ({year}, {owner}).
                </div>

                {submitted ? (
                  <div style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '1rem', borderRadius: '8px', fontWeight: 700, textAlign: 'center' }}>
                    <CheckCircle2 size={24} style={{ display: 'block', margin: '0 auto 0.5rem auto' }} />
                    Doorstep Inspection Request Received! We will call you within 30 minutes.
                  </div>
                ) : (
                  <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem' }}>Book Free Doorstep Inspection</h4>
                    <input 
                      type="text" 
                      required 
                      placeholder="Your Name"
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                      style={{ padding: '0.65rem', borderRadius: '6px', border: 'none', fontSize: '0.9rem' }}
                    />
                    <input 
                      type="tel" 
                      required 
                      placeholder="Mobile Phone Number"
                      value={sellerPhone}
                      onChange={(e) => setSellerPhone(e.target.value)}
                      style={{ padding: '0.65rem', borderRadius: '6px', border: 'none', fontSize: '0.9rem' }}
                    />
                    <button type="submit" className="btn-accent" style={{ padding: '0.75rem' }}>
                      Get Instant Payment Offer
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div style={{ backgroundColor: '#f8fafc', padding: '2rem 1.5rem', borderRadius: '16px', border: '1.5px dashed #cbd5e1', textAlign: 'center' }}>
                <DollarSign size={40} style={{ color: '#1e40af', margin: '0 auto 1rem auto', display: 'block' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                  Form Bhar kar Valuation Dekhein
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
                  Left side me apni bike ka details daalein aur "Calculate Estimated Price" par click karein.
                </p>
              </div>
            )}

            {/* Sell Benefits */}
            <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Bike Bazaar Pe Bechne Ke Fayde
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: '#475569' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                  <span><strong>Instant Spot Payment:</strong> Bank transfer right after inspection.</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                  <span><strong>Free RC Transfer:</strong> Unsold vehicle liabilities zero.</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                  <span><strong>Zero Brokerage:</strong> Direct showroom evaluation with no hidden fees.</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
