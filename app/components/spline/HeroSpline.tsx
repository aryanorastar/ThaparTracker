import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';

interface HeroSplineProps {
  className?: string;
}

const HeroSpline: React.FC<HeroSplineProps> = ({ className = '' }) => {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-primary-700/50 to-primary-900/50 rounded-lg">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <div className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        {isMobile ? (
          // Simplified version for mobile
          <Spline 
            scene="https://prod.spline.design/6PrtvM5QVOfQzQYV/scene.splinecode" 
            onLoad={() => setLoading(false)}
          />
        ) : (
          // Full version for desktop
          <Spline 
            scene="https://prod.spline.design/tz4Pck6mUCQPGTFN/scene.splinecode" 
            onLoad={() => setLoading(false)}
          />
        )}
      </div>
    </div>
  );
};

export default HeroSpline;
