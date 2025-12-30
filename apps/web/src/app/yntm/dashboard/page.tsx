import { createClient } from "@/utils/supabase/server";
import DashboardView from "@/components/admin/DashboardView";

export default async function DashboardPage() {
  const supabase = await createClient();

  // 1. Get Stats (This could be optimized with count query or RPC)
  const { count: totalMembers } = await supabase.from('community_members').select('*', { count: 'exact', head: true });

  // We sort of need total capacity from all events
  const { data: events } = await supabase.from('events').select('capacity, id');
  const totalCapacity = events?.reduce((acc, ev) => acc + (ev.capacity || 0), 0) || 0;

  const { count: activeEvents } = await supabase.from('events').select('*', { count: 'exact', head: true }).eq('status', 'PUBLISHED');

  const { count: pendingMembersCount } = await supabase.from('community_members').select('*', { count: 'exact', head: true }).eq('status', 'PENDING');

  // 2. Get Recent Events
  const { data: recentEvents } = await supabase.from('events').select('*').order('created_at', { ascending: false }).limit(5);

  // 3. Get Pending Members List
  const { data: pendingMembersList } = await supabase
    .from('community_members')
    .select(`
            id, status, joined_at, answers,
            profile:profiles(full_name, email)
        `)
    .eq('status', 'PENDING')
    .limit(10);

  const stats = {
    totalMembers: totalMembers || 0,
    totalCapacity,
    activeEvents: activeEvents || 0,
    pendingMembers: pendingMembersCount || 0
  };

  return <DashboardView stats={stats} recentEvents={recentEvents || []} pendingMembersList={pendingMembersList || []} />;
}
