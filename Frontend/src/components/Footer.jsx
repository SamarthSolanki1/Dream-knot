import React, { useState } from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribed with email:', email);
    setEmail('');
    // Here you would typically send this to your backend
  };

  return (
    <footer className="footer-container">
      {/* Top curved border */}
      <div className="footer-wave">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none">
          <path d="M0,48 L1440,48 L1440,0 C1440,0 1320,32 1140,32 C960,32 720,0 600,0 C480,0 360,32 240,32 C120,32 0,0 0,0 L0,48 Z" />
        </svg>
      </div>
      
      <div className="footer-content">
        <div className="footer-grid">
          {/* About section */}
          <div className="footer-column">
            <div className="footer-logo">
              <i className="footer-heart-icon"></i>
              <h3>DreamKnot</h3>
            </div>
            <p>
              Making your special day truly magical with personalized wedding planning services that exceed expectations.
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon instagram"></a>
              <a href="#" className="social-icon facebook"></a>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {['Home', 'Our Services', 'Portfolio', 'Testimonials', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="footer-column">
            <h4>Contact Us</h4>
            <ul className="footer-contact">
              <li className="contact-item location">
                <span>123 Wedding Lane, Romance City, RC 10101</span>
              </li>
              <li className="contact-item phone">
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </li>
              <li className="contact-item email">
                <a href="mailto:hello@foreverafter.com">hello@foreverafter.com</a>
              </li>
              <li className="contact-item hours">
                <span>Mon-Fri: 9AM-6PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-column">
            <h4>Stay Updated</h4>
            <p>
              Subscribe to our newsletter for wedding inspiration and exclusive offers.
            </p>
            <form onSubmit={handleSubmit} className="newsletter-form">
              <div className="input-container">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                />
                <button type="submit" className="submit-btn">
                  <i className="arrow-icon"></i>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom copyright */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} DreamKnot. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;