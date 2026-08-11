import React, { useState, useEffect } from 'react';
import { 
  X, Lock, User, Key, Plus, Edit, Trash2, CheckCircle2, AlertCircle, 
  Search, Shield, Phone, Calendar, Clock, DollarSign, Bike, Eye, 
  TrendingUp, RefreshCw, Sparkles, Check, FileText, Image as ImageIcon,
  Sliders, MessageSquare, LogOut, ShieldCheck, MapPin, Gauge, Fuel, Zap, ArrowLeft, Upload
} from 'lucide-react';
import { BRANDS } from '../data/bikesData';
import { bikesAPI, testDrivesAPI, sellLeadsAPI, contactLeadsAPI, adminAuthAPI } from '../services/api';

export default function AdminPage({ 
  bikes = [], 
  onUpdateBikes,
  testDrives = [],
  onUpdateTestDrives,
  sellLeads = [],
  onUpdateSellLeads,
  contactLeads = [],
  onUpdateContactLeads,
  onNavigate
}) {
  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState('rajkumar87036@gmail.com');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Forgot Owner Password Reset State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotPhone, setForgotPhone] = useState('7480078779');
  const [forgotOtpSent, setForgotOtpSent] = useState(false);
  const [forgotGeneratedOtp, setForgotGeneratedOtp] = useState('');
  const [forgotUserOtp, setForgotUserOtp] = useState('');
  const [forgotNewPass, setForgotNewPass] = useState('');
  const [forgotConfirmPass, setForgotConfirmPass] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  const handleSendForgotOtp = (e) => {
    e.preventDefault();
    if (!forgotPhone || forgotPhone.length < 10) {
      setForgotError('10-digit mobile number enter karein.');
      return;
    }
    setForgotError('');
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setForgotGeneratedOtp(randomOtp);
    setForgotOtpSent(true);

    const text = encodeURIComponent(
      `Hello BIKE BAZAAR Owner! Your Owner Password Reset OTP for mobile +91 ${forgotPhone} is: ${randomOtp}`
    );
    window.open(`https://wa.me/917480078779?text=${text}`, '_blank');
  };

  const handleResetForgotSubmit = (e) => {
    e.preventDefault();
    if (forgotUserOtp !== forgotGeneratedOtp) {
      setForgotError('Galat OTP code. Kripya WhatsApp par aaya hua 4-digit code enter karein.');
      return;
    }
    if (!forgotNewPass || forgotNewPass.length < 5) {
      setForgotError('Naya password kam se kam 5 characters ka hona chahiye.');
      return;
    }
    if (forgotNewPass !== forgotConfirmPass) {
      setForgotError('Passwords match nahi kar rahe hain.');
      return;
    }

    localStorage.setItem('bike_bazaar_admin_password', forgotNewPass);
    setAdminPassword(forgotNewPass);
    setForgotSuccess('Owner Password successfully reset! Ab aap naye password se log in kar sakte hain.');
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotOtpSent(false);
      setForgotUserOtp('');
      setForgotNewPass('');
      setForgotConfirmPass('');
      setForgotSuccess('');
    }, 1500);
  };

  // Dashboard Active Tab: 'overview' | 'inventory' | 'testdrives' | 'sellleads' | 'security'
  const [activeTab, setActiveTab] = useState('overview');

  // Search filter inside tables
  const [tableSearch, setTableSearch] = useState('');

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
    year: '2023',
    km: '8500',
    owner: '1st Owner',
    cc: '350',
    mileage: '40 kmpl',
    fuelType: 'Petrol',
    power: '20.2 bhp @ 6100 rpm',
    transmission: '5-Speed Manual',
    brakes: 'Dual-Channel ABS',
    rto: 'BR-01 (Patna, Bihar)',
    insurance: 'Valid till 2027 (Zero Dep)',
    score: '98',
    location: 'Patna Main Showroom',
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
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Check persistent admin session on mount
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

  // Auto sync forms data from localStorage on mount & dashboard view
  useEffect(() => {
    try {
      const savedTestDrives = localStorage.getItem('bike_bazaar_testdrives_db');
      if (savedTestDrives && onUpdateTestDrives) {
        const parsed = JSON.parse(savedTestDrives);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const map = new Map();
          [...parsed, ...testDrives].forEach(i => i && i.id && map.set(i.id, i));
          const merged = Array.from(map.values());
          onUpdateTestDrives(merged);
        }
      }

      const savedSellLeads = localStorage.getItem('bike_bazaar_sell_leads_db');
      if (savedSellLeads && onUpdateSellLeads) {
        const parsed = JSON.parse(savedSellLeads);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const map = new Map();
          [...parsed, ...sellLeads].forEach(i => i && i.id && map.set(i.id, i));
          const merged = Array.from(map.values());
          onUpdateSellLeads(merged);
        }
      }

      const savedContactLeads = localStorage.getItem('bike_bazaar_contact_leads_db');
      if (savedContactLeads && onUpdateContactLeads) {
        const parsed = JSON.parse(savedContactLeads);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const map = new Map();
          [...parsed, ...contactLeads].forEach(i => i && i.id && map.set(i.id, i));
          const merged = Array.from(map.values());
          onUpdateContactLeads(merged);
        }
      }
    } catch (err) {
      console.error('Failed to sync leads in AdminPage', err);
    }
  }, []);

  const handleUpdateContactLeadStatus = (id, newStatus) => {
    contactLeadsAPI.updateStatus(id, newStatus);
    const updated = (contactLeads || []).map((c) => c.id === id ? { ...c, status: newStatus } : c);
    if (onUpdateContactLeads) onUpdateContactLeads(updated);
  };

  const handleDeleteContactLead = (id) => {
    if (window.confirm('Kya aap is customer message inquiry ko delete karna chahte hain?')) {
      contactLeadsAPI.delete(id);
      const updated = (contactLeads || []).filter((c) => c.id !== id);
      if (onUpdateContactLeads) onUpdateContactLeads(updated);
    }
  };

  // Get current active password (defaults to 'admin123' until changed)
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

    const currentValidPassword = getStoredPassword();

    if (adminEmail.trim().toLowerCase() === 'rajkumar87036@gmail.com' && adminPassword === currentValidPassword) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('bike_bazaar_admin_session', 'true');
      setAuthSuccess('Welcome Rajkumar! Owner Access Granted.');
    } else {
      setAuthError('Galat Email ya Password. Kripya sahi credentials enter karein.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('bike_bazaar_admin_session');
  };

  // Change Admin Password (Strictly updates stored password)
  const handleChangePassword = (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    const currentValidPassword = getStoredPassword();

    if (oldPassword !== currentValidPassword) {
      setAuthError('Purana (Current) Password galat hai. Kripya sahi password enter karein.');
      return;
    }

    if (!newPassword || newPassword.length < 5) {
      setAuthError('Naya password kam se kam 5 characters ka hona chahiye.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setAuthError('Naya password aur confirm password match nahi kar rahe hain.');
      return;
    }

    // Save new password and completely overwrite
    localStorage.setItem('bike_bazaar_admin_password', newPassword);
    setAuthSuccess('Owner Password successfully updated! Ab purana password kaam nahi karega.');
    setOldPassword('');
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
      mileage: bike.specs?.mileage || '40 kmpl',
      fuelType: bike.specs?.fuelType || 'Petrol',
      power: bike.specs?.power || '20 bhp',
      transmission: bike.specs?.transmission || 'Manual',
      brakes: bike.specs?.brakes || 'Dual-Channel ABS',
      rto: bike.specs?.rto || 'BR-01 (Patna)',
      insurance: bike.specs?.insurance || 'Valid 2027',
      score: bike.score || '95',
      location: bike.location || 'Patna Main Showroom',
      isFeatured: bike.isFeatured !== false,
      status: bike.status || 'Available',
      images: bike.images && bike.images.length > 0 ? bike.images : [initialBikeForm.images[0]]
    });
    setShowBikeForm(true);
  };

  // Save Vehicle Form Submission (Add / Edit)
  const handleSaveBike = (e) => {
    e.preventDefault();
    
    let updatedBikes = [];
    if (editingBikeId) {
      const targetBike = bikes.find(b => b.id === editingBikeId);
      const updatedBike = {
        ...targetBike,
        name: bikeFormData.name,
        brand: bikeFormData.brand,
        model: bikeFormData.brand + ' ' + bikeFormData.name,
        price: Number(bikeFormData.price),
        originalPrice: Number(bikeFormData.originalPrice),
        year: Number(bikeFormData.year),
        km: Number(bikeFormData.km),
        owner: bikeFormData.owner,
        cc: String(bikeFormData.cc),
        score: Number(bikeFormData.score),
        location: bikeFormData.location,
        isFeatured: bikeFormData.isFeatured,
        status: bikeFormData.status,
        images: bikeFormData.images,
        specs: {
          mileage: bikeFormData.mileage,
          fuelType: bikeFormData.fuelType,
          power: bikeFormData.power,
          transmission: bikeFormData.transmission,
          brakes: bikeFormData.brakes,
          rto: bikeFormData.rto,
          insurance: bikeFormData.insurance
        }
      };
      bikesAPI.update(updatedBike);
      updatedBikes = bikes.map((b) => b.id === editingBikeId ? updatedBike : b);
    } else {
      const newBike = {
        id: `bike-${Date.now()}`,
        name: bikeFormData.name,
        brand: bikeFormData.brand,
        model: bikeFormData.brand + ' ' + bikeFormData.name,
        price: Number(bikeFormData.price),
        originalPrice: Number(bikeFormData.originalPrice) || Math.round(Number(bikeFormData.price) * 1.15),
        year: Number(bikeFormData.year),
        km: Number(bikeFormData.km),
        owner: bikeFormData.owner,
        cc: String(bikeFormData.cc),
        score: Number(bikeFormData.score),
        location: bikeFormData.location,
        isFeatured: bikeFormData.isFeatured,
        status: bikeFormData.status,
        images: bikeFormData.images.length > 0 ? bikeFormData.images : [initialBikeForm.images[0]],
        badges: ['Certified', '6 M Warranty', 'Patna Stock'],
        specs: {
          mileage: bikeFormData.mileage,
          fuelType: bikeFormData.fuelType,
          power: bikeFormData.power,
          transmission: bikeFormData.transmission,
          brakes: bikeFormData.brakes,
          rto: bikeFormData.rto,
          insurance: bikeFormData.insurance
        }
      };
      bikesAPI.add(newBike);
      updatedBikes = [newBike, ...bikes];
    }

    onUpdateBikes(updatedBikes);
    setShowBikeForm(false);
  };

  // Delete Bike Listing
  const handleDeleteBike = (bikeId) => {
    if (window.confirm('Kya aap sach me is vehicle ko website inventory se delete karna chahte hain?')) {
      bikesAPI.delete(bikeId);
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

  // File Upload Reader Simulation (Converts photo to data URL)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBikeFormData((prev) => ({
          ...prev,
          images: [...prev.images, reader.result]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    const newImgs = [...bikeFormData.images];
    newImgs.splice(index, 1);
    setBikeFormData({ ...bikeFormData, images: newImgs });
  };

  // Status Updaters
  const handleUpdateTestDriveStatus = (id, newStatus) => {
    testDrivesAPI.updateStatus(id, newStatus);
    const updated = testDrives.map((td) => td.id === id ? { ...td, status: newStatus } : td);
    onUpdateTestDrives(updated);
  };

  const handleDeleteTestDrive = (id) => {
    testDrivesAPI.delete(id);
    const updated = testDrives.filter((td) => td.id !== id);
    onUpdateTestDrives(updated);
  };

  const handleUpdateSellLeadStatus = (id, newStatus) => {
    sellLeadsAPI.updateStatus(id, newStatus);
    const updated = sellLeads.map((sl) => sl.id === id ? { ...sl, status: newStatus } : sl);
    onUpdateSellLeads(updated);
  };

  const handleDeleteSellLead = (id) => {
    sellLeadsAPI.delete(id);
    const updated = sellLeads.filter((sl) => sl.id !== id);
    onUpdateSellLeads(updated);
  };

  const totalInventoryValue = bikes.reduce((acc, b) => acc + (b.price || 0), 0);

  // Filtered lists for table search
  const filteredBikesList = bikes.filter((b) => 
    b.name.toLowerCase().includes(tableSearch.toLowerCase()) || 
    b.brand.toLowerCase().includes(tableSearch.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#090d16', minHeight: '100vh', color: '#f8fafc' }}>
      
      {/* ---------------- LOGIN VIEW FOR OWNER ---------------- */}
      {!isAdminLoggedIn ? (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          background: 'radial-gradient(circle at top, #1e293b 0%, #090d16 100%)'
        }}>
          <div style={{
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '24px',
            padding: '2.5rem 2rem',
            maxWidth: '440px',
            width: '100%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                backgroundColor: '#1e40af',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                fontSize: '1.8rem',
                boxShadow: '0 10px 20px rgba(30, 64, 175, 0.4)'
              }}>
                👑
              </div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
                Bike Bazaar Owner Portal
              </h1>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.35rem' }}>
                Enter owner login credentials to manage inventory & leads
              </p>
            </div>

            {authError && (
              <div style={{
                backgroundColor: '#7f1d1d',
                color: '#fecaca',
                padding: '0.75rem',
                borderRadius: '10px',
                fontSize: '0.82rem',
                marginBottom: '1.25rem',
                fontWeight: 700,
                border: '1px solid #991b1b'
              }}>
                {authError}
              </div>
            )}

            <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Owner Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input 
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.75rem 0.75rem 2.6rem',
                      borderRadius: '12px',
                      border: '1px solid #334155',
                      backgroundColor: '#1e293b',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      fontWeight: 700
                    }}
                  />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotModal(true);
                      setAuthError('');
                      setAuthSuccess('');
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#38bdf8',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input 
                    type="password"
                    required
                    placeholder="Enter password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.75rem 0.75rem 2.6rem',
                      borderRadius: '12px',
                      border: '1px solid #334155',
                      backgroundColor: '#1e293b',
                      color: '#ffffff',
                      fontSize: '0.92rem'
                    }}
                    autoFocus
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '0.85rem', fontSize: '0.95rem', marginTop: '0.5rem', borderRadius: '12px' }}>
                <span>Login to Owner Control Center</span>
              </button>

              <button 
                type="button" 
                onClick={() => onNavigate('home')}
                style={{
                  backgroundColor: 'transparent',
                  color: '#94a3b8',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <ArrowLeft size={14} />
                <span>Return to Main Website</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* ---------------- FULL-PAGE STANDALONE DASHBOARD ---------------- */
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#090d16' }}>
          
          {/* Top Header Mobile Control Bar (Visible on mobile screens) */}
          <div className="admin-mobile-bar" style={{
            backgroundColor: '#0f172a',
            borderBottom: '1px solid #1e293b',
            padding: '0.85rem 1rem',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 110
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#1e40af', display: 'grid', placeItems: 'center', color: '#ffffff', fontWeight: 900 }}>👑</div>
              <div>
                <div style={{ fontWeight: 900, color: '#ffffff', fontSize: '0.95rem' }}>BIKE BAZAAR</div>
                <div style={{ fontSize: '0.6rem', color: '#38bdf8', fontWeight: 800 }}>OWNER PORTAL</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                style={{
                  backgroundColor: '#1e293b',
                  color: '#ffffff',
                  border: '1px solid #334155',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                {mobileNavOpen ? <X size={16} /> : <Sliders size={16} />}
                <span>Menu</span>
              </button>
              <button 
                onClick={() => onNavigate('home')} 
                style={{ backgroundColor: '#1e40af', color: '#ffffff', border: 'none', padding: '0.4rem 0.65rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 800 }}
              >
                Exit
              </button>
            </div>
          </div>

          {/* Mobile Drawer Dropdown Menu */}
          {mobileNavOpen && (
            <div style={{
              backgroundColor: '#0f172a',
              borderBottom: '1px solid #1e293b',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              zIndex: 105
            }}>
              <button onClick={() => { setActiveTab('overview'); setMobileNavOpen(false); }} style={{ backgroundColor: activeTab === 'overview' ? '#1e40af' : '#1e293b', color: '#ffffff', padding: '0.65rem 0.85rem', borderRadius: '8px', fontWeight: 800, border: 'none', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={16} /> Overview Stats
              </button>
              <button onClick={() => { setActiveTab('inventory'); setMobileNavOpen(false); }} style={{ backgroundColor: activeTab === 'inventory' ? '#1e40af' : '#1e293b', color: '#ffffff', padding: '0.65rem 0.85rem', borderRadius: '8px', fontWeight: 800, border: 'none', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bike size={16} /> Manage Vehicles ({bikes.length})
              </button>
              <button onClick={() => { setActiveTab('testdrives'); setMobileNavOpen(false); }} style={{ backgroundColor: activeTab === 'testdrives' ? '#1e40af' : '#1e293b', color: '#ffffff', padding: '0.65rem 0.85rem', borderRadius: '8px', fontWeight: 800, border: 'none', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={16} /> Test Drives ({testDrives.length})
              </button>
              <button onClick={() => { setActiveTab('sellleads'); setMobileNavOpen(false); }} style={{ backgroundColor: activeTab === 'sellleads' ? '#1e40af' : '#1e293b', color: '#ffffff', padding: '0.65rem 0.85rem', borderRadius: '8px', fontWeight: 800, border: 'none', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={16} /> Sell Enquiries ({sellLeads.length})
              </button>
              <button onClick={() => { setActiveTab('contactleads'); setMobileNavOpen(false); }} style={{ backgroundColor: activeTab === 'contactleads' ? '#1e40af' : '#1e293b', color: '#ffffff', padding: '0.65rem 0.85rem', borderRadius: '8px', fontWeight: 800, border: 'none', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare size={16} /> Customer Messages ({(contactLeads || []).length})
              </button>
              <button onClick={() => { setActiveTab('security'); setMobileNavOpen(false); }} style={{ backgroundColor: activeTab === 'security' ? '#1e40af' : '#1e293b', color: '#ffffff', padding: '0.65rem 0.85rem', borderRadius: '8px', fontWeight: 800, border: 'none', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Key size={16} /> Security & Password
              </button>
            </div>
          )}

          <div style={{ display: 'flex', flexGrow: 1 }}>
            {/* Left Dark Enterprise Sidebar (Desktop only) */}
            <div className="admin-desktop-sidebar" style={{
              width: '250px',
              backgroundColor: '#0f172a',
              borderRight: '1px solid #1e293b',
              flexDirection: 'column',
              padding: '1.25rem 0.85rem',
              flexShrink: 0
            }}>
              {/* Logo Brand Header */}
              <div 
                onClick={() => onNavigate('home')} 
                style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '2rem', cursor: 'pointer', padding: '0 0.5rem' }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                  👑
                </div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
                    BIKE BAZAAR
                  </div>
                  <div style={{ fontSize: '0.62rem', color: '#38bdf8', fontWeight: 800, letterSpacing: '0.1em' }}>
                    OWNER DASHBOARD
                  </div>
                </div>
              </div>

              {/* Nav Menu */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <button
                  onClick={() => setActiveTab('overview')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 0.9rem',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    backgroundColor: activeTab === 'overview' ? '#1e40af' : 'transparent',
                    color: activeTab === 'overview' ? '#ffffff' : '#94a3b8',
                    textAlign: 'left'
                  }}
                >
                  <TrendingUp size={18} />
                  <span>Overview Stats</span>
                </button>

                <button
                  onClick={() => setActiveTab('inventory')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 0.9rem',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    backgroundColor: activeTab === 'inventory' ? '#1e40af' : 'transparent',
                    color: activeTab === 'inventory' ? '#ffffff' : '#94a3b8',
                    textAlign: 'left'
                  }}
                >
                  <Bike size={18} />
                  <span>Manage Vehicles ({bikes.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('testdrives')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 0.9rem',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    backgroundColor: activeTab === 'testdrives' ? '#1e40af' : 'transparent',
                    color: activeTab === 'testdrives' ? '#ffffff' : '#94a3b8',
                    textAlign: 'left'
                  }}
                >
                  <Calendar size={18} />
                  <span>Test Drives ({testDrives.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('sellleads')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 0.9rem',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    backgroundColor: activeTab === 'sellleads' ? '#1e40af' : 'transparent',
                    color: activeTab === 'sellleads' ? '#ffffff' : '#94a3b8',
                    textAlign: 'left'
                  }}
                >
                  <FileText size={18} />
                  <span>Sell Enquiries ({sellLeads.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('contactleads')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 0.9rem',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    backgroundColor: activeTab === 'contactleads' ? '#1e40af' : 'transparent',
                    color: activeTab === 'contactleads' ? '#ffffff' : '#94a3b8',
                    textAlign: 'left'
                  }}
                >
                  <MessageSquare size={18} />
                  <span>Customer Messages ({(contactLeads || []).length})</span>
                </button>

              <button
                onClick={() => setActiveTab('security')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 0.9rem',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'security' ? '#1e40af' : 'transparent',
                  color: activeTab === 'security' ? '#ffffff' : '#94a3b8',
                  textAlign: 'left',
                  marginTop: '1rem'
                }}
              >
                <Key size={18} />
                <span>Security & Password</span>
              </button>
            </div>

            {/* Bottom Admin User Badge */}
            <div style={{
              marginTop: 'auto',
              paddingTop: '1rem',
              borderTop: '1px solid #1e293b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffffff' }}>Rajkumar (Owner)</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>rajkumar87036@gmail.com</div>
              </div>
              <button 
                onClick={handleAdminLogout} 
                title="Logout Admin"
                style={{ backgroundColor: '#1e293b', color: '#ef4444', border: 'none', padding: '0.4rem', borderRadius: '8px', cursor: 'pointer' }}
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>

          {/* Right Main Content Panel */}
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#090d16', overflowX: 'hidden' }}>
            
            {/* Top Workspace Navbar */}
            <div className="admin-top-workspace-bar" style={{
              height: '64px',
              backgroundColor: '#0f172a',
              borderBottom: '1px solid #1e293b',
              padding: '0 1.75rem',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  PATNA SHOWROOM CONTROL CENTER
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button 
                  className="btn-accent"
                  onClick={openAddBikeForm}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                  <Plus size={16} />
                  <span>Add New Vehicle Listing</span>
                </button>

                <button 
                  onClick={() => onNavigate('home')}
                  style={{
                    backgroundColor: '#1e293b',
                    color: '#f8fafc',
                    border: '1px solid #334155',
                    padding: '0.5rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <Eye size={14} />
                  <span>View Website</span>
                </button>
              </div>
            </div>

            {/* Dashboard Content Container */}
            <div className="admin-content-container" style={{ flexGrow: 1, overflowY: 'auto' }}>
              
              {/* ----------------- TAB 1: OVERVIEW METRICS ----------------- */}
              {activeTab === 'overview' && (
                <div>
                  <div style={{ marginBottom: '1.75rem' }}>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
                      Showroom Analytics & Dashboard
                    </h1>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                      Live metrics for Bike Bazaar Patna Showroom
                    </p>
                  </div>

                  {/* 5 Summary Stat Cards */}
                  <div className="admin-stat-grid">
                    <div style={{ backgroundColor: '#0f172a', padding: '1.25rem', borderRadius: '18px', border: '1px solid #1e293b', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Total Stock Value</div>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#1e3a8a', color: '#38bdf8', display: 'grid', placeItems: 'center' }}>💰</div>
                      </div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#38bdf8', margin: '0.4rem 0' }}>
                        ₹{totalInventoryValue.toLocaleString('en-IN')}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700 }}>
                        {bikes.length} Vehicles Listed Live
                      </div>
                    </div>

                    <div style={{ backgroundColor: '#0f172a', padding: '1.25rem', borderRadius: '18px', border: '1px solid #1e293b', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Test Drive Bookings</div>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#78350f', color: '#f59e0b', display: 'grid', placeItems: 'center' }}>📅</div>
                      </div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#f59e0b', margin: '0.4rem 0' }}>
                        {testDrives.length} Bookings
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#fbbf24', fontWeight: 700 }}>
                        {testDrives.filter(t => t.status === 'Pending').length} Pending Slots
                      </div>
                    </div>

                    <div style={{ backgroundColor: '#0f172a', padding: '1.25rem', borderRadius: '18px', border: '1px solid #1e293b', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Sell / Resale Leads</div>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#7f1d1d', color: '#ef4444', display: 'grid', placeItems: 'center' }}>🏷️</div>
                      </div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ef4444', margin: '0.4rem 0' }}>
                        {sellLeads.length} Leads
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#60a5fa', fontWeight: 700 }}>
                        Valuation Form Submitted
                      </div>
                    </div>

                    <div style={{ backgroundColor: '#0f172a', padding: '1.25rem', borderRadius: '18px', border: '1px solid #1e293b', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Customer Messages</div>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#064e3b', color: '#10b981', display: 'grid', placeItems: 'center' }}>💬</div>
                      </div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#10b981', margin: '0.4rem 0' }}>
                        {(contactLeads || []).length} Messages
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#a7f3d0', fontWeight: 700 }}>
                        Contact Us Queries
                      </div>
                    </div>

                    <div style={{ backgroundColor: '#0f172a', padding: '1.25rem', borderRadius: '18px', border: '1px solid #1e293b', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Quality Check</div>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#4c1d95', color: '#a78bfa', display: 'grid', placeItems: 'center' }}>🏆</div>
                      </div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#a78bfa', margin: '0.4rem 0' }}>
                        100+ Points
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#ddd6fe', fontWeight: 700 }}>
                        6 M Warranty Store
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity Feed */}
                  <div style={{ backgroundColor: '#0f172a', borderRadius: '20px', border: '1px solid #1e293b', padding: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>⚡ Recent Customer Inquiries Stream</h3>
                      <button onClick={() => setActiveTab('contactleads')} style={{ backgroundColor: '#1e293b', color: '#38bdf8', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}>
                        View All Messages &rarr;
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {(contactLeads || []).slice(0, 4).map((msg) => (
                        <div key={msg.id} style={{ backgroundColor: '#1e293b', padding: '0.85rem 1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <div>
                            <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '0.9rem' }}>💬 {msg.name} ({msg.subject})</div>
                            <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.2rem' }}>"{msg.message}"</div>
                            <div style={{ fontSize: '0.72rem', color: '#38bdf8', marginTop: '0.2rem' }}>📞 +91 {msg.phone} • {msg.submittedAt}</div>
                          </div>
                          <a href={`tel:+91${msg.phone}`} style={{ backgroundColor: '#1e40af', color: '#ffffff', padding: '0.35rem 0.75rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 800, textDecoration: 'none' }}>
                            Call Customer
                          </a>
                        </div>
                      ))}
                      {(contactLeads || []).length === 0 && (
                        <div style={{ color: '#64748b', fontSize: '0.85rem', textAlign: 'center', padding: '1rem' }}>No recent customer messages yet. Submit a query on Contact Us page to test!</div>
                      )}
                    </div>
                  </div>

                  {/* Add New Listing Banner */}
                  <div style={{
                    backgroundColor: '#1e293b',
                    padding: '2rem',
                    borderRadius: '20px',
                    border: '1px solid #334155',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                    flexWrap: 'wrap'
                  }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                        Nayi Bike/Scooty Website par Post Karein
                      </h3>
                      <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '0.3rem' }}>
                        Complete photos, price, engine CC, owner, and specs fill karke website pe live karein.
                      </p>
                    </div>

                    <button onClick={openAddBikeForm} className="btn-accent" style={{ padding: '0.75rem 1.5rem' }}>
                      <Plus size={18} />
                      <span>+ Add Vehicle Listing Now</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ----------------- TAB 2: MANAGE VEHICLES INVENTORY ----------------- */}
              {activeTab === 'inventory' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
                        Vehicles Inventory ({bikes.length})
                      </h1>
                      <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                        Website par dikh rahe sabhi bikes & scooties manage karein
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                        <input 
                          type="text"
                          placeholder="Search title/brand..."
                          value={tableSearch}
                          onChange={(e) => setTableSearch(e.target.value)}
                          style={{
                            padding: '0.55rem 0.75rem 0.55rem 2.4rem',
                            borderRadius: '10px',
                            border: '1px solid #334155',
                            backgroundColor: '#0f172a',
                            color: '#ffffff',
                            fontSize: '0.85rem'
                          }}
                        />
                      </div>

                      <button onClick={openAddBikeForm} className="btn-accent" style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}>
                        <Plus size={16} />
                        <span>+ Add New Vehicle</span>
                      </button>
                    </div>
                  </div>

                  {/* Vehicles Table */}
                  <div style={{ backgroundColor: '#0f172a', borderRadius: '20px', border: '1px solid #1e293b', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#1e293b', color: '#94a3b8', fontWeight: 800, borderBottom: '1px solid #334155' }}>
                          <th style={{ padding: '1rem' }}>Vehicle</th>
                          <th style={{ padding: '1rem' }}>Brand & Category</th>
                          <th style={{ padding: '1rem' }}>Price (₹)</th>
                          <th style={{ padding: '1rem' }}>Year / KM</th>
                          <th style={{ padding: '1rem' }}>Specs</th>
                          <th style={{ padding: '1rem' }}>Status</th>
                          <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBikesList.map((bike) => (
                          <tr key={bike.id} style={{ borderBottom: '1px solid #1e293b' }}>
                            <td style={{ padding: '1rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                                <img 
                                  src={bike.images && bike.images[0] ? bike.images[0] : initialBikeForm.images[0]} 
                                  alt={bike.name} 
                                  style={{ width: '64px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #334155' }} 
                                />
                                <div>
                                  <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '0.95rem' }}>{bike.name}</div>
                                  <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700 }}>{bike.owner} • {bike.score || '96'}/100 Certified</div>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: '1rem' }}>
                              <span style={{ fontWeight: 800, color: '#ffffff' }}>{bike.brand}</span>
                              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{bike.category} ({bike.type})</div>
                            </td>
                            <td style={{ padding: '1rem', fontWeight: 900, color: '#38bdf8', fontSize: '1.05rem' }}>
                              ₹{bike.price?.toLocaleString('en-IN')}
                            </td>
                            <td style={{ padding: '1rem', color: '#cbd5e1' }}>
                              {bike.year} • {bike.km?.toLocaleString('en-IN')} km
                            </td>
                            <td style={{ padding: '1rem', fontSize: '0.78rem', color: '#94a3b8' }}>
                              <div>{bike.cc} cc • {bike.specs?.mileage || '40 kmpl'}</div>
                              <div style={{ color: '#64748b' }}>{bike.specs?.brakes || 'ABS'}</div>
                            </td>
                            <td style={{ padding: '1rem' }}>
                              <span style={{
                                backgroundColor: bike.status === 'Sold Out' ? '#7f1d1d' : '#065f46',
                                color: bike.status === 'Sold Out' ? '#fecaca' : '#a7f3d0',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '12px',
                                fontSize: '0.75rem',
                                fontWeight: 800
                              }}>
                                {bike.status || 'Available'}
                              </span>
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                                <button 
                                  onClick={() => openEditBikeForm(bike)}
                                  style={{
                                    backgroundColor: '#1e293b',
                                    color: '#60a5fa',
                                    border: '1px solid #3b82f6',
                                    padding: '0.4rem 0.75rem',
                                    borderRadius: '8px',
                                    fontSize: '0.78rem',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.3rem'
                                  }}
                                >
                                  <Edit size={14} />
                                  <span>Edit</span>
                                </button>

                                <button 
                                  onClick={() => handleDeleteBike(bike.id)}
                                  style={{
                                    backgroundColor: '#450a0a',
                                    color: '#f87171',
                                    border: '1px solid #ef4444',
                                    padding: '0.4rem 0.75rem',
                                    borderRadius: '8px',
                                    fontSize: '0.78rem',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.3rem'
                                  }}
                                >
                                  <Trash2 size={14} />
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

              {/* ----------------- TAB 3: TEST DRIVE APPOINTMENTS ----------------- */}
              {activeTab === 'testdrives' && (
                <div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
                      Customer Test Drive Appointments ({testDrives.length})
                    </h1>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                      Website users dwara book kiye gaye test drive requests
                    </p>
                  </div>

                  <div style={{ backgroundColor: '#0f172a', borderRadius: '20px', border: '1px solid #1e293b', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#1e293b', color: '#94a3b8', fontWeight: 800, borderBottom: '1px solid #334155' }}>
                          <th style={{ padding: '1rem' }}>Customer Name & Phone</th>
                          <th style={{ padding: '1rem' }}>Requested Vehicle</th>
                          <th style={{ padding: '1rem' }}>Date & Slot</th>
                          <th style={{ padding: '1rem' }}>Status</th>
                          <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {testDrives.map((td) => (
                          <tr key={td.id} style={{ borderBottom: '1px solid #1e293b' }}>
                            <td style={{ padding: '1rem' }}>
                              <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '0.95rem' }}>{td.name}</div>
                              <div style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: 800 }}>
                                📞 +91 {td.phone}
                              </div>
                            </td>
                            <td style={{ padding: '1rem', fontWeight: 800, color: '#ffffff' }}>
                              {td.bikeName}
                            </td>
                            <td style={{ padding: '1rem', color: '#cbd5e1' }}>
                              {td.date} at <strong>{td.time}</strong>
                            </td>
                            <td style={{ padding: '1rem' }}>
                              <select 
                                value={td.status}
                                onChange={(e) => handleUpdateTestDriveStatus(td.id, e.target.value)}
                                style={{
                                  padding: '0.35rem 0.65rem',
                                  borderRadius: '8px',
                                  fontSize: '0.78rem',
                                  fontWeight: 800,
                                  border: '1px solid #334155',
                                  backgroundColor: td.status === 'Confirmed' ? '#065f46' : td.status === 'Completed' ? '#1e40af' : '#78350f',
                                  color: '#ffffff'
                                }}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                              <a
                                href={`https://wa.me/91${td.phone}?text=Hello%20${td.name},%20Bike%20Bazaar%20Patna%20se%20aapke%20${td.bikeName}%20test%20drive%20appointment%20ke%20silsile%20me%20msg%20kar%20rahe%20hain.`}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  backgroundColor: '#065f46',
                                  color: '#ffffff',
                                  padding: '0.4rem 0.75rem',
                                  borderRadius: '8px',
                                  fontSize: '0.78rem',
                                  fontWeight: 800,
                                  marginRight: '0.5rem',
                                  textDecoration: 'none'
                                }}
                              >
                                WhatsApp Msg
                              </a>
                              <button 
                                onClick={() => handleDeleteTestDrive(td.id)}
                                style={{ backgroundColor: '#450a0a', color: '#ef4444', border: 'none', padding: '0.4rem 0.6rem', borderRadius: '8px', cursor: 'pointer' }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ----------------- TAB 4: SELL / PURCHASE LEADS ----------------- */}
              {activeTab === 'sellleads' && (
                <div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
                      Customer Sell & Resale Enquiries ({sellLeads.length})
                    </h1>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                      Customers dwara apni purani bike bechne ke liye bhara gaya valuation form
                    </p>
                  </div>

                  <div style={{ backgroundColor: '#0f172a', borderRadius: '20px', border: '1px solid #1e293b', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#1e293b', color: '#94a3b8', fontWeight: 800, borderBottom: '1px solid #334155' }}>
                          <th style={{ padding: '1rem' }}>Seller Details</th>
                          <th style={{ padding: '1rem' }}>Vehicle Details</th>
                          <th style={{ padding: '1rem' }}>Estimated Resale Value</th>
                          <th style={{ padding: '1rem' }}>Status</th>
                          <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sellLeads.map((sl) => (
                          <tr key={sl.id} style={{ borderBottom: '1px solid #1e293b' }}>
                            <td style={{ padding: '1rem' }}>
                              <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '0.95rem' }}>{sl.sellerName}</div>
                              <div style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: 800 }}>
                                📞 +91 {sl.sellerPhone}
                              </div>
                            </td>
                            <td style={{ padding: '1rem' }}>
                              <div style={{ fontWeight: 800, color: '#ffffff' }}>{sl.brand} {sl.modelName}</div>
                              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Year: {sl.year} • {sl.km} km • {sl.owner}</div>
                            </td>
                            <td style={{ padding: '1rem', fontWeight: 900, color: '#10b981', fontSize: '1rem' }}>
                              {sl.estimatedPrice}
                            </td>
                            <td style={{ padding: '1rem' }}>
                              <select 
                                value={sl.status}
                                onChange={(e) => handleUpdateSellLeadStatus(sl.id, e.target.value)}
                                style={{
                                  padding: '0.35rem 0.65rem',
                                  borderRadius: '8px',
                                  fontSize: '0.78rem',
                                  fontWeight: 800,
                                  border: '1px solid #334155',
                                  backgroundColor: sl.status === 'Purchased' ? '#065f46' : sl.status === 'Offer Sent' ? '#1e40af' : '#78350f',
                                  color: '#ffffff'
                                }}
                              >
                                <option value="New Lead">New Lead</option>
                                <option value="Inspection Scheduled">Inspection Scheduled</option>
                                <option value="Offer Sent">Offer Sent</option>
                                <option value="Purchased">Purchased</option>
                              </select>
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                              <a
                                href={`tel:+91${sl.sellerPhone}`}
                                style={{
                                  backgroundColor: '#1e40af',
                                  color: '#ffffff',
                                  padding: '0.4rem 0.75rem',
                                  borderRadius: '8px',
                                  fontSize: '0.78rem',
                                  fontWeight: 800,
                                  marginRight: '0.5rem',
                                  textDecoration: 'none'
                                }}
                              >
                                Call Seller
                              </a>
                              <button 
                                onClick={() => handleDeleteSellLead(sl.id)}
                                style={{ backgroundColor: '#450a0a', color: '#ef4444', border: 'none', padding: '0.4rem 0.6rem', borderRadius: '8px', cursor: 'pointer' }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ----------------- TAB 5: CUSTOMER MESSAGES & CONTACT LEADS ----------------- */}
              {activeTab === 'contactleads' && (
                <div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
                      Customer Messages & Support Enquiries ({(contactLeads || []).length})
                    </h1>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                      Contact Us form aur website queries dwara aaye huye sabhi customer messages
                    </p>
                  </div>

                  <div style={{ backgroundColor: '#0f172a', borderRadius: '20px', border: '1px solid #1e293b', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem', minWidth: '680px' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#1e293b', color: '#94a3b8', fontWeight: 800, borderBottom: '1px solid #334155' }}>
                          <th style={{ padding: '1rem' }}>Customer Details</th>
                          <th style={{ padding: '1rem' }}>Subject & Topic</th>
                          <th style={{ padding: '1rem' }}>Message Content</th>
                          <th style={{ padding: '1rem' }}>Date Received</th>
                          <th style={{ padding: '1rem' }}>Status</th>
                          <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(contactLeads || []).map((cl) => (
                          <tr key={cl.id} style={{ borderBottom: '1px solid #1e293b' }}>
                            <td style={{ padding: '1rem' }}>
                              <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '0.95rem' }}>{cl.name}</div>
                              <div style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: 800 }}>
                                📞 +91 {cl.phone}
                              </div>
                            </td>
                            <td style={{ padding: '1rem', fontWeight: 800, color: '#fbbf24' }}>
                              {cl.subject || 'General Inquiry'}
                            </td>
                            <td style={{ padding: '1rem', color: '#cbd5e1', maxWidth: '280px' }}>
                              {cl.message}
                            </td>
                            <td style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.78rem' }}>
                              {cl.submittedAt || 'Today'}
                            </td>
                            <td style={{ padding: '1rem' }}>
                              <select 
                                value={cl.status || 'New Inquiry'}
                                onChange={(e) => handleUpdateContactLeadStatus(cl.id, e.target.value)}
                                style={{
                                  padding: '0.35rem 0.65rem',
                                  borderRadius: '8px',
                                  fontSize: '0.78rem',
                                  fontWeight: 800,
                                  border: '1px solid #334155',
                                  backgroundColor: cl.status === 'Resolved' ? '#065f46' : cl.status === 'Contacted' ? '#1e40af' : '#78350f',
                                  color: '#ffffff'
                                }}
                              >
                                <option value="New Inquiry">New Inquiry</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Resolved">Resolved</option>
                              </select>
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                              <a
                                href={`tel:+91${cl.phone}`}
                                style={{
                                  backgroundColor: '#1e40af',
                                  color: '#ffffff',
                                  padding: '0.4rem 0.75rem',
                                  borderRadius: '8px',
                                  fontSize: '0.78rem',
                                  fontWeight: 800,
                                  marginRight: '0.4rem',
                                  textDecoration: 'none'
                                }}
                              >
                                Call Customer
                              </a>
                              <a
                                href={`https://wa.me/91${cl.phone}?text=Hello%20${cl.name},%20Bike%20Bazaar%20Patna%20se%20aapke%20msg%20inquiry%20ke%20silsile%20me%20contact%20kar%20rahe%20hain.`}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  backgroundColor: '#065f46',
                                  color: '#ffffff',
                                  padding: '0.4rem 0.75rem',
                                  borderRadius: '8px',
                                  fontSize: '0.78rem',
                                  fontWeight: 800,
                                  marginRight: '0.4rem',
                                  textDecoration: 'none'
                                }}
                              >
                                WhatsApp
                              </a>
                              <button 
                                onClick={() => handleDeleteContactLead(cl.id)}
                                style={{ backgroundColor: '#450a0a', color: '#ef4444', border: 'none', padding: '0.4rem 0.6rem', borderRadius: '8px', cursor: 'pointer' }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ----------------- TAB 6: SECURITY & CHANGE PASSWORD ----------------- */}
              {activeTab === 'security' && (
                <div style={{ maxWidth: '520px' }}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
                      Owner Security & Password Control
                    </h1>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                      Rajkumar (Owner) account ka password secure tarike se update karein
                    </p>
                  </div>

                  {authSuccess && (
                    <div style={{ backgroundColor: '#065f46', color: '#a7f3d0', padding: '0.75rem 1rem', borderRadius: '12px', fontSize: '0.85rem', marginBottom: '1.25rem', fontWeight: 700, border: '1px solid #059669' }}>
                      {authSuccess}
                    </div>
                  )}

                  {authError && (
                    <div style={{ backgroundColor: '#7f1d1d', color: '#fecaca', padding: '0.75rem 1rem', borderRadius: '12px', fontSize: '0.85rem', marginBottom: '1.25rem', fontWeight: 700, border: '1px solid #ef4444' }}>
                      {authError}
                    </div>
                  )}

                  <form onSubmit={handleChangePassword} style={{ backgroundColor: '#0f172a', padding: '1.75rem', borderRadius: '20px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                        Owner Email ID
                      </label>
                      <input 
                        type="text" 
                        disabled 
                        value="rajkumar87036@gmail.com" 
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#1e293b', fontWeight: 800, color: '#60a5fa' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                        Current Password *
                      </label>
                      <input 
                        type="password" 
                        required
                        placeholder="Enter current password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#ffffff', fontSize: '0.9rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                        New Admin Password *
                      </label>
                      <input 
                        type="password" 
                        required
                        placeholder="Enter new strong password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#ffffff', fontSize: '0.9rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                        Confirm New Password *
                      </label>
                      <input 
                        type="password" 
                        required
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#ffffff', fontSize: '0.9rem' }}
                      />
                    </div>

                    <button type="submit" className="btn-accent" style={{ padding: '0.85rem', marginTop: '0.5rem', borderRadius: '12px' }}>
                      <span>Update Owner Password</span>
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
      )}

      {/* ----------------- COMPREHENSIVE ADD / EDIT VEHICLE FORM MODAL ----------------- */}
      {showBikeForm && (
        <div className="modal-overlay" style={{ zIndex: 1100 }}>
          <div className="modal-content" style={{ maxWidth: '840px', width: '100%', padding: '1.75rem', borderRadius: '24px', backgroundColor: '#0f172a', color: '#ffffff', border: '1px solid #1e293b', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.85rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
                  {editingBikeId ? 'Edit Vehicle Full Specification' : 'Add New Vehicle Listing'}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Complete details fill karein taaki website filters aur product detail page par accurate show ho
                </p>
              </div>

              <button className="modal-close-btn" onClick={() => setShowBikeForm(false)} style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveBike} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* SECTION 1: BASIC INFORMATION */}
              <div style={{ backgroundColor: '#1e293b', padding: '1.25rem', borderRadius: '16px', border: '1px solid #334155' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '0.85rem', letterSpacing: '0.05em' }}>
                  Step 1: Basic Vehicle Details
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.3rem' }}>
                      Vehicle Full Title (e.g. Royal Enfield Classic 350 Stealth Black ABS) *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter full descriptive vehicle name"
                      value={bikeFormData.name}
                      onChange={(e) => setBikeFormData({...bikeFormData, name: e.target.value})}
                      style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.85rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.3rem' }}>
                        Brand / Manufacturer *
                      </label>
                      <select 
                        value={bikeFormData.brand}
                        onChange={(e) => setBikeFormData({...bikeFormData, brand: e.target.value})}
                        style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '0.88rem' }}
                      >
                        {BRANDS.filter(b => b !== 'All Brands').map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                        <option value="Jawa">Jawa</option>
                        <option value="BMW">BMW</option>
                        <option value="Ather">Ather</option>
                        <option value="Ola">Ola</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.3rem' }}>
                        Riding Category / Style
                      </label>
                      <select 
                        value={bikeFormData.category}
                        onChange={(e) => setBikeFormData({...bikeFormData, category: e.target.value})}
                        style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '0.88rem' }}
                      >
                        <option value="Cruiser">Cruiser</option>
                        <option value="Scooter">Scooter</option>
                        <option value="Sports">Sports</option>
                        <option value="Commuter">Commuter</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Electric">Electric</option>
                        <option value="Cafe Racer">Cafe Racer</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.3rem' }}>
                        Vehicle Type
                      </label>
                      <select 
                        value={bikeFormData.type}
                        onChange={(e) => setBikeFormData({...bikeFormData, type: e.target.value})}
                        style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '0.88rem' }}
                      >
                        <option value="Bike">Bike</option>
                        <option value="Scooty">Scooty</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: PRICING & SPECIFICATIONS */}
              <div style={{ backgroundColor: '#1e293b', padding: '1.25rem', borderRadius: '16px', border: '1px solid #334155' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '0.85rem', letterSpacing: '0.05em' }}>
                  Step 2: Pricing, Year & Engine Specs
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.85rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.3rem' }}>
                      Selling Price (₹) *
                    </label>
                    <input 
                      type="number" 
                      required
                      placeholder="148000"
                      value={bikeFormData.price}
                      onChange={(e) => setBikeFormData({...bikeFormData, price: e.target.value})}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#38bdf8', fontSize: '0.9rem', fontWeight: 800 }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.3rem' }}>
                      Original Ex-Showroom (₹)
                    </label>
                    <input 
                      type="number" 
                      placeholder="175000"
                      value={bikeFormData.originalPrice}
                      onChange={(e) => setBikeFormData({...bikeFormData, originalPrice: e.target.value})}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.3rem' }}>
                      Model Year *
                    </label>
                    <input 
                      type="number" 
                      placeholder="2023"
                      value={bikeFormData.year}
                      onChange={(e) => setBikeFormData({...bikeFormData, year: e.target.value})}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.3rem' }}>
                      KM Driven *
                    </label>
                    <input 
                      type="number" 
                      placeholder="8500"
                      value={bikeFormData.km}
                      onChange={(e) => setBikeFormData({...bikeFormData, km: e.target.value})}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '0.88rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.3rem' }}>
                      Engine CC / kW
                    </label>
                    <input 
                      type="number" 
                      placeholder="350"
                      value={bikeFormData.cc}
                      onChange={(e) => setBikeFormData({...bikeFormData, cc: e.target.value})}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.3rem' }}>
                      Mileage (kmpl)
                    </label>
                    <input 
                      type="text" 
                      placeholder="40 kmpl"
                      value={bikeFormData.mileage}
                      onChange={(e) => setBikeFormData({...bikeFormData, mileage: e.target.value})}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.3rem' }}>
                      Fuel Type
                    </label>
                    <select 
                      value={bikeFormData.fuelType}
                      onChange={(e) => setBikeFormData({...bikeFormData, fuelType: e.target.value})}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '0.88rem' }}
                    >
                      <option value="Petrol">Petrol</option>
                      <option value="Electric">Electric</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.3rem' }}>
                      Ownership
                    </label>
                    <select 
                      value={bikeFormData.owner}
                      onChange={(e) => setBikeFormData({...bikeFormData, owner: e.target.value})}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '0.88rem' }}
                    >
                      <option value="1st Owner">1st Owner</option>
                      <option value="2nd Owner">2nd Owner</option>
                      <option value="3rd Owner">3rd Owner</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 3: LEGAL & INSPECTION */}
              <div style={{ backgroundColor: '#1e293b', padding: '1.25rem', borderRadius: '16px', border: '1px solid #334155' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '0.85rem', letterSpacing: '0.05em' }}>
                  Step 3: Registration, Insurance & Status
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.3rem' }}>
                      RTO & Registration
                    </label>
                    <input 
                      type="text" 
                      placeholder="BR-01 (Patna, Bihar)"
                      value={bikeFormData.rto}
                      onChange={(e) => setBikeFormData({...bikeFormData, rto: e.target.value})}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.3rem' }}>
                      Insurance Validity
                    </label>
                    <input 
                      type="text" 
                      placeholder="Valid till Dec 2027"
                      value={bikeFormData.insurance}
                      onChange={(e) => setBikeFormData({...bikeFormData, insurance: e.target.value})}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.3rem' }}>
                      Availability Status
                    </label>
                    <select 
                      value={bikeFormData.status}
                      onChange={(e) => setBikeFormData({...bikeFormData, status: e.target.value})}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '0.88rem' }}
                    >
                      <option value="Available">Available (In Stock)</option>
                      <option value="Booked">Booked (Token Received)</option>
                      <option value="Sold Out">Sold Out</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 4: VEHICLE PHOTOS & MEDIA */}
              <div style={{ backgroundColor: '#1e293b', padding: '1.25rem', borderRadius: '16px', border: '1px solid #334155' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '0.85rem', letterSpacing: '0.05em' }}>
                  Step 4: Vehicle Photos & Media Upload
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <input 
                    type="url"
                    placeholder="Paste Image URL (https://...)"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    style={{ flexGrow: 1, padding: '0.65rem', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '0.85rem' }}
                  />
                  <button 
                    type="button" 
                    onClick={handleAddImageUrl}
                    style={{ backgroundColor: '#1e40af', color: '#ffffff', border: 'none', padding: '0.65rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}
                  >
                    + Add URL
                  </button>

                  <label style={{
                    backgroundColor: '#059669',
                    color: '#ffffff',
                    padding: '0.65rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}>
                    <Upload size={14} />
                    <span>Upload Photo</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                  </label>
                </div>

                {/* Thumbnails Preview */}
                <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', padding: '0.5rem 0' }}>
                  {bikeFormData.images.map((imgUrl, idx) => (
                    <div key={idx} style={{ position: 'relative', width: '76px', height: '60px', flexShrink: 0 }}>
                      <img src={imgUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', border: '1px solid #334155' }} />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        style={{ position: 'absolute', top: '-6px', right: '-6px', backgroundColor: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '50%', width: '20px', height: '20px', fontSize: '0.7rem', cursor: 'pointer', display: 'grid', placeItems: 'center' }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn-accent" style={{ flex: 1, padding: '0.85rem', fontSize: '1rem', borderRadius: '12px' }}>
                  <Sparkles size={18} />
                  <span>{editingBikeId ? 'Update & Sync Vehicle' : 'Save & Publish Live on Website'}</span>
                </button>
                
                <button type="button" className="btn-secondary" onClick={() => setShowBikeForm(false)} style={{ padding: '0.85rem 1.5rem', borderRadius: '12px' }}>
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ---------------- FORGOT OWNER PASSWORD RESET MODAL ---------------- */}
      {showForgotModal && (
        <div className="modal-overlay" onClick={() => setShowForgotModal(false)} style={{ zIndex: 1100 }}>
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()} 
            style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', color: '#f8fafc', maxWidth: '440px', borderRadius: '24px', padding: '2rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ backgroundColor: '#1e40af', color: '#ffffff', width: '38px', height: '38px', borderRadius: '10px', display: 'grid', placeItems: 'center' }}>
                  🔑
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>Forgot Owner Password</h3>
              </div>
              <button onClick={() => setShowForgotModal(false)} className="modal-close-btn" style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                <X size={18} />
              </button>
            </div>

            {forgotError && (
              <div style={{ backgroundColor: '#7f1d1d', color: '#fecaca', padding: '0.75rem', borderRadius: '10px', fontSize: '0.82rem', marginBottom: '1rem', fontWeight: 700 }}>
                {forgotError}
              </div>
            )}

            {forgotSuccess && (
              <div style={{ backgroundColor: '#065f46', color: '#a7f3d0', padding: '0.75rem', borderRadius: '10px', fontSize: '0.82rem', marginBottom: '1rem', fontWeight: 700 }}>
                {forgotSuccess}
              </div>
            )}

            {!forgotOtpSent ? (
              <form onSubmit={handleSendForgotOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.5' }}>
                  Enter your registered Showroom Owner mobile number to receive a 4-digit Reset OTP via SMS.
                </p>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                    Showroom Mobile Number
                  </label>
                  <input 
                    type="tel"
                    required
                    value={forgotPhone}
                    onChange={(e) => setForgotPhone(e.target.value)}
                    placeholder="7480078779"
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#ffffff', fontSize: '0.95rem', fontWeight: 700 }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ padding: '0.85rem', marginTop: '0.5rem' }}>
                  <span>Send Reset OTP via WhatsApp</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Live WhatsApp Reset Banner */}
                <div style={{ backgroundColor: '#064e3b', color: '#a7f3d0', padding: '0.85rem', borderRadius: '12px', fontSize: '0.82rem', border: '1.5px solid #10b981', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '0.88rem' }}>💬 WhatsApp Reset OTP Code Triggered!</div>
                  <div>Aapke mobile <strong>+91 {forgotPhone}</strong> ke WhatsApp par 4-digit code bhej diya gaya hai.</div>
                  <button 
                    type="button"
                    onClick={() => {
                      const text = encodeURIComponent(
                        `Hello BIKE BAZAAR Owner! Your Owner Password Reset OTP for mobile +91 ${forgotPhone} is: ${forgotGeneratedOtp}`
                      );
                      window.open(`https://wa.me/917480078779?text=${text}`, '_blank');
                    }}
                    style={{ marginTop: '0.2rem', backgroundColor: '#10b981', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '0.4rem 0.6rem', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}
                  >
                    <span>Open WhatsApp to Check / Send Code</span>
                  </button>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                    Enter 4-Digit Reset OTP
                  </label>
                  <input 
                    type="text"
                    required
                    maxLength={4}
                    value={forgotUserOtp}
                    onChange={(e) => setForgotUserOtp(e.target.value)}
                    placeholder="e.g. 9381"
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#ffffff', fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.3em', textAlign: 'center' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                    New Password
                  </label>
                  <input 
                    type="password"
                    required
                    value={forgotNewPass}
                    onChange={(e) => setForgotNewPass(e.target.value)}
                    placeholder="Enter new password"
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#ffffff', fontSize: '0.92rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                    Confirm New Password
                  </label>
                  <input 
                    type="password"
                    required
                    value={forgotConfirmPass}
                    onChange={(e) => setForgotConfirmPass(e.target.value)}
                    placeholder="Confirm new password"
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#ffffff', fontSize: '0.92rem' }}
                  />
                </div>

                <button type="submit" className="btn-accent" style={{ padding: '0.85rem', marginTop: '0.5rem' }}>
                  <span>Reset & Update Owner Password</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
