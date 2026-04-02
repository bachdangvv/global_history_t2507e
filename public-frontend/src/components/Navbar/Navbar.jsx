<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchHover, setSearchHover] = useState(false);

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <span className="logo-icon">🌐📖</span>
          <span className="logo-text">Global History</span>
        </a>
        <div className="navbar-actions">
          <div
            className="search-icon-wrapper"
            onMouseEnter={() => setSearchHover(true)}
            onMouseLeave={() => setSearchHover(false)}
            onClick={handleSearchClick}
          >
            <div className="search-icon-container">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>
            {searchHover && (
              <div className="search-tooltip">
                Search
              </div>
            )}
          </div>
          <button className="login-btn">Login</button>
=======
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
>>>>>>> 3c2e94342eb257e5967cddf5f812606655ca5877
        </div>
      </div>
    </nav>
  );
};

export default Navbar;