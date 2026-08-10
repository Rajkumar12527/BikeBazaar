import React, { useState } from 'react';
import { Bike, Phone, MessageSquare, Menu, X, Heart, Search, ShieldCheck, Mail } from 'lucide-react';

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
      {/* Top Announcement Bar */}
      <div style={{
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        padding: '0.4rem 0',
        fontSize: '0.8rem',
        borderBottom: '1px solid #1e293b'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <ShieldCheck size={14} style={{ color: '#10b981' }} />
            <span>Patna's #1 Certified Used Bike & Scooty Showroom</span>
          </div>
          <div style={{ display: 'none', mdDisplay: 'flex', alignItems: 'center', gap: '1.5rem' }}>
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
              <Bike size={24} />
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
                <Heart size={16} fill="#dc2626" />
                <span>{wishlistCount}</span>
              </button>
            )}

            {/* WhatsApp Quick Button */}
            <button 
              className="btn-whatsapp btn-sm"
              onClick={handleWhatsApp}
              style={{ display: 'inline-flex' }}
            >
              <MessageSquare size={16} />
              <span>WhatsApp</span>
            </button>

            {/* Direct Call Button */}
            <a 
              href="tel:+917480078779" 
              className="btn-primary btn-sm"
              style={{ display: 'inline-flex' }}
            >
              <Phone size={16} />
              <span>Call 7480078779</span>
            </a>

            {/* Mobile Hamburger */}
            <button 
              className="btn-secondary btn-sm" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ display: 'flex', border: 'none', padding: '0.4rem' }}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {navLinks.map((link) => (
            <div
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                padding: '0.75rem 1rem',
                fontWeight: 600,
                borderRadius: '8px',
                backgroundColor: activeTab === link.id ? '#f1f5f9' : 'transparent',
                color: activeTab === link.id ? '#1e40af' : '#0f172a',
                cursor: 'pointer'
              }}
            >
              {link.label}
            </div>
          ))}

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button 
              onClick={handleWhatsApp}
              className="btn-whatsapp"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <MessageSquare size={18} />
              <span>WhatsApp: 7480078779</span>
            </button>
            <a 
              href="tel:+917480078779"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Phone size={18} />
              <span>Call: 7480078779</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
