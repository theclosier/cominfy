import Link from "next/link";

export default function CommunityLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-1">
                {children}
            </div>

            <footer className="py-8 bg-stone-50 border-t border-stone-100 text-center">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-stone-400 hover:text-indigo-600 transition-colors text-xs font-bold tracking-widest uppercase opacity-60 hover:opacity-100"
                >
                    Powered by <span className="text-sm">⚡</span> COMINFY
                </Link>
            </footer>
        </div>
    );
}
