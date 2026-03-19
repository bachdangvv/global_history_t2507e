import React from 'react';
import './RecentRevisions.css';

const RecentRevisions = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="widget-container">
      <div className="widget-header">
        <h3>Recent Revision</h3>
        <span className="subtitle-vi">Xem thêm</span>
      </div>
      
      <div className="recent-revisions-list">
        {data.map((revision, index) => (
          <div key={`${revision.id}-${index}`} className="revision-timeline-item">
            <div className="timeline-marker">
              <img 
                src="https://i.pravatar.cc/150?u=1" 
                alt="Avatar" 
                className="timeline-avatar" 
              />
              {index < data.length - 1 && <div className="timeline-line"></div>}
            </div>
            
            <div className="timeline-content">
              <div className="timeline-text">
                <span className="timeline-author">{revision.author}</span>
                <span className="timeline-action"> {revision.action} </span>
                <span className="timeline-title">{revision.title}</span>
              </div>
              <div className="timeline-time">user edits ago • {revision.timeAgo}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentRevisions;
