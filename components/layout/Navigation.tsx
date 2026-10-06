"use client";

import { useState, useEffect, useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const navLinks = [
  { label: "Method", href: "/how-it-works" },
  { label: "Programmes", href: "/programmes" },
  { label: "Vemisis App", href: "/features" },
  { label: "Coaches", href: "/coaches" },
  { label: "Pricing", href: "/pricing" },
];

const mobileExtra = [
  { label: "Your Experience", href: "/clients" },
  { label: "Apply", href: "/apply" },
  { label: "Contact", href: "/contact" },
];

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const lastY = useRef(0);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    if (y < 320 || y < lastY.current - 4) setHidden(false);
    else if (y > lastY.current + 4) setHidden(true);
    lastY.current = y;
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // While the menu is open, take the page behind it out of the tab order and
  // move focus into the menu; hand focus back to the burger when it closes.
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  useEffect(() => {
    const behind = document.querySelectorAll<HTMLElement>("main, footer");
    behind.forEach((el) => { el.inert = menuOpen; });
    if (menuOpen) {
      menuRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    } else if (wasOpen.current) {
      burgerRef.current?.focus({ preventScroll: true });
    }
    wasOpen.current = menuOpen;
    return () => behind.forEach((el) => { el.inert = false; });
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname?.startsWith(href + "/"));

  return (
    <>
      <header className={`nv ${scrolled ? "nv-scrolled" : ""} ${hidden && !menuOpen ? "nv-hidden" : ""}`}>
        <div className="nv-inner">
          <Link href="/" aria-label="CALIBRATE by GVNFIT home" className="nv-logo">
            <Logo size={34} />
          </Link>

          <nav className="nv-pill" aria-label="Primary">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`nv-link ${isActive(link.href) ? "is-active" : ""}`} aria-current={isActive(link.href) ? "page" : undefined}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="nv-actions">
            <Link href="/apply" className="nv-text-link">Apply</Link>
            <Link href="/book" className="btn-primary nv-cta">
              Book your free call <Arrow />
            </Link>
            <button
              ref={burgerRef}
              className={`nv-burger ${menuOpen ? "is-open" : ""}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`nv-menu ${menuOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!menuOpen}
      >
        <div className="nv-menu-inner">
          <p className="mono c-muted" style={{ marginBottom: 18 }}>Menu</p>
          <ul>
            {[...navLinks, ...mobileExtra].map((link, i) => (
              <li key={link.href} style={{ ["--i" as string]: i }}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  tabIndex={menuOpen ? 0 : -1}
                  className={isActive(link.href) ? "is-active" : ""}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  <span>{link.label}</span>
                  <Arrow />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/book"
            className="btn-primary btn-primary-lg"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
            style={{ width: "100%", marginTop: 32 }}
          >
            Book your free call <Arrow />
          </Link>
          <p className="body-sm" style={{ marginTop: 20, textAlign: "center" }}>
            <a href="mailto:Admin@gvnfit.online" style={{ color: "#fff", textDecoration: "none" }} tabIndex={menuOpen ? 0 : -1}>Admin@gvnfit.online</a>
          </p>
        </div>
      </div>

      <style>{`
        .nv {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 16px 24px;
          transition: transform 0.5s var(--ease-out), padding 0.4s var(--ease-out);
        }
        .nv-hidden { transform: translateY(-110%); }
        .nv:focus-within { transform: none; }
        .nv-inner {
          max-width: 1400px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 16px;
          padding: 10px 10px 10px 18px;
          border-radius: 999px;
          border: 1px solid transparent;
          transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease;
        }
        .nv-scrolled .nv-inner {
          background: rgba(10,10,13,0.72);
          border-color: rgba(255,255,255,0.09);
          backdrop-filter: blur(18px) saturate(140%);
          -webkit-backdrop-filter: blur(18px) saturate(140%);
          box-shadow: 0 12px 40px -12px rgba(0,0,0,0.7);
        }
        .nv-logo { text-decoration: none; justify-self: start; display: inline-flex; }
        .nv-pill {
          display: flex; align-items: center; gap: 2px;
          padding: 5px;
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .nv-scrolled .nv-pill { background: transparent; border-color: transparent; }
        .nv-link {
          position: relative;
          padding: 9px 16px;
          font-size: 13.5px; font-weight: 600;
          color: #B7B9C3; text-decoration: none;
          border-radius: 999px;
          transition: color 0.2s ease, background 0.25s ease;
          white-space: nowrap;
        }
        .nv-link:hover { color: #fff; background: rgba(255,255,255,0.07); }
        .nv-link.is-active { color: #050506; background: var(--accent); }
        .nv-actions { justify-self: end; display: flex; align-items: center; gap: 18px; }
        .nv-text-link { font-size: 13.5px; font-weight: 700; color: #fff; text-decoration: none; opacity: 0.85; transition: opacity 0.2s; }
        .nv-text-link:hover { opacity: 1; color: var(--accent); }
        .nv-cta { padding: 12px 20px !important; font-size: 12px !important; }
        .nv-burger {
          display: none;
          width: 44px; height: 44px; border-radius: 50%;
          background: var(--accent); border: none; cursor: pointer;
          position: relative; flex-shrink: 0;
        }
        .nv-burger span {
          position: absolute; left: 13px; right: 13px; height: 2px; background: #050506; border-radius: 2px;
          transition: transform 0.4s var(--ease-out), top 0.4s var(--ease-out);
        }
        .nv-burger span:first-child { top: 17px; }
        .nv-burger span:last-child { top: 25px; }
        .nv-burger.is-open span:first-child { top: 21px; transform: rotate(45deg); }
        .nv-burger.is-open span:last-child { top: 21px; transform: rotate(-45deg); }

        .nv-menu {
          position: fixed; inset: 0; z-index: 99;
          background: rgba(5,5,6,0.97);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          clip-path: circle(0% at calc(100% - 46px) 46px);
          transition: clip-path 0.7s var(--ease-out);
          visibility: hidden;
          overflow-y: auto;
          overscroll-behavior: contain;
        }
        .nv-menu.is-open { clip-path: circle(150% at calc(100% - 46px) 46px); visibility: visible; }
        .nv-menu-inner { max-width: 560px; margin: 0 auto; padding: 112px 24px 40px; }
        .nv-menu ul { list-style: none; }
        .nv-menu li {
          border-bottom: 1px solid rgba(255,255,255,0.08);
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out);
          transition-delay: calc(var(--i) * 45ms + 150ms);
        }
        .nv-menu.is-open li { opacity: 1; transform: none; }
        .nv-menu li a {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 2px;
          font-family: var(--font-display); font-size: 34px; text-transform: uppercase;
          color: #fff; text-decoration: none; letter-spacing: 0.01em;
        }
        .nv-menu li a.is-active, .nv-menu li a:hover { color: var(--accent); }

        @media (max-width: 1080px) {
          .nv-text-link { display: none; }
          .nv-link { padding: 9px 9px; font-size: 13px; }
        }
        @media (max-width: 960px) {
          .nv { padding: 12px 14px; }
          .nv-inner {
            grid-template-columns: 1fr auto;
            background: rgba(10,10,13,0.72);
            border-color: rgba(255,255,255,0.09);
            backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
            padding: 8px 8px 8px 16px;
          }
          .nv-pill, .nv-cta { display: none !important; }
          .nv-burger { display: block; }
        }
        @media (min-width: 961px) { .nv-menu { display: none; } }
      `}</style>
    </>
  );
}
