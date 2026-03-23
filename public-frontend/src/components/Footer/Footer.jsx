import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/links">Về chúng tôi</a>
        <a href="/privacy">Chính sách</a>
        <a href="/contact">Liên hệ</a>
      </div>
    </footer>
  );
};

export default Footer;