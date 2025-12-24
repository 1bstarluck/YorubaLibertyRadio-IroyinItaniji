
import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import NewsCardSkeleton from '../components/NewsCardSkeleton';

const defaultNewsData: Article[] = [
  { id: 1, title: 'Community Celebrates New Cultural Center', summary: 'A new center dedicated to Yoruba culture opens in London.', imageUrl: 'https://picsum.photos/seed/news1/400/300', category: 'Community', date: '3 hours ago' },
  { id: 2, title: 'Youth Connect Program Launch', summary: 'An initiative to connect Yoruba youth across the diaspora.', imageUrl: 'https://picsum.photos/seed/news2/400/300', category: 'Youth', date: '1 day ago' },
  { id: 3, title: 'Yoruba Akinkanju in the Diaspora', summary: 'Celebrating the achievements of Yoruba heroes making waves globally.', imageUrl: 'https://picsum.photos/seed/akinkanju/400/300', category: 'Diaspora', date: '2 days ago' },
  { id: 4, title: 'International Art Exhibit Features Yoruba Artists', summary: 'A showcase of modern and traditional art.', imageUrl: 'https://picsum.photos/seed/news4/400/300', category: 'Arts', date: '3 days ago' },
];

const NewsArticleCard: React.FC<{ article: Article }> = ({ article }) => (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
        <img src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover" />
        <div className="p-4">
            <div className="flex justify-between items-start">
                <span className="text-xs text-yellow-400 font-semibold uppercase px-2 py-1 bg-yellow-400/10 rounded">{article.category}</span>
                <span className="text-xs text-gray-500">{article.date}</span>
            </div>
            <h3 className="font-bold text-lg mt-2 mb-2 text-white leading-tight">{article.title}</h3>
            <p className="text-sm text-gray-400 line-clamp-2">{article.summary}</p>
        </div>
    </div>
);

const NewsPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [articles, setArticles] = useState<Article[]>([]);
    const categories = ['All', 'Diaspora', 'Community', 'Youth', 'Arts'];

    useEffect(() => {
        // Load data
        const loadNews = () => {
            const storedNews = localStorage.getItem('news_articles');
            if (storedNews) {
                try {
                    setArticles(JSON.parse(storedNews));
                } catch (e) {
                    setArticles(defaultNewsData);
                }
            } else {
                setArticles(defaultNewsData);
            }
            setLoading(false);
        };

        // Simulate loading delay for effect
        setTimeout(loadNews, 600);
        
        // Listen for admin changes
        window.addEventListener('storage', loadNews);
        return () => window.removeEventListener('storage', loadNews);
    }, []);

    const filteredNews = activeCategory === 'All' 
        ? articles 
        : articles.filter(news => news.category === activeCategory);

    return (
        <div className="p-4 pb-24">
            <h1 className="text-3xl font-bold mb-6 text-white">News</h1>
            
            {/* Categories Tab */}
            <div className="flex overflow-x-auto space-x-2 mb-6 pb-2 scrollbar-hide -mx-4 px-4">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            activeCategory === cat 
                            ? 'bg-yellow-400 text-black shadow-lg' 
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="space-y-6">
                {loading ? (
                    <>
                        <NewsCardSkeleton />
                        <NewsCardSkeleton />
                        <NewsCardSkeleton />
                    </>
                ) : filteredNews.length > 0 ? (
                    filteredNews.map(article => (
                        <NewsArticleCard key={article.id} article={article} />
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500 bg-gray-800/50 rounded-lg border border-gray-700 border-dashed">
                        <p>No news found in the {activeCategory} category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsPage;
