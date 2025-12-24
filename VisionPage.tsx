
import React, { useState, useEffect } from 'react';

const VisionPage: React.FC = () => {
  const [visionText, setVisionText] = useState('To be the most trusted and influential voice for the Yoruba diaspora, fostering a connected and prosperous global nation built on the foundations of freedom, heritage, and mutual respect. We envision a future where every Yoruba person, no matter where they are, has access to information that inspires progress, celebrates our rich culture, and champions our collective aspirations for a sovereign future.');

  useEffect(() => {
    const loadData = () => {
      const stored = localStorage.getItem('site_vision');
      if (stored) setVisionText(stored);
    }
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  return (
    <div className="p-4 space-y-4 h-full flex flex-col justify-center">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Our Vision</h1>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-xl">
            <p className="text-gray-300 leading-relaxed text-center whitespace-pre-wrap">
              {visionText}
            </p>
        </div>
      </div>
    </div>
  );
};

export default VisionPage;
