import React from 'react';
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
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🌐</span>
          <span className="logo-text">Global History</span>
        </Link>
        <div className="navbar-actions">
          <button className="login-btn">Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;