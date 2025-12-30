"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

interface CommunityLoginViewProps {
    community: any;
}

export default function CommunityLoginView({ community }: CommunityLoginViewProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const supabase = createClient();
        const email = (e.target as HTMLFormElement).email.value;
        const password = (e.target as HTMLFormElement).password.value;

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                alert("Giriş başarısız: " + error.message);
                setLoading(false);
                return;
            }

            // Successful login
            router.push(`/c/${community.subdomain}`);
            router.refresh();
        } catch (err) {
            console.error(err);
            alert("Bir hata oluştu.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
            <div className="w-full max-w-md space-y-8 animate-in slide-up duration-700">
                {/* Brand */}
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <img
                            src={community.logo}
                            alt={community.name}
                            className="w-20 h-20 rounded-2xl border border-stone-200 shadow-xl"
                        />
                    </div>
                    <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">{community.name}</h1>
                    <p className="text-stone-500 mt-2">Üye girişi yaparak topluluğa katılın.</p>
                </div>

                {/* Card */}
                <div className="bg-white p-8 md:p-10 shadow-2xl shadow-stone-200/50 rounded-2xl border border-stone-200">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">E-posta Adresi</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium text-stone-900 placeholder:text-stone-400"
                                placeholder="isim@sirket.com"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider">Şifre</label>
                                <Link href="#" className="text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors">Şifremi Unuttum?</Link>
                            </div>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium text-stone-900 placeholder:text-stone-400 pr-10"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-stone-900/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Giriş Yap <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center space-y-4">
                    <p className="text-sm text-stone-500">
                        Hesabınız yok mu? <Link href={`/c/${community.subdomain}/join`} className="font-bold text-stone-900 hover:text-teal-600 transition-colors">Aramıza Katılın</Link>
                    </p>
                    <Link href={`/c/${community.subdomain}`} className="block text-xs font-bold text-stone-400 hover:text-stone-600 transition-colors">
                        Topluluğa Dön
                    </Link>
                </div>
            </div>
        </div>
    );
}
