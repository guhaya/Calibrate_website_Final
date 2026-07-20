"use client";

import { useState, type ReactNode } from "react";

const days = [
  { d: "Mon", title: "Upper Strength A", type: "Push", duration: "48 min", done: true, exercises: 6 },
  { d: "Tue", title: "Conditioning", type: "Metcon", duration: "32 min", done: true, exercises: 5 },
  { d: "Wed", title: "Lower Strength", type: "Legs", duration: "52 min", done: true, exercises: 7 },
  { d: "Thu", title: "Rest / Mobility", type: "Recovery", duration: "20 min", done: false, exercises: 4 },
  { d: "Fri", title: "Upper Strength B", type: "Pull", duration: "50 min", done: false, exercises: 6 },
  { d: "Sat", title: "Full Body", type: "Hybrid", duration: "44 min", done: false, exercises: 6 },
  { d: "Sun", title: "Active Recovery", type: "Walk", duration: "30 min", done: false, exercises: 1 },
];

const icons: Record<string, ReactNode> = {
  Push: <path d="M3 8h2M9 8h2M5 8V5.5M9 8V5.5M5 5.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />,
  Metcon: <path d="M2 8l2-3 2 5 2-6 2 4 2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  Legs: <path d="M5 2v5l-2 5M9 2v5l2 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />,
  Recovery: <path d="M8 3v5l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />,
  Pull: <path d="M4 3v10M4 3l3 3M4 3L1 6M12 3v10M12 3l-3 3M12 3l3 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />,
  Hybrid: <path d="M2 8h3l1.5-4 2 8L10 8h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  Walk: <path d="M6 3a1 1 0 100-2 1 1 0 000 2zM6 5l-1 4 2 5M6 5l3 1-1 3 3 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
};

export default function WeeklyPlanMockup() {
  const [active, setActive] = useState(0);
  const done = days.filter((d) => d.done).length;

  return (
    <section style={{ padding: "120px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "700px", height: "300px", background: "radial-gradient(ellipse, rgba(255,222,2,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div className="tag" style={{ marginBottom: "20px" }}>Your Week</div>
          <h2 style={{ fontSize: "clamp(32px, 4.5vw, 58px)", color: "#FFFFFF", marginBottom: "16px" }}>
            Every session, <span className="gold-text">already planned</span>
          </h2>
          <p style={{ fontSize: "17px", color: "#B7B9C3", maxWidth: "520px", margin: "0 auto", lineHeight: 1.65, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            No decision fatigue. Open the app, see today's session, execute.
          </p>
        </div>

        <div className="app-screen" style={{ padding: "32px" }}>
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
            <div>
              <p style={{ fontSize: "11px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Week 8 of 12</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "26px", color: "#FFFFFF", textTransform: "uppercase" }}>{done}/7 sessions complete</p>
            </div>
            <div className="segmented-control">
              {["Training", "Nutrition", "Recovery"].map((s, i) => (
                <button key={s} className={i === 0 ? "active" : ""}>{s}</button>
              ))}
            </div>
          </div>

          {/* Day selector */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px", marginBottom: "24px" }} className="day-selector">
            {days.map((d, i) => (
              <button
                key={d.d}
                onClick={() => setActive(i)}
                style={{
                  padding: "12px 6px",
                  borderRadius: "12px",
                  border: `1px solid ${i === active ? "rgba(255,222,2,0.4)" : "rgba(255,255,255,0.08)"}`,
                  background: i === active ? "rgba(255,222,2,0.10)" : "rgba(255,255,255,0.02)",
                  cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
                  transition: "all 0.2s ease",
                }}
              >
                <span style={{ fontSize: "10px", fontWeight: 700, color: i === active ? "#FFDE02" : "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  {d.d}
                </span>
                <div style={{
                  width: "20px", height: "20px", borderRadius: "50%",
                  background: d.done ? "#22C55E" : "rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {d.done && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#07070A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </div>
              </button>
            ))}
          </div>

          {/* Active day card */}
          <div style={{
            display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap",
            padding: "24px", borderRadius: "16px",
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
          }} className="active-day-card">
            <div style={{
              width: "56px", height: "56px", borderRadius: "14px", flexShrink: 0,
              background: "rgba(255,222,2,0.12)", border: "1px solid rgba(255,222,2,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#FFDE02",
            }}>
              <svg width="24" height="24" viewBox="0 0 16 16" fill="none">{icons[days[active].type]}</svg>
            </div>
            <div style={{ flex: 1, minWidth: "180px" }}>
              <p style={{ fontSize: "11px", color: "#FFDE02", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                {days[active].type}
              </p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "24px", color: "#FFFFFF", textTransform: "uppercase" }}>
                {days[active].title}
              </p>
            </div>
            <div style={{ display: "flex", gap: "24px" }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "18px", fontWeight: 800, color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{days[active].duration}</p>
                <p style={{ fontSize: "10px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif", textTransform: "uppercase" }}>Duration</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "18px", fontWeight: 800, color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{days[active].exercises}</p>
                <p style={{ fontSize: "10px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif", textTransform: "uppercase" }}>Exercises</p>
              </div>
            </div>
            <button className="btn-primary" style={{ padding: "12px 24px", fontSize: "12px" }}>
              {days[active].done ? "Review" : "Start"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .day-selector { grid-template-columns: repeat(4, 1fr) !important; }
          .active-day-card { flex-direction: column; align-items: flex-start !important; }
        }
      `}</style>
    </section>
  );
}
