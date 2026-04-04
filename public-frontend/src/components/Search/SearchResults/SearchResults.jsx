import React from 'react';
import SearchResultCard from '../SearchResultCard/SearchResultCard';
import './SearchResults.css';

const SearchResults = ({ results, isLoading, query }) => {
  if (isLoading) {
    return (
      <div className="cr-results-container">
        <div className="cr-results-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="cr-skeleton-card">
              <div className="cr-skeleton-img shimmer" />
              <div className="cr-skeleton-body">
                <div className="cr-skeleton-line short shimmer" />
                <div className="cr-skeleton-line shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="cr-results-container">
        <div className="cr-no-results">
          <div className="cr-no-results-icon">🔍</div>
          <h3>No results found for "{query}"</h3>
          <p>Try a different keyword or browse our featured articles below</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cr-results-container">
      <div className="cr-results-header">
        <h2>Search Results</h2>
        <span className="cr-results-count">{results.length} articles found</span>
      </div>
      <div className="cr-results-grid">
        {results.map((r) => (
          <SearchResultCard key={r.id} result={r} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
