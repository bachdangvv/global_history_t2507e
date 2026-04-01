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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;