"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Arrow } from "./ui";
import BodyMap, { type BodyRegion } from "./BodyMap";

const measures = [
  {
    region: "body" as BodyRegion,
    area: "Body",
    what: "Bodyweight trend, waist and body measurements, and body composition.",
    when: "Weekly",
  },
  {
    region: "strength" as BodyRegion,
    area: "Strength",
    what: "Sets, reps and load logged for every session, with your strength records tracked over time.",
    when: "Every session",
  },
  {
    region: "recovery" as BodyRegion,
    area: "Recovery",
    what: "HRV, resting heart rate and sleep, synced from Apple Health, Apple Watch, Oura or Health Connect.",
    when: "Daily",
  },
  {
    region: "checkin" as BodyRegion,
    area: "Check-in",
    what: "Training, nutrition, energy, sleep and compliance, reviewed by your coach before the plan is adjusted.",
    when: "Weekly",
  },
];

export default function Results() {
  // The body map steps through the four measures on its own; hovering a row
  // takes over. With reduced motion it stays still and shows everything.
  const [auto, setAuto] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const t = window.setInterval(() => setAuto((a) => (a + 1) % measures.length), 3200);
    return () => { window.clearInterval(t); mq.removeEventListener("change", sync); };
  }, []);

  const current = hover ?? auto;
  const active: BodyRegion | null = still && hover === null ? null : measures[current].region;

  return (
    <section className="sec res" id="progress">
      <div className="wrap res-grid">
        <div>
          <h2 className="display-lg rv">How progress is measured.</h2>
          <p className="lead rv" style={{ ["--d" as string]: "80ms", maxWidth: 520, marginTop: 18 }}>
            Every week your coach reviews the same numbers you see in Vemisis, and the plan changes when they do.
          </p>

          <ul className="res-list">
            {measures.map((m, i) => (
              <li
                key={m.area}
                className="res-row rv"
                data-active={active === m.region ? "true" : undefined}
                style={{ ["--d" as string]: `${i * 70}ms` }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                <div>
                  <p className="res-area">{m.area}</p>
                  <p className="res-what">{m.what}</p>
                </div>
                <span className="mono res-when">{m.when}</span>
              </li>
            ))}
          </ul>

          <Link href="/how-it-works" className="arrow-link rv">
            See how the weekly review works <span className="ar"><Arrow size={12} /></span>
          </Link>
        </div>

        <div className="res-visual rv">
          <BodyMap active={active} />
        </div>
      </div>

      <style>{`
        .res-grid { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr); gap: 64px; align-items: center; }
        .res-list { list-style: none; margin: 40px 0 28px; border-top: 1px solid var(--line); }
        .res-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 16px; align-items: baseline; padding: 20px 0; border-bottom: 1px solid var(--line); }
        .res-row { position: relative; transition: border-color 0.4s var(--ease-out); }
        .res-row::before { content: ""; position: absolute; left: -16px; top: 22px; bottom: 22px; width: 2px; border-radius: 2px; background: var(--accent); transform: scaleY(0); transition: transform 0.4s var(--ease-out); }
        .res-row[data-active]::before { transform: scaleY(1); }
        .res-area { transition: color 0.4s var(--ease-out); }
        .res-row[data-active] .res-area { color: var(--accent); }
        .res-area { font-weight: 800; font-size: 17px; color: #fff; margin-bottom: 4px; }
        .res-what { font-size: 14.5px; color: var(--text-secondary); line-height: 1.6; }
        .res-when { font-size: 12px; color: var(--text-muted); white-space: nowrap; }
        .res-visual { position: relative; width: 100%; max-width: 480px; justify-self: center; }
        @media (max-width: 960px) {
          .res-grid { grid-template-columns: 1fr; gap: 40px; }
          .res-visual { max-width: 380px; }
        }
        @media (max-width: 520px) {
          .res-row { grid-template-columns: minmax(0, 1fr); }
          .res-when { grid-column: 1; }
          .res-visual { max-width: 300px; }
        }
      `}</style>
    </section>
  );
}
