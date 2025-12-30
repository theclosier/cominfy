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

        <div className="min-h-screen pb-24 pt-32 px-4 md:px-8 bg-cream-100">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* --- MINIMAL STATS & SOCIALS (Row 1) --- */}
                <div className="porcelain-glass rounded-[24px] p-4 flex flex-col md:flex-row items-center justify-between gap-6 shadow-warm">
                    <div className="flex gap-8 px-4">
                        <div className="flex flex-col items-center md:items-start">
                            <span className="text-lg font-serif text-obsidian font-bold">{community.stats?.members || '1.2k'}</span>
                            <span className="text-[9px] font-bold text-taupe uppercase tracking-widest">Üye</span>
                        </div>
                        <div className="w-px bg-sandstone h-8 self-center hidden md:block"></div>
                        <div className="flex flex-col items-center md:items-start">
                            <span className="text-lg font-serif text-obsidian font-bold">{community.stats?.city || 'İstanbul'}</span>
                            <span className="text-[9px] font-bold text-taupe uppercase tracking-widest">Konum</span>
                        </div>
                        <div className="w-px bg-sandstone h-8 self-center hidden md:block"></div>
                        <div className="flex flex-col items-center md:items-start">
                            <span className="text-lg font-serif text-obsidian font-bold flex items-center gap-1">
                                {community.stats?.score || '4.9'} <Star className="w-3 h-3 text-gold fill-gold" />
                            </span>
                            <span className="text-[9px] font-bold text-taupe uppercase tracking-widest">Puan</span>
                        </div>
                    </div>

                    <div className="flex gap-2 px-2">
                        {community.socials?.website && <a href={community.socials.website} className="p-2.5 rounded-full bg-cream-50 hover:bg-electric-blue hover:text-white transition-colors text-taupe border border-sandstone shadow-sm"><Globe className="w-4 h-4" /></a>}
                        {community.socials?.twitter && <a href={community.socials.twitter} className="p-2.5 rounded-full bg-cream-50 hover:bg-[#1DA1F2] hover:text-white transition-colors text-taupe border border-sandstone shadow-sm"><Twitter className="w-4 h-4" /></a>}
                        {community.socials?.instagram && <a href={community.socials.instagram} className="p-2.5 rounded-full bg-cream-50 hover:bg-[#E1306C] hover:text-white transition-colors text-taupe border border-sandstone shadow-sm"><Instagram className="w-4 h-4" /></a>}
                        {community.socials?.linkedin && <a href={community.socials.linkedin} className="p-2.5 rounded-full bg-cream-50 hover:bg-[#0077b5] hover:text-white transition-colors text-taupe border border-sandstone shadow-sm"><Linkedin className="w-4 h-4" /></a>}
                    </div>
                </div>

                {/* --- INFO TILES (About / Gallery / Rules) (Row 2) --- */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">

                    {/* About Tile */}
                    <Link href={`/c/${community.subdomain}/about`} className="md:col-span-4 porcelain-glass rounded-[32px] p-10 md:p-12 hover:border-electric-blue transition-colors group flex flex-col justify-between h-full shadow-warm border border-white/50">
                        <div>
                            <div className="w-14 h-14 rounded-2xl bg-cream-50 border border-sandstone flex items-center justify-center mb-8 text-electric-blue shadow-sm group-hover:scale-110 transition-transform">
                                <Info className="w-7 h-7" />
                            </div>
                            <h3 className="font-serif text-3xl text-obsidian mb-4">Hakkımızda</h3>
                            <p className="text-charcoal line-clamp-3 text-base leading-relaxed">{community.description}</p>
                        </div>
                        <div className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-electric-blue opacity-80 group-hover:opacity-100 transition-opacity">
                            Detaylar <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    {/* Gallery Tile */}
                    <Link href={`/c/${community.subdomain}/gallery`} className="md:col-span-4 porcelain-glass rounded-[32px] p-10 md:p-12 hover:border-electric-blue transition-colors group flex flex-row items-center justify-between h-full shadow-warm border border-white/50">
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <div className="w-14 h-14 rounded-2xl bg-cream-50 border border-sandstone flex items-center justify-center mb-8 text-obsidian shadow-sm group-hover:scale-110 transition-transform">
                                    <ImageIcon className="w-7 h-7" />
                                </div>
                                <h3 className="font-serif text-3xl text-obsidian">Galeri</h3>
                                <p className="text-taupe text-sm mt-2 font-medium">{community.gallery?.length || 0} Fotoğraf</p>
                            </div>
                            <div className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-obsidian opacity-80 group-hover:opacity-100 transition-opacity">
                                İncele <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                        {/* Thumbnail - Slightly larger/better positioned */}
                        <div className="w-36 h-36 rounded-[24px] overflow-hidden border border-sandstone shadow-sm rotate-3 group-hover:rotate-0 transition-all duration-300 ml-4 shrink-0">
                            <img
                                src={community.gallery?.[0] || community.cover_image}
                                className="w-full h-full object-cover"
                                alt="Gallery Thumbnail"
                            />
                        </div>
                    </Link>

                    {/* Rules Tile */}
                    <Link href={`/c/${community.subdomain}/rules`} className="md:col-span-4 porcelain-glass rounded-[32px] p-10 md:p-12 hover:border-electric-blue transition-colors group flex flex-col justify-between h-full shadow-warm border border-white/50">
                        <div>
                            <div className="w-14 h-14 rounded-2xl bg-cream-50 border border-sandstone flex items-center justify-center mb-8 text-coral shadow-sm group-hover:scale-110 transition-transform">
                                <BookOpen className="w-7 h-7" />
                            </div>
                            <h3 className="font-serif text-3xl text-obsidian mb-4">Kurallar</h3>
                            <ul className="space-y-3 mt-2">
                                {community.rules?.slice(0, 2).map((r: string, i: number) => (
                                    <li key={i} className="text-charcoal/80 text-sm flex gap-3 items-center"><span className="w-1.5 h-1.5 rounded-full bg-sandstone shrink-0"></span> <span className="line-clamp-2">{r}</span></li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-coral opacity-80 group-hover:opacity-100 transition-opacity">
                            Oku <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                </div>

                {/* --- EVENTS SECTION (Row 3) --- */}
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-serif text-obsidian">Etkinlikler</h2>
                        <Link href={`/c/${community.subdomain}/events`} className="text-xs text-electric-blue font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">
                            Tümünü Gör <ArrowRight className="w-4 h-4 ml-0.5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredEvents.length > 0 ? (
                            filteredEvents.slice(0, 3).map((event) => (
                                <Link
                                    href={`/c/${community.subdomain}/events/${event.id}`}
                                    key={event.id}
                                    className="group bg-white rounded-[32px] border border-sandstone overflow-hidden hover:shadow-xl hover:border-electric-blue/30 transition-all duration-300 flex flex-col h-full shadow-warm"
                                >
                                    {/* Image Area - Aspect 4/3 like Admin Panel */}
                                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-50">
                                        <img
                                            src={event.cover_image || community.cover_image || "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop"}
                                            alt={event.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        {/* Top Right "YAYINDA" Badge */}
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md border border-white/20 bg-emerald-100/90 text-emerald-700">
                                                YAYINDA
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-6 flex flex-col flex-1 justify-between">
                                        <div>
                                            {/* Meta Line */}
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-xs font-bold text-obsidian uppercase tracking-wider">{event.platform || 'Cominfy'}</span>
                                                <span className="text-taupe text-[10px]">•</span>
                                                <span className="text-xs font-medium text-taupe flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(event.start_date).toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-xl font-serif text-obsidian leading-tight mb-2 group-hover:text-electric-blue transition-colors">
                                                {event.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-taupe text-sm line-clamp-2 leading-relaxed font-medium">
                                                {event.description || 'Etkinlik detayları için tıklayın.'}
                                            </p>
                                        </div>

                                        {/* Footer Line */}
                                        <div className="mt-6 pt-6 border-t border-sandstone/50 flex items-center justify-between">
                                            <div className="flex items-center text-xs font-bold text-taupe uppercase tracking-wide">
                                                <MapPin className="w-3.5 h-3.5 mr-1.5 text-taupe" />
                                                {event.location || 'Online'}
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-cream-50 flex items-center justify-center text-taupe group-hover:bg-electric-blue group-hover:text-white transition-colors border border-sandstone">
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center bg-white/40 rounded-[32px] border border-sandstone border-dashed">
                                <div className="w-16 h-16 bg-cream-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-taupe">
                                    <Calendar className="w-8 h-8 opacity-50" />
                                </div>
                                <h3 className="text-xl font-serif text-obsidian mb-2">Etkinlik Bulunamadı</h3>
                                <p className="text-taupe">Bu toplulukta henüz etkinlik oluşturulmamış.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
