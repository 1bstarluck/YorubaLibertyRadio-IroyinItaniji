
import React from 'react';
import UsersIcon from '../components/icons/UsersIcon';
import DollarSignIcon from '../components/icons/DollarSignIcon';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4 border border-gray-700">
        <div className="bg-gray-700 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const ChartPlaceholder: React.FC<{ title: string, className?: string }> = ({ title, className }) => (
    <div className={`bg-gray-800 p-4 rounded-lg border border-gray-700 ${className}`}>
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        <div className="w-full h-48 bg-gray-700/50 rounded-md flex items-center justify-center">
            <p className="text-gray-500 text-sm">Chart Data Unavailable</p>
        </div>
    </div>
);

const AnalyticsPage: React.FC = () => {
    return (
        <div className="p-4 space-y-6">
            <h1 className="text-3xl font-bold text-white">Analytics</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard title="Total Visitors" value="12,890" icon={<UsersIcon className="w-6 h-6 text-yellow-400"/>} />
                <StatCard title="Sales (30d)" value="$4,520" icon={<DollarSignIcon className="w-6 h-6 text-yellow-400"/>} />
            </div>

            <ChartPlaceholder title="Visitor Trends" />
            <ChartPlaceholder title="Sales Revenue" />
            
            <p className="text-center text-xs text-gray-600">This is a placeholder UI. Full analytics requires a backend implementation.</p>

        </div>
    );
};

export default AnalyticsPage;
