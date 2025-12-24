
import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../types';

const MoreListItem: React.FC<{ to: Page; children: React.ReactNode }> = ({ to, children }) => (
    <li className="bg-gray-800 rounded-lg">
        <Link to={to} className="flex items-center justify-between p-4 transition-colors hover:bg-gray-700">
            <span className="font-medium">{children}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </Link>
    </li>
);

const MorePage: React.FC = () => {
  return (
    <div className="p-4 flex flex-col h-full">
      <h1 className="text-3xl font-bold mb-6 text-white">More</h1>
      
      {/* Public Section */}
      <ul className="space-y-3">
        <MoreListItem to={Page.Community}>Community & Stories</MoreListItem>
        <MoreListItem to={Page.Music}>Music Gallery</MoreListItem>
        <MoreListItem to={Page.Shop}>Shop</MoreListItem>
        <MoreListItem to={Page.YorubaHero}>Akinkanju Yoruba</MoreListItem>
        <MoreListItem to={Page.AboutUs}>About Us</MoreListItem>
        <MoreListItem to={Page.Mission}>Our Mission</MoreListItem>
        <MoreListItem to={Page.Vision}>Our Vision</MoreListItem>
        <MoreListItem to={Page.Contact}>Contact Us</MoreListItem>
        <MoreListItem to={Page.QA}>Q & A</MoreListItem>
        <MoreListItem to={Page.Donate}>Donate</MoreListItem>
        <MoreListItem to={Page.Widgets}>Widgets</MoreListItem>
      </ul>

      {/* Admin/Settings Section */}
      <div className="mt-8 pt-8 border-t border-gray-700">
        <ul className="space-y-3">
          <MoreListItem to={Page.Settings}>Settings</MoreListItem>
          <MoreListItem to={Page.Analytics}>Analytics</MoreListItem>
          <MoreListItem to={Page.Admin}>Admin Panel</MoreListItem>
        </ul>
      </div>
    </div>
  );
};

export default MorePage;
