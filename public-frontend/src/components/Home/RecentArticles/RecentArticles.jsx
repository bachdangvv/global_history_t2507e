import React from 'react';
import './RecentArticles.css';

const RecentArticles = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="widget-container">
      <div className="widget-header">
        <h3>Bài viết mới nhất</h3>
        <span className="subtitle-vi">Xem thêm</span>
      </div>
      
      <div className="recent-articles-list">
        {data.map((article, index) => (
          <div key={`${article.id}-${index}`} className="recent-article-item">
            <img src={article.image} alt={article.title} className="recent-article-image" />
            <div className="recent-article-info">
              <h4 className="recent-article-title">{article.title}</h4>
              <p className="recent-article-summary">{article.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentArticles;
