
import React, { useState, useRef, useEffect } from 'react';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import VolumeIcon from './icons/VolumeIcon';

interface RadioPlayerProps {
  streamUrl: string;
  isExpanded?: boolean;
}

const RadioPlayer: React.FC<RadioPlayerProps> = ({ streamUrl, isExpanded = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Minimalist horizontal bar for homepage
  if (!isExpanded) {
    return (
        <div className="flex items-center justify-between bg-yellow-400/10 border border-yellow-400/20 text-white p-3 rounded-lg">
            <div className="flex items-center space-x-3">
                <img src="https://picsum.photos/seed/radio/100/100" alt="Album Art" className="w-12 h-12 rounded-md object-cover" />
                <div>
                    <h3 className="font-bold">Live Broadcast</h3>
                    <p className="text-xs text-gray-300">Yoruba Liberty Radio</p>
                </div>
            </div>
            <button
                onClick={togglePlayPause}
                className="bg-yellow-400 text-black rounded-full h-12 w-12 flex items-center justify-center shadow-lg transition-transform transform hover:scale-105"
                aria-label={isPlaying ? 'Pause' : 'Play'}
            >
                {isPlaying ? <PauseIcon /> : <PlayIcon className="w-6 h-6 ml-1" />}
            </button>
            <audio ref={audioRef} src={streamUrl} preload="none"></audio>
        </div>
    );
  }

  // Expanded player for RadioPage
  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl shadow-2xl w-full border border-gray-700 backdrop-blur-lg">
      <img src="https://picsum.photos/seed/radio-large/400/400" alt="Album Art" className="w-full h-auto aspect-square rounded-lg mb-6 shadow-lg" />
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white">Live Broadcast</h2>
        <p className="text-md text-gray-400">Yoruba Liberty Radio</p>
      </div>
      <div className="flex items-center justify-center space-x-6">
        {/* Placeholder for future features */}
        <button className="text-gray-500"><VolumeIcon /></button>
        <button
          onClick={togglePlayPause}
          className="bg-yellow-400 text-black rounded-full h-20 w-20 flex items-center justify-center shadow-lg transition-transform transform hover:scale-105"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <PauseIcon className="w-8 h-8" /> : <PlayIcon className="w-8 h-8 ml-2" />}
        </button>
        {/* Placeholder for future features */}
        <button className="text-gray-500"><VolumeIcon /></button>
      </div>
       <audio ref={audioRef} src={streamUrl} preload="none"></audio>
    </div>
  );
};

export default RadioPlayer;
