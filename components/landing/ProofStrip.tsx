const stats = [
  { value: "45", label: "Clients coached" },
  { value: "10", label: "Countries" },
  { value: "5", label: "Continents" },
  { value: "98%", label: "Client satisfaction" },
  { value: "9.8kg", label: "Avg fat lost in 12 weeks" },
  { value: "4.9/5", label: "Average rating" },
  { value: "48hr", label: "Application review" },
  { value: "0", label: "Generic templates" },
  { value: "DMAIC", label: "Engineering-grade protocol" },
];

function Item({ value, label }: { value: string; label: string }) {
  return (
    <div className="ps-item">
      <span className="ps-val">{value}</span>
      <span className="ps-lab">{label}</span>
      <svg width="18" height="18" viewBox="0 0 100 100" aria-hidden="true" className="ps-sep">
        <path d="M50 4 C54 38 62 46 96 50 C62 54 54 62 50 96 C46 62 38 54 4 50 C38 46 46 38 50 4Z" fill="#FFDE02" />
      </svg>
    </div>
  );
}

export default function ProofStrip() {
  return (
    <section className="ps" aria-label="CALIBRATE at a glance">
      <div className="mq" style={{ ["--mq-dur" as string]: "46s" }}>
        <div className="mq-track">
          {[...stats, ...stats].map((s, i) => (
            <Item key={i} {...s} />
          ))}
        </div>
      </div>
      <style>{`
        .ps { padding: 34px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); background: #08080A; }
        .ps-item { display: flex; align-items: center; gap: 16px; padding: 0 30px; }
        .ps-val { font-family: var(--font-display); font-size: 40px; line-height: 1; color: #fff; }
        .ps-lab { font-family: var(--font-mono); font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-muted); max-width: 130px; line-height: 1.35; }
        .ps-sep { margin-left: 30px; flex-shrink: 0; }
        @media (max-width: 600px) { .ps-val { font-size: 32px; } .ps-item { padding: 0 20px; } .ps-sep { margin-left: 20px; } }
      `}</style>
    </section>
  );
}
