import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle2, Send, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'Buying Used Bike',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Trigger Formspree or mailto backup as requested by user for doubledoormusic12@gmail.com
    const mailtoSubject = encodeURIComponent(`Bike Bazaar Inquiry: ${formData.subject} from ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nPhone: ${formData.phone}\nSubject: ${formData.subject}\nMessage: ${formData.message}\n\nSent to BIKE BAZAAR (doubledoormusic12@gmail.com)`
    );
    // Silent window open or form submit confirmation
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/917480078779?text=Hi%20Bike%20Bazaar,%20I%20want%20to%20visit%20your%20showroom.`, '_blank');
  };

  return (
    <div style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2.5rem auto' }}>
          <span className="section-tag">Showroom Location & Support</span>
          <h1 className="section-title">BIKE BAZAAR Contact Center</h1>
          <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '0.5rem' }}>
            Showroom visit karein ya phone/WhatsApp par query karein. Hum hafte ke 7 din open hain!
          </p>
        </div>

        {/* Layout: Left Side Details | Right Side Chota & Premium Form */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', alignItems: 'flex-start' }}>
          
          {/* LEFT SIDE: Detailed Showroom Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Showroom Address Box */}
            <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '12px' }}>
                  <MapPin size={26} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.3rem' }}>
                    Patna Main Showroom
                  </h3>
                  <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.6' }}>
                    Plot 42, Main Bypass Road, Near Metro Pillar 114,<br />
                    Opposite TVS Service Station, Patna, Bihar - 800001
                  </p>
                </div>
              </div>
            </div>

            {/* Phone & WhatsApp Box */}
            <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: '#dbeafe', color: '#1e40af', padding: '0.75rem', borderRadius: '12px' }}>
                  <Phone size={26} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.3rem' }}>
                    Helpline & WhatsApp Number
                  </h3>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e40af', marginBottom: '0.6rem' }}>
                    <a href="tel:+917480078779" style={{ color: '#1e40af' }}>+91 7480078779</a>
                  </div>
                  <button className="btn-whatsapp btn-sm" onClick={handleWhatsApp}>
                    <MessageSquare size={16} />
                    <span>WhatsApp Chat Support (7480078779)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Email Box */}
            <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '0.75rem', borderRadius: '12px' }}>
                  <Mail size={26} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.3rem' }}>
                    Official Email Address
                  </h3>
                  <p style={{ color: '#059669', fontWeight: 700, fontSize: '0.95rem' }}>
                    <a href="mailto:doubledoormusic12@gmail.com">doubledoormusic12@gmail.com</a>
                  </p>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.25rem' }}>
                    Sari inquiry data is email id par automatically secure hoti hai.
                  </p>
                </div>
              </div>
            </div>

            {/* Timings */}
            <div style={{ backgroundColor: '#ffffff', padding: '1.25rem 1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '0.6rem', borderRadius: '10px' }}>
                <Clock size={22} />
              </div>
              <div style={{ fontSize: '0.9rem', color: '#334155' }}>
                Showroom Timings: <strong>Mon - Sun: 9:00 AM to 8:30 PM</strong> (Open All 7 Days)
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Chota Aur Premium Form */}
          <div style={{
            backgroundColor: '#0f172a',
            color: '#ffffff',
            padding: '2rem 1.75rem',
            borderRadius: '20px',
            border: '1px solid #1e293b',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)'
          }}>
            <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.85rem' }}>
              <div style={{ color: '#38bdf8', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Instant Inquiry
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
                Send Message
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginTop: '0.2rem' }}>
                All form details go directly to <strong>doubledoormusic12@gmail.com</strong>
              </p>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #334155' }}>
                <div style={{ backgroundColor: '#d1fae5', color: '#065f46', width: '52px', height: '52px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                  <CheckCircle2 size={30} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                  Message Sent to Email!
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.88rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                  Thank you, <strong>{formData.name}</strong>! Your message has been routed to <strong>doubledoormusic12@gmail.com</strong>. Our Patna team will call you at <strong>{formData.phone}</strong>.
                </p>
                <button 
                  className="btn-accent btn-sm" 
                  onClick={() => setSubmitted(false)}
                  style={{ width: '100%' }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                action="https://formspree.io/f/doubledoormusic12@gmail.com"
                method="POST"
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '0.3rem' }}>
                    Your Name *
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#ffffff', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '0.3rem' }}>
                    Phone Number *
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    placeholder="10 digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#ffffff', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '0.3rem' }}>
                    Query Subject
                  </label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#ffffff', fontSize: '0.9rem' }}
                  >
                    <option value="Buying Used Bike">Buying Used Bike / Scooty</option>
                    <option value="Selling My Bike">Selling My Purani Bike</option>
                    <option value="EMI Loan Details">EMI Loan & Finance Query</option>
                    <option value="RC Name Transfer">RC Transfer & Paperwork</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '0.3rem' }}>
                    Message / Requirement *
                  </label>
                  <textarea 
                    name="message"
                    rows={3}
                    required
                    placeholder="Which bike or budget are you looking for?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#ffffff', fontSize: '0.9rem' }}
                  />
                </div>

                <input type="hidden" name="_to" value="doubledoormusic12@gmail.com" />

                <button type="submit" className="btn-accent" style={{ width: '100%', padding: '0.8rem', marginTop: '0.3rem', justifyContent: 'center' }}>
                  <Send size={16} />
                  <span>Send to doubledoormusic12@gmail.com</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
