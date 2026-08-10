import React from 'react';
import { Calendar, Gauge, User, Heart, MessageSquare, ArrowRight, Camera, ShieldCheck } from 'lucide-react';

export default function BikeCard({ bike, onSelectBike, onToggleWishlist, isWishlisted }) {
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
      `Hi Bike Bazaar! I want to inquire about "${bike.name}" (Price: ${formatPrice(bike.price)}, Year: ${bike.year}, KM: ${bike.km} km, Owner: ${bike.owner}). Is it available?`
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
          src={bike.images[0]} 
          alt={bike.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        
        {/* Subtle Badge */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '0.4rem' }}>
          <span className="badge badge-green">
            <ShieldCheck size={13} /> {bike.owner}
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
          <span>{bike.images.length} Photos</span>
        </div>
      </div>

      {/* Clean Card Body */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        
        {/* Brand */}
        <div style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
          {bike.brand}
        </div>

        {/* Title */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.6rem', lineHeight: '1.3' }}>
          {bike.name}
        </h3>

        {/* Price & EMI */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
            {formatPrice(bike.price)}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#1e40af', backgroundColor: '#dbeafe', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
            EMI ₹{bike.emi.toLocaleString('en-IN')}/mo
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
          <span>{bike.year} Model</span>
          <span>•</span>
          <span>{bike.km.toLocaleString('en-IN')} KM</span>
          <span>•</span>
          <span style={{ color: '#059669' }}>{bike.owner}</span>
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
