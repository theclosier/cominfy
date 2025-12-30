export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-cream-100 animate-in fade-in duration-500">
            {/* 
        The Sidebar is rendered by the root Shell component based on the path.
        This layout primarily serves as a boundary and style container for the admin section.
      */}
            {children}
        </div>
    );
}
