import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import JoinCommunityView from "@/components/community/JoinCommunityView";

export default async function JoinCommunityPage({ params }: { params: Promise<{ subdomain: string }> }) {
    const { subdomain } = await params;
    const supabase = await createClient();

    const { data: community } = await supabase
        .from('communities')
        .select('*')
        .eq('subdomain', subdomain)
        .single();

    if (!community) {
        return notFound();
    }

    return <JoinCommunityView community={community} />;
}
