import React from 'react';
import { searchArticles } from '../../../mockData';
import './RelatedArticles.css';

const RelatedArticles = () => {
  // Get articles and group by category
  const groupedByCategory = searchArticles.reduce((acc, article) => {
    const category = article.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(article);
    return acc;
  }, {});

  // Get first category with multiple articles
  const categoryWithArticles = Object.entries(groupedByCategory).find(
    ([, articles]) => articles.length > 1
  );

  if (!categoryWithArticles) return null;

  const [category, articles] = categoryWithArticles;

  return (
    <div className="related-articles-container">
      <div className="related-articles-wrapper">
        <h2 className="section-title">Related by Category: {category}</h2>
        <p className="section-subtitle">Articles from different countries in the {category} category</p>

        <div className="articles-carousel">
          {articles.map((article) => (
            <div key={article.id} className="article-card">
              <div className="article-card-image">
                <img src={article.image} alt={article.title} />
                <div className="article-country-badge">{article.country}</div>
              </div>

              <div className="article-card-content">
                <h3 className="article-card-title">{article.title}</h3>
                <p className="article-card-description">
                  {article.description.substring(0, 100)}...
                </p>

                <div className="article-card-stats">
                  <span className="stat">👁️ {(article.views / 1000).toFixed(1)}k views</span>
                  <span className="stat">❤️ {(article.likes / 1000).toFixed(1)}k likes</span>
                </div>

                <button className="article-card-btn">Explore Article</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedArticles;
