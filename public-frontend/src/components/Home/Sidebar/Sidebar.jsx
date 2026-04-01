import React from 'react';
import './Sidebar.css';

const Sidebar = ({ data, sidebarOpen }) => {
  if (!data || data.length === 0) return null;

  return (
    <aside className={`sidebar-container ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-section">
        <h3 className="sidebar-title">Topics</h3>
        <nav className="sidebar-nav">
          {data.map((category, index) => (
            <a href="#" key={`${category.id}-${index}`} className="sidebar-item">
              <span className="sidebar-icon">{category.icon}</span>
              <span className="sidebar-name">{category.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
