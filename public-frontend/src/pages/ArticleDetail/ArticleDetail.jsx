import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchArticleDetail, fetchUserArticleVote, toggleArticleVote, fetchComments, postComment, fetchRelatedBooks, fetchRelatedAuthors, fetchRelatedExhibitions, fetchArticleEdits } from '../../services/api';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import DOMPurify from 'dompurify';
import './ArticleDetail.css';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const { user } = useAuth();

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  // Edit History
  const [editHistory, setEditHistory] = useState([]);
  const [showEditHistory, setShowEditHistory] = useState(false);
  const [editHistoryPage, setEditHistoryPage] = useState(1);
  const editsPerPage = 5;

  // Vote state
  const [userVoteType, setUserVoteType] = useState(null); // 'like', 'dislike', or null
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  // Comments
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  // Related content
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [relatedAuthors, setRelatedAuthors] = useState([]);
  const [relatedExhibitions, setRelatedExhibitions] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchArticleDetail(id).then((data) => {
      if (data) {
        setArticle(data);
        setLikeCount(data.likes || 0);
        setDislikeCount(data.dislikes || 0);
      }
      setIsLoading(false);
    });

    if (user) {
      fetchUserArticleVote(id).then((type) => {
        setUserVoteType(type);
      });
    }

    fetchComments(id).then(setComments);
    fetchRelatedBooks(id).then(setRelatedBooks);
    fetchRelatedAuthors(id).then(setRelatedAuthors);
    fetchRelatedExhibitions(id).then(setRelatedExhibitions);
    fetchArticleEdits(id).then(setEditHistory);
  }, [id]);

  const handleVote = async (type) => {
    if (!user) {
      addNotification(`Please login to ${type} this article`, 'error');
      navigate('/login', { state: { from: location } });
      return;
    }

    const previousVote = userVoteType;
    const sameVote = previousVote === type;
    const newVote = sameVote ? null : type;

    // Optimistic UI updates
    setUserVoteType(newVote);

    if (type === 'like') {
      setLikeCount((c) => (sameVote ? c - 1 : c + 1));
      if (previousVote === 'dislike') setDislikeCount((c) => Math.max(0, c - 1));
    } else {
      setDislikeCount((c) => (sameVote ? c - 1 : c + 1));
      if (previousVote === 'like') setLikeCount((c) => Math.max(0, c - 1));
    }

    try {
      const res = await toggleArticleVote(id, type);
      if (res.action === 'voted') {
        addNotification(`You ${type}d this article!`, 'success');
      } else if (res.action === 'removed') {
        addNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} removed`, 'info');
      }
    } catch {
      // Revert on error
      setUserVoteType(previousVote);
      if (type === 'like') {
        setLikeCount((c) => (sameVote ? c + 1 : Math.max(0, c - 1)));
        if (previousVote === 'dislike') setDislikeCount((c) => c + 1);
      } else {
        setDislikeCount((c) => (sameVote ? c + 1 : Math.max(0, c - 1)));
        if (previousVote === 'like') setLikeCount((c) => c + 1);
      }
      addNotification(`Failed to ${type} article`, 'error');
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
      <div className="ad-hero" style={{ backgroundImage: `url(${article.image})` }}>
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
        <button className={`ad-stat-btn ${userVoteType === 'like' ? 'liked' : ''}`} onClick={() => handleVote('like')}>
          <span className="ad-stat-icon">{userVoteType === 'like' ? '👍' : '👍'}</span>
          <span className="ad-stat-label">Like</span>
          <span className="ad-stat-value">{likeCount.toLocaleString()}</span>
        </button>
        <button className={`ad-stat-btn ${userVoteType === 'dislike' ? 'disliked' : ''}`} onClick={() => handleVote('dislike')}>
          <span className="ad-stat-icon">{userVoteType === 'dislike' ? '👎' : '👎'}</span>
          <span className="ad-stat-label">Dislike</span>
          <span className="ad-stat-value">{dislikeCount.toLocaleString()}</span>
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
        <button 
          className="ad-stat-btn ad-edit-btn" 
          onClick={() => {
            if (!user) {
              addNotification('Please login to edit this article.', 'error');
              navigate('/login', { state: { from: `/articles/${id}/edit` } });
              return;
            }
            navigate(`/articles/${id}/edit`);
          }}
        >
          <span className="ad-stat-icon">✏️</span>
          <span className="ad-stat-label">Edit</span>
        </button>
      </div>

      {/* ── Edit History Section ──────────── */}
      <div className="ad-edit-history-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', marginBottom: '20px' }}>
        <button 
          className="ad-btn"
          style={{ width: 'fit-content', minWidth: '200px', padding: '10px 20px', background: '#f5f3f1', border: '1px solid #d0ccc3', borderRadius: '20px', cursor: 'pointer', fontWeight: '600', color: '#5a4d41', transition: 'background 0.2s' }}
          onClick={() => setShowEditHistory(!showEditHistory)}
        >
          {showEditHistory ? "Hide Edit History" : `View Edit History (${editHistory.length})`}
        </button>

        {showEditHistory && (
          <div className="ad-edit-history-section" style={{ width: '100%', marginTop: '16px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '20px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', color: 'var(--text-heading)' }}>Edit History</h3>
            {editHistory.length === 0 ? (
               <p style={{ color: '#888', fontStyle: 'italic', margin: 0 }}>No edits have been proposed yet.</p>
            ) : (
              <div className="ad-edit-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {editHistory.slice((editHistoryPage - 1) * editsPerPage, editHistoryPage * editsPerPage).map(edit => (
                  <Link to={`/edits/${edit.id}`} key={edit.id} className="ad-edit-card" style={{ display: 'block', padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px', textDecoration: 'none', color: 'inherit', transition: 'border-color 0.2s', background: '#faf9f5' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-heading)' }}>{edit.title}</h4>
                      <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', padding: '4px 8px', borderRadius: '4px', background: edit.status === 'approved' ? '#e6f4ea' : edit.status === 'rejected' ? '#fce8e6' : '#fff4e5', color: edit.status === 'approved' ? '#137333' : edit.status === 'rejected' ? '#c5221f' : '#b06000' }}>{edit.status}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: '#666' }}>
                      <span><strong>By</strong> {edit.editorName || 'Unknown'}</span>
                      <span><strong>Submitted</strong> {new Date(edit.createdAt).toLocaleDateString()}</span>
                      <span>👍 {edit.upvoteCount || 0} 👎 {edit.downvoteCount || 0}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {editHistory.length > editsPerPage && (
              <div className="ad-pagination" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '20px' }}>
                <button 
                  disabled={editHistoryPage === 1} 
                  onClick={() => setEditHistoryPage(p => p - 1)}
                  style={{ padding: '8px 16px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: editHistoryPage === 1 ? 'not-allowed' : 'pointer', opacity: editHistoryPage === 1 ? 0.5 : 1 }}
                >&laquo; Prev</button>
                <span style={{ fontSize: '0.9rem', color: '#555' }}>Page {editHistoryPage} of {Math.ceil(editHistory.length / editsPerPage)}</span>
                <button 
                  disabled={editHistoryPage === Math.ceil(editHistory.length / editsPerPage)} 
                  onClick={() => setEditHistoryPage(p => p + 1)}
                  style={{ padding: '8px 16px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: editHistoryPage === Math.ceil(editHistory.length / editsPerPage) ? 'not-allowed' : 'pointer', opacity: editHistoryPage === Math.ceil(editHistory.length / editsPerPage) ? 0.5 : 1 }}
                >Next &raquo;</button>
              </div>
            )}
          </div>
        )}
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
            {article.content && (
              // Detect HTML content from Quill vs legacy markdown
              (article.content.includes('<p>') || article.content.includes('<h') || article.content.includes('<ul>') || article.content.includes('<li>')) 
              ? (
                <div 
                  className="ad-html-content"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content.replace(/&nbsp;/g, ' ')) }} 
                />
              ) : (
                article.content.split('\n').map((para, i) => {
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
                })
              )
            )}
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

      {/* ── Related Books Section ──────────────── */}
      {relatedBooks && relatedBooks.length > 0 && (
        <div className="ad-related-section">
          <div className="ad-related-container">
            <h2 className="ad-related-title">📚 Related Books</h2>
            <div className="ad-related-grid">
              {relatedBooks.map((book) => (
                <div key={book.id} className="ad-related-card">
                  {book.coverImage && (
                    <div className="ad-related-image">
                      <img src={book.coverImage} alt={book.title} />
                    </div>
                  )}
                  <div className="ad-related-content">
                    <h4 className="ad-related-item-title">{book.title}</h4>
                    {book.author && <p className="ad-related-author">by {book.author}</p>}
                    {book.description && <p className="ad-related-item-desc">{book.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Related Authors Section ──────────────── */}
      {relatedAuthors && relatedAuthors.length > 0 && (
        <div className="ad-related-section">
          <div className="ad-related-container">
            <h2 className="ad-related-title">✍️ Related Authors</h2>
            <div className="ad-related-grid">
              {relatedAuthors.map((author) => (
                <div key={author.id} className="ad-related-card">
                  {author.profileImage && (
                    <div className="ad-related-image">
                      <img src={author.profileImage} alt={author.name} />
                    </div>
                  )}
                  <div className="ad-related-content">
                    <h4 className="ad-related-item-title">{author.name}</h4>
                    {author.specialty && <p className="ad-related-author">{author.specialty}</p>}
                    {author.biography && <p className="ad-related-item-desc">{author.biography}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Related Exhibitions Section ──────────────── */}
      {relatedExhibitions && relatedExhibitions.length > 0 && (
        <div className="ad-related-section">
          <div className="ad-related-container">
            <h2 className="ad-related-title">🏛️ Related Exhibitions</h2>
            <div className="ad-related-grid">
              {relatedExhibitions.map((exhibition) => (
                <div key={exhibition.id} className="ad-related-card">
                  {exhibition.image && (
                    <div className="ad-related-image">
                      <img src={exhibition.image} alt={exhibition.title} />
                    </div>
                  )}
                  <div className="ad-related-content">
                    <h4 className="ad-related-item-title">{exhibition.title}</h4>
                    {exhibition.venue && <p className="ad-related-author">{exhibition.venue}</p>}
                    {exhibition.description && <p className="ad-related-item-desc">{exhibition.description}</p>}
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

export default ArticleDetail;
