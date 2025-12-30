import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import EventDetailView from "@/components/community/EventDetailView";

export default async function PublicEventDetailPage({ params }: { params: Promise<{ subdomain: string, id: string }> }) {
    const { subdomain, id } = await params;
    const supabase = await createClient();

    // 1. Fetch Community
    const { data: community } = await supabase
        .from('communities')
        .select('*')
        .eq('subdomain', subdomain)
        .single();

    if (!community) {
        return notFound();
    }

    // 2. Fetch Event
    const { data: event } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .eq('community_id', community.id) // Ensure event belongs to this community
        .single();

    if (!event) {
        return notFound();
    }

    return <EventDetailView event={event} community={community} />;
}
