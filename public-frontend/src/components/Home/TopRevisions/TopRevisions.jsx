import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopRevisions.css';

const TopRevisions = ({ recentEdits }) => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  
  const data = recentEdits;

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
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'Merriweather' }}>Recent Revisions</h3>
      </div>
      
      <div className="revisions-slider-wrapper">
        <button className="slider-arrow overlay-left" onClick={scrollLeft} aria-label="Scroll left">&#10094;</button>
        
        <div className="revisions-slider" ref={sliderRef}>
          {data.map((item) => (
            <div 
              key={item.id} 
              className="diff-card" 
              style={{ display: 'flex', flexDirection: 'column', padding: '1rem', flex: '0 0 300px', cursor: 'pointer' }}
              onClick={() => navigate(`/edits/${item.id}`)}
            >
              <div style={{ height: '140px', overflow: 'hidden', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                <img src={item.thumbnail || 'https://via.placeholder.com/300x140?text=Revision'} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{item.title}</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                <strong>Edit Summary:</strong> {item.summary || item.description || "No summary provided."}
              </p>
              
              <div className="diff-footer" style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                <div className="author-info">
                  <div className="upvote-count">
                    <span className="upvote-arrow">⬆️</span>
                    <span>{item.upvoteCount || 0}</span>
                  </div>
                  <div className="author-details">
                    <span className="author-name">{item.editorName || "Anonymous"}</span>
                  </div>
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', padding: '2px 6px', borderRadius: '4px', background: item.status === 'approved' ? '#e6f4ea' : item.status === 'rejected' ? '#fce8e6' : '#fff4e5', color: item.status === 'approved' ? '#137333' : item.status === 'rejected' ? '#c5221f' : '#b06000' }}>
                   {item.status}
                </div>
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
