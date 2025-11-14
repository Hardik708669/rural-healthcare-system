import React from 'react';

const SkeletonLoader = ({ type = 'card', className = '' }) => {
  const skeletonClasses = `skeleton ${className}`;
  
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className={`${skeletonClasses} rounded-2xl p-6`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full skeleton"></div>
              <div className="flex-1">
                <div className="h-4 rounded skeleton mb-2"></div>
                <div className="h-3 rounded skeleton w-3/4"></div>
              </div>
            </div>
            <div className="h-4 rounded skeleton mb-2"></div>
            <div className="h-4 rounded skeleton w-5/6"></div>
          </div>
        );
      
      case 'profile':
        return (
          <div className={`${skeletonClasses} rounded-2xl p-6`}>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full skeleton mb-4"></div>
              <div className="h-6 rounded skeleton w-32 mb-2"></div>
              <div className="h-4 rounded skeleton w-48"></div>
            </div>
          </div>
        );
      
      case 'list':
        return (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`${skeletonClasses} rounded-xl p-4`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full skeleton"></div>
                  <div className="flex-1">
                    <div className="h-4 rounded skeleton mb-2"></div>
                    <div className="h-3 rounded skeleton w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'text':
        return (
          <div className="space-y-3">
            <div className="h-6 rounded skeleton"></div>
            <div className="h-4 rounded skeleton w-5/6"></div>
            <div className="h-4 rounded skeleton w-4/6"></div>
            <div className="h-4 rounded skeleton w-3/6"></div>
          </div>
        );
      
      default:
        return (
          <div className={`${skeletonClasses} rounded-2xl p-6`}>
            <div className="h-4 rounded skeleton mb-2"></div>
            <div className="h-4 rounded skeleton w-3/4"></div>
          </div>
        );
    }
  };
  
  return renderSkeleton();
};

export default SkeletonLoader;