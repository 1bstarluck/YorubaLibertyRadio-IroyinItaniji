
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from './icons/SearchIcon';
import ShoppingCartIcon from './icons/ShoppingCartIcon';
import LogoIcon from './icons/LogoIcon';
import { useCart } from '../contexts/CartContext';
import { Page } from '../types';

const Header: React.FC = () => {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [logo, setLogo] = useState<string | null>(null);
  const [title, setTitle] = useState('Yoruba Liberty Radio');
  const [subtitle, setSubtitle] = useState('IROYIN ITANIJI');

  useEffect(() => {
    const loadData = () => {
        const storedLogo = localStorage.getItem('app_logo');
        if (storedLogo) setLogo(storedLogo);

        setTitle(localStorage.getItem('site_title') || 'Yoruba Liberty Radio');
        setSubtitle(localStorage.getItem('site_subtitle') || 'IROYIN ITANIJI');
    };

    loadData();

    const handleStorageChange = () => loadData();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <header className="absolute top-0 left-0 right-0 h-16 bg-gray-900/90 backdrop-blur-md flex items-center justify-between px-4 z-30 border-b border-gray-800 shadow-sm">
      {/* Left: Logo */}
      <div className="p-2">
        {logo ? (
            <img src={logo} alt="Logo" className="w-8 h-8 object-contain rounded-sm" />
        ) : (
            <LogoIcon className="w-8 h-8 text-yellow-400" />
        )}
      </div>

      {/* Center Title */}
      <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2 w-3/5">
        <h1 className="text-lg font-extrabold text-white tracking-tight whitespace-nowrap overflow-hidden text-ellipsis w-full text-center uppercase">{title}</h1>
        {subtitle && <p className="text-sm font-bold text-yellow-400 -mt-1 tracking-wider whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">{subtitle}</p>}
      </div>

      {/* Right Icons */}
      <div className="flex items-center space-x-1">
        <button className="p-2 text-gray-400 hover:text-white" aria-label="Search">
          <SearchIcon />
        </button>
        <Link to={Page.Cart} className="p-2 text-gray-400 hover:text-white relative" aria-label="Shopping cart">
          <ShoppingCartIcon />
          {itemCount > 0 && (
            <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
