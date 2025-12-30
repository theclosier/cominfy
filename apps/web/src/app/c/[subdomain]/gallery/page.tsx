import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { ChevronLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default async function CommunityGalleryPage({ params }: { params: Promise<{ subdomain: string }> }) {
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
            <div className="max-w-6xl mx-auto px-6 py-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <Link href={`/c/${subdomain}`} className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-medium mb-6">
                    <ChevronLeft className="w-4 h-4" />
                    Topluluğa Dön
                </Link>

                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-purple-50 p-3 rounded-2xl text-purple-600">
                        <ImageIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-stone-900">Galeri</h1>
                        <p className="text-stone-500 text-sm font-medium mt-1">Etkinliklerimizden Kareler</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {community.gallery && community.gallery.length > 0 ? (
                        community.gallery.map((image: string, index: number) => (
                            <div key={index} className="aspect-video rounded-2xl overflow-hidden shadow-lg shadow-stone-200/50 border border-stone-200 group relative cursor-pointer">
                                <img
                                    src={image}
                                    alt={`Gallery ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-stone-400">
                            <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p>Henüz fotoğraf eklenmemiş.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
