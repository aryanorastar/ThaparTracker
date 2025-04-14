import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';

interface BackgroundAnimationProps {
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
}

const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({ 
  className = '',
  intensity = 'light'
}) => {
  const [loading, setLoading] = useState(true);
  
  // Different Spline scenes based on the animation intensity
  const sceneUrls = {
    light: 'https://prod.spline.design/YZfXwTU6VNfm4sLd/scene.splinecode',
    medium: 'https://prod.spline.design/pWr7HJtVzCFGmLnK/scene.splinecode',
    heavy: 'https://prod.spline.design/8cNJmVUEFzDQyGT4/scene.splinecode'
  };

  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50/20 to-secondary-50/20"></div>
      )}
      
      <div 
        className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700 w-full h-full`}
      >
        <Spline 
          scene={sceneUrls[intensity]} 
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
};

export default BackgroundAnimation;
