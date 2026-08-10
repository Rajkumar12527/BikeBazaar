import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import BikeDetailModal from './components/BikeDetailModal';
import TestDriveModal from './components/TestDriveModal';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import SellPage from './pages/SellPage';
import EmiPage from './pages/EmiPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

import { bikesData } from './data/bikesData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedBike, setSelectedBike] = useState(null);
  const [testDriveBike, setTestDriveBike] = useState(null);
  const [wishlists, setWishlists] = useState(['bike-01', 'bike-03']);
  const [defaultEmiPrice, setDefaultEmiPrice] = useState(148000);

  const handleToggleWishlist = (bikeId) => {
    setWishlists((prev) => 
      prev.includes(bikeId) ? prev.filter((id) => id !== bikeId) : [...prev, bikeId]
    );
  };

  const handleCalculateEmi = (price) => {
    setDefaultEmiPrice(price);
    setSelectedBike(null);
    setActiveTab('emi');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Navbar */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        wishlistCount={wishlists.length}
      />

      {/* Main Page Content */}
      <main style={{ flexGrow: 1 }}>
        {activeTab === 'home' && (
          <HomePage
            bikes={bikesData}
            onSelectBike={(bike) => setSelectedBike(bike)}
            onNavigate={handleNavigate}
            onToggleWishlist={handleToggleWishlist}
            wishlists={wishlists}
            onBookTestDrive={(bike) => setTestDriveBike(bike)}
          />
        )}

        {activeTab === 'shop' && (
          <ShopPage
            bikes={bikesData}
            onSelectBike={(bike) => setSelectedBike(bike)}
            onToggleWishlist={handleToggleWishlist}
            wishlists={wishlists}
            onBookTestDrive={(bike) => setTestDriveBike(bike)}
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
          onClose={() => setSelectedBike(null)}
          onBookTestDrive={(b) => {
            setSelectedBike(null);
            setTestDriveBike(b);
          }}
          onCalculateEmi={handleCalculateEmi}
        />
      )}

      {/* Test Drive Appointment Booking Modal */}
      {testDriveBike && (
        <TestDriveModal
          bike={testDriveBike}
          onClose={() => setTestDriveBike(null)}
        />
      )}
    </div>
  );
}
