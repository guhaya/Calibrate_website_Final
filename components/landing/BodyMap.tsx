"use client";

// Front-view body map for "How progress is measured". Each region lights up for
// the measure it belongs to. Decorative: the list beside it is the real content.
// Outline generated from proportioned points (head = 1/8 of height), mirrored.

export type BodyRegion = "body" | "strength" | "recovery" | "checkin";

const OUTLINE = "M150.0 8.0 C155.7 8.0 162.7 9.3 167.0 12.0 C171.3 14.7 174.0 18.7 176.0 24.0 C178.0 29.3 178.7 37.3 179.0 44.0 C179.3 50.7 179.0 58.3 178.0 64.0 C177.0 69.7 175.2 74.0 173.0 78.0 C170.8 82.0 166.7 85.0 165.0 88.0 C163.3 91.0 163.2 92.7 163.0 96.0 C162.8 99.3 160.8 105.0 164.0 108.0 C167.2 111.0 175.3 112.0 182.0 114.0 C188.7 116.0 197.7 117.8 204.0 120.0 C210.3 122.2 215.7 124.0 220.0 127.0 C224.3 130.0 227.5 133.2 230.0 138.0 C232.5 142.8 233.8 148.7 235.0 156.0 C236.2 163.3 236.7 173.3 237.0 182.0 C237.3 190.7 237.3 199.7 237.0 208.0 C236.7 216.3 235.0 223.3 235.0 232.0 C235.0 240.7 236.3 250.3 237.0 260.0 C237.7 269.7 238.8 281.3 239.0 290.0 C239.2 298.7 237.5 306.0 238.0 312.0 C238.5 318.0 241.3 320.7 242.0 326.0 C242.7 331.3 243.0 338.7 242.0 344.0 C241.0 349.3 238.3 355.5 236.0 358.0 C233.7 360.5 230.0 360.8 228.0 359.0 C226.0 357.2 224.8 351.8 224.0 347.0 C223.2 342.2 223.3 335.5 223.0 330.0 C222.7 324.5 222.7 320.7 222.0 314.0 C221.3 307.3 220.0 298.7 219.0 290.0 C218.0 281.3 216.8 271.0 216.0 262.0 C215.2 253.0 214.3 244.3 214.0 236.0 C213.7 227.7 214.3 219.7 214.0 212.0 C213.7 204.3 213.0 197.0 212.0 190.0 C211.0 183.0 209.0 170.0 208.0 170.0 C207.0 170.0 207.0 182.3 206.0 190.0 C205.0 197.7 203.8 206.7 202.0 216.0 C200.2 225.3 196.5 238.0 195.0 246.0 C193.5 254.0 192.5 256.7 193.0 264.0 C193.5 271.3 196.0 281.0 198.0 290.0 C200.0 299.0 203.2 308.0 205.0 318.0 C206.8 328.0 208.7 337.0 209.0 350.0 C209.3 363.0 208.3 381.0 207.0 396.0 C205.7 411.0 202.2 428.0 201.0 440.0 C199.8 452.0 199.7 458.0 200.0 468.0 C200.3 478.0 203.2 488.0 203.0 500.0 C202.8 512.0 201.0 526.3 199.0 540.0 C197.0 553.7 191.7 572.3 191.0 582.0 C190.3 591.7 194.2 593.3 195.0 598.0 C195.8 602.7 197.5 607.0 196.0 610.0 C194.5 613.0 189.8 615.3 186.0 616.0 C182.2 616.7 175.5 617.0 173.0 614.0 C170.5 611.0 170.8 603.3 171.0 598.0 C171.2 592.7 174.0 591.7 174.0 582.0 C174.0 572.3 171.7 554.0 171.0 540.0 C170.3 526.0 170.5 512.7 170.0 498.0 C169.5 483.3 168.8 468.0 168.0 452.0 C167.2 436.0 166.3 419.0 165.0 402.0 C163.7 385.0 161.7 362.7 160.0 350.0 C158.3 337.3 156.7 331.0 155.0 326.0 C153.3 321.0 151.7 320.0 150.0 320.0 C148.3 320.0 146.7 321.0 145.0 326.0 C143.3 331.0 141.7 337.3 140.0 350.0 C138.3 362.7 136.3 385.0 135.0 402.0 C133.7 419.0 132.8 436.0 132.0 452.0 C131.2 468.0 130.5 483.3 130.0 498.0 C129.5 512.7 129.7 526.0 129.0 540.0 C128.3 554.0 126.0 572.3 126.0 582.0 C126.0 591.7 128.8 592.7 129.0 598.0 C129.2 603.3 129.5 611.0 127.0 614.0 C124.5 617.0 117.8 616.7 114.0 616.0 C110.2 615.3 105.5 613.0 104.0 610.0 C102.5 607.0 104.2 602.7 105.0 598.0 C105.8 593.3 109.7 591.7 109.0 582.0 C108.3 572.3 103.0 553.7 101.0 540.0 C99.0 526.3 97.2 512.0 97.0 500.0 C96.8 488.0 99.7 478.0 100.0 468.0 C100.3 458.0 100.2 452.0 99.0 440.0 C97.8 428.0 94.3 411.0 93.0 396.0 C91.7 381.0 90.7 363.0 91.0 350.0 C91.3 337.0 93.2 328.0 95.0 318.0 C96.8 308.0 100.0 299.0 102.0 290.0 C104.0 281.0 106.5 271.3 107.0 264.0 C107.5 256.7 106.5 254.0 105.0 246.0 C103.5 238.0 99.8 225.3 98.0 216.0 C96.2 206.7 95.0 197.7 94.0 190.0 C93.0 182.3 93.0 170.0 92.0 170.0 C91.0 170.0 89.0 183.0 88.0 190.0 C87.0 197.0 86.3 204.3 86.0 212.0 C85.7 219.7 86.3 227.7 86.0 236.0 C85.7 244.3 84.8 253.0 84.0 262.0 C83.2 271.0 82.0 281.3 81.0 290.0 C80.0 298.7 78.7 307.3 78.0 314.0 C77.3 320.7 77.3 324.5 77.0 330.0 C76.7 335.5 76.8 342.2 76.0 347.0 C75.2 351.8 74.0 357.2 72.0 359.0 C70.0 360.8 66.3 360.5 64.0 358.0 C61.7 355.5 59.0 349.3 58.0 344.0 C57.0 338.7 57.3 331.3 58.0 326.0 C58.7 320.7 61.5 318.0 62.0 312.0 C62.5 306.0 60.8 298.7 61.0 290.0 C61.2 281.3 62.3 269.7 63.0 260.0 C63.7 250.3 65.0 240.7 65.0 232.0 C65.0 223.3 63.3 216.3 63.0 208.0 C62.7 199.7 62.7 190.7 63.0 182.0 C63.3 173.3 63.8 163.3 65.0 156.0 C66.2 148.7 67.5 142.8 70.0 138.0 C72.5 133.2 75.7 130.0 80.0 127.0 C84.3 124.0 89.7 122.2 96.0 120.0 C102.3 117.8 111.3 116.0 118.0 114.0 C124.7 112.0 132.8 111.0 136.0 108.0 C139.2 105.0 137.2 99.3 137.0 96.0 C136.8 92.7 136.7 91.0 135.0 88.0 C133.3 85.0 129.2 82.0 127.0 78.0 C124.8 74.0 123.0 69.7 122.0 64.0 C121.0 58.3 120.7 50.7 121.0 44.0 C121.3 37.3 122.0 29.3 124.0 24.0 C126.0 18.7 128.7 14.7 133.0 12.0 C137.3 9.3 144.3 8.0 150.0 8.0Z";

// Horizontal contour lines, clipped to the body, give it the scan-mesh texture.
const CONTOURS = Array.from({ length: 87 }, (_, i) => 12 + i * 7);

export default function BodyMap({ active }: { active: BodyRegion | null }) {
  const on = (r: BodyRegion) => (active === null || active === r ? "is-on" : "");
  return (
    <svg className="bm" data-state={active ?? "all"} viewBox="0 0 440 640" aria-hidden="true">
      <defs>
        <clipPath id="bm-clip"><path d={OUTLINE} /></clipPath>
        <linearGradient id="bm-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1C1D22" />
          <stop offset="1" stopColor="#0E0F12" />
        </linearGradient>
        <radialGradient id="bm-glow">
          <stop offset="0" stopColor="#FFDE02" stopOpacity="0.85" />
          <stop offset="1" stopColor="#FFDE02" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bm-scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFDE02" stopOpacity="0" />
          <stop offset="0.85" stopColor="#FFDE02" stopOpacity="0.16" />
          <stop offset="1" stopColor="#FFDE02" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      <path d={OUTLINE} fill="url(#bm-fill)" />

      <g clipPath="url(#bm-clip)">
        {CONTOURS.map((y) => (
          <line key={y} x1="50" x2="250" y1={y} y2={y} className="bm-contour" />
        ))}

        {/* Strength: major muscle groups */}
        <g className={`bm-region bm-strength ${on("strength")}`}>
          <path d="M112 146 C122 136 142 138 148 146 L148 178 C136 186 118 182 110 170 Z" />
          <path d="M188 146 C178 136 158 138 152 146 L152 178 C164 186 182 182 190 170 Z" />
          <ellipse cx="76" cy="150" rx="11" ry="19" />
          <ellipse cx="224" cy="150" rx="11" ry="19" />
          <ellipse cx="74" cy="204" rx="8" ry="22" />
          <ellipse cx="226" cy="204" rx="8" ry="22" />
          <rect x="138" y="190" width="10" height="14" rx="4" />
          <rect x="152" y="190" width="10" height="14" rx="4" />
          <rect x="138" y="208" width="10" height="14" rx="4" />
          <rect x="152" y="208" width="10" height="14" rx="4" />
          <rect x="139" y="226" width="9" height="14" rx="4" />
          <rect x="152" y="226" width="9" height="14" rx="4" />
          <ellipse cx="121" cy="392" rx="19" ry="50" />
          <ellipse cx="179" cy="392" rx="19" ry="50" />
          <ellipse cx="116" cy="500" rx="11" ry="28" />
          <ellipse cx="184" cy="500" rx="11" ry="28" />
        </g>

        {/* Recovery: sleep (head) and heart */}
        <g className={`bm-region bm-recovery ${on("recovery")}`}>
          <ellipse cx="150" cy="44" rx="30" ry="34" fill="url(#bm-glow)" className="bm-sleep" />
        </g>

        {/* Scan line, one slow pass */}
        <rect className="bm-scanline" x="50" y="-60" width="200" height="60" fill="url(#bm-scan)" />
      </g>

      <path d={OUTLINE} className={`bm-outline ${active === "checkin" || active === null ? "is-on" : ""}`} />

      {/* Heart sits on the body's left, the viewer's right */}
      <g className={`bm-region bm-recovery ${on("recovery")}`}>
        <g className="bm-heart">
          <path d="M163 166 C159 160 150 161 150 169 C150 177 160 183 164 188 C168 183 178 177 178 169 C178 161 169 160 165 166 Z" />
        </g>
      </g>

      {/* Body: waist and hip measurement */}
      <g className={`bm-region bm-body ${on("body")}`}>
        <path d="M104 262 Q150 276 196 262" className="bm-tape" />
        <path d="M99 300 Q150 314 201 300" className="bm-tape" />
        <path d="M105 258 v8 M195 258 v8 M100 296 v8 M200 296 v8" className="bm-tick" />
      </g>

      {/* Callouts: words used in the list, nothing the app does not measure */}
      <g className={`bm-call ${on("recovery")}`}>
        <path d="M176 44 H262" /><circle cx="176" cy="44" r="2.5" />
        <text x="270" y="48">Sleep</text>
      </g>
      <g className={`bm-call ${on("recovery")}`}>
        <path d="M180 174 H262" /><circle cx="180" cy="174" r="2.5" />
        <text x="270" y="170">Resting heart rate</text>
        <text x="270" y="188" className="bm-sub">HRV</text>
      </g>
      <g className={`bm-call ${on("body")}`}>
        <path d="M197 262 H262" /><circle cx="197" cy="262" r="2.5" />
        <text x="270" y="258">Waist and hips</text>
        <text x="270" y="276" className="bm-sub">Bodyweight trend</text>
      </g>
      <g className={`bm-call ${on("strength")}`}>
        <path d="M198 392 H262" /><circle cx="198" cy="392" r="2.5" />
        <text x="270" y="388">Strength</text>
        <text x="270" y="406" className="bm-sub">Sets, reps and load</text>
      </g>
      <g className={`bm-call ${active === "checkin" || active === null ? "is-on" : ""}`}>
        <path d="M196 600 H262" /><circle cx="196" cy="600" r="2.5" />
        <text x="270" y="596">Weekly check-in</text>
        <text x="270" y="614" className="bm-sub">All of it, reviewed</text>
      </g>

      <style>{`
        .bm { width: 100%; height: auto; display: block; overflow: visible; }
        .bm-contour { stroke: rgba(255,255,255,0.07); stroke-width: 0.6; }
        .bm-outline { fill: none; stroke: rgba(255,255,255,0.45); stroke-width: 1.1; transition: stroke 0.5s var(--ease-out); }
        .bm-outline.is-on { stroke: #FFDE02; }
        .bm-region { opacity: 0.18; transition: opacity 0.5s var(--ease-out); }
        .bm-region.is-on { opacity: 1; }
        .bm-strength { fill: rgba(255,222,2,0.32); stroke: rgba(255,222,2,0.8); stroke-width: 0.8; }
        .bm-heart path { fill: #FFDE02; }
        .bm-heart { transform-box: fill-box; transform-origin: center; animation: bm-beat 0.94s var(--ease-out) infinite; }
        .bm-tape { fill: none; stroke: #FFDE02; stroke-width: 2.4; stroke-dasharray: 4 3; stroke-linecap: round; }
        .bm-tick { stroke: #FFDE02; stroke-width: 2; stroke-linecap: round; }
        .bm-call { opacity: 0.3; transition: opacity 0.5s var(--ease-out); }
        .bm-call.is-on { opacity: 1; }
        .bm-call path { stroke: rgba(255,255,255,0.5); stroke-width: 1; fill: none; }
        .bm-call circle { fill: #FFDE02; }
        .bm-call text { fill: #fff; font-family: var(--font-body); font-size: 14px; font-weight: 700; }
        .bm-call text.bm-sub { fill: var(--text-muted); font-size: 12px; font-weight: 500; }
        .bm-scanline { animation: bm-scan 7s cubic-bezier(.45,0,.55,1) infinite; }
        @keyframes bm-scan { 0% { transform: translateY(0); opacity: 0; } 8% { opacity: 1; } 55% { transform: translateY(700px); opacity: 1; } 56%, 100% { transform: translateY(700px); opacity: 0; } }
        @keyframes bm-beat { 0%, 100% { transform: scale(1); } 14% { transform: scale(1.18); } 28% { transform: scale(1); } 42% { transform: scale(1.1); } 60% { transform: scale(1); } }
        @media (max-width: 560px) {
          .bm-call text { font-size: 19px; }
          .bm-call text.bm-sub { font-size: 15px; }
        }
        @media (prefers-reduced-motion: reduce) { .bm-heart, .bm-scanline { animation: none; } .bm-scanline { display: none; } }
      `}</style>
    </svg>
  );
}
