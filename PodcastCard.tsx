
import React from 'react';
import { Link } from 'react-router-dom';
import { Podcast } from '../types';

interface PodcastCardProps {
  podcast: Podcast;
  isVertical?: boolean;
}

const PodcastCard: React.FC<PodcastCardProps> = ({ podcast, isVertical = false }) => {
  const cardContent = (
    <>
      <img 
        src={podcast.imageUrl} 
        alt={podcast.title} 
        className={isVertical ? "w-full aspect-square object-cover" : "w-full h-40 object-cover rounded-lg"}
      />
      <div className={isVertical ? "p-3" : "mt-2"}>
        <h3 className="font-bold text-sm text-white truncate">{podcast.title}</h3>
        <p className="text-xs text-gray-400 truncate">{podcast.author}</p>
      </div>
    </>
  );

  if (isVertical) {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md h-full">
            {cardContent}
        </div>
    );
  }

  return (
    <Link to={`/podcasts/${podcast.id}`} className="flex-shrink-0 w-40 block">
        {cardContent}
    </Link>
  );
};

export default PodcastCard;
