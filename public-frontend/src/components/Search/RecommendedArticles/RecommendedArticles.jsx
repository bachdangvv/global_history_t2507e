import React from 'react';
import { searchArticles } from '../../../mockData';
import './RecommendedArticles.css';

const RecommendedArticles = () => {
  // Get a mix of articles - recommendations based on various criteria
  const recommended = searchArticles
    .slice(0, -1)
    .reverse()
    .slice(0, 6);

  return (
    <div className="recommended-articles-container">
      <div className="recommended-articles-wrapper">
        <h2 className="section-title">Recommended For You</h2>
        <p className="section-subtitle">Discover articles you might find interesting</p>

        <div className="recommended-grid">
          {recommended.map((article) => (
            <div key={article.id} className="recommended-card">
              <div className="recommended-image-wrapper">
                <img src={article.image} alt={article.title} />
                <div className="recommended-overlay">
                  <button className="recommended-read-btn">Read Now</button>
                </div>
              </div>

              <div className="recommended-content">
                <div className="recommended-meta">
                  <span className="meta-category">{article.category}</span>
                  <span className="meta-views">👁️ {(article.views / 1000).toFixed(1)}k</span>
                </div>

                <h3 className="recommended-title">{article.title}</h3>

                <p className="recommended-description">
                  {article.description.substring(0, 85)}...
                </p>

                <div className="recommended-footer">
                  <span className="country">{article.country}</span>
                  <span className="likes">❤️ {(article.likes / 1000).toFixed(1)}k</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedArticles;
