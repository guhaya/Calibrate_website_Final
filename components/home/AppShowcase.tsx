"use client";

import { useState } from "react";

// ─── Drop your real app screenshots in /public/app-screens/ ───────────────
// Filename convention: dashboard.png, workouts.png, nutrition.png,
//                      progress.png, messaging.png
// Leave null to use the built-in mock UI for that screen.
const APP_SCREENSHOTS: Record<string, string | null> = {
  dashboard: "/app-screens/dashboard.jpg",
  workouts:  "/app-screens/workouts.png",
  nutrition: "/app-screens/nutrition.jpg",
  progress:  "/app-screens/progress.jpg",
  messaging: null, // needs a full portrait screenshot — current file is a landscape crop
};

const screens = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <rect x="9" y="2" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <rect x="2" y="9" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <rect x="9" y="9" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
    description: "Your complete coaching overview — weight trend, macros, upcoming sessions, and coach messages in one place.",
    content: (
      <div style={{ padding: "20px 18px", height: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* Greeting */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "10px", color: "#8A96A8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Welcome back</p>
            <p style={{ fontSize: "15px", fontWeight: 800, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Alex Mitchell</p>
          </div>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg,#D4AF37,#B8962E)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 800, color: "#0C1520", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>A</div>
        </div>
        {/* Stat row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
          {[
            { label: "Week", value: "8/12" },
            { label: "Lost", value: "−9.8kg" },
            { label: "BF%", value: "16.8%" },
          ].map(s => (
            <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: "10px", padding: "8px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ fontSize: "13px", fontWeight: 800, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: "9px", color: "#8A96A8", fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: "3px" }}>{s.label}</p>
            </div>
          ))}
        </div>
        {/* Chart placeholder */}
        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "10px", border: "1px solid rgba(255,255,255,0.06)", flex: 1 }}>
          <p style={{ fontSize: "9px", color: "#8A96A8", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Weight Trend</p>
          <svg viewBox="0 0 200 60" style={{ width: "100%" }}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,50 C20,45 40,40 60,32 C80,24 100,20 120,16 C140,12 160,10 200,8" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
            <path d="M0,50 C20,45 40,40 60,32 C80,24 100,20 120,16 C140,12 160,10 200,8 L200,60 L0,60 Z" fill="url(#g1)" />
          </svg>
        </div>
        {/* Today card */}
        <div style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.18)", borderRadius: "10px", padding: "10px 12px", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "rgba(212,175,55,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#D4AF37" }}>
            <svg width="11" height="11" viewBox="0 0 20 20" fill="none"><path d="M11.5 2L4 11h7l-1 7 9-10h-7l1.5-6z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div>
            <p style={{ fontSize: "9px", color: "#D4AF37", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>TODAY</p>
            <p style={{ fontSize: "11px", color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>Upper Strength A · 45 min</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "workouts",
    label: "Workouts",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h2M11 8h2M5 8V5.5M11 8V5.5M5 5.5h6M6 5.5V4h4v1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="3" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="13" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    description: "Every session planned in advance with sets, reps, rest periods, and progression targets. Video guidance on every exercise.",
    content: (
      <div style={{ padding: "16px 18px", height: "100%", overflowY: "auto" }}>
        <p style={{ fontSize: "11px", fontWeight: 800, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "4px" }}>Upper Strength A</p>
        <p style={{ fontSize: "9px", color: "#8A96A8", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "12px" }}>Today · 45–55 min</p>
        {[
          { name: "Bench Press", sets: "4×6", load: "80kg", done: true },
          { name: "Incline DB Press", sets: "3×10", load: "28kg", done: true },
          { name: "Cable Fly", sets: "3×12", load: "15kg", done: false },
          { name: "Shoulder Press", sets: "3×10", load: "20kg", done: false },
          { name: "Lateral Raises", sets: "4×15", load: "8kg", done: false },
          { name: "Tricep Pushdown", sets: "3×15", load: "25kg", done: false },
        ].map((ex, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "8px 10px", borderRadius: "8px", marginBottom: "4px",
            background: ex.done ? "rgba(34,197,94,0.07)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${ex.done ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.06)"}`,
          }}>
            <div style={{
              width: "16px", height: "16px", borderRadius: "50%",
              background: ex.done ? "#22C55E" : "rgba(255,255,255,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
            }}>
              {ex.done && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" /></svg>}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "11px", fontWeight: 600, color: ex.done ? "#8A96A8" : "white", fontFamily: "'Plus Jakarta Sans', sans-serif", textDecoration: ex.done ? "line-through" : "none" }}>{ex.name}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "10px", color: "#D4AF37", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>{ex.sets}</p>
              <p style={{ fontSize: "9px", color: "#8A96A8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{ex.load}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "nutrition",
    label: "Nutrition",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2C8 2 5 5.5 5 8.5a3 3 0 006 0C11 5.5 8 2 8 2z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M8 8.5V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    description: "Custom macro targets that flex around your lifestyle. Log meals, track compliance, and hit your physique goals without giving up the foods you love.",
    content: (
      <div style={{ padding: "16px 18px", height: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
        <p style={{ fontSize: "11px", fontWeight: 800, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Today's Nutrition</p>
        {/* Calorie ring */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", background: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
            <circle cx="32" cy="32" r="26" fill="none" stroke="#D4AF37" strokeWidth="6"
              strokeDasharray={163} strokeDashoffset={163 * 0.28}
              strokeLinecap="round" transform="rotate(-90 32 32)" />
            <text x="32" y="36" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">72%</text>
          </svg>
          <div>
            <p style={{ fontSize: "18px", fontWeight: 800, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1 }}>1,620</p>
            <p style={{ fontSize: "9px", color: "#8A96A8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>of 2,250 kcal</p>
            <p style={{ fontSize: "9px", color: "#22C55E", fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: "3px" }}>630 remaining</p>
          </div>
        </div>
        {/* Macros */}
        {[
          { name: "Protein", eaten: 156, target: 200, color: "#D4AF37", unit: "g" },
          { name: "Carbohydrates", eaten: 182, target: 240, color: "#3B82F6", unit: "g" },
          { name: "Fats", eaten: 58, target: 72, color: "#A855F7", unit: "g" },
        ].map(m => (
          <div key={m.name}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ fontSize: "10px", color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>{m.name}</span>
              <span style={{ fontSize: "10px", color: "#8A96A8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{m.eaten}/{m.target}{m.unit}</span>
            </div>
            <div className="progress-bar">
              <div style={{ height: "100%", width: `${(m.eaten / m.target) * 100}%`, background: m.color, borderRadius: "999px", transition: "width 1s ease" }} />
            </div>
          </div>
        ))}
        {/* Recent meals */}
        <p style={{ fontSize: "9px", color: "#8A96A8", fontFamily: "'Plus Jakarta Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "4px" }}>Today's meals</p>
        {["Breakfast · 487 kcal", "Lunch · 634 kcal", "Snack · 210 kcal"].map((meal, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <span style={{ fontSize: "10px", color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{meal.split("·")[0]}</span>
            <span style={{ fontSize: "10px", color: "#8A96A8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>·{meal.split("·")[1]}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "progress",
    label: "Progress",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <polyline points="2,12 6,7 9,9.5 14,3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="14" cy="3" r="1.5" fill="currentColor" />
      </svg>
    ),
    description: "Every metric tracked and charted over time. Weight, body fat, strength records, and weekly check-in scores — all visible, all measurable.",
    content: (
      <div style={{ padding: "16px 18px", height: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
        <p style={{ fontSize: "11px", fontWeight: 800, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>12-Week Progress</p>
        {[
          { label: "Body Weight", start: "96.0 kg", current: "84.1 kg", delta: "−11.9 kg", pct: 79, color: "#D4AF37" },
          { label: "Body Fat %", start: "26%", current: "16.8%", delta: "−9.2%", pct: 85, color: "#22C55E" },
          { label: "Bench Press", start: "80 kg", current: "110 kg", delta: "+30 kg", pct: 92, color: "#3B82F6" },
          { label: "Squat", start: "100 kg", current: "145 kg", delta: "+45 kg", pct: 88, color: "#A855F7" },
        ].map(item => (
          <div key={item.label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "10px", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "10px", fontWeight: 600, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.label}</span>
              <span style={{ fontSize: "10px", color: item.color, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>{item.delta}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
              <span style={{ fontSize: "9px", color: "#8A96A8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Start: {item.start}</span>
              <span style={{ fontSize: "9px", color: "#8A96A8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Now: {item.current}</span>
            </div>
            <div className="progress-bar">
              <div style={{ height: "100%", width: `${item.pct}%`, background: item.color, borderRadius: "999px" }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "messaging",
    label: "Coaching",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M14 9.5a1.5 1.5 0 01-1.5 1.5H5l-3 3V3.5A1.5 1.5 0 013.5 2h9A1.5 1.5 0 0114 3.5v6z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    description: "Direct messaging with your coach every day. Questions, check-ins, struggles, or wins — your coach is always reachable inside the app.",
    content: (
      <div style={{ padding: "16px 18px", height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "linear-gradient(135deg,#D4AF37,#B8962E)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, color: "#0C1520" }}>G</div>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Coach Guha</p>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#22C55E" }} />
              <span style={{ fontSize: "9px", color: "#22C55E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Online</span>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", overflowY: "auto" }}>
          {[
            { from: "coach", text: "Alex, great check-in this week! Body weight dropped another 1.1kg and your bench went up 5kg. On track for the 12-week target.", time: "Mon 9:04am" },
            { from: "me", text: "Feeling much better about the nutrition side now. The macro cycling you suggested made a big difference!", time: "Mon 10:15am" },
            { from: "coach", text: "Exactly the right approach. Let's push intensity to RPE 8 on the main compounds this week. Your body is ready for it.", time: "Mon 11:30am" },
          ].map((msg, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: msg.from === "me" ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "80%", padding: "8px 10px", borderRadius: "10px",
                background: msg.from === "me" ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.06)",
                border: `1px solid ${msg.from === "me" ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.07)"}`,
              }}>
                <p style={{ fontSize: "10px", color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.5 }}>{msg.text}</p>
              </div>
              <p style={{ fontSize: "8px", color: "#4E5A6A", fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: "3px" }}>{msg.time}</p>
            </div>
          ))}
        </div>
        {/* Input bar */}
        <div style={{ marginTop: "10px", display: "flex", gap: "6px", alignItems: "center" }}>
          <div style={{ flex: 1, padding: "8px 10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}>
            <p style={{ fontSize: "10px", color: "#4E5A6A", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Message your coach…</p>
          </div>
          <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(212,175,55,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 6 2 2v3.5l5.5.5L2 6.5V10z" fill="#D4AF37" />
            </svg>
          </div>
        </div>
      </div>
    ),
  },
];

export default function AppShowcase() {
  const [active, setActive] = useState("dashboard");
  const current = screens.find(s => s.id === active) || screens[0];

  return (
    <section style={{ padding: "120px 0", background: "rgba(10,16,24,0.7)", position: "relative", overflow: "hidden" }}>
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none", opacity: 0.6 }} />
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "600px", height: "300px", background: "radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>
            The Platform
          </div>
          <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", color: "white", marginBottom: "16px", letterSpacing: "-0.02em" }}>
            The complete coaching{" "}
            <span className="gold-text">experience</span>
          </h2>
          <p style={{ fontSize: "17px", color: "#8A96A8", maxWidth: "520px", margin: "0 auto", lineHeight: 1.65, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Everything you need to train, eat, and progress — in one beautifully designed app with your coach accessible at every step.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }} className="showcase-grid">
          {/* Left: description + tabs */}
          <div>
            {/* Tab buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {screens.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                    padding: "18px 20px",
                    borderRadius: "14px",
                    border: `1px solid ${active === s.id ? "rgba(212,175,55,0.25)" : "transparent"}`,
                    background: active === s.id ? "rgba(212,175,55,0.07)" : "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0,
                    background: active === s.id ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${active === s.id ? "rgba(212,175,55,0.25)" : "rgba(255,255,255,0.08)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: active === s.id ? "#D4AF37" : "#8A96A8",
                    transition: "all 0.2s ease",
                  }}>
                    {s.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: "15px", fontWeight: 700, color: active === s.id ? "white" : "#8A96A8", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "4px", transition: "color 0.2s" }}>
                      {s.label}
                    </p>
                    {active === s.id && (
                      <p style={{ fontSize: "13px", color: "#8A96A8", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.55 }}>
                        {s.description}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: phone mockup */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative" }}>
              {/* Glow */}
              <div style={{ position: "absolute", inset: "-20px", background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

              <div className="phone-frame" style={{ width: "272px", height: "540px", position: "relative", zIndex: 1 }}>
                <div className="phone-screen" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  {/* Status bar */}
                  <div style={{ height: "28px", padding: "6px 16px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "9px", fontWeight: 700, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>9:41</span>
                    <div className="phone-notch" style={{ width: "80px", height: "20px", margin: 0, borderRadius: "0 0 12px 12px" }}>
                      <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#1A2840" }} />
                      <div style={{ width: "36px", height: "5px", borderRadius: "3px", background: "#1A2840" }} />
                    </div>
                    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="white" opacity="0.7">
                        <rect x="1" y="3" width="2" height="6" rx="0.5" />
                        <rect x="4.5" y="1.5" width="2" height="7.5" rx="0.5" />
                        <rect x="8" y="0" width="2" height="9" rx="0.5" />
                      </svg>
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                        <rect x="0.5" y="0.5" width="11" height="9" rx="1.5" stroke="white" strokeOpacity="0.5" strokeWidth="1" />
                        <rect x="2" y="2" width="7" height="6" rx="0.5" fill="white" />
                        <path d="M12.5 3.5v3a1.5 1.5 0 000-3z" fill="white" opacity="0.5" />
                      </svg>
                    </div>
                  </div>

                  {/* App header */}
                  <div className="app-bar">
                    <span style={{ fontSize: "13px", fontWeight: 800, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {current.label === "Coaching" ? "Messages" : current.label}
                    </span>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22C55E" }} />
                  </div>

                  {/* Dynamic content — real screenshot or built-in mock */}
                  <div style={{ flex: 1, overflow: "hidden", transition: "opacity 0.3s ease", position: "relative" }}>
                    {APP_SCREENSHOTS[current.id] ? (
                      <img
                        src={APP_SCREENSHOTS[current.id]!}
                        alt={`${current.label} screen`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "top",
                          display: "block",
                        }}
                      />
                    ) : (
                      current.content
                    )}
                  </div>

                  {/* Bottom nav */}
                  <div style={{ height: "52px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-around", background: "rgba(10,18,28,0.95)" }}>
                    {screens.map(s => (
                      <button key={s.id} onClick={() => setActive(s.id)}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", background: "none", border: "none", cursor: "pointer", padding: "0 6px" }}>
                        <span style={{ color: active === s.id ? "#D4AF37" : "#4E5A6A", transition: "color 0.2s" }}>
                          {s.icon}
                        </span>
                        <span style={{ fontSize: "7px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, color: active === s.id ? "#D4AF37" : "#4E5A6A" }}>
                          {s.label === "Coaching" ? "Chat" : s.label.slice(0, 5)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sample-data disclaimer */}
              <p style={{
                textAlign: "center",
                fontSize: "11px",
                color: "#4E5A6A",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                marginTop: "14px",
                letterSpacing: "0.02em",
              }}>
                Screens shown with sample client data
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .showcase-grid { grid-template-columns: 1fr !important; }
          .showcase-grid > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}
