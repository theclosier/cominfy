"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Globe, Layers, Zap, Check, Star, Users, PieChart, Shield, Layout, Twitter, Linkedin, Instagram, Calendar, Menu, X } from "lucide-react";

export default function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div className="min-h-screen bg-background font-sans">
            {/* Header */}
            {/* Header - Floating Dock Style */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4 md:px-6">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-indigo-100 shadow-lg shadow-indigo-100/50 h-16 flex items-center justify-between px-6 transition-all">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="font-bold text-xl tracking-tight text-text-main">COMINFY</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex gap-8 text-sm font-medium text-text-muted">
                            <a href="#features" className="hover:text-indigo-600 transition-colors">Özellikler</a>
                            <a href="#solutions" className="hover:text-indigo-600 transition-colors">Çözümler</a>
                            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Fiyatlandırma</a>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/yntm/login" className="text-sm font-semibold text-text-main hover:text-indigo-600 transition-colors">
                                Giriş Yap
                            </Link>
                            <Link href="/register" className="btn-primary py-2 px-5 h-9 text-sm shadow-indigo-200">
                                Kayıt Ol
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <button
                        className="md:hidden p-2 text-text-main hover:bg-slate-100 rounded-lg transition-colors relative z-[60] cursor-pointer"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 z-[100] bg-white flex flex-col pointer-events-auto md:hidden">
                        <div className="h-20 flex items-center justify-between px-6 border-b border-indigo-50">
                            <span className="font-bold text-xl tracking-tight text-text-main">COMINFY</span>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 -mr-2 text-text-main hover:bg-slate-50 rounded-lg transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex-1 flex flex-col p-8 gap-8 font-medium text-lg text-text-main overflow-y-auto">
                            <a href="#features" onClick={() => setIsMenuOpen(false)}>Özellikler</a>
                            <a href="#solutions" onClick={() => setIsMenuOpen(false)}>Çözümler</a>
                            <a href="#pricing" onClick={() => setIsMenuOpen(false)}>Fiyatlandırma</a>

                            <hr className="border-indigo-50" />

                            <Link href="/yntm/login" onClick={() => setIsMenuOpen(false)}>Giriş Yap</Link>
                            <Link href="/register" onClick={() => setIsMenuOpen(false)} className="btn-primary justify-center shadow-lg shadow-indigo-200">
                                Şimdi Kayıt Ol
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-40 pb-24 px-6 relative overflow-hidden bg-gradient-to-b from-pastel-blue to-white">
                <div className="max-w-5xl mx-auto text-center space-y-8 animate-in slide-up relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 border border-white backdrop-blur-sm text-xs font-semibold uppercase tracking-widest text-accent shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                        Yeni: Çoklu Platform Senkronizasyonu
                    </div>

                    <h1 className="text-6xl md:text-7xl font-extrabold text-text-main tracking-tight leading-[1.05]">
                        Modern Topluluklar İçin <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Tek İşletim Sistemi.</span>
                    </h1>

                    <p className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
                        Platform kaosuna son verin. Luma, Eventbrite ve Meetup üzerindeki etkinliklerinizi, üyelerinizi ve analizlerinizi tek bir şık panelden yönetin.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                        <Link href="/register" className="btn-primary py-4 px-8 text-lg shadow-xl shadow-indigo-200">
                            Ücretsiz Dene
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                        <button className="py-4 px-8 text-lg font-bold rounded-full border border-indigo-200 text-indigo-700 bg-white/80 hover:bg-white hover:shadow-sm transition-all flex items-center gap-2">
                            Canlı Demoyu İzle
                        </button>
                    </div>

                    {/* Hero Visual Mockup */}
                    <div className="pt-16 px-4">
                        <div className="relative rounded-2xl border border-indigo-100 shadow-2xl shadow-indigo-100 bg-white p-2 max-w-5xl mx-auto transform hover:scale-[1.01] transition-transform duration-500">
                            <div className="rounded-xl overflow-hidden bg-surface-hover border border-indigo-50 relative group cursor-pointer">
                                <img
                                    src="/assets/dashboard-preview.png"
                                    alt="Cominfy Dashboard Interface"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="py-12 border-y border-indigo-50 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm font-semibold text-text-muted mb-8 uppercase tracking-widest">2,000+ Topluluk Yöneticisi Tarafından Güveniliyor</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                        {[
                            { name: 'Kodluyoruz', bg: 'bg-orange-100', text: 'text-orange-700' },
                            { name: 'Tasarımcılar', bg: 'bg-rose-100', text: 'text-rose-700' },
                            { name: 'Girişimci Kafası', bg: 'bg-blue-100', text: 'text-blue-700' },
                            { name: 'Yazılım Köyü', bg: 'bg-emerald-100', text: 'text-emerald-700' },
                            { name: 'Tech İstanbul', bg: 'bg-purple-100', text: 'text-purple-700' },
                        ].map((brand) => (
                            <div key={brand.name} className={`px-6 py-3 rounded-xl ${brand.bg} ${brand.text} font-bold text-sm bg-opacity-70 backdrop-blur-sm border border-white/50 shadow-sm hover:scale-105 transition-transform cursor-default select-none`}>
                                {brand.name}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Blocks (ZigZag) */}
            <section id="features" className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto space-y-32">

                    {/* Feature 1 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="absolute inset-0 bg-pastel-purple rounded-full blur-3xl opacity-60 transform -translate-x-10"></div>
                            <div className="relative rounded-2xl border border-indigo-100 shadow-lg bg-white p-8 space-y-6">
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-hover border border-indigo-50">
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm text-indigo-600"><Zap className="w-6 h-6" /></div>
                                    <div>
                                        <h4 className="font-bold text-text-main">Etkinlik Eşlendi</h4>
                                        <p className="text-xs text-text-muted">3 platforma başarıyla gönderildi</p>
                                    </div>
                                    <div className="ml-auto text-emerald-500"><Check className="w-5 h-5" /></div>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-hover border border-indigo-50 opacity-70">
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm text-indigo-600"><Users className="w-6 h-6" /></div>
                                    <div>
                                        <h4 className="font-bold text-text-main">Katılımcılar Güncellendi</h4>
                                        <p className="text-xs text-text-muted">CRM'e +45 yeni üye eklendi</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pastel-purple text-purple-700 text-xs font-bold uppercase tracking-wide">
                                Anlık Senkronizasyon
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-text-main leading-tight">Bir kez oluştur.<br />Her yerde yayınla.</h2>
                            <p className="text-lg text-text-muted leading-relaxed">
                                Etkinlik detaylarını kopyalayıp yapıştırmaya son. Cominfy ile etkinliğinizi bir kez oluşturun, biz resmi API'ler aracılığıyla Luma, Eventbrite ve Meetup'a otomatik olarak gönderelim.
                            </p>
                            <ul className="space-y-3 pt-4">
                                {['Gerçek zamanlı senkronizasyon', 'Birleşik katılımcı listesi', 'Çakışma tespiti'].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-text-main font-medium">
                                        <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center"><Check className="w-3 h-3" /></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pastel-green text-emerald-700 text-xs font-bold uppercase tracking-wide">
                                Birleşik CRM
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-text-main leading-tight">Topluluğunuzu <br />yakından tanıyın.</h2>
                            <p className="text-lg text-text-muted leading-relaxed">
                                Tüm kaynaklardan gelen üye verilerini tek bir güçlü CRM'de topluyoruz. Katılım serilerini takip edin, sadık kullanıcıları belirleyin ve erişim seviyelerini kolayca yönetin.
                            </p>
                            <Link href="/register" className="inline-flex items-center text-emerald-600 font-bold hover:underline mt-2">
                                Üye Özelliklerini Keşfet <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-pastel-green rounded-full blur-3xl opacity-60 transform translate-x-10"></div>
                            <div className="relative rounded-2xl border border-indigo-100 shadow-lg bg-white p-8 grid grid-cols-2 gap-4">
                                <div className="col-span-2 p-4 rounded-xl bg-surface-hover border border-indigo-50 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">JD</div>
                                    <div>
                                        <h4 className="font-bold text-text-main">Jane Doe</h4>
                                        <p className="text-xs text-text-muted">12 etkinliğe katıldı • Sadık Üye</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-surface-hover border border-indigo-50 text-center">
                                    <div className="text-2xl font-bold text-text-main">%98</div>
                                    <div className="text-xs text-text-muted uppercase mt-1">Katılım</div>
                                </div>
                                <div className="p-4 rounded-xl bg-surface-hover border border-indigo-50 text-center">
                                    <div className="text-2xl font-bold text-text-main">4.9</div>
                                    <div className="text-xs text-text-muted uppercase mt-1">Puan</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Solutions Section */}
            <section id="solutions" className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide mb-4">
                            Çözümler
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-text-main mb-6">Herkes İçin Tek Platform</h2>
                        <p className="text-lg text-text-muted">İster küçük bir kulüp, ister global bir topluluk olun. İhtiyacınıza uygun çözümlerimiz var.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-surface border border-indigo-100 hover:border-indigo-300 hover:shadow-lg transition-all group">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 font-bold group-hover:scale-110 transition-transform">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-text-main mb-3">Topluluk Liderleri</h3>
                            <p className="text-text-muted leading-relaxed mb-6">Üyelerinizi tek bir yerde toplayın, katılımı takip edin ve sadakati artırın.</p>
                            <ul className="space-y-2 text-sm text-text-muted">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Üye CRM</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Katılım Analitiği</li>
                            </ul>
                        </div>
                        <div className="p-8 rounded-2xl bg-surface border border-indigo-100 hover:border-indigo-300 hover:shadow-lg transition-all group">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 font-bold group-hover:scale-110 transition-transform">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-text-main mb-3">Etkinlik Organizatörleri</h3>
                            <p className="text-text-muted leading-relaxed mb-6">Bilet satışlarını yönetin, LCV toplayın ve etkinliklerinizi otomatik senkronize edin.</p>
                            <ul className="space-y-2 text-sm text-text-muted">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Çoklu Platform Yayını</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Otomatik Hatırlatmalar</li>
                            </ul>
                        </div>
                        <div className="p-8 rounded-2xl bg-surface border border-indigo-100 hover:border-indigo-300 hover:shadow-lg transition-all group">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6 font-bold group-hover:scale-110 transition-transform">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-text-main mb-3">Kurumsal Şirketler</h3>
                            <p className="text-text-muted leading-relaxed mb-6">Marka bilinirliğinizi artırın, iç iletişimi güçlendirin ve güvenli etkinlikler düzenleyin.</p>
                            <ul className="space-y-2 text-sm text-text-muted">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> SSO & Güvenlik</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Özel Marka (White-label)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24 px-6 bg-slate-50 border-y border-indigo-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wide mb-4">
                            Fiyatlandırma
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-text-main mb-6">Basit ve Şeffaf Planlar</h2>
                        <p className="text-lg text-text-muted">Gizli ücret yok. İstediğiniz zaman iptal edebilirsiniz.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        {/* Free Plan */}
                        <div className="p-8 rounded-2xl bg-white border border-indigo-100 shadow-sm hover:shadow-md transition-all">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-text-main">Başlangıç</h3>
                                <p className="text-text-muted text-sm mt-1">Yeni başlayan topluluklar için.</p>
                            </div>
                            <div className="mb-6">
                                <span className="text-4xl font-extrabold text-text-main">₺0</span>
                                <span className="text-text-muted">/ay</span>
                            </div>
                            <Link href="/register" className="w-full justify-center mb-8 py-3.5 px-6 rounded-full border border-indigo-200 text-indigo-700 font-bold hover:bg-indigo-50 transition-all flex items-center gap-2">Ücretsiz Başla</Link>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-3 text-text-main"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> 100 Üye Limiti</li>
                                <li className="flex items-center gap-3 text-text-main"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> 1 Platform Senkronizasyonu</li>
                                <li className="flex items-center gap-3 text-text-main"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Temel Analitik</li>
                            </ul>
                        </div>

                        {/* Pro Plan */}
                        <div className="p-8 rounded-2xl bg-white border-2 border-indigo-600 shadow-xl relative transform scale-105 z-10">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                                En Popüler
                            </div>
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-indigo-900">Profesyonel</h3>
                                <p className="text-indigo-700/70 text-sm mt-1">Büyüyen topluluklar için.</p>
                            </div>
                            <div className="mb-6">
                                <span className="text-4xl font-extrabold text-text-main">₺499</span>
                                <span className="text-text-muted">/ay</span>
                            </div>
                            <Link href="/register" className="btn-primary w-full justify-center mb-8">Hemen Başla</Link>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-3 text-text-main font-medium"><Check className="w-5 h-5 text-indigo-600 flex-shrink-0" /> 5,000 Üye Limiti</li>
                                <li className="flex items-center gap-3 text-text-main font-medium"><Check className="w-5 h-5 text-indigo-600 flex-shrink-0" /> Sınırsız Platform Senkronizasyonu</li>
                                <li className="flex items-center gap-3 text-text-main font-medium"><Check className="w-5 h-5 text-indigo-600 flex-shrink-0" /> Gelişmiş CRM & Tagleme</li>
                                <li className="flex items-center gap-3 text-text-main font-medium"><Check className="w-5 h-5 text-indigo-600 flex-shrink-0" /> Etkinlik Sayfası Özelleştirme</li>
                            </ul>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="p-8 rounded-2xl bg-white border border-indigo-100 shadow-sm hover:shadow-md transition-all">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-text-main">Kurumsal</h3>
                                <p className="text-text-muted text-sm mt-1">Büyük organizasyonlar için.</p>
                            </div>
                            <div className="mb-6">
                                <span className="text-4xl font-extrabold text-text-main">Özel</span>
                            </div>
                            <Link href="mailto:hello@cominfy.com" className="w-full justify-center mb-8 py-3.5 px-6 rounded-full border border-indigo-200 text-indigo-700 font-bold hover:bg-indigo-50 transition-all flex items-center gap-2">İletişime Geç</Link>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-3 text-text-main"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Sınırsız Üye</li>
                                <li className="flex items-center gap-3 text-text-main"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Özel API Erişimi</li>
                                <li className="flex items-center gap-3 text-text-main"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> 7/24 Öncelikli Destek</li>
                                <li className="flex items-center gap-3 text-text-main"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> SSO & SLA</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Integration Grid - Keep existing */}
            <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-200">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 space-y-8">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Topluluğunuzu yönetmeye hazır mısınız?</h2>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">Haftada 10+ saat tasarruf eden binlerce topluluk yöneticisine katılın.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/register" className="bg-white text-primary font-bold py-4 px-10 rounded-xl hover:bg-slate-50 transition-colors shadow-lg">
                                Ücretsiz Başla
                            </Link>
                        </div>
                        <p className="text-sm text-indigo-100/80 font-medium">Kredi kartı gerekmez. 14 gün ücretsiz deneme.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-indigo-50 pt-16 pb-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-12 mb-16">
                        <div className="col-span-2 space-y-6">
                            <div className="flex items-center gap-2">
                                {/* Logo Emblem Removed */}
                                <span className="font-bold text-xl tracking-tight text-text-main">COMINFY</span>
                            </div>
                            <p className="text-text-muted leading-relaxed pr-6">
                                Modern topluluklar için işletim sistemi. Etkinlikleri, üyeleri ve analizleri tek bir yerden yönetmenize yardımcı oluyoruz.
                            </p>
                            <div className="flex gap-4 text-text-muted">
                                <Twitter className="w-5 h-5 cursor-pointer hover:text-text-main transition-colors" />
                                <Linkedin className="w-5 h-5 cursor-pointer hover:text-text-main transition-colors" />
                                <Instagram className="w-5 h-5 cursor-pointer hover:text-text-main transition-colors" />
                            </div>
                        </div>

                        <div className="col-span-1 space-y-4">
                            <h4 className="font-bold text-text-main">Ürün</h4>
                            <ul className="space-y-3 text-sm text-text-muted">
                                <li><a href="#" className="hover:text-accent">Özellikler</a></li>
                                <li><a href="#" className="hover:text-accent">Entegrasyonlar</a></li>
                                <li><a href="#" className="hover:text-accent">Fiyatlandırma</a></li>
                                <li><a href="#" className="hover:text-accent">Yenilikler</a></li>
                            </ul>
                        </div>

                        <div className="col-span-1 space-y-4">
                            <h4 className="font-bold text-text-main">Şirket</h4>
                            <ul className="space-y-3 text-sm text-text-muted">
                                <li><a href="#" className="hover:text-accent">Hakkında</a></li>
                                <li><a href="#" className="hover:text-accent">Kariyer</a></li>
                                <li><a href="#" className="hover:text-accent">Blog</a></li>
                                <li><a href="#" className="hover:text-accent">İletişim</a></li>
                            </ul>
                        </div>

                        <div className="col-span-1 space-y-4">
                            <h4 className="font-bold text-text-main">Kaynaklar</h4>
                            <ul className="space-y-3 text-sm text-text-muted">
                                <li><a href="#" className="hover:text-accent">Topluluk</a></li>
                                <li><a href="#" className="hover:text-accent">Yardım Merkezi</a></li>
                                <li><a href="#" className="hover:text-accent">API Dokümanları</a></li>
                                <li><a href="#" className="hover:text-accent">Durum</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-indigo-50 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-text-muted">
                        <p>© 2025 Cominfy Inc. Tüm hakları saklıdır.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-text-main">Gizlilik Politikası</a>
                            <a href="#" className="hover:text-text-main">Kullanım Şartları</a>
                            <a href="#" className="hover:text-text-main">Çerezler</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
