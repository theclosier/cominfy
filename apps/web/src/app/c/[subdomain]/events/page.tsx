import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import EventsView from "@/components/community/EventsView";

export default async function EventsPage({ params }: { params: Promise<{ subdomain: string }> }) {
    const { subdomain } = await params;
    const supabase = await createClient();

    // 1. Get Community
    const { data: community } = await supabase
        .from('communities')
        .select('*')
        .eq('subdomain', subdomain)
        .single();

    if (!community) {
        return notFound();
    }

    // 2. Get All Events (No Limit)
    const { data: events } = await supabase
        .from('events')
        .select('*')
        .eq('community_id', community.id)
        .eq('status', 'PUBLISHED')
        .order('start_date', { ascending: true }); // Order by upcoming

    return <EventsView community={community} events={events || []} />;
}
