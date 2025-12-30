"use client";

import { Search, Filter, MoreHorizontal, Check, X, Shield, Mail, Calendar, Loader2 } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { createClient } from "@/utils/supabase/client";

interface Member {
    id: string; // community_member_id
    user_id: string; // profile_id
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    role: 'ADMIN' | 'MEMBER' | 'MODERATOR';
    joined_at: string;
    profile: {
        full_name: string;
        email: string;
        avatar_url: string;
    }
}

interface AdminMembersViewProps {
    initialMembers: any[]; // Using any to avoid strict type mismatch during migration steps, but ideally Member[]
}

export default function AdminMembersView({ initialMembers }: AdminMembersViewProps) {
    const [members, setMembers] = useState<Member[]>(initialMembers || []);
    const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED'>('ALL');
    const [processingId, setProcessingId] = useState<string | null>(null);

    const supabase = createClient();

    const filteredMembers = members.filter(m =>
        filter === 'ALL' ? true : m.status === filter
    );

    const tabs = [
        { id: 'ALL', label: 'Tümü' },
        { id: 'PENDING', label: 'Bekleyenler' },
        { id: 'APPROVED', label: 'Onaylananlar' }
    ];

    const updateStatus = async (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
        setProcessingId(id);
        try {
            const { error } = await supabase
                .from('community_members')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            setMembers(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
            // Show toast or notification here
        } catch (error) {
            console.error('Error updating member status:', error);
            alert('İşlem sırasında bir hata oluştu.');
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-8 min-h-screen">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-text-main mb-2">Üye Dizini</h1>
                <p className="text-text-muted text-lg">Topluluk erişiminizi yönetin ve üyelerinizi listeleyin.</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-6 border-b border-border-subtle pb-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setFilter(tab.id as any)}
                        className={clsx(
                            "pb-3 text-sm font-bold uppercase tracking-wider transition-all border-b-2",
                            filter === tab.id
                                ? "text-primary border-primary"
                                : "text-text-muted border-transparent hover:text-text-main hover:border-border"
                        )}
                    >
                        {tab.label}
                        {tab.id === 'PENDING' && (
                            <span className="ml-2 bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full text-[10px]">
                                {members.filter(m => m.status === 'PENDING').length}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="space-y-4 animate-in slide-up duration-500 delay-100">
                {filteredMembers.length === 0 ? (
                    <div className="text-center py-12 text-stone-400">
                        <UsersIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>Bu filtreye uygun üye bulunamadı.</p>
                    </div>
                ) : (
                    filteredMembers.map((member) => (
                        <div key={member.id} className="cominfy-card p-6 flex flex-col md:flex-row items-center gap-6 group hover:border-primary/30 transition-colors">
                            {/* Avatar */}
                            <div className="w-16 h-16 rounded-full bg-stone-100 p-1 flex-shrink-0">
                                <img
                                    src={member.profile?.avatar_url || `https://ui-avatars.com/api/?name=${member.profile?.full_name || 'User'}`}
                                    alt={member.profile?.full_name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0 text-center md:text-left space-y-1">
                                <div className="flex items-center justify-center md:justify-start gap-2">
                                    <h3 className="text-lg font-bold text-text-main">{member.profile?.full_name || 'Bilinmeyen Kullanıcı'}</h3>
                                    {member.role === 'ADMIN' && <Shield className="w-4 h-4 text-primary" />}
                                </div>
                                <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-text-muted">
                                    <div className="flex items-center gap-1.5">
                                        <Mail className="w-3.5 h-3.5" />
                                        <span>{member.profile?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>Katılım: {new Date(member.joined_at).toLocaleDateString("tr-TR")}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Status/Actions */}
                            <div className="flex items-center gap-4">
                                {member.status === 'PENDING' ? (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateStatus(member.id, 'REJECTED')}
                                            disabled={!!processingId}
                                            className="p-2 rounded-full bg-stone-100 text-text-muted hover:bg-rose-50 hover:text-rose-600 transition-colors disabled:opacity-50"
                                            title="Reddet">
                                            {processingId === member.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <X className="w-5 h-5" />}
                                        </button>
                                        <button
                                            onClick={() => updateStatus(member.id, 'APPROVED')}
                                            disabled={!!processingId}
                                            className="p-2 rounded-full bg-stone-100 text-text-muted hover:bg-emerald-50 hover:text-emerald-600 transition-colors disabled:opacity-50"
                                            title="Onayla">
                                            {processingId === member.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                                        </button>
                                    </div>
                                ) : (
                                    <span className={clsx(
                                        "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                                        member.status === 'APPROVED' ? "bg-emerald-50 text-emerald-700" : "bg-stone-100 text-stone-500"
                                    )}>
                                        {member.status === 'APPROVED' ? 'ONAYLI' : member.status}
                                    </span>
                                )}
                                <button className="p-2 text-text-muted hover:text-text-main opacity-0 group-hover:opacity-100 transition-all">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

function UsersIcon(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    )
}
