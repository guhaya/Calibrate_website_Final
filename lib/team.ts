import { supabaseAdmin } from "@/lib/supabase";
import type { TeamMember } from "@/lib/supabase";

export async function getTeamMembers(): Promise<TeamMember[]> {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("active", true)
    .order("category", { ascending: true })
    .order("order_index", { ascending: true });
  if (error) {
    console.error("[getTeamMembers]", error.message);
    return [];
  }
  return (data ?? []) as TeamMember[];
}
