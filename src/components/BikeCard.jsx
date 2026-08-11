import React from 'react';
import { Calendar, Gauge, User, Heart, MessageSquare, ArrowRight, Camera, ShieldCheck } from 'lucide-react';

export default function BikeCard({ bike, onSelectBike, onToggleWishlist, isWishlisted }) {
  if (!bike) return null;

  const bikeName = bike.name || 'Certified Used Vehicle';
  const bikeBrand = bike.brand || 'Certified Store';
  const bikePrice = typeof bike.price === 'number' ? bike.price : Number(bike.price) || 75000;
  const bikeYear = bike.year || 2022;
  const bikeKm = typeof bike.km === 'number' ? bike.km.toLocaleString('en-IN') : (bike.km ? String(bike.km) : '10,000');
  const bikeOwner = bike.owner || '1st Owner';
  const bikeImages = Array.isArray(bike.images) && bike.images.length > 0 
    ? bike.images 
    : ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'];

  const calculatedEmi = bike.emi 
    ? (typeof bike.emi === 'number' ? bike.emi.toLocaleString('en-IN') : bike.emi)
    : Math.round(bikePrice * 0.025).toLocaleString('en-IN');

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hi Bike Bazaar! I want to inquire about "${bikeName}" (Price: ${formatPrice(bikePrice)}, Year: ${bikeYear}, KM: ${bikeKm} km, Owner: ${bikeOwner}). Is it available?`
    );
    window.open(`https://wa.me/917480078779?text=${text}`, '_blank');
  };

  return (
    <div 
      className="card" 
      onClick={() => onSelectBike(bike)} 
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(15, 23, 42, 0.04)'
      }}
    >
      {/* Clean Image Container */}
      <div style={{ position: 'relative', height: '220px', backgroundColor: '#f8fafc', overflow: 'hidden' }}>
        <img 
          src={bikeImages[0]} 
          alt={bikeName} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        
        {/* Subtle Badge */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '0.4rem' }}>
          <span className="badge badge-green">
            <ShieldCheck size={13} /> {bikeOwner}
          </span>
        </div>

        {/* Wishlist Heart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(bike.id);
          }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            border: 'none'
          }}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} fill={isWishlisted ? "#dc2626" : "none"} color={isWishlisted ? "#dc2626" : "#64748b"} />
        </button>

        {/* Photo Count */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '12px',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          color: '#ffffff',
          padding: '0.2rem 0.55rem',
          borderRadius: '6px',
          fontSize: '0.75rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem'
        }}>
          <Camera size={13} />
          <span>{bikeImages.length} Photos</span>
        </div>
      </div>

      {/* Clean Card Body */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        
        {/* Brand */}
        <div style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
          {bikeBrand}
        </div>

        {/* Title */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.6rem', lineHeight: '1.3' }}>
          {bikeName}
        </h3>

        {/* Price & EMI */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
            {formatPrice(bikePrice)}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#1e40af', backgroundColor: '#dbeafe', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
            EMI ₹{calculatedEmi}/mo
          </div>
        </div>

        {/* Clean Single-Line Short Details */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.6rem 0.8rem',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #f1f5f9',
          fontSize: '0.82rem',
          color: '#475569',
          fontWeight: 600,
          marginBottom: '1.1rem'
        }}>
          <span>{bikeYear} Model</span>
          <span>•</span>
          <span>{bikeKm} KM</span>
          <span>•</span>
          <span style={{ color: '#059669' }}>{bikeOwner}</span>
        </div>

        {/* Full Details Action Button */}
        <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem' }}>
          <button 
            className="btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              onSelectBike(bike);
            }}
            style={{ width: '100%', justifyContent: 'center', padding: '0.65rem' }}
          >
            <span>View Full Details</span>
            <ArrowRight size={16} />
          </button>

          <button 
            className="btn-whatsapp btn-sm"
            onClick={handleWhatsApp}
            title="Chat on WhatsApp 7480078779"
            style={{ padding: '0.65rem' }}
          >
            <MessageSquare size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
