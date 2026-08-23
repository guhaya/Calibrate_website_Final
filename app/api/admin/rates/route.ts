import { NextRequest, NextResponse } from "next/server";
import { checkAdminPassword, supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password, action } = body;

    if (!checkAdminPassword(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = supabaseAdmin();

    switch (action) {
      case "list": {
        const { data, error } = await supabase
          .from("pricing_rates")
          .select("*")
          .order("order_index", { ascending: true });
        if (error) throw error;
        return NextResponse.json({ data });
      }

      case "create": {
        const { data: existing } = await supabase
          .from("pricing_rates")
          .select("order_index")
          .order("order_index", { ascending: false })
          .limit(1);
        const nextOrder = (existing?.[0]?.order_index ?? 0) + 1;

        const { data, error } = await supabase
          .from("pricing_rates")
          .insert({
            order_index: nextOrder,
            name: body.name || "New Plan",
            tagline: body.tagline || null,
            price: Number(body.price) || 0,
            currency: body.currency || "INR",
            billing_note: body.billing_note || null,
            discount_label: body.discount_label || null,
            features: body.features || [],
            highlight: Boolean(body.highlight),
            active: body.active !== false,
          })
          .select()
          .single();
        if (error) throw error;
        return NextResponse.json({ data });
      }

      case "update": {
        const { id, ...rest } = body.rate;
        const { data, error } = await supabase
          .from("pricing_rates")
          .update({
            name: rest.name,
            tagline: rest.tagline || null,
            price: Number(rest.price) || 0,
            currency: rest.currency || "INR",
            billing_note: rest.billing_note || null,
            discount_label: rest.discount_label || null,
            features: rest.features || [],
            highlight: Boolean(rest.highlight),
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
        const { error } = await supabase.from("pricing_rates").delete().eq("id", body.id);
        if (error) throw error;
        return NextResponse.json({ ok: true });
      }

      case "reorder": {
        const { ids } = body as { ids: string[] };
        await Promise.all(
          ids.map((id, index) =>
            supabase.from("pricing_rates").update({ order_index: index + 1 }).eq("id", id)
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
