"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function MobileAdminNav() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Do not show on login page
    if (pathname.includes('/login')) return null;

    return (
        <>
            {/* Mobile Header / Hamburger Trigger */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-cream-100/80 backdrop-blur-md border-b border-white z-30 px-4 flex items-center justify-between">
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 -ml-2 text-obsidian hover:bg-black/5 rounded-lg transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <span className="font-serif font-bold text-lg text-obsidian">COMINFY</span>
                <div className="w-8"></div> {/* Spacer for center alignment */}
            </div>

            {/* Spacer to push content down on mobile */}
            <div className="h-16 md:hidden"></div>

            {/* Drawer Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Drawer */}
            <div className={clsx(
                "fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:hidden",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <Sidebar
                    className="flex w-64 h-full shadow-2xl"
                    onClose={() => setIsOpen(false)}
                />
            </div>
        </>
    );
}
