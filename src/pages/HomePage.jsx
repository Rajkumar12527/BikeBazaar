import React, { useState } from 'react';
import { Search, ShieldCheck, Award, Wrench, CheckCircle2, Star, ArrowRight, Phone, MessageSquare, Bike, RefreshCw, Calendar, Gauge, Zap, Scale, Calculator, MapPin, Clock, FileCheck, ThumbsUp } from 'lucide-react';
import BikeCard from '../components/BikeCard';
import CompareModal from '../components/CompareModal';

export default function HomePage({ bikes, onSelectBike, onNavigate, onToggleWishlist, wishlists, onBookTestDrive, onApplyHeroFilter }) {
  const [heroCategory, setHeroCategory] = useState('All');
  const [heroBrand, setHeroBrand] = useState('All Brands');
  const [heroType, setHeroType] = useState('All Types');
  const [heroBudget, setHeroBudget] = useState('250000');

  // Product tab filter state
  const [activeProductTab, setActiveProductTab] = useState('all');

  // Compare Modal State
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  // EMI Calculator Local State
  const [emiVehiclePrice, setEmiVehiclePrice] = useState(148000);
  const [emiDownPayment, setEmiDownPayment] = useState(30000);
  const [emiTenureMonths, setEmiTenureMonths] = useState(36);
  const [emiInterestRate, setEmiInterestRate] = useState(9.5);

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    if (onApplyHeroFilter) {
      onApplyHeroFilter({
        category: heroCategory,
        brand: heroBrand,
        type: heroType,
        maxPrice: Number(heroBudget)
      });
    }
    onNavigate('shop');
  };

  const handleWhatsApp = (text = 'Hi Bike Bazaar! I want to buy a certified used bike.') => {
    window.open(`https://wa.me/917480078779?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Filtered bikes for the product showcase tabs
  const showcaseBikes = bikes.filter((b) => {
    if (activeProductTab === 'cruiser') return b.type === 'Cruiser' || b.brand === 'Royal Enfield';
    if (activeProductTab === 'sports') return b.type === 'Sports';
    if (activeProductTab === 'scooter') return b.category === 'Scooty' || b.type === 'Scooter';
    if (activeProductTab === 'commuter') return b.type === 'Commuter' || b.mileage.includes('6') || b.mileage.includes('5');
    return true;
  }).slice(0, 6);

  // EMI Calculation Math
  const loanAmount = Math.max(0, emiVehiclePrice - emiDownPayment);
  const monthlyInterest = (emiInterestRate / 12) / 100;
  const calculatedEmi = loanAmount > 0 ? Math.round(
    (loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, emiTenureMonths)) /
    (Math.pow(1 + monthlyInterest, emiTenureMonths) - 1)
  ) : 0;

  return (
    <div>
      {/* 1. HERO BANNER SECTION (Inspired by BikeWale - High Impact Dark Theme & Interactive Search) */}
      <section style={{ backgroundColor: '#0f172a', color: '#ffffff', paddingTop: '2.5rem', paddingBottom: '3.5rem', borderBottom: '1px solid #1e293b' }}>
        <div className="container">
          <div className="grid-responsive-2" style={{ alignItems: 'center', gap: '2.5rem' }}>
            
            {/* Left Hero Content */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#1e293b',
                color: '#38bdf8',
                padding: '0.4rem 0.85rem',
                borderRadius: '20px',
                fontSize: '0.82rem',
                fontWeight: 700,
                marginBottom: '1rem',
                border: '1px solid #334155'
              }}>
                <ShieldCheck size={16} style={{ color: '#10b981' }} />
                <span>Patna's #1 Certified Used Two-Wheeler Showroom</span>
              </div>

              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', lineHeight: '1.2', marginBottom: '1rem', fontFamily: 'Outfit, sans-serif' }}>
                Apni Sapno Ki Bike & Scooty Layen <span style={{ color: '#dc2626' }}>Bilkul Naye Jaisi!</span>
              </h1>

              <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.75rem' }}>
                Har vehicle <strong>100+ Points Quality Checked</strong>. 1st Owner options, 6 Months Engine Warranty, aur guaranteed Instant RC Transfer!
              </p>

              {/* Interactive Multi-Filter Search Widget */}
              <div style={{
                backgroundColor: '#ffffff',
                padding: '1rem',
                borderRadius: '18px',
                boxShadow: '0 20px 30px -10px rgba(0,0,0,0.5)'
              }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Search size={15} style={{ color: '#1e40af' }} />
                  <span>Search Certified Stock by Budget & Brand</span>
                </div>

                <form onSubmit={handleHeroSearchSubmit} className="hero-search-form">
                  <select 
                    value={heroCategory} 
                    onChange={(e) => setHeroCategory(e.target.value)}
                    style={{ padding: '0.65rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem', color: '#0f172a', fontWeight: 700 }}
                  >
                    <option value="All">All Categories (Bike & Scooty)</option>
                    <option value="Bike">Bike Only</option>
                    <option value="Scooty">Scooty Only</option>
                  </select>

                  <select 
                    value={heroBrand} 
                    onChange={(e) => setHeroBrand(e.target.value)}
                    style={{ padding: '0.65rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem', color: '#0f172a', fontWeight: 700 }}
                  >
                    <option value="All Brands">All Brands (RE, Honda, TVS...)</option>
                    <option value="Royal Enfield">Royal Enfield</option>
                    <option value="Honda">Honda</option>
                    <option value="TVS">TVS</option>
                    <option value="Yamaha">Yamaha</option>
                    <option value="Bajaj">Bajaj</option>
                    <option value="Hero">Hero</option>
                    <option value="KTM">KTM</option>
                    <option value="Suzuki">Suzuki</option>
                  </select>

                  <button type="submit" className="btn-accent" style={{ padding: '0.65rem 1.25rem', width: '100%', fontSize: '0.9rem' }}>
                    <Search size={18} />
                    <span>Find Vehicles</span>
                  </button>
                </form>
              </div>

              {/* Quick Contact Buttons */}
              <div style={{ display: 'flex', gap: '0.85rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <button className="btn-whatsapp" onClick={() => handleWhatsApp()}>
                  <MessageSquare size={17} />
                  <span>WhatsApp: 7480078779</span>
                </button>

                <a href="tel:+917480078779" className="btn-secondary" style={{ color: '#ffffff', backgroundColor: '#1e293b', borderColor: '#334155' }}>
                  <Phone size={17} />
                  <span>Call 7480078779</span>
                </a>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div>
              <div style={{
                backgroundColor: '#1e293b',
                borderRadius: '24px',
                padding: '0.75rem',
                border: '1px solid #334155',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}>
                <img 
                  src="./src/assets/h1.png" 
                  alt="Bike Bazaar Patna Showroom" 
                  style={{ width: '100%', height: '330px', objectFit: 'cover', borderRadius: '16px' }}
                />

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '0.85rem',
                  padding: '0.4rem 0.5rem'
                }}>
                  <div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>BIKE BAZAAR PATNA SHOWROOM</div>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>100+ Certified Used Two-Wheelers in Ready Stock</div>
                  </div>
                  <button className="btn-primary btn-sm" onClick={() => onNavigate('shop')}>
                    Explore Store
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST STATS STRIP */}
      <section style={{ backgroundColor: '#ffffff', padding: '1.75rem 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e40af', fontFamily: 'Outfit, sans-serif' }}>1,200+</div>
              <div style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 600 }}>Happy Bike Owners</div>
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#dc2626', fontFamily: 'Outfit, sans-serif' }}>100+</div>
              <div style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 600 }}>Inspection Checkpoints</div>
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', fontFamily: 'Outfit, sans-serif' }}>6 Months</div>
              <div style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 600 }}>Engine Warranty Guarantee</div>
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b', fontFamily: 'Outfit, sans-serif' }}>100%</div>
              <div style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 600 }}>Free Paperwork & RC Transfer</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT US SECTION (Prominently placed directly on Homepage as requested!) */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div className="grid-responsive-2" style={{ alignItems: 'center', gap: '3rem' }}>
            
            {/* Left About Details */}
            <div>
              <span className="section-tag">About Bike Bazaar Patna</span>
              <h2 className="section-title" style={{ marginBottom: '1rem' }}>
                Bihar's Most Trusted Certified Two-Wheeler Store
              </h2>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Bike Bazaar Patna me hum har purani bike aur scooty ko naye jaisa certified karke bechte hain. Hamare pass Bihar ka sabse bada certified stock hai, jahan aapko <strong>Royal Enfield, Honda Activa, Yamaha MT-15, TVS Jupiter, KTM, aur Hero Splendor</strong> bilkul unbeatable prices par milti hain.
              </p>

              {/* 4 Pillars of Trust */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
                <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ color: '#1e40af', fontWeight: 800, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                    <Wrench size={16} />
                    <span>100+ Point Check</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Engine, gearbox, brakes, chassis & electricals tested by certified engineers.</p>
                </div>

                <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ color: '#10b981', fontWeight: 800, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                    <ShieldCheck size={16} />
                    <span>6 Month Warranty</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Free engine & gearbox warranty coverage for hassle-free rides.</p>
                </div>

                <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ color: '#dc2626', fontWeight: 800, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                    <FileCheck size={16} />
                    <span>Free RC Transfer</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Complete legal documentation & instant RTO ownership transfer guarantee.</p>
                </div>

                <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                    <ThumbsUp size={16} />
                    <span>7-Day Exchange</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Bike pasand na aaye toh 7 dino me easy exchange facility available.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn-primary" onClick={() => onNavigate('about')}>
                  <span>Read Our Story</span>
                  <ArrowRight size={16} />
                </button>
                <button className="btn-whatsapp" onClick={() => handleWhatsApp('Hi, I want to visit Bike Bazaar Patna showroom.')}>
                  <MessageSquare size={16} />
                  <span>Visit Showroom</span>
                </button>
              </div>
            </div>

            {/* Right Location & Showroom Card */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '1.5rem',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={20} style={{ color: '#dc2626' }} />
                <span>Showroom Location & Timings</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: '#475569', marginBottom: '1.25rem' }}>
                <div>
                  <strong style={{ color: '#0f172a' }}>Address:</strong> Main Road, Near Bypass Crossing / Boring Road Pillar 42, Patna, Bihar - 800001
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={16} style={{ color: '#1e40af' }} />
                  <span><strong>Open Daily:</strong> 10:00 AM – 8:30 PM (All 7 Days Open)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={16} style={{ color: '#10b981' }} />
                  <span><strong>Help Line:</strong> +91 7480078779</span>
                </div>
              </div>

              <div style={{
                backgroundColor: '#eff6ff',
                padding: '0.85rem',
                borderRadius: '12px',
                border: '1px solid #bfdbfe',
                fontSize: '0.82rem',
                color: '#1e40af',
                fontWeight: 600,
                marginBottom: '1rem'
              }}>
                📍 Direct Walk-in Available! Test drive over 100+ bikes anytime without appointment.
              </div>

              <a 
                href="https://maps.google.com/?q=Patna+Bihar" 
                target="_blank" 
                rel="noreferrer"
                className="btn-secondary" 
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <MapPin size={16} />
                <span>Get Directions on Google Maps</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 4. POPULAR BRAND SELECTOR GRID */}
      <section style={{ padding: '3rem 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            <span className="section-tag">Popular Brands</span>
            <h2 className="section-title">Explore Vehicles by Manufacturer</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.85rem' }}>
            {[
              { name: 'Royal Enfield', count: '18 Bikes', icon: '🏍️' },
              { name: 'Honda', count: '24 Bikes & Scooty', icon: '🛵' },
              { name: 'TVS', count: '16 Bikes & Scooty', icon: '⚡' },
              { name: 'Yamaha', count: '14 Sports Bikes', icon: '🏁' },
              { name: 'Bajaj', count: '12 Pulsars', icon: '🔥' },
              { name: 'Hero', count: '20 Commuters', icon: '⛽' },
              { name: 'KTM', count: '8 Sports Bikes', icon: '🚀' },
              { name: 'Suzuki', count: '10 Scooters', icon: '🛵' }
            ].map((brand) => (
              <div 
                key={brand.name}
                className="brand-pill"
                onClick={() => {
                  if (onApplyHeroFilter) onApplyHeroFilter({ brand: brand.name });
                  onNavigate('shop');
                }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: '0.2rem' }}>{brand.icon}</div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>{brand.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{brand.count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRODUCT SHOWCASE SECTION WITH FILTER TABS ("product dikhao acha se") */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="flex-responsive" style={{ marginBottom: '1.75rem', gap: '1rem' }}>
            <div>
              <span className="section-tag">Certified Inventory</span>
              <h2 className="section-title">Featured Bikes & Scooties</h2>
            </div>

            <button className="btn-primary" onClick={() => onNavigate('shop')}>
              <span>View All 100+ Vehicles</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Showcase Category Tabs */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            marginBottom: '1.75rem'
          }}>
            {[
              { id: 'all', label: 'All Vehicles' },
              { id: 'cruiser', label: 'Royal Enfield & Cruisers' },
              { id: 'sports', label: 'Sports & Street Bikes' },
              { id: 'scooter', label: 'Scooties & Activa' },
              { id: 'commuter', label: 'High Mileage (50+ kmpl)' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveProductTab(tab.id)}
                style={{
                  padding: '0.55rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  border: '1px solid',
                  borderColor: activeProductTab === tab.id ? '#1e40af' : '#cbd5e1',
                  backgroundColor: activeProductTab === tab.id ? '#1e40af' : '#ffffff',
                  color: activeProductTab === tab.id ? '#ffffff' : '#475569'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Product Cards Grid */}
          <div className="grid-3">
            {showcaseBikes.map((b) => (
              <BikeCard
                key={b.id}
                bike={b}
                onSelectBike={onSelectBike}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlists.includes(b.id)}
                onBookTestDrive={onBookTestDrive}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. BIKE COMPARISON WIDGET (BikeWale style) */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div className="grid-responsive-2" style={{ alignItems: 'center', gap: '2.5rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#1e40af', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                <Scale size={16} />
                <span>BikeWale Style Vehicle Comparison</span>
              </div>
              <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>
                Confused Between Two Bikes? Compare Specs Side-by-Side!
              </h2>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Compare Price, Mileage, Engine Displacement (CC), Ownership Type, RTO registration, and Condition scores to make the right choice!
              </p>
              
              <button className="btn-accent" onClick={() => setCompareModalOpen(true)}>
                <Scale size={18} />
                <span>Launch Bike Comparison Tool</span>
              </button>
            </div>

            <div style={{
              backgroundColor: '#0f172a',
              color: '#ffffff',
              borderRadius: '20px',
              padding: '1.5rem',
              boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.4)'
            }}>
              <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                🔥 Popular Comparison
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', color: '#ffffff' }}>
                Royal Enfield Classic 350 vs Yamaha MT-15 V2
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', backgroundColor: '#1e293b', padding: '1rem', borderRadius: '12px', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#ffffff' }}>Classic 350</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8' }}>₹1,48,000</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>349 cc • 36 kmpl</div>
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#ffffff' }}>Yamaha MT-15</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8' }}>₹1,32,000</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>155 cc • 45 kmpl</div>
                </div>
              </div>

              <button 
                className="btn-secondary"
                onClick={() => setCompareModalOpen(true)}
                style={{ width: '100%', justifyContent: 'center', backgroundColor: '#ffffff', color: '#0f172a' }}
              >
                Compare Full Specifications
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE EMI CALCULATOR WIDGET */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            <span className="section-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calculator size={16} /> Instant Loan Calculator
            </span>
            <h2 className="section-title">Calculate Your Monthly Bike EMI</h2>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            padding: '2rem 1.5rem',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <div className="grid-responsive-2" style={{ gap: '2rem', alignItems: 'center' }}>
              
              {/* Sliders Controls */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                    <span>Vehicle Price</span>
                    <span style={{ color: '#1e40af' }}>₹{emiVehiclePrice.toLocaleString('en-IN')}</span>
                  </div>
                  <input 
                    type="range"
                    min="50000"
                    max="220000"
                    step="5000"
                    value={emiVehiclePrice}
                    onChange={(e) => setEmiVehiclePrice(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#1e40af', cursor: 'pointer' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                    <span>Down Payment Amount</span>
                    <span style={{ color: '#10b981' }}>₹{emiDownPayment.toLocaleString('en-IN')}</span>
                  </div>
                  <input 
                    type="range"
                    min="10000"
                    max={Math.min(100000, emiVehiclePrice - 10000)}
                    step="5000"
                    value={emiDownPayment}
                    onChange={(e) => setEmiDownPayment(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#10b981', cursor: 'pointer' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                    <span>Loan Tenure (Months)</span>
                    <span style={{ color: '#dc2626' }}>{emiTenureMonths} Months ({emiTenureMonths / 12} Yrs)</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {[12, 24, 36, 48].map((months) => (
                      <button
                        key={months}
                        onClick={() => setEmiTenureMonths(months)}
                        style={{
                          flex: 1,
                          padding: '0.45rem',
                          borderRadius: '8px',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          border: '1px solid',
                          borderColor: emiTenureMonths === months ? '#dc2626' : '#cbd5e1',
                          backgroundColor: emiTenureMonths === months ? '#dc2626' : '#ffffff',
                          color: emiTenureMonths === months ? '#ffffff' : '#475569'
                        }}
                      >
                        {months}m
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* EMI Output Box */}
              <div style={{
                backgroundColor: '#0f172a',
                color: '#ffffff',
                borderRadius: '16px',
                padding: '1.75rem 1.25rem',
                textAlign: 'center',
                boxShadow: '0 15px 30px -5px rgba(15, 23, 42, 0.3)'
              }}>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Estimated Monthly EMI
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#38bdf8', margin: '0.4rem 0', fontFamily: 'Outfit, sans-serif' }}>
                  ₹{calculatedEmi.toLocaleString('en-IN')}<span style={{ fontSize: '1rem', color: '#cbd5e1' }}>/mo</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '1.25rem' }}>
                  Loan Amount: ₹{loanAmount.toLocaleString('en-IN')} @ {emiInterestRate}% p.a.
                </div>

                <button 
                  className="btn-accent" 
                  onClick={() => handleWhatsApp(`Hi Bike Bazaar! I calculated EMI ₹${calculatedEmi}/mo for a ₹${emiVehiclePrice} bike. Please arrange loan approval.`)}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <MessageSquare size={16} />
                  <span>Apply for Instant Loan</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER TESTIMONIALS */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            <span className="section-tag">Customer Reviews</span>
            <h2 className="section-title">Satisfied Bike Bazaar Buyers</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', color: '#f59e0b', gap: '2px', marginBottom: '0.75rem' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" />)}
              </div>
              <p style={{ fontStyle: 'italic', color: '#475569', fontSize: '0.92rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                "Maine Bike Bazaar Patna se 2021 Royal Enfield Classic 350 li. Engine condition ekdam naye jaisa tha aur RC transfer bhi fast ho gaya."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ backgroundColor: '#1e40af', color: '#ffffff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  A
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>Amit Verma</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Boring Road, Patna • Classic 350 Buyer</div>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', color: '#f59e0b', gap: '2px', marginBottom: '0.75rem' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" />)}
              </div>
              <p style={{ fontStyle: 'italic', color: '#475569', fontSize: '0.92rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                "Honda Activa 6G khareeda 62,000 me. Bilkul clean website interface hai, product cards pe saaf details dikhte hain. Highly recommended showroom!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ backgroundColor: '#dc2626', color: '#ffffff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  R
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>Ramesh Kumar Singh</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Kankerbagh, Patna • Activa 6G Buyer</div>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', color: '#f59e0b', gap: '2px', marginBottom: '0.75rem' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" />)}
              </div>
              <p style={{ fontStyle: 'italic', color: '#475569', fontSize: '0.92rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                "Maine apni purani bike bech kar Yamaha MT-15 exchange kar liya. Unhone WhatsApp 7480078779 pe instant price quotation diya."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ backgroundColor: '#10b981', color: '#ffffff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  S
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>Suraj Prakash</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Danapur, Patna • MT-15 Buyer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SELL YOUR BIKE BANNER */}
      <section style={{ backgroundColor: '#1e40af', color: '#ffffff', padding: '3.5rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif' }}>
            Apni Purani Bike Bechna Ya Exchange Karna Hai?
          </h2>
          <p style={{ color: '#dbeafe', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 1.75rem auto' }}>
            Instant online valuation paayein. Free doorstep inspection & instant bank transfer guarantee!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-accent" onClick={() => onNavigate('sell')}>
              <span>Check Resale Price</span>
            </button>
            <button className="btn-whatsapp" onClick={() => handleWhatsApp('Hi, I want to sell my used bike.')}>
              <MessageSquare size={18} />
              <span>WhatsApp Valuation: 7480078779</span>
            </button>
          </div>
        </div>
      </section>

      {/* Compare Modal */}
      {compareModalOpen && (
        <CompareModal
          bikes={bikes}
          onClose={() => setCompareModalOpen(false)}
          onSelectBike={onSelectBike}
        />
      )}
    </div>
  );
}
