import { NextResponse } from "next/server";
import { supabasePublic } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = supabasePublic();

    const [fields, rates] = await Promise.all([
      supabase.from("form_fields").select("*").eq("active", true).order("order_index", { ascending: true }),
      supabase.from("pricing_rates").select("*").eq("active", true).order("order_index", { ascending: true }),
    ]);

    if (fields.error) throw fields.error;
    if (rates.error) throw rates.error;

    return NextResponse.json(
      { fields: fields.data, rates: rates.data },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
