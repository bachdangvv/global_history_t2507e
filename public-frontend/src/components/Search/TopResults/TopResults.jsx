import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTopArticles } from '../../../services/api';
import './TopResults.css';

const TopResults = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopArticles().then(setArticles);
  }, []);

  if (articles.length === 0) return null;

  const hero = articles[0];
  const rest = articles.slice(1);

  return (
    <section className="cr-top-section">
      <h2 className="cr-section-heading">Featured Articles</h2>

      {/* Hero Card */}
      <div className="cr-hero-card" onClick={() => navigate(`/article/${hero.id}`)}>
        <img src={hero.image} alt={hero.title} className="cr-hero-img" />
        <div className="cr-hero-gradient" />
        <div className="cr-hero-content">
          <span className="cr-badge">{hero.category}</span>
          <h3 className="cr-hero-title">{hero.title}</h3>
          <p className="cr-hero-desc">{hero.description}</p>
          <div className="cr-hero-stats">
            <span>👁️ {(hero.views / 1000).toFixed(1)}k</span>
            <span>❤️ {(hero.likes / 1000).toFixed(1)}k</span>
          </div>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="cr-thumb-strip">
        {rest.map((a) => (
          <div key={a.id} className="cr-thumb-card" onClick={() => navigate(`/article/${a.id}`)}>
            <div className="cr-thumb-img-wrap">
              <img src={a.image} alt={a.title} />
              <div className="cr-thumb-overlay" />
            </div>
            <div className="cr-thumb-info">
              <span className="cr-thumb-cat">{a.category}</span>
              <h4 className="cr-thumb-title">{a.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopResults;
