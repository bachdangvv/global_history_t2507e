import React, { useState } from 'react';
import { searchArticles } from '../../../mockData';
import './TopResults.css';

const TopResults = () => {
  const [hoveredId, setHoveredId] = useState(null);

  // Get top 5 articles by views
  const topResults = searchArticles.slice(0, 5);

  return (
    <div className="top-results-container">
      <div className="top-results-wrapper">
        <h2 className="section-title">Featured Articles</h2>
        <div className="top-results-grid">
          {topResults.map((article) => (
            <div
              key={article.id}
              className="top-result-card"
              onMouseEnter={() => setHoveredId(article.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="card-image-container">
                <img src={article.image} alt={article.title} className="card-image" />
                <div className="image-overlay"></div>
              </div>

              {hoveredId === article.id && (
                <div className="card-content-overlay">
                  <h3 className="card-title">{article.title}</h3>
                  <p className="card-description">{article.description}</p>
                  <div className="card-meta">
                    <span className="card-category">{article.category}</span>
                    <span className="card-country">{article.country}</span>
                    <span className="card-rating">⭐ {(article.likes / 1000).toFixed(1)}k</span>
                  </div>
                  <button className="card-read-btn">Read Full History</button>
                </div>
              )}

              {hoveredId !== article.id && (
                <div className="card-peek">
                  <span className="peek-icon">→</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopResults;
