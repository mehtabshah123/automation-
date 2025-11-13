import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; // Your main stylesheet

// You can use a library like 'react-icons' for social media icons
// To install: npm install react-icons
// Then uncomment the lines below
// import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container container">
        {/* Column 1: About */}
        <div className="footer-column">
          <h4>MyWellbeing</h4>
          <p>
            A dedicated space for students to find support, connect with peers, and access resources for mental wellness.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">sheet</Link></li>
            <li><Link to="/chatbot">sheet</Link></li>
            <li><Link to="/forum">email</Link></li>
            <li><Link to="/resources">pdf</Link></li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div className="footer-column">
          <h4>Support</h4>
          <ul className="footer-links">
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        
        {/* Column 4: Social Media */}
        <div className="footer-column">
          <h4>Stay Connected</h4>
          <div className="social-links">
            {/* Replace '#' with your actual social media links */}
            <a href="#" aria-label="Twitter"> {/* <FaTwitter /> */} T </a>
            <a href="#" aria-label="Instagram"> {/* <FaInstagram /> */} I </a>
            <a href="#" aria-label="LinkedIn"> {/* <FaLinkedin /> */} L </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} MyWellbeing. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;