
import React from 'react';

const CloudArrowDownIcon: React.FC<{className?: string}> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V3m0 13.5l-3.75-3.75M12 16.5l3.75-3.75M21 15c0-2.485-2.015-4.5-4.5-4.5-1.076 0-2.064.372-2.832.995M3 15c0-2.485 2.015-4.5 4.5-4.5 1.076 0 2.064.372 2.832.995m4.336 6.005A4.5 4.5 0 0112 15" />
    </svg>
);

export default CloudArrowDownIcon;
