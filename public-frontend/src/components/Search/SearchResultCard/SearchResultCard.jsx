import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchResultCard.css';

const SearchResultCard = ({ result }) => {
  const navigate = useNavigate();

  return (
    <div className="cr-result-card" onClick={() => navigate(`/article/${result.id}`)}>
      <div className="cr-result-img-wrap">
        <img src={result.image} alt={result.title} />
        <div className="cr-result-img-overlay" />
        <div className="cr-result-hover-stats">
          <span>👁️ {(result.views / 1000).toFixed(1)}k</span>
          <span>❤️ {(result.likes / 1000).toFixed(1)}k</span>
        </div>
      </div>
      <div className="cr-result-body">
        <div className="cr-result-badges">
          <span className="cr-result-badge cat">{result.category}</span>
          <span className="cr-result-badge country">{result.country}</span>
        </div>
        <h3 className="cr-result-title">{result.title}</h3>
      </div>
    </div>
  );
};

export default SearchResultCard;
