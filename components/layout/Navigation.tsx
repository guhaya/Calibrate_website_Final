"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const navLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Results", href: "/success-stories" },
  { label: "Your Experience", href: "/clients" },
  { label: "Pricing", href: "/pricing" },
  { label: "Apply", href: "/apply" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* Desktop fixed glass header */}
      <nav
        className={scrolled ? "glass-header-scrolled nav-desktop-bar" : "glass-header nav-desktop-bar"}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 24px",
          height: "76px",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.3s ease, border-color 0.3s ease",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <Logo size={34} showText={true} />
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "9px 16px",
                fontSize: "13px",
                fontWeight: 600,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
                color: pathname === link.href ? "#FFFFFF" : "#B7B9C3",
                textDecoration: "none",
                borderRadius: "999px",
                transition: "color 0.2s ease, background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = pathname === link.href ? "#FFFFFF" : "#B7B9C3";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/book"
            className="btn-primary"
            style={{ marginLeft: "12px", padding: "11px 22px", fontSize: "12px" }}
          >
            Book Free Call
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </nav>

      {/* Mobile floating pill header */}
      <div
        className="nav-mobile-bar"
        style={{
          position: "fixed",
          top: "14px",
          left: "14px",
          right: "14px",
          zIndex: 100,
          display: "none",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 10px 10px 18px",
          borderRadius: "999px",
          background: "rgba(7,7,10,0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <Logo size={26} showText={true} />
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: menuOpen ? "#FFDE02" : "rgba(255,255,255,0.08)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: menuOpen ? "#07070A" : "#FFFFFF",
            transition: "background 0.2s ease, color 0.2s ease",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            {menuOpen ? (
              <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M2.5 5.5H15.5M2.5 9H15.5M2.5 12.5H15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile full-screen slide-in menu */}
      <div
        className="mobile-menu-panel"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          background: "#07070A",
          transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
          display: "none",
          flexDirection: "column",
          padding: "104px 28px 40px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "18px 4px",
                fontSize: "32px",
                fontFamily: "var(--font-display)",
                textTransform: "uppercase",
                letterSpacing: "0.01em",
                color: pathname === link.href ? "#FFDE02" : "#FFFFFF",
                textDecoration: "none",
                borderBottom: i < navLinks.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link
          href="/book"
          className="btn-primary btn-primary-lg"
          style={{ marginTop: "40px", justifyContent: "center" }}
        >
          Book Free Call
        </Link>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop-bar { display: none !important; }
          .nav-mobile-bar { display: flex !important; }
          .mobile-menu-panel { display: flex !important; }
        }
        .nav-desktop-bar { display: flex; }
      `}</style>
    </>
  );
}
