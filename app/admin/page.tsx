"use client";

import { useState, useEffect } from "react";
import Logo from "@/components/layout/Logo";
import Icon from "@/components/shared/Icon";

type FaqItem = { q: string; a: string };
type Testimonial = { name: string; result: string; duration: string; quote: string };
type PricingTier = { name: string; price: string; features: string[] };

interface SiteContent {
  acceptingClients: boolean;
  heroHeadline: string;
  heroSubheadline: string;
  contactEmail: string;
  instagramHandle: string;
  responseTime: string;
  faq: FaqItem[];
  testimonials: Testimonial[];
  pricing: PricingTier[];
}

const DEFAULT_CONTENT: SiteContent = {
  acceptingClients: true,
  heroHeadline: "Transform your body with coaching that keeps you accountable.",
  heroSubheadline: "Training, nutrition, habit coaching, progress tracking, and direct coach support — delivered through the CALIBRATE platform.",
  contactEmail: "Admin@gvnfit.online",
  instagramHandle: "@fitguhay",
  responseTime: "24 hours",
  faq: [
    { q: "How does online coaching work?", a: "You get a custom training programme and nutrition targets through the CALIBRATE app with weekly check-ins and direct coach messaging." },
    { q: "Do I need a gym?", a: "No. Your programme is built around whatever equipment you have — gym, home gym, or bodyweight." },
    { q: "How quickly will I see results?", a: "Most clients see meaningful changes within 4–6 weeks. Visible physical changes typically show clearly by weeks 8–12." },
    { q: "What's included in the free consultation?", a: "A 30-minute call covering your current situation, goals, lifestyle, and any questions. No pressure to sign up." },
    { q: "Are there contracts?", a: "No long-term contracts. Monthly billing, cancel anytime at the end of a period." },
  ],
  testimonials: [
    { name: "Marcus T.", result: "Lost 14kg in 14 weeks", duration: "14 weeks", quote: "I'd tried everything before. The difference was having a plan that actually changed every week based on my results." },
    { name: "Priya S.", result: "Complete body recomposition", duration: "16 weeks", quote: "I wasn't just losing weight — I was building a completely different body. The nutrition approach finally made sense." },
    { name: "James O.", result: "Went from skinny-fat to lean", duration: "20 weeks", quote: "The accountability was the missing piece. Knowing my coach was reviewing my data every week changed everything." },
  ],
  pricing: [
    { name: "Foundation", price: "₹7,999/mo", features: ["Custom training programme", "Macro targets", "Weekly check-ins", "App access", "Direct messaging"] },
    { name: "Performance", price: "₹12,999/mo", features: ["Everything in Foundation", "Nutrition phase cycling", "Video check-ins", "Priority response", "Monthly 1:1 call"] },
    { name: "Elite", price: "Custom (from ₹18,999)", features: ["Everything in Performance", "Daily check-ins", "Competition prep", "Travel programme variants", "24hr WhatsApp access"] },
  ],
};

type Section = "overview" | "hero" | "faq" | "testimonials" | "pricing" | "contact" | "settings" | "visitors";

interface VisitorLog {
  id: string;
  ip: string;
  country: string;
  city: string;
  region: string;
  device_type: string;
  browser: string;
  os: string;
  page: string;
  referrer: string;
  session_id: string;
  created_at: string;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [saved, setSaved] = useState(false);
  const [editingFaq, setEditingFaq] = useState<number | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<number | null>(null);
  const [visitors, setVisitors] = useState<VisitorLog[]>([]);
  const [visitorCount, setVisitorCount] = useState(0);
  const [visitorPage, setVisitorPage] = useState(0);
  const [visitorLoading, setVisitorLoading] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("calibrate_admin_auth");
    if (auth === "true") {
      setAuthenticated(true);
      const saved = sessionStorage.getItem("calibrate_admin_pw");
      if (saved) setPassword(saved);
    }
    const stored = localStorage.getItem("calibrate_content");
    if (stored) {
      try { setContent(JSON.parse(stored)); } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    if (activeSection === "visitors" && authenticated && password) {
      loadVisitors(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection, authenticated]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, limit: 1, offset: 0 }),
      });
      if (res.ok) {
        setAuthenticated(true);
        sessionStorage.setItem("calibrate_admin_auth", "true");
        sessionStorage.setItem("calibrate_admin_pw", password);
        setPasswordError(false);
      } else {
        setPasswordError(true);
        setTimeout(() => setPasswordError(false), 2000);
      }
    } catch {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 2000);
    }
  }

  function saveContent(updated: SiteContent) {
    setContent(updated);
    localStorage.setItem("calibrate_content", JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function loadVisitors(page = 0) {
    setVisitorLoading(true);
    try {
      const res = await fetch("/api/admin/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, limit: 50, offset: page * 50 }),
      });
      const json = await res.json();
      setVisitors(json.data || []);
      setVisitorCount(json.count || 0);
      setVisitorPage(page);
    } catch { /* silent */ }
    setVisitorLoading(false);
  }

  function exportVisitorsCSV() {
    if (!visitors.length) return;
    const headers = ["Time", "IP", "Country", "City", "Region", "Device", "Browser", "OS", "Page", "Referrer", "Session"];
    const rows = visitors.map(v => [
      new Date(v.created_at).toLocaleString(),
      v.ip, v.country, v.city, v.region,
      v.device_type, v.browser, v.os, v.page, v.referrer, v.session_id,
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${(c || "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "visitor-logs.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  function exportJSON() {
    const json = JSON.stringify(content, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "calibrate-content.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function resetToDefaults() {
    if (confirm("Reset all content to defaults? This cannot be undone.")) {
      saveContent(DEFAULT_CONTENT);
      localStorage.removeItem("calibrate_content");
    }
  }

  if (!authenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0C1520",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <Logo size={52} showText={false} />
            <h1
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "28px",
                color: "#FFFFFF",
                marginTop: "20px",
                marginBottom: "8px",
                letterSpacing: "-0.01em",
              }}
            >
              Admin Portal
            </h1>
            <p style={{ fontSize: "14px", color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              CALIBRATE · Content Management
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${passwordError ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: "16px",
                padding: "32px",
                transition: "border-color 0.3s",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#6B7280",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoFocus
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${passwordError ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: "10px",
                  color: "#FFFFFF",
                  fontSize: "15px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  outline: "none",
                  marginBottom: "16px",
                  boxSizing: "border-box",
                  animation: passwordError ? "shake 0.3s ease" : "none",
                }}
              />
              {passwordError && (
                <p style={{ fontSize: "13px", color: "#EF4444", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "12px" }}>
                  Incorrect password. Try again.
                </p>
              )}
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "linear-gradient(135deg, #D4AF37, #B8962E)",
                  border: "none",
                  borderRadius: "10px",
                  color: "#0C1520",
                  fontSize: "15px",
                  fontWeight: 700,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  cursor: "pointer",
                  letterSpacing: "0.02em",
                }}
              >
                Sign In
              </button>
            </div>
          </form>

          <p style={{ textAlign: "center", fontSize: "12px", color: "#3D4550", fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: "20px" }}>
            Default password: Calibrate2026!
          </p>
        </div>
        <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }`}</style>
      </div>
    );
  }

  const navItems: { key: Section; label: string; icon: string }[] = [
    { key: "overview", label: "Overview", icon: "grid" },
    { key: "visitors", label: "Visitor Logs", icon: "trending" },
    { key: "hero", label: "Hero Section", icon: "layout" },
    { key: "faq", label: "FAQ", icon: "faq" },
    { key: "testimonials", label: "Testimonials", icon: "quote" },
    { key: "pricing", label: "Pricing", icon: "pricing" },
    { key: "contact", label: "Contact Info", icon: "contact" },
    { key: "settings", label: "Settings", icon: "settings" },
  ];

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    color: "#FFFFFF",
    fontSize: "14px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "11px",
    fontWeight: 700,
    color: "#6B7280",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "8px",
  };

  const cardStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "14px",
    padding: "24px",
    marginBottom: "16px",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0A1119" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          flexShrink: 0,
          background: "rgba(12,21,32,0.95)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          padding: "24px 16px",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          overflowY: "auto",
        }}
      >
        <div style={{ marginBottom: "32px", padding: "0 8px" }}>
          <Logo size={28} showText={true} />
          <div
            style={{
              marginTop: "8px",
              fontSize: "10px",
              color: "#4E5A6A",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Admin Portal
          </div>
        </div>

        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "8px",
                background: activeSection === item.key ? "rgba(212,175,55,0.1)" : "none",
                border: activeSection === item.key ? "1px solid rgba(212,175,55,0.2)" : "1px solid transparent",
                color: activeSection === item.key ? "#D4AF37" : "#6B7280",
                fontSize: "13px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: activeSection === item.key ? 600 : 400,
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                transition: "all 0.15s ease",
              }}
            >
              <span style={{ opacity: 0.8, display: "inline-flex" }}><Icon name={item.icon} size={15} /></span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px", marginTop: "16px" }}>
          {saved && (
            <div
              style={{
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.2)",
                borderRadius: "8px",
                padding: "8px 12px",
                fontSize: "12px",
                color: "#22C55E",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ display: "inline", marginRight: "4px" }}><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Saved
            </div>
          )}
          <button
            onClick={exportJSON}
            style={{
              width: "100%",
              padding: "10px",
              background: "rgba(212,175,55,0.08)",
              border: "1px solid rgba(212,175,55,0.2)",
              borderRadius: "8px",
              color: "#D4AF37",
              fontSize: "12px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              cursor: "pointer",
              marginBottom: "8px",
            }}
          >
            Export JSON
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem("calibrate_admin_auth");
              setAuthenticated(false);
            }}
            style={{
              width: "100%",
              padding: "10px",
              background: "none",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "8px",
              color: "#6B7280",
              fontSize: "12px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: "220px", flex: 1, padding: "32px", minWidth: 0 }}>
        <div style={{ maxWidth: "800px" }}>
          {/* Visitor Logs */}
          {activeSection === "visitors" && (
            <div>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "32px", gap: "16px", flexWrap: "wrap" }}>
                <div>
                  <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "32px", color: "#FFFFFF", marginBottom: "8px" }}>Visitor Logs</h1>
                  <p style={{ fontSize: "14px", color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    IP addresses, locations, devices, and pages visited. {visitorCount > 0 && <span style={{ color: "#D4AF37" }}>{visitorCount.toLocaleString()} total records.</span>}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {visitors.length > 0 && (
                    <button onClick={exportVisitorsCSV} style={{ padding: "9px 18px", background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.25)", borderRadius: "8px", color: "#D4AF37", fontSize: "12px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>
                      Export CSV
                    </button>
                  )}
                  <button
                    onClick={() => loadVisitors(0)}
                    disabled={visitorLoading}
                    style={{ padding: "9px 18px", background: "linear-gradient(135deg,#D4AF37,#B8962E)", border: "none", borderRadius: "8px", color: "#0C1520", fontSize: "12px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, cursor: "pointer", opacity: visitorLoading ? 0.6 : 1 }}
                  >
                    {visitorLoading ? "Loading…" : visitors.length ? "Refresh" : "Load Logs"}
                  </button>
                </div>
              </div>

              {!visitors.length && !visitorLoading && (
                <div style={{ ...cardStyle, textAlign: "center", padding: "48px 24px" }}>
                  <p style={{ fontSize: "14px", color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Click "Load Logs" to fetch visitor records from the database.
                  </p>
                </div>
              )}

              {visitors.length > 0 && (
                <>
                  {/* Summary stats */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "24px" }}>
                    {[
                      { label: "Total Visits", value: visitorCount.toLocaleString(), color: "#D4AF37" },
                      { label: "Unique Sessions", value: new Set(visitors.map(v => v.session_id)).size, color: "#22C55E" },
                      { label: "Mobile", value: visitors.filter(v => v.device_type === "Mobile").length, color: "#3B82F6" },
                      { label: "Countries", value: new Set(visitors.map(v => v.country).filter(Boolean)).size, color: "#A855F7" },
                    ].map(s => (
                      <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                        <p style={{ fontSize: "24px", fontFamily: "'Barlow Condensed', sans-serif", color: s.color, lineHeight: 1 }}>{s.value}</p>
                        <p style={{ fontSize: "11px", color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: "4px" }}>{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Log table */}
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", overflow: "hidden" }}>
                    {/* Table header */}
                    <div style={{ display: "grid", gridTemplateColumns: "140px 100px 130px 80px 80px 80px 1fr", gap: "0", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "10px 16px" }}>
                      {["Time", "IP", "Location", "Device", "Browser", "OS", "Page"].map(h => (
                        <span key={h} style={{ fontSize: "10px", fontWeight: 700, color: "#4E5A6A", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</span>
                      ))}
                    </div>

                    {/* Rows */}
                    {visitors.map((v, i) => {
                      const dt = new Date(v.created_at);
                      const location = [v.city, v.country].filter(Boolean).join(", ") || "—";
                      const deviceColor = v.device_type === "Mobile" ? "#3B82F6" : v.device_type === "Tablet" ? "#A855F7" : "#22C55E";
                      return (
                        <div
                          key={v.id}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "140px 100px 130px 80px 80px 80px 1fr",
                            gap: "0",
                            padding: "10px 16px",
                            borderBottom: i < visitors.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                            background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                          }}
                        >
                          <span style={{ fontSize: "11px", color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {dt.toLocaleDateString()} {dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                          <span style={{ fontSize: "11px", color: "#9AA4B2", fontFamily: "'Plus Jakarta Sans', sans-serif", fontVariantNumeric: "tabular-nums" }}>
                            {v.ip || "—"}
                          </span>
                          <span style={{ fontSize: "11px", color: "#9AA4B2", fontFamily: "'Plus Jakarta Sans', sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {location}
                          </span>
                          <span style={{ fontSize: "11px", color: deviceColor, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                            {v.device_type || "—"}
                          </span>
                          <span style={{ fontSize: "11px", color: "#9AA4B2", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {v.browser || "—"}
                          </span>
                          <span style={{ fontSize: "11px", color: "#9AA4B2", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {v.os || "—"}
                          </span>
                          <span style={{ fontSize: "11px", color: "#D4AF37", fontFamily: "'Plus Jakarta Sans', sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {v.page || "/"}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  {visitorCount > 50 && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "16px" }}>
                      <span style={{ fontSize: "12px", color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Showing {visitorPage * 50 + 1}–{Math.min((visitorPage + 1) * 50, visitorCount)} of {visitorCount}
                      </span>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button disabled={visitorPage === 0} onClick={() => loadVisitors(visitorPage - 1)} style={{ padding: "6px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", color: "#9AA4B2", fontSize: "12px", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: visitorPage === 0 ? "default" : "pointer", opacity: visitorPage === 0 ? 0.4 : 1 }}>← Prev</button>
                        <button disabled={(visitorPage + 1) * 50 >= visitorCount} onClick={() => loadVisitors(visitorPage + 1)} style={{ padding: "6px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", color: "#9AA4B2", fontSize: "12px", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: (visitorPage + 1) * 50 >= visitorCount ? "default" : "pointer", opacity: (visitorPage + 1) * 50 >= visitorCount ? 0.4 : 1 }}>Next →</button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Overview */}
          {activeSection === "overview" && (
            <div>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "32px", color: "#FFFFFF", marginBottom: "8px" }}>
                Dashboard
              </h1>
              <p style={{ fontSize: "14px", color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "32px" }}>
                Manage all CALIBRATE website content from here.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
                {[
                  { label: "FAQ Items", value: content.faq.length, color: "#D4AF37" },
                  { label: "Testimonials", value: content.testimonials.length, color: "#22C55E" },
                  { label: "Pricing Tiers", value: content.pricing.length, color: "#3B82F6" },
                ].map((stat) => (
                  <div key={stat.label} style={{ ...cardStyle, textAlign: "center", marginBottom: 0 }}>
                    <div style={{ fontSize: "32px", fontFamily: "'Barlow Condensed', sans-serif", color: stat.color, marginBottom: "4px" }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: "12px", color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div style={cardStyle}>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "18px", color: "#FFFFFF", marginBottom: "16px" }}>
                  Client Availability
                </h3>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: "14px", color: "#9AA4B2", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Currently shown as:{" "}
                      <strong style={{ color: content.acceptingClients ? "#22C55E" : "#EF4444" }}>
                        {content.acceptingClients ? "Accepting new clients" : "Not accepting clients"}
                      </strong>
                    </p>
                  </div>
                  <button
                    onClick={() => saveContent({ ...content, acceptingClients: !content.acceptingClients })}
                    style={{
                      padding: "8px 20px",
                      background: content.acceptingClients ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)",
                      border: `1px solid ${content.acceptingClients ? "rgba(239,68,68,0.3)" : "rgba(34,197,94,0.3)"}`,
                      borderRadius: "8px",
                      color: content.acceptingClients ? "#EF4444" : "#22C55E",
                      fontSize: "13px",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {content.acceptingClients ? "Close spots" : "Open spots"}
                  </button>
                </div>
              </div>

              <div style={cardStyle}>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "18px", color: "#FFFFFF", marginBottom: "12px" }}>
                  Quick links
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {["/", "/book", "/pricing", "/success-stories", "/how-it-works", "/blog"].map((path) => (
                    <a
                      key={path}
                      href={path}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: "10px 14px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "8px",
                        color: "#9AA4B2",
                        fontSize: "13px",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {path === "/" ? "Home" : path.replace("/", "").replace(/-/g, " ")}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 10L10 2M6 2h4v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Hero */}
          {activeSection === "hero" && (
            <div>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "32px", color: "#FFFFFF", marginBottom: "8px" }}>Hero Section</h1>
              <p style={{ fontSize: "14px", color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "32px" }}>Edit the main headline and subheadline on the homepage.</p>
              <div style={cardStyle}>
                <div style={{ marginBottom: "20px" }}>
                  <label style={labelStyle}>Main Headline</label>
                  <textarea
                    rows={3}
                    value={content.heroHeadline}
                    onChange={(e) => setContent({ ...content, heroHeadline: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>
                <div style={{ marginBottom: "24px" }}>
                  <label style={labelStyle}>Sub-headline</label>
                  <textarea
                    rows={3}
                    value={content.heroSubheadline}
                    onChange={(e) => setContent({ ...content, heroSubheadline: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>
                <button onClick={() => saveContent(content)} style={{ padding: "12px 28px", background: "linear-gradient(135deg,#D4AF37,#B8962E)", border: "none", borderRadius: "8px", color: "#0C1520", fontSize: "14px", fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer" }}>
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* FAQ */}
          {activeSection === "faq" && (
            <div>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "32px", color: "#FFFFFF", marginBottom: "8px" }}>FAQ Manager</h1>
              <p style={{ fontSize: "14px", color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "32px" }}>Add, edit, or remove FAQ items shown on the Contact and Support pages.</p>

              {content.faq.map((item, i) => (
                <div key={i} style={cardStyle}>
                  {editingFaq === i ? (
                    <div>
                      <div style={{ marginBottom: "12px" }}>
                        <label style={labelStyle}>Question</label>
                        <input
                          type="text"
                          value={item.q}
                          onChange={(e) => {
                            const updated = [...content.faq];
                            updated[i] = { ...item, q: e.target.value };
                            setContent({ ...content, faq: updated });
                          }}
                          style={inputStyle}
                        />
                      </div>
                      <div style={{ marginBottom: "16px" }}>
                        <label style={labelStyle}>Answer</label>
                        <textarea
                          rows={4}
                          value={item.a}
                          onChange={(e) => {
                            const updated = [...content.faq];
                            updated[i] = { ...item, a: e.target.value };
                            setContent({ ...content, faq: updated });
                          }}
                          style={{ ...inputStyle, resize: "vertical" }}
                        />
                      </div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => { saveContent(content); setEditingFaq(null); }} style={{ padding: "8px 20px", background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "8px", color: "#D4AF37", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Save</button>
                        <button onClick={() => setEditingFaq(null)} style={{ padding: "8px 20px", background: "none", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "#6B7280", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer" }}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "14px", fontWeight: 600, color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "6px" }}>{item.q}</p>
                        <p style={{ fontSize: "13px", color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.6 }}>{item.a}</p>
                      </div>
                      <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                        <button onClick={() => setEditingFaq(i)} style={{ padding: "6px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", color: "#9AA4B2", fontSize: "12px", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer" }}>Edit</button>
                        <button
                          onClick={() => {
                            const updated = content.faq.filter((_, idx) => idx !== i);
                            saveContent({ ...content, faq: updated });
                          }}
                          style={{ padding: "6px 14px", background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: "6px", color: "#EF4444", fontSize: "12px", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer" }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={() => {
                  const updated = [...content.faq, { q: "New question", a: "Answer here" }];
                  setContent({ ...content, faq: updated });
                  setEditingFaq(updated.length - 1);
                }}
                style={{ padding: "12px 24px", background: "rgba(212,175,55,0.08)", border: "1px dashed rgba(212,175,55,0.3)", borderRadius: "10px", color: "#D4AF37", fontSize: "14px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, cursor: "pointer", width: "100%" }}
              >
                + Add FAQ item
              </button>
            </div>
          )}

          {/* Testimonials */}
          {activeSection === "testimonials" && (
            <div>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "32px", color: "#FFFFFF", marginBottom: "8px" }}>Testimonials</h1>
              <p style={{ fontSize: "14px", color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "32px" }}>Manage client success stories shown on the homepage and results page.</p>

              {content.testimonials.map((t, i) => (
                <div key={i} style={cardStyle}>
                  {editingTestimonial === i ? (
                    <div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                        <div>
                          <label style={labelStyle}>Client Name</label>
                          <input type="text" value={t.name} onChange={(e) => { const u = [...content.testimonials]; u[i] = { ...t, name: e.target.value }; setContent({ ...content, testimonials: u }); }} style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Duration</label>
                          <input type="text" value={t.duration} onChange={(e) => { const u = [...content.testimonials]; u[i] = { ...t, duration: e.target.value }; setContent({ ...content, testimonials: u }); }} style={inputStyle} />
                        </div>
                      </div>
                      <div style={{ marginBottom: "12px" }}>
                        <label style={labelStyle}>Result (e.g. "Lost 14kg in 14 weeks")</label>
                        <input type="text" value={t.result} onChange={(e) => { const u = [...content.testimonials]; u[i] = { ...t, result: e.target.value }; setContent({ ...content, testimonials: u }); }} style={inputStyle} />
                      </div>
                      <div style={{ marginBottom: "16px" }}>
                        <label style={labelStyle}>Quote</label>
                        <textarea rows={3} value={t.quote} onChange={(e) => { const u = [...content.testimonials]; u[i] = { ...t, quote: e.target.value }; setContent({ ...content, testimonials: u }); }} style={{ ...inputStyle, resize: "vertical" }} />
                      </div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => { saveContent(content); setEditingTestimonial(null); }} style={{ padding: "8px 20px", background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "8px", color: "#D4AF37", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Save</button>
                        <button onClick={() => setEditingTestimonial(null)} style={{ padding: "8px 20px", background: "none", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "#6B7280", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer" }}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 700, color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t.name}</p>
                        <p style={{ fontSize: "13px", color: "#D4AF37", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "6px" }}>{t.result} · {t.duration}</p>
                        <p style={{ fontSize: "13px", color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.6, fontStyle: "italic" }}>&ldquo;{t.quote}&rdquo;</p>
                      </div>
                      <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                        <button onClick={() => setEditingTestimonial(i)} style={{ padding: "6px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", color: "#9AA4B2", fontSize: "12px", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer" }}>Edit</button>
                        <button onClick={() => { const u = content.testimonials.filter((_, idx) => idx !== i); saveContent({ ...content, testimonials: u }); }} style={{ padding: "6px 14px", background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: "6px", color: "#EF4444", fontSize: "12px", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer" }}>Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={() => {
                  const u = [...content.testimonials, { name: "New Client", result: "Result", duration: "12 weeks", quote: "Quote here" }];
                  setContent({ ...content, testimonials: u });
                  setEditingTestimonial(u.length - 1);
                }}
                style={{ padding: "12px 24px", background: "rgba(212,175,55,0.08)", border: "1px dashed rgba(212,175,55,0.3)", borderRadius: "10px", color: "#D4AF37", fontSize: "14px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, cursor: "pointer", width: "100%" }}
              >
                + Add testimonial
              </button>
            </div>
          )}

          {/* Pricing */}
          {activeSection === "pricing" && (
            <div>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "32px", color: "#FFFFFF", marginBottom: "8px" }}>Pricing</h1>
              <p style={{ fontSize: "14px", color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "32px" }}>Update package names, prices, and features.</p>

              {content.pricing.map((tier, i) => (
                <div key={i} style={cardStyle}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                    <div>
                      <label style={labelStyle}>Package Name</label>
                      <input
                        type="text"
                        value={tier.name}
                        onChange={(e) => {
                          const u = [...content.pricing];
                          u[i] = { ...tier, name: e.target.value };
                          setContent({ ...content, pricing: u });
                        }}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Price</label>
                      <input
                        type="text"
                        value={tier.price}
                        onChange={(e) => {
                          const u = [...content.pricing];
                          u[i] = { ...tier, price: e.target.value };
                          setContent({ ...content, pricing: u });
                        }}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                  <div style={{ marginBottom: "12px" }}>
                    <label style={labelStyle}>Features (one per line)</label>
                    <textarea
                      rows={5}
                      value={tier.features.join("\n")}
                      onChange={(e) => {
                        const u = [...content.pricing];
                        u[i] = { ...tier, features: e.target.value.split("\n").filter(Boolean) };
                        setContent({ ...content, pricing: u });
                      }}
                      style={{ ...inputStyle, resize: "vertical" }}
                    />
                  </div>
                  <button onClick={() => saveContent(content)} style={{ padding: "8px 20px", background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "8px", color: "#D4AF37", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>
                    Save {tier.name}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Contact Info */}
          {activeSection === "contact" && (
            <div>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "32px", color: "#FFFFFF", marginBottom: "8px" }}>Contact Info</h1>
              <p style={{ fontSize: "14px", color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "32px" }}>Update your public contact details shown across the site.</p>

              <div style={cardStyle}>
                {[
                  { label: "Email Address", key: "contactEmail" as keyof SiteContent, placeholder: "Admin@gvnfit.online" },
                  { label: "Instagram Handle", key: "instagramHandle" as keyof SiteContent, placeholder: "@fitguhay" },
                  { label: "Response Time", key: "responseTime" as keyof SiteContent, placeholder: "24 hours" },
                ].map(({ label, key, placeholder }) => (
                  <div key={key} style={{ marginBottom: "20px" }}>
                    <label style={labelStyle}>{label}</label>
                    <input
                      type="text"
                      value={content[key] as string}
                      placeholder={placeholder}
                      onChange={(e) => setContent({ ...content, [key]: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                ))}
                <button onClick={() => saveContent(content)} style={{ padding: "12px 28px", background: "linear-gradient(135deg,#D4AF37,#B8962E)", border: "none", borderRadius: "8px", color: "#0C1520", fontSize: "14px", fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer" }}>
                  Save Contact Info
                </button>
              </div>
            </div>
          )}

          {/* Settings */}
          {activeSection === "settings" && (
            <div>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "32px", color: "#FFFFFF", marginBottom: "8px" }}>Settings</h1>
              <p style={{ fontSize: "14px", color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "32px" }}>Admin account and data management.</p>

              <div style={cardStyle}>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "18px", color: "#FFFFFF", marginBottom: "16px" }}>Data Management</h3>
                <p style={{ fontSize: "14px", color: "#9AA4B2", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "16px", lineHeight: 1.6 }}>
                  Content changes are saved to your browser&apos;s local storage. Use &quot;Export JSON&quot; in the sidebar to download your content, then send it to your developer to apply permanently to the site code.
                </p>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button onClick={exportJSON} style={{ padding: "10px 20px", background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "8px", color: "#D4AF37", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>
                    Export Content JSON
                  </button>
                  <button onClick={resetToDefaults} style={{ padding: "10px 20px", background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", color: "#EF4444", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer" }}>
                    Reset to Defaults
                  </button>
                </div>
              </div>

              <div style={cardStyle}>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "18px", color: "#FFFFFF", marginBottom: "12px" }}>Password</h3>
                <p style={{ fontSize: "14px", color: "#9AA4B2", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "8px" }}>
                  Current password is set in the site code. Contact your developer to change it.
                </p>
                <p style={{ fontSize: "12px", color: "#4E5A6A", fontFamily: "'Plus Jakarta Sans', sans-serif", fontStyle: "italic" }}>
                  File: app/admin/page.tsx · const ADMIN_PASSWORD = &quot;...&quot;
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <style>{`
        * { box-sizing: border-box; }
        textarea, input { box-sizing: border-box; }
        textarea:focus, input:focus { border-color: rgba(212,175,55,0.4) !important; outline: none; }
        ::placeholder { color: #3D4550; }
      `}</style>
    </div>
  );
}
