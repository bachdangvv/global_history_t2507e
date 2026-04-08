import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './SearchFilters.css';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const SearchFilters = ({ 
  selectedLetter, 
  selectedCategory, 
  categories,
  onLetterChange, 
  onCategoryChange,
  onClearFilters 
}) => {
  const [showCategories, setShowCategories] = useState(false);
  const hasActiveFilters = selectedLetter || selectedCategory;

  const handleLetterClick = (letter) => {
    if (selectedLetter === letter) {
      onLetterChange(null);
    } else {
      onLetterChange(letter);
    }
  };

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      onCategoryChange(null);
    } else {
      onCategoryChange(category);
    }
    setShowCategories(false);
  };

  const handleClear = () => {
    onLetterChange(null);
    onCategoryChange(null);
    onClearFilters();
  };

  return (
    <div className="cr-filters-container">
      <div className="cr-filters-section">
        <div className="cr-filters-header">
          <h3 className="cr-filters-title">Filters</h3>
          {hasActiveFilters && (
            <button className="cr-filters-clear-btn" onClick={handleClear}>
              <FontAwesomeIcon icon={faTimes} /> Clear All
            </button>
          )}
        </div>

        {/* Letter Filters */}
        <div className="cr-letter-filters">
          <label className="cr-filter-label">Start with</label>
          <div className="cr-letters-grid">
            {ALPHABET.map((letter) => (
              <button
                key={letter}
                className={`cr-letter-btn ${selectedLetter === letter ? 'active' : ''}`}
                onClick={() => handleLetterClick(letter)}
                title={`Filter by ${letter}`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="cr-category-filter">
          <label className="cr-filter-label">Category</label>
          <div className="cr-category-dropdown">
            <button 
              className="cr-category-trigger"
              onClick={() => setShowCategories(!showCategories)}
            >
              {selectedCategory ? selectedCategory : 'All Categories'}
              <span className="cr-dropdown-arrow">▼</span>
            </button>
            {showCategories && (
              <div className="cr-category-menu">
                <div 
                  className={`cr-category-item ${!selectedCategory ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(null)}
                >
                  All Categories
                </div>
                {categories.map((cat) => (
                  <div
                    key={cat}
                    className={`cr-category-item ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(cat)}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="cr-active-filters">
            {selectedLetter && (
              <div className="cr-active-filter-tag">
                Starts with: <strong>{selectedLetter}</strong>
                <button onClick={() => onLetterChange(null)} className="cr-filter-remove">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            )}
            {selectedCategory && (
              <div className="cr-active-filter-tag">
                Category: <strong>{selectedCategory}</strong>
                <button onClick={() => onCategoryChange(null)} className="cr-filter-remove">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
