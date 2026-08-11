import React, { useState } from 'react';
import { Bike, Phone, MessageSquare, Menu, X, Heart, ShieldCheck, Mail, User, LogOut, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, wishlistCount, currentUser, onOpenLogin, onLogout, onOpenAdmin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

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
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/917480078779?text=Hi%20Bike%20Bazaar,%20I%20want%20to%20inquire%20about%20certified%20used%20bikes.', '_blank');
  };

  return (
    <header className="header">
      
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
                <span className="brand-tag-dot">•</span>
                <span className="brand-tag-city">PATNA</span>
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

            {/* User Auth Profile / Login Button */}
            {currentUser ? (
              <div style={{ position: 'relative' }}>
                <button
                  className="btn-secondary btn-sm"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    backgroundColor: '#eff6ff',
                    borderColor: '#bfdbfe',
                    color: '#1e40af',
                    fontWeight: 700
                  }}
                >
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: '#1e40af',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 800
                  }}>
                    {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
                  </div>
                  <span style={{ maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {currentUser.name ? currentUser.name.split(' ')[0] : 'Account'}
                  </span>
                  <ChevronDown size={14} />
                </button>

                {userDropdownOpen && (
                  <div className="user-menu-dropdown">
                    <div style={{ padding: '0.6rem 0.85rem', borderBottom: '1px solid #e2e8f0', marginBottom: '0.35rem' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>{currentUser.name}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{currentUser.phone || currentUser.email}</div>
                    </div>
                    <div 
                      className="user-menu-item" 
                      onClick={() => handleNavClick('wishlist')}
                    >
                      <Heart size={15} style={{ color: '#dc2626' }} />
                      <span>My Saved Wishlist ({wishlistCount})</span>
                    </div>
                    <div className="user-menu-item" onClick={() => handleNavClick('sell')}>
                      <Bike size={15} style={{ color: '#1e40af' }} />
                      <span>My Sell Requests</span>
                    </div>
                    <div 
                      className="user-menu-item" 
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      style={{ color: '#dc2626', borderTop: '1px solid #f1f5f9', marginTop: '0.35rem', paddingTop: '0.6rem' }}
                    >
                      <LogOut size={15} />
                      <span>Logout Account</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="btn-secondary btn-sm"
                onClick={onOpenLogin}
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#1e40af', fontWeight: 700, borderColor: '#bfdbfe', backgroundColor: '#f0f9ff' }}
              >
                <User size={15} />
                <span>Login</span>
              </button>
            )}

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

            {/* Mobile Hamburger Drawer Toggle (Hides automatically on desktop via CSS) */}
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

      {/* Mobile Drawer Menu (Strictly hidden on desktop via CSS class .mobile-drawer-menu) */}
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

          {/* User Auth row for Mobile */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.65rem', marginTop: '0.3rem' }}>
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.85rem' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{currentUser.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{currentUser.phone}</div>
                </div>
                <button 
                  onClick={() => { setMobileMenuOpen(false); onLogout(); }} 
                  style={{ color: '#dc2626', fontSize: '0.8rem', fontWeight: 700, backgroundColor: 'transparent', border: 'none' }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenLogin(); }}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', marginBottom: '0.5rem', color: '#1e40af', fontWeight: 700 }}
              >
                <User size={16} />
                <span>Login / Register Account</span>
              </button>
            )}
          </div>

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
