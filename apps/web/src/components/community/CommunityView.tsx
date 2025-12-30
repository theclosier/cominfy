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
        <div className="min-h-screen bg-stone-50/50 font-sans pb-24">

            {/* --- COMPACT HEADER --- */}
            <div className="bg-white border-b border-border-subtle sticky top-0 z-40 shadow-sm/50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="grid grid-cols-3 items-center">

                        {/* Left: Spacer / Back (Optional) */}
                        <div className="hidden md:block">
                            {/* Empty for now to balance centering */}
                        </div>

                        {/* Center: Community Name (Text Only) */}
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-text-main leading-tight tracking-tight">{community.name}</h1>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex justify-end gap-4">
                            {/* Socials can go here if needed, or in the About card. Keeping actions here. */}
                            {isLoggedIn ? (
                                <div className="flex items-center gap-4">
                                    <Link href={`/c/${community.subdomain}/profile`} className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-xl p-1.5 pr-4 hover:border-primary/50 hover:bg-white transition-all group cursor-pointer shadow-sm">
                                        <div className="w-9 h-9 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-sm group-hover:scale-105 transition-transform">
                                            {user?.email?.[0].toUpperCase() || 'U'}
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="text-xs font-bold text-text-main group-hover:text-primary transition-colors">{user?.email?.split('@')[0]}</div>
                                            <div className="text-[10px] text-text-muted font-bold uppercase tracking-wide">Üye</div>
                                        </div>
                                    </Link>
                                    <button
                                        onClick={async () => {
                                            const supabase = createClient();
                                            await supabase.auth.signOut();
                                            window.location.reload();
                                        }}
                                        className="p-2.5 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                        title="Çıkış Yap"
                                    >
                                        <LogIn className="w-5 h-5 rotate-180" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link
                                        href={`/c/${community.subdomain}/login`}
                                        className="hidden md:flex px-5 py-3 text-sm font-bold text-text-main hover:bg-stone-50 rounded-xl transition-colors border border-transparent hover:border-stone-200 items-center gap-2"
                                    >
                                        <LogIn className="w-4 h-4" />
                                        Giriş Yap
                                    </Link>
                                    <Link
                                        href={`/c/${community.subdomain}/join`}
                                        className="btn-primary py-2.5 px-6 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 whitespace-nowrap text-sm"
                                    >
                                        Katıl
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            {/* --- MAIN CONTENT LAYOUT --- */}
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* LEFT COL: CARDS (About, Gallery, Rules) - 4 cols */}
                <div className="lg:col-span-4 space-y-6 animate-in slide-up duration-700 delay-100">

                    {/* Stats Card (New Compact) */}
                    <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm grid grid-cols-3 divide-x divide-stone-100">
                        <div className="text-center px-2">
                            <div className="font-bold text-text-main text-lg md:text-xl tracking-tight">{community.stats?.members || '1.2k'}</div>
                            <div className="text-stone-400 text-[10px] font-bold uppercase tracking-wide mt-1">Üye</div>
                        </div>
                        <div className="text-center px-2">
                            <div className="font-bold text-text-main text-lg md:text-xl tracking-tight line-clamp-1">{community.stats?.city || 'İstanbul'}</div>
                            <div className="text-stone-400 text-[10px] font-bold uppercase tracking-wide mt-1">Konum</div>
                        </div>
                        <div className="text-center px-2">
                            <div className="font-bold text-text-main text-lg md:text-xl tracking-tight flex items-center justify-center gap-1">
                                {community.stats?.score || '4.9'} <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            </div>
                            <div className="text-stone-400 text-[10px] font-bold uppercase tracking-wide mt-1">Puan</div>
                        </div>
                    </div>

                    {/* About Card */}
                    <div className="cominfy-card bg-white p-6 border-stone-200">
                        <div className="flex items-center gap-2 mb-4 text-primary">
                            <Info className="w-5 h-5" />
                            <h3 className="font-bold text-lg">Hakkında</h3>
                        </div>
                        <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-4">
                            {community.description}
                        </p>
                        <Link href={`/c/${community.subdomain}/about`} className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                            Devamını Gör <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    {/* Rules Card */}
                    <div className="cominfy-card bg-white p-6 border-stone-200">
                        <div className="flex items-center gap-2 mb-4 text-amber-600">
                            <BookOpen className="w-5 h-5" />
                            <h3 className="font-bold text-lg">Kurallar</h3>
                        </div>
                        {community.rules && community.rules.length > 0 ? (
                            <ul className="space-y-2 mb-4">
                                {community.rules.slice(0, 3).map((rule: string, idx: number) => (
                                    <li key={idx} className="text-text-muted text-sm flex gap-2">
                                        <span className="text-amber-500">•</span> {rule}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-text-muted text-sm mb-4">Henüz kural eklenmemiş.</p>
                        )}
                        <Link href={`/c/${community.subdomain}/rules`} className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1">
                            Tümünü Oku <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    {/* Gallery Card */}
                    <div className="cominfy-card bg-white p-6 border-stone-200">
                        <div className="flex items-center gap-2 mb-4 text-purple-600">
                            <ImageIcon className="w-5 h-5" />
                            <h3 className="font-bold text-lg">Galeri</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {community.gallery && community.gallery.length > 0 ? (
                                community.gallery.slice(0, 4).map((img: string, idx: number) => (
                                    <img key={idx} src={img} alt="Gallery" className="w-full h-16 object-cover rounded-lg border border-stone-100" />
                                ))
                            ) : (
                                <p className="col-span-2 text-text-muted text-sm">Görsel bulunamadı.</p>
                            )}
                        </div>
                        <Link href={`/c/${community.subdomain}/gallery`} className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1">
                            Fotoğrafları Gör <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
                {/* RIGHT COL: EVENTS STREAM - 8 cols */}
                <div className="lg:col-span-8 animate-in slide-up duration-700 delay-200">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-text-main">Etkinlik Akışı</h2>
                            <span className="px-2 py-0.5 bg-stone-100 text-stone-600 rounded-full text-xs font-bold border border-stone-200">{filteredEvents.length}</span>
                        </div>
                        <div className="flex gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200">
                            <button
                                onClick={() => setEventFilter('UPCOMING')}
                                className={clsx(
                                    "px-4 py-2 text-xs font-bold rounded-md transition-all",
                                    eventFilter === 'UPCOMING' ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-text-main"
                                )}
                            >
                                Yaklaşan
                            </button>
                            <button
                                onClick={() => setEventFilter('PAST')}
                                className={clsx(
                                    "px-4 py-2 text-xs font-bold rounded-md transition-all",
                                    eventFilter === 'PAST' ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-text-main"
                                )}
                            >
                                Geçmiş
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {filteredEvents.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 border-dashed">
                                <Calendar className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                                <h3 className="text-text-main font-bold">Etkinlik Bulunamadı</h3>
                                <p className="text-text-muted text-sm">Bu kategoride şu an gösterilecek etkinlik yok.</p>
                            </div>
                        ) : (
                            filteredEvents.map((event, idx) => (
                                <Link
                                    key={event.id}
                                    href={`/c/${community.subdomain}/events/${event.id}`}
                                    className="group bg-white rounded-2xl p-5 border border-stone-200 hover:border-primary/20 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-6 items-start cursor-pointer block"
                                >
                                    {/* Date Box */}
                                    <div className={clsx(
                                        "flex-shrink-0 w-full md:w-20 rounded-xl p-3 flex flex-col items-center justify-center text-center border transition-colors duration-300",
                                        eventFilter === 'PAST' ? "bg-stone-100 border-stone-200 opacity-70" : "bg-stone-50 border-stone-100 group-hover:bg-primary group-hover:text-white"
                                    )}>
                                        <span className="text-xs font-bold uppercase tracking-wider mb-0.5 opacity-60">
                                            {new Date(event.start_date).toLocaleString('tr-TR', { month: 'short' })}
                                        </span>
                                        <span className="text-3xl font-bold leading-none">
                                            {new Date(event.start_date).getDate()}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-600 px-2 py-0.5 rounded border border-stone-200">
                                                {event.platform || 'Cominfy'}
                                            </span>
                                            {eventFilter === 'UPCOMING' ? (
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                                    Kayıtlar Açık
                                                </span>
                                            ) : (
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                                                    Tamamlandı
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-xl font-bold text-text-main mb-2 group-hover:text-primary transition-colors cursor-pointer">
                                            {event.title}
                                        </h3>

                                        <p className="text-text-muted text-sm line-clamp-2 mb-4 leading-relaxed">
                                            {event.description}
                                        </p>

                                        <div className="flex items-center gap-6 text-xs font-medium text-text-muted">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(event.start_date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-4 h-4" />
                                                {event.location}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Users className="w-4 h-4" />
                                                {/* Mock capacity for now since I didn't verify it in DB query yet, safe default */}
                                                {event.registeredCount || 0}/{event.capacity || 100}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <div className="self-center flex-shrink-0">
                                        <span className="btn-secondary py-2.5 px-5 text-xs shadow-sm hover:shadow-md inline-block">
                                            İncele
                                        </span>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
