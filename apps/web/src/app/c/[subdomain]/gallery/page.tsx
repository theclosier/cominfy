import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { ChevronLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

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
        <div className="min-h-screen bg-cream-100 font-sans pb-24 pt-32 px-4 md:px-8">
            <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">



                <div className="flex items-center gap-6 mb-12">
                    <div className="w-16 h-16 rounded-2xl bg-cream-50 flex items-center justify-center border border-sandstone shadow-sm text-electric-blue">
                        <ImageIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif text-obsidian">Galeri</h1>
                        <p className="text-taupe text-sm font-bold uppercase tracking-widest mt-2">Etkinliklerimizden Kareler</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                    {community.gallery && community.gallery.length > 0 ? (
                        community.gallery.map((image: string, index: number) => (
                            <div key={index} className={clsx(
                                "rounded-[32px] overflow-hidden shadow-warm border border-sandstone group relative cursor-pointer",
                                index % 3 === 0 ? "md:col-span-2" : "md:col-span-1" // Simple asymmetric grid
                            )}>
                                <img
                                    src={image}
                                    alt={`Gallery ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-taupe bg-white/40 rounded-3xl border border-sandstone border-dashed">
                            <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-30" />
                            <p className="font-serif text-xl">Henüz fotoğraf eklenmemiş.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
