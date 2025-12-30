"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import clsx from "clsx";

export function Shell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Define routes where the sidebar should be hidden
    // Note: We are doing this check here instead of inside Sidebar to control the Layout margin too
    // Let's rewrite the imports and component start.
    const router = useRouter();
    const isPublicPage = pathname === '/' || pathname.startsWith('/c/') || pathname === '/login' || pathname === '/register' || pathname === '/yntm/login';

    // Auth protection is now handled by Middleware and Server Components.
    // Client-side Shell purely handles Layout (Sidebar visibility).

    return (
        <div className="flex min-h-screen bg-background">
            {!isPublicPage && <Sidebar />}

            <main className={clsx(
                "flex-1 min-h-screen transition-all duration-300",
                !isPublicPage && "md:ml-64" // Only apply margin if sidebar is visible
            )}>
                {children}
            </main>
        </div>
    );
}
