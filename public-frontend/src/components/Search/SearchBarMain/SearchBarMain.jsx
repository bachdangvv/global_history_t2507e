import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import './SearchBarMain.css';

const SearchBarMain = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const debounceRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch({ query: val });
    }, 400);
  };

  const handleClear = () => {
    setQuery('');
    onSearch({ query: '' });
    inputRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    onSearch({ query });
  };

  return (
    <div className="cr-search-bar">
      <form onSubmit={handleSubmit} className="cr-search-form">
        <div className="cr-search-input-container">
          <FontAwesomeIcon icon={faSearch} className="cr-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cr-search-input"
            placeholder="Search history articles, civilizations, events..."
            value={query}
            onChange={handleChange}
            autoComplete="off"
          />
          {query && (
            <button type="button" className="cr-search-clear" onClick={handleClear}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBarMain;