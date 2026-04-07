import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ data, books = [], authors = [], exhibitions = [], sidebarOpen }) => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({
    topics: true,
    books: false,
    authors: false,
    exhibitions: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderSection = (title, items, sectionKey, iconMap = {}) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="sidebar-section">
        <div className="sidebar-header-wrapper">
          <button 
            className="sidebar-title-btn"
            onClick={() => toggleSection(sectionKey)}
          >
            <span className="sidebar-toggle-icon">
              {expandedSections[sectionKey] ? '▼' : '▶'}
            </span>
            <h3 className="sidebar-title">{title}</h3>
          </button>
        </div>
        {expandedSections[sectionKey] && (
          <nav className="sidebar-nav">
            {items.map((item, index) => (
              <div 
                key={`${item.id || item.name}-${index}`} 
                className="sidebar-item"
                onClick={() => navigate(`/search?query=${encodeURIComponent(item.name || item.title)}`)}
              >
                <div className="item-main">
                  <span className="sidebar-icon">{iconMap[item.name] || item.icon || '📚'}</span>
                  <span className="sidebar-name">{item.name || item.title}</span>
                </div>
                
                {/* Tooltip that appears on hover */}
                <div className="item-tooltip">
                  <p className="item-desc">{item.description || `Learn more about ${item.name || item.title}`}</p>
                  <div className="tooltip-action">View &rarr;</div>
                </div>
              </div>
            ))}
          </nav>
        )}
      </div>
    );
  };

  const topicIcons = {
    'History': '📖',
    'Biography': '👤',
    'Culture': '🎭',
    'Politics': '🏛️',
    'Military': '⚔️',
    'Science': '🔬',
    'Art': '🎨',
    'Economy': '💰',
  };

  const bookIcons = {
    'Fiction': '📕',
    'Non-Fiction': '📗',
    'History': '📙',
    'Biography': '📘',
  };

  const authorIcons = {
    'Historian': '✍️',
    'Writer': '✍️',
    'Scholar': '🧑‍🎓',
  };

  const exhibitionIcons = {
    'Museum': '🏛️',
    'Gallery': '🖼️',
    'Exhibition': '📸',
  };

  return (
    <aside className={`sidebar-container ${sidebarOpen ? 'open' : ''}`}>
      {renderSection('Topics & Collections', data, 'topics', topicIcons)}
      {renderSection('📚 Books', books, 'books', bookIcons)}
      {renderSection('✍️ Authors', authors, 'authors', authorIcons)}
      {renderSection('🏛️ Exhibitions', exhibitions, 'exhibitions', exhibitionIcons)}
    </aside>
  );
};

export default Sidebar;
