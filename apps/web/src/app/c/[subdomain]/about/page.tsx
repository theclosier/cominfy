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
        <div className="min-h-screen bg-stone-50/50 font-sans pb-24">
            <div className="max-w-4xl mx-auto px-6 py-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <Link href={`/c/${subdomain}`} className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-medium mb-6">
                    <ChevronLeft className="w-4 h-4" />
                    Topluluğa Dön
                </Link>

                <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100 overflow-hidden">
                    <div className="p-8 md:p-12">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600">
                                <Info className="w-8 h-8" />
                            </div>
                            <h1 className="text-3xl font-extrabold text-stone-900">Hakkımızda</h1>
                        </div>

                        <div className="prose prose-lg prose-stone max-w-none leading-relaxed">
                            <p className="text-xl font-medium text-stone-800 mb-8">
                                {community.description}
                            </p>
                            <div className="whitespace-pre-line text-stone-600">
                                {community.about || "Bu topluluk hakkında henüz detaylı bilgi eklenmemiş."}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-stone-100">
                            <div className="text-center p-6 bg-stone-50 rounded-2xl">
                                <Users className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
                                <div className="font-bold text-2xl text-stone-900">1,200+</div>
                                <div className="text-stone-500 text-sm font-medium">Aktif Üye</div>
                            </div>
                            <div className="text-center p-6 bg-stone-50 rounded-2xl">
                                <Calendar className="w-8 h-8 text-rose-500 mx-auto mb-3" />
                                <div className="font-bold text-2xl text-stone-900">50+</div>
                                <div className="text-stone-500 text-sm font-medium">Etkinlik/Yıl</div>
                            </div>
                            <div className="text-center p-6 bg-stone-50 rounded-2xl">
                                <MapPin className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                                <div className="font-bold text-2xl text-stone-900">İstanbul</div>
                                <div className="text-stone-500 text-sm font-medium">Merkez</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
