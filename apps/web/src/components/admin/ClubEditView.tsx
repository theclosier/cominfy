"use client";

import { ChevronLeft, Save, MapPin, Globe, Share2, Upload } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface ClubEditViewProps {
    club: any;
}

export default function ClubEditView({ club }: ClubEditViewProps) {
    // Form State
    const [formData, setFormData] = useState({
        name: club.name || '',
        description: club.description || '',
        // These fields might need to be added to DB if they don't exist, using defaults if null
        // Currently DB has: name, description, logo, subdomain... 
        // We'll map accordingly or simulate for now until schema update for location/website/category
        location: 'İstanbul, Türkiye',
        website: club.socials?.website || '',
        category: 'Teknoloji',
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const supabase = createClient();
        const { error } = await supabase
            .from('communities')
            .update({
                name: formData.name,
                description: formData.description,
                // Updating jsonb socials for website
                socials: {
                    ...club.socials,
                    website: formData.website
                }
            })
            .eq('id', club.id);

        if (error) {
            alert('Hata: ' + error.message);
        } else {
            alert("Kulüp bilgileri güncellendi!");
        }
        setIsSaving(false);
    };

    return (
        <div className="min-h-screen bg-stone-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-stone-200 py-4 mb-8">
                <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/yntm/clubs" className="p-2 -ml-2 hover:bg-stone-100 rounded-lg text-stone-500 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="font-bold text-2xl text-stone-900">Kulübü Düzenle</h1>
                            <p className="text-stone-500 text-sm">{club.name}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/c/${club.subdomain}`} target="_blank" className="btn-secondary py-2 px-4 shadow-sm text-sm no-underline flex items-center">
                            <Share2 className="w-4 h-4 mr-2" /> Görüntüle
                        </Link>
                    </div>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-6 pb-20 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <form onSubmit={handleSave} className="space-y-8">

                    {/* Logo & Cover */}
                    <div className="glass-card p-6 md:p-8 space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="relative group cursor-pointer">
                                <div className="w-24 h-24 rounded-2xl border border-stone-200 bg-stone-50 flex items-center justify-center overflow-hidden">
                                    <img src={club.logo} alt={club.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Upload className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-stone-900">Kulüp Logosu</h3>
                                <p className="text-sm text-stone-500">Önerilen boyut: 512x512px</p>
                            </div>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="glass-card p-6 md:p-8 space-y-6">
                        <h2 className="text-xl font-bold text-stone-900 border-b border-stone-100 pb-4 mb-4">Temel Bilgiler</h2>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Kulüp Adı</label>
                                <input name="name" value={formData.name} onChange={handleChange} required type="text" className="w-full bg-stone-50 border border-stone-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3.5 text-stone-900 outline-none transition-all font-bold text-lg" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Konum</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                        <input name="location" value={formData.location} onChange={handleChange} type="text" className="w-full bg-stone-50 border border-stone-200 focus:border-indigo-500 rounded-xl pl-12 pr-4 py-3 text-stone-900 outline-none font-medium" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Web Sitesi</label>
                                    <div className="relative">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                        <input name="website" value={formData.website} onChange={handleChange} type="url" className="w-full bg-stone-50 border border-stone-200 focus:border-indigo-500 rounded-xl pl-12 pr-4 py-3 text-stone-900 outline-none font-medium" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Hakkında</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} rows={6} className="w-full bg-stone-50 border border-stone-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-stone-900 outline-none resize-none font-medium text-sm leading-relaxed"></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-4 pt-4 sticky bottom-6 z-20">
                        <div className="bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-xl flex gap-4 border border-stone-200">
                            <Link href="/yntm/clubs" className="px-6 py-3.5 text-stone-600 font-bold hover:bg-stone-50 rounded-xl transition-colors text-sm">İptal</Link>
                            <button
                                disabled={isSaving}
                                type="submit"
                                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all active:scale-95 disabled:opacity-70 flex items-center gap-2">
                                {isSaving ? <span className="animate-spin">⌛</span> : <Save className="w-4 h-4" />}
                                Değişiklikleri Kaydet
                            </button>
                        </div>
                    </div>

                </form>
            </main>
        </div>
    );
}
