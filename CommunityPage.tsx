
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Testimonial, Page } from '../types';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import UsersIcon from '../components/icons/UsersIcon';

const defaultTestimonials: Testimonial[] = [
    { id: 1, name: "Babatunde A.", location: "Lagos, Nigeria", text: "Yoruba Liberty Radio connects me to my roots like nothing else. The signal is clear and the message is powerful!", imageUrl: "https://picsum.photos/seed/lagos_user/100/100" },
    { id: 2, name: "Adeola O.", location: "Manchester, UK", text: "I love the 'Itan Akoni' podcast. It is important for our children in the diaspora to know their history.", imageUrl: "https://picsum.photos/seed/mcr_user/100/100" },
    { id: 3, name: "Grace K.", location: "Chicago, USA", text: "The emergency radio I bought from the shop is fantastic. Fast shipping and great quality.", imageUrl: "https://picsum.photos/seed/chi_user/100/100" },
    { id: 4, name: "Thabo M.", location: "Johannesburg, South Africa", text: "The best app for authentic news. Keep up the good work! A dupe.", imageUrl: "https://picsum.photos/seed/sa_user/100/100" }
];

const CommunityPage: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        const load = () => {
            const stored = localStorage.getItem('app_testimonials');
            if (stored) {
                try {
                    setTestimonials(JSON.parse(stored));
                } catch {
                    setTestimonials(defaultTestimonials);
                }
            } else {
                setTestimonials(defaultTestimonials);
            }
        };
        load();
        window.addEventListener('storage', load);
        return () => window.removeEventListener('storage', load);
    }, []);

    return (
        <div className="pb-4">
             <div className="sticky top-0 bg-gray-900/90 backdrop-blur-md z-10 p-4 flex items-center shadow-sm">
                <Link to={Page.More} className="p-2 -ml-2 text-white hover:text-yellow-400 transition-colors">
                    <ChevronLeftIcon />
                </Link>
                <h1 className="text-xl font-bold text-white ml-2">Community Voices</h1>
            </div>

            <div className="p-4 space-y-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-center animate-fade-in-up">
                    <UsersIcon className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                    <h2 className="text-xl font-bold text-white mb-2">Listener Stories</h2>
                    <p className="text-gray-400 text-sm">Hear what our global community has to say about Yoruba Liberty Radio.</p>
                </div>

                <div className="grid gap-4 animate-fade-in-up delay-100">
                    {testimonials.map(t => (
                        <div key={t.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
                            <div className="flex items-start space-x-3 mb-3">
                                 <img 
                                    src={t.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=random`} 
                                    alt={t.name} 
                                    className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400" 
                                />
                                <div>
                                    <h4 className="font-bold text-white">{t.name}</h4>
                                    <p className="text-xs text-yellow-400 uppercase font-semibold">{t.location}</p>
                                </div>
                            </div>
                             <p className="text-gray-300 italic text-sm leading-relaxed">"{t.text}"</p>
                             <div className="mt-3 flex text-yellow-500 text-xs">★★★★★</div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8 animate-fade-in-up delay-200">
                    <p className="text-gray-400 text-sm mb-3">Have a story to share?</p>
                    <Link to={Page.Contact} className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors">
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CommunityPage;
