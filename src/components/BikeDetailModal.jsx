import React, { useState } from 'react';
import { X, Calendar, Gauge, User, Fuel, ShieldCheck, Phone, MessageSquare, MapPin, CheckCircle, Award, Wrench, ChevronLeft, ChevronRight, Calculator, ExternalLink } from 'lucide-react';

export default function BikeDetailModal({ bike, onClose, onBookTestDrive, onCalculateEmi }) {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!bike) return null;

  // Defensive Property Fallbacks
  const bikeName = bike.name || 'Certified Vehicle';
  const bikeBrand = bike.brand || 'Certified Store';
  const bikeCategory = bike.category || bike.type || 'Cruiser';
  const bikePrice = typeof bike.price === 'number' ? bike.price : Number(bike.price) || 75000;
  const originalPrice = bike.originalPrice || Math.round(bikePrice * 1.15);
  const bikeYear = bike.year || 2022;
  const bikeKm = typeof bike.km === 'number' ? bike.km.toLocaleString('en-IN') : (bike.km ? String(bike.km) : '10,000');
  const bikeOwner = bike.owner || '1st Owner';
  const bikeScore = bike.score || bike.conditionScore || '96';
  const bikeEngine = bike.cc ? `${bike.cc} cc` : bike.engine || '350 cc';
  const bikeFuel = bike.specs?.fuelType || bike.fuelType || 'Petrol';
  const bikeMileage = bike.specs?.mileage || bike.mileage || '40 kmpl';
  const bikeRto = bike.specs?.rto || bike.rto || 'BR-01 (Patna, Bihar)';
  const bikeInsurance = bike.specs?.insurance || bike.insurance || 'Valid till 2027 (Zero Dep)';
  const bikeLocation = bike.location || 'Patna Main Showroom';
  const bikeDescription = bike.description || `${bikeName} in excellent certified condition with 100+ point quality checklist completed. Instant RC transfer guaranteed.`;
  const bikeFeatures = Array.isArray(bike.features) && bike.features.length > 0 
    ? bike.features 
    : ['Dual Disc Brakes', 'Alloy Wheels', 'Digital Console', '100+ Point Inspection Check', '6 Months Engine Warranty', 'Instant RC Transfer'];

  const imagesList = Array.isArray(bike.images) && bike.images.length > 0 
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
    }).format(val || 0);
  };

  const handleNextPhoto = () => {
    setSelectedImgIndex((prev) => (prev + 1) % imagesList.length);
  };

  const handlePrevPhoto = () => {
    setSelectedImgIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello BIKE BAZAAR! I want to inquire about "${bikeName}".\n\n- Price: ${formatPrice(bikePrice)}\n- Year: ${bikeYear}\n- KM Driven: ${bikeKm} km\n- Owner: ${bikeOwner}\n- RTO: ${bikeRto}\n\nPlease share availability for test drive and RC transfer details.`
    );
    window.open(`https://wa.me/917480078779?text=${text}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#93c5fd', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {bikeCategory} Specification • {bikeBrand}
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
              {bikeName}
            </h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close detail modal" style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Top Section: Photo Gallery & Price Overview */}
          <div className="grid-responsive-2" style={{ gap: '1.5rem' }}>
            
            {/* Gallery Column */}
            <div>
              {/* Main Photo Display with Navigation Arrows */}
              <div style={{
                position: 'relative',
                height: '320px',
                backgroundColor: '#f1f5f9',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                marginBottom: '0.75rem',
                cursor: 'pointer'
              }} onClick={() => setLightboxOpen(true)}>
                <img 
                  src={imagesList[selectedImgIndex % imagesList.length]} 
                  alt={`${bikeName} view ${selectedImgIndex + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* Navigation Arrows */}
                <button 
                  onClick={(e) => { e.stopPropagation(); handlePrevPhoto(); }}
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <ChevronLeft size={20} />
                </button>

                <button 
                  onClick={(e) => { e.stopPropagation(); handleNextPhoto(); }}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <ChevronRight size={20} />
                </button>

                {/* Photo Badge Count */}
                <span style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}>
                  Photo {(selectedImgIndex % imagesList.length) + 1} of {imagesList.length} (Click to expand)
                </span>
              </div>

              {/* Thumbnail Strip */}
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(imagesList.length, 6)}, 1fr)`, gap: '0.4rem' }}>
                {imagesList.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    style={{
                      height: '60px',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      border: selectedImgIndex === idx ? '3px solid #1e40af' : '1px solid #cbd5e1',
                      opacity: selectedImgIndex === idx ? 1 : 0.65,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <img src={imgUrl} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Primary Callouts Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.2rem' }}>Vehicle Sale Price</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
                  {formatPrice(bikePrice)}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                  Original Showroom Price: {formatPrice(originalPrice)}
                </div>

                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  backgroundColor: '#dbeafe',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: '#1e40af',
                  fontSize: '0.9rem',
                  fontWeight: 700
                }}>
                  <span>EMI starts from ₹{calculatedEmi}/mo</span>
                  <button 
                    onClick={() => onCalculateEmi(bikePrice)}
                    style={{ backgroundColor: '#1e40af', color: '#ffffff', border: 'none', borderRadius: '4px', padding: '0.3rem 0.6rem', fontSize: '0.75rem', cursor: 'pointer' }}
                  >
                    Calc EMI
                  </button>
                </div>
              </div>

              {/* Inspection Badge Card */}
              <div style={{
                backgroundColor: '#ffffff',
                border: '1.5px solid #10b981',
                padding: '1rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{ backgroundColor: '#d1fae5', padding: '0.75rem', borderRadius: '10px', color: '#065f46' }}>
                  <Award size={32} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: '#065f46', fontSize: '1.05rem' }}>
                    100-Point Certified ({bikeScore}/100)
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                    Engine, Suspension, Brakes & Battery verified. 6 Months Warranty Included!
                  </div>
                </div>
              </div>

              {/* Quick Contact & Test Drive Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <button className="btn-accent" onClick={() => onBookTestDrive(bike)} style={{ width: '100%', padding: '0.85rem' }}>
                  <Calendar size={18} />
                  <span>Book Free Test Drive at Showroom</span>
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  <button className="btn-whatsapp" onClick={handleWhatsApp} style={{ padding: '0.75rem' }}>
                    <MessageSquare size={18} />
                    <span>WhatsApp</span>
                  </button>
                  <a href="tel:+917480078779" className="btn-primary" style={{ padding: '0.75rem', justifyContent: 'center' }}>
                    <Phone size={18} />
                    <span>Call 7480078779</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Full Specifications Section */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Wrench size={20} style={{ color: '#1e40af' }} />
              <span>Detailed Vehicle Specifications</span>
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              backgroundColor: '#f8fafc',
              padding: '1.25rem',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Model Year</div>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem' }}>{bikeYear}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Kilometers Driven</div>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem' }}>{bikeKm} KM</div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Ownership Status</div>
                <div style={{ fontWeight: 800, color: '#059669', fontSize: '1rem' }}>{bikeOwner}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Engine Capacity</div>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem' }}>{bikeEngine}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Fuel & Mileage</div>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem' }}>{bikeFuel} ({bikeMileage})</div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>RTO & Location</div>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem' }}>{bikeRto}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Insurance Status</div>
                <div style={{ fontWeight: 700, color: '#1e40af', fontSize: '0.9rem' }}>{bikeInsurance}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Showroom Branch</div>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>{bikeLocation}</div>
              </div>
            </div>
          </div>

          {/* Description & Key Features */}
          <div className="grid-responsive-2" style={{ gap: '1.5rem' }}>
            <div>
              <h4 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem', color: '#0f172a' }}>Vehicle History & Summary</h4>
              <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.6' }}>
                {bikeDescription}
              </p>
            </div>

            <div>
              <h4 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem', color: '#0f172a' }}>Key Features & Equipment</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {bikeFeatures.map((ft, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#334155' }}>
                    <CheckCircle size={15} style={{ color: '#10b981', flexShrink: 0 }} />
                    <span>{ft}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox Full Screen Preview */}
      {lightboxOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.92)',
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <button 
            onClick={() => setLightboxOpen(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              color: '#ffffff',
              backgroundColor: '#334155',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <X size={26} />
          </button>

          <img 
            src={imagesList[selectedImgIndex % imagesList.length]} 
            alt="Expanded view" 
            style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: '8px' }}
          />

          <div style={{ color: '#ffffff', marginTop: '1rem', fontSize: '1rem', fontWeight: 600 }}>
            {bikeName} - Photo {(selectedImgIndex % imagesList.length) + 1} of {imagesList.length}
          </div>
        </div>
      )}
    </div>
  );
}
