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
        <div className="min-h-screen bg-stone-50/50 font-sans pb-24">
            <div className="max-w-3xl mx-auto px-6 py-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <Link href={`/c/${subdomain}`} className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-medium mb-6">
                    <ChevronLeft className="w-4 h-4" />
                    Topluluğa Dön
                </Link>

                <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100 overflow-hidden">
                    <div className="p-8 md:p-12">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-amber-50 p-3 rounded-2xl text-amber-600">
                                <Scale className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold text-stone-900">Topluluk Kuralları</h1>
                                <p className="text-stone-500 text-sm font-medium mt-1">Lütfen dikkatlice okuyunuz</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {community.rules && community.rules.length > 0 ? (
                                community.rules.map((rule: string, index: number) => (
                                    <div key={index} className="flex gap-4 p-5 bg-stone-50 rounded-xl border border-stone-100 hover:border-amber-200 transition-colors group">
                                        <div className="shrink-0 mt-0.5">
                                            <CheckCircle className="w-6 h-6 text-emerald-500" />
                                        </div>
                                        <p className="text-stone-700 font-medium leading-relaxed group-hover:text-stone-900 transition-colors">
                                            {rule}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-stone-500 italic">Bu topluluk için özel bir kural belirtilmemiştir.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
