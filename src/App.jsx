import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import BikeDetailModal from './components/BikeDetailModal';
import TestDriveModal from './components/TestDriveModal';
import LoginModal from './components/LoginModal';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import SellPage from './pages/SellPage';
import EmiPage from './pages/EmiPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

import { bikesData as defaultStaticBikes } from './data/bikesData';

export default function App() {
  // Initialize activeTab from URL hash if present
  const getInitialTab = () => {
    const hash = window.location.hash.replace('#', '').split('?')[0];
    const validTabs = ['home', 'shop', 'wishlist', 'sell', 'emi', 'about', 'contact', 'admin'];
    return validTabs.includes(hash) ? hash : 'home';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [selectedBike, setSelectedBike] = useState(null);
  const [testDriveBike, setTestDriveBike] = useState(null);
  const [wishlists, setWishlists] = useState(['bike-01', 'bike-03']);
  const [defaultEmiPrice, setDefaultEmiPrice] = useState(148000);

  // User Auth State
  const [currentUser, setCurrentUser] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Filters passed from Hero Search on HomePage to ShopPage
  const [heroFilters, setHeroFilters] = useState({});

  // 1. DYNAMIC VEHICLE INVENTORY STATE (Sanitized & Persistent)
  const [bikes, setBikes] = useState(() => {
    try {
      const saved = localStorage.getItem('bike_bazaar_inventory_db');
      if (!saved) return defaultStaticBikes;
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((item) => ({
          id: item.id || `bike-${Math.random()}`,
          name: item.name || 'Certified Vehicle',
          brand: item.brand || 'Honda',
          category: item.category || 'Cruiser',
          type: item.type || 'Bike',
          price: typeof item.price === 'number' ? item.price : Number(item.price) || 75000,
          originalPrice: typeof item.originalPrice === 'number' ? item.originalPrice : Number(item.originalPrice) || 85000,
          year: typeof item.year === 'number' ? item.year : Number(item.year) || 2022,
          km: typeof item.km === 'number' ? item.km : Number(item.km) || 10000,
          owner: item.owner || '1st Owner',
          cc: item.cc || '350',
          score: item.score || '96',
          location: item.location || 'Patna, Bihar',
          isFeatured: item.isFeatured !== false,
          status: item.status || 'Available',
          images: Array.isArray(item.images) && item.images.length > 0 ? item.images : ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'],
          badges: Array.isArray(item.badges) ? item.badges : ['Certified', '6 M Warranty'],
          specs: item.specs || { mileage: '40 kmpl', fuelType: 'Petrol', brakes: 'ABS', transmission: 'Manual', rto: 'BR-01 Patna', insurance: 'Valid 2027' }
        }));
      }
      return defaultStaticBikes;
    } catch {
      return defaultStaticBikes;
    }
  });

  // 2. DYNAMIC TEST DRIVE BOOKINGS STATE (Persistent in localStorage)
  const [testDrives, setTestDrives] = useState(() => {
    try {
      const saved = localStorage.getItem('bike_bazaar_testdrives_db');
      return saved ? JSON.parse(saved) : [
        { id: 'td-101', name: 'Rohan Sharma', phone: '9876543210', bikeName: 'Royal Enfield Classic 350', date: '2026-08-12', time: '11:00 AM', status: 'Pending' },
        { id: 'td-102', name: 'Vikram Singh', phone: '7480078779', bikeName: 'Honda Activa 6G', date: '2026-08-13', time: '03:00 PM', status: 'Confirmed' }
      ];
    } catch {
      return [];
    }
  });

  // 3. DYNAMIC SELL & VALUATION LEADS STATE (Persistent in localStorage)
  const [sellLeads, setSellLeads] = useState(() => {
    try {
      const saved = localStorage.getItem('bike_bazaar_sell_leads_db');
      return saved ? JSON.parse(saved) : [
        { id: 'sell-201', sellerName: 'Amit Verma', sellerPhone: '9123456789', brand: 'TVS', modelName: 'Apache RTR 160', year: '2021', km: '18000', owner: '1st Owner', estimatedPrice: '₹75,000 - ₹82,000', status: 'New Lead' }
      ];
    } catch {
      return [];
    }
  });

  // Synchronize bikes inventory with localStorage whenever updated
  const handleUpdateBikes = (newBikes) => {
    setBikes(newBikes);
    try {
      localStorage.setItem('bike_bazaar_inventory_db', JSON.stringify(newBikes));
    } catch (err) {
      console.error('Failed to save inventory DB', err);
    }
  };

  // Synchronize test drive bookings with localStorage
  const handleUpdateTestDrives = (newTestDrives) => {
    setTestDrives(newTestDrives);
    try {
      localStorage.setItem('bike_bazaar_testdrives_db', JSON.stringify(newTestDrives));
    } catch (err) {
      console.error('Failed to save test drive DB', err);
    }
  };

  // Synchronize sell leads with localStorage
  const handleUpdateSellLeads = (newSellLeads) => {
    setSellLeads(newSellLeads);
    try {
      localStorage.setItem('bike_bazaar_sell_leads_db', JSON.stringify(newSellLeads));
    } catch (err) {
      console.error('Failed to save sell leads DB', err);
    }
  };

  // Load persisted user session on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('bike_bazaar_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error('Failed to load user session', err);
    }
  }, []);

  // Handle Browser Back / Forward Button (popstate)
  useEffect(() => {
    const handlePopState = (event) => {
      // 1. If any modal is open, close it first on Back button press
      if (selectedBike || testDriveBike || loginModalOpen) {
        setSelectedBike(null);
        setTestDriveBike(null);
        setLoginModalOpen(false);
        return;
      }

      // 2. Parse tab and parameters from URL hash or event state
      const hashParts = window.location.hash.replace('#', '').split('?');
      const hashTab = hashParts[0];
      const validTabs = ['home', 'shop', 'wishlist', 'sell', 'emi', 'about', 'contact', 'admin'];
      const targetTab = validTabs.includes(hashTab) ? hashTab : 'home';

      if (event?.state?.filters) {
        setHeroFilters(event.state.filters);
      } else {
        setHeroFilters({});
      }

      setActiveTab(targetTab);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedBike, testDriveBike, loginModalOpen]);

  // Central Navigation Handler with History Push
  const handleNavigate = (tabId, extraFilters = null) => {
    setActiveTab(tabId);
    if (extraFilters) {
      setHeroFilters(extraFilters);
    }

    const hashString = `#${tabId}`;

    // Push entry to browser history so back button works smoothly
    window.history.pushState({ tab: tabId, filters: extraFilters }, '', hashString);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (userObj) => {
    setCurrentUser(userObj);
    localStorage.setItem('bike_bazaar_user', JSON.stringify(userObj));
    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('bike_bazaar_user');
  };

  const handleToggleWishlist = (bikeId) => {
    setWishlists((prev) => 
      prev.includes(bikeId) ? prev.filter((id) => id !== bikeId) : [...prev, bikeId]
    );
  };

  const handleCalculateEmi = (price) => {
    setDefaultEmiPrice(price);
    setSelectedBike(null);
    handleNavigate('emi');
  };

  const handleApplyHeroFilter = (filters) => {
    setHeroFilters(filters);
  };

  // Helper to open modal and push state to history
  const openBikeModal = (bike) => {
    setSelectedBike(bike);
    window.history.pushState({ modal: 'detail', bikeId: bike.id }, '', `#${activeTab}?bike=${bike.id}`);
  };

  const openTestDriveModal = (bike) => {
    setTestDriveBike(bike);
    window.history.pushState({ modal: 'testdrive', bikeId: bike.id }, '', `#${activeTab}?testdrive=${bike.id}`);
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
    window.history.pushState({ modal: 'login' }, '', `#${activeTab}?login=true`);
  };

  const openAdminPage = () => {
    handleNavigate('admin');
  };

  // If in Standalone Admin Dashboard route, render full page Admin workspace
  if (activeTab === 'admin') {
    return (
      <AdminPage
        bikes={bikes}
        onUpdateBikes={handleUpdateBikes}
        testDrives={testDrives}
        onUpdateTestDrives={handleUpdateTestDrives}
        sellLeads={sellLeads}
        onUpdateSellLeads={handleUpdateSellLeads}
        onNavigate={handleNavigate}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Navbar */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={handleNavigate} 
        wishlistCount={wishlists.length}
        currentUser={currentUser}
        onOpenLogin={openLoginModal}
        onLogout={handleLogout}
        onOpenAdmin={openAdminPage}
      />

      {/* Main Page Content */}
      <main style={{ flexGrow: 1 }}>
        {activeTab === 'home' && (
          <HomePage
            bikes={bikes}
            onSelectBike={openBikeModal}
            onNavigate={handleNavigate}
            onToggleWishlist={handleToggleWishlist}
            wishlists={wishlists}
            onBookTestDrive={openTestDriveModal}
            onApplyHeroFilter={handleApplyHeroFilter}
          />
        )}

        {activeTab === 'shop' && (
          <ShopPage
            bikes={bikes}
            onSelectBike={openBikeModal}
            onToggleWishlist={handleToggleWishlist}
            wishlists={wishlists}
            onBookTestDrive={openTestDriveModal}
            initialFilters={heroFilters}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'wishlist' && (
          <ShopPage
            bikes={bikes}
            onSelectBike={openBikeModal}
            onToggleWishlist={handleToggleWishlist}
            wishlists={wishlists}
            onBookTestDrive={openTestDriveModal}
            initialFilters={{ wishlistOnly: true }}
            isWishlistPage={true}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'sell' && <SellPage />}

        {activeTab === 'emi' && <EmiPage defaultPrice={defaultEmiPrice} />}

        {activeTab === 'about' && <AboutPage onNavigate={handleNavigate} />}

        {activeTab === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={handleNavigate} />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav activeTab={activeTab} setActiveTab={handleNavigate} />

      {/* Bike Detail Modal with 5-6 Photos & Specs */}
      {selectedBike && (
        <BikeDetailModal
          bike={selectedBike}
          onClose={() => {
            setSelectedBike(null);
            if (window.location.hash.includes('bike=')) {
              window.history.back();
            }
          }}
          onBookTestDrive={(b) => {
            setSelectedBike(null);
            openTestDriveModal(b);
          }}
          onCalculateEmi={handleCalculateEmi}
        />
      )}

      {/* Test Drive Appointment Booking Modal */}
      {testDriveBike && (
        <TestDriveModal
          bike={testDriveBike}
          onClose={() => {
            setTestDriveBike(null);
            if (window.location.hash.includes('testdrive=')) {
              window.history.back();
            }
          }}
        />
      )}

      {/* User Login & Auth Modal */}
      {loginModalOpen && (
        <LoginModal
          onClose={() => {
            setLoginModalOpen(false);
            if (window.location.hash.includes('login=')) {
              window.history.back();
            }
          }}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}
