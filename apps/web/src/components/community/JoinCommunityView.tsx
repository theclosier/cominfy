"use client";

import { useState } from "react";
import { Check, Shield, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

interface JoinCommunityViewProps {
    community: any;
}

export default function JoinCommunityView({ community }: JoinCommunityViewProps) {
    const [formStatus, setFormStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS'>('IDLE');

    const handleJoinSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('SUBMITTING');

        // MVP: Just simulate success for now, as we haven't implemented form handling backend fully yet
        // In the future this should POST to /api/join or use Supabase directly
        setTimeout(() => setFormStatus('SUCCESS'), 1500);
    };

    // MVP: Questions are not yet in DB schema fully dynamic, using defaults if not present
    // Or we could have added them to 'settings' jsonb, but for now let's assume standard set or empty
    const customQuestions = [
        { id: 'q1', question: 'Yazılım deneyiminiz ne kadar?', type: 'select', options: ['0-1 Yıl', '1-3 Yıl', '3-5 Yıl', '5+ Yıl'] },
        { id: 'q2', question: 'Şu an çalışıyor musunuz?', type: 'boolean' }
    ];

    return (
        <div className="min-h-screen bg-cream-100 font-sans flex flex-col pb-24 pt-32 px-4">

            <div className="flex-1 flex flex-col items-center">

                <div className="w-full max-w-2xl mx-auto">

                    <Link href={`/c/${community.subdomain}`} className="inline-flex items-center gap-2 text-taupe hover:text-obsidian transition-colors text-sm font-bold uppercase tracking-widest mb-8 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Topluluğa Dön
                    </Link>

                    <div className="porcelain-glass rounded-[40px] shadow-2xl p-8 md:p-12 relative overflow-hidden">
                        {/* Decorative background blob */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-electric-blue/5 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-serif text-obsidian mb-2">Aramıza Katıl</h1>
                                    <p className="text-charcoal text-lg font-light">Aşağıdaki formu doldurarak topluluğa başvurunu ilet.</p>
                                </div>
                            </div>

                            {formStatus === 'SUCCESS' ? (
                                <div className="text-center py-12 animate-in zoom-in duration-300">
                                    <div className="w-24 h-24 bg-neon-mint/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-neon-mint/20">
                                        <Check className="w-12 h-12" />
                                    </div>
                                    <h3 className="text-3xl font-serif text-obsidian mb-4">Harika! 🎉</h3>
                                    <p className="text-charcoal text-lg leading-relaxed mb-10 max-w-md mx-auto font-light">
                                        Başvurunuz topluluk yöneticisine iletildi. Onaylandığında size e-posta ile haber vereceğiz.
                                    </p>
                                    <div className="flex gap-4 justify-center">
                                        <Link
                                            href={`/c/${community.subdomain}`}
                                            className="btn-secondary">
                                            Ana Sayfaya Dön
                                        </Link>
                                        <button
                                            onClick={() => setFormStatus('IDLE')}
                                            className="text-electric-blue font-bold text-sm hover:underline">
                                            Yeni Başvuru
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleJoinSubmit} className="space-y-8">
                                    <div>
                                        <p className="text-charcoal text-lg leading-relaxed font-light">
                                            Bu topluluğun bir parçası olmak için lütfen aşağıdaki formu eksiksiz doldurun.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="group">
                                                <label className="block text-xs font-bold text-taupe mb-2 ml-1 uppercase tracking-wide group-focus-within:text-electric-blue transition-colors">Ad Soyad</label>
                                                <input required type="text" className="cominfy-input" placeholder="Adınız Soyadınız" />
                                            </div>
                                            <div className="group">
                                                <label className="block text-xs font-bold text-taupe mb-2 ml-1 uppercase tracking-wide group-focus-within:text-electric-blue transition-colors">E-posta Adresi</label>
                                                <input required type="email" className="cominfy-input" placeholder="ornek@email.com" />
                                            </div>
                                        </div>

                                        {customQuestions.map((q, i) => (
                                            <div key={q.id} className="group">
                                                <label className="block text-xs font-bold text-taupe mb-2 ml-1 uppercase tracking-wide group-focus-within:text-electric-blue transition-colors">
                                                    {i + 1}. {q.question}
                                                </label>
                                                {q.type === 'select' ? (
                                                    <div className="relative">
                                                        <select className="cominfy-input appearance-none cursor-pointer">
                                                            {q.options?.map(opt => <option key={opt}>{opt}</option>)}
                                                        </select>
                                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-taupe">▼</div>
                                                    </div>
                                                ) : q.type === 'boolean' ? (
                                                    <div className="relative">
                                                        <select className="cominfy-input appearance-none cursor-pointer">
                                                            <option>Evet</option>
                                                            <option>Hayır</option>
                                                        </select>
                                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-taupe">▼</div>
                                                    </div>
                                                ) : (
                                                    <input type="text" className="cominfy-input" />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-8 border-t border-sandstone mt-8">
                                        <button
                                            disabled={formStatus === 'SUBMITTING'}
                                            type="submit"
                                            className="w-full btn-primary py-4 text-base shadow-xl">
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                {formStatus === 'SUBMITTING' ? 'Gönderiliyor...' : (
                                                    <>BAŞVURU YAP <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                                                )}
                                            </span>
                                        </button>

                                        <p className="text-xs text-center text-taupe flex items-center justify-center gap-1.5 opacity-80 mt-6 font-medium">
                                            <Shield className="w-3 h-3" />
                                            Bilgileriniz Cominfy güvencesindedir.
                                        </p>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
