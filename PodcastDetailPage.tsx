import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyPodcastsData } from '../data/podcasts';
import { usePlayer } from '../contexts/PlayerContext';
import PlayIcon from '../components/icons/PlayIcon';
import PauseIcon from '../components/icons/PauseIcon';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import CloudArrowDownIcon from '../components/icons/CloudArrowDownIcon';
import TrashIcon from '../components/icons/TrashIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';

const EpisodeActionButton: React.FC<{ episode: any, podcast: any }> = ({ episode, podcast }) => {
    const { getDownloadStatus, downloadEpisode, deleteEpisode } = usePlayer();
    const status = getDownloadStatus(episode.id);

    if (status === 'downloading') {
        return (
            <div className="p-2 text-gray-400 animate-spin">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        );
    }

    if (status === 'downloaded') {
        return (
            <div className="flex items-center space-x-2">
                 <CheckCircleIcon className="w-5 h-5 text-green-500" />
                <button onClick={() => deleteEpisode(episode.id)} className="p-2 text-gray-500 hover:text-red-500">
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
        );
    }

    return (
        <button onClick={() => downloadEpisode(episode, podcast)} className="p-2 text-gray-400 hover:text-white">
            <CloudArrowDownIcon className="w-5 h-5" />
        </button>
    );
};


const PodcastDetailPage: React.FC = () => {
    const { podcastId } = useParams<{ podcastId: string }>();
    const navigate = useNavigate();
    const podcast = dummyPodcastsData.find(p => p.id === Number(podcastId));
    const { playEpisode, currentTrack, isPlaying } = usePlayer();

    if (!podcast) {
        return <div className="p-4 text-center">Podcast not found.</div>;
    }

    return (
        <div className="pb-4">
            <div className="sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10">
                <button onClick={() => navigate(-1)} className="absolute top-3 left-2 p-2 text-white">
                    <ChevronLeftIcon />
                </button>
                <h1 className="text-lg font-bold text-center p-4 truncate text-white">{podcast.title}</h1>
            </div>

            <div className="p-4">
                <div className="flex flex-col items-center text-center">
                    <img src={podcast.imageUrl} alt={podcast.title} className="w-48 h-48 rounded-lg shadow-2xl mb-4" />
                    <h2 className="text-2xl font-bold text-white">{podcast.title}</h2>
                    <p className="text-sm font-medium text-yellow-400 mb-2">{podcast.author}</p>
                    <p className="text-sm text-gray-400">{podcast.description}</p>
                </div>
            </div>

            <div className="mt-6 px-4">
                <h3 className="text-xl font-bold text-white mb-4">Episodes</h3>
                <ul className="space-y-3">
                    {podcast.episodes.length > 0 ? podcast.episodes.map(episode => {
                        // FIX: Check currentTrack type and access item.id instead of non-existent episode.id
                        const isActive = currentTrack?.type === 'episode' && currentTrack.item.id === episode.id;
                        return (
                            <li key={episode.id} className="bg-gray-800 p-3 rounded-lg flex items-center space-x-4">
                                <button onClick={() => playEpisode(episode, podcast)} className="bg-yellow-400 text-black rounded-full h-10 w-10 flex-shrink-0 flex items-center justify-center">
                                    {isActive && isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5 ml-0.5" />}
                                </button>
                                <div className="flex-grow overflow-hidden">
                                    <p className="font-semibold text-white truncate">{episode.title}</p>
                                    <p className="text-xs text-gray-400">{episode.releaseDate} &bull; {episode.duration}</p>
                                </div>
                                <EpisodeActionButton episode={episode} podcast={podcast} />
                            </li>
                        );
                    }) : (
                        <p className="text-gray-500 text-center py-4">No episodes available yet.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default PodcastDetailPage;