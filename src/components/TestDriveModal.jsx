import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, Shield } from 'lucide-react';

export default function TestDriveModal({ bike, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '11:00 AM',
    drivingLicense: 'Yes'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const existing = JSON.parse(localStorage.getItem('bike_bazaar_testdrives_db') || '[]');
      const newEntry = {
        id: `td-${Date.now()}`,
        name: formData.name,
        phone: formData.phone,
        bikeName: bike?.name || 'Selected Vehicle',
        date: formData.date || 'Tomorrow',
        time: formData.time || '11:00 AM',
        status: 'Pending',
        submittedAt: new Date().toLocaleDateString('en-IN')
      };
      const updated = [newEntry, ...existing];
      localStorage.setItem('bike_bazaar_testdrives_db', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <div style={{
          padding: '1.25rem 1.5rem',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px'
        }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
              Book Showroom Test Drive
            </h3>
            <div style={{ fontSize: '0.8rem', color: '#93c5fd' }}>
              Free & instant doorstep/showroom appointment
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ backgroundColor: '#d1fae5', color: '#065f46', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                Test Drive Booking Confirmed!
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Thank you, <strong>{formData.name}</strong>! Our sales team will call you at <strong>{formData.phone}</strong> to confirm your slot for <strong>{bike?.name || 'Selected Vehicle'}</strong>.
              </p>
              <button className="btn-primary" onClick={onClose} style={{ width: '100%' }}>
                Done / Back to Vehicles
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {bike && (
                <div style={{ backgroundColor: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <img src={bike.images[0]} alt={bike.name} style={{ width: '60px', height: '50px', objectFit: 'cover', borderRadius: '6px' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>{bike.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#1e40af', fontWeight: 700 }}>₹{bike.price.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                  Full Name *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rahul Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                  Mobile Number *
                </label>
                <input 
                  type="tel" 
                  required
                  placeholder="10 digit mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Preferred Date *
                  </label>
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Preferred Time Slot
                  </label>
                  <select 
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', backgroundColor: '#ffffff' }}
                  >
                    <option>10:00 AM</option>
                    <option>12:00 PM</option>
                    <option>03:00 PM</option>
                    <option>05:00 PM</option>
                    <option>07:00 PM</option>
                  </select>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem' }}>
                <Shield size={16} style={{ color: '#10b981' }} />
                <span>Zero charge. Driving license required at showroom during test ride.</span>
              </div>

              <button type="submit" className="btn-accent" style={{ padding: '0.85rem', marginTop: '0.5rem' }}>
                Confirm Test Drive Appointment
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
