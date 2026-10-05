import Image from "next/image";
import type { ReactNode } from "react";
import { Check } from "./ui";

export type JourneyStep = {
  number: string;
  title: string;
  duration: string;
  description: string;
  bullets: string[];
  img?: { src: string; alt: string };
};

export default function Journey({ title, lead, steps }: { title: ReactNode; lead?: string; steps: JourneyStep[] }) {
  return (
    <section className="sec jr">
      <div className="wrap jr-grid">
        <div className="jr-side">
          <h2 className="display-lg rv" style={{ ["--d" as string]: "80ms" }}>{title}</h2>
          {lead && <p className="lead rv" style={{ ["--d" as string]: "160ms" }}>{lead}</p>}
        </div>

        <ol className="jr-list">
          {steps.map((s, i) => (
            <li key={s.number} className="jr-step rv" style={{ ["--d" as string]: `${i * 60}ms` }}>
              <div className="jr-rail" aria-hidden="true">
                <span className="jr-num">{s.number}</span>
                {i < steps.length - 1 && <span className="jr-line" />}
              </div>
              <article className={`card jr-card ${s.img ? "has-img" : ""}`}>
                <div className="jr-body">
                  <div className="jr-top">
                    <h3 className="display-sm">{s.title}</h3>
                    <span className="jr-chip">{s.duration}</span>
                  </div>
                  <p className="body-sm">{s.description}</p>
                  <ul>
                    {s.bullets.map((b) => (
                      <li key={b}><Check />{b}</li>
                    ))}
                  </ul>
                </div>
                {s.img && (
                  <div className="jr-shot">
                    <Image src={s.img.src} alt={s.img.alt} width={640} height={1391} sizes="200px" />
                  </div>
                )}
              </article>
            </li>
          ))}
        </ol>
      </div>

      <style>{`
        .jr-grid { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: 72px; align-items: start; }
        .jr-side { position: sticky; top: 130px; display: flex; flex-direction: column; gap: 22px; align-items: flex-start; }
        .jr-list { list-style: none; display: flex; flex-direction: column; }
        .jr-step { display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: 20px; }
        .jr-rail { position: relative; display: flex; flex-direction: column; align-items: center; }
        .jr-num {
          width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center; flex-shrink: 0;
          font-family: var(--font-display); font-size: 22px; color: #050506; background: var(--accent);
        }
        .jr-line { flex: 1; width: 2px; margin: 8px 0; background: linear-gradient(var(--accent), rgba(255,222,2,0.08)); min-height: 40px; }
        .jr-card { padding: 28px; margin-bottom: 24px; display: grid; gap: 24px; }
        .jr-card.has-img { grid-template-columns: minmax(0, 1fr) 150px; align-items: start; }
        .jr-body { display: flex; flex-direction: column; gap: 14px; }
        .jr-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; }
        .jr-chip { flex-shrink: 0; font-family: var(--font-mono); font-size: 10.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 6px 10px; border-radius: 999px; color: var(--accent); background: rgba(255,222,2,0.08); border: 1px solid rgba(255,222,2,0.25); white-space: nowrap; }
        .jr-body ul { list-style: none; display: grid; gap: 9px; }
        .jr-body li { display: flex; gap: 10px; align-items: flex-start; font-size: 14px; color: #E4E5EA; line-height: 1.5; }
        .jr-shot img { width: 100%; height: auto; border-radius: 18px; border: 1px solid var(--line-strong); }
        @media (max-width: 900px) {
          .jr-grid { grid-template-columns: 1fr; gap: 40px; }
          .jr-side { position: static; }
        }
        @media (max-width: 560px) {
          .jr-step { grid-template-columns: 44px minmax(0, 1fr); gap: 12px; }
          .jr-num { width: 42px; height: 42px; font-size: 17px; }
          .jr-card { padding: 22px; }
          .jr-card.has-img { grid-template-columns: 1fr; }
          .jr-shot { max-width: 170px; }
          .jr-top { flex-direction: column; gap: 10px; }
        }
      `}</style>
    </section>
  );
}
