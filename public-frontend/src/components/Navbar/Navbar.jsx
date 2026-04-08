import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSignOutAlt, faUser, faTachometerAlt, faPen, faBell } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import { config } from '../../config/appConfig';
import './Navbar.css';

const Navbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const [searchHover, setSearchHover] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const avatarRef = useRef(null);
  const { user, logout } = useAuth();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close avatar menu on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setAvatarMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    setAvatarMenuOpen(false);
    navigate('/');
  };

  // Build display name and initial
  const displayName = user?.username || user?.name || user?.email || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          {onToggleSidebar && (
            <button className="hamburger-btn" onClick={onToggleSidebar}>
              ☰
            </button>
          )}
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">🌐</span>
            <span className="logo-text">Global History</span>
          </Link>
        </div>

        <div className="navbar-actions">
          <div
            className="search-icon-wrapper"
            onMouseEnter={() => setSearchHover(true)}
            onMouseLeave={() => setSearchHover(false)}
            onClick={() => navigate('/search')}
          >
            <div className="search-icon-container">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>
            {searchHover && <div className="search-tooltip">Search</div>}
          </div>

          {user && (
            <a
              href="/submit"
              target="_blank"
              rel="noreferrer"
              className="write-article-btn"
              title="Write and publish a new article"
            >
              <FontAwesomeIcon icon={faPen} />
              <span>Write</span>
            </a>
          )}

          {user ? (
            <div className="navbar-avatar-wrap" ref={avatarRef}>
              <button
                className="navbar-avatar-btn"
                onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
                title={displayName}
              >
                <span className="navbar-avatar-circle">{initial}</span>
              </button>

              {avatarMenuOpen && (
                <div className="navbar-avatar-menu">
                  <div className="avatar-menu-header">
                    <span className="avatar-menu-name">{displayName}</span>
                    <span className="avatar-menu-role">{user?.role || 'Contributor'}</span>
                  </div>
                  <a
                    href={config.getDashboardURL(config.dashboardPaths.home)}
                    className="avatar-menu-item"
                    target="_blank"
                    rel="noreferrer"
                    title="View your articles and contributions"
                  >
                    <FontAwesomeIcon icon={faUser} />
                    My Articles
                  </a>
                  <a
                    href={config.getDashboardURL(config.dashboardPaths.createArticle)}
                    className="avatar-menu-item"
                    target="_blank"
                    rel="noreferrer"
                    title="Write and publish a new article"
                  >
                    <FontAwesomeIcon icon={faPen} />
                    Write Article
                  </a>
                  <a
                    href={config.getDashboardURL(config.dashboardPaths.profile)}
                    className="avatar-menu-item"
                    target="_blank"
                    rel="noreferrer"
                    title="Edit your profile and view your metrics"
                  >
                    <FontAwesomeIcon icon={faTachometerAlt} />
                    Profile & Metrics
                  </a>
                  <a
                    href={config.getDashboardURL(config.dashboardPaths.notifications)}
                    className="avatar-menu-item"
                    target="_blank"
                    rel="noreferrer"
                    title="View notifications and feedback"
                  >
                    <FontAwesomeIcon icon={faBell} />
                    Notifications
                  </a>
                  <button className="avatar-menu-item avatar-menu-logout" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;