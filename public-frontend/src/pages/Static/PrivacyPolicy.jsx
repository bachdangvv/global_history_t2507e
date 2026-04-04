import React from 'react';
import './StaticPages.css';

const PrivacyPolicy = () => {
  return (
    <div className="static-page-wrapper">
      <div className="static-page-container">
        <h1 className="static-page-title">Privacy Policy</h1>
        <p className="static-page-subtitle">How we protect your digital footprint.</p>
        
        <div className="static-page-content">
          <h3>Information Collection</h3>
          <p>
            When you register, we collect basic details such as your username, email address,
            and password. When interacting with the site, your IP address and user interactions
            (such as likes and comments) are tracked to curate a personalized museum experience.
          </p>
          <h3>Data Usage</h3>
          <p>
            The information collected is used exclusively for platform moderation, delivering personalized
            historical reading lists, and attributing edits correctly in our public Ledger of Revisions. 
            We do not sell user data to third parties.
          </p>
          <h3>Content Licensing</h3>
          <p>
            By submitting an edit or drafting a new article on the Global History platform, you agree to
            license your text under the Creative Commons Attribution Share-Alike (CC-BY-SA) license. 
            This ensures that history remains free and accessible for future generations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
