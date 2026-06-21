import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function parseDevice(ua: string): string {
  if (/tablet|ipad/i.test(ua)) return "Tablet";
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(ua)) return "Mobile";
  return "Desktop";
}

function parseBrowser(ua: string): string {
  if (/edg\//i.test(ua)) return "Edge";
  if (/opr\/|opera/i.test(ua)) return "Opera";
  if (/chrome\//i.test(ua) && !/chromium/i.test(ua)) return "Chrome";
  if (/firefox\//i.test(ua)) return "Firefox";
  if (/safari\//i.test(ua) && !/chrome/i.test(ua)) return "Safari";
  if (/msie|trident/i.test(ua)) return "IE";
  return "Other";
}

function parseOS(ua: string): string {
  if (/windows nt/i.test(ua)) return "Windows";
  if (/macintosh|mac os x/i.test(ua)) return "macOS";
  if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
  if (/android/i.test(ua)) return "Android";
  if (/linux/i.test(ua)) return "Linux";
  return "Other";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const country = req.headers.get("x-vercel-ip-country") || "";
    const countryCode = req.headers.get("x-vercel-ip-country") || "";
    const city = req.headers.get("x-vercel-ip-city") || "";
    const region = req.headers.get("x-vercel-ip-country-region") || "";
    const latitude = req.headers.get("x-vercel-ip-latitude") || "";
    const longitude = req.headers.get("x-vercel-ip-longitude") || "";
    const userAgent = req.headers.get("user-agent") || "";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    await supabase.from("visitor_logs").insert({
      ip,
      country,
      country_code: countryCode,
      city,
      region,
      latitude,
      longitude,
      device_type: parseDevice(userAgent),
      browser: parseBrowser(userAgent),
      os: parseOS(userAgent),
      user_agent: userAgent,
      page: body.page || "/",
      referrer: body.referrer || "",
      session_id: body.sessionId || "",
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
