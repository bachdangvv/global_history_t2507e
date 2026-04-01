import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { articleDetails } from '../../articleData';
import './ArticleDetail.css';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundArticle = articleDetails[parseInt(id)];
      if (foundArticle) {
        setArticle(foundArticle);
      }
      setIsLoading(false);
    }, 300);
  }, [id]);

  if (isLoading) {
    return (
      <div className="article-detail-container">
        <div className="loading">Loading article...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-detail-container">
        <div className="error">
          <h2>Article not found</h2>
          <button className="btn-back" onClick={() => navigate('/search')}>
            ← Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="article-detail-container">
      <button className="btn-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Header Section */}
      <div className="article-header">
        <div className="article-title-section">
          <h1 className="article-title">{article.title}</h1>
          <div className="article-meta">
            <span className="meta-item">
              <strong>Author:</strong> {article.author}
            </span>
            <span className="meta-item">
              <strong>Published:</strong> {new Date(article.publishDate).toLocaleDateString()}
            </span>
            <span className="meta-item">
              <strong>Updated:</strong> {new Date(article.lastUpdated).toLocaleDateString()}
            </span>
          </div>
          <div className="article-badges">
            <span className="badge category">{article.category}</span>
            <span className="badge country">{article.country}</span>
          </div>
        </div>
        <div className="article-featured-image">
          <img src={article.image} alt={article.title} />
        </div>
      </div>

      {/* Stats Section */}
      <div className="article-stats">
        <div className="stat-item">
          <span className="stat-icon">👍</span>
          <span className="stat-label">Likes</span>
          <span className="stat-value">{article.likes?.toLocaleString() || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">💬</span>
          <span className="stat-label">Comments</span>
          <span className="stat-value">{article.comments?.toLocaleString() || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">👁️</span>
          <span className="stat-label">Views</span>
          <span className="stat-value">{article.views?.toLocaleString() || 0}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="article-content-wrapper">
        {/* Table of Contents */}
        <aside className="article-toc">
          <div className="toc-title">Contents</div>
          <nav className="toc-nav">
            {article.sections && article.sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`toc-link ${activeSection === section.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(section.id);
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Article Content */}
        <main className="article-main-content">
          <div className="article-description">
            <p>{article.description}</p>
          </div>

          <div className="article-body">
            {article.content.split('\n').map((paragraph, index) => {
              // Handle headers
              if (paragraph.startsWith('## ')) {
                const headerText = paragraph.replace('## ', '').trim();
                const sectionId = headerText.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                return (
                  <h2 key={index} id={sectionId} className="article-section-heading">
                    {headerText}
                  </h2>
                );
              }

              // Handle bullet points
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={index} className="article-list">
                    {paragraph.split('\n').map((item, itemIndex) => (
                      item.startsWith('- ') && (
                        <li key={itemIndex}>{item.replace('- ', '').trim()}</li>
                      )
                    ))}
                  </ul>
                );
              }

              // Regular paragraphs
              if (paragraph.trim()) {
                return (
                  <p key={index} className="article-paragraph">
                    {paragraph.trim()}
                  </p>
                );
              }

              return null;
            })}
          </div>
        </main>
      </div>

      {/* Action Buttons */}
      <div className="article-actions">
        <button className="action-btn like-btn">
          <span className="icon">👍</span> Like this article
        </button>
        <button className="action-btn comment-btn">
          <span className="icon">💬</span> Add a comment
        </button>
        <button className="action-btn edit-btn">
          <span className="icon">✏️</span> Suggest an edit
        </button>
      </div>
    </div>
  );
};

export default ArticleDetail;
