
import React, { useState, useEffect } from 'react';

const MissionPage: React.FC = () => {
  const [missionText, setMissionText] = useState('To provide an unfiltered, international broadcasting platform dedicated to the principles of liberty, self-determination, and cultural preservation for the Yoruba people worldwide. We are committed to delivering accurate news, insightful analysis, and empowering content that informs, educates, and unites our global community, ensuring the voice of the Yoruba nation is heard on the world stage.');

  useEffect(() => {
    const loadData = () => {
      const stored = localStorage.getItem('site_mission');
      if (stored) setMissionText(stored);
    }
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  return (
    <div className="p-4 space-y-4 h-full flex flex-col justify-center">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Our Mission</h1>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-xl">
            <p className="text-gray-300 leading-relaxed text-center whitespace-pre-wrap">
              {missionText}
            </p>
        </div>
      </div>
    </div>
  );
};

export default MissionPage;
