import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchArticleDetail, toggleArticleLike, fetchComments, postComment } from '../../services/api';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import './ArticleDetail.css';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const { user } = useAuth();

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  // Like state
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Comments
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchArticleDetail(id).then((data) => {
      if (data) {
        setArticle(data);
        setLikeCount(data.likes || 0);
      }
      setIsLoading(false);
    });

    fetchComments(id).then(setComments);
  }, [id]);

  const handleLike = async () => {
    if (!user) {
      addNotification('Please login to like this article', 'error');
      navigate('/login', { state: { from: location }});
      return;
    }

    const prev = liked;
    setLiked(!prev);
    setLikeCount((c) => (prev ? c - 1 : c + 1));

    try {
      const res = await toggleArticleLike(id);
      if (res.likeCount !== null) setLikeCount(res.likeCount);
      addNotification(prev ? 'Like removed' : 'You liked this article! ❤️', 'success');
    } catch {
      setLiked(prev);
      setLikeCount((c) => (prev ? c + 1 : c - 1));
      addNotification('Failed to update like', 'error');
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    setSubmittingComment(true);
    try {
      const newComment = await postComment(id, {
        content: commentContent.trim(),
      });
      setComments((prev) => [newComment, ...prev]);
      setCommentContent('');
      addNotification('Comment posted successfully! 💬', 'success');
    } catch {
      addNotification('Failed to post comment', 'error');
    } finally {
      setSubmittingComment(false);
    }
  };

  if (isLoading) {
    return (
      <div className="ad-page">
        <div className="ad-loading">
          <div className="ad-loading-spinner" />
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="ad-page">
        <div className="ad-error">
          <h2>Article not found</h2>
          <button className="ad-back-btn" onClick={() => navigate('/search')}>
            ← Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ad-page">
      {/* ── Hero Banner ──────────────── */}
      <div className="ad-hero">
        <img src={article.image} alt={article.title} className="ad-hero-img" />
        <div className="ad-hero-gradient" />
        <div className="ad-hero-content">
          <button className="ad-back-btn" onClick={() => navigate(-1)}>← Back</button>
          <div className="ad-hero-badges">
            <span className="ad-badge cat">{article.category}</span>
            <span className="ad-badge country">{article.country}</span>
          </div>
          <h1 className="ad-hero-title">{article.title}</h1>
          <div className="ad-hero-meta">
            {article.author && <span><strong>By</strong> {article.author}</span>}
            {article.publishDate && (
              <span><strong>Published</strong> {new Date(article.publishDate).toLocaleDateString()}</span>
            )}
            {article.lastUpdated && (
              <span><strong>Updated</strong> {new Date(article.lastUpdated).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Stats Bar ────────────────── */}
      <div className="ad-stats-bar">
        <button className={`ad-stat-btn ${liked ? 'liked' : ''}`} onClick={handleLike}>
          <span className="ad-stat-icon">{liked ? '❤️' : '🤍'}</span>
          <span className="ad-stat-label">Like</span>
          <span className="ad-stat-value">{likeCount.toLocaleString()}</span>
        </button>
        <div className="ad-stat">
          <span className="ad-stat-icon">💬</span>
          <span className="ad-stat-label">Comments</span>
          <span className="ad-stat-value">{comments.length || article.comments || 0}</span>
        </div>
        <div className="ad-stat">
          <span className="ad-stat-icon">👁️</span>
          <span className="ad-stat-label">Views</span>
          <span className="ad-stat-value">{(article.views || 0).toLocaleString()}</span>
        </div>
      </div>

      {/* ── Content ──────────────────── */}
      <div className="ad-content-wrapper">
        {/* TOC Sidebar */}
        {article.sections && article.sections.length > 0 && (
          <aside className="ad-toc">
            <div className="ad-toc-title">Contents</div>
            <nav className="ad-toc-nav">
              {article.sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`ad-toc-link ${activeSection === s.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(s.id);
                    document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="ad-main">
          {article.description && (
            <div className="ad-description">
              <p>{article.description}</p>
            </div>
          )}

          <div className="ad-body">
            {article.content && article.content.split('\n').map((para, i) => {
              if (para.startsWith('## ')) {
                const text = para.replace('## ', '').trim();
                const sId = text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                return <h2 key={i} id={sId} className="ad-section-heading">{text}</h2>;
              }
              if (para.startsWith('### ')) {
                const text = para.replace('### ', '').trim();
                return <h3 key={i} className="ad-sub-heading">{text}</h3>;
              }
              if (para.startsWith('- ')) {
                return (
                  <ul key={i} className="ad-list">
                    {para.split('\n').map((item, j) =>
                      item.startsWith('- ') ? <li key={j}>{item.replace('- ', '').trim()}</li> : null
                    )}
                  </ul>
                );
              }
              if (para.trim()) {
                return <p key={i} className="ad-paragraph">{para.trim()}</p>;
              }
              return null;
            })}
          </div>
        </main>
      </div>

      {/* ── Comment Section ──────────── */}
      <div className="ad-comments-section">
        <h2 className="ad-comments-title">Comments ({comments.length})</h2>

        {user ? (
          <form className="ad-comment-form" onSubmit={handleComment}>
            <textarea
              className="ad-comment-textarea"
              placeholder="Write a comment..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              rows={3}
              required
            />
            <button type="submit" className="ad-comment-submit" disabled={submittingComment}>
              {submittingComment ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        ) : (
          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', textAlign: 'center', marginBottom: '2rem' }}>
            <p>Please <a href="/login" style={{ color: 'var(--primary-color)' }}>login</a> to join the discussion.</p>
          </div>
        )}

        <div className="ad-comments-list">
          {comments.length === 0 ? (
            <p className="ad-no-comments">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="ad-comment">
                <div className="ad-comment-avatar">
                  {(c.username || 'A').charAt(0).toUpperCase()}
                </div>
                <div className="ad-comment-body">
                  <div className="ad-comment-header">
                    <span className="ad-comment-name">{c.username || 'Anonymous'}</span>
                    <span className="ad-comment-time">
                      {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'Just now'}
                    </span>
                  </div>
                  <p className="ad-comment-text">{c.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
