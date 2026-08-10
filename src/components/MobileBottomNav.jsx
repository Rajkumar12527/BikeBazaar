import React from 'react';
import { Home, Bike, RefreshCw, Calculator, Phone, MessageSquare } from 'lucide-react';

export default function MobileBottomNav({ activeTab, setActiveTab }) {
  return (
    <div className="mobile-bottom-bar">
      <div 
        className={`mobile-nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => { setActiveTab('home'); window.scrollTo({top:0, behavior:'smooth'}); }}
      >
        <Home size={20} />
        <span>Home</span>
      </div>

      <div 
        className={`mobile-nav-item ${activeTab === 'shop' ? 'active' : ''}`}
        onClick={() => { setActiveTab('shop'); window.scrollTo({top:0, behavior:'smooth'}); }}
      >
        <Bike size={20} />
        <span>Shop</span>
      </div>

      <div 
        className={`mobile-nav-item ${activeTab === 'sell' ? 'active' : ''}`}
        onClick={() => { setActiveTab('sell'); window.scrollTo({top:0, behavior:'smooth'}); }}
      >
        <RefreshCw size={20} />
        <span>Sell Bike</span>
      </div>

      <div 
        className={`mobile-nav-item ${activeTab === 'emi' ? 'active' : ''}`}
        onClick={() => { setActiveTab('emi'); window.scrollTo({top:0, behavior:'smooth'}); }}
      >
        <Calculator size={20} />
        <span>EMI</span>
      </div>

      <a 
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noreferrer"
        className="mobile-nav-item"
        style={{ color: '#25d366' }}
      >
        <MessageSquare size={20} />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
