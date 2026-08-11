import React, { useState, useMemo, useEffect } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import BikeCard from '../components/BikeCard';
import CompareModal from '../components/CompareModal';
import { AlertCircle, Scale, Sparkles, Heart, RefreshCw } from 'lucide-react';

export default function ShopPage({ 
  bikes, 
  onSelectBike, 
  onToggleWishlist, 
  wishlists, 
  onBookTestDrive,
  initialFilters = {},
  isWishlistPage = false,
  onNavigate
}) {
  const [searchQuery, setSearchQuery] = useState(initialFilters.searchQuery || '');
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category || 'All');
  const [selectedBrand, setSelectedBrand] = useState(initialFilters.brand || 'All Brands');
  const [selectedType, setSelectedType] = useState(initialFilters.type || 'All Types');
  const [selectedOwner, setSelectedOwner] = useState(initialFilters.owner || 'All Owners');
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice || 1000000);
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [showWishlistOnly, setShowWishlistOnly] = useState(isWishlistPage || !!initialFilters.wishlistOnly);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  // Sync when isWishlistPage or initialFilters changes
  useEffect(() => {
    if (isWishlistPage) {
      setShowWishlistOnly(true);
      setSelectedBrand('All Brands');
      setSelectedCategory('All');
      setSelectedType('All Types');
      setSelectedOwner('All Owners');
      setSearchQuery('');
      setMaxPrice(1000000);
      setPriceRange('all');
    } else {
      setShowWishlistOnly(!!initialFilters.wishlistOnly);
      if (initialFilters.category) setSelectedCategory(initialFilters.category);
      if (initialFilters.brand) setSelectedBrand(initialFilters.brand);
      if (initialFilters.searchQuery) setSearchQuery(initialFilters.searchQuery);
      if (initialFilters.maxPrice) setMaxPrice(initialFilters.maxPrice);
    }
  }, [isWishlistPage, initialFilters]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedBrand('All Brands');
    setSelectedType('All Types');
    setSelectedOwner('All Owners');
    setMaxPrice(1000000);
    setPriceRange('all');
    setSortBy('featured');
    if (isWishlistPage && onNavigate) {
      onNavigate('shop');
    } else {
      setShowWishlistOnly(false);
    }
  };

  const filteredBikes = useMemo(() => {
    return bikes.filter((b) => {
      // Wishlist filter
      if (showWishlistOnly && !wishlists.includes(b.id)) return false;

      // Category filter
      if (selectedCategory !== 'All' && b.category !== selectedCategory) return false;
      
      // Brand filter
      if (selectedBrand !== 'All Brands' && b.brand !== selectedBrand) return false;

      // Type / Riding style filter
      if (selectedType !== 'All Types' && b.type !== selectedType) return false;
      
      // Owner filter
      if (selectedOwner !== 'All Owners' && b.owner !== selectedOwner) return false;
      
      // Price slider filter
      if (b.price > maxPrice) return false;

      // Quick budget bucket filter
      if (priceRange === 'under-60k' && b.price > 60000) return false;
      if (priceRange === '60k-1l' && (b.price < 60000 || b.price > 100000)) return false;
      if (priceRange === '1l-1.5l' && (b.price < 100000 || b.price > 150000)) return false;
      if (priceRange === 'above-1.5l' && b.price < 150000) return false;
      
      // Search query string filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const nameStr = (b.name || '');
        const brandStr = (b.brand || '');
        const rtoStr = (b.specs?.rto || b.rto || '');
        const engineStr = (b.cc ? `${b.cc} cc` : b.engine || '');
        const typeStr = (b.type || b.category || '');

        const matchName = nameStr.toLowerCase().includes(q);
        const matchBrand = brandStr.toLowerCase().includes(q);
        const matchRto = rtoStr.toLowerCase().includes(q);
        const matchEngine = engineStr.toLowerCase().includes(q);
        const matchType = typeStr.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchRto && !matchEngine && !matchType) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'year-desc') return b.year - a.year;
      if (sortBy === 'km-asc') return a.km - b.km;
      return 0;
    });
  }, [bikes, wishlists, showWishlistOnly, selectedCategory, selectedBrand, selectedType, selectedOwner, maxPrice, priceRange, searchQuery, sortBy]);

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="container">
        
        {/* Page Banner Header */}
        <div 
          className="flex-responsive"
          style={{
            backgroundColor: (showWishlistOnly || isWishlistPage) ? '#881337' : '#0f172a',
            color: '#ffffff',
            padding: '1.75rem 1.5rem',
            borderRadius: '20px',
            marginBottom: '2rem',
            gap: '1rem',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.3)',
            transition: 'background-color 0.3s'
          }}
        >
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: (showWishlistOnly || isWishlistPage) ? '#fecdd3' : '#38bdf8', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {(showWishlistOnly || isWishlistPage) ? <Heart size={14} fill="#fecdd3" /> : <Sparkles size={14} />}
              <span>{(showWishlistOnly || isWishlistPage) ? 'YOUR SAVED VEHICLES' : 'CERTIFIED STOCK SHOWROOM'}</span>
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', fontFamily: 'Outfit, sans-serif', marginTop: '0.2rem' }}>
              {(showWishlistOnly || isWishlistPage) ? `My Saved Wishlist (${filteredBikes.length} Saved)` : `Used Bikes & Scooties Inventory (${filteredBikes.length} Vehicles Found)`}
            </h1>
            <p style={{ color: (showWishlistOnly || isWishlistPage) ? '#ffe4e6' : '#94a3b8', fontSize: '0.88rem', marginTop: '0.25rem' }}>
              {(showWishlistOnly || isWishlistPage) ? 'Aapke dwara save kiye gaye pasandida vehicles. Fast test drive book karein!' : '100+ Point Checked • 6 Months Engine Warranty • Guaranteed Instant RC Transfer'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {(showWishlistOnly || isWishlistPage) && (
              <button 
                className="btn-secondary"
                onClick={() => {
                  if (onNavigate) onNavigate('shop');
                  else setShowWishlistOnly(false);
                }}
                style={{ padding: '0.65rem 1.25rem', backgroundColor: '#ffffff', color: '#881337', fontWeight: 800 }}
              >
                <RefreshCw size={16} />
                <span>Show All Inventory</span>
              </button>
            )}

            <button 
              className="btn-accent"
              onClick={() => setCompareModalOpen(true)}
              style={{ padding: '0.65rem 1.25rem' }}
            >
              <Scale size={18} />
              <span>Compare 2 Bikes</span>
            </button>
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
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedOwner={selectedOwner}
            setSelectedOwner={setSelectedOwner}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
            showWishlistOnly={showWishlistOnly || isWishlistPage}
            setShowWishlistOnly={(val) => {
              if (!val && isWishlistPage && onNavigate) {
                onNavigate('shop');
              } else {
                setShowWishlistOnly(val);
              }
            }}
            wishlistCount={wishlists.length}
            onResetFilters={handleResetFilters}
            totalResults={filteredBikes.length}
          />

          {/* Right Vehicle Grid */}
          <div>
            {filteredBikes.length === 0 ? (
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '3.5rem 1.5rem',
                textAlign: 'center'
              }}>
                <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                  <Heart size={32} fill="#dc2626" />
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  {(showWishlistOnly || isWishlistPage) ? 'Aapki Wishlist Khaali Hai' : 'Koi Matching Bike Ya Scooty Nahi Mili'}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '450px', margin: '0 auto 1.5rem auto' }}>
                  {(showWishlistOnly || isWishlistPage) 
                    ? 'Aapne abhi tak koi bike wishlist me save nahi ki hai. Kisi bhi bike card ke heart icon par click karke save karein!' 
                    : 'Aapke Select kiye gaye filters se koi vehicle match nahi hua. Kripya max budget badlayen ya filters reset karein.'}
                </p>
                <button 
                  className="btn-primary" 
                  onClick={() => {
                    if (onNavigate) onNavigate('shop');
                    else handleResetFilters();
                  }}
                >
                  {(showWishlistOnly || isWishlistPage) ? 'Explore All Vehicles' : 'All Filters Reset Karein'}
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
