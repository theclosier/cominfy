"use client";

import { createClient } from "@/utils/supabase/client";

useEffect(() => {
    const checkAuth = async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        setIsLoggedIn(!!user);
    };
    checkAuth();
}, []);
import { Calendar, MapPin, Ticket, ChevronLeft, Heart, Share2, Globe, Twitter, Instagram, Linkedin, Star, LogIn } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { createClient } from "@/utils/supabase/client";

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
        <div className="min-h-screen bg-stone-50/50 font-sans pb-24">
            {/* --- COMPACT HEADER (Same as Community Page) --- */}
            <div className="bg-white border-b border-border-subtle sticky top-0 z-40 shadow-sm/50 mb-8">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                        {/* Left: Logo & Name */}
                        <div className="flex items-center gap-4 flex-1 w-full md:w-auto">
                            <Link href={`/c/${community.subdomain}`}>
                                <img
                                    src={community.logo}
                                    alt={community.name}
                                    className="w-16 h-16 rounded-xl border border-stone-100 shadow-sm hover:opacity-90 transition-opacity"
                                />
                            </Link>
                            <div>
                                <Link href={`/c/${community.subdomain}`} className="text-2xl font-bold text-text-main leading-tight hover:text-primary transition-colors">
                                    {community.name}
                                </Link>
                                <div className="flex gap-2 mt-1">
                                    {community.socials?.website && <a href={community.socials.website} className="text-text-muted hover:text-primary"><Globe className="w-4 h-4" /></a>}
                                    {community.socials?.twitter && <a href={community.socials.twitter} className="text-text-muted hover:text-[#1DA1F2]"><Twitter className="w-4 h-4" /></a>}
                                    {community.socials?.instagram && <a href={community.socials.instagram} className="text-text-muted hover:text-[#E1306C]"><Instagram className="w-4 h-4" /></a>}
                                    {community.socials?.linkedin && <a href={community.socials.linkedin} className="text-text-muted hover:text-[#0077b5]"><Linkedin className="w-4 h-4" /></a>}
                                </div>
                            </div>
                        </div>

                        {/* Right: Stats & Action */}
                        <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                            <div className="flex gap-8 text-sm">
                                {/* Mock Stats for now as they aren't in DB yet fully calculated */}
                                <div className="text-right">
                                    <div className="font-bold text-text-main text-lg">1,240</div>
                                    <div className="text-text-muted text-xs uppercase tracking-wide">Üye</div>
                                </div>
                                <div className="text-right border-l border-border-subtle pl-8">
                                    <div className="font-bold text-text-main text-lg">İstanbul</div>
                                    <div className="text-text-muted text-xs uppercase tracking-wide">Konum</div>
                                </div>
                                <div className="text-right border-l border-border-subtle pl-8">
                                    <div className="font-bold text-text-main text-lg flex items-center gap-1 justify-end">
                                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 4.9
                                    </div>
                                    <div className="text-text-muted text-xs uppercase tracking-wide">Puan</div>
                                </div>
                            </div>

                            {isLoggedIn ? (
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-xl p-1.5 pr-4">
                                        <div className="w-9 h-9 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-sm">
                                            JD
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-text-main">Profil</div>
                                            <div className="text-[10px] text-text-muted font-bold uppercase tracking-wide">Üye</div>
                                        </div>
                                    </div>
                                    {/* Logout would need proper implementation but sticking to UI only for this view component */}
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link
                                        href={`/c/${community.subdomain}/login`}
                                        className="px-5 py-3 text-sm font-bold text-text-main hover:bg-stone-50 rounded-xl transition-colors border border-transparent hover:border-stone-200 flex items-center gap-2"
                                    >
                                        <LogIn className="w-4 h-4" />
                                        Giriş Yap
                                    </Link>
                                    <Link
                                        href={`/c/${community.subdomain}/join`}
                                        className="btn-primary py-3 px-8 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 whitespace-nowrap"
                                    >
                                        Aramıza Katıl
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-5xl mx-auto px-6 py-8 animate-in fade-in zoom-in duration-500">

                {/* Back to Community Link */}
                <Link href={`/c/${community.subdomain}`} className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-medium mb-6">
                    <ChevronLeft className="w-4 h-4" />
                    Etkinliklere Dön
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8 animate-in slide-in-from-bottom-2 delay-100 duration-700 fill-mode-both">
                        {/* Image */}
                        <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-lg shadow-stone-200/50 aspect-video bg-stone-200 group relative">
                            {event.image && (
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        {/* Title & Description */}
                        <div>
                            <div className="flex gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider border border-teal-100">
                                    Etkinlik
                                </span>
                                <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-xs font-bold uppercase tracking-wider border border-stone-200">
                                    {event.platform || 'Cominfy'}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-6 leading-tight tracking-tight">{event.title}</h1>

                            <div className="prose prose-stone max-w-none prose-lg">
                                <h3 className="text-xl font-bold text-stone-900 mb-3 tracking-tight">Etkinlik Hakkında</h3>
                                <p className="text-stone-600 leading-relaxed text-lg font-medium">
                                    {event.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Ticket Box */}
                    <div className="lg:col-span-1 animate-in slide-in-from-bottom-2 delay-200 duration-700 fill-mode-both">
                        <div className="sticky top-40 space-y-6">

                            {/* Registration Card */}
                            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-stone-900 tracking-tight">Etkinlik Detayları</h3>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-stone-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all">
                                            <Heart className="w-5 h-5" />
                                        </button>
                                        <button className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-all">
                                            <Share2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-6 mb-8">
                                    <div className="flex items-start gap-4 group">
                                        <div className="p-3 bg-stone-50 rounded-xl text-stone-500 border border-stone-100 group-hover:bg-white group-hover:text-teal-600 group-hover:shadow-sm transition-all">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-stone-900 font-bold text-sm uppercase tracking-wide">Tarih</p>
                                            <p className="text-stone-600 text-sm font-medium">{new Date(event.start_date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                            <p className="text-stone-400 text-xs mt-0.5 font-medium bg-stone-50 inline-block px-1.5 py-0.5 rounded border border-stone-100">{new Date(event.start_date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <div className="p-3 bg-stone-50 rounded-xl text-stone-500 border border-stone-100 group-hover:bg-white group-hover:text-teal-600 group-hover:shadow-sm transition-all">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-stone-900 font-bold text-sm uppercase tracking-wide">Konum</p>
                                            <p className="text-stone-600 text-sm font-medium">{event.location}</p>
                                            <a href="#" className="text-teal-600 text-xs font-bold hover:underline mt-1 block">Haritada Gör</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <div className="p-3 bg-stone-50 rounded-xl text-stone-500 border border-stone-100 group-hover:bg-white group-hover:text-teal-600 group-hover:shadow-sm transition-all">
                                            <Ticket className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-stone-900 font-bold text-sm uppercase tracking-wide">Giriş</p>
                                            <p className="text-stone-600 text-sm font-medium decoration-rose-500">
                                                {event.price ? `${event.price} TL` : 'Ücretsiz'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {isRegistered ? (
                                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 text-center animate-in zoom-in duration-300">
                                        <p className="text-emerald-700 font-bold mb-1 text-lg">Kaydınız Alındı! 🎉</p>
                                        <p className="text-emerald-600 text-sm font-medium">Biletiniz e-posta adresinize gönderildi.</p>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleRegister}
                                        disabled={isRegistering || !isLoggedIn}
                                        className={clsx(
                                            "w-full font-bold py-4 rounded-xl shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 hover:translate-y-[-2px]",
                                            !isLoggedIn
                                                ? "bg-stone-200 text-stone-500 cursor-not-allowed shadow-none hover:translate-y-0"
                                                : "bg-stone-900 hover:bg-stone-800 text-white shadow-stone-900/10"
                                        )}
                                        title={!isLoggedIn ? "Kayıt olmak için lütfen giriş yapın" : ""}
                                    >
                                        {isRegistering ? 'İşleniyor...' : (
                                            <>
                                                {isLoggedIn ? 'Kayıt Ol' : 'Kayıt İçin Giriş Yapın'} <Ticket className="w-4 h-4 ml-1 opacity-50" />
                                            </>
                                        )}
                                    </button>
                                )}

                                <p className="text-center text-xs text-stone-400 mt-5 font-medium">
                                    <strong className="text-teal-600">{Math.floor((event.capacity || 100) * 0.4)} kişi</strong> şimdiden yerini ayırttı!
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
