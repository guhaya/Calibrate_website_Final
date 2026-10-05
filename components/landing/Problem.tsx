"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Hl } from "./ui";

const pains = [
  "You've started over more times than you can count",
  "Generic plans ignore your schedule",
  "You don't know if any of it is working",
  "Nobody adjusts the plan when life changes",
  "Willpower alone keeps running out",
];

const fixes = [
  "A protocol built to survive travel, deadlines and bad weeks",
  "Training and nutrition written around your calendar",
  "Weekly data review, so you always know where you stand",
  "Your coach adapts the plan within 4 hours, every time",
  "A system that keeps working when motivation doesn't",
];

const N = pains.length;
const ys = pains.map((_, i) => ((i + 0.5) / N) * 500);
const RING = 2 * Math.PI * 76;

function state(i: number, count: number) {
  if (i < count) return "is-done";
  if (i === count) return "is-active";
  return "";
}

export default function Problem() {
  const mapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [scrollCount, setCount] = useState(0);
  const { scrollYProgress } = useScroll({ target: mapRef, offset: ["start 0.72", "end 0.42"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.max(0, Math.min(N, Math.floor(p * (N + 1))));
    setCount((c) => (c === next ? c : next));
  });

  const count = reduce ? N : scrollCount;
  const complete = count === N;
  const needle = -110 + (110 * count) / N;

  return (
    <section className="sec pb">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="display-lg rv balance">
            It&apos;s not a willpower problem. It&apos;s a <Hl>system</Hl> problem.
          </h2>
          <p className="lead rv" style={{ ["--d" as string]: "160ms", maxWidth: 620 }}>
            Smart, driven people don&apos;t fail at fitness for lack of effort. They fail because nobody built them a
            system that bends around real life. That&apos;s exactly what CALIBRATE does.
          </p>
        </div>

        <div className="pb-map rv rv-scale" ref={mapRef}>
          <ul className="pb-col pb-pains">
            {pains.map((p, i) => (
              <li key={p} className={`pb-item pb-pain ${state(i, count)}`} style={{ ["--i" as string]: i }}>
                <span className="pb-ico pb-ico-x" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                </span>
                <span className="pb-text">{p}</span>
              </li>
            ))}
          </ul>

          <svg className="pb-svg" viewBox="0 0 200 500" preserveAspectRatio="none" aria-hidden="true">
            {ys.map((y, i) => {
              const d = `M0 ${y} C 110 ${y}, 90 250, 200 250`;
              return (
                <g key={i} className={`pb-line ${state(i, count)}`}>
                  <path d={d} className="pb-base" />
                  <path d={d} className="pb-lit" pathLength={1} />
                  <path d={d} className="pb-pulse" pathLength={1} />
                </g>
              );
            })}
          </svg>

          <div className={`pb-hub ${complete ? "is-complete" : ""}`}>
            <svg className="pb-ring" viewBox="0 0 172 172" aria-hidden="true">
              <circle cx="86" cy="86" r="76" className="pb-ring-base" />
              <circle cx="86" cy="86" r="76" className="pb-ring-fill" style={{ strokeDasharray: RING, strokeDashoffset: RING * (1 - count / N) }} />
            </svg>
            <div className="pb-hub-core">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true" className="pb-dial">
                <path className="pb-dial-arc" pathLength={100} d="M50.4 17.6 A24 24 0 1 0 50.4 46.4" stroke="#050506" strokeWidth="8.5" strokeLinecap="round" />
                <g className="pb-dial-needle-wrap" style={{ transform: `rotate(${needle}deg)` }}>
                  <line className="pb-dial-needle" x1="32" y1="32" x2="46" y2="23" stroke="#050506" strokeWidth="5.5" strokeLinecap="round" />
                </g>
                <circle className="pb-dial-hub" cx="32" cy="32" r="6" fill="#050506" />
              </svg>
            </div>
            <span className="mono pb-hub-label" aria-live="polite">
              {complete ? "Fully calibrated" : `${count}/${N} calibrated`}
            </span>
          </div>

          <svg className="pb-svg" viewBox="0 0 200 500" preserveAspectRatio="none" aria-hidden="true">
            {ys.map((y, i) => {
              const d = `M0 250 C 110 250, 90 ${y}, 200 ${y}`;
              return (
                <g key={i} className={`pb-line pb-line-out ${state(i, count)}`}>
                  <path d={d} className="pb-base" />
                  <path d={d} className="pb-lit" pathLength={1} />
                  <path d={d} className="pb-pulse" pathLength={1} />
                </g>
              );
            })}
          </svg>

          <ul className="pb-col pb-fixes">
            {fixes.map((f, i) => (
              <li key={f} className={`pb-item pb-fix ${state(i, count)}`} style={{ ["--i" as string]: i }}>
                <span className="pb-ico pb-ico-ok" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2.5 6.2l2.3 2.3L9.5 3.6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .pb-map {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(60px, 150px) 190px minmax(60px, 150px) minmax(0, 1fr);
          align-items: stretch;
          height: 500px;
        }
        .pb-col { list-style: none; display: grid; grid-template-rows: repeat(5, 1fr); }
        .pb-item {
          align-self: center;
          display: flex; align-items: center; gap: 12px;
          padding: 14px 18px;
          border-radius: 16px;
          font-size: 14.5px; font-weight: 600; line-height: 1.35;
          background: var(--surface-1); border: 1px solid var(--line);
          opacity: 0; transform: translateX(-20px);
          transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out), border-color 0.5s ease, background 0.5s ease, color 0.5s ease;
          transition-delay: calc(var(--i) * 90ms + 200ms);
        }
        .pb-fix { transform: translateX(20px); }
        .pb-map.in-view .pb-item { opacity: 1; transform: none; }

        /* Pains: struck out once their fix is live */
        .pb-pain { color: #D2D4DB; }
        .pb-text {
          text-decoration: line-through; text-decoration-thickness: 2px;
          text-decoration-color: transparent;
          transition: text-decoration-color 0.5s ease;
        }
        .pb-map.in-view .pb-pain.is-done { opacity: 0.42; transition-delay: 0s; }
        .pb-pain.is-done .pb-text { text-decoration-color: #F2585B; }
        .pb-pain.is-active { border-color: rgba(242,88,91,0.45); transition-delay: 0s; }

        /* Fixes: dim until their pain has been calibrated */
        .pb-fix { color: rgba(255,255,255,0.5); }
        .pb-map.in-view .pb-fix { opacity: 0.55; }
        .pb-map.in-view .pb-fix.is-done {
          opacity: 1; color: #fff; transition-delay: 0.45s;
          border-color: rgba(255,222,2,0.5); background: linear-gradient(90deg, rgba(255,222,2,0.10), var(--surface-1) 70%);
        }
        .pb-ico { width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; flex-shrink: 0; transition: transform 0.5s cubic-bezier(0.34, 1.5, 0.5, 1), background 0.4s ease; }
        .pb-ico-x { background: rgba(222,48,51,0.14); color: #F2585B; }
        .pb-ico-ok { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.4); transform: scale(0.8); }
        .pb-fix.is-done .pb-ico-ok { background: var(--accent); color: #050506; transform: scale(1); transition-delay: 0.5s; }

        /* Connectors: dim base, a lit stroke that draws once solved, a pulse while in transit */
        .pb-svg { width: 100%; height: 100%; overflow: visible; }
        .pb-base { fill: none; stroke: rgba(255,255,255,0.09); stroke-width: 1.5; vector-effect: non-scaling-stroke; }
        .pb-lit {
          fill: none; stroke: var(--accent); stroke-width: 2; vector-effect: non-scaling-stroke;
          stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0.85;
          transition: stroke-dashoffset 0.5s var(--ease-out);
        }
        .pb-line.is-done .pb-lit { stroke-dashoffset: 0; }
        .pb-line-out.is-done .pb-lit { transition-delay: 0.35s; }
        .pb-pulse {
          fill: none; stroke: #fff; stroke-width: 3; stroke-linecap: round; vector-effect: non-scaling-stroke;
          stroke-dasharray: 0.08 1; stroke-dashoffset: 0.08; opacity: 0;
        }
        .pb-line.is-active .pb-pulse { opacity: 1; animation: pb-run 1.4s cubic-bezier(0.45, 0, 0.55, 1) infinite; }
        .pb-line-out.is-active .pb-pulse { animation-delay: 0.7s; }
        @keyframes pb-run { from { stroke-dashoffset: 0.08; } to { stroke-dashoffset: -1; } }

        /* Hub */
        .pb-hub { position: relative; display: grid; place-items: center; align-content: center; }
        .pb-ring { position: absolute; width: 172px; height: 172px; left: 50%; top: 50%; margin: -86px 0 0 -86px; transform: rotate(-90deg); }
        .pb-ring-base { fill: none; stroke: rgba(255,255,255,0.08); stroke-width: 3; }
        .pb-ring-fill { fill: none; stroke: var(--accent); stroke-width: 3; stroke-linecap: round; transition: stroke-dashoffset 0.8s var(--ease-out); }
        .pb-hub-core {
          width: 124px; height: 124px; border-radius: 50%;
          display: grid; place-items: center;
          background: var(--accent);
          box-shadow: 0 24px 50px -16px rgba(255,222,2,0.45);
          position: relative; z-index: 1;
          transition: transform 0.6s cubic-bezier(0.34, 1.5, 0.5, 1);
        }
        .pb-hub.is-complete .pb-hub-core { transform: scale(1.06); }
        .pb-hub-label { position: absolute; bottom: calc(50% - 124px); color: var(--accent); letter-spacing: 0.2em; white-space: nowrap; }

        .pb-dial-arc { stroke-dasharray: 100; stroke-dashoffset: 100; }
        .pb-dial-needle-wrap, .pb-dial-hub { transform-box: view-box; transform-origin: 32px 32px; }
        .pb-dial-needle-wrap { transition: transform 0.9s cubic-bezier(0.34, 1.45, 0.5, 1); }
        .pb-dial-hub { transform: scale(0); }
        .pb-map.in-view .pb-dial-arc { animation: dial-arc 1.1s var(--ease-out) 0.3s forwards; }
        .pb-map.in-view .pb-dial-hub { animation: dial-hub 0.5s var(--ease-out) 0.9s forwards; }
        .pb-hub.is-complete .pb-dial-needle { transform-box: view-box; transform-origin: 32px 32px; animation: dial-idle 5s ease-in-out 1.2s infinite; }
        @keyframes dial-arc { to { stroke-dashoffset: 0; } }
        @keyframes dial-hub { to { transform: scale(1); } }
        @keyframes dial-idle {
          0%, 70%, 100% { transform: rotate(0deg); }
          78% { transform: rotate(-14deg); }
          86% { transform: rotate(6deg); }
          93% { transform: rotate(-2deg); }
        }

        @media (max-width: 1000px) {
          .pb-map { grid-template-columns: 1fr; height: auto; gap: 0; }
          .pb-svg { display: none; }
          .pb-col { grid-template-rows: none; gap: 10px; }
          .pb-hub { padding: 110px 0; }
          .pb-item, .pb-fix { transform: translateY(16px); transition-delay: calc(var(--i) * 70ms + 100ms); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pb-dial-arc { stroke-dashoffset: 0; }
          .pb-dial-hub { transform: none; }
          .pb-line .pb-pulse { display: none; }
        }
      `}</style>
    </section>
  );
}
