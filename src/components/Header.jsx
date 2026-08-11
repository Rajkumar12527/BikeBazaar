import React, { useState } from 'react';
import { Bike, Phone, MessageSquare, Menu, X, Heart, ShieldCheck, Mail, LogOut, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, wishlistCount, onOpenAdmin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
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
    window.open('https://wa.me/917480078779?text=Hi%20Bike%20Bazaar,%20I%20want%20to%20inquire%20about%20certified%20used%20bikes.', '_blank');
  };

  return (
    <header className="header" style={{ position: 'sticky', top: 0, zIndex: 9999 }}>
      
      {/* Main Navbar */}
      <div className="container">
        <div className="navbar">
          {/* Compact Premium Logo Badge */}
          <div className="brand-logo" onClick={() => handleNavClick('home')} title="Bike Bazaar Home">
            <div className="brand-logo-badge">
              <Bike size={17} color="#ffffff" />
              <div className="brand-logo-spark">
                <ShieldCheck size={9} color="#f59e0b" />
              </div>
            </div>
            <div className="brand-text-container">
              <div className="brand-title">
                BIKE <span className="brand-highlight">BAZAAR</span>
              </div>
              <div className="brand-tagline">
                <span className="brand-tag-certified">CERTIFIED STORE</span>
              </div>
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
            {/* Wishlist Button */}
            <button 
              className={`btn-secondary btn-sm ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => handleNavClick('wishlist')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                color: activeTab === 'wishlist' || wishlistCount > 0 ? '#dc2626' : '#475569',
                borderColor: activeTab === 'wishlist' ? '#fca5a5' : '#e2e8f0',
                backgroundColor: activeTab === 'wishlist' ? '#fff1f2' : '#ffffff',
                fontWeight: 700
              }}
              title="View saved wishlist vehicles"
            >
              <Heart size={15} fill={activeTab === 'wishlist' || wishlistCount > 0 ? "#dc2626" : "none"} />
              <span>{wishlistCount}</span>
            </button>

            {/* Owner Portal / Admin Button */}
            <button
              className="btn-secondary btn-sm desktop-only-btn"
              onClick={onOpenAdmin}
              title="Owner / Admin Portal Login (rajkumar87036@gmail.com)"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                backgroundColor: '#0f172a',
                color: '#f8fafc',
                borderColor: '#334155',
                fontSize: '0.78rem',
                fontWeight: 800,
                padding: '0.35rem 0.6rem'
              }}
            >
              <span>👑</span>
              <span>Owner Portal</span>
            </button>

            {/* Desktop WhatsApp Icon Button */}
            <button 
              className="btn-whatsapp btn-icon-only desktop-only-btn"
              onClick={handleWhatsApp}
              title="Chat on WhatsApp (+91 7480078779)"
              aria-label="Chat on WhatsApp"
            >
              <MessageSquare size={18} />
            </button>

            {/* Desktop Phone Call Icon Button */}
            <a 
              href="tel:+917480078779" 
              className="btn-primary btn-icon-only desktop-only-btn"
              title="Call Showroom (+91 7480078779)"
              aria-label="Call Showroom"
            >
              <Phone size={18} />
            </a>

            {/* Mobile Hamburger Drawer Toggle */}
            <button 
              className="btn-secondary btn-sm mobile-hamburger-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ border: 'none', padding: '0.35rem', backgroundColor: 'transparent' }}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-menu">
          {navLinks.map((link) => (
            <div
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                padding: '0.65rem 0.85rem',
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
              onClick={onOpenAdmin}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', backgroundColor: '#0f172a', color: '#ffffff', fontWeight: 800 }}
            >
              <span>👑 Owner Portal Login</span>
            </button>

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
