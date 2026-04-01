import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <div className="search-header">
        <h2>Tìm kiếm</h2>
      </div>
      <div className="search-input-group">
        <div className="input-wrapper">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Tìm kiếm mọi thứ liên quan đến lịch sử..." 
            className="search-input"
          />
        </div>
        <button className="advanced-filters-btn">
          <span className="filter-icon">⚙️</span> Tìm kiếm nâng cao
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
