
import React from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import BackwardIcon from './icons/BackwardIcon';
import ForwardIcon from './icons/ForwardIcon';

const MiniPlayer: React.FC = () => {
  const { currentTrack, isPlaying, togglePlayPause, playNext, playPrev } = usePlayer();

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="absolute bottom-20 left-0 right-0 h-16 bg-gray-800/90 backdrop-blur-sm border-t border-gray-700 flex items-center justify-between px-4 z-20">
      <div className="flex items-center space-x-3 overflow-hidden w-2/5">
        <img src={currentTrack.source.imageUrl} alt={currentTrack.source.title} className="w-10 h-10 rounded-md object-cover flex-shrink-0" />
        <div className="overflow-hidden">
          <p className="text-sm font-bold text-white truncate">{currentTrack.item.title}</p>
          <p className="text-xs text-gray-400 truncate">{currentTrack.source.title}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button onClick={playPrev} className="p-2 text-gray-300 hover:text-white" aria-label="Previous track">
          <BackwardIcon className="w-6 h-6" />
        </button>
        <button
          onClick={togglePlayPause}
          className="bg-yellow-400 text-black rounded-full h-10 w-10 flex items-center justify-center shadow-lg"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5 ml-0.5" />}
        </button>
        <button onClick={playNext} className="p-2 text-gray-300 hover:text-white" aria-label="Next track">
          <ForwardIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default MiniPlayer;
