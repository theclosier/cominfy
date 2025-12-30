import { createClient } from "@/utils/supabase/server";
import AdminMembersView from "@/components/admin/AdminMembersView";

export default async function MembersPage() {
    const supabase = await createClient();

    // Fetch members with profile details
    // Note: We need to join with profiles. Supabase JS join syntax is:
    // .select('*, profiles(*)')

    // However, if foreign key is user_id -> profiles(id), we use that relation.

    const { data: members, error } = await supabase
        .from('community_members')
        .select(`
            id,
            user_id,
            status,
            role,
            joined_at,
            profile:profiles(full_name, email, avatar_url)
        `)
        .order('joined_at', { ascending: false });

    // Transform data to ensure flat structure if needed or pass as is
    // The view expects profile object nested, which supabase returns!

    return <AdminMembersView initialMembers={members || []} />;
}
