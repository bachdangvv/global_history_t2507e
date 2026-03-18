import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-section">
          <h3>About</h3>
          <p>Exploring the past to understand the present. Join us on a journey through time.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/timeline">Interactive Timeline</a></li>
            <li><a href="/articles">Articles</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Connect</h3>
          <ul className="footer-links">
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="#twitter">Twitter</a></li>
            <li><a href="#github">GitHub</a></li>
          </ul>
        </div>

      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Your Project Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;