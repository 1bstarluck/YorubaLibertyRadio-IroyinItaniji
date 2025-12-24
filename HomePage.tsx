
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Article, Podcast, Page } from '../types';
import { getGreeting } from '../services/geminiService';
import RadioPlayer from '../components/RadioPlayer';
import NewsCard from '../components/NewsCard';
import PodcastCard from '../components/PodcastCard';
import GeminiIcon from '../components/icons/GeminiIcon';
import ProductAd from '../components/ProductAd';
import { dummyPodcastsData } from '../data/podcasts';

const dummyNews: Article[] = [
  { id: 1, title: 'Community Celebrates New Cultural Center', summary: 'A new center dedicated to Yoruba culture opens in London.', imageUrl: 'https://picsum.photos/seed/news1/400/300', category: 'Community', date: '3 hours ago' },
  { id: 2, title: 'Youth Connect Program Launch', summary: 'An initiative to connect Yoruba youth across the diaspora.', imageUrl: 'https://picsum.photos/seed/news2/400/300', category: 'Youth', date: '1 day ago' },
  { id: 3, title: 'Yoruba Akinkanju in the Diaspora', summary: 'Celebrating the achievements of Yoruba heroes making waves globally.', imageUrl: 'https://picsum.photos/seed/akinkanju/400/300', category: 'Diaspora', date: '2 days ago' },
];

const dummyPodcasts: Podcast[] = dummyPodcastsData.slice(0, 3);

const GeminiGreeting: React.FC = () => {
    const [greeting, setGreeting] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGreeting = async () => {
            try {
                const newGreeting = await getGreeting("listener");
                setGreeting(newGreeting);
            } catch (error) {
                console.error("Failed to get greeting:", error);
                setGreeting("Kaabọ! Welcome to Yoruba Liberty Radio.");
            } finally {
                setLoading(false);
            }
        };
        fetchGreeting();
    }, []);

    return (
        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 animate-fade-in-up">
            {loading ? (
                <div className="flex items-center space-x-3">
                    <GeminiIcon className="animate-spin h-5 w-5 text-yellow-400" />
                    <p className="text-sm text-gray-300">Generating a special welcome...</p>
                </div>
            ) : (
                <div className="flex items-start space-x-3">
                    <GeminiIcon className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <p className="text-sm text-gray-200">{greeting}</p>
                </div>
            )}
        </div>
    );
};

const HomePage: React.FC = () => {
  return (
    <div className="space-y-8 px-4 pb-4">
      <div className="animate-fade-in-up">
        <GeminiGreeting />
        <div className="text-center mt-3">
          <p className="text-xs text-cyan-400 tracking-wider uppercase">International Shortwave Broadcasting Service</p>
        </div>
      </div>
      
      <div className="animate-fade-in-up delay-100">
        <RadioPlayer streamUrl="https://example.com/live.mp3" />
      </div>

       <div className="animate-fade-in-up delay-300">
        <ProductAd />
      </div>

      <section className="animate-fade-in-up delay-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Latest News</h2>
          <Link to={Page.News} className="text-sm font-semibold text-yellow-400 hover:text-yellow-300 transition-colors">View All</Link>
        </div>
        <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 scrollbar-hide">
          {dummyNews.map(article => <NewsCard key={article.id} article={article} />)}
        </div>
      </section>

      <section className="animate-fade-in-up delay-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Featured Podcasts</h2>
          <Link to={Page.Podcasts} className="text-sm font-semibold text-yellow-400 hover:text-yellow-300 transition-colors">View All</Link>
        </div>
        <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 scrollbar-hide">
          {dummyPodcasts.map(podcast => <PodcastCard key={podcast.id} podcast={podcast} />)}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
