
import React from 'react';

const StripeIcon: React.FC<{className?: string}> = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 48 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M11.35 15.34V8.65H14.1v6.69h-2.75zM15.42 15.34V8.65h2.75v6.69h-2.75zM19.49 15.34V8.65h2.75v6.69h-2.75zM24.49 15.34V8.65h2.75v5.33h3.45v1.36h-6.2zM32.89 15.34a3.3 3.3 0 01-3.3-3.35 3.3 3.3 0 013.3-3.35c.9 0 1.65.34 2.21.9l-1.36 1.18a.9.9 0 00-.85-.55c-.56 0-1 .44-1 .99s.44 1 1 1c.55 0 .85-.22.9-.55h1.45c-.13 1.54-1.4 2.63-2.35 2.63z" />
        <path d="M0 0v24h48V0H0zm45.25 19.34H2.75V4.65h42.5v14.69z" />
    </svg>
);

export default StripeIcon;
