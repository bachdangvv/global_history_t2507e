import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <div className="search-header">
        <h2>Search</h2>
      </div>
      <div className="search-input-group">
        <div className="input-wrapper">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Tìm kiếm thời kỳ, di tích, hoặc sự kiện..." 
            className="search-input"
          />
        </div>
        <button className="advanced-filters-btn">
          <span className="filter-icon">⚙️</span> Advanced filters
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
