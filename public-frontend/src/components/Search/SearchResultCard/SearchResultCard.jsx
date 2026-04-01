import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchResultCard.css';

const SearchResultCard = ({ result }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${result.id}`);
  };

  return (
    <div className="search-result-card" onClick={handleClick}>
      <div className="result-image-container">
        <img src={result.image} alt={result.title} className="result-image" />
      </div>
      <div className="result-content">
        <h3 className="result-title">{result.title}</h3>
        <p className="result-description">{result.description}</p>
        <div className="result-meta">
          <span className="meta-badge category">{result.category}</span>
          <span className="meta-badge country">{result.country}</span>
        </div>
        <div className="result-stats">
          <span className="stat">
            <span className="stat-icon">👍</span>
            {result.likes || 0}
          </span>
          <span className="stat">
            <span className="stat-icon">💬</span>
            {result.comments || 0}
          </span>
          <span className="stat">
            <span className="stat-icon">👁️</span>
            {result.views || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
