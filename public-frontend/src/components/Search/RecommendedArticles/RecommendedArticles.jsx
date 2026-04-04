import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRecommendedArticles } from '../../../services/api';
import './RecommendedArticles.css';

const RecommendedArticles = () => {
  const [articles, setArticles] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecommendedArticles().then(setArticles);
  }, []);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  if (articles.length === 0) return null;

  return (
    <section className="cr-rec-section">
      <div className="cr-rec-header">
        <h2 className="cr-section-heading">You Might Also Like</h2>
        <div className="cr-rec-arrows">
          <button className="cr-arrow-btn" onClick={() => scroll('left')}>‹</button>
          <button className="cr-arrow-btn" onClick={() => scroll('right')}>›</button>
        </div>
      </div>

      <div className="cr-rec-scroll" ref={scrollRef}>
        {articles.map((a) => (
          <div key={a.id} className="cr-rec-card" onClick={() => navigate(`/article/${a.id}`)}>
            <div className="cr-rec-img-wrap">
              <img src={a.image} alt={a.title} />
              <div className="cr-rec-img-overlay" />
            </div>
            <div className="cr-rec-body">
              <span className="cr-rec-cat">{a.category}</span>
              <h4 className="cr-rec-title">{a.title}</h4>
              <div className="cr-rec-footer">
                <span>{a.country}</span>
                <span>❤️ {(a.likes / 1000).toFixed(1)}k</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedArticles;
