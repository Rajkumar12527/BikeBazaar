import React, { useState, useMemo } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import BikeCard from '../components/BikeCard';
import { AlertCircle } from 'lucide-react';

export default function ShopPage({ bikes, onSelectBike, onToggleWishlist, wishlists, onBookTestDrive }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedOwner, setSelectedOwner] = useState('All Owners');
  const [maxPrice, setMaxPrice] = useState(200000);
  const [sortBy, setSortBy] = useState('featured');

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedBrand('All Brands');
    setSelectedOwner('All Owners');
    setMaxPrice(200000);
    setSortBy('featured');
  };

  const filteredBikes = useMemo(() => {
    return bikes.filter((b) => {
      if (selectedCategory !== 'All' && b.category !== selectedCategory) return false;
      if (selectedBrand !== 'All Brands' && b.brand !== selectedBrand) return false;
      if (selectedOwner !== 'All Owners' && b.owner !== selectedOwner) return false;
      if (b.price > maxPrice) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = b.name.toLowerCase().includes(q);
        const matchBrand = b.brand.toLowerCase().includes(q);
        const matchRto = b.rto.toLowerCase().includes(q);
        const matchEngine = b.engine.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchRto && !matchEngine) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'year-desc') return b.year - a.year;
      if (sortBy === 'km-asc') return a.km - b.km;
      return 0;
    });
  }, [bikes, selectedCategory, selectedBrand, selectedOwner, maxPrice, searchQuery, sortBy]);

  return (
    <div style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <div className="container">
        
        {/* Page Banner Header */}
        <div 
          className="flex-responsive"
          style={{
            backgroundColor: '#0f172a',
            color: '#ffffff',
            padding: '2rem 1.5rem',
            borderRadius: '16px',
            marginBottom: '2rem',
            gap: '1rem'
          }}
        >
          <div>
            <span style={{ color: '#38bdf8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              BIKE BAZAAR SHOWROOM INVENTORY
            </span>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
              Second-Hand Bike & Scooty Store ({filteredBikes.length} Available)
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.2rem' }}>
              Har vehicle par 100+ Points Inspection Check, Complete Details, 5-6 Photos & Verified Documentation.
            </p>
          </div>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="grid-responsive-shop" style={{ alignItems: 'flex-start' }}>
          
          {/* Left Sidebar Filter */}
          <FilterSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedOwner={selectedOwner}
            setSelectedOwner={setSelectedOwner}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onResetFilters={handleResetFilters}
            totalResults={filteredBikes.length}
          />

          {/* Right Vehicle Grid */}
          <div>
            {filteredBikes.length === 0 ? (
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '3rem 1.5rem',
                textAlign: 'center'
              }}>
                <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                  <AlertCircle size={28} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                  Koi Bike Ya Scooty Nahi Mili
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Aapke select kiye gaye filters se koi vehicle match nahi hua. Kripya max budget badlayen ya filters reset karein.
                </p>
                <button className="btn-primary" onClick={handleResetFilters}>
                  All Filters Reset Karein
                </button>
              </div>
            ) : (
              <div className="grid-3">
                {filteredBikes.map((bike) => (
                  <BikeCard
                    key={bike.id}
                    bike={bike}
                    onSelectBike={onSelectBike}
                    onToggleWishlist={onToggleWishlist}
                    isWishlisted={wishlists.includes(bike.id)}
                    onBookTestDrive={onBookTestDrive}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
