
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Page } from '../types';
import HomeIcon from './icons/HomeIcon';
import RadioIcon from './icons/RadioIcon';
import PodcastIcon from './icons/PodcastIcon';
import NewsIcon from './icons/NewsIcon';
import MoreIcon from './icons/MoreIcon';

const NavItem: React.FC<{ to: Page; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center space-y-1 w-1/5 transition-colors duration-200 ${
          isActive ? 'text-yellow-400' : 'text-gray-400 hover:text-white'
        }`
      }
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </NavLink>
  );
};

const BottomNav: React.FC = () => {
  return (
    <footer className="absolute bottom-0 left-0 right-0 h-20 bg-gray-900/90 backdrop-blur-md border-t border-gray-800 z-30">
      <nav className="h-full flex items-center justify-around pb-2">
        <NavItem to={Page.Home} icon={<HomeIcon />} label="Home" />
        <NavItem to={Page.Radio} icon={<RadioIcon />} label="Radio" />
        <NavItem to={Page.Podcasts} icon={<PodcastIcon />} label="Podcasts" />
        <NavItem to={Page.News} icon={<NewsIcon />} label="News" />
        <NavItem to={Page.More} icon={<MoreIcon />} label="More" />
      </nav>
    </footer>
  );
};

export default BottomNav;
