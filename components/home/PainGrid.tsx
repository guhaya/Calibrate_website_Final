"use client";

const pains = [
  {
    problem: "You've started over more times than you can count",
    solution: "A protocol built to survive real life — travel, deadlines, bad weeks included.",
  },
  {
    problem: "Generic programmes don't account for your schedule",
    solution: "Your plan is written around your calendar, not the other way around.",
  },
  {
    problem: "You don't actually know if what you're doing is working",
    solution: "Weekly data review means you always know exactly where you stand.",
  },
  {
    problem: "Nobody adjusts your plan when something changes",
    solution: "Your coach adapts training and nutrition within 4 hours, every time.",
  },
];

export default function PainGrid() {
  return (
    <section style={{ padding: "120px 24px", background: "rgba(9,9,11,0.5)" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="tag" style={{ marginBottom: "20px" }}>Sound Familiar?</div>
          <h2 style={{ fontSize: "clamp(32px, 4.5vw, 58px)", color: "#FFFFFF", marginBottom: "16px" }}>
            You've tried everything.{" "}
            <span className="gold-text">Nothing stuck.</span>
          </h2>
          <p style={{ fontSize: "17px", color: "#B7B9C3", maxWidth: "520px", margin: "0 auto", lineHeight: 1.65, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            It's not a willpower problem. It's a system problem — and it's fixable.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }} className="pain-grid">
          {pains.map((p) => (
            <div key={p.problem} className="pain-card">
              <div style={{ padding: "28px 28px 24px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0,
                    background: "rgba(222,48,51,0.14)", border: "1px solid rgba(222,48,51,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center", color: "#DE3033",
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" opacity="0.5" />
                    </svg>
                  </div>
                  <p style={{ fontSize: "17px", fontWeight: 700, color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.4, paddingTop: "6px" }}>
                    {p.problem}
                  </p>
                </div>
              </div>
              <div className="pain-card-divider" />
              <div style={{ padding: "22px 28px 28px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <span
                    style={{
                      flexShrink: 0,
                      display: "inline-flex", alignItems: "center", gap: "5px",
                      padding: "4px 10px", borderRadius: "999px",
                      background: "rgba(255,222,2,0.12)", border: "1px solid rgba(255,222,2,0.3)",
                      fontSize: "10px", fontWeight: 800, color: "#FFDE02",
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    We fix this
                  </span>
                  <p style={{ fontSize: "14px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.6 }}>
                    {p.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pain-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
