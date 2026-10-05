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

function Connectors({ flip = false }: { flip?: boolean }) {
  return (
    <svg className={`pb-svg ${flip ? "pb-out" : ""}`} viewBox="0 0 200 500" preserveAspectRatio="none" aria-hidden="true" style={flip ? { transform: "scaleX(-1)" } : undefined}>
      {ys.map((y, i) => (
        <g key={i}>
          <path d={`M0 ${y} C 110 ${y}, 90 250, 200 250`} className="pb-base" />
          <path d={`M0 ${y} C 110 ${y}, 90 250, 200 250`} className="pb-flow" style={{ animationDelay: `${i * 0.35}s` }} />
        </g>
      ))}
    </svg>
  );
}

export default function Problem() {
  return (
    <section className="sec pb">
      <div className="wrap">
        <div className="sec-head">
          <span className="tag rv">Sound familiar?</span>
          <h2 className="display-lg rv balance" style={{ ["--d" as string]: "80ms" }}>
            It&apos;s not a willpower problem. It&apos;s a <Hl>system</Hl> problem.
          </h2>
          <p className="lead rv" style={{ ["--d" as string]: "160ms", maxWidth: 620 }}>
            Smart, driven people don&apos;t fail at fitness for lack of effort. They fail because nobody built them a
            system that bends around real life. That&apos;s exactly what CALIBRATE does.
          </p>
        </div>

        <div className="pb-map rv rv-scale">
          <ul className="pb-col pb-pains">
            {pains.map((p, i) => (
              <li key={p} className="pb-item pb-pain" style={{ ["--i" as string]: i }}>
                <span className="pb-ico pb-ico-x" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                </span>
                {p}
              </li>
            ))}
          </ul>

          <Connectors />

          <div className="pb-hub">
            <div className="pb-hub-ring" />
            <div className="pb-hub-core">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <path d="M50.4 17.6 A24 24 0 1 0 50.4 46.4" stroke="#050506" strokeWidth="8.5" strokeLinecap="round" />
                <line x1="32" y1="32" x2="46" y2="23" stroke="#050506" strokeWidth="5.5" strokeLinecap="round" />
                <circle cx="32" cy="32" r="6" fill="#050506" />
              </svg>
            </div>
            <span className="mono pb-hub-label">CALIBRATE</span>
          </div>

          <Connectors flip />

          <ul className="pb-col pb-fixes">
            {fixes.map((f, i) => (
              <li key={f} className="pb-item pb-fix" style={{ ["--i" as string]: i }}>
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
          grid-template-columns: minmax(0, 1fr) minmax(60px, 150px) 170px minmax(60px, 150px) minmax(0, 1fr);
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
          transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out), border-color 0.3s;
          transition-delay: calc(var(--i) * 90ms + 200ms);
        }
        .pb-pain { color: #C9CBD3; }
        .pb-fix { color: #fff; transform: translateX(20px); transition-delay: calc(var(--i) * 90ms + 900ms); }
        .pb-fix:hover { border-color: rgba(255,222,2,0.4); }
        .pb-map.in-view .pb-item { opacity: 1; transform: none; }
        .pb-ico { width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; flex-shrink: 0; }
        .pb-ico-x { background: rgba(222,48,51,0.14); color: #F2585B; }
        .pb-ico-ok { background: var(--accent); color: #050506; }
        .pb-svg { width: 100%; height: 100%; overflow: visible; }
        .pb-base { fill: none; stroke: rgba(255,255,255,0.10); stroke-width: 1.5; vector-effect: non-scaling-stroke; }
        .pb-flow {
          fill: none; stroke: #FFDE02; stroke-width: 2; vector-effect: non-scaling-stroke;
          stroke-dasharray: 16 260; stroke-dashoffset: 276; opacity: 0;
        }
        .pb-map.in-view .pb-flow { opacity: 1; animation: pb-run 2.4s linear infinite; }
        @keyframes pb-run { to { stroke-dashoffset: 0; } }
        .pb-map.in-view .pb-out .pb-flow { animation-direction: reverse; }
        .pb-hub { position: relative; display: grid; place-items: center; align-content: center; gap: 14px; }
        .pb-hub-core {
          width: 120px; height: 120px; border-radius: 50%;
          display: grid; place-items: center;
          background: var(--accent);
          box-shadow: 0 0 0 10px rgba(255,222,2,0.12), 0 0 80px rgba(255,222,2,0.45);
          position: relative; z-index: 1;
        }
        .pb-hub-ring {
          position: absolute; width: 170px; height: 170px; border-radius: 50%;
          left: 50%; top: 50%; margin: -85px 0 0 -85px;
          border: 1px dashed rgba(255,222,2,0.4);
          animation: spin-slow 22s linear infinite;
        }
        .pb-hub-label { position: absolute; bottom: calc(50% - 112px); color: var(--accent); letter-spacing: 0.3em; }

        @media (max-width: 1000px) {
          .pb-map { grid-template-columns: 1fr; height: auto; gap: 0; }
          .pb-svg { display: none; }
          .pb-col { grid-template-rows: none; gap: 10px; }
          .pb-hub { padding: 64px 0; }
          .pb-hub::before, .pb-hub::after {
            content: ''; position: absolute; left: 50%; width: 1px; height: 40px;
            background: linear-gradient(transparent, #FFDE02);
          }
          .pb-hub::before { top: 6px; }
          .pb-hub::after { bottom: 6px; transform: rotate(180deg); }
          .pb-hub-ring { display: none; }
          .pb-hub-label { position: static; }
          .pb-item, .pb-fix { transform: translateY(16px); transition-delay: calc(var(--i) * 70ms + 100ms); }
        }
      `}</style>
    </section>
  );
}
