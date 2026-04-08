import React from 'react';
import './StaticPages.css';

const About = () => {
  return (
    <div className="static-page-wrapper">
      <div className="static-page-container">
        <h1 className="static-page-title">About Us</h1>
        <p className="static-page-subtitle">Preserving the past, enriching the future.</p>
        
        <div className="static-page-content">
          <p>
            Welcome to the Global History project, an interactive open-source repository designed 
            to preserve, catalog, and explore the intricate narratives of our past. 
          </p>
          <p>
            Our mission is to provide researchers, students, and history enthusiasts with a premium
            museum-grade digital platform. We emphasize clear provenance, peer-reviewed edit trails,
            and beautifully presented historical events and artifacts.
          </p>
          <h3>Our Vision</h3>
          <p>
            We believe that history belongs to everyone. By allowing registered contributors to submit
            modifications to articles and events, we construct a living, breathing history book that 
            evolves with new archeological discoveries and academic consensus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
