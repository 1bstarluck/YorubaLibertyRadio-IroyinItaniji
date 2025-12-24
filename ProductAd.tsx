
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../types';
import PlayIcon from './icons/PlayIcon';

const ProductAd: React.FC = () => {
    const [adImage, setAdImage] = useState<string | null>(null);
    const [adVideoUrl, setAdVideoUrl] = useState<string | null>(null);

    useEffect(() => {
        const loadContent = () => {
            const storedImg = localStorage.getItem('home_ad_image');
            const storedVideo = localStorage.getItem('home_ad_video');
            setAdImage(storedImg);
            setAdVideoUrl(storedVideo);
        };

        loadContent();

        // Listen for real-time updates
        window.addEventListener('storage', loadContent);
        return () => window.removeEventListener('storage', loadContent);
    }, []);

    // Default Fallback
    const defaultImage = "https://picsum.photos/seed/radio-ad/500/300";

    return (
        <section className="bg-gray-800 rounded-xl relative overflow-hidden border border-yellow-400/20 shadow-lg group">
            <Link to={Page.Shop} className="block relative h-48 sm:h-56">
                {adVideoUrl ? (
                    <div className="absolute inset-0 bg-black flex items-center justify-center">
                        <video 
                            src={adVideoUrl} 
                            className="w-full h-full object-cover opacity-60" 
                            muted 
                            loop 
                            autoPlay 
                            playsInline
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                             <div className="bg-yellow-400/90 text-black p-3 rounded-full shadow-xl">
                                <PlayIcon className="w-8 h-8" />
                             </div>
                        </div>
                         <span className="absolute bottom-2 right-2 text-[10px] bg-black/50 text-white px-2 py-1 rounded">Video Ad</span>
                    </div>
                ) : (
                    <>
                        <img 
                            src={adImage || defaultImage} 
                            alt="Emergency Shortwave Radio" 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
                    </>
                )}

                <div className="absolute inset-0 p-5 flex flex-col justify-center max-w-[70%]">
                    <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-2">Featured Product</span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight mb-2">
                        YLR Emergency Radio
                    </h2>
                    <p className="text-sm text-gray-200 mb-4 line-clamp-2">
                        Stay connected anywhere. Solar powered, hand-crank, and pre-tuned to Liberty frequencies.
                    </p>
                    <span className="inline-block bg-yellow-400 text-black font-bold py-2 px-4 rounded-md text-sm w-fit hover:bg-yellow-300 transition-colors">
                        Buy Now
                    </span>
                </div>
            </Link>
        </section>
    );
};

export default ProductAd;
