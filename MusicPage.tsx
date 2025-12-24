
import React from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import { musicData } from '../data/music';
import PlayIcon from '../components/icons/PlayIcon';
import PauseIcon from '../components/icons/PauseIcon';
import { MusicTrack } from '../types';

const MusicTrackItem: React.FC<{ track: MusicTrack; onPlay: () => void }> = ({ track, onPlay }) => {
    const { currentTrack, isPlaying } = usePlayer();
    const isActive = currentTrack?.type === 'music' && currentTrack.item.id === track.id;

    return (
        <div className="bg-gray-800 p-3 rounded-lg flex items-center space-x-4">
            <img src={track.imageUrl} alt={track.title} className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
            <div className="flex-grow overflow-hidden">
                <p className="font-semibold text-white truncate">{track.title}</p>
                <p className="text-xs text-gray-400 truncate">{track.artist}</p>
            </div>
            <button
                onClick={onPlay}
                className="bg-yellow-400 text-black rounded-full h-10 w-10 flex-shrink-0 flex items-center justify-center"
                aria-label={isActive && isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
            >
                {isActive && isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5 ml-0.5" />}
            </button>
        </div>
    );
};


const MusicPage: React.FC = () => {
    const { playMusicPlaylist } = usePlayer();

    const handlePlay = (startIndex: number) => {
        playMusicPlaylist(musicData, startIndex);
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-2 text-white">Music Gallery</h1>
            <p className="text-gray-400 mb-6">Enjoy a curated collection of royalty-free music.</p>
            <div className="space-y-3">
                {musicData.map((track, index) => (
                    <MusicTrackItem key={track.id} track={track} onPlay={() => handlePlay(index)} />
                ))}
            </div>
        </div>
    );
};

export default MusicPage;
