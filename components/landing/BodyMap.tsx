"use client";

import Image from "next/image";

// Anatomy figure for "How progress is measured". The render (public/media/anatomy,
// generated without any text) is the body; highlights and labels are drawn on
// top in code so every label is accurate and matches the list beside it.
// Coordinates are in the cropped render's pixels: 660 x 1536. The SVG is wider
// (1240) to leave room for labels on the right.

export type BodyRegion = "body" | "strength" | "recovery" | "checkin";

const MUSCLES = [
  { cx: 262, cy: 392, rx: 78, ry: 58 }, // chest
  { cx: 418, cy: 392, rx: 78, ry: 58 },
  { cx: 120, cy: 345, rx: 52, ry: 70 }, // shoulders
  { cx: 548, cy: 345, rx: 52, ry: 70 },
  { cx: 96, cy: 486, rx: 40, ry: 80 }, // arms
  { cx: 566, cy: 486, rx: 40, ry: 80 },
  { cx: 332, cy: 520, rx: 70, ry: 95 }, // abs
  { cx: 242, cy: 880, rx: 66, ry: 150 }, // thighs
  { cx: 420, cy: 880, rx: 66, ry: 150 },
  { cx: 214, cy: 1200, rx: 40, ry: 100 }, // calves
  { cx: 446, cy: 1200, rx: 40, ry: 100 },
];

export default function BodyMap({ active }: { active: BodyRegion | null }) {
  const on = (r: BodyRegion) => (active === null || active === r ? "is-on" : "");
  return (
    <div className={`bm ${active === "checkin" || active === null ? "bm-whole" : ""}`} aria-hidden="true">
      <div className="bm-img">
        <Image
          src="/media/anatomy/body-front.webp"
          alt=""
          fill
          sizes="(max-width: 560px) 170px, 240px"
          style={{ objectFit: "contain", objectPosition: "left top" }}
        />
      </div>

      <svg className="bm-svg" viewBox="0 0 1240 1536">
        <defs>
          <radialGradient id="bm-hl">
            <stop offset="0" stopColor="#FFDE02" stopOpacity="0.55" />
            <stop offset="0.6" stopColor="#FFDE02" stopOpacity="0.18" />
            <stop offset="1" stopColor="#FFDE02" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bm-scan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFDE02" stopOpacity="0" />
            <stop offset="0.9" stopColor="#FFDE02" stopOpacity="0.12" />
            <stop offset="1" stopColor="#FFDE02" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* Strength: the major muscle groups in the render */}
        <g className={`bm-region ${on("strength")}`}>
          {MUSCLES.map((m, i) => (
            <ellipse key={i} {...m} fill="url(#bm-hl)" />
          ))}
        </g>

        {/* Recovery: sleep (head) and the heart, which beats */}
        <g className={`bm-region ${on("recovery")}`}>
          <ellipse cx="330" cy="112" rx="96" ry="110" fill="url(#bm-hl)" />
          <g className="bm-beat">
            <ellipse cx="355" cy="378" rx="120" ry="120" fill="url(#bm-hl)" />
          </g>
        </g>

        {/* Body: waist and hip tape */}
        <g className={`bm-region bm-tape-g ${on("body")}`}>
          <path d="M196 604 Q330 640 464 604" className="bm-tape" />
          <path d="M166 702 Q330 744 494 702" className="bm-tape" />
          <path d="M196 590 v28 M464 590 v28 M166 688 v28 M494 688 v28" className="bm-tick" />
        </g>

        <rect className="bm-scanline" x="40" y="-140" width="600" height="140" fill="url(#bm-scan)" />

        {/* Callouts: the words in the list, nothing the app does not measure */}
        <g className={`bm-call ${on("recovery")}`}>
          <path d="M420 112 H720" /><circle cx="420" cy="112" r="8" />
          <text x="744" y="126">Sleep</text>
        </g>
        <g className={`bm-call ${on("recovery")}`}>
          <path d="M440 378 H720" /><circle cx="440" cy="378" r="8" />
          <text x="744" y="372">Resting heart rate</text>
          <text x="744" y="424" className="bm-sub">HRV</text>
        </g>
        <g className={`bm-call ${on("body")}`}>
          <path d="M470 606 H720" /><circle cx="470" cy="606" r="8" />
          <text x="744" y="600">Waist and hips</text>
          <text x="744" y="652" className="bm-sub">Bodyweight trend</text>
        </g>
        <g className={`bm-call ${on("strength")}`}>
          <path d="M486 880 H720" /><circle cx="486" cy="880" r="8" />
          <text x="744" y="874">Strength</text>
          <text x="744" y="926" className="bm-sub">Sets, reps and load</text>
        </g>
        <g className={`bm-call ${active === "checkin" || active === null ? "is-on" : ""}`}>
          <path d="M470 1440 H720" /><circle cx="470" cy="1440" r="8" />
          <text x="744" y="1434">Weekly check-in</text>
          <text x="744" y="1486" className="bm-sub">All of it, reviewed</text>
        </g>
      </svg>

      <style>{`
        .bm { position: relative; width: 100%; aspect-ratio: 1240 / 1536; }
        .bm-img { position: absolute; left: 0; top: 0; bottom: 0; width: calc(660 / 1240 * 100%); transition: filter 0.6s var(--ease-out); }
        .bm-whole .bm-img { filter: brightness(1.18) drop-shadow(0 0 18px rgba(255,222,2,0.28)); }
        .bm-svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
        .bm-region { opacity: 0; transition: opacity 0.6s var(--ease-out); mix-blend-mode: screen; }
        .bm-region.is-on { opacity: 1; }
        .bm-tape-g { mix-blend-mode: normal; }
        .bm-tape { fill: none; stroke: #FFDE02; stroke-width: 7; stroke-dasharray: 14 10; stroke-linecap: round; }
        .bm-tick { stroke: #FFDE02; stroke-width: 6; stroke-linecap: round; }
        .bm-beat { transform-box: fill-box; transform-origin: center; animation: bm-beat 0.94s var(--ease-out) infinite; }
        .bm-call { opacity: 0.32; transition: opacity 0.5s var(--ease-out); }
        .bm-call.is-on { opacity: 1; }
        .bm-call path { stroke: rgba(255,255,255,0.55); stroke-width: 2.5; fill: none; }
        .bm-call circle { fill: #FFDE02; }
        .bm-call text { fill: #fff; font-family: var(--font-body); font-size: 42px; font-weight: 700; }
        .bm-call text.bm-sub { fill: var(--text-muted); font-size: 34px; font-weight: 500; }
        .bm-scanline { mix-blend-mode: screen; animation: bm-scan 7s cubic-bezier(.45,0,.55,1) infinite; }
        @keyframes bm-scan { 0% { transform: translateY(0); opacity: 0; } 8% { opacity: 1; } 55% { transform: translateY(1700px); opacity: 1; } 56%, 100% { transform: translateY(1700px); opacity: 0; } }
        @keyframes bm-beat { 0%, 100% { transform: scale(0.9); opacity: 0.7; } 14% { transform: scale(1.15); opacity: 1; } 28% { transform: scale(0.95); } 42% { transform: scale(1.06); } 60% { transform: scale(0.9); opacity: 0.7; } }
        @media (max-width: 560px) {
          .bm-call text { font-size: 54px; }
          .bm-call text.bm-sub { font-size: 44px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bm-beat, .bm-scanline { animation: none; }
          .bm-scanline { display: none; }
        }
      `}</style>
    </div>
  );
}
