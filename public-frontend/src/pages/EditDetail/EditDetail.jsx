import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEditDetail, fetchUserEditVote, toggleEditVote } from '../../services/api';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import DOMPurify from 'dompurify';
import './EditDetail.css';

const EditDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const { user } = useAuth();

  const [edit, setEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vote state
  const [userVoteType, setUserVoteType] = useState(null); // 'upvote', 'downvote', or null
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [downvoteCount, setDownvoteCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetchEditDetail(id).then((data) => {
      if (data) {
        setEdit(data);
        setUpvoteCount(data.upvoteCount || 0);
        setDownvoteCount(data.downvoteCount || 0);
      }
      setIsLoading(false);
    });

    if (user) {
      fetchUserEditVote(id).then((type) => {
        setUserVoteType(type);
      });
    }
  }, [id, user]);

  const handleVote = async (type) => { // 'upvote' or 'downvote'
    if (!user) {
      addNotification(`Please login to ${type} this edit`, 'error');
      navigate('/login', { state: { from: `/edits/${id}` } });
      return;
    }

    const previousVote = userVoteType;
    const sameVote = previousVote === type;
    const newVote = sameVote ? null : type;

    // Optimistic UI updates
    setUserVoteType(newVote);

    if (type === 'upvote') {
      setUpvoteCount((c) => (sameVote ? Math.max(0, c - 1) : c + 1));
      if (previousVote === 'downvote') setDownvoteCount((c) => Math.max(0, c - 1));
    } else {
      setDownvoteCount((c) => (sameVote ? Math.max(0, c - 1) : c + 1));
      if (previousVote === 'upvote') setUpvoteCount((c) => Math.max(0, c - 1));
    }

    try {
      const res = await toggleEditVote(id, type);
      if (res.action === 'voted') {
        addNotification(`You ${type}d this edit!`, 'success');
      } else if (res.action === 'removed') {
        addNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} removed`, 'info');
      }
    } catch {
      // Revert on error
      setUserVoteType(previousVote);
      if (type === 'upvote') {
        setUpvoteCount((c) => (sameVote ? c + 1 : Math.max(0, c - 1)));
        if (previousVote === 'downvote') setDownvoteCount((c) => c + 1);
      } else {
        setDownvoteCount((c) => (sameVote ? c + 1 : Math.max(0, c - 1)));
        if (previousVote === 'upvote') setUpvoteCount((c) => c + 1);
      }
      addNotification(`Failed to ${type} edit`, 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="ad-page">
        <div className="ad-loading">
          <div className="ad-loading-spinner" />
          <p>Loading edit detail...</p>
        </div>
      </div>
    );
  }

  if (!edit) {
    return (
      <div className="ad-page">
        <div className="ad-error">
          <h2>Edit not found</h2>
          <button className="ad-back-btn" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ad-page">
      {/* ── Hero Banner ──────────────── */}
      <div className="ad-hero" style={{ backgroundImage: `url(${edit.thumbnail || 'https://via.placeholder.com/1200x400?text=No+Image'})` }}>
        <div className="ad-hero-gradient" />
        <div className="ad-hero-content">
          <button className="ad-back-btn" onClick={() => navigate(-1)}>← Back</button>
          
          <div className="ad-hero-badges">
            <span className={`ad-badge cat`} style={{
               background: edit.status === 'approved' ? '#e6f4ea' : edit.status === 'rejected' ? '#fce8e6' : '#fff4e5',
               color: edit.status === 'approved' ? '#137333' : edit.status === 'rejected' ? '#c5221f' : '#b06000'
            }}>
              {edit.status.charAt(0).toUpperCase() + edit.status.slice(1)}
            </span>
          </div>

          <h1 className="ad-hero-title">{edit.title}</h1>
          <div className="ad-hero-meta">
            <span><strong>Proposed By</strong> {edit.editorName || 'Unknown'}</span>
            <span><strong>Target</strong> {edit.editableType} {edit.editableId}</span>
            {edit.createdAt && (
              <span><strong>Submitted</strong> {new Date(edit.createdAt).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Stats Bar ────────────────── */}
      <div className="ad-stats-bar">
        <button className={`ad-stat-btn ${userVoteType === 'upvote' ? 'liked' : ''}`} onClick={() => handleVote('upvote')}>
          <span className="ad-stat-icon">⬆️</span>
          <span className="ad-stat-label">Upvote</span>
          <span className="ad-stat-value">{upvoteCount.toLocaleString()}</span>
        </button>
        <button className={`ad-stat-btn ${userVoteType === 'downvote' ? 'disliked' : ''}`} onClick={() => handleVote('downvote')}>
          <span className="ad-stat-icon">⬇️</span>
          <span className="ad-stat-label">Downvote</span>
          <span className="ad-stat-value">{downvoteCount.toLocaleString()}</span>
        </button>
      </div>

      {/* ── Content ──────────────────── */}
      <div className="ad-content-wrapper">
        <main className="ad-main" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Edit Summary section prominent */}
          <div className="edit-summary-box" style={{ background: '#f5f3f1', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #5a4d41', marginBottom: '30px' }}>
             <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#333' }}>Edit Summary</h3>
             <p style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>{edit.summary || 'No summary provided.'}</p>
          </div>

          <div className="ad-body">
            {edit.content && (
              (edit.content.includes('<p>') || edit.content.includes('<h') || edit.content.includes('<ul>') || edit.content.includes('<li>')) 
              ? (
                <div 
                  className="ad-html-content"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(edit.content.replace(/&nbsp;/g, ' ')) }} 
                />
              ) : (
                edit.content.split('\n').map((para, i) => {
                  if (para.startsWith('## ')) {
                    return <h2 key={i} className="ad-section-heading">{para.replace('## ', '').trim()}</h2>;
                  }
                  if (para.startsWith('### ')) {
                    return <h3 key={i} className="ad-sub-heading">{para.replace('### ', '').trim()}</h3>;
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
    </div>
  );
};

export default EditDetail;
