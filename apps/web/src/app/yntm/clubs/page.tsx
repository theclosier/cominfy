import { createClient } from "@/utils/supabase/server";
import { Users, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";

export default async function ClubsPage() {
    const supabase = await createClient();

    const { data: communities } = await supabase
        .from('communities')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-10">
            {/* Header */}
            <div className="flex items-center justify-between animate-in slide-up duration-500">
                <div>
                    <h1 className="text-3xl font-bold text-text-main mb-2">Kulüpler</h1>
                    <p className="text-text-muted text-lg">Topluluk alanlarınızı ve alt gruplarınızı yönetin.</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    <span>Kulüp Oluştur</span>
                </button>
            </div>

            {/* Clubs Grid - Magazine Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-up duration-500 delay-100">
                {communities && communities.map((community) => (
                    <div key={community.id} className="group cominfy-card overflow-hidden hover:shadow-lg transition-all duration-300">
                        {/* Club Cover (Abstract or Image) */}
                        <div className="h-48 bg-stone-100 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                            {/* Use logo as background blur effectively or a default cover if we had one */}
                            <img src={community.logo} alt={community.name} className="w-full h-full object-cover blur-sm scale-110 opacity-50" />

                            <div className="absolute bottom-6 left-6 z-20 flex items-center gap-4">
                                <img src={community.logo} alt={community.name} className="w-16 h-16 rounded-full border-4 border-white shadow-md bg-white object-cover" />
                                <div>
                                    <h2 className="text-2xl font-bold text-white tracking-tight">{community.name}</h2>
                                    <p className="text-white/80 text-sm font-medium">orgordash.com/c/{community.subdomain}</p>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-6">
                            <p className="text-text-muted leading-relaxed line-clamp-2">{community.description}</p>

                            <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-border-subtle">
                                <div className="text-center">
                                    <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Üyeler</p>
                                    {/* Mock count for now or perform count query */}
                                    <p className="text-xl font-bold text-text-main">1.2k</p>
                                </div>
                                <div className="text-center border-l border-border-subtle">
                                    <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Etkinlik</p>
                                    <p className="text-xl font-bold text-text-main">24</p>
                                </div>
                                <div className="text-center border-l border-border-subtle">
                                    <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Durum</p>
                                    <div className="flex items-center justify-center gap-1 mt-1">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                        <span className="text-sm font-bold text-emerald-600">Aktif</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-stone-50 border-2 border-white flex items-center justify-center text-xs font-bold text-text-muted">+1k</div>
                                </div>

                                <Link href={`/yntm/clubs/${community.id}`} className="text-sm font-bold text-text-main hover:text-primary transition-colors flex items-center gap-2 group/btn">
                                    Yönet <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add New Placeholder */}
                <div className="border-2 border-dashed border-border-subtle rounded-2xl flex flex-col items-center justify-center p-12 text-center hover:border-primary/50 hover:bg-stone-50 transition-all cursor-pointer group">
                    <div className="w-16 h-16 rounded-full bg-stone-50 group-hover:bg-white flex items-center justify-center mb-4 transition-colors shadow-sm">
                        <Users className="w-8 h-8 text-stone-300 group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-text-main">Yeni Kulüp Başlat</h3>
                    <p className="text-text-muted text-sm mt-2 max-w-xs">Bir alt topluluk veya marka için ayrı bir alan oluşturun.</p>
                </div>
            </div>
        </div>
    );
}
