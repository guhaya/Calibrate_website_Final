"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    let sessionId = sessionStorage.getItem("_csid");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem("_csid", sessionId);
    }

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: pathname,
        referrer: document.referrer || "",
        sessionId,
      }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
