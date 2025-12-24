
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PodcastPage from './pages/PodcastPage';
import NewsPage from './pages/NewsPage';
import MorePage from './pages/MorePage';
import RadioPage from './pages/RadioPage';
import PodcastDetailPage from './pages/PodcastDetailPage';
import ShopPage from './pages/ShopPage';
import ContactPage from './pages/ContactPage';
import QAPage from './pages/QAPage';
import AnalyticsPage from './pages/AnalyticsPage';
import BackendPage from './pages/BackendPage';
import MissionPage from './pages/MissionPage';
import VisionPage from './pages/VisionPage';
import YorubaHeroPage from './pages/YorubaHeroPage';
import WidgetsPage from './pages/WidgetsPage';
import MusicPage from './pages/MusicPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutUsPage from './pages/AboutUsPage';
import DonationPage from './pages/DonationPage';
import CommunityPage from './pages/CommunityPage';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import MiniPlayer from './components/MiniPlayer';
import { Page } from './types';
import { PlayerProvider, usePlayer } from './contexts/PlayerContext';
import { CartProvider } from './contexts/CartContext';

const AppContent: React.FC = () => {
  const { currentTrack } = usePlayer();
  const [footerTitle, setFooterTitle] = useState('Yoruba Liberty Radio');

  useEffect(() => {
    const loadFooter = () => {
        setFooterTitle(localStorage.getItem('site_title') || 'Yoruba Liberty Radio');
    }
    loadFooter();
    window.addEventListener('storage', loadFooter);
    return () => window.removeEventListener('storage', loadFooter);
  }, []);

  return (
    <div className="relative w-full h-full sm:w-[390px] sm:h-[844px] sm:rounded-3xl sm:shadow-2xl overflow-hidden bg-gradient-to-b from-gray-900 to-black flex flex-col">
      <HashRouter>
        <Header />
        <main className={`flex-grow overflow-y-auto scrollbar-hide pt-16 transition-all duration-300 ${currentTrack ? 'pb-36' : 'pb-20'} flex flex-col`}>
          <div className="flex-grow">
            <Routes>
              <Route path={Page.Home} element={<HomePage />} />
              <Route path={Page.Radio} element={<RadioPage />} />
              <Route path={Page.Podcasts} element={<PodcastPage />} />
              <Route path={Page.PodcastDetail} element={<PodcastDetailPage />} />
              <Route path={Page.News} element={<NewsPage />} />
              <Route path={Page.More} element={<MorePage />} />
              <Route path={Page.Shop} element={<ShopPage />} />
              <Route path={Page.Contact} element={<ContactPage />} />
              <Route path={Page.QA} element={<QAPage />} />
              <Route path={Page.Analytics} element={<AnalyticsPage />} />
              <Route path={Page.Admin} element={<BackendPage />} />
              <Route path={Page.Mission} element={<MissionPage />} />
              <Route path={Page.Vision} element={<VisionPage />} />
              <Route path={Page.YorubaHero} element={<YorubaHeroPage />} />
              <Route path={Page.Widgets} element={<WidgetsPage />} />
              <Route path={Page.Music} element={<MusicPage />} />
              <Route path={Page.Cart} element={<CartPage />} />
              <Route path={Page.Checkout} element={<CheckoutPage />} />
              <Route path={Page.AboutUs} element={<AboutUsPage />} />
              <Route path={Page.Donate} element={<DonationPage />} />
              <Route path={Page.Community} element={<CommunityPage />} />
              <Route path="*" element={<Navigate to={Page.Home} />} />
            </Routes>
          </div>
          
          <footer className="py-4 mt-auto border-t border-gray-800/50 mx-6 text-center z-0">
             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                {footerTitle}
             </p>
             <p className="text-xs text-gray-500 font-medium">
                &copy; {new Date().getFullYear()} All Rights Reserved.
             </p>
          </footer>
        </main>
        <MiniPlayer />
        <BottomNav />
      </HashRouter>
    </div>
  );
};


const App: React.FC = () => {
  return (
    // Fixed inset-0 ensures full screen on mobile without cropping. 
    // sm: styles restore the "device mockup" look on larger screens.
    <div className="fixed inset-0 w-full h-full sm:relative sm:h-screen sm:w-screen bg-gray-900 text-white font-sans sm:flex sm:items-center sm:justify-center overflow-hidden">
      <CartProvider>
        <PlayerProvider>
          <AppContent />
        </PlayerProvider>
      </CartProvider>
    </div>
  );
};

export default App;
