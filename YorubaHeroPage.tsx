
import React, { useEffect, useState } from 'react';

const YorubaHeroPage: React.FC = () => {
  const [heroImage, setHeroImage] = useState<string>("https://picsum.photos/seed/heroine/600/400");
  const [heroName, setHeroName] = useState("Funmilayo Ransome-Kuti");
  const [heroTitle, setHeroTitle] = useState("The Mother of Africa");
  const [heroBio, setHeroBio] = useState(`Chief Funmilayo Ransome-Kuti, born Frances Abigail Olufunmilayo Thomas, was a Nigerian educator, political campaigner, suffragist, and women's rights activist.\n\nHer political activism led to her being described as the "doyenne of female rights in Nigeria," and she was regarded as "The Mother of Africa."`);

  useEffect(() => {
    const storedHero = localStorage.getItem('hero_image');
    if (storedHero) setHeroImage(storedHero);

    const storedData = localStorage.getItem('hero_data');
    if (storedData) {
        try {
            const data = JSON.parse(storedData);
            if (data.name) setHeroName(data.name);
            if (data.title) setHeroTitle(data.title);
            if (data.bio) setHeroBio(data.bio);
        } catch(e) { console.error(e); }
    }
    
    // Listen for real-time updates
    const handleStorage = () => {
         const updatedImg = localStorage.getItem('hero_image');
         if(updatedImg) setHeroImage(updatedImg);
         
         const updatedData = localStorage.getItem('hero_data');
         if(updatedData) {
             const data = JSON.parse(updatedData);
             setHeroName(data.name);
             setHeroTitle(data.title);
             setHeroBio(data.bio);
         }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className="pb-4">
      <div className="relative h-72">
        <img 
          src={heroImage}
          alt={heroName} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <h1 className="text-3xl font-extrabold text-white drop-shadow-lg leading-tight">{heroName}</h1>
          <p className="text-lg font-semibold text-yellow-400 drop-shadow-md">{heroTitle}</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <h2 className="text-2xl font-bold text-white">About the Hero/Heroine</h2>
        <div className="text-gray-300 leading-relaxed space-y-4 whitespace-pre-wrap">
          {heroBio}
        </div>
      </div>
    </div>
  );
};

export default YorubaHeroPage;
