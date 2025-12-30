import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import CommunityLoginView from "@/components/community/CommunityLoginView";

export default async function CommunityLoginPage({ params }: { params: Promise<{ subdomain: string }> }) {
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

    return <CommunityLoginView community={community} />;
}
