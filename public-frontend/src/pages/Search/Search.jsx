import React, { useState } from 'react';
import SearchBarMain from '../../components/Search/SearchBarMain/SearchBarMain';
import SearchResults from '../../components/Search/SearchResults/SearchResults';
import TopResults from '../../components/Search/TopResults/TopResults';
import RelatedArticles from '../../components/Search/RelatedArticles/RelatedArticles';
import RecommendedArticles from '../../components/Search/RecommendedArticles/RecommendedArticles';
import { searchArticles } from '../../mockData';
import './Search.css';

const Search = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = ({ query }) => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      let filteredResults = searchArticles;

      // Only filter by search query if text is provided
      if (query.trim()) {
        setHasSearched(true);
        const lowerQuery = query.toLowerCase();
        filteredResults = filteredResults.filter(
          (article) =>
            article.title.toLowerCase().includes(lowerQuery) ||
            article.description.toLowerCase().includes(lowerQuery) ||
            article.category.toLowerCase().includes(lowerQuery) ||
            article.country.toLowerCase().includes(lowerQuery)
        );
      } else {
        setHasSearched(false);
        filteredResults = [];
      }

      setResults(filteredResults);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="search-page">
      <SearchBarMain onSearch={handleSearch} />
      
      {hasSearched ? (
        <SearchResults results={results} isLoading={isLoading} />
      ) : (
        <>
          <TopResults />
          <RelatedArticles />
          <RecommendedArticles />
        </>
      )}
    </div>
  );
};

export default Search;
