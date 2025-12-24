
import React, { useState, useEffect } from 'react';
import RadioPlayer from '../components/RadioPlayer';
import VoiceRecorder from '../components/VoiceRecorder';

const RadioPage: React.FC = () => {
  const [title, setTitle] = useState('Yoruba Liberty Radio');
  const [subtitle, setSubtitle] = useState('International Shortwave Broadcasting Service');

  useEffect(() => {
    const loadData = () => {
        setTitle(localStorage.getItem('site_title') || 'Yoruba Liberty Radio');
        // If user hasn't set specific subtitle for radio page, we can fallback to the site subtitle or a hardcoded default
        setSubtitle(localStorage.getItem('site_subtitle') || 'International Shortwave Broadcasting Service');
    };
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  return (
    <div className="p-4 h-full flex flex-col space-y-6">
      
      {/* Header Section */}
      <div className="w-full">
        <h1 className="text-center text-2xl font-bold mb-1 text-yellow-400">{title}</h1>
        <p className="text-center text-cyan-400 mb-6 text-sm tracking-wide uppercase">{subtitle}</p>
        
        {/* Main Player */}
        <RadioPlayer streamUrl="https://example.com/live.mp3" isExpanded={true} />
      </div>

      {/* Recorder - Moved Up for visibility */}
      <div className="w-full">
        <VoiceRecorder />
      </div>

    </div>
  );
};

export default RadioPage;
