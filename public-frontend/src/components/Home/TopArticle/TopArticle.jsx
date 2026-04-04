import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopArticle.css';

const TopArticle = ({ topLikeData, topViewData, recentData, countries }) => {
  const navigate = useNavigate();
  const [activeSort, setActiveSort] = useState('top_like');
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  let data = [];
  if (activeSort === 'top_like') data = topLikeData;
  else if (activeSort === 'top_view') data = topViewData;
  else if (activeSort === 'recent') data = recentData;

  if (!data || data.length === 0) return null;

  const handleCountryToggle = (code) => {
    setSelectedCountries(prev => 
      prev.includes(code) 
        ? prev.filter(c => c !== code)
        : [...prev, code]
    );
  };

  return (
    <div className="widget-container">
      <div className="section-header-with-sort articles-header">
        <div className="sort-tabs">
          <button 
            className={`sort-tab ${activeSort === 'top_like' ? 'active' : ''}`}
            onClick={() => setActiveSort('top_like')}
          >
            Top Like
          </button>
          <button 
            className={`sort-tab ${activeSort === 'top_view' ? 'active' : ''}`}
            onClick={() => setActiveSort('top_view')}
          >
            Top View
          </button>
          <button 
            className={`sort-tab ${activeSort === 'recent' ? 'active' : ''}`}
            onClick={() => setActiveSort('recent')}
          >
            Recent Article
          </button>
        </div>
        
        <div className="country-filter-container">
          <button 
            className="country-dropdown-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Select by countries {selectedCountries.length > 0 && <span className="badge">{selectedCountries.length}</span>}
          </button>
          
          {dropdownOpen && (
            <div className="country-dropdown-menu">
              {countries?.map(country => (
                <label key={country.id} className="country-checkbox">
                  <input 
                    type="checkbox" 
                    checked={selectedCountries.includes(country.code)}
                    onChange={() => handleCountryToggle(country.code)}
                  />
                  <span>{country.flag} {country.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="articles-list">
        {data.map(article => {
          const totalVotes = (article.like_count || 0) + (article.dislike_count || 0);
          const likeRatio = totalVotes === 0 ? 50 : (article.like_count / totalVotes) * 100;
          
          return (
            <div 
              key={article.id} 
              className="article-card list-item" 
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/article/${article.id}`)}
            >
              <div className="article-content-wrapper">
                <img src={article.image} alt={article.title} className="article-image" />
                <div className="article-info">
                  <h4 className="article-title">{article.title}</h4>
                  <p className="article-summary">{article.summary}</p>
                  
                  {activeSort === 'top_like' && article.like_count !== undefined && (
                    <div className="vote-section">
                      <div className="vote-bar-container">
                        <div 
                          className="vote-bar-likes" 
                          style={{ width: `${likeRatio}%` }}
                        ></div>
                      </div>
                      <div className="vote-stats">
                        <span className="voter-ratio-label">Like ratio</span>
                        <span className="like-dislike-label">Like:Dislike</span>
                      </div>
                    </div>
                  )}
                  
                  {activeSort === 'top_view' && article.view_count !== undefined && (
                    <div className="stats-indicator">
                      <span className="view-count">👁️ {article.view_count.toLocaleString()} lượt xem</span>
                    </div>
                  )}
                  
                  {activeSort === 'recent' && (
                    <div className="stats-indicator">
                      <span className="recent-badge">New</span>
                    </div>
                  )}
                  
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopArticle;
