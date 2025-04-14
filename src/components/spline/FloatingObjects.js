import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';

const FloatingObjects = ({ className = '', variant = 'items' }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Different Spline scenes based on the variant
  const sceneUrls = {
    items: 'https://prod.spline.design/oTYPxnQU6jFRsf3d/scene.splinecode',
    map: 'https://prod.spline.design/KLmn7xCVPFDEwz5r/scene.splinecode',
    search: 'https://prod.spline.design/q9XJfvYU4DRGHtpW/scene.splinecode'
  };

  const handleError = () => {
    console.error("Failed to load Spline scene for FloatingObjects");
    setError(true);
    setLoading(false);
  };

  // Fallback element when Spline fails to load
  if (error) {
    return (
      <div className={`floating-object-fallback ${variant} ${className}`}>
        <div className="floating-animation"></div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <div 
        className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        style={{ height: '300px' }}
      >
        <Spline 
          scene={sceneUrls[variant]} 
          onLoad={() => setLoading(false)}
          onError={handleError}
        />
      </div>
    </div>
  );
};

export default FloatingObjects;
