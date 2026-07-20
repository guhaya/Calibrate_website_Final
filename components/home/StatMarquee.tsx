"use client";

const stats = [
  { value: "200+", label: "Clients Transformed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "9.8kg", label: "Avg Fat Lost / 12wk" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "5", label: "Max New Clients / Quarter" },
  { value: "48hr", label: "Application Review" },
  { value: "0", label: "Generic Templates" },
];

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "0 36px" }}>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "34px",
          color: "#FFDE02",
          letterSpacing: "0.01em",
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "12px",
          fontWeight: 700,
          color: "#B7B9C3",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
    </div>
  );
}

export default function StatMarquee() {
  return (
    <section
      style={{
        padding: "36px 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(17,17,20,0.6)",
      }}
    >
      <div className="marquee-viewport">
        <div className="marquee-track">
          {[...stats, ...stats].map((s, i) => (
            <StatItem key={i} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
