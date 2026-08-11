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

import { bikesData } from './data/bikesData';

export default function App() {
  // Initialize activeTab from URL hash if present
  const getInitialTab = () => {
    const hash = window.location.hash.replace('#', '').split('?')[0];
    const validTabs = ['home', 'shop', 'wishlist', 'sell', 'emi', 'about', 'contact'];
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
      const validTabs = ['home', 'shop', 'wishlist', 'sell', 'emi', 'about', 'contact'];
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
      />

      {/* Main Page Content */}
      <main style={{ flexGrow: 1 }}>
        {activeTab === 'home' && (
          <HomePage
            bikes={bikesData}
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
            bikes={bikesData}
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
            bikes={bikesData}
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
