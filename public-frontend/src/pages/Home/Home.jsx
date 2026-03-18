import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Discover Global History</h1>
          <p className="hero-subtitle">
            Explore the events, cultures, and figures that shaped our world. 
            Journey through time and uncover the stories of our past.
          </p>
          <div className="hero-buttons">
            <a href="/timeline" className="btn btn-primary">Explore Timeline</a>
            <a href="/about" className="btn btn-secondary">Learn More</a>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <h2 className="section-title">Eras of Human History</h2>
        <div className="era-grid">
          
          <div className="era-card">
            <div className="card-icon">🏛️</div>
            <h3>Ancient Civilizations</h3>
            <p>From the cradle of civilization in Mesopotamia to the fall of the Roman Empire.</p>
          </div>

          <div className="era-card">
            <div className="card-icon">🏰</div>
            <h3>The Middle Ages</h3>
            <p>Knights, castles, the Silk Road, and the sweeping empires of the medieval world.</p>
          </div>

          <div className="era-card">
            <div className="card-icon">🌍</div>
            <h3>The Modern Era</h3>
            <p>The Renaissance, industrial revolutions, and the interconnected global society of today.</p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;