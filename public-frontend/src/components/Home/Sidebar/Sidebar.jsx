import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ data, sidebarOpen }) => {
  const navigate = useNavigate();

  if (!data || data.length === 0) return null;

  return (
    <aside className={`sidebar-container ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-section">
        <div className="sidebar-header-wrapper">
          <h3 className="sidebar-title">Topics & Collections</h3>
        </div>
        <nav className="sidebar-nav">
          {data.map((category, index) => (
            <div 
              key={`${category.id || category.name}-${index}`} 
              className="sidebar-topic-item"
              onClick={() => navigate(`/search?query=${encodeURIComponent(category.name)}`)}
            >
              <div className="topic-main">
                <span className="sidebar-icon">{category.icon || '📚'}</span>
                <span className="sidebar-name">{category.name}</span>
              </div>
              
              {/* Tooltip that appears on hover */}
              <div className="topic-tooltip">
                <p className="topic-desc">{category.description || `Explore historical articles and collections related to ${category.name}. Click to view all related records.`}</p>
                <div className="tooltip-action">View Articles &rarr;</div>
              </div>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
