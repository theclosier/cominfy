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
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
            <div className="porcelain-glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-warm transition-all duration-300 hover:shadow-lg">

                {/* Left: Community Brand */}
                <div className="flex items-center gap-3">
                    <Link href={`/c/${community.subdomain}`} className="flex items-center gap-3 group">
                        {/* Optional: Add a subtle logo placeholder or keep text only if no logo */}
                        <span className="font-serif text-xl font-semibold text-obsidian tracking-tight group-hover:opacity-80 transition-opacity">
                            {community.name}
                        </span>
                    </Link>
                </div>

                {/* Center: Essential Nav (Hidden on small mobile) */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href={`/c/${community.subdomain}`} className="text-sm font-medium text-charcoal hover:text-electric-blue transition-colors">
                        Etkinlikler
                    </Link>
                    <Link href={`/c/${community.subdomain}/about`} className="text-sm font-medium text-charcoal hover:text-electric-blue transition-colors">
                        Hakkında
                    </Link>
                </nav>

                {/* Right: User Actions */}
                <div className="flex items-center gap-3">
                    {isLoggedIn ? (
                        <div className="flex items-center gap-2 pl-4 border-l border-sandstone">
                            <Link href={`/c/${community.subdomain}/profile`} className="group flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-cream-200 border border-sandstone flex items-center justify-center text-xs font-bold text-obsidian group-hover:border-electric-blue transition-colors">
                                    {user?.email?.[0].toUpperCase() || 'U'}
                                </div>
                            </Link>
                            <button
                                onClick={async () => {
                                    const supabase = createClient();
                                    await supabase.auth.signOut();
                                    window.location.reload();
                                }}
                                className="p-2 text-taupe hover:text-coral transition-colors"
                                title="Çıkış Yap"
                            >
                                <LogIn className="w-4 h-4 rotate-180" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                href={`/c/${community.subdomain}/login`}
                                className="hidden sm:block text-sm font-bold text-charcoal hover:text-obsidian transition-colors"
                            >
                                Giriş
                            </Link>
                            <Link
                                href={`/c/${community.subdomain}/join`}
                                className="btn-primary py-2 px-5 text-sm shadow-md"
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
