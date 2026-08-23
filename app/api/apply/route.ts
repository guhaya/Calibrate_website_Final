import { NextRequest, NextResponse } from "next/server";
import { supabasePublic, supabaseAdmin, type FormField } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();
    if (!answers || typeof answers !== "object") {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    const publicClient = supabasePublic();
    const { data: fields, error: fieldsError } = await publicClient
      .from("form_fields")
      .select("*")
      .eq("active", true);
    if (fieldsError) throw fieldsError;

    for (const field of fields as FormField[]) {
      if (field.required && !String(answers[field.id] ?? "").trim()) {
        return NextResponse.json({ error: `"${field.label}" is required` }, { status: 400 });
      }
    }

    const byLabel = (needle: string) =>
      (fields as FormField[]).find((f) => f.label.toLowerCase().includes(needle));
    const nameField = byLabel("name");
    const emailField = byLabel("email");
    const phoneField = byLabel("phone");

    const admin = supabaseAdmin();
    const { error: insertError } = await admin.from("form_submissions").insert({
      answers,
      name: nameField ? answers[nameField.id] ?? null : null,
      email: emailField ? answers[emailField.id] ?? null : null,
      phone: phoneField ? answers[phoneField.id] ?? null : null,
    });
    if (insertError) throw insertError;

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
