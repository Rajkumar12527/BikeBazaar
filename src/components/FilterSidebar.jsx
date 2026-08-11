import React from 'react';
import { Search, Filter, RotateCcw, X, Check, Heart } from 'lucide-react';
import { BRANDS, CATEGORIES, OWNERS, TYPES } from '../data/bikesData';

export default function FilterSidebar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  selectedType,
  setSelectedType,
  selectedOwner,
  setSelectedOwner,
  maxPrice,
  setMaxPrice,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  showWishlistOnly,
  setShowWishlistOnly,
  wishlistCount,
  onResetFilters,
  totalResults
}) {
  // Check active filter count
  const hasActiveFilters = searchQuery !== '' || 
    selectedCategory !== 'All' || 
    selectedBrand !== 'All Brands' || 
    selectedType !== 'All Types' || 
    selectedOwner !== 'All Owners' || 
    maxPrice < 250000 ||
    priceRange !== 'all' ||
    showWishlistOnly;

  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '16px',
      padding: '1.25rem',
      boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem'
    }}>
      {/* Header & Reset */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: '#0f172a', fontSize: '1.05rem' }}>
          <Filter size={18} style={{ color: '#1e40af' }} />
          <span>Filters ({totalResults} Vehicles)</span>
        </div>

        {hasActiveFilters && (
          <button 
            onClick={onResetFilters}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              fontSize: '0.78rem',
              fontWeight: 700,
              padding: '0.25rem 0.6rem',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={12} />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Wishlist Quick Toggle Switch */}
      <div style={{
        backgroundColor: showWishlistOnly ? '#fef2f2' : '#f8fafc',
        border: `1.5px solid ${showWishlistOnly ? '#fca5a5' : '#e2e8f0'}`,
        borderRadius: '12px',
        padding: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Heart size={18} fill={showWishlistOnly ? "#dc2626" : "none"} color={showWishlistOnly ? "#dc2626" : "#64748b"} />
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: showWishlistOnly ? '#dc2626' : '#0f172a' }}>
              Saved Wishlist ({wishlistCount})
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Show saved bikes only</div>
          </div>
        </div>

        <button
          onClick={() => setShowWishlistOnly(!showWishlistOnly)}
          style={{
            padding: '0.35rem 0.75rem',
            borderRadius: '20px',
            fontSize: '0.78rem',
            fontWeight: 800,
            border: 'none',
            backgroundColor: showWishlistOnly ? '#dc2626' : '#cbd5e1',
            color: '#ffffff',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {showWishlistOnly ? 'ON' : 'OFF'}
        </button>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', borderBottom: '1px solid #e2e8f0', pb: '0.75rem' }}>
          {showWishlistOnly && (
            <span className="filter-chip" style={{ backgroundColor: '#fee2e2', color: '#dc2626', borderColor: '#fca5a5' }} onClick={() => setShowWishlistOnly(false)}>
              Wishlist Only <X size={12} />
            </span>
          )}
          {selectedCategory !== 'All' && (
            <span className="filter-chip" onClick={() => setSelectedCategory('All')}>
              Category: {selectedCategory} <X size={12} />
            </span>
          )}
          {selectedBrand !== 'All Brands' && (
            <span className="filter-chip" onClick={() => setSelectedBrand('All Brands')}>
              Brand: {selectedBrand} <X size={12} />
            </span>
          )}
          {selectedType !== 'All Types' && (
            <span className="filter-chip" onClick={() => setSelectedType('All Types')}>
              Type: {selectedType} <X size={12} />
            </span>
          )}
          {selectedOwner !== 'All Owners' && (
            <span className="filter-chip" onClick={() => setSelectedOwner('All Owners')}>
              {selectedOwner} <X size={12} />
            </span>
          )}
          {priceRange !== 'all' && (
            <span className="filter-chip" onClick={() => setPriceRange('all')}>
              Budget Bucket <X size={12} />
            </span>
          )}
          {searchQuery !== '' && (
            <span className="filter-chip" onClick={() => setSearchQuery('')}>
              Search: "{searchQuery}" <X size={12} />
            </span>
          )}
        </div>
      )}

      {/* Search Input */}
      <div>
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Search Vehicle Name / CC
        </label>
        <div style={{ position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Search Classic 350, Activa, MT-15..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.65rem 0.65rem 2.2rem',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              fontSize: '0.88rem',
              fontWeight: 600
            }}
          />
          <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
        </div>
      </div>

      {/* Vehicle Category Pills */}
      <div>
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Vehicle Type
        </label>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                flex: 1,
                padding: '0.5rem 0.2rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: '1.5px solid',
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
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Brand / Manufacturer
        </label>
        <select 
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          style={{
            width: '100%',
            padding: '0.65rem',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            fontSize: '0.88rem',
            backgroundColor: '#ffffff',
            fontWeight: 700,
            color: '#0f172a'
          }}
        >
          {BRANDS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Body Style / Type Filter */}
      <div>
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Riding Style / Type
        </label>
        <select 
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          style={{
            width: '100%',
            padding: '0.65rem',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            fontSize: '0.88rem',
            backgroundColor: '#ffffff',
            fontWeight: 700,
            color: '#0f172a'
          }}
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Quick Budget Buckets */}
      <div>
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Quick Budget Range
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
          <button
            onClick={() => setPriceRange(priceRange === 'under-60k' ? 'all' : 'under-60k')}
            style={{
              padding: '0.45rem',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: '1px solid',
              borderColor: priceRange === 'under-60k' ? '#16a34a' : '#cbd5e1',
              backgroundColor: priceRange === 'under-60k' ? '#f0fdf4' : '#ffffff',
              color: priceRange === 'under-60k' ? '#16a34a' : '#475569'
            }}
          >
            Under ₹60,000
          </button>
          <button
            onClick={() => setPriceRange(priceRange === '60k-1l' ? 'all' : '60k-1l')}
            style={{
              padding: '0.45rem',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: '1px solid',
              borderColor: priceRange === '60k-1l' ? '#16a34a' : '#cbd5e1',
              backgroundColor: priceRange === '60k-1l' ? '#f0fdf4' : '#ffffff',
              color: priceRange === '60k-1l' ? '#16a34a' : '#475569'
            }}
          >
            ₹60k - ₹1 Lakh
          </button>
          <button
            onClick={() => setPriceRange(priceRange === '1l-1.5l' ? 'all' : '1l-1.5l')}
            style={{
              padding: '0.45rem',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: '1px solid',
              borderColor: priceRange === '1l-1.5l' ? '#16a34a' : '#cbd5e1',
              backgroundColor: priceRange === '1l-1.5l' ? '#f0fdf4' : '#ffffff',
              color: priceRange === '1l-1.5l' ? '#16a34a' : '#475569'
            }}
          >
            ₹1L - ₹1.5 Lakh
          </button>
          <button
            onClick={() => setPriceRange(priceRange === 'above-1.5l' ? 'all' : 'above-1.5l')}
            style={{
              padding: '0.45rem',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: '1px solid',
              borderColor: priceRange === 'above-1.5l' ? '#16a34a' : '#cbd5e1',
              backgroundColor: priceRange === 'above-1.5l' ? '#f0fdf4' : '#ffffff',
              color: priceRange === 'above-1.5l' ? '#16a34a' : '#475569'
            }}
          >
            Above ₹1.5 Lakh
          </button>
        </div>
      </div>

      {/* Max Budget Slider */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 800, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
          <span>Max Price Limit</span>
          <span style={{ color: '#1e40af', fontWeight: 800 }}>₹{maxPrice.toLocaleString('en-IN')}</span>
        </div>
        <input 
          type="range"
          min="40000"
          max="250000"
          step="5000"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(Number(e.target.value));
            setPriceRange('all');
          }}
          style={{ width: '100%', accentColor: '#1e40af', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
          <span>₹40,000</span>
          <span>₹2,50,000+</span>
        </div>
      </div>

      {/* Ownership Filter */}
      <div>
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
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
                fontSize: '0.78rem',
                fontWeight: 700,
                border: '1.5px solid',
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

      {/* Sort By Dropdown */}
      <div>
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Sort Vehicles By
        </label>
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            width: '100%',
            padding: '0.65rem',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            fontSize: '0.88rem',
            backgroundColor: '#ffffff',
            color: '#0f172a',
            fontWeight: 700
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
