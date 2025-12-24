import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Podcast, DownloadedEpisode, Episode } from '../types';
import PodcastCard from '../components/PodcastCard';
import { dummyPodcastsData } from '../data/podcasts';
import { usePlayer } from '../contexts/PlayerContext';
import { getDownloads } from '../services/db';
import PlayIcon from '../components/icons/PlayIcon';
import PauseIcon from '../components/icons/PauseIcon';
import TrashIcon from '../components/icons/TrashIcon';

const DownloadedEpisodeItem: React.FC<{ item: DownloadedEpisode }> = ({ item }) => {
    const { playEpisode, deleteEpisode, currentTrack, isPlaying } = usePlayer();
    // FIX: Check currentTrack type and access item.id instead of non-existent episode.id
    const isActive = currentTrack?.type === 'episode' && currentTrack.item.id === item.episodeId;

    return (
        <div className="bg-gray-800 p-3 rounded-lg flex items-center space-x-4">
            <img src={item.podcast.imageUrl} alt={item.podcast.title} className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
            <div className="flex-grow overflow-hidden">
                <p className="font-semibold text-white truncate">{item.episode.title}</p>
                <p className="text-xs text-gray-400 truncate">{item.podcast.title}</p>
            </div>
             <button
                onClick={() => playEpisode(item.episode, item.podcast)}
                className="bg-yellow-400 text-black rounded-full h-10 w-10 flex-shrink-0 flex items-center justify-center"
                aria-label={isActive && isPlaying ? 'Pause' : 'Play'}
            >
                {isActive && isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5 ml-0.5" />}
            </button>
            <button onClick={() => deleteEpisode(item.episodeId)} className="p-2 text-gray-500 hover:text-red-500">
                <TrashIcon className="w-5 h-5" />
            </button>
        </div>
    );
}

const PodcastPage: React.FC = () => {
    const [downloads, setDownloads] = useState<DownloadedEpisode[]>([]);
    const { downloadedEpisodes } = usePlayer(); // Listen to context changes

    useEffect(() => {
        const fetchDownloads = async () => {
            const items = await getDownloads();
            setDownloads(items);
        };
        fetchDownloads();
    }, [downloadedEpisodes]); // Re-fetch when context indicates a change

    return (
        <div className="p-4 space-y-8">
            {downloads.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold mb-4 text-white">Your Downloads</h2>
                    <div className="space-y-3">
                        {downloads.map(item => (
                            <DownloadedEpisodeItem key={item.episodeId} item={item} />
                        ))}
                    </div>
                </section>
            )}

            <section>
                <h1 className="text-3xl font-bold mb-6 text-white">All Shows</h1>
                <div className="grid grid-cols-2 gap-4">
                    {dummyPodcastsData.map(podcast => (
                        <Link key={podcast.id} to={`/podcasts/${podcast.id}`}>
                            <PodcastCard podcast={podcast} isVertical={true} />
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default PodcastPage;