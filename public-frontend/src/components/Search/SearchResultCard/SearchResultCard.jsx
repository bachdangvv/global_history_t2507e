import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faBookmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import './SearchResultCard.css';

const SearchResultCard = ({ result }) => {
  const navigate = useNavigate();

  // Calculate rating based on likes and views
  const rating = Math.min(5, (result.likes / (result.views || 1)) * 10).toFixed(1);

  const handleCardClick = (e) => {
    navigate(`/article/${result.id}`);
  };

  return (
    <div className="cr-result-card" onClick={handleCardClick}>
      <div className="cr-result-img-wrap">
        <img src={result.image} alt={result.title} />
        
        {/* Hover Overlay */}
        <div className="cr-hover-overlay">
          <div className="cr-overlay-content">
            {/* Title */}
            <h2 className="cr-overlay-title">{result.title}</h2>

            {/* Rating and Meta */}
            <div className="cr-overlay-meta">
              <div className="cr-rating">
                <span className="cr-stars">★★★★★</span>
                <span className="cr-rating-num">{rating}</span>
              </div>
              <div className="cr-meta-tags">
                <span className="cr-meta-tag">{result.category}</span>
                <span className="cr-meta-tag">{result.country}</span>
              </div>
            </div>

            {/* Description */}
            <p className="cr-overlay-desc">{result.description || result.title}</p>

            {/* Stats */}
            <div className="cr-overlay-stats">
              <span>👁️ {(result.views / 1000).toFixed(1)}k views</span>
              <span>❤️ {(result.likes / 1000).toFixed(1)}k likes</span>
            </div>

            {/* Action Buttons */}
            <div className="cr-overlay-buttons">
              <button className="cr-btn-play" onClick={handleCardClick}>
                <FontAwesomeIcon icon={faPlay} /> Read Now
              </button>
              <button className="cr-btn-secondary">
                <FontAwesomeIcon icon={faBookmark} />
              </button>
              <button className="cr-btn-secondary">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </div>

        {/* Image Overlay Gradient */}
        <div className="cr-result-img-overlay" />
      </div>

      {/* Card Body (visible by default) */}
      <div className="cr-result-body">
        <h3 className="cr-result-title">{result.title}</h3>
        <div className="cr-result-badges">
          <span className="cr-result-badge cat">{result.category}</span>
          <span className="cr-result-badge country">{result.country}</span>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
