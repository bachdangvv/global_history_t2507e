import React, { useState, useRef } from 'react';
import './TopRevisions.css';

const TopRevisions = ({ topUpvoteData, recentData }) => {
  const [activeSort, setActiveSort] = useState('top_upvote');
  const sliderRef = useRef(null);
  
  const data = activeSort === 'top_upvote' ? topUpvoteData : recentData;

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
        <div className="sort-tabs">
          <button 
            className={`sort-tab ${activeSort === 'top_upvote' ? 'active' : ''}`}
            onClick={() => setActiveSort('top_upvote')}
          >
            Top Upvote
          </button>
          <button 
            className={`sort-tab ${activeSort === 'recent' ? 'active' : ''}`}
            onClick={() => setActiveSort('recent')}
          >
            Recent Revision
          </button>
        </div>
      </div>
      
      <div className="revisions-slider-wrapper">
        <button className="slider-arrow overlay-left" onClick={scrollLeft} aria-label="Scroll left">&#10094;</button>
        
        <div className="revisions-slider" ref={sliderRef}>
          {data.map((item) => (
            <div key={item.id} className="diff-card">
              <div className="diff-content">
                {item.diff.map((line, index) => {
                  let lineClass = 'diff-line';
                  if (line.type === 'added') lineClass += ' diff-added';
                  if (line.type === 'removed') lineClass += ' diff-removed';
                  
                  return (
                    <div key={index} className={lineClass}>
                      <span className="diff-num">{index + 1}</span>
                      <span className="diff-text">{line.text}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="diff-footer">
                <div className="author-info">
                  <div className="upvote-count">
                    <span className="upvote-arrow">▲</span>
                    <span>{item.upvote_count}</span>
                  </div>
                  <img src={item.author.avatar} alt="Author" className="author-avatar" />
                  <div className="author-details">
                    <span className="diff-article-title">{item.articleTitle}</span>
                    <span className="author-name">{item.author.username}</span>
                  </div>
                </div>
                <div className="status-badge">{item.status}</div>
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
