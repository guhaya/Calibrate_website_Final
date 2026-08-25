// Server-only (uses Node's crypto module) — import only from API routes,
// never from a client component. Kept out of lib/supabase.ts, which client
// components already import for shared types, so this never risks ending
// up in a client bundle.
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { supabaseAdmin } from "@/lib/supabase";

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyHash(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  if (candidate.length !== expected.length) return false;
  return timingSafeEqual(candidate, expected);
}

// DB-backed password check, falling back to the ADMIN_PASSWORD env var only
// if the admin_credentials table has no row yet (pre-migration safety net).
export async function verifyAdminPassword(password: string): Promise<boolean> {
  if (!password) return false;
  const supabase = supabaseAdmin();
  const { data } = await supabase
    .from("admin_credentials")
    .select("password_hash")
    .eq("id", 1)
    .maybeSingle();

  if (data?.password_hash) {
    return verifyHash(password, data.password_hash);
  }
  return Boolean(process.env.ADMIN_PASSWORD) && password === process.env.ADMIN_PASSWORD;
}

export async function setAdminPassword(newPassword: string): Promise<void> {
  const supabase = supabaseAdmin();
  const password_hash = hashPassword(newPassword);
  await supabase
    .from("admin_credentials")
    .upsert({ id: 1, password_hash, updated_at: new Date().toISOString() });
}

