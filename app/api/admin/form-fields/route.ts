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
          .from("form_fields")
          .select("*")
          .order("order_index", { ascending: true });
        if (error) throw error;
        return NextResponse.json({ data });
      }

      case "create": {
        const { data: existing } = await supabase
          .from("form_fields")
          .select("order_index")
          .order("order_index", { ascending: false })
          .limit(1);
        const nextOrder = (existing?.[0]?.order_index ?? 0) + 1;

        const { data, error } = await supabase
          .from("form_fields")
          .insert({
            order_index: nextOrder,
            section: body.section || null,
            label: body.label,
            help_text: body.help_text || null,
            field_type: body.field_type || "text",
            options: body.options || [],
            placeholder: body.placeholder || null,
            required: Boolean(body.required),
            active: body.active !== false,
          })
          .select()
          .single();
        if (error) throw error;
        return NextResponse.json({ data });
      }

      case "update": {
        const { id, ...rest } = body.field;
        const { data, error } = await supabase
          .from("form_fields")
          .update({
            section: rest.section || null,
            label: rest.label,
            help_text: rest.help_text || null,
            field_type: rest.field_type,
            options: rest.options || [],
            placeholder: rest.placeholder || null,
            required: Boolean(rest.required),
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
        const { error } = await supabase.from("form_fields").delete().eq("id", body.id);
        if (error) throw error;
        return NextResponse.json({ ok: true });
      }

      case "reorder": {
        const { ids } = body as { ids: string[] };
        await Promise.all(
          ids.map((id, index) =>
            supabase.from("form_fields").update({ order_index: index + 1 }).eq("id", id)
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
