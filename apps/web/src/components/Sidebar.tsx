"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { LayoutDashboard, Calendar, Users, Settings, RefreshCw, Hexagon, LogOut } from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Panel', href: '/yntm/dashboard', icon: LayoutDashboard },
        { name: 'Etkinlikler', href: '/yntm/events', icon: Calendar },
        { name: 'Kulüpler', href: '/yntm/clubs', icon: Hexagon },
        { name: 'Üyeler', href: '/yntm/members', icon: Users },
        { name: 'Senkronizasyon', href: '/yntm/sync', icon: RefreshCw },
        { name: 'Ayarlar', href: '/yntm/settings', icon: Settings },
    ];

    return (
        <aside className="w-64 fixed left-0 top-0 h-screen bg-cream-200 border-r border-sandstone p-6 flex flex-col z-40 hidden md:flex">
            {/* Brand - Text Only */}
            <div className="flex items-center gap-3 px-2 mb-10">
                <Link href="/yntm/dashboard" className="font-serif font-black text-2xl tracking-tighter text-obsidian hover:opacity-80 transition-opacity">
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
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group",
                                isActive
                                    ? "bg-white shadow-sm border border-sandstone text-electric-blue"
                                    : "text-taupe hover:bg-white/50 hover:text-obsidian"
                            )}
                        >
                            <item.icon className={clsx("w-5 h-5 transition-colors", isActive ? "text-electric-blue" : "text-taupe group-hover:text-obsidian")} />
                            <span className={clsx("font-bold text-sm tracking-wide", isActive ? "font-extrabold" : "font-medium")}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile Snippet */}
            <div className="mt-auto pt-6 border-t border-sandstone flex items-center gap-2">
                <Link href="/profile" className="flex-1 flex items-center gap-3 p-2 rounded-2xl hover:bg-white transition-all cursor-pointer group min-w-0 border border-transparent hover:border-sandstone">
                    <div className="w-10 h-10 rounded-full bg-cream-50 border border-sandstone flex items-center justify-center text-obsidian font-serif font-bold group-hover:border-electric-blue transition-colors flex-shrink-0">
                        {/* Simple Initial Avatar instead of broken image */}
                        A
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                        <p className="text-sm font-bold text-obsidian truncate group-hover:text-electric-blue transition-colors">Yönetici</p>
                        <p className="text-xs text-taupe truncate">Topluluk Lideri</p>
                    </div>
                </Link>

                <Link
                    href="/login"
                    className="p-2.5 text-taupe hover:text-coral hover:bg-coral/10 rounded-xl transition-colors flex-shrink-0"
                    title="Çıkış Yap"
                >
                    <LogOut className="w-5 h-5" />
                </Link>
            </div>
        </aside>
    );
}
