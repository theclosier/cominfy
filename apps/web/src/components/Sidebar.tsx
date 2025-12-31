"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { LayoutDashboard, Calendar, Users, Settings, RefreshCw, Hexagon, LogOut } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface SidebarProps {
    className?: string;
    onClose?: () => void;
}

export function Sidebar({ className, onClose }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const navItems = [
        { name: 'Panel', href: '/yntm/dashboard', icon: LayoutDashboard },
        { name: 'Etkinlikler', href: '/yntm/events', icon: Calendar },
        { name: 'Kulüpler', href: '/yntm/clubs', icon: Hexagon },
        { name: 'Üyeler', href: '/yntm/members', icon: Users },
        { name: 'Senkronizasyon', href: '/yntm/sync', icon: RefreshCw },
        { name: 'Ayarlar', href: '/yntm/settings', icon: Settings },
    ];

    const handleNavClick = () => {
        if (onClose) onClose();
    };

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/yntm/login');
    };

    return (
        <aside className={clsx(
            "w-64 fixed left-0 top-0 h-screen bg-electric-blue border-r border-white/10 p-6 flex-col z-40 text-white",
            // If className is provided, use it (for mobile drawer).
            // If NOT provided, use default desktop behavior (hidden on mobile, flex on desktop).
            className ? className : "hidden md:flex"
        )}>
            {/* Brand - Text Only */}
            <div className="flex items-center gap-3 px-2 mb-10">
                <Link href="/yntm/dashboard" onClick={handleNavClick} className="font-serif font-black text-2xl tracking-tighter text-white hover:opacity-80 transition-opacity">
                    COMINFY
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/yntm/dashboard' && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={handleNavClick}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group",
                                isActive
                                    ? "bg-white shadow-lg shadow-black/5 text-electric-blue"
                                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <item.icon className={clsx("w-5 h-5 transition-colors", isActive ? "text-electric-blue" : "text-blue-100 group-hover:text-white")} />
                            <span className={clsx("font-bold text-sm tracking-wide", isActive ? "font-extrabold" : "font-medium")}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile Snippet */}
            <div className="mt-auto pt-6 border-t border-white/10 flex items-center gap-2">
                <Link href="/profile" onClick={handleNavClick} className="flex-1 flex items-center gap-3 p-2 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group min-w-0 border border-transparent">
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white font-serif font-bold group-hover:border-white/40 transition-colors flex-shrink-0">
                        {/* Simple Initial Avatar instead of broken image */}
                        A
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                        <p className="text-sm font-bold text-white truncate">Yönetici</p>
                        <p className="text-xs text-blue-200 truncate group-hover:text-white transition-colors">Topluluk Lideri</p>
                    </div>
                </Link>

                <button
                    onClick={handleLogout}
                    className="p-2.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors flex-shrink-0"
                    title="Çıkış Yap"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        </aside>
    );
}
