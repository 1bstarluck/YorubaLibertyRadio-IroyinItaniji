
import React, { useState, useEffect } from 'react';
import CalendarIcon from './icons/CalendarIcon';
import { CalendarEvent } from '../types';

const CalendarWidget: React.FC = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    useEffect(() => {
        const loadEvents = () => {
            const storedEvents = localStorage.getItem('calendar_events');
            if (storedEvents) {
                try {
                    const parsedEvents: CalendarEvent[] = JSON.parse(storedEvents);
                    // Sort events by date
                    const sorted = parsedEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                    // Filter out past events (optional, keeping all for now or upcoming)
                    const upcoming = sorted.filter(e => new Date(e.date) >= new Date(new Date().setHours(0,0,0,0)));
                    setEvents(upcoming);
                } catch (e) {
                    console.error("Failed to parse calendar events", e);
                }
            } else {
                // Default dummy events if nothing exists
                setEvents([
                    { id: '1', date: new Date().toISOString().split('T')[0], title: 'Live Broadcast Special' },
                    { id: '2', date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], title: 'Yoruba Culture Day' },
                ]);
            }
        };

        loadEvents();
        // Listen for storage changes in case Admin updates it in another tab/window
        window.addEventListener('storage', loadEvents);
        return () => window.removeEventListener('storage', loadEvents);
    }, []);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        return { day, month };
    };

    return (
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <CalendarIcon className="w-5 h-5 text-yellow-400 mr-2" />
                Community Calendar
            </h3>
            
            {events.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                    <p>No upcoming events.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {events.slice(0, 4).map((event) => {
                        const { day, month } = formatDate(event.date);
                        return (
                            <div key={event.id} className="flex items-center bg-gray-700/50 rounded-lg p-2 border border-gray-700">
                                <div className="bg-gray-800 rounded-md p-2 w-14 flex flex-col items-center justify-center border border-gray-600 flex-shrink-0">
                                    <span className="text-[10px] uppercase text-red-400 font-bold">{month}</span>
                                    <span className="text-xl font-bold text-white leading-none">{day}</span>
                                </div>
                                <div className="ml-3">
                                    <p className="font-semibold text-gray-100 text-sm line-clamp-1">{event.title}</p>
                                    <p className="text-xs text-yellow-400">Upcoming Event</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            <div className="mt-3 text-center">
                <p className="text-[10px] text-gray-500">Check regular announcements for updates.</p>
            </div>
        </div>
    );
};

export default CalendarWidget;
