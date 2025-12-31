"use client";

import { Camera, Mail, MapPin, Link as LinkIcon, Save, Calendar } from "lucide-react";
import MobileAdminNav from "@/components/layout/MobileAdminNav";

export default function ProfilePage() {
    return (
        <div className="p-8 md:p-12 max-w-4xl mx-auto space-y-8 animate-in slide-up duration-500">
            <MobileAdminNav />
            <div>
                <h1 className="text-3xl font-bold text-text-main mb-2">Profilim</h1>
                <p className="text-text-muted text-lg">Kişisel bilgilerinizi ve topluluk görünümünüzü yönetin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* ID Card */}
                <div className="md:col-span-1 space-y-6">
                    <div className="cominfy-card p-6 text-center space-y-4">
                        <div className="relative w-32 h-32 mx-auto">
                            <img
                                src="https://ui-avatars.com/api/?name=Admin+User&background=random"
                                alt="Profil"
                                className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                            />
                            <button className="absolute bottom-0 right-0 p-2 bg-stone-900 text-white rounded-full hover:scale-110 transition-transform shadow-md">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-text-main">Jane Doe</h2>
                            <p className="text-indigo-600 font-medium text-sm">Topluluk Lideri</p>
                        </div>
                        <div className="pt-4 border-t border-border-subtle space-y-3 text-sm text-text-muted text-left">
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4" />
                                <span>jane@cominfy.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4" />
                                <span>İstanbul, TR</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="w-4 h-4" />
                                <span>Mart 2024'ten beri üye</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="md:col-span-2">
                    <div className="cominfy-card p-8">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Ad</label>
                                    <input type="text" defaultValue="Jane" className="cominfy-input" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Soyad</label>
                                    <input type="text" defaultValue="Doe" className="cominfy-input" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Unvan</label>
                                <input type="text" defaultValue="Community Lead" className="cominfy-input" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Biyografi</label>
                                <textarea
                                    rows={4}
                                    defaultValue="Teknoloji ve topluluk yönetimi konusunda tutkulu. İstanbul'daki geliştirici ekosistemini büyütmeye odaklanıyorum."
                                    className="cominfy-input"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">LinkedIn</label>
                                    <div className="relative">
                                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                        <input type="text" defaultValue="linkedin.com/in/janedoe" className="cominfy-input pl-10" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Twitter / X</label>
                                    <div className="relative">
                                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                        <input type="text" defaultValue="@janedoe" className="cominfy-input pl-10" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-border-subtle flex justify-end">
                                <button type="button" className="btn-primary">
                                    <Save className="w-4 h-4" />
                                    Değişiklikleri Kaydet
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
