import React, { useState } from 'react';
import './SearchBarMain.css';

const SearchBarMain = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ query: searchQuery });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Real-time search - trigger search on every keystroke
    onSearch({ query });
  };

  return (
    <div className="search-bar-main-wrapper">
      <div className="search-bar-main-container">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search articles, categories, countries..."
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button type="submit" className="search-btn">
              <span>Search</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBarMain;
