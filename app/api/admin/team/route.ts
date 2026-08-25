import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyAdminPassword } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password, action } = body;

    if (!(await verifyAdminPassword(password))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = supabaseAdmin();

    switch (action) {
      case "list": {
        const { data, error } = await supabase
          .from("team_members")
          .select("*")
          .order("category", { ascending: true })
          .order("order_index", { ascending: true });
        if (error) throw error;
        return NextResponse.json({ data });
      }

      case "create": {
        const { data: existing } = await supabase
          .from("team_members")
          .select("order_index")
          .eq("category", body.category)
          .order("order_index", { ascending: false })
          .limit(1);
        const nextOrder = (existing?.[0]?.order_index ?? -1) + 1;

        const { data, error } = await supabase
          .from("team_members")
          .insert({
            category: body.category,
            order_index: nextOrder,
            name: body.name || "New Member",
            handle: body.handle || null,
            role: body.role || null,
            location: body.location || null,
            experience: body.experience || null,
            specialisation: body.specialisation || null,
            credentials_line: body.credentials_line || null,
            description: body.description || null,
            bio: body.bio && body.bio.length ? body.bio : null,
            credentials: body.credentials && body.credentials.length ? body.credentials : null,
            stats: body.stats && body.stats.length ? body.stats : null,
            color: body.color || null,
            initials: body.initials || null,
            active: body.active !== false,
          })
          .select()
          .single();
        if (error) throw error;
        return NextResponse.json({ data });
      }

      case "update": {
        const { id, ...rest } = body.member;
        const { data, error } = await supabase
          .from("team_members")
          .update({
            name: rest.name,
            handle: rest.handle || null,
            role: rest.role || null,
            location: rest.location || null,
            experience: rest.experience || null,
            specialisation: rest.specialisation || null,
            credentials_line: rest.credentials_line || null,
            description: rest.description || null,
            bio: rest.bio && rest.bio.length ? rest.bio : null,
            credentials: rest.credentials && rest.credentials.length ? rest.credentials : null,
            stats: rest.stats && rest.stats.length ? rest.stats : null,
            color: rest.color || null,
            initials: rest.initials || null,
            active: Boolean(rest.active),
            updated_at: new Date().toISOString(),
          })
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return NextResponse.json({ data });
      }

      case "delete": {
        const { error } = await supabase.from("team_members").delete().eq("id", body.id);
        if (error) throw error;
        return NextResponse.json({ ok: true });
      }

      case "reorder": {
        const { ids } = body as { ids: string[] };
        await Promise.all(
          ids.map((id, index) =>
            supabase.from("team_members").update({ order_index: index }).eq("id", id)
          )
        );
        return NextResponse.json({ ok: true });
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
