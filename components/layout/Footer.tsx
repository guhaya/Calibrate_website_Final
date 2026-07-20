"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

const footerLinks = {
  Coaching: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Apply", href: "/apply" },
    { label: "Your Experience", href: "/clients" },
    { label: "Pricing", href: "/pricing" },
    { label: "Book Free Call", href: "/book" },
  ],
  Company: [
    { label: "Meet the Team", href: "/coaches" },
    { label: "Transformation Stories", href: "/success-stories" },
    { label: "Blog", href: "/blog" },
  ],
  Support: [
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/contact#faq" },
    { label: "Email Us", href: "mailto:Admin@gvnfit.online" },
    { label: "Book a Call", href: "/book" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer
      style={{
        background: "rgba(9, 9, 11, 0.97)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "72px 24px 32px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Email capture row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
            padding: "32px",
            marginBottom: "56px",
            background: "rgba(255,222,2,0.06)",
            border: "1px solid rgba(255,222,2,0.18)",
            borderRadius: "20px",
          }}
          className="footer-capture"
        >
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "26px", color: "#FFFFFF", marginBottom: "4px", letterSpacing: "0.01em" }}>
              Get the weekly protocol drop
            </p>
            <p style={{ color: "#B7B9C3", fontSize: "14px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Training notes, nutrition breakdowns, and client results — straight to your inbox.
            </p>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
            style={{ display: "flex", gap: "8px", flexWrap: "wrap", minWidth: "300px" }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="input-dark"
              style={{ flex: 1, minWidth: "200px" }}
              aria-label="Email address"
            />
            <button type="submit" className="btn-primary" style={{ padding: "13px 24px", fontSize: "13px" }}>
              {submitted ? "Subscribed" : "Subscribe"}
            </button>
          </form>
        </div>

        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr repeat(3, auto)",
            gap: "48px",
            marginBottom: "64px",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ marginBottom: "16px" }}>
              <Logo size={30} showText={true} />
            </div>
            <p
              style={{
                color: "#7E8395",
                fontSize: "14px",
                lineHeight: 1.7,
                maxWidth: "280px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              DMAIC-based precision coaching for engineers, product managers, and consultants. Data-driven body recomposition built around your actual schedule — not a generic programme.
            </p>
            <div style={{ marginTop: "24px", display: "flex", alignItems: "center", gap: "6px" }}>
              <div className="status-dot" />
              <span style={{ color: "#7E8395", fontSize: "12px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Currently accepting new clients
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p
                style={{
                  color: "#FFFFFF",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  marginBottom: "16px",
                }}
              >
                {category}
              </p>
              <ul style={{ listStyle: "none" }}>
                {links.map((link) => (
                  <li key={link.href} style={{ marginBottom: "10px" }}>
                    <Link
                      href={link.href}
                      style={{
                        color: "#7E8395",
                        fontSize: "14px",
                        textDecoration: "none",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#FFDE02")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#7E8395")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="hr-gold" style={{ marginBottom: "24px" }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ color: "#7E8395", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            © {new Date().getFullYear()} CALIBRATE. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms of Service", href: "/terms" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  color: "#7E8395",
                  fontSize: "13px",
                  textDecoration: "none",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#FFFFFF")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#7E8395")}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .footer-grid > div:first-child {
            grid-column: 1 / -1;
          }
          .footer-capture {
            flex-direction: column;
            align-items: flex-start !important;
          }
          .footer-capture form {
            width: 100%;
          }
        }
      `}</style>
    </footer>
  );
}
