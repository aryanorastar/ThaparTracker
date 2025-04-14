import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';

const BackgroundAnimation = ({ className = '', intensity = 'light' }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Different Spline scenes based on the animation intensity
  const sceneUrls = {
    light: 'https://prod.spline.design/YZfXwTU6VNfm4sLd/scene.splinecode',
    medium: 'https://prod.spline.design/pWr7HJtVzCFGmLnK/scene.splinecode',
    heavy: 'https://prod.spline.design/8cNJmVUEFzDQyGT4/scene.splinecode'
  };

  const handleError = () => {
    console.error("Failed to load Spline scene for BackgroundAnimation");
    setError(true);
    setLoading(false);
  };

  // Fallback element when Spline fails to load
  if (error) {
    return (
      <div className={`fallback-background ${intensity} ${className}`}></div>
    );
  }

  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-indigo-50/20"></div>
      )}
      
      <div 
        className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700 w-full h-full`}
      >
        <Spline 
          scene={sceneUrls[intensity]} 
          onLoad={() => setLoading(false)}
          onError={handleError}
        />
      </div>
    </div>
  );
};

export default BackgroundAnimation;
