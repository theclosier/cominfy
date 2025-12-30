"use client";

import { useState, useEffect } from "react";

import { createClient } from "@/utils/supabase/client";

import { Calendar, MapPin, Ticket, ChevronLeft, Heart, Share2 } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

interface EventDetailViewProps {
    event: any;
    community: any;
}

export default function EventDetailView({ event, community }: EventDetailViewProps) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    // Auth State for Header
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            setIsLoggedIn(!!user);
        };
        checkAuth();
    }, []);

    const handleRegister = () => {
        setIsRegistering(true);
        setTimeout(() => {
            setIsRegistering(false);
            setIsRegistered(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 md:px-8">
            <main className="max-w-6xl mx-auto px-6 py-8 animate-in fade-in zoom-in duration-500">

                {/* --- CONTENT START --- */}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* --- LEFT COL: CONTENT (8 cols) --- */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Porcelain Window: Image */}
                        <div className="relative aspect-video rounded-[32px] overflow-hidden shadow-warm border border-sandstone group">
                            {event.image ? (
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                            ) : (
                                <div className="w-full h-full bg-cream-200 flex items-center justify-center text-taupe">Görsel Yok</div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                            {/* Floating Badge */}
                            <div className="absolute top-6 left-6 flex gap-2">
                                <span className="porcelain-glass px-4 py-1.5 rounded-full text-obsidian text-xs font-bold uppercase tracking-wider backdrop-blur-xl">
                                    {event.platform || 'Etkinlik'}
                                </span>
                            </div>
                        </div>

                        {/* Title & Description */}
                        <div>
                            <h1 className="text-4xl md:text-5xl font-serif text-obsidian mb-6 leading-[1.1] tracking-tight">
                                {event.title}
                            </h1>
                            <div className="prose prose-lg prose-neutral max-w-none">
                                <h3 className="font-serif text-2xl text-obsidian mb-4">Etkinlik Hakkında</h3>
                                <p className="text-charcoal leading-relaxed text-lg font-light">
                                    {event.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT COL: ACTION WINDOW (4 cols) --- */}
                    <div className="lg:col-span-4 sticky top-32">
                        <div className="porcelain-glass rounded-[32px] p-8 border border-white/50 shadow-xl shadow-stone-200/50 relative overflow-hidden">
                            {/* Decorative Glow */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-electric-blue/10 blur-3xl rounded-full pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="font-serif text-2xl text-obsidian">Detaylar</h3>
                                    <div className="flex gap-2">
                                        <button className="p-2.5 rounded-full bg-cream-50 hover:bg-white border border-transparent hover:border-sandstone transition-all text-taupe hover:text-coral">
                                            <Heart className="w-5 h-5" />
                                        </button>
                                        <button className="p-2.5 rounded-full bg-cream-50 hover:bg-white border border-transparent hover:border-sandstone transition-all text-taupe hover:text-obsidian">
                                            <Share2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-6 mb-8">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-white rounded-2xl border border-sandstone shadow-sm text-electric-blue">
                                            <Calendar className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-taupe text-xs font-bold uppercase tracking-wider mb-0.5">Tarih & Saat</p>
                                            <p className="text-obsidian font-semibold">{new Date(event.start_date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                            <p className="text-charcoal text-sm">{new Date(event.start_date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-white rounded-2xl border border-sandstone shadow-sm text-electric-blue">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-taupe text-xs font-bold uppercase tracking-wider mb-0.5">Konum</p>
                                            <p className="text-obsidian font-semibold">{event.location}</p>
                                            <a href="#" className="text-electric-blue text-xs font-bold hover:underline">Haritada Aç</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-white rounded-2xl border border-sandstone shadow-sm text-electric-blue">
                                            <Ticket className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-taupe text-xs font-bold uppercase tracking-wider mb-0.5">Giriş</p>
                                            <p className="text-obsidian font-semibold text-xl">
                                                {event.price ? `${event.price} ₺` : 'Ücretsiz'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {isRegistered ? (
                                    <div className="bg-neon-mint/10 border border-neon-mint/20 rounded-2xl p-6 text-center animate-in zoom-in duration-300">
                                        <div className="w-12 h-12 bg-neon-mint/20 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-700">
                                            <Ticket className="w-6 h-6" />
                                        </div>
                                        <p className="text-emerald-800 font-bold mb-1">Kaydınız Alındı!</p>
                                        <p className="text-emerald-700/80 text-sm">Biletiniz e-postanıza gönderildi.</p>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleRegister}
                                        disabled={isRegistering || !isLoggedIn}
                                        className={clsx(
                                            "w-full btn-primary py-4 text-base shadow-xl", // Uses global btn-primary from globals.css
                                            !isLoggedIn && "opacity-50 cursor-not-allowed bg-taupe shadow-none"
                                        )}
                                        title={!isLoggedIn ? "Kayıt olmak için lütfen giriş yapın" : ""}
                                    >
                                        {isRegistering ? 'İşleniyor...' : (
                                            <>
                                                {isLoggedIn ? 'Kayıt Ol' : 'Giriş Yapmalısın'}
                                            </>
                                        )}
                                    </button>
                                )}

                                <p className="text-center text-xs text-taupe mt-6 font-medium">
                                    <strong className="text-electric-blue">{Math.floor((event.capacity || 100) * 0.4)} kişi</strong> şimdiden yerini ayırttı.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
