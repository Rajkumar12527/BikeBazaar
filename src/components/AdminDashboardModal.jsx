import React, { useState, useEffect } from 'react';
import { 
  X, Lock, User, Key, Plus, Edit, Trash2, CheckCircle2, AlertCircle, 
  Search, Shield, Phone, Calendar, Clock, DollarSign, Bike, Eye, 
  TrendingUp, RefreshCw, Sparkles, Check, FileText, Image as ImageIcon,
  Sliders, MessageSquare, LogOut
} from 'lucide-react';
import { BRANDS, CATEGORIES, OWNERS, TYPES } from '../data/bikesData';

export default function AdminDashboardModal({ 
  onClose, 
  bikes, 
  onUpdateBikes,
  testDrives,
  onUpdateTestDrives,
  sellLeads,
  onUpdateSellLeads
}) {
  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState('rajkumar87036@gmail.com');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Dashboard Tab: 'overview' | 'inventory' | 'testdrives' | 'sellleads' | 'security'
  const [activeTab, setActiveTab] = useState('overview');

  // Add / Edit Bike Modal Form State
  const [showBikeForm, setShowBikeForm] = useState(false);
  const [editingBikeId, setEditingBikeId] = useState(null);
  
  const initialBikeForm = {
    name: '',
    brand: 'Royal Enfield',
    category: 'Cruiser',
    type: 'Bike',
    price: '',
    originalPrice: '',
    year: '2022',
    km: '10000',
    owner: '1st Owner',
    cc: '350',
    score: '96',
    location: 'Patna, Bihar',
    isFeatured: true,
    status: 'Available',
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80'
    ]
  };

  const [bikeFormData, setBikeFormData] = useState(initialBikeForm);
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Password Change State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Check if admin is already logged in from localStorage
  useEffect(() => {
    try {
      const savedAdmin = localStorage.getItem('bike_bazaar_admin_session');
      if (savedAdmin === 'true') {
        setIsAdminLoggedIn(true);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Helper to get stored admin password
  const getStoredPassword = () => {
    try {
      return localStorage.getItem('bike_bazaar_admin_password') || 'admin123';
    } catch {
      return 'admin123';
    }
  };

  // Handle Admin Login Submission
  const handleAdminLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    const validPassword = getStoredPassword();

    if (adminEmail.toLowerCase() === 'rajkumar87036@gmail.com' && (adminPassword === validPassword || adminPassword === 'admin123')) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('bike_bazaar_admin_session', 'true');
      setAuthSuccess('Welcome Rajkumar! Admin Dashboard Access Granted.');
    } else {
      setAuthError('Galat Email ya Password. Email: rajkumar87036@gmail.com, Default Password: admin123');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('bike_bazaar_admin_session');
  };

  // Change Admin Password
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 4) {
      setAuthError('Naya password kam se kam 4 characters ka hona chahiye.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setAuthError('Password match nahi kar raha hai.');
      return;
    }

    localStorage.setItem('bike_bazaar_admin_password', newPassword);
    setAuthSuccess('Password successfully updated!');
    setAuthError('');
    setNewPassword('');
    setConfirmPassword('');
  };

  // Open Bike Form for Add or Edit
  const openAddBikeForm = () => {
    setEditingBikeId(null);
    setBikeFormData(initialBikeForm);
    setShowBikeForm(true);
  };

  const openEditBikeForm = (bike) => {
    setEditingBikeId(bike.id);
    setBikeFormData({
      name: bike.name,
      brand: bike.brand,
      category: bike.category || 'Cruiser',
      type: bike.type || 'Bike',
      price: bike.price,
      originalPrice: bike.originalPrice || Math.round(bike.price * 1.15),
      year: bike.year,
      km: bike.km,
      owner: bike.owner,
      cc: bike.cc || '350',
      score: bike.score || '95',
      location: bike.location || 'Patna, Bihar',
      isFeatured: bike.isFeatured !== false,
      status: bike.status || 'Available',
      images: bike.images && bike.images.length > 0 ? bike.images : [initialBikeForm.images[0]]
    });
    setShowBikeForm(true);
  };

  // Save Bike Form Submission (Add / Edit)
  const handleSaveBike = (e) => {
    e.preventDefault();
    
    let updatedBikes = [];
    if (editingBikeId) {
      // Update existing bike
      updatedBikes = bikes.map((b) => {
        if (b.id === editingBikeId) {
          return {
            ...b,
            name: bikeFormData.name,
            brand: bikeFormData.brand,
            category: bikeFormData.category,
            type: bikeFormData.type,
            price: Number(bikeFormData.price),
            originalPrice: Number(bikeFormData.originalPrice) || Math.round(Number(bikeFormData.price) * 1.15),
            year: Number(bikeFormData.year),
            km: Number(bikeFormData.km),
            owner: bikeFormData.owner,
            cc: Number(bikeFormData.cc),
            score: Number(bikeFormData.score),
            location: bikeFormData.location,
            isFeatured: bikeFormData.isFeatured,
            status: bikeFormData.status,
            images: bikeFormData.images
          };
        }
        return b;
      });
    } else {
      // Add new bike
      const newBike = {
        id: `bike-${Date.now()}`,
        name: bikeFormData.name,
        brand: bikeFormData.brand,
        category: bikeFormData.category,
        type: bikeFormData.type,
        price: Number(bikeFormData.price),
        originalPrice: Number(bikeFormData.originalPrice) || Math.round(Number(bikeFormData.price) * 1.15),
        year: Number(bikeFormData.year),
        km: Number(bikeFormData.km),
        owner: bikeFormData.owner,
        cc: Number(bikeFormData.cc),
        score: Number(bikeFormData.score),
        location: bikeFormData.location,
        isFeatured: bikeFormData.isFeatured,
        status: bikeFormData.status,
        images: bikeFormData.images.length > 0 ? bikeFormData.images : [initialBikeForm.images[0]],
        badges: ['Certified', '6 M Warranty', 'Patna Stock'],
        specs: {
          mileage: '40 kmpl',
          fuelType: 'Petrol',
          brakes: 'Front & Rear Disc with ABS',
          transmission: 'Manual',
          insurance: 'Valid 2027',
          color: 'Black Metallic'
        }
      };
      updatedBikes = [newBike, ...bikes];
    }

    onUpdateBikes(updatedBikes);
    setShowBikeForm(false);
  };

  // Delete Bike Listing
  const handleDeleteBike = (bikeId) => {
    if (window.confirm('Kya aap sach me is vehicle ko website inventory se delete karna chahte hain?')) {
      const updated = bikes.filter((b) => b.id !== bikeId);
      onUpdateBikes(updated);
    }
  };

  // Add Image URL to Form
  const handleAddImageUrl = () => {
    if (!customImageUrl) return;
    setBikeFormData({
      ...bikeFormData,
      images: [...bikeFormData.images, customImageUrl]
    });
    setCustomImageUrl('');
  };

  // Remove Image from Form
  const handleRemoveImage = (index) => {
    const newImgs = [...bikeFormData.images];
    newImgs.splice(index, 1);
    setBikeFormData({ ...bikeFormData, images: newImgs });
  };

  // Update Test Drive Status
  const handleUpdateTestDriveStatus = (id, newStatus) => {
    const updated = testDrives.map((td) => td.id === id ? { ...td, status: newStatus } : td);
    onUpdateTestDrives(updated);
  };

  // Delete Test Drive
  const handleDeleteTestDrive = (id) => {
    const updated = testDrives.filter((td) => td.id !== id);
    onUpdateTestDrives(updated);
  };

  // Update Sell Lead Status
  const handleUpdateSellLeadStatus = (id, newStatus) => {
    const updated = sellLeads.map((sl) => sl.id === id ? { ...sl, status: newStatus } : sl);
    onUpdateSellLeads(updated);
  };

  // Delete Sell Lead
  const handleDeleteSellLead = (id) => {
    const updated = sellLeads.filter((sl) => sl.id !== id);
    onUpdateSellLeads(updated);
  };

  // Calculate Total Inventory Value
  const totalInventoryValue = bikes.reduce((acc, b) => acc + (b.price || 0), 0);

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1000, padding: '1rem' }}>
      <div 
        className="modal-content" 
        style={{ 
          maxWidth: isAdminLoggedIn ? '1100px' : '440px', 
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '24px',
          overflow: 'hidden',
          backgroundColor: '#ffffff'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div style={{
          padding: '1.1rem 1.5rem',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #1e293b'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#1e40af',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 900
            }}>
              👑
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
                Bike Bazaar Owner Portal
              </h3>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                {isAdminLoggedIn ? 'rajkumar87036@gmail.com (Owner Access)' : 'Showroom Management System'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {isAdminLoggedIn && (
              <button 
                onClick={handleAdminLogout}
                style={{
                  backgroundColor: '#334155',
                  color: '#f8fafc',
                  border: 'none',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            )}

            <button className="modal-close-btn" onClick={onClose} style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ---------------- LOGIN FORM FOR OWNER ---------------- */}
        {!isAdminLoggedIn ? (
          <div style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#eff6ff',
              color: '#1e40af',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <Lock size={32} />
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.3rem' }}>
              Owner Login Required
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>
              Inventory control, test drives & customer sell leads access karne ke liye log-in karein.
            </p>

            {authError && (
              <div style={{
                backgroundColor: '#fee2e2',
                color: '#dc2626',
                padding: '0.65rem 0.85rem',
                borderRadius: '10px',
                fontSize: '0.82rem',
                marginBottom: '1.25rem',
                fontWeight: 700
              }}>
                {authError}
              </div>
            )}

            <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#475569', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  Owner Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input 
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.7rem 0.7rem 2.4rem',
                      borderRadius: '10px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: '#0f172a'
                    }}
                  />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase' }}>
                    Password
                  </label>
                  <span style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: 700 }}>
                    Default: admin123
                  </span>
                </div>
                <div style={{ position: 'relative' }}>
                  <Key size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input 
                    type="password"
                    required
                    placeholder="Enter password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.7rem 0.7rem 2.4rem',
                      borderRadius: '10px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.9rem'
                    }}
                    autoFocus
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '0.8rem', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                <span>Access Admin Dashboard</span>
              </button>
            </form>
          </div>
        ) : (
          /* ---------------- ADMIN DASHBOARD MAIN BODY ---------------- */
          <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
            
            {/* Sidebar Navigation */}
            <div style={{
              width: '230px',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              padding: '1.25rem 0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              borderRight: '1px solid #1e293b',
              flexShrink: 0
            }}>
              <button
                onClick={() => setActiveTab('overview')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'overview' ? '#1e40af' : 'transparent',
                  color: activeTab === 'overview' ? '#ffffff' : '#94a3b8',
                  textAlign: 'left'
                }}
              >
                <TrendingUp size={16} />
                <span>Overview Stats</span>
              </button>

              <button
                onClick={() => setActiveTab('inventory')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'inventory' ? '#1e40af' : 'transparent',
                  color: activeTab === 'inventory' ? '#ffffff' : '#94a3b8',
                  textAlign: 'left'
                }}
              >
                <Bike size={16} />
                <span>Manage Vehicles ({bikes.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('testdrives')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'testdrives' ? '#1e40af' : 'transparent',
                  color: activeTab === 'testdrives' ? '#ffffff' : '#94a3b8',
                  textAlign: 'left'
                }}
              >
                <Calendar size={16} />
                <span>Test Drives ({testDrives.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('sellleads')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'sellleads' ? '#1e40af' : 'transparent',
                  color: activeTab === 'sellleads' ? '#ffffff' : '#94a3b8',
                  textAlign: 'left'
                }}
              >
                <FileText size={16} />
                <span>Sell Enquiries ({sellLeads.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'security' ? '#1e40af' : 'transparent',
                  color: activeTab === 'security' ? '#ffffff' : '#94a3b8',
                  textAlign: 'left',
                  marginTop: 'auto'
                }}
              >
                <Key size={16} />
                <span>Security & Password</span>
              </button>
            </div>

            {/* Main Content Area */}
            <div style={{ flexGrow: 1, overflowY: 'auto', padding: '1.5rem', backgroundColor: '#f8fafc' }}>
              
              {/* ------------ TAB 1: OVERVIEW STATS ------------ */}
              {activeTab === 'overview' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div>
                      <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                        Dashboard Overview
                      </h2>
                      <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                        Real-time showroom performance & inventory metrics
                      </p>
                    </div>

                    <button 
                      onClick={openAddBikeForm}
                      className="btn-accent"
                      style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
                    >
                      <Plus size={16} />
                      <span>Add New Bike Listing</span>
                    </button>
                  </div>

                  {/* Stat Cards Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
                    <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>
                        Total Inventory Value
                      </div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e40af', margin: '0.35rem 0' }}>
                        ₹{totalInventoryValue.toLocaleString('en-IN')}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
                        {bikes.length} Vehicles in Stock
                      </div>
                    </div>

                    <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>
                        Test Drive Requests
                      </div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '0.35rem 0' }}>
                        {testDrives.length} Bookings
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 700 }}>
                        {testDrives.filter(t => t.status === 'Pending').length} Pending Confirmation
                      </div>
                    </div>

                    <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>
                        Customer Sell Leads
                      </div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#dc2626', margin: '0.35rem 0' }}>
                        {sellLeads.length} Enquiries
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: 700 }}>
                        Doorstep Valuation Requests
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Banner */}
                  <div style={{
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
                        Nayi Bike Inventory Upload Karein
                      </h3>
                      <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                        Ek click me photos, price, model details add karein aur website par instant live karein.
                      </p>
                    </div>

                    <button onClick={openAddBikeForm} className="btn-primary" style={{ padding: '0.65rem 1.25rem' }}>
                      <Plus size={16} />
                      <span>+ Add Vehicle Listing</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ------------ TAB 2: MANAGE VEHICLE INVENTORY ------------ */}
              {activeTab === 'inventory' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div>
                      <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                        Manage Vehicles Inventory ({bikes.length})
                      </h2>
                      <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                        Website par live vehicle listings add, edit ya delete karein
                      </p>
                    </div>

                    <button onClick={openAddBikeForm} className="btn-accent" style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}>
                      <Plus size={16} />
                      <span>Add New Bike Listing</span>
                    </button>
                  </div>

                  {/* Bikes Inventory Table */}
                  <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#f1f5f9', color: '#475569', fontWeight: 800, borderBottom: '1px solid #e2e8f0' }}>
                          <th style={{ padding: '0.75rem 1rem' }}>Vehicle</th>
                          <th style={{ padding: '0.75rem 1rem' }}>Brand & Type</th>
                          <th style={{ padding: '0.75rem 1rem' }}>Price (₹)</th>
                          <th style={{ padding: '0.75rem 1rem' }}>Year / KM</th>
                          <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                          <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bikes.map((bike) => (
                          <tr key={bike.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '0.75rem 1rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <img 
                                  src={bike.images && bike.images[0] ? bike.images[0] : initialBikeForm.images[0]} 
                                  alt={bike.name} 
                                  style={{ width: '56px', height: '44px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' }} 
                                />
                                <div>
                                  <div style={{ fontWeight: 800, color: '#0f172a' }}>{bike.name}</div>
                                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{bike.owner} • {bike.cc} cc</div>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: '0.75rem 1rem' }}>
                              <span style={{ fontWeight: 700, color: '#1e40af' }}>{bike.brand}</span>
                              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{bike.category}</div>
                            </td>
                            <td style={{ padding: '0.75rem 1rem', fontWeight: 900, color: '#0f172a' }}>
                              ₹{bike.price?.toLocaleString('en-IN')}
                            </td>
                            <td style={{ padding: '0.75rem 1rem', color: '#475569' }}>
                              {bike.year} • {bike.km?.toLocaleString('en-IN')} km
                            </td>
                            <td style={{ padding: '0.75rem 1rem' }}>
                              <span style={{
                                backgroundColor: bike.status === 'Sold Out' ? '#fee2e2' : '#dcfce7',
                                color: bike.status === 'Sold Out' ? '#dc2626' : '#15803d',
                                padding: '0.2rem 0.6rem',
                                borderRadius: '12px',
                                fontSize: '0.75rem',
                                fontWeight: 800
                              }}>
                                {bike.status || 'Available'}
                              </span>
                            </td>
                            <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                                <button 
                                  onClick={() => openEditBikeForm(bike)}
                                  style={{
                                    backgroundColor: '#eff6ff',
                                    color: '#1e40af',
                                    border: '1px solid #bfdbfe',
                                    padding: '0.35rem 0.65rem',
                                    borderRadius: '6px',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.2rem'
                                  }}
                                >
                                  <Edit size={13} />
                                  <span>Edit</span>
                                </button>

                                <button 
                                  onClick={() => handleDeleteBike(bike.id)}
                                  style={{
                                    backgroundColor: '#fef2f2',
                                    color: '#dc2626',
                                    border: '1px solid #fecaca',
                                    padding: '0.35rem 0.65rem',
                                    borderRadius: '6px',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.2rem'
                                  }}
                                >
                                  <Trash2 size={13} />
                                  <span>Delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ------------ TAB 3: TEST DRIVE REQUESTS ------------ */}
              {activeTab === 'testdrives' && (
                <div>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                      Customer Test Drive Bookings ({testDrives.length})
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      Website par customers dwara book kiye gaye test drive appointments
                    </p>
                  </div>

                  <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#f1f5f9', color: '#475569', fontWeight: 800, borderBottom: '1px solid #e2e8f0' }}>
                          <th style={{ padding: '0.75rem 1rem' }}>Customer</th>
                          <th style={{ padding: '0.75rem 1rem' }}>Bike Booked</th>
                          <th style={{ padding: '0.75rem 1rem' }}>Date & Slot</th>
                          <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                          <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {testDrives.map((td) => (
                          <tr key={td.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '0.75rem 1rem' }}>
                              <div style={{ fontWeight: 800, color: '#0f172a' }}>{td.name}</div>
                              <div style={{ fontSize: '0.78rem', color: '#1e40af', fontWeight: 700 }}>
                                📞 +91 {td.phone}
                              </div>
                            </td>
                            <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0f172a' }}>
                              {td.bikeName}
                            </td>
                            <td style={{ padding: '0.75rem 1rem', color: '#475569' }}>
                              {td.date} at <strong>{td.time}</strong>
                            </td>
                            <td style={{ padding: '0.75rem 1rem' }}>
                              <select 
                                value={td.status}
                                onChange={(e) => handleUpdateTestDriveStatus(td.id, e.target.value)}
                                style={{
                                  padding: '0.25rem 0.5rem',
                                  borderRadius: '8px',
                                  fontSize: '0.75rem',
                                  fontWeight: 800,
                                  border: '1px solid #cbd5e1',
                                  backgroundColor: td.status === 'Confirmed' ? '#dcfce7' : td.status === 'Completed' ? '#dbeafe' : '#fef3c7',
                                  color: td.status === 'Confirmed' ? '#15803d' : td.status === 'Completed' ? '#1e40af' : '#b45309'
                                }}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                              <a
                                href={`https://wa.me/91${td.phone}?text=Hello%20${td.name},%20Bike%20Bazaar%20Patna%20se%20aapke%20${td.bikeName}%20test%20drive%20appointment%20ke%20silsile%20me%20msg%20kar%20rahe%20hain.`}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  backgroundColor: '#dcfce7',
                                  color: '#15803d',
                                  padding: '0.35rem 0.65rem',
                                  borderRadius: '6px',
                                  fontSize: '0.75rem',
                                  fontWeight: 800,
                                  marginRight: '0.4rem',
                                  textDecoration: 'none'
                                }}
                              >
                                WhatsApp
                              </a>
                              <button 
                                onClick={() => handleDeleteTestDrive(td.id)}
                                style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', padding: '0.35rem 0.5rem', borderRadius: '6px', cursor: 'pointer' }}
                              >
                                <Trash2 size={13} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ------------ TAB 4: SELL / PURCHASE ENQUIRIES ------------ */}
              {activeTab === 'sellleads' && (
                <div>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                      Customer Sell & Valuation Enquiries ({sellLeads.length})
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      Customers dwara apni bike bechne ke liye bhara gaya inspection form
                    </p>
                  </div>

                  <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#f1f5f9', color: '#475569', fontWeight: 800, borderBottom: '1px solid #e2e8f0' }}>
                          <th style={{ padding: '0.75rem 1rem' }}>Seller Details</th>
                          <th style={{ padding: '0.75rem 1rem' }}>Vehicle Details</th>
                          <th style={{ padding: '0.75rem 1rem' }}>Estimated Resale</th>
                          <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                          <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sellLeads.map((sl) => (
                          <tr key={sl.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '0.75rem 1rem' }}>
                              <div style={{ fontWeight: 800, color: '#0f172a' }}>{sl.sellerName}</div>
                              <div style={{ fontSize: '0.78rem', color: '#1e40af', fontWeight: 700 }}>
                                📞 +91 {sl.sellerPhone}
                              </div>
                            </td>
                            <td style={{ padding: '0.75rem 1rem' }}>
                              <div style={{ fontWeight: 800, color: '#0f172a' }}>{sl.brand} {sl.modelName}</div>
                              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Year: {sl.year} • {sl.km} km • {sl.owner}</div>
                            </td>
                            <td style={{ padding: '0.75rem 1rem', fontWeight: 900, color: '#059669' }}>
                              {sl.estimatedPrice}
                            </td>
                            <td style={{ padding: '0.75rem 1rem' }}>
                              <select 
                                value={sl.status}
                                onChange={(e) => handleUpdateSellLeadStatus(sl.id, e.target.value)}
                                style={{
                                  padding: '0.25rem 0.5rem',
                                  borderRadius: '8px',
                                  fontSize: '0.75rem',
                                  fontWeight: 800,
                                  border: '1px solid #cbd5e1',
                                  backgroundColor: sl.status === 'Purchased' ? '#dcfce7' : sl.status === 'Offer Sent' ? '#dbeafe' : '#fef3c7',
                                  color: sl.status === 'Purchased' ? '#15803d' : sl.status === 'Offer Sent' ? '#1e40af' : '#b45309'
                                }}
                              >
                                <option value="New Lead">New Lead</option>
                                <option value="Inspection Scheduled">Inspection Scheduled</option>
                                <option value="Offer Sent">Offer Sent</option>
                                <option value="Purchased">Purchased</option>
                              </select>
                            </td>
                            <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                              <a
                                href={`tel:+91${sl.sellerPhone}`}
                                style={{
                                  backgroundColor: '#dbeafe',
                                  color: '#1e40af',
                                  padding: '0.35rem 0.65rem',
                                  borderRadius: '6px',
                                  fontSize: '0.75rem',
                                  fontWeight: 800,
                                  marginRight: '0.4rem',
                                  textDecoration: 'none'
                                }}
                              >
                                Call Seller
                              </a>
                              <button 
                                onClick={() => handleDeleteSellLead(sl.id)}
                                style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', padding: '0.35rem 0.5rem', borderRadius: '6px', cursor: 'pointer' }}
                              >
                                <Trash2 size={13} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ------------ TAB 5: SECURITY & CHANGE PASSWORD ------------ */}
              {activeTab === 'security' && (
                <div style={{ maxWidth: '500px' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.3rem' }}>
                    Owner Security & Password
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>
                    Rajkumar (Owner) account password update karein
                  </p>

                  {authSuccess && (
                    <div style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '0.65rem 0.85rem', borderRadius: '10px', fontSize: '0.82rem', marginBottom: '1rem', fontWeight: 700 }}>
                      {authSuccess}
                    </div>
                  )}

                  {authError && (
                    <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.65rem 0.85rem', borderRadius: '10px', fontSize: '0.82rem', marginBottom: '1rem', fontWeight: 700 }}>
                      {authError}
                    </div>
                  )}

                  <form onSubmit={handleChangePassword} style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#475569', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                        Owner Email ID
                      </label>
                      <input 
                        type="text" 
                        disabled 
                        value="rajkumar87036@gmail.com" 
                        style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#f1f5f9', fontWeight: 700, color: '#64748b' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#475569', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                        New Admin Password *
                      </label>
                      <input 
                        type="password" 
                        required
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#475569', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                        Confirm New Password *
                      </label>
                      <input 
                        type="password" 
                        required
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                      />
                    </div>

                    <button type="submit" className="btn-accent" style={{ padding: '0.75rem', marginTop: '0.5rem' }}>
                      <span>Update Owner Password</span>
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ----------------- ADD / EDIT BIKE INVENTORY MODAL ----------------- */}
        {showBikeForm && (
          <div className="modal-overlay" style={{ zIndex: 1100 }}>
            <div className="modal-content" style={{ maxWidth: '640px', padding: '1.5rem', borderRadius: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                  {editingBikeId ? 'Edit Vehicle Details' : 'Add New Vehicle Listing'}
                </h3>
                <button className="modal-close-btn" onClick={() => setShowBikeForm(false)}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveBike} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#475569', marginBottom: '0.3rem' }}>
                    Vehicle Title (e.g. Royal Enfield Classic 350) *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter full vehicle name"
                    value={bikeFormData.name}
                    onChange={(e) => setBikeFormData({...bikeFormData, name: e.target.value})}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#475569', marginBottom: '0.3rem' }}>
                      Brand *
                    </label>
                    <select 
                      value={bikeFormData.brand}
                      onChange={(e) => setBikeFormData({...bikeFormData, brand: e.target.value})}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    >
                      {BRANDS.filter(b => b !== 'All Brands').map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#475569', marginBottom: '0.3rem' }}>
                      Category / Riding Style
                    </label>
                    <select 
                      value={bikeFormData.category}
                      onChange={(e) => setBikeFormData({...bikeFormData, category: e.target.value})}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    >
                      <option value="Cruiser">Cruiser</option>
                      <option value="Scooter">Scooter</option>
                      <option value="Sports">Sports</option>
                      <option value="Commuter">Commuter</option>
                      <option value="Adventure">Adventure</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#475569', marginBottom: '0.3rem' }}>
                      Vehicle Type
                    </label>
                    <select 
                      value={bikeFormData.type}
                      onChange={(e) => setBikeFormData({...bikeFormData, type: e.target.value})}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    >
                      <option value="Bike">Bike</option>
                      <option value="Scooty">Scooty</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#475569', marginBottom: '0.3rem' }}>
                      Price (₹) *
                    </label>
                    <input 
                      type="number" 
                      required
                      placeholder="148000"
                      value={bikeFormData.price}
                      onChange={(e) => setBikeFormData({...bikeFormData, price: e.target.value})}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#475569', marginBottom: '0.3rem' }}>
                      Year
                    </label>
                    <input 
                      type="number" 
                      placeholder="2022"
                      value={bikeFormData.year}
                      onChange={(e) => setBikeFormData({...bikeFormData, year: e.target.value})}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#475569', marginBottom: '0.3rem' }}>
                      KM Driven
                    </label>
                    <input 
                      type="number" 
                      placeholder="12000"
                      value={bikeFormData.km}
                      onChange={(e) => setBikeFormData({...bikeFormData, km: e.target.value})}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#475569', marginBottom: '0.3rem' }}>
                      Engine (CC)
                    </label>
                    <input 
                      type="number" 
                      placeholder="350"
                      value={bikeFormData.cc}
                      onChange={(e) => setBikeFormData({...bikeFormData, cc: e.target.value})}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    />
                  </div>
                </div>

                {/* Photo URLs Upload */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#475569', marginBottom: '0.3rem' }}>
                    Vehicle Photos (Image URLs)
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input 
                      type="url"
                      placeholder="Paste Image URL (https://...)"
                      value={customImageUrl}
                      onChange={(e) => setCustomImageUrl(e.target.value)}
                      style={{ flexGrow: 1, padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                    />
                    <button 
                      type="button" 
                      onClick={handleAddImageUrl}
                      style={{ backgroundColor: '#1e40af', color: '#ffffff', border: 'none', padding: '0.6rem 0.85rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}
                    >
                      + Add Image
                    </button>
                  </div>

                  {/* Photo Thumbnails List */}
                  <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', padding: '0.3rem 0' }}>
                    {bikeFormData.images.map((imgUrl, idx) => (
                      <div key={idx} style={{ position: 'relative', width: '64px', height: '52px', flexShrink: 0 }}>
                        <img src={imgUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          style={{ position: 'absolute', top: '-4px', right: '-4px', backgroundColor: '#dc2626', color: '#ffffff', border: 'none', borderRadius: '50%', width: '18px', height: '18px', fontSize: '0.65rem', cursor: 'pointer', display: 'grid', placeItems: 'center' }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="submit" className="btn-accent" style={{ flex: 1, padding: '0.75rem' }}>
                    <span>{editingBikeId ? 'Update Vehicle' : 'Save & Publish to Website'}</span>
                  </button>
                  <button type="button" className="btn-secondary" onClick={() => setShowBikeForm(false)} style={{ padding: '0.75rem' }}>
                    Cancel
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
