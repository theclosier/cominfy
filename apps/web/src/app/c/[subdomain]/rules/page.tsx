import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { ChevronLeft, Scale, CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function CommunityRulesPage({ params }: { params: Promise<{ subdomain: string }> }) {
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
            <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">



                <div className="porcelain-glass rounded-[40px] shadow-warm p-8 md:p-12 relative overflow-hidden">
                    <div className="flex items-center gap-6 mb-10">
                        <div className="w-16 h-16 rounded-2xl bg-cream-50 flex items-center justify-center border border-sandstone shadow-sm text-gold">
                            <Scale className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-serif text-obsidian">Topluluk Kuralları</h1>
                            <p className="text-taupe text-sm font-bold uppercase tracking-widest mt-2">Lütfen Dikkatlice Okuyunuz</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {community.rules && community.rules.length > 0 ? (
                            community.rules.map((rule: string, index: number) => (
                                <div key={index} className="flex gap-5 p-6 bg-white/60 rounded-2xl border border-sandstone hover:border-gold/50 transition-colors group">
                                    <div className="shrink-0 mt-0.5">
                                        <CheckCircle className="w-6 h-6 text-neon-mint" />
                                    </div>
                                    <p className="text-charcoal text-lg font-light leading-relaxed group-hover:text-obsidian transition-colors">
                                        {rule}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-taupe italic text-center py-8">Bu topluluk için özel bir kural belirtilmemiştir.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
