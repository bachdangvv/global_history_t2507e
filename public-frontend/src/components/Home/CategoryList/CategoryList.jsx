import React from 'react';
import './CategoryList.css';

const CategoryList = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="widget-container">
      <div className="widget-header">
        <h3>Theo chủ đề</h3>
        <span className="subtitle-vi">Xem thêm</span>
      </div>
      
      <div className="category-grid">
        {data.map((category, index) => (
          <div key={`${category.id}-${index}`} className="category-item">
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
