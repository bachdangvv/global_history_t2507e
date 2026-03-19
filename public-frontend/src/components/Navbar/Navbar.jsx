import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🌐</span>
          <span className="logo-text">Global History</span>
        </Link>
        <div className="navbar-actions">
          <Link to="/login" className="login-btn" style={{ textDecoration: 'none' }}>Đăng nhập</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;