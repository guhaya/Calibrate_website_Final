"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Rear-view anatomy for the Return to Training track. The render (generated
// without any text) is the body; the joint markers and labels are drawn in code.
// The four areas are the ones clients' reviews mention coming back from: neck,
// shoulder, lower back and knee. Coordinates are in the cropped render's pixels
// (640 x 1536); the SVG is wider (1200) to leave room for labels.

const JOINTS = [
  { label: "Neck", points: [[320, 232]], callout: [320, 232] },
  { label: "Shoulders", points: [[160, 332], [488, 332]], callout: [488, 332] },
  { label: "Lower back", points: [[322, 622]], callout: [322, 622] },
  { label: "Knees", points: [[240, 1032], [402, 1032]], callout: [402, 1032] },
] as const;

export default function JointsFigure() {
  const [active, setActive] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const t = window.setInterval(() => setActive((a) => (a + 1) % JOINTS.length), 2400);
    return () => { window.clearInterval(t); mq.removeEventListener("change", sync); };
  }, []);

  return (
    <div className="jf" aria-hidden="true">
      <div className="jf-img">
        <Image
          src="/media/anatomy/body-back.webp"
          alt=""
          fill
          sizes="(max-width: 860px) 45vw, 220px"
          style={{ objectFit: "contain", objectPosition: "left top" }}
        />
      </div>
      <svg className="jf-svg" viewBox="0 0 1200 1536">
        <defs>
          <radialGradient id="jf-glow">
            <stop offset="0" stopColor="#FFDE02" stopOpacity="0.75" />
            <stop offset="0.55" stopColor="#FFDE02" stopOpacity="0.2" />
            <stop offset="1" stopColor="#FFDE02" stopOpacity="0" />
          </radialGradient>
        </defs>
        {JOINTS.map((j, i) => {
          const on = still || i === active;
          const [cx, cy] = j.callout;
          return (
            <g key={j.label} className={`jf-joint ${on ? "is-on" : ""}`}>
              {j.points.map(([x, y]) => (
                <g key={`${x}-${y}`}>
                  <circle cx={x} cy={y} r="70" fill="url(#jf-glow)" className="jf-halo" />
                  <circle cx={x} cy={y} r="22" className="jf-ring" />
                  <circle cx={x} cy={y} r="9" className="jf-dot" />
                </g>
              ))}
              <path d={`M${cx + 30} ${cy} H700`} className="jf-line" />
              <text x="724" y={cy + 16} className="jf-label">{j.label}</text>
            </g>
          );
        })}
      </svg>

      <style>{`
        .jf { position: relative; height: 100%; max-width: 100%; aspect-ratio: 1200 / 1536; }
        .jf-img { position: absolute; left: 0; top: 0; bottom: 0; width: calc(640 / 1200 * 100%); }
        .jf-svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
        .jf-joint { opacity: 0.38; transition: opacity 0.5s var(--ease-out); }
        .jf-joint.is-on { opacity: 1; }
        .jf-halo { mix-blend-mode: screen; opacity: 0; transition: opacity 0.5s var(--ease-out); }
        .jf-joint.is-on .jf-halo { opacity: 1; }
        .jf-ring { fill: none; stroke: #FFDE02; stroke-width: 5; transform-box: fill-box; transform-origin: center; }
        .jf-joint.is-on .jf-ring { animation: jf-ripple 1.6s var(--ease-out) infinite; }
        .jf-dot { fill: #FFDE02; }
        .jf-line { stroke: rgba(255,255,255,0.55); stroke-width: 3; fill: none; }
        .jf-label { fill: #fff; font-family: var(--font-body); font-size: 52px; font-weight: 700; }
        @keyframes jf-ripple { 0% { transform: scale(0.6); opacity: 1; } 100% { transform: scale(2.4); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .jf-joint.is-on .jf-ring { animation: none; } }
      `}</style>
    </div>
  );
}
