import React from 'react';
import { ShieldCheck, Award, Wrench, CheckCircle2, Users, MapPin, Phone, MessageSquare } from 'lucide-react';

export default function AboutPage({ onNavigate }) {
  return (
    <div style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <span className="section-tag">About Bike Bazaar</span>
          <h1 className="section-title">Patna Ka Sabse Bharosemand Second-Hand Bike Store</h1>
          <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.5rem', lineHeight: '1.6' }}>
            BIKE BAZAAR ki shuruaat 2018 me hui thi ek hi maqsad ke sath - customer ko Bina meter tampering, 100% genuine condition me verified bikes aur scooties dena.
          </p>
        </div>

        {/* 100-Point Inspection Details */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '2rem', marginBottom: '3rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '0.4rem 0.85rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800 }}>
              OUR QUALITY PROMISE
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginTop: '0.5rem' }}>
              100-Point Inspection Check Process
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 800, color: '#1e40af', fontSize: '1.1rem', marginBottom: '0.4rem' }}>
                1. Engine & Transmission (30 Points)
              </div>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }}>
                Engine noise, cylinder compression, oil leakage, clutch slippage, gear shifting smoothness, and spark plug condition.
              </p>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 800, color: '#10b981', fontSize: '1.1rem', marginBottom: '0.4rem' }}>
                2. Chassis & Suspension (25 Points)
              </div>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }}>
                Frame alignment, front fork seals, rear monoshock absorber, swingarm play, and wheel rim straightness.
              </p>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 800, color: '#dc2626', fontSize: '1.1rem', marginBottom: '0.4rem' }}>
                3. Electricals & Battery (20 Points)
              </div>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }}>
                Self-starter, battery health (voltage test), LED headlamp, indicator relays, horn, and speedometer sensor.
              </p>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 800, color: '#d97706', fontSize: '1.1rem', marginBottom: '0.4rem' }}>
                4. Brakes, Tyres & Paperwork (25 Points)
              </div>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }}>
                Disc pad thickness, brake fluid, tyre tread depth, RC original check, insurance validity & NOC availability.
              </p>
            </div>
          </div>
        </div>

        {/* Guarantees Box */}
        <div style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '2.5rem 2rem', borderRadius: '20px', display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
          <div>
            <span style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>
              Guaranteed Satisfaction
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', margin: '0.4rem 0 1rem 0' }}>
              6 Months Warranty & 7-Day Money Back
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Agar aapko gaari me koi bhi mechanical problem aati hai toh humare authorized service center me free repair warranty di jaati hai.
            </p>
            <button className="btn-accent" onClick={() => onNavigate('shop')}>
              Browse Verified Inventory
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.92rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', backgroundColor: '#1e293b', padding: '0.85rem 1rem', borderRadius: '10px' }}>
              <CheckCircle2 size={20} style={{ color: '#10b981' }} />
              <span><strong>No Meter Tampering:</strong> Genuine Odometer guaranteed.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', backgroundColor: '#1e293b', padding: '0.85rem 1rem', borderRadius: '10px' }}>
              <CheckCircle2 size={20} style={{ color: '#10b981' }} />
              <span><strong>Clear Legal Title:</strong> Zero pending challans or stolen records.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', backgroundColor: '#1e293b', padding: '0.85rem 1rem', borderRadius: '10px' }}>
              <CheckCircle2 size={20} style={{ color: '#10b981' }} />
              <span><strong>Instant RC Transfer:</strong> Paperwork doorstep delivery.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
