import React from 'react';
import './StaticPages.css';

const Contact = () => {
  return (
    <div className="static-page-wrapper">
      <div className="static-page-container">
        <h1 className="static-page-title">Contact Us</h1>
        <p className="static-page-subtitle">Get in touch with our editorial team.</p>
        
        <div className="static-page-content">
          <p>
            We welcome inquiries from historical institutions, academic partners, and museum staff.
            If you need assistance navigating the platform, or have questions regarding article moderation, 
            please reach out below.
          </p>
          
          <form className="contact-form" onSubmit={(e) => {
            e.preventDefault();
            alert('Your message has been sent to our archivists!');
          }}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your name" required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input type="text" placeholder="e.g. Partnership Request" required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows="5" placeholder="How can we help?" required></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
          
          <div className="contact-info">
            <h4>Global History Foundation</h4>
            <p>123 Curator Lane, Museum District<br/>History City, HC 90210</p>
            <p>Email: archivists@globalhistory.org</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
