
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import GeminiIcon from '../components/icons/GeminiIcon';
import CalendarWidget from '../components/CalendarWidget';
import { getYorubaProverb } from '../services/geminiService';

const CurrencyWidget: React.FC = () => {
    // Mock data for demonstration
    const rates = [
        { pair: 'USD / NGN', rate: 1650.50, change: '+0.5%' },
        { pair: 'GBP / NGN', rate: 2150.20, change: '-0.2%' },
        { pair: 'EUR / NGN', rate: 1780.80, change: '+0.1%' },
    ];

    return (
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                <span className="bg-green-600 w-2 h-2 rounded-full mr-2"></span>
                Market Rates
            </h3>
            <div className="space-y-3">
                {rates.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-gray-700 last:border-0 pb-2 last:pb-0">
                        <span className="font-mono text-gray-300">{item.pair}</span>
                        <div className="text-right">
                            <span className="block font-bold text-white">₦{item.rate.toLocaleString()}</span>
                            <span className={`text-xs ${item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                {item.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-[10px] text-gray-500 mt-3 text-center">Rates are indicative. Updated 5m ago.</p>
        </div>
    );
};

const ProverbWidget: React.FC = () => {
    const [proverb, setProverb] = useState<{ yoruba: string; translation: string; meaning: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchProverb = async () => {
        setLoading(true);
        try {
            const data = await getYorubaProverb();
            setProverb(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProverb();
    }, []);

    return (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-400/30 shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <GeminiIcon className="w-24 h-24 text-yellow-400" />
             </div>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-yellow-400 font-serif italic">Òwe Yorùbá</h3>
                    <button 
                        onClick={fetchProverb} 
                        className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'New Proverb'}
                    </button>
                </div>

                {loading ? (
                    <div className="space-y-3 animate-pulse">
                        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                        <div className="h-16 bg-gray-700 rounded w-full mt-4"></div>
                    </div>
                ) : proverb ? (
                    <div className="animate-fade-in-up">
                        <p className="text-lg text-white font-bold mb-2 leading-relaxed">"{proverb.yoruba}"</p>
                        <p className="text-sm text-gray-400 italic mb-4">"{proverb.translation}"</p>
                        <div className="bg-black/20 p-3 rounded-lg border-l-2 border-yellow-400">
                            <p className="text-xs text-gray-300"><span className="font-bold text-yellow-400">Meaning:</span> {proverb.meaning}</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-red-400 text-sm">Failed to load proverb.</p>
                )}
            </div>
        </div>
    );
};

const WidgetsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-4">
        {/* Header for easy navigation back */}
        <div className="sticky top-0 bg-gray-900/90 backdrop-blur-md z-10 p-4 flex items-center shadow-sm">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-white hover:text-yellow-400 transition-colors">
                <ChevronLeftIcon />
            </button>
            <h1 className="text-xl font-bold text-white ml-2">Widgets</h1>
        </div>

        <div className="p-4 space-y-6">
            <p className="text-gray-400 text-sm mb-4">
                Personalize your experience with these utility widgets.
            </p>

            <section className="animate-fade-in-up">
                <ProverbWidget />
            </section>

            <section className="animate-fade-in-up delay-100">
                <CurrencyWidget />
            </section>

             {/* Replaced Weather Placeholder with Calendar Widget */}
             <section className="animate-fade-in-up delay-200">
                <CalendarWidget />
            </section>
        </div>
    </div>
  );
};

export default WidgetsPage;
