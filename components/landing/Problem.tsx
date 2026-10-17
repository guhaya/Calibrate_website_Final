// Before and after, set as a plain two-column comparison. Each row pairs a
// common failure with what CALIBRATE does about it.
const rows = [
  {
    pain: "You've started over more times than you can count",
    fix: "A protocol built to survive travel, deadlines and bad weeks",
  },
  {
    pain: "Generic plans ignore your schedule",
    fix: "Training and nutrition written around your calendar",
  },
  {
    pain: "You don't know if any of it is working",
    fix: "Weekly data review, so you always know where you stand",
  },
  {
    pain: "Nobody adjusts the plan when life changes",
    fix: "Your coach adapts the plan within 4 hours, every time",
  },
  {
    pain: "Willpower alone keeps running out",
    fix: "A system that keeps working when motivation doesn't",
  },
];

export default function Problem() {
  return (
    <section className="sec pb">
      <div className="wrap pb-grid">
        <div className="pb-head">
          <h2 className="display-lg rv balance">Effort was never what you were missing.</h2>
          <p className="lead rv" style={{ ["--d" as string]: "120ms" }}>
            Smart, driven people put real effort into fitness. What usually breaks is the plan, the moment work,
            travel or family get busy. CALIBRATE is built to bend at exactly those points.
          </p>
        </div>

        <table className="pb-table rv" style={{ ["--d" as string]: "160ms" }}>
          <thead>
            <tr>
              <th scope="col">What usually happens</th>
              <th scope="col">What we do instead</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.pain}>
                <td className="pb-pain">{r.pain}</td>
                <td className="pb-fix">{r.fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .pb-grid { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 48px 80px; align-items: start; }
        .pb-head { position: sticky; top: 120px; }
        .pb-head .lead { margin-top: 22px; max-width: 46ch; }
        .pb-table { width: 100%; border-collapse: collapse; }
        .pb-table th {
          text-align: left; font-size: 13px; font-weight: 600; color: var(--text-muted);
          padding: 0 0 14px; border-bottom: 1px solid var(--border-strong);
        }
        .pb-table th + th, .pb-table td + td { padding-left: 32px; }
        .pb-table td { vertical-align: top; padding: 22px 0; border-bottom: 1px solid var(--border); font-size: 16px; line-height: 1.5; }
        .pb-pain { color: var(--text-muted); width: 46%; }
        .pb-fix { color: #fff; font-weight: 600; transition: color 0.25s var(--ease-out); }
        .pb-table tbody tr:hover .pb-fix { color: var(--accent); }
        @media (max-width: 900px) {
          .pb-grid { grid-template-columns: 1fr; }
          .pb-head { position: static; }
        }
        @media (max-width: 560px) {
          .pb-table thead { display: none; }
          .pb-table, .pb-table tbody, .pb-table tr, .pb-table td { display: block; width: auto; }
          .pb-table tr { padding: 18px 0; border-bottom: 1px solid var(--border); }
          .pb-table td { border: 0; padding: 0; }
          .pb-table td + td { padding-left: 0; margin-top: 6px; }
          .pb-pain { font-size: 14.5px; }
          .pb-pain::before { content: "Usually: "; font-weight: 600; }
          .pb-fix::before { content: "With CALIBRATE: "; color: var(--accent); }
        }
      `}</style>
    </section>
  );
}
