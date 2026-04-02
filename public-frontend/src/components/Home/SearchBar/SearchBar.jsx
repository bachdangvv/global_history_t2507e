import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="navbar-search-bar">
      <div className="input-wrapper">
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Search on Global History..." 
          className="search-input"
        />
      </div>
    </div>
  );
};

export default SearchBar;
