import React from 'react';
import { Search, Filter, RotateCcw, Check } from 'lucide-react';
import { BRANDS, CATEGORIES, OWNERS } from '../data/bikesData';

export default function FilterSidebar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  selectedOwner,
  setSelectedOwner,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  onResetFilters,
  totalResults
}) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '16px',
      padding: '1.25rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem'
    }}>
      {/* Header & Reset */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: '#0f172a', fontSize: '1.1rem' }}>
          <Filter size={18} style={{ color: '#1e40af' }} />
          <span>Filters ({totalResults} Bikes)</span>
        </div>
        <button 
          onClick={onResetFilters}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            backgroundColor: 'transparent',
            color: '#dc2626',
            fontSize: '0.8rem',
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      </div>

      {/* Search Input */}
      <div>
        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
          Search Vehicle
        </label>
        <div style={{ position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Search bike name, CC, RTO..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.65rem 0.65rem 2.2rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.9rem'
            }}
          />
          <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
        </div>
      </div>

      {/* Category Pills (Bike vs Scooty) */}
      <div>
        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
          Vehicle Type
        </label>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                flex: 1,
                padding: '0.5rem 0.25rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 700,
                border: '1px solid',
                borderColor: selectedCategory === cat ? '#1e40af' : '#cbd5e1',
                backgroundColor: selectedCategory === cat ? '#1e40af' : '#ffffff',
                color: selectedCategory === cat ? '#ffffff' : '#475569'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Select */}
      <div>
        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
          Brand / Make
        </label>
        <select 
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          style={{
            width: '100%',
            padding: '0.65rem',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            fontSize: '0.9rem',
            backgroundColor: '#ffffff',
            fontWeight: 600,
            color: '#0f172a'
          }}
        >
          {BRANDS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Owner No. Filter (1st Owner / 2nd Owner) */}
      <div>
        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
          Ownership Type
        </label>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {OWNERS.map((ow) => (
            <button
              key={ow}
              onClick={() => setSelectedOwner(ow)}
              style={{
                flex: 1,
                padding: '0.5rem 0.2rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                border: '1px solid',
                borderColor: selectedOwner === ow ? '#059669' : '#cbd5e1',
                backgroundColor: selectedOwner === ow ? '#059669' : '#ffffff',
                color: selectedOwner === ow ? '#ffffff' : '#475569'
              }}
            >
              {ow}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
          <span>Max Budget</span>
          <span style={{ color: '#1e40af', fontWeight: 800 }}>₹{maxPrice.toLocaleString('en-IN')}</span>
        </div>
        <input 
          type="range"
          min="40000"
          max="200000"
          step="5000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#1e40af', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
          <span>₹40,000</span>
          <span>₹2,000,000+</span>
        </div>
      </div>

      {/* Sort By Dropdown */}
      <div>
        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
          Sort Vehicles By
        </label>
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            width: '100%',
            padding: '0.65rem',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            fontSize: '0.9rem',
            backgroundColor: '#ffffff',
            color: '#0f172a',
            fontWeight: 600
          }}
        >
          <option value="featured">Featured / Recommended</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="year-desc">Newest Model Year</option>
          <option value="km-asc">Lowest Kilometers Driven</option>
        </select>
      </div>

    </div>
  );
}
