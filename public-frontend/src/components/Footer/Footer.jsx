import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/links">About Us</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/contact">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;