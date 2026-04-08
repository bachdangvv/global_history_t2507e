import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBarMain from '../../components/Search/SearchBarMain/SearchBarMain';
import SearchResults from '../../components/Search/SearchResults/SearchResults';
import { fetchSearchResults } from '../../services/api';
import './Search.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');

  useEffect(() => {
    if (initialQuery) {
      handleSearch({ query: initialQuery });
    }
  }, [initialQuery]);

  const handleSearch = async ({ query }) => {
    const trimmed = query.trim();
    setCurrentQuery(trimmed);

    if (!trimmed) {
      setHasSearched(false);
      setResults([]);
      return;
    }

    setHasSearched(true);
    setIsLoading(true);

    try {
      const data = await fetchSearchResults(trimmed);
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cr-search-page">
      <div className="cr-search-hero">
        <h1 className="cr-search-title">Explore Global History</h1>
        <p className="cr-search-subtitle">Search articles, historical events, authors, and civilizations.</p>
        <SearchBarMain onSearch={handleSearch} />
      </div>

      <div className="cr-search-content">
        {hasSearched ? (
          <SearchResults results={results} isLoading={isLoading} query={currentQuery} />
        ) : (
          <div className="cr-search-default-view">
            <div className="cr-search-placeholder">
              <div className="cr-placeholder-icon">🔍</div>
              <h2>Start exploring historical content</h2>
              <p>Search for articles, historical events, authors, and civilizations</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;