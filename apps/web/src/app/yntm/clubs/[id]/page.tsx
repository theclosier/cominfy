import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ClubEditView from "@/components/admin/ClubEditView";

export default async function ClubEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: club } = await supabase
        .from('communities')
        .select('*')
        .eq('id', id)
        .single();

    if (!club) {
        return notFound();
    }

    return <ClubEditView club={club} />;
}
