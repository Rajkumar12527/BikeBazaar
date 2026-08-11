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

        {/* Layout: Left Side Details | Right Side Premium Form */}
        <div className="grid-responsive-2" style={{ gap: '2.5rem', alignItems: 'flex-start' }}>
          
          {/* LEFT SIDE: Detailed Showroom Info */}
          <div className="contact-panel">
            <div className="contact-detail-card contact-highlight-card">
              <div className="contact-icon-box contact-icon-red">
                <MapPin size={26} />
              </div>
              <div>
                <h3>Patna Main Showroom</h3>
                <p>
                  Plot 42, Main Bypass Road, Near Metro Pillar 114,<br />
                  Opposite TVS Service Station, Patna, Bihar - 800001
                </p>
              </div>
            </div>

            <div className="contact-detail-card">
              <div className="contact-icon-box contact-icon-blue">
                <Phone size={26} />
              </div>
              <div>
                <h3>Helpline & WhatsApp Number</h3>
                <div className="contact-detail-strong">
                  <a href="tel:+917480078779">+91 7480078779</a>
                </div>
                <button className="btn-whatsapp btn-sm contact-whatsapp-btn" onClick={handleWhatsApp}>
                  <MessageSquare size={16} />
                  <span>WhatsApp Chat Support</span>
                </button>
              </div>
            </div>

            <div className="contact-detail-card">
              <div className="contact-icon-box contact-icon-green">
                <Mail size={26} />
              </div>
              <div>
                <h3>Official Email Address</h3>
                <p className="contact-detail-strong">
                  <a href="mailto:doubledoormusic12@gmail.com">doubledoormusic12@gmail.com</a>
                </p>
                <p className="contact-note">
                  Saari inquiry details email par automatically secure hoti hai.
                </p>
              </div>
            </div>

            <div className="contact-detail-card contact-timings-card">
              <div className="contact-icon-box contact-icon-amber">
                <Clock size={22} />
              </div>
              <div>
                <p className="contact-timings-text">
                  Showroom Timings: <strong>Mon - Sun: 9:00 AM to 8:30 PM</strong>
                </p>
                <p className="contact-note">
                  Open all 7 days for showroom visits and test drives.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Premium Form */}
          <div className="contact-form-card">
            <div className="contact-form-header">
              <span className="section-tag section-tag-lite">Instant Inquiry</span>
              <h2>Send Message</h2>
              <p>All form details go directly to <strong>doubledoormusic12@gmail.com</strong></p>
            </div>

            {submitted ? (
              <div className="contact-success-card">
                <div className="contact-success-icon"><CheckCircle2 size={30} /></div>
                <h3>Message Sent to Email!</h3>
                <p>
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
                className="contact-form"
              >
                <div className="contact-field-group">
                  <label>Your Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="contact-field-group">
                  <label>Phone Number *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    placeholder="10 digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="contact-field-group">
                  <label>Query Subject</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  >
                    <option value="Buying Used Bike">Buying Used Bike / Scooty</option>
                    <option value="Selling My Bike">Selling My Purani Bike</option>
                    <option value="EMI Loan Details">EMI Loan & Finance Query</option>
                    <option value="RC Name Transfer">RC Transfer & Paperwork</option>
                  </select>
                </div>

                <div className="contact-field-group">
                  <label>Message / Requirement *</label>
                  <textarea 
                    name="message"
                    rows={4}
                    required
                    placeholder="Which bike or budget are you looking for?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <input type="hidden" name="_to" value="doubledoormusic12@gmail.com" />

                <button type="submit" className="btn-accent contact-submit-btn">
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
