import React from 'react';
import './TopRevisions.css';

const TopRevisions = ({ data }) => {
  if (!data) return null;

  return (
    <div className="widget-container">
      <div className="widget-header">
        <h3>Chỉnh sửa được yêu thích</h3>
        <span className="subtitle-vi">Xem thêm</span>
      </div>
      
      <div className="diff-card">
        <div className="diff-content">
          {data.diff.map((line, index) => {
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
              <span>{data.upvote_count}</span>
            </div>
            <img src={data.author.avatar} alt="Author" className="author-avatar" />
            <span className="author-name">{data.author.username}</span>
          </div>
          <div className="status-badge">{data.status}</div>
        </div>
      </div>
    </div>
  );
};

export default TopRevisions;
