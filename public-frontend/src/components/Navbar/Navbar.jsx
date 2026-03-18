import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          Logo
        </a>

        <div className="menu-icon" onClick={toggleMenu}>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        </div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a href="/" className="nav-links" onClick={() => setIsOpen(false)}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/timeline" className="nav-links" onClick={() => setIsOpen(false)}>
              Timeline
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-links" onClick={() => setIsOpen(false)}>
              About
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;