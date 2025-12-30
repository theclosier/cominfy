import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import ProfileView from "@/components/community/ProfileView";

export default async function ProfilePage({ params }: { params: Promise<{ subdomain: string }> }) {
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

    // 2. Get User
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect(`/c/${subdomain}/login`);
    }

    // 3. Get User Profile Details
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    return <ProfileView community={community} userProfile={profile} />;
}
