import React from 'react';
import './TopArticle.css';

const TopArticle = ({ data }) => {
  if (!data) return null;

  // Calculate ratio
  const totalVotes = data.like_count + data.dislike_count;
  const likeRatio = totalVotes === 0 ? 50 : (data.like_count / totalVotes) * 100;

  return (
    <div className="widget-container">
      <div className="widget-header">
        <h3>Top Like Article</h3>
        <span className="subtitle-vi">Xem thêm</span>
      </div>
      
      <div className="article-card">
        <div className="article-content-wrapper">
          <img src={data.image} alt={data.title} className="article-image" />
          <div className="article-info">
            <h4 className="article-title">{data.title}</h4>
            <p className="article-summary">{data.summary}</p>
            
            <div className="vote-section">
              <div className="vote-bar-container">
                <div 
                  className="vote-bar-likes" 
                  style={{ width: `${likeRatio}%` }}
                ></div>
              </div>
              <div className="vote-stats">
                <span className="voter-ratio-label">Voter ratio</span>
                <span className="like-dislike-label">Like:Dislike</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopArticle;
