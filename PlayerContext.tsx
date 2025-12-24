
import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { Episode, Podcast, DownloadedEpisode, MusicTrack } from '../types';
import { getDownload, saveDownload, deleteDownload } from '../services/db';

type PlayableItem = Episode | MusicTrack;

interface Track {
  item: PlayableItem;
  source: Podcast | { title: string, imageUrl: string };
  type: 'episode' | 'music';
}

type DownloadStatus = 'downloaded' | 'downloading' | 'not_downloaded';

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  playEpisode: (episode: Episode, podcast: Podcast) => void;
  playMusicPlaylist: (tracks: MusicTrack[], startIndex?: number) => void;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrev: () => void;
  downloadEpisode: (episode: Episode, podcast: Podcast) => Promise<void>;
  deleteEpisode: (episodeId: number) => Promise<void>;
  getDownloadStatus: (episodeId: number) => DownloadStatus;
  downloadedEpisodes: Set<number>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [downloadedEpisodes, setDownloadedEpisodes] = useState<Set<number>>(new Set());
  const [downloadingEpisodes, setDownloadingEpisodes] = useState<Set<number>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const handlePlaybackEnd = () => {
    playNext();
  };

  useEffect(() => {
    if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.addEventListener('ended', handlePlaybackEnd);
        audioRef.current.addEventListener('play', () => setIsPlaying(true));
        audioRef.current.addEventListener('pause', () => setIsPlaying(false));
    }
    return () => {
        if (audioRef.current) {
            audioRef.current.removeEventListener('ended', handlePlaybackEnd);
            audioRef.current.removeEventListener('play', () => setIsPlaying(true));
            audioRef.current.removeEventListener('pause', () => setIsPlaying(false));
            audioRef.current.pause();
        }
    }
  }, []);

  useEffect(() => {
    const playAudio = async () => {
        if (currentTrack && audioRef.current) {
            let audioSrc = '';
            if (currentTrack.type === 'episode') {
                const localAudio = await getDownload(currentTrack.item.id);
                audioSrc = localAudio ? URL.createObjectURL(localAudio.audioData) : currentTrack.item.audioUrl;
            } else {
                 audioSrc = currentTrack.item.audioUrl;
            }

            if (audioRef.current.src.startsWith('blob:')) {
                URL.revokeObjectURL(audioRef.current.src);
            }

            audioRef.current.src = audioSrc;
            try {
                await audioRef.current.play();
            } catch (error: any) {
                if (error.name !== 'AbortError') console.error("Audio playback error:", error);
            }
        }
    }
    playAudio();
  }, [currentTrack]);

  const playEpisode = (episode: Episode, podcast: Podcast) => {
    const newTrack: Track = { item: episode, source: podcast, type: 'episode' };
    if (currentTrack?.item.id === episode.id) {
        togglePlayPause();
    } else {
        setCurrentTrack(newTrack);
        setPlaylist([newTrack]);
        setCurrentIndex(0);
    }
  };

  const playMusicPlaylist = (tracks: MusicTrack[], startIndex = 0) => {
    const newPlaylist = tracks.map(track => ({
        item: track,
        source: { title: track.artist, imageUrl: track.imageUrl },
        type: 'music' as 'music'
    }));
    setPlaylist(newPlaylist);
    setCurrentIndex(startIndex);
    setCurrentTrack(newPlaylist[startIndex]);
  }
  
  const playNext = () => {
    if (playlist.length > 0) {
        const nextIndex = (currentIndex + 1) % playlist.length;
        setCurrentIndex(nextIndex);
        setCurrentTrack(playlist[nextIndex]);
    }
  }

  const playPrev = () => {
    if (playlist.length > 0) {
        const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        setCurrentIndex(prevIndex);
        setCurrentTrack(playlist[prevIndex]);
    }
  }


  const togglePlayPause = () => {
    if (audioRef.current) {
        if (isPlaying) audioRef.current.pause();
        else if (audioRef.current.src) audioRef.current.play().catch(e => console.error("Audio playback error:", e));
    }
  };

  const downloadEpisode = async (episode: Episode, podcast: Podcast) => {
    setDownloadingEpisodes(prev => new Set(prev).add(episode.id));
    try {
        const response = await fetch(episode.audioUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const audioData = await response.blob();
        await saveDownload({ episodeId: episode.id, podcast, episode, audioData });
        setDownloadedEpisodes(prev => new Set(prev).add(episode.id));
    } catch (error) {
        console.error("Failed to download episode:", error);
    } finally {
        setDownloadingEpisodes(prev => {
            const newSet = new Set(prev);
            newSet.delete(episode.id);
            return newSet;
        });
    }
  };

  const deleteEpisode = async (episodeId: number) => {
    await deleteDownload(episodeId);
    setDownloadedEpisodes(prev => {
        const newSet = new Set(prev);
        newSet.delete(episodeId);
        return newSet;
    });
  };

  const getDownloadStatus = (episodeId: number): DownloadStatus => {
    if (downloadedEpisodes.has(episodeId)) return 'downloaded';
    if (downloadingEpisodes.has(episodeId)) return 'downloading';
    return 'not_downloaded';
  }

  const value = {
    currentTrack, isPlaying, playEpisode, playMusicPlaylist, togglePlayPause, playNext, playPrev,
    downloadEpisode, deleteEpisode, getDownloadStatus, downloadedEpisodes,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (context === undefined) throw new Error('usePlayer must be used within a PlayerProvider');
  return context;
};
