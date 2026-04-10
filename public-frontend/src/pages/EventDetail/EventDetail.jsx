import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEventDetail } from '../../services/api';
import './EventDetail.css';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchEventDetail(id)
      .then((data) => {
        setEvent(data);
        setIsLoading(false);
      })
      .catch(() => {
        setEvent(null);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="ed-page">
        <div className="ed-loading">
          <div className="ed-loading-spinner" />
          <p>Loading event...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="ed-page">
        <div className="ed-error">
          <h2>Event not found</h2>
          <button className="ed-back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
      </div>
    );
  }

  const articles = event.articles || [];

  return (
    <div className="ed-page">
      {/* ── Hero Banner ──────────────── */}
      <div 
        className="ed-hero" 
        style={{ backgroundImage: `url(${event.imageUrl || 'https://via.placeholder.com/1200x600?text=Historical+Event'})` }}
      >
        <div className="ed-hero-gradient" />
        <div className="ed-hero-content">
          <button className="ed-back-btn" onClick={() => navigate(-1)}>← Back</button>
          <div className="ed-hero-badges">
            <span className="ed-badge year">{event.eventYear || 'Unknown Year'}</span>
            {event.eventDate && (
              <span className="ed-badge date">{new Date(event.eventDate).toLocaleDateString()}</span>
            )}
          </div>
          <h1 className="ed-hero-title">{event.title}</h1>
        </div>
      </div>

      {/* ── Stats Bar ────────────────── */}
      <div className="ed-stats-bar">
        <div className="ed-stat">
          <span className="ed-stat-icon">👁️</span>
          <span className="ed-stat-label">Views</span>
          <span className="ed-stat-value">{(event.viewCount || 0).toLocaleString()}</span>
        </div>
        <div className="ed-stat">
          <span className="ed-stat-icon">📄</span>
          <span className="ed-stat-label">Connected Articles</span>
          <span className="ed-stat-value">{articles.length}</span>
        </div>
      </div>

      {/* ── Content ──────────────────── */}
      <div className="ed-content-wrapper">
        <main className="ed-main">
          {event.summary && (
            <div className="ed-description">
              <p>{event.summary}</p>
            </div>
          )}
        </main>
      </div>

      {/* ── Connected Articles Grid ──────────────── */}
      {articles.length > 0 && (
        <div className="ed-related-section">
          <div className="ed-related-container">
            <h2 className="ed-related-title">📄 Connected Articles</h2>
            <div className="ed-related-grid">
              {articles.map((article) => (
                <div 
                  key={article.id} 
                  className="ed-related-card"
                  onClick={() => navigate(`/article/${article.id}`)}
                >
                  <div className="ed-related-image">
                    <img src={article.image || article.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'} alt={article.title} />
                  </div>
                  <div className="ed-related-content">
                    <div style={{display: 'flex', gap: '8px', marginBottom: '8px'}}>
                      <span className="ed-mini-badge">{article.category || article.categoryName || 'Article'}</span>
                    </div>
                    <h4 className="ed-related-item-title">{article.title}</h4>
                    {article.authorName && <p className="ed-related-author">by {article.authorName}</p>}
                    {article.summary && <p className="ed-related-item-desc">{article.summary}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;
