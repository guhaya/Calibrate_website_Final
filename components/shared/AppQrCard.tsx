"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { APP_STORE_URL } from "@/lib/appLinks";

const KEY = "calibrate-qr-dismissed";

// Desktop-only floating card: scan to get Vemisis on iPhone. Appears after
// the hero, can be dismissed, and stays dismissed for the browser session.
export default function AppQrCard() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      let gone = false;
      try { gone = sessionStorage.getItem(KEY) === "1"; } catch {}
      if (gone) { setDismissed(true); return; }
      setShow(window.scrollY > 520);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed) return null;

  const close = () => {
    setDismissed(true);
    try { sessionStorage.setItem(KEY, "1"); } catch {}
  };

  return (
    <aside className={`qr-card ${show ? "qr-on" : ""}`} aria-label="Download Vemisis for iPhone" aria-hidden={!show}>
      <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="qr-link" tabIndex={show ? 0 : -1}>
        <span className="qr-code">
          <Image src="/media/brand/appstore-qr.svg" alt="QR code linking to Vemisis on the App Store" width={84} height={84} unoptimized />
        </span>
        <span className="qr-text">
          <span className="qr-title">Get Vemisis for iPhone</span>
          <span className="qr-sub">Scan with your camera to open the App Store.</span>
        </span>
      </a>
      <button type="button" className="qr-close" onClick={close} aria-label="Hide download card" tabIndex={show ? 0 : -1}>
        <X size={14} />
      </button>
      <style>{`
        .qr-card {
          position: fixed; right: 24px; bottom: 24px; z-index: 60; display: none;
          padding: 12px 40px 12px 12px; border-radius: 20px;
          background: rgba(16,16,20,0.82); border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 30px 60px -20px rgba(0,0,0,0.8);
          opacity: 0; transform: translateY(16px); pointer-events: none;
          transition: opacity 0.35s var(--ease-out), transform 0.35s var(--ease-out);
        }
        .qr-card.qr-on { opacity: 1; transform: none; pointer-events: auto; }
        @media (min-width: 1024px) { .qr-card { display: block; } }
        .qr-link { display: flex; align-items: center; gap: 14px; text-decoration: none; color: #fff; }
        .qr-code { display: block; width: 84px; height: 84px; padding: 6px; border-radius: 12px; background: #fff; }
        .qr-code img { width: 100%; height: 100%; display: block; }
        .qr-text { display: flex; flex-direction: column; gap: 4px; max-width: 170px; }
        .qr-title { font-weight: 800; font-size: 15px; line-height: 1.2; }
        .qr-sub { font-size: 12.5px; line-height: 1.4; color: var(--text-secondary); }
        .qr-close {
          position: absolute; top: 8px; right: 8px; width: 28px; height: 28px; border-radius: 50%;
          display: grid; place-items: center; background: rgba(255,255,255,0.08); color: #fff; border: 0; cursor: pointer;
        }
        .qr-close:hover { background: rgba(255,255,255,0.16); }
        .qr-close:focus-visible, .qr-link:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
        @media (prefers-reduced-motion: reduce) { .qr-card { transition: none; } }
      `}</style>
    </aside>
  );
}
