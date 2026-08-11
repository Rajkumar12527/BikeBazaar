import React, { useState } from 'react';
import { X, Scale, Check, ArrowRight, ShieldCheck, Phone } from 'lucide-react';

export default function CompareModal({ bikes, initialBike, onClose, onSelectBike }) {
  const [bike1, setBike1] = useState(initialBike || bikes[0]);
  const [bike2, setBike2] = useState(bikes.find(b => b.id !== (initialBike?.id || bikes[0].id)) || bikes[1]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '900px', padding: '1.5rem', borderRadius: '24px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close compare modal">
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <Scale size={24} style={{ color: '#1e40af' }} />
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
              Compare Two-Wheelers
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Price, Engine CC, Mileage, Ownership & Specifications compare karein
            </p>
          </div>
        </div>

        {/* Selection Headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
          {/* Bike 1 Select */}
          <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Vehicle 1
            </label>
            <select 
              value={bike1.id}
              onChange={(e) => setBike1(bikes.find(b => b.id === e.target.value))}
              style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontWeight: 700, fontSize: '0.9rem' }}
            >
              {bikes.map(b => (
                <option key={b.id} value={b.id}>{b.name} (₹{b.price.toLocaleString('en-IN')})</option>
              ))}
            </select>
            <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
              <img src={bike1.images[0]} alt={bike1.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '10px' }} />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginTop: '0.5rem', color: '#0f172a' }}>{bike1.name}</h4>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e40af', marginTop: '0.2rem' }}>₹{bike1.price.toLocaleString('en-IN')}</div>
            </div>
          </div>

          {/* Bike 2 Select */}
          <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Vehicle 2
            </label>
            <select 
              value={bike2.id}
              onChange={(e) => setBike2(bikes.find(b => b.id === e.target.value))}
              style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontWeight: 700, fontSize: '0.9rem' }}
            >
              {bikes.map(b => (
                <option key={b.id} value={b.id}>{b.name} (₹{b.price.toLocaleString('en-IN')})</option>
              ))}
            </select>
            <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
              <img src={bike2.images[0]} alt={bike2.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '10px' }} />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginTop: '0.5rem', color: '#0f172a' }}>{bike2.name}</h4>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e40af', marginTop: '0.2rem' }}>₹{bike2.price.toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>

        {/* Comparison Specs Table */}
        <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <table className="compare-table">
            <tbody>
              <tr>
                <th>Selling Price</th>
                <td style={{ fontWeight: 800, color: '#1e40af' }}>₹{bike1.price.toLocaleString('en-IN')}</td>
                <td style={{ fontWeight: 800, color: '#1e40af' }}>₹{bike2.price.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <th>Estimated EMI</th>
                <td>₹{bike1.emi}/mo</td>
                <td>₹{bike2.emi}/mo</td>
              </tr>
              <tr>
                <th>Model Year</th>
                <td style={{ fontWeight: bike1.year >= bike2.year ? 700 : 400 }}>{bike1.year}</td>
                <td style={{ fontWeight: bike2.year >= bike1.year ? 700 : 400 }}>{bike2.year}</td>
              </tr>
              <tr>
                <th>Kilometers Driven</th>
                <td style={{ fontWeight: bike1.km <= bike2.km ? 700 : 400 }}>{bike1.km.toLocaleString('en-IN')} km</td>
                <td style={{ fontWeight: bike2.km <= bike1.km ? 700 : 400 }}>{bike2.km.toLocaleString('en-IN')} km</td>
              </tr>
              <tr>
                <th>Ownership</th>
                <td>{bike1.owner}</td>
                <td>{bike2.owner}</td>
              </tr>
              <tr>
                <th>Engine Displacement</th>
                <td>{bike1.engine}</td>
                <td>{bike2.engine}</td>
              </tr>
              <tr>
                <th>Claimed Mileage</th>
                <td>{bike1.mileage}</td>
                <td>{bike2.mileage}</td>
              </tr>
              <tr>
                <th>RTO Location</th>
                <td>{bike1.rto}</td>
                <td>{bike2.rto}</td>
              </tr>
              <tr>
                <th>Inspection Score</th>
                <td style={{ color: '#10b981', fontWeight: 800 }}>{bike1.conditionScore}/10 ★</td>
                <td style={{ color: '#10b981', fontWeight: 800 }}>{bike2.conditionScore}/10 ★</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.25rem' }}>
          <button 
            className="btn-primary"
            onClick={() => { onClose(); onSelectBike(bike1); }}
            style={{ width: '100%' }}
          >
            <span>View {bike1.brand} Specs</span>
            <ArrowRight size={16} />
          </button>

          <button 
            className="btn-primary"
            onClick={() => { onClose(); onSelectBike(bike2); }}
            style={{ width: '100%' }}
          >
            <span>View {bike2.brand} Specs</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
