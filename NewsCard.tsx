
import React from 'react';
import { Article } from '../types';

interface NewsCardProps {
    article: Article;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
    return (
        <div className="flex-shrink-0 w-64 bg-gray-800 rounded-lg overflow-hidden shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer border border-transparent hover:border-yellow-400/30">
            <div className="relative overflow-hidden">
                <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
            </div>
            <div className="p-3">
                <p className="text-xs text-yellow-400 font-semibold uppercase tracking-wide">{article.category}</p>
                <h3 className="font-bold text-sm mt-1 text-white line-clamp-2 leading-tight min-h-[2.5rem]">{article.title}</h3>
                <p className="text-[10px] text-gray-500 mt-2 text-right">{article.date}</p>
            </div>
        </div>
    );
};

export default NewsCard;
