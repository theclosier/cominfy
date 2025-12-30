"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface CommunityHeaderProps {
    community: {
        name: string;
        subdomain: string;
    };
}

export default function CommunityHeader({ community }: CommunityHeaderProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const supabase = createClient();

        // Initial check
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setIsLoggedIn(true);
                setUser(user);
            }
        };
        checkUser();

        // Real-time subscription to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                setIsLoggedIn(true);
                setUser(session?.user || null);
            } else if (event === 'SIGNED_OUT') {
                setIsLoggedIn(false);
                setUser(null);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4 md:px-8">
            <div className="porcelain-glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-warm transition-all duration-300 hover:shadow-lg backdrop-blur-xl border border-white/40">

                {/* Left: Community Brand */}
                <div className="flex items-center gap-3">
                    <Link href={`/c/${community.subdomain}`} className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-lg bg-obsidian text-white flex items-center justify-center font-serif font-bold text-lg shadow-sm group-hover:bg-electric-blue transition-colors">
                            {community.name[0]}
                        </div>
                        <span className="font-serif text-xl font-semibold text-obsidian tracking-tight group-hover:opacity-80 transition-opacity hidden sm:block">
                            {community.name}
                        </span>
                    </Link>
                </div>

                {/* Center: Full Navigation */}
                <nav className="hidden md:flex items-center gap-1 p-1 bg-cream-50/50 rounded-full border border-sandstone/30">
                    <Link href={`/c/${community.subdomain}/about`} className="px-4 py-1.5 rounded-full text-sm font-bold text-taupe hover:text-obsidian hover:bg-white hover:shadow-sm transition-all">
                        Hakkında
                    </Link>
                    <Link href={`/c/${community.subdomain}/events`} className="px-4 py-1.5 rounded-full text-sm font-bold text-taupe hover:text-obsidian hover:bg-white hover:shadow-sm transition-all">
                        Etkinlikler
                    </Link>
                    <Link href={`/c/${community.subdomain}/gallery`} className="px-4 py-1.5 rounded-full text-sm font-bold text-taupe hover:text-obsidian hover:bg-white hover:shadow-sm transition-all">
                        Galeri
                    </Link>
                    <Link href={`/c/${community.subdomain}/rules`} className="px-4 py-1.5 rounded-full text-sm font-bold text-taupe hover:text-obsidian hover:bg-white hover:shadow-sm transition-all">
                        Kurallar
                    </Link>
                </nav>

                {/* Right: User Actions */}
                <div className="flex items-center gap-3">
                    {isLoggedIn ? (
                        <div className="flex items-center gap-3 pl-4 border-l border-sandstone/50">
                            <Link href={`/c/${community.subdomain}/profile`} className="group flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-sandstone">
                                <div className="w-7 h-7 rounded-full bg-cream-200 flex items-center justify-center text-xs font-bold text-obsidian group-hover:text-electric-blue transition-colors">
                                    {user?.email?.[0].toUpperCase() || 'U'}
                                </div>
                                <span className="text-sm font-bold text-obsidian hidden lg:block">Hesabım</span>
                            </Link>
                            <button
                                onClick={async () => {
                                    const supabase = createClient();
                                    await supabase.auth.signOut();
                                    window.location.reload();
                                }}
                                className="w-9 h-9 rounded-full flex items-center justify-center text-taupe hover:text-coral hover:bg-red-50 transition-all"
                                title="Çıkış Yap"
                            >
                                <LogIn className="w-4 h-4 rotate-180" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                href={`/c/${community.subdomain}/login`}
                                className="px-5 py-2 text-sm font-bold text-taupe hover:text-obsidian transition-colors"
                            >
                                Giriş Yap
                            </Link>
                            <Link
                                href={`/c/${community.subdomain}/join`}
                                className="btn-primary py-2 px-5 text-xs uppercase tracking-wider font-bold shadow-md shadow-indigo-500/20"
                            >
                                Katıl
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
