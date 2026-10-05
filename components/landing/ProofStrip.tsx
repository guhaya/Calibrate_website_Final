import { CountUp } from "./ui";

const stats = [
  { value: "45", label: "Clients coached" },
  { value: "10", label: "Countries" },
  { value: "5", label: "Continents" },
  { value: "4.9/5", label: "Average client rating" },
];

export default function ProofStrip() {
  return (
    <section className="ps" aria-label="CALIBRATE at a glance">
      <div className="wrap ps-row">
        {stats.map((s) => (
          <div key={s.label} className="ps-item">
            <CountUp value={s.value} className="ps-val" />
            <span className="ps-lab">{s.label}</span>
          </div>
        ))}
      </div>
      <style>{`
        .ps { padding: 40px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); background: #08080A; }
        .ps-row { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .ps-item { display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; padding: 0 16px; }
        .ps-item + .ps-item { border-left: 1px solid var(--line); }
        .ps-val { font-family: var(--font-display); font-size: clamp(36px, 3.6vw, 52px); line-height: 1; color: #fff; }
        .ps-lab { font-size: 13px; font-weight: 600; color: var(--text-muted); }
        @media (max-width: 640px) {
          .ps-row { grid-template-columns: 1fr 1fr; row-gap: 28px; }
          .ps-item:nth-child(3) { border-left: none; }
        }
      `}</style>
    </section>
  );
}
