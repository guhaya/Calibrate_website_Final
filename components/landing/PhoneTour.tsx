"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Device } from "./ui";

export type TourStep = {
  id: string;
  label: string;
  headline: string;
  description: string;
  features: { title: string; description: string }[];
  shot: { src: string; alt: string };
};

// Bevel-style tour: one sticky phone on the right whose screen follows the
// step you are reading (scroll) or click (list). On narrow screens every step
// simply shows its own screen inline.
export default function PhoneTour({ steps }: { steps: TourStep[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (i: number) => {
    setActive(i);
    refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="pt" aria-label="Inside the Vemisis app">
      <div className="wrap pt-grid">
        <div className="pt-steps">
          {steps.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              data-index={i}
              ref={(el) => { refs.current[i] = el; }}
              className={`pt-step ${i === active ? "is-active" : ""}`}
            >
              <h2 className="pt-title">{s.headline}</h2>
              <p className="pt-desc">{s.description}</p>
              <ul className="pt-feats">
                {s.features.map((f) => (
                  <li key={f.title}>
                    <p className="pt-feat-t">{f.title}</p>
                    <p className="pt-feat-d">{f.description}</p>
                  </li>
                ))}
              </ul>
              <div className="pt-inline">
                <Device src={s.shot.src} alt={s.shot.alt} width={240} sizes="240px" />
              </div>
            </article>
          ))}
        </div>

        <div className="pt-stick" aria-hidden="true">
          <div className="pt-stage">
            <div className="pt-glow" />
            <div className="device pt-device">
              <div className="device-screen">
                {steps.map((s, i) => (
                  <Image
                    key={s.id}
                    src={s.shot.src}
                    alt=""
                    fill
                    sizes="300px"
                    loading="eager"
                    className={`pt-shot ${i === active ? "is-on" : ""}`}
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                ))}
              </div>
            </div>
            <ol className="pt-dots">
              {steps.map((s, i) => (
                <li key={s.id}>
                  <button type="button" tabIndex={-1} className={i === active ? "is-on" : ""} onClick={() => go(i)}>
                    <span className="pt-dot" />
                    <span className="pt-dot-l">{s.label}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <style>{`
        .pt { padding: 40px 0 80px; }
        .pt-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr); gap: 64px; }
        .pt-steps { display: flex; flex-direction: column; }
        .pt-step {
          min-height: 78vh; display: flex; flex-direction: column; justify-content: center; gap: 18px;
          padding: 40px 0; scroll-margin-top: 140px;
          opacity: 0.32; transition: opacity 0.5s var(--ease-out);
        }
        .pt-step.is-active { opacity: 1; }
        .pt-title { font-family: var(--font-display); font-size: clamp(36px, 3.6vw, 58px); line-height: 0.95; text-transform: uppercase; text-wrap: balance; }
        .pt-desc { font-size: 16.5px; line-height: 1.65; color: #C9CBD3; max-width: 560px; }
        .pt-feats { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 6px; }
        .pt-feats li { padding: 18px 20px; border-radius: 18px; background: var(--surface-1); border: 1px solid var(--line); }
        .pt-feat-t { font-weight: 800; font-size: 15px; }
        .pt-feat-d { font-size: 13.5px; line-height: 1.55; color: var(--text-secondary); margin-top: 4px; }
        .pt-inline { display: none; }

        .pt-stick { position: relative; }
        .pt-stage { position: sticky; top: 140px; height: calc(100vh - 180px); min-height: 600px; display: flex; align-items: center; justify-content: center; gap: 36px; }
        .pt-glow { position: absolute; inset: 14% 10%; border-radius: 50%; background: radial-gradient(closest-side, rgba(255,222,2,0.24), transparent); filter: blur(24px); }
        .pt-device { width: 300px; position: relative; z-index: 1; }
        /* The outgoing screen waits until the incoming one has faded in on top, so the phone never shows black. */
        .pt-shot { opacity: 0; transform: scale(1.02); transition: opacity 0.3s linear 0.55s, transform 0.55s var(--ease-out); }
        .pt-shot.is-on { z-index: 1; opacity: 1; transform: none; transition: opacity 0.55s var(--ease-out), transform 0.55s var(--ease-out); }
        .pt-dots { list-style: none; display: flex; flex-direction: column; gap: 6px; position: relative; z-index: 1; }
        .pt-dots button { display: inline-flex; align-items: center; gap: 10px; background: none; border: 0; padding: 6px 0; cursor: pointer; color: var(--text-muted); font-size: 12.5px; font-weight: 700; }
        .pt-dots button.is-on { color: #fff; }
        .pt-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.18); transition: transform 0.3s ease, background 0.3s ease; }
        .pt-dots button.is-on .pt-dot { background: var(--accent); transform: scale(1.4); }

        @media (max-width: 1100px) { .pt-dots { display: none; } }
        @media (max-width: 960px) {
          .pt-grid { grid-template-columns: 1fr; gap: 0; }
          .pt-stick { display: none; }
          .pt-step { min-height: 0; opacity: 1; padding: 48px 0; border-bottom: 1px solid var(--line); }
          .pt-inline { display: flex; justify-content: center; margin-top: 12px; }
        }
        @media (max-width: 600px) { .pt-feats { grid-template-columns: 1fr; } }
        @media (prefers-reduced-motion: reduce) { .pt-step, .pt-shot { transition: none; } }
      `}</style>
    </section>
  );
}
