"use client";

import Link from "next/link";

const paths = [
  {
    tag: "Most Popular",
    title: "Fat Loss",
    description: "Drop body fat while holding onto every bit of muscle. Built for people who want to look leaner without the crash-diet spiral.",
    points: ["Custom calorie & macro targets", "Strength-preserving training split", "Weekly check-in adjustments"],
    color: "#FFDE02",
  },
  {
    tag: "Build",
    title: "Muscle Gain",
    description: "A structured hypertrophy programme with progressive overload tracked every session, no more guessing if you're actually growing.",
    points: ["Progressive overload tracking", "Surplus calibrated to your metabolism", "Video form checks on request"],
    color: "#3B82F6",
  },
  {
    tag: "Recomp",
    title: "Body Recomposition",
    description: "Lose fat and build muscle at the same time. The hardest goal to programme correctly, it's what CALIBRATE was built for.",
    points: ["Nutrient timing around training", "Bi-weekly composition scans", "Slowest but most rewarding path"],
    color: "#22C55E",
  },
];

export default function AudienceSplit() {
  return (
    <section style={{ padding: "120px 24px" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="tag" style={{ marginBottom: "20px" }}>Pick Your Path</div>
          <h2 style={{ fontSize: "clamp(32px, 4.5vw, 58px)", color: "#FFFFFF", marginBottom: "16px" }}>
            Built for your <span className="gold-text">specific goal</span>
          </h2>
          <p style={{ fontSize: "17px", color: "#B7B9C3", maxWidth: "520px", margin: "0 auto", lineHeight: 1.65, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            No generic plans. Your programme is written for the exact outcome you're chasing.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="audience-grid">
          {paths.map((p) => (
            <div
              key={p.title}
              className="card-hover"
              style={{
                background: "rgba(17,17,20,0.85)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "24px",
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  padding: "4px 12px",
                  borderRadius: "999px",
                  background: `${p.color}1A`,
                  border: `1px solid ${p.color}40`,
                  fontSize: "10px",
                  fontWeight: 800,
                  color: p.color,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  marginBottom: "20px",
                }}
              >
                {p.tag}
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "34px", color: "#FFFFFF", marginBottom: "12px", textTransform: "uppercase" }}>
                {p.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#B7B9C3", lineHeight: 1.65, marginBottom: "24px", fontFamily: "'Plus Jakarta Sans', sans-serif", flex: 1 }}>
                {p.description}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                {p.points.map((pt) => (
                  <div key={pt} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
                      <path d="M2.5 7L5.5 10L11.5 4" stroke={p.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: "13px", color: "#F5F3EE", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.5 }}>{pt}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/apply"
                className="btn-secondary"
                style={{ justifyContent: "center", width: "100%" }}
              >
                Start {p.title}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .audience-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
