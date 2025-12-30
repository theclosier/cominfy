import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { ChevronLeft, Info, Calendar, Users, MapPin } from "lucide-react";
import Link from "next/link";

export default async function CommunityAboutPage({ params }: { params: Promise<{ subdomain: string }> }) {
    const { subdomain } = await params;
    const supabase = await createClient();

    const { data: community } = await supabase
        .from('communities')
        .select('*')
        .eq('subdomain', subdomain)
        .single();

    if (!community) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-cream-100 font-sans pb-24 pt-32 px-4 md:px-8">
            <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">



                <div className="porcelain-glass rounded-[40px] shadow-warm p-8 md:p-12 relative overflow-hidden">

                    <div className="flex items-center gap-6 mb-10">
                        <div className="w-16 h-16 rounded-2xl bg-cream-50 flex items-center justify-center border border-sandstone shadow-sm text-electric-blue">
                            <Info className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif text-obsidian">Hakkımızda</h1>
                    </div>

                    <div className="prose prose-lg prose-stone max-w-none leading-relaxed">
                        <p className="text-2xl font-serif text-obsidian/90 mb-8 leading-relaxed">
                            {community.description}
                        </p>
                        <div className="whitespace-pre-line text-charcoal font-light text-lg">
                            {community.about || "Bu topluluk hakkında henüz detaylı bilgi eklenmemiş."}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-sandstone">
                        <div className="text-center p-6 bg-white/50 rounded-3xl border border-white/60">
                            <Users className="w-8 h-8 text-electric-blue mx-auto mb-3" />
                            <div className="font-serif text-3xl text-obsidian">1,200+</div>
                            <div className="text-taupe text-xs font-bold uppercase tracking-widest mt-1">Aktif Üye</div>
                        </div>
                        <div className="text-center p-6 bg-white/50 rounded-3xl border border-white/60">
                            <Calendar className="w-8 h-8 text-coral mx-auto mb-3" />
                            <div className="font-serif text-3xl text-obsidian">50+</div>
                            <div className="text-taupe text-xs font-bold uppercase tracking-widest mt-1">Etkinlik/Yıl</div>
                        </div>
                        <div className="text-center p-6 bg-white/50 rounded-3xl border border-white/60">
                            <MapPin className="w-8 h-8 text-neon-mint mx-auto mb-3" />
                            <div className="font-serif text-3xl text-obsidian">İstanbul</div>
                            <div className="text-taupe text-xs font-bold uppercase tracking-widest mt-1">Merkez</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
