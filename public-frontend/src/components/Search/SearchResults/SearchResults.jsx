import React from 'react';
import SearchResultCard from '../SearchResultCard/SearchResultCard';
import './SearchResults.css';

const SearchResults = ({ results, isLoading }) => {
  if (isLoading) {
    return (
      <div className="search-results-container">
        <div className="loading">Loading search results...</div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="search-results-container">
        <div className="no-results">
          <p>No results found</p>
          <p className="no-results-hint">Try a different search term</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      <div className="results-header">
        <h2>Search Results</h2>
        <span className="result-count">{results.length} results found</span>
      </div>
      <div className="search-results-grid">
        {results.map((result) => (
          <SearchResultCard key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
