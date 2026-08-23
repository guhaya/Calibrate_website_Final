import { NextRequest, NextResponse } from "next/server";
import { checkAdminPassword, supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { password, action, limit = 50, offset = 0, id, status } = await req.json();

    if (!checkAdminPassword(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = supabaseAdmin();

    if (action === "update-status") {
      const { error } = await supabase.from("form_submissions").update({ status }).eq("id", id);
      if (error) throw error;
      return NextResponse.json({ ok: true });
    }

    const { data, error, count } = await supabase
      .from("form_submissions")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);
    if (error) throw error;

    return NextResponse.json({ data, count });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
