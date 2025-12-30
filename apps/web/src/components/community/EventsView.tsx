"use client";

import { useState } from "react";
import { Calendar, MapPin, Search } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

interface EventsViewProps {
    community: any;
    events: any[];
}

export default function EventsView({ community, events }: EventsViewProps) {
    const [filter, setFilter] = useState<'UPCOMING' | 'PAST'>('UPCOMING');
    const [searchTerm, setSearchTerm] = useState('');

    const now = new Date();

    // Filter & Sort Logic
    const filteredEvents = events.filter(event => {
        const eventDate = new Date(event.start_date);
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location?.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        if (filter === 'UPCOMING') {
            return eventDate >= now;
        } else {
            return eventDate < now;
        }
    }).sort((a, b) => {
        const dateA = new Date(a.start_date).getTime();
        const dateB = new Date(b.start_date).getTime();
        // Upcoming: ASC (nearest first), Past: DESC (most recent first)
        return filter === 'UPCOMING' ? dateA - dateB : dateB - dateA;
    });

    return (
        <div className="min-h-screen bg-cream-100 font-sans pb-24 pt-32 px-4 md:px-8">
            <div className="max-w-7xl mx-auto animate-in fade-in zoom-in duration-500">

                {/* --- HEADER & FILTERS --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif text-obsidian tracking-tight">Etkinlikler</h1>
                        <p className="text-charcoal mt-2 text-lg font-light">
                            {community.name} topluluğunun güncel etkinlikleri.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search */}
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-taupe group-focus-within:text-electric-blue transition-colors" />
                            <input
                                type="text"
                                placeholder="Etkinlik ara..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-3 bg-white border border-sandstone rounded-full text-sm font-medium focus:outline-none focus:border-electric-blue focus:ring-4 focus:ring-electric-blue/10 transition-all w-full sm:w-64 shadow-sm"
                            />
                        </div>

                        {/* Filter Toggles */}
                        <div className="flex bg-white p-1 rounded-full border border-sandstone shadow-sm">
                            <button
                                onClick={() => setFilter('UPCOMING')}
                                className={clsx(
                                    "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all",
                                    filter === 'UPCOMING' ? "bg-obsidian text-white shadow-md" : "text-taupe hover:text-obsidian hover:bg-cream-50"
                                )}
                            >
                                Yaklaşan
                            </button>
                            <button
                                onClick={() => setFilter('PAST')}
                                className={clsx(
                                    "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all",
                                    filter === 'PAST' ? "bg-obsidian text-white shadow-md" : "text-taupe hover:text-obsidian hover:bg-cream-50"
                                )}
                            >
                                Geçmiş
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- EVENTS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <Link
                                href={`/c/${community.subdomain}/events/${event.id}`}
                                key={event.id}
                                className="group bg-white rounded-[32px] border border-sandstone overflow-hidden hover:shadow-xl hover:border-electric-blue/30 transition-all duration-300 flex flex-col h-full shadow-warm"
                            >
                                {/* Image Area */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={event.cover_image || community.cover_image || "https://images.unsplash.com/photo-1540575467063-178a50935339?auto=format&fit=crop&w=1000&q=80"}
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                                    <div className="absolute top-4 left-4">
                                        <span className="bg-electric-blue/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-sm border border-white/20">
                                            {event.platform || 'Canlı'}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="bg-cream-50 text-obsidian text-xs font-bold px-3 py-1 rounded-lg border border-sandstone flex items-center gap-1.5">
                                            <Calendar className="w-3 h-3 text-electric-blue" />
                                            {new Date(event.start_date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-serif text-obsidian leading-tight mb-3 line-clamp-2 group-hover:text-electric-blue transition-colors">
                                        {event.title}
                                    </h3>

                                    <div className="mt-auto pt-4 border-t border-sandstone/50 flex items-center justify-between text-taupe text-xs font-medium">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span className="truncate max-w-[120px]">{event.location || 'Online'}</span>
                                        </div>
                                        <span className="group-hover:translate-x-1 transition-transform text-electric-blue font-bold uppercase tracking-wider flex items-center gap-1">
                                            Detaylar
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center bg-white/40 rounded-[32px] border border-sandstone border-dashed">
                            <div className="w-16 h-16 bg-cream-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-taupe">
                                <Search className="w-8 h-8 opacity-50" />
                            </div>
                            <h3 className="text-xl font-serif text-obsidian mb-2">Etkinlik Bulunamadı</h3>
                            <p className="text-taupe">Arama kriterlerinize uygun etkinlik yok veya henüz eklenmemiş.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
