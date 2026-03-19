import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <span className="logo-icon">🌐</span>
          <span className="logo-text">Global History</span>
        </a>
        <div className="navbar-actions">
          <button className="login-btn">Đăng nhập</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;