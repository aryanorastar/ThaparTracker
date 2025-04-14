import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';

const HeroSpline = ({ className = '' }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleError = () => {
    console.error("Failed to load Spline scene");
    setError(true);
    setLoading(false);
  };

  // Use a simpler scene for better performance
  const sceneUrl = isMobile 
    ? "https://prod.spline.design/tz4Pck6mUCQPGTFN/scene.splinecode" 
    : "https://prod.spline.design/tz4Pck6mUCQPGTFN/scene.splinecode";

  if (error) {
    return (
      <div className={`fallback-hero-bg ${className}`}></div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-700/50 to-indigo-900/50 rounded-lg">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <div className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <Spline 
          scene={sceneUrl}
          onLoad={() => setLoading(false)}
          onError={handleError}
        />
      </div>
    </div>
  );
};

export default HeroSpline;
