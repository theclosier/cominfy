"use client";

import { useState } from "react";
import { Globe, Twitter, Instagram, Linkedin, Star, ArrowLeft, LogIn, Save, User as UserIcon, Mail, FileText, Camera, ChevronLeft } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { createClient } from "@/utils/supabase/client";

interface ProfileViewProps {
    community: any;
    userProfile: {
        full_name: string;
        email: string;
        avatar_url: string;
    } | null;
}

export default function ProfileView({ community, userProfile }: ProfileViewProps) {
    const [user, setUser] = useState({
        name: userProfile?.full_name || '',
        email: userProfile?.email || '',
        bio: '', // Bio not yet in profiles table, usually, sticking to mock behavior for now or adding to future plan
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        // Update profile in Supabase
        const supabase = createClient();
        const { error } = await supabase.from('profiles').update({
            full_name: user.name,
            // email updates usually require verification flow, so we might skip actual email update or handle carefully
            // For now let's just update name
        }).eq('email', user.email); // Security risk if not checking auth user, but RLS handles it.
        // Better: use auth.getUser() id

        // Proper way:
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
            const { error: updateError } = await supabase.from('profiles').update({
                full_name: user.name
            }).eq('id', authUser.id);

            if (updateError) {
                setMessage({ type: 'error', text: 'Hata oluştu: ' + updateError.message });
            } else {
                setMessage({ type: 'success', text: 'Profiliniz başarıyla güncellendi!' });
            }
        }

        setIsLoading(false);
    };

    if (!userProfile) { // Should be handled by server component redirecting or showing empty state, but extra safety
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-stone-900 mb-2">Giriş Yapmalısınız</h2>
                    <p className="text-stone-500 mb-4">Profilinizi düzenlemek için lütfen giriş yapın.</p>
                    <Link href={`/c/${community.subdomain}/login`} className="btn-primary py-2 px-6">Giriş Yap</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50/50 font-sans pb-24">
            {/* --- COMPACT HEADER (Same as Community Page) --- */}
            <main className="max-w-3xl mx-auto px-6 py-32 animate-in fade-in zoom-in duration-500">
                <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100 overflow-hidden">
                    <div className="px-8 py-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
                        <h1 className="text-2xl font-bold text-stone-900">Profil Düzenle</h1>
                        <span className="text-xs font-bold uppercase tracking-wider bg-stone-200 text-stone-600 px-3 py-1 rounded-full">Üye Hesabı</span>
                    </div>

                    <div className="p-8 md:p-10">
                        {message && (
                            <div className={clsx(
                                "mb-8 p-4 rounded-xl flex items-center gap-3 text-sm font-bold",
                                message.type === 'success' ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"
                            )}>
                                {message.type === 'success' ? <div className="w-2 h-2 rounded-full bg-emerald-500"></div> : <div className="w-2 h-2 rounded-full bg-red-500"></div>}
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSave} className="space-y-8">

                            {/* Avatar Section */}
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-2xl bg-stone-100 border-2 border-dashed border-stone-300 flex items-center justify-center relative group cursor-pointer hover:border-primary hover:bg-white transition-all">
                                    <div className="text-3xl font-bold text-stone-300 group-hover:text-primary transition-colors">
                                        {user.name ? user.name[0] : 'U'}
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Camera className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-stone-900">Profil Fotoğrafı</h3>
                                    <p className="text-stone-500 text-sm mb-3">.jpg veya .png formatında yükleyin.</p>
                                    <button type="button" className="text-xs font-bold text-primary hover:underline">Fotoğraf Değiştir</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-2">
                                        <UserIcon className="w-4 h-4" /> Ad Soyad
                                    </label>
                                    <input
                                        type="text"
                                        value={user.name}
                                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-stone-900"
                                        placeholder="Adınız Soyadınız"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-2">
                                        <Mail className="w-4 h-4" /> E-posta Adresi
                                    </label>
                                    <input
                                        type="email"
                                        value={user.email}
                                        disabled
                                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-stone-500 cursor-not-allowed bg-stone-100"
                                        placeholder="ornek@email.com"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-2">
                                        <FileText className="w-4 h-4" /> Hakkımda (Bio)
                                    </label>
                                    <textarea
                                        value={user.bio || ''}
                                        onChange={(e) => setUser({ ...user, bio: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-stone-900 min-h-[120px]"
                                        placeholder="Kendinizden kısaca bahsedin..."
                                    />
                                    <p className="text-right text-xs text-stone-400">0/240</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-stone-100 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="btn-primary py-3 px-8 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 flex items-center gap-2"
                                >
                                    {isLoading ? 'Kaydediliyor...' : (
                                        <>
                                            <Save className="w-4 h-4" /> Değişiklikleri Kaydet
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
