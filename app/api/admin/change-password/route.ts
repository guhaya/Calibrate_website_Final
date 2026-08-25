import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword, setAdminPassword } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  try {
    const { currentPassword, newPassword } = await req.json();

    if (!(await verifyAdminPassword(currentPassword))) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
    }
    if (typeof newPassword !== "string" || newPassword.length < 8) {
      return NextResponse.json({ error: "New password must be at least 8 characters" }, { status: 400 });
    }
    if (newPassword === currentPassword) {
      return NextResponse.json({ error: "New password must be different from the current one" }, { status: 400 });
    }

    await setAdminPassword(newPassword);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
