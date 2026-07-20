"use client";

import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Free Consultation",
    duration: "30 minutes",
    description: "A no-obligation call to understand where you are, what you've tried, and what you actually want to achieve.",
  },
  {
    number: "02",
    title: "Personalised Plan",
    duration: "Within 5 days",
    description: "Your training programme and nutrition targets are built from scratch, no templates, no guesswork.",
  },
  {
    number: "03",
    title: "Weekly Accountability",
    duration: "Ongoing",
    description: "Every week you check in. Every week your coach adjusts. Consistency becomes a system, not a personality trait.",
  },
];

export default function ThreeStepKickoff() {
  return (
    <section className="home-process-section" style={{ padding: "120px 24px", position: "relative" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="tag" style={{ marginBottom: "20px" }}>Getting Started</div>
          <h2 style={{ fontSize: "clamp(32px, 4.5vw, 58px)", color: "#FFFFFF", marginBottom: "16px" }}>
            Three steps to <span className="gold-text">your kickoff</span>
          </h2>
          <p style={{ fontSize: "17px", color: "#B7B9C3", maxWidth: "480px", margin: "0 auto", lineHeight: 1.65, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            From first conversation to your first week of training, here's exactly what happens.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px", position: "relative" }} className="kickoff-grid">
          {/* Connector line */}
          <div className="kickoff-connector" style={{
            position: "absolute", top: "34px", left: "16.5%", right: "16.5%", height: "1px",
            background: "repeating-linear-gradient(90deg, rgba(255,222,2,0.35) 0 8px, transparent 8px 16px)",
            zIndex: 0,
          }} />
          {steps.map((s) => (
            <div key={s.number} style={{ position: "relative", zIndex: 1, padding: "0 20px", textAlign: "center" }}>
              <div style={{
                width: "68px", height: "68px", borderRadius: "50%", margin: "0 auto 24px",
                background: "#07070A", border: "1.5px solid rgba(255,222,2,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)", fontSize: "24px", color: "#FFDE02",
              }}>
                {s.number}
              </div>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#FFDE02", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>
                {s.duration}
              </p>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "26px", color: "#FFFFFF", marginBottom: "12px", textTransform: "uppercase" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#B7B9C3", lineHeight: 1.65, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {s.description}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "56px" }}>
          <Link href="/book" className="btn-primary btn-primary-lg">
            Book Your Free Consultation
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .kickoff-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .kickoff-connector { display: none !important; }
        }
      `}</style>
    </section>
  );
}
