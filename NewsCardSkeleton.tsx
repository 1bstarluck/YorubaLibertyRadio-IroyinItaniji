
import React from 'react';

const NewsCardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
        <div className="w-full h-40 bg-gray-700"></div>
        <div className="p-4">
            <div className="h-3 w-1/4 bg-gray-700 rounded mb-2"></div>
            <div className="h-5 w-3/4 bg-gray-700 rounded mb-3"></div>
            <div className="h-3 w-1/2 bg-gray-700 rounded"></div>
        </div>
    </div>
  );
};

export default NewsCardSkeleton;
