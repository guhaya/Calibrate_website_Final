import Link from "next/link";
import { Arrow } from "./ui";

const steps = [
  {
    when: "30 minutes",
    title: "Free consultation",
    body: "A no-pressure call to understand where you are, what you've tried, and what you actually want to achieve.",
  },
  {
    when: "Within 48 hours",
    title: "Your personal protocol",
    body: "Training and nutrition built from scratch around your schedule, then loaded straight into your Vemisis app.",
  },
  {
    when: "Every week",
    title: "Weekly calibration",
    body: "You check in, your coach analyses the data and adjusts. Consistency becomes a system, not a personality trait.",
  },
];

export default function Steps() {
  return (
    <section className="sec steps">
      <div className="wrap st-grid">
        <div className="st-side">
          <h2 className="display-lg rv">
            Start in three steps.
          </h2>
          <p className="lead rv" style={{ ["--d" as string]: "100ms" }}>
            From first conversation to your first calibrated week, here is exactly what happens.
          </p>
          <Link href="/book" className="btn-primary btn-primary-lg rv" style={{ ["--d" as string]: "180ms" }}>
            Book your free call <Arrow />
          </Link>
        </div>

        <ol className="st-list">
          {steps.map((s, i) => (
            <li key={s.title} className="st-row rv" style={{ ["--d" as string]: `${i * 120}ms` }}>
              <span className="st-num" aria-hidden="true">{i + 1}</span>
              <div className="st-copy">
                <p className="st-when">{s.when}</p>
                <h3 className="display-sm">{s.title}</h3>
                <p className="body-sm" style={{ maxWidth: 520 }}>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <style>{`
        .st-grid { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 80px; align-items: start; }
        .st-side { position: sticky; top: 140px; display: flex; flex-direction: column; gap: 24px; align-items: flex-start; }
        .st-list { list-style: none; }
        .st-row { display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: 24px; padding: 36px 0; border-top: 1px solid var(--line); }
        .st-row:last-child { border-bottom: 1px solid var(--line); }
        .st-num { font-family: var(--font-display); font-size: 88px; line-height: 0.8; color: var(--accent); }
        .st-copy { display: flex; flex-direction: column; gap: 10px; }
        .st-when { font-size: 13px; font-weight: 700; color: var(--accent); }
        @media (max-width: 900px) {
          .st-grid { grid-template-columns: 1fr; gap: 40px; }
          .st-side { position: static; }
          .st-row { grid-template-columns: 64px minmax(0, 1fr); gap: 16px; padding: 28px 0; }
          .st-num { font-size: 60px; }
        }
      `}</style>
    </section>
  );
}
