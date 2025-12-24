
import React from 'react';

const GeminiIcon: React.FC<{className?: string}> = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.5 4.5L12 1.5L15.5 4.5L19.5 8L22.5 11.5L19.5 15.5L15.5 19L12 22.5L8.5 19L4.5 15.5L1.5 11.5L4.5 8L8.5 4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M8.5 12C8.5 14.2091 10.2909 16 12.5 16C14.7091 16 16.5 14.2091 16.5 12C16.5 9.79086 14.7091 8 12.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
);

export default GeminiIcon;
