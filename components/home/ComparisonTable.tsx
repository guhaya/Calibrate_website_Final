"use client";

const comparisons = [
  {
    aspect: "Training Program",
    alone: "Generic YouTube program or gym template",
    calibrate: "Written specifically for your body and goals",
  },
  {
    aspect: "Nutrition",
    alone: "Calorie counting apps with no context",
    calibrate: "Custom macros built around your lifestyle",
  },
  {
    aspect: "Accountability",
    alone: "Rely on willpower alone — often fails",
    calibrate: "Weekly check-ins and direct coach access",
  },
  {
    aspect: "When You Get Stuck",
    alone: "Google it and hope for the best",
    calibrate: "Coach adjusts plan immediately",
  },
  {
    aspect: "Plateaus",
    alone: "Months of spinning wheels",
    calibrate: "Identified and fixed within a week",
  },
  {
    aspect: "Confidence",
    alone: "Constant self-doubt about what's right",
    calibrate: "Clear direction from someone who knows your body",
  },
];

export default function ComparisonTable() {
  return (
    <section
      style={{
        padding: "120px 24px",
        background: "rgba(12,18,26,0.5)",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="tag" style={{ marginBottom: "20px" }}>The Difference</div>
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              color: "#FFFFFF",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            Going it alone{" "}
            <span className="gold-text">vs having a coach</span>
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "#9AA4B2",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.65,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Most people already know what to do. The issue is having the right plan, the right support, and someone keeping you accountable.
          </p>
        </div>

        {/* Table */}
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              background: "rgba(22,33,45,0.9)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "0 24px",
            }}
            className="compare-row"
          >
            <div style={{ padding: "16px 0" }} />
            <div style={{ padding: "16px 0", textAlign: "center" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#9AA4B2", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Going Alone
              </span>
            </div>
            <div style={{ padding: "16px 0", textAlign: "center" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#D4AF37", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                CALIBRATE Coaching
              </span>
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((row, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                borderBottom: i < comparisons.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                background: i % 2 === 0 ? "rgba(14,23,32,0.7)" : "rgba(18,27,38,0.7)",
                padding: "0 24px",
              }}
              className="compare-row"
            >
              <div style={{ padding: "20px 0", paddingRight: "16px" }}>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {row.aspect}
                </span>
              </div>
              <div style={{ padding: "20px 16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="7" cy="7" r="6" fill="rgba(239,68,68,0.1)" />
                  <path d="M4.5 4.5L9.5 9.5M9.5 4.5L4.5 9.5" stroke="#EF4444" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                <span style={{ fontSize: "14px", color: "#9AA4B2", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.5 }}>
                  {row.alone}
                </span>
              </div>
              <div style={{ padding: "20px 0 20px 16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="7" cy="7" r="6" fill="rgba(212,175,55,0.1)" />
                  <path d="M4 7l2 2 4-4" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: "14px", color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.5, fontWeight: 500 }}>
                  {row.calibrate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .compare-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
