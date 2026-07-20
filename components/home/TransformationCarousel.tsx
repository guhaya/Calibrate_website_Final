"use client";

import { useState } from "react";

const transformations = [
  { name: "Marcus T.", role: "Software Engineer, 34", before: "97kg / 28% BF", after: "83kg / 16% BF", loss: "−14kg", weeks: 14 },
  { name: "Priya S.", role: "Marketing Director, 29", before: "65kg / 30% BF", after: "62kg / 22% BF", loss: "−3kg, +lean", weeks: 16 },
  { name: "James O.", role: "Teacher, 27", before: "76kg / 22% BF", after: "79kg / 13% BF", loss: "+3kg, −9% BF", weeks: 20 },
  { name: "Ritika M.", role: "Consultant, 31", before: "71kg / 27% BF", after: "60kg / 19% BF", loss: "−11kg", weeks: 12 },
];

export default function TransformationCarousel() {
  const [active, setActive] = useState(0);
  const t = transformations[active];

  const go = (dir: number) => {
    setActive((a) => (a + dir + transformations.length) % transformations.length);
  };

  return (
    <section style={{ padding: "120px 24px", position: "relative", overflow: "hidden" }} className="grain-overlay">
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "700px", height: "350px", background: "radial-gradient(ellipse, rgba(255,222,2,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div className="tag" style={{ marginBottom: "20px" }}>Verified Results</div>
          <h2 style={{ fontSize: "clamp(32px, 4.5vw, 58px)", color: "#FFFFFF", marginBottom: "16px" }}>
            The numbers <span className="gold-text">don't lie</span>
          </h2>
        </div>

        <div
          key={active}
          style={{
            background: "rgba(17,17,20,0.85)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "28px",
            padding: "48px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "40px",
            alignItems: "center",
            animation: "scale-up 0.3s ease",
          }}
          className="transform-card"
        >
          <div>
            <p style={{ fontSize: "13px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {t.role}
            </p>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "36px", color: "#FFFFFF", marginBottom: "24px", textTransform: "uppercase" }}>
              {t.name}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }} className="transform-stats">
              <div>
                <p style={{ fontSize: "10px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Before</p>
                <p style={{ fontSize: "18px", fontWeight: 800, color: "#DE3033", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t.before}</p>
              </div>
              <div>
                <p style={{ fontSize: "10px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>After</p>
                <p style={{ fontSize: "18px", fontWeight: 800, color: "#22C55E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t.after}</p>
              </div>
              <div>
                <p style={{ fontSize: "10px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Duration</p>
                <p style={{ fontSize: "18px", fontWeight: 800, color: "#FFDE02", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t.weeks} wks</p>
              </div>
            </div>
          </div>

          <div style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(56px, 7vw, 88px)", color: "#FFDE02",
            lineHeight: 1, textAlign: "center", padding: "0 12px",
          }}>
            {t.loss}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginTop: "32px" }}>
          <button className="carousel-arrow" onClick={() => go(-1)} aria-label="Previous transformation">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3.5L5 8l5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div style={{ display: "flex", gap: "8px" }}>
            {transformations.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot ${i === active ? "active" : ""}`}
                style={{ width: i === active ? "22px" : "7px", height: "7px" }}
                onClick={() => setActive(i)}
                aria-label={`Go to transformation ${i + 1}`}
              />
            ))}
          </div>
          <button className="carousel-arrow" onClick={() => go(1)} aria-label="Next transformation">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3.5L11 8l-5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .transform-card { grid-template-columns: 1fr !important; text-align: center; }
          .transform-stats { grid-template-columns: 1fr 1fr 1fr !important; text-align: center; }
        }
      `}</style>
    </section>
  );
}
