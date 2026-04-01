import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../Home/SearchBar/SearchBar';
import './Navbar.css';

const Navbar = ({ onToggleSidebar }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="hamburger-btn" onClick={onToggleSidebar}>
            ☰
          </button>
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">🌐</span>
            <span className="logo-text">Global History</span>
          </Link>
        </div>
        <div className="navbar-center">
          <SearchBar />
        </div>
        <div className="navbar-actions">
          <Link to="/login" className="login-btn" style={{ textDecoration: 'none' }}>Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;