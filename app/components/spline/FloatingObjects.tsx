import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';

interface FloatingObjectsProps {
  className?: string;
  variant?: 'items' | 'map' | 'search';
}

const FloatingObjects: React.FC<FloatingObjectsProps> = ({ 
  className = '',
  variant = 'items'
}) => {
  const [loading, setLoading] = useState(true);
  
  // Different Spline scenes based on the variant
  const sceneUrls = {
    items: 'https://prod.spline.design/oTYPxnQU6jFRsf3d/scene.splinecode',
    map: 'https://prod.spline.design/KLmn7xCVPFDEwz5r/scene.splinecode',
    search: 'https://prod.spline.design/q9XJfvYU4DRGHtpW/scene.splinecode'
  };

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <div 
        className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        style={{ height: '300px' }}
      >
        <Spline 
          scene={sceneUrls[variant]} 
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
};

export default FloatingObjects;
