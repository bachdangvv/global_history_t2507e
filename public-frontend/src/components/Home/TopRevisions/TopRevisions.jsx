import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopRevisions.css';

const TopRevisions = ({ recentArticles }) => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  
  const data = recentArticles;

  const scrollLeft = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.querySelector('.diff-card').offsetWidth;
      sliderRef.current.scrollBy({ left: -(cardWidth + 20), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.querySelector('.diff-card').offsetWidth;
      sliderRef.current.scrollBy({ left: cardWidth + 20, behavior: 'smooth' });
    }
  };

  if (!data || data.length === 0) return null;

  return (
    <div className="widget-container">
      <div className="section-header-with-sort">
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'Merriweather' }}>Recent Articles</h3>
      </div>
      
      <div className="revisions-slider-wrapper">
        <button className="slider-arrow overlay-left" onClick={scrollLeft} aria-label="Scroll left">&#10094;</button>
        
        <div className="revisions-slider" ref={sliderRef}>
          {data.map((item) => (
            <div 
              key={item.id} 
              className="diff-card" 
              style={{ display: 'flex', flexDirection: 'column', padding: '1rem', flex: '0 0 300px', cursor: 'pointer' }}
              onClick={() => navigate(`/article/${item.id}`)}
            >
              <div style={{ height: '140px', overflow: 'hidden', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{item.title}</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {item.summary || item.description}
              </p>
              
              <div className="diff-footer" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                <div className="author-info">
                  <div className="upvote-count">
                    <span className="upvote-arrow">❤️</span>
                    <span>{item.likeCount || 0}</span>
                  </div>
                  <div className="author-details">
                    <span className="author-name">{item.author || "Anonymous"}</span>
                  </div>
                </div>
                <div className="status-badge" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' }}>{item.category}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="slider-arrow overlay-right" onClick={scrollRight} aria-label="Scroll right">&#10095;</button>
      </div>
    </div>
  );
};

export default TopRevisions;
