import React from 'react';
import { Bike, Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer style={{ backgroundColor: '#0f172a', color: '#cbd5e1', paddingTop: '3.5rem', paddingBottom: '2.5rem', marginTop: '4rem' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid #334155'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{ backgroundColor: '#dc2626', padding: '0.45rem', borderRadius: '8px', color: '#ffffff' }}>
                <Bike size={24} />
              </div>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                BIKE BAZAAR
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.2rem', lineHeight: '1.6' }}>
              Patna's #1 trusted destination for certified second-hand bikes and scooties. 100+ points quality checked with instant RC transfer and warranty.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: 600, fontSize: '0.85rem' }}>
              <ShieldCheck size={18} />
              <span>Verified Store & Authorized Warranty</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '1.2rem', fontWeight: 700 }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('shop'); window.scrollTo({top:0, behavior:'smooth'}); }}>View All Inventory</li>
              <li style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('sell'); window.scrollTo({top:0, behavior:'smooth'}); }}>Sell / Valuation Tool</li>
              <li style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('emi'); window.scrollTo({top:0, behavior:'smooth'}); }}>EMI Calculator</li>
              <li style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('about'); window.scrollTo({top:0, behavior:'smooth'}); }}>100-Point Inspection</li>
              <li style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('contact'); window.scrollTo({top:0, behavior:'smooth'}); }}>Contact Showroom</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '1.2rem', fontWeight: 700 }}>Showroom Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: '#dc2626', shrink: 0, marginTop: '3px' }} />
                <span>Plot 42, Main Bypass Road, Near Metro Pillar 114, Patna, Bihar - 800001</span>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <Phone size={18} style={{ color: '#2563eb' }} />
                <a href="tel:+917480078779" style={{ color: '#ffffff', fontWeight: 600 }}>+91 7480078779</a>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <Mail size={18} style={{ color: '#dc2626' }} />
                <a href="mailto:doubledoormusic12@gmail.com" style={{ color: '#ffffff', fontWeight: 600 }}>doubledoormusic12@gmail.com</a>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <MessageSquare size={18} style={{ color: '#25d366' }} />
                <a href="https://wa.me/917480078779" target="_blank" rel="noreferrer" style={{ color: '#25d366', fontWeight: 600 }}>WhatsApp Chat (7480078779)</a>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <Clock size={18} style={{ color: '#f59e0b' }} />
                <span>Mon - Sun: 9:00 AM - 8:30 PM</span>
              </div>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '1.2rem', fontWeight: 700 }}>Bike Bazaar Promise</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                <span>6 Months Engine Warranty</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                <span>7-Day Money Back Guarantee</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                <span>Free Paperwork & RC Transfer</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                <span>Email Support: doubledoormusic12@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div style={{ paddingTop: '2rem', display: 'flex', flexDirection: 'column', mdDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
          <div>© {new Date().getFullYear()} BIKE BAZAAR. All Rights Reserved. Clean & Smooth Used Two-Wheeler Store.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>RTO Verification</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
