import React, { useState } from 'react';
import { Search, ShieldCheck, Award, Wrench, CheckCircle2, Star, ArrowRight, Phone, MessageSquare, Bike, RefreshCw, Calendar, Gauge, Zap } from 'lucide-react';
import BikeCard from '../components/BikeCard';

export default function HomePage({ bikes, onSelectBike, onNavigate, onToggleWishlist, wishlists }) {
  const [heroCategory, setHeroCategory] = useState('All');
  const [heroBrand, setHeroBrand] = useState('All Brands');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    onNavigate('shop');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/917480078779?text=Hi%20Bike%20Bazaar!%20I%20want%20to%20buy%20a%20certified%20used%20bike.', '_blank');
  };

  const featuredBikes = bikes.slice(0, 6);

  return (
    <div>
      {/* Premium Hero Banner (Solid Deep Navy & White Layout with High-Impact Showroom Photo) */}
      <section style={{ backgroundColor: '#0f172a', color: '#ffffff', paddingTop: '3rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div className="grid-responsive-2" style={{ alignItems: 'center', gap: '3rem' }}>
            
            {/* Left Hero Content */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#1e293b',
                color: '#38bdf8',
                padding: '0.45rem 0.9rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginBottom: '1.25rem',
                border: '1px solid #334155'
              }}>
                <ShieldCheck size={16} style={{ color: '#10b981' }} />
                <span>Patna's Certified Used Two-Wheeler Store</span>
              </div>

              <h1 style={{ fontSize: '2.6rem', fontWeight: 800, color: '#ffffff', lineHeight: '1.2', marginBottom: '1.2rem', fontFamily: 'Outfit, sans-serif' }}>
                Apni Sapno Ki Bike & Scooty Layen <span style={{ color: '#dc2626' }}>Bilkul Naye Jaisi!</span>
              </h1>

              <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                Har vehicle <strong>100+ Points Quality Checked</strong>. 1st Owner options, 6 Months Engine Warranty, aur guaranteed Instant RC Transfer!
              </p>

              {/* Instant Search Bar Widget */}
              <form 
                onSubmit={handleHeroSearch}
                className="hero-search-form"
                style={{
                  backgroundColor: '#ffffff',
                  padding: '0.85rem',
                  borderRadius: '16px',
                  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.4)',
                  alignItems: 'center'
                }}
              >
                <select 
                  value={heroCategory} 
                  onChange={(e) => setHeroCategory(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#0f172a', fontWeight: 700 }}
                >
                  <option value="All">All Types (Bike & Scooty)</option>
                  <option value="Bike">Bike Only</option>
                  <option value="Scooty">Scooty Only</option>
                </select>

                <select 
                  value={heroBrand} 
                  onChange={(e) => setHeroBrand(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#0f172a', fontWeight: 700 }}
                >
                  <option value="All Brands">All Brands (RE, Honda, TVS...)</option>
                  <option value="Royal Enfield">Royal Enfield</option>
                  <option value="Honda">Honda</option>
                  <option value="TVS">TVS</option>
                  <option value="Yamaha">Yamaha</option>
                  <option value="Bajaj">Bajaj</option>
                  <option value="Hero">Hero</option>
                </select>

                <button type="submit" className="btn-accent" style={{ padding: '0.75rem 1.5rem', width: '100%' }}>
                  <Search size={18} />
                  <span>Find Bike</span>
                </button>
              </form>

              {/* Quick Contact Buttons */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.75rem', flexWrap: 'wrap' }}>
                <button className="btn-whatsapp" onClick={handleWhatsApp}>
                  <MessageSquare size={18} />
                  <span>WhatsApp: 7480078779</span>
                </button>

                <a href="tel:+917480078779" className="btn-secondary" style={{ color: '#ffffff', backgroundColor: '#1e293b', borderColor: '#334155' }}>
                  <Phone size={18} />
                  <span>Call 7480078779</span>
                </a>
              </div>
            </div>

            {/* Right Hero Image Card (Luxury Showroom Banner Photo) */}
            <div style={{ position: 'relative' }}>
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
                  alt="Bike Bazaar Luxury Showroom" 
                  style={{ width: '100%', height: '340px', objectFit: 'cover', borderRadius: '16px' }}
                />

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '0.85rem',
                  padding: '0.5rem 0.5rem'
                }}>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>BIKE BAZAAR SHOWROOM</div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>100+ Verified Bikes & Scooties Ready for Test Drive</div>
                  </div>
                  <button className="btn-primary btn-sm" onClick={() => onNavigate('shop')}>
                    View Store
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Highlights Strip*/}
      <section style={{ backgroundColor: '#ffffff', padding: '2rem 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            <div style={{ padding: '0.5rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1e40af', fontFamily: 'Outfit, sans-serif' }}>1,200+</div>
              <div style={{ color: '#475569', fontSize: '0.88rem', fontWeight: 600 }}>Happy Bike Owners</div>
            </div>
            <div style={{ padding: '0.5rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#dc2626', fontFamily: 'Outfit, sans-serif' }}>100+</div>
              <div style={{ color: '#475569', fontSize: '0.88rem', fontWeight: 600 }}>Inspection Checkpoints</div>
            </div>
            <div style={{ padding: '0.5rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', fontFamily: 'Outfit, sans-serif' }}>6 Months</div>
              <div style={{ color: '#475569', fontSize: '0.88rem', fontWeight: 600 }}>Engine Warranty Guarantee</div>
            </div>
            <div style={{ padding: '0.5rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b', fontFamily: 'Outfit, sans-serif' }}>100%</div>
              <div style={{ color: '#475569', fontSize: '0.88rem', fontWeight: 600 }}>Free Paperwork & RC Transfer</div>
            </div>
          </div>
        </div>
      </section> 

      {/* Category Shortcut Section */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            <span className="section-tag">Browse Inventory</span>
            <h2 className="section-title">Explore by Category</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div 
              onClick={() => onNavigate('shop')}
              className="card"
              style={{ padding: '1.5rem', textAlign: 'center', cursor: 'pointer' }}
            >
              <div style={{ backgroundColor: '#dbeafe', color: '#1e40af', width: '54px', height: '54px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <Bike size={28} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.3rem' }}>Scooties & Activa</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Honda Activa, TVS Jupiter, Access 125</p>
            </div>

            <div 
              onClick={() => onNavigate('shop')}
              className="card"
              style={{ padding: '1.5rem', textAlign: 'center', cursor: 'pointer' }}
            >
              <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', width: '54px', height: '54px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <Zap size={28} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.3rem' }}>Sports & Street Bikes</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Yamaha MT-15, Pulsar NS200, KTM Duke</p>
            </div>

            <div 
              onClick={() => onNavigate('shop')}
              className="card"
              style={{ padding: '1.5rem', textAlign: 'center', cursor: 'pointer' }}
            >
              <div style={{ backgroundColor: '#fef3c7', color: '#d97706', width: '54px', height: '54px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <Award size={28} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.3rem' }}>Cruiser & Royal Enfield</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Classic 350, Bullet, Himalayan 411</p>
            </div>

            <div 
              onClick={() => onNavigate('shop')}
              className="card"
              style={{ padding: '1.5rem', textAlign: 'center', cursor: 'pointer' }}
            >
              <div style={{ backgroundColor: '#d1fae5', color: '#065f46', width: '54px', height: '54px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <Gauge size={28} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.3rem' }}>High Mileage Commuter</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Splendor Plus XTEC, Shine 125 (65+ kmpl)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles Grid (Uncluttered, clean cards) */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="flex-responsive" style={{ marginBottom: '2rem', gap: '1rem' }}>
            <div>
              <span className="section-tag">Verified Stock</span>
              <h2 className="section-title">Featured Bikes & Scooties</h2>
            </div>
            <button className="btn-primary" onClick={() => onNavigate('shop')}>
              <span>View All Inventory</span>
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid-3">
            {featuredBikes.map((b) => (
              <BikeCard
                key={b.id}
                bike={b}
                onSelectBike={onSelectBike}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlists.includes(b.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            <span className="section-tag">Reviews</span>
            <h2 className="section-title">Humare Satisfied Customers</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', color: '#f59e0b', gap: '2px', marginBottom: '0.75rem' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" />)}
              </div>
              <p style={{ fontStyle: 'italic', color: '#475569', fontSize: '0.92rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                "Maine Bike Bazaar Patna se 2021 Royal Enfield Classic 350 li. Engine condition ekdam naye jaisa tha aur RC transfer bhi fast ho gaya. WhatsApp 7480078779 pe support bhi turant mila."
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

      {/* Call To Action Banner */}
      <section style={{ backgroundColor: '#1e40af', color: '#ffffff', padding: '3.5rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif' }}>
            Apni Purani Bike Bechna Ya Exchange Karna Hai?
          </h2>
          <p style={{ color: '#dbeafe', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
            Instant online valuation paayein. Bank payment & free doorstep inspection guarantee!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-accent" onClick={() => onNavigate('sell')}>
              <span>Check Resale Value</span>
            </button>
            <button className="btn-whatsapp" onClick={handleWhatsApp}>
              <MessageSquare size={18} />
              <span>WhatsApp Us: 7480078779</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
