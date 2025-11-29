import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">
              <span className="logo-icon">📚</span>
              LearnHub
            </h3>
            <p className="footer-description">
              Your gateway to knowledge. Learn new skills and advance your career with our comprehensive online courses.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">
                <FiFacebook />
              </a>
              <a href="#" aria-label="Twitter">
                <FiTwitter />
              </a>
              <a href="#" aria-label="Instagram">
                <FiInstagram />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/courses">All Courses</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Categories</h4>
            <ul className="footer-links">
              <li><Link to="/courses?category=Technology">Technology</Link></li>
              <li><Link to="/courses?category=Business">Business</Link></li>
              <li><Link to="/courses?category=Design">Design</Link></li>
              <li><Link to="/courses?category=Marketing">Marketing</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Support</h4>
            <ul className="footer-links">
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 LearnHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


