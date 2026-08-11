import React, { useState } from 'react';
import { Bike, Phone, MessageSquare, Menu, X, Heart, ShieldCheck, Mail } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, wishlistCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Bikes & Scooties' },
    { id: 'sell', label: 'Sell Your Bike' },
    { id: 'emi', label: 'EMI Calculator' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/917480078779?text=Hi%20Bike%20Bazaar,%20I%20want%20to%20inquire%20about%20used%20bikes.', '_blank');
  };

  return (
    <header className="header">
      {/* Top Announcement Bar (Hidden on Mobile to save screen space) */}
      <div className="top-bar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <ShieldCheck size={14} style={{ color: '#10b981' }} />
            <span>Patna's Certified Used Two-Wheeler Showroom • 100+ Point Inspection</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a href="tel:+917480078779" style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Phone size={13} style={{ color: '#2563eb' }} />
              <span>+91 7480078779</span>
            </a>
            <a href="mailto:doubledoormusic12@gmail.com" style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Mail size={13} style={{ color: '#dc2626' }} />
              <span>doubledoormusic12@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container">
        <div className="navbar">
          {/* Logo */}
          <div className="brand-logo" onClick={() => handleNavClick('home')} style={{ cursor: 'pointer' }}>
            <div className="brand-icon-box">
              <Bike size={20} />
            </div>
            <div className="brand-text">
              <span className="brand-main">BIKE BAZAAR</span>
              <span className="brand-sub">CERTIFIED STORE</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="nav-menu">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`nav-item ${activeTab === link.id ? 'active' : ''}`}
                onClick={() => handleNavClick(link.id)}
              >
                {link.label}
              </li>
            ))}
          </ul>

          {/* Nav Right Actions */}
          <div className="nav-actions">
            {wishlistCount > 0 && (
              <button 
                className="btn-secondary btn-sm"
                onClick={() => handleNavClick('shop')}
                style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#dc2626' }}
                title="Saved vehicles"
              >
                <Heart size={15} fill="#dc2626" />
                <span>{wishlistCount}</span>
              </button>
            )}

            {/* Desktop WhatsApp & Call Buttons */}
            <button 
              className="btn-whatsapp btn-sm desktop-only-btn"
              onClick={handleWhatsApp}
            >
              <MessageSquare size={15} />
              <span>WhatsApp</span>
            </button>

            <a 
              href="tel:+917480078779" 
              className="btn-primary btn-sm desktop-only-btn"
            >
              <Phone size={15} />
              <span>Call 7480078779</span>
            </a>

            {/* Compact Mobile WhatsApp Icon Button */}
            <button 
              className="btn-whatsapp btn-sm mobile-only-btn"
              onClick={handleWhatsApp}
              style={{ padding: '0.35rem 0.55rem' }}
              title="WhatsApp"
            >
              <MessageSquare size={16} />
            </button>

            {/* Mobile Hamburger Drawer Toggle */}
            <button 
              className="btn-secondary btn-sm" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ display: 'flex', border: 'none', padding: '0.35rem', backgroundColor: 'transparent' }}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '0.75rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          {navLinks.map((link) => (
            <div
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                padding: '0.6rem 0.85rem',
                fontWeight: 600,
                fontSize: '0.92rem',
                borderRadius: '8px',
                backgroundColor: activeTab === link.id ? '#f1f5f9' : 'transparent',
                color: activeTab === link.id ? '#1e40af' : '#0f172a',
                cursor: 'pointer'
              }}
            >
              {link.label}
            </div>
          ))}

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.65rem', marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button 
              onClick={handleWhatsApp}
              className="btn-whatsapp"
              style={{ width: '100%', justifyContent: 'center', padding: '0.65rem' }}
            >
              <MessageSquare size={16} />
              <span>WhatsApp: 7480078779</span>
            </button>
            <a 
              href="tel:+917480078779"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '0.65rem' }}
            >
              <Phone size={16} />
              <span>Call: 7480078779</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
