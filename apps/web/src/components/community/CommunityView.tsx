"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Globe, Twitter, Instagram, ArrowRight, Users, Linkedin, Star, Info, Image as ImageIcon, BookOpen, LogIn } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { createClient } from "@/utils/supabase/client";

interface CommunityViewProps {
    community: any;
    events: any[];
}

export default function CommunityView({ community, events }: CommunityViewProps) {
    // Filtering State
    const [eventFilter, setEventFilter] = useState<'UPCOMING' | 'PAST'>('UPCOMING');
    // Auth State
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const checkUser = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setIsLoggedIn(true);
                setUser(user);
            }
        };
        checkUser();
    }, []);

    // Filter Logic
    const now = new Date();
    const filteredEvents = events.filter(event => {
        const eventDate = new Date(event.start_date); // Supabase returns start_date
        if (eventFilter === 'UPCOMING') {
            return eventDate >= now;
        } else {
            return eventDate < now;
        }
    }).sort((a, b) => {
        // Sort upcoming ascending, past descending
        const dateA = new Date(a.start_date).getTime();
        const dateB = new Date(b.start_date).getTime();
        return eventFilter === 'UPCOMING' ? dateA - dateB : dateB - dateA;
    });

    return (
        <div className="min-h-screen pb-24 pt-32 px-4 md:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">

                {/* --- HERO CELL (12 cols) --- */}
                <div className="md:col-span-12 relative h-[300px] md:h-[400px] rounded-[32px] overflow-hidden group shadow-warm">
                    <img
                        src={community.cover_image || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"}
                        alt="Cover"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                        <div className="flex items-end justify-between">
                            <div className="animate-slide-up">
                                <img
                                    src={community.logo}
                                    className="w-20 h-20 rounded-2xl border-4 border-white/20 backdrop-blur-md shadow-xl mb-6"
                                    alt="Logo"
                                />
                                <h1 className="text-4xl md:text-6xl font-serif font-medium text-white tracking-tight leading-none mb-2">
                                    {community.name}
                                </h1>
                                <p className="text-white/80 max-w-2xl text-lg font-light line-clamp-2">
                                    {community.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- STATS CELL (12 cols - Horizontal Strip) --- */}
                <div className="md:col-span-12 porcelain-glass rounded-[24px] p-6 flex flex-wrap items-center justify-between gap-8 md:gap-12 shadow-sm animate-in fade-in" style={{ animationDelay: '100ms' }}>
                    <div className="flex gap-12">
                        <div className="flex flex-col">
                            <span className="text-3xl font-serif text-obsidian">{community.stats?.members || '1.2k'}</span>
                            <span className="text-xs font-bold text-taupe uppercase tracking-widest mt-1">Üye</span>
                        </div>
                        <div className="w-px bg-sandstone h-12 self-center hidden md:block"></div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-serif text-obsidian">{community.stats?.city || 'İstanbul'}</span>
                            <span className="text-xs font-bold text-taupe uppercase tracking-widest mt-1">Konum</span>
                        </div>
                        <div className="w-px bg-sandstone h-12 self-center hidden md:block"></div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-serif text-obsidian flex items-center gap-2">
                                {community.stats?.score || '4.9'} <Star className="w-5 h-5 text-gold fill-gold" />
                            </span>
                            <span className="text-xs font-bold text-taupe uppercase tracking-widest mt-1">Puan</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {community.socials?.website && <a href={community.socials.website} className="p-3 rounded-full bg-cream-50 hover:bg-electric-blue hover:text-white transition-colors text-taupe"><Globe className="w-5 h-5" /></a>}
                        {community.socials?.twitter && <a href={community.socials.twitter} className="p-3 rounded-full bg-cream-50 hover:bg-[#1DA1F2] hover:text-white transition-colors text-taupe"><Twitter className="w-5 h-5" /></a>}
                        {community.socials?.instagram && <a href={community.socials.instagram} className="p-3 rounded-full bg-cream-50 hover:bg-[#E1306C] hover:text-white transition-colors text-taupe"><Instagram className="w-5 h-5" /></a>}
                        {community.socials?.linkedin && <a href={community.socials.linkedin} className="p-3 rounded-full bg-cream-50 hover:bg-[#0077b5] hover:text-white transition-colors text-taupe"><Linkedin className="w-5 h-5" /></a>}
                    </div>
                </div>

                {/* --- FILTER & TITLE (12 cols) --- */}
                <div className="md:col-span-12 flex items-center justify-between mt-8 mb-4">
                    <h2 className="text-3xl font-serif text-obsidian">Etkinlikler</h2>
                    <div className="flex bg-cream-200 p-1 rounded-full">
                        <button
                            onClick={() => setEventFilter('UPCOMING')}
                            className={clsx("px-6 py-2 rounded-full text-sm font-bold transition-all", eventFilter === 'UPCOMING' ? "bg-white shadow-sm text-obsidian" : "text-taupe hover:text-charcoal")}
                        >
                            Yaklaşan
                        </button>
                        <button
                            onClick={() => setEventFilter('PAST')}
                            className={clsx("px-6 py-2 rounded-full text-sm font-bold transition-all", eventFilter === 'PAST' ? "bg-white shadow-sm text-obsidian" : "text-taupe hover:text-charcoal")}
                        >
                            Geçmiş
                        </button>
                    </div>
                </div>

                {/* --- EVENTS GRID (Mapped) --- */}
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event, idx) => (
                        <Link
                            href={`/c/${community.subdomain}/events/${event.id}`}
                            key={event.id}
                            className={clsx(
                                "group relative overflow-hidden rounded-[32px] border border-sandstone bg-white shadow-warm hover:shadow-xl transition-all duration-500",
                                // First item is span-8 (Large), others span-4 (Small)
                                idx === 0 ? "md:col-span-8 md:row-span-2" : "md:col-span-4 md:row-span-1"
                            )}
                        >
                            <div className="absolute inset-0">
                                <img
                                    src={event.cover_image || community.cover_image || "https://images.unsplash.com/photo-1540575467063-178a50935339?auto=format&fit=crop&w=1000&q=80"}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            </div>

                            {/* Floating Porcelain Card Inside */}
                            <div className="absolute bottom-4 left-4 right-4 p-5 porcelain-glass rounded-2xl flex flex-col gap-2 group-hover:translate-y-[-4px] transition-transform duration-300">
                                <div className="flex justify-between items-start">
                                    <span className="bg-electric-blue text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                                        {new Date(event.start_date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}
                                    </span>
                                    <span className="text-obsidian bg-white/50 px-2 py-1 rounded-md text-[10px] font-bold">
                                        {event.platform || 'Canlı'}
                                    </span>
                                </div>
                                <h3 className={clsx("font-serif text-obsidian leading-tight", idx === 0 ? "text-2xl" : "text-lg")}>
                                    {event.title}
                                </h3>
                                <div className="flex items-center gap-4 text-xs font-semibold text-charcoal mt-1">
                                    <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(event.start_date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</div>
                                    <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="md:col-span-12 py-20 text-center">
                        <p className="text-taupe font-serif text-xl italic">Bu kategoride etkinlik bulunamadı.</p>
                    </div>
                )}

                {/* --- INFO TILES (About / Gallery / Rules) - Bottom Row --- */}

                {/* About Tile */}
                <Link href={`/c/${community.subdomain}/about`} className="md:col-span-4 bg-cream-50 border border-sandstone rounded-[32px] p-8 hover:border-electric-blue transition-colors group flex flex-col justify-between h-full">
                    <div>
                        <Info className="w-8 h-8 text-electric-blue mb-4" />
                        <h3 className="font-serif text-2xl text-obsidian mb-2">Hakkımızda</h3>
                        <p className="text-charcoal line-clamp-3 text-sm leading-relaxed">{community.description}</p>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-electric-blue">
                        Detaylar <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </Link>

                {/* Gallery Tile */}
                <Link href={`/c/${community.subdomain}/gallery`} className="md:col-span-4 relative overflow-hidden rounded-[32px] group">
                    <img
                        src={community.gallery?.[0] || community.cover_image}
                        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        alt="Gallery"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute bottom-0 left-0 p-8">
                        <ImageIcon className="w-8 h-8 text-white mb-2 opacity-80" />
                        <h3 className="font-serif text-2xl text-white">Galeri</h3>
                        <p className="text-white/80 text-sm mt-1">{community.gallery?.length || 0} Fotoğraf</p>
                    </div>
                </Link>

                {/* Rules Tile */}
                <Link href={`/c/${community.subdomain}/rules`} className="md:col-span-4 bg-obsidian text-cream-50 rounded-[32px] p-8 hover:bg-black transition-colors group flex flex-col justify-between h-full">
                    <div>
                        <BookOpen className="w-8 h-8 text-gold mb-4" />
                        <h3 className="font-serif text-2xl text-white mb-2">Kurallar</h3>
                        <ul className="space-y-2 mt-4">
                            {community.rules?.slice(0, 2).map((r: string, i: number) => (
                                <li key={i} className="text-white/60 text-sm flex gap-2"><span className="text-gold">•</span> {r}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold opacity-80 group-hover:opacity-100">
                        Topluluk Kuralları <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </Link>

            </div>
        </div>
    );
}
