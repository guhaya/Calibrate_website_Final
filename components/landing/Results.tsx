import Link from "next/link";
import { Arrow, Device } from "./ui";

const measures = [
  {
    area: "Body",
    what: "Bodyweight trend, waist and body measurements, and body composition.",
    when: "Weekly",
  },
  {
    area: "Strength",
    what: "Sets, reps and load logged for every session, with your strength records tracked over time.",
    when: "Every session",
  },
  {
    area: "Recovery",
    what: "HRV, resting heart rate and sleep, synced from Apple Health, Apple Watch, Oura or Health Connect.",
    when: "Daily",
  },
  {
    area: "Check-in",
    what: "Training, nutrition, energy, sleep and compliance, reviewed by your coach before the plan is adjusted.",
    when: "Weekly",
  },
];

export default function Results() {
  return (
    <section className="sec res" id="progress">
      <div className="wrap res-grid">
        <div>
          <h2 className="display-lg rv">How progress is measured.</h2>
          <p className="lead rv" style={{ ["--d" as string]: "80ms", maxWidth: 520, marginTop: 18 }}>
            No before-and-after promises. Every week your coach reviews the same numbers you see in Vemisis, and the plan changes when they do.
          </p>

          <ol className="res-list">
            {measures.map((m, i) => (
              <li key={m.area} className="res-row rv" style={{ ["--d" as string]: `${i * 70}ms` }}>
                <span className="mono res-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="res-area">{m.area}</p>
                  <p className="res-what">{m.what}</p>
                </div>
                <span className="mono res-when">{m.when}</span>
              </li>
            ))}
          </ol>

          <Link href="/how-it-works" className="arrow-link rv">
            See how the weekly review works <span className="ar"><Arrow size={12} /></span>
          </Link>
        </div>

        <div className="res-visual rv">
          <Device src="/media/app/progress.webp" alt="Vemisis progress screen showing bodyweight and measurement trends" width={250} sizes="250px" className="res-dev-a" />
          <Device src="/media/app/insights.webp" alt="Vemisis insights screen with the weekly score" width={230} sizes="230px" className="res-dev-b" />
        </div>
      </div>

      <style>{`
        .res-grid { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr); gap: 64px; align-items: center; }
        .res-list { list-style: none; margin: 40px 0 28px; border-top: 1px solid var(--line); }
        .res-row { display: grid; grid-template-columns: 44px minmax(0, 1fr) auto; gap: 16px; align-items: baseline; padding: 20px 0; border-bottom: 1px solid var(--line); }
        .res-num { color: var(--accent); font-size: 13px; }
        .res-area { font-weight: 800; font-size: 17px; color: #fff; margin-bottom: 4px; }
        .res-what { font-size: 14.5px; color: var(--text-secondary); line-height: 1.6; }
        .res-when { font-size: 12px; color: var(--text-muted); white-space: nowrap; }
        .res-visual { position: relative; display: flex; justify-content: center; align-items: flex-start; gap: 0; min-height: 520px; }
        .res-dev-a { position: relative; z-index: 2; }
        .res-dev-b { position: relative; z-index: 1; margin-left: -60px; margin-top: 80px; opacity: 0.9; }
        @media (max-width: 960px) {
          .res-grid { grid-template-columns: 1fr; gap: 40px; }
          .res-visual { min-height: 0; }
        }
        @media (max-width: 520px) {
          .res-row { grid-template-columns: 32px minmax(0, 1fr); }
          .res-when { grid-column: 2; }
          .res-dev-b { display: none; }
        }
      `}</style>
    </section>
  );
}
