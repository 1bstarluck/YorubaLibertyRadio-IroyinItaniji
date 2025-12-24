
import React, { useState, useEffect } from 'react';

const AboutUsPage: React.FC = () => {
  const [aboutText, setAboutText] = useState('Yoruba Liberty Radio is an independent, international shortwave broadcasting service created to serve as a beacon of truth, liberty, and cultural pride for the Yoruba people across the globe. Our mission is to provide an unfiltered platform for news, dialogue, and education that empowers our communities, strengthens our identity, and advocates for our collective right to self-determination.');

  useEffect(() => {
    const loadData = () => {
      const stored = localStorage.getItem('site_about');
      if (stored) setAboutText(stored);
    }
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-3xl font-bold text-white">About Us</h1>
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {aboutText}
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
