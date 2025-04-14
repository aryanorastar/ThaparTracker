import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="license-text">
          ThaparTracker © 2025 by Aryan Gupta is licensed under 
          <a href="http://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" rel="noopener noreferrer">
            {' '}Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
