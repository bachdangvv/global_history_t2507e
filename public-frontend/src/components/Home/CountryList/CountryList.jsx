import React from 'react';
import './CountryList.css';

const CountryList = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="widget-container">
      <div className="widget-header">
        <h3>Theo nước</h3>
        <span className="subtitle-vi">Xem thêm</span>
      </div>
      
      <div className="country-grid">
        {data.map((country, index) => (
          <div key={`${country.id}-${index}`} className="country-item">
            <span className="country-flag">{country.flag}</span>
            <span className="country-name">{country.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryList;
