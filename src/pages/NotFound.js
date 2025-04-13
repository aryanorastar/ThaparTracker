import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <img 
        src="https://via.placeholder.com/300" 
        alt="Lost item illustration" 
        className="not-found-image"
      />
      <p>Looks like this page is lost! Let's help you find your way back.</p>
      <Link to="/" className="home-button">
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
