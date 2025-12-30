"use client";

import { useState } from "react";
import { StatsCard } from "@/components/ui/StatsCard";
import { Users, Ticket, Globe, Activity, Plus, ArrowRight, CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface DashboardViewProps {
    stats: {
        totalMembers: number;
        totalCapacity: number;
        activeEvents: number;
        pendingMembers: number;
    };
    recentEvents: any[];
    pendingMembersList: any[];
}

export default function DashboardView({ stats, recentEvents, pendingMembersList: initialPendingMembers }: DashboardViewProps) {
    const [pendingMembers, setPendingMembers] = useState(initialPendingMembers);
    const [processingId, setProcessingId] = useState<string | null>(null);
    const supabase = createClient();
    const router = useRouter();

    const handleMemberAction = async (id: string, status: 'APPROVED' | 'REJECTED') => {
        setProcessingId(id);
        try {
            const { error } = await supabase
                .from('community_members')
                .update({ status })
                .eq('id', id);

            if (error) throw error;

            // Remove from list locally
            setPendingMembers(prev => prev.filter(m => m.id !== id));
            router.refresh(); // Refresh server stats
        } catch (error) {
            console.error(error);
            alert('Bir hata oluştu.');
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-cream-100 pb-12 pt-8 px-8 animate-in fade-in zoom-in duration-500">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Header */}
                <div className="flex justify-between items-end animate-in slide-in-from-bottom-2 delay-100 duration-700 fill-mode-both">
                    <div>
                        <h2 className="text-taupe font-bold uppercase tracking-widest text-xs mb-2">Hoş Geldin, Yönetici 👋</h2>
                        <h1 className="text-4xl md:text-5xl font-serif text-obsidian tracking-tight">Genel Bakış</h1>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href="/c/yazilimcilar"
                            target="_blank"
                            className="bg-white hover:bg-cream-50 text-charcoal border border-sandstone px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-sm hover:shadow"
                        >
                            <Globe className="w-4 h-4" />
                            Topluluk Sayfası
                        </Link>
                        <Link
                            href="/yntm/events/new"
                            className="btn-primary shadow-xl"
                        >
                            <Plus className="w-5 h-5" />
                            Yeni Etkinlik
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in slide-in-from-bottom-2 delay-200 duration-700 fill-mode-both">
                    <StatsCard
                        title="Toplam Üye"
                        value={stats.totalMembers.toString()}
                        icon={Users}
                        trend={`+${stats.pendingMembers} Bekleyen`}
                        trendUp={true}
                        color="blue"
                    />
                    <StatsCard
                        title="Toplam Kapasite"
                        value={stats.totalCapacity.toString()}
                        icon={Ticket}
                        color="purple"
                    />
                    <StatsCard
                        title="Aktif Etkinlik"
                        value={stats.activeEvents.toString()}
                        icon={Activity}
                        color="emerald"
                    />
                    <StatsCard
                        title="Bekleyen Onay"
                        value={stats.pendingMembers.toString()}
                        icon={Clock}
                        color={stats.pendingMembers > 0 ? "rose" : "emerald"}
                    />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-in slide-in-from-bottom-2 delay-300 duration-700 fill-mode-both">
                    {/* Recent Events */}
                    <div>
                        <div className="flex justify-between items-center mb-6 px-1">
                            <h3 className="text-2xl font-serif text-obsidian">Son Etkinlikler</h3>
                            <Link href="/yntm/events" className="text-xs text-electric-blue font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">
                                Tümünü Gör <ArrowRight className="w-4 h-4 ml-0.5" />
                            </Link>
                        </div>

                        <div className="porcelain-glass rounded-[32px] overflow-hidden shadow-warm">
                            <table className="w-full text-left">
                                <thead className="bg-cream-50 border-b border-sandstone">
                                    <tr className="text-taupe text-xs uppercase tracking-widest">
                                        <th className="p-5 font-bold pl-8">Etkinlik Adı</th>
                                        <th className="p-5 font-bold">Tarih</th>
                                        <th className="p-5 font-bold text-right pr-8">LCV</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-sandstone/50">
                                    {recentEvents.map((event) => (
                                        <tr key={event.id} className="hover:bg-white/50 transition-colors group cursor-pointer">
                                            <td className="p-5 pl-8 font-bold text-obsidian group-hover:text-electric-blue transition-colors">
                                                {event.title}
                                            </td>
                                            <td className="p-5 text-charcoal text-sm font-medium">
                                                {new Date(event.start_date).toLocaleDateString('tr-TR')}
                                            </td>
                                            <td className="p-5 text-right pr-8">
                                                <span className="bg-cream-100 text-charcoal px-3 py-1 rounded-lg text-xs font-bold border border-sandstone">
                                                    {event.capacity ? `${Math.floor(event.capacity * 0.4)} / ${event.capacity}` : '-'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pending Members Approvals */}
                    <div>
                        <div className="flex justify-between items-center mb-6 px-1">
                            <h3 className="text-2xl font-serif text-obsidian">
                                Üyelik Başvuruları
                                <span className="ml-3 bg-gold/10 text-gold text-xs px-2.5 py-1 rounded-full border border-gold/20 align-middle">{pendingMembers.length}</span>
                            </h3>
                        </div>

                        <div className="porcelain-glass rounded-[32px] p-6 space-y-4 min-h-[300px] shadow-warm">
                            {pendingMembers.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-taupe py-16">
                                    <CheckCircle className="w-16 h-16 mb-4 opacity-20" />
                                    <p className="font-serif text-lg">Bekleyen başvuru yok.</p>
                                </div>
                            ) : (
                                pendingMembers.map((member) => (
                                    <div key={member.id} className="bg-white/60 border border-sandstone hover:border-electric-blue/30 hover:shadow-md transition-all rounded-2xl p-5 flex justify-between items-end group">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="font-bold text-obsidian text-lg">{member.profile?.full_name || 'User'}</h4>
                                                <span className="text-[10px] font-bold uppercase tracking-widest bg-cream-50 text-taupe px-2 py-1 rounded-lg border border-sandstone">{member.profile?.email}</span>
                                            </div>
                                            <p className="text-xs text-taupe mb-3 font-medium">Başvuru: {new Date(member.joined_at).toLocaleDateString('tr-TR')}</p>

                                            {/* Show Answers */}
                                            {member.answers && (
                                                <div className="space-y-1.5 pl-3 border-l-2 border-sandstone">
                                                    {Object.entries(member.answers).map(([qid, ans]) => (
                                                        <div key={qid} className="text-xs">
                                                            <span className="text-taupe font-bold uppercase tracking-wider text-[10px] mr-2">Soru: </span>
                                                            <span className="text-charcoal font-medium">"{ans as string}"</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleMemberAction(member.id, 'REJECTED')}
                                                disabled={processingId === member.id}
                                                className="p-3 hover:bg-coral/10 text-taupe hover:text-coral rounded-xl transition-colors border border-transparent hover:border-coral/20" title="Reddet">
                                                {processingId === member.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <XCircle className="w-6 h-6" />}
                                            </button>
                                            <button
                                                onClick={() => handleMemberAction(member.id, 'APPROVED')}
                                                disabled={processingId === member.id}
                                                className="p-3 bg-neon-mint/10 text-emerald-600 rounded-xl transition-all border border-neon-mint/20 hover:bg-neon-mint/20 hover:shadow-sm" title="Onayla">
                                                {processingId === member.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-6 h-6" />}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
