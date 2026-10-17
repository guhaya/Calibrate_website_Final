import Link from "next/link";
import { EyeOff, ShieldCheck, Trash2, Unplug } from "lucide-react";

// Every line here is backed by the privacy policy (/privacy-policy).
const points = [
  { Icon: ShieldCheck, text: "We do not sell your personal information." },
  { Icon: EyeOff, text: "Progress photos and health data are visible only to your coach." },
  { Icon: Unplug, text: "Disconnect Apple Health or Health Connect at any time." },
  { Icon: Trash2, text: "Delete your account and data from the app's Profile screen." },
];

// Combination-safe dial: brushed-steel bezel, rubber ring, numbered face and knob.
// The face and knob turn together like someone dialling a combination.
const TICKS = Array.from({ length: 100 }, (_, i) => i);
function SafeDial() {
  return (
    <div className="trust-lock" aria-hidden="true">
      <div className="sd-bezel">
        <div className="sd-rubber">
          <div className="sd-turn">
            <svg className="sd-face" viewBox="0 0 200 200">
              <defs>
                <radialGradient id="sd-face-g" cx="50%" cy="38%" r="65%">
                  <stop offset="0%" stopColor="#3A3C42" />
                  <stop offset="100%" stopColor="#1B1C20" />
                </radialGradient>
              </defs>
              <circle cx="100" cy="100" r="100" fill="url(#sd-face-g)" />
              {TICKS.map((i) => {
                const major = i % 10 === 0;
                const mid = i % 5 === 0;
                const len = major ? 13 : mid ? 9 : 6;
                return (
                  <line
                    key={i}
                    x1="100" y1="5" x2="100" y2={5 + len}
                    stroke={major ? "#F2F2F4" : "rgba(242,242,244,0.55)"}
                    strokeWidth={major ? 1.8 : 1}
                    transform={`rotate(${i * 3.6} 100 100)`}
                  />
                );
              })}
              {TICKS.filter((i) => i % 10 === 0).map((i) => (
                <text
                  key={i}
                  x="100" y="35"
                  textAnchor="middle"
                  fontSize="11.5"
                  fontWeight="600"
                  fill="#F2F2F4"
                  fontFamily="'JetBrains Mono', ui-monospace, monospace"
                  transform={`rotate(${i * 3.6} 100 100)`}
                >
                  {i}
                </text>
              ))}
            </svg>
            <div className="sd-accent">
              <div className="sd-knob" />
            </div>
          </div>
        </div>
      </div>
      <span className="sd-index" />
    </div>
  );
}

export default function TrustPanel() {
  return (
    <section className="sec-tight trust" aria-labelledby="trust-title">
      <div className="wrap-wide">
        <div className="trust-panel rv rv-scale">
          <SafeDial />

          <div className="trust-copy">
            <h2 id="trust-title" className="trust-title">Only you and your coach see your data.</h2>
            <p className="trust-lead">
              You share bloodwork, body measurements and progress photos with us. We protect them with encryption in transit and strict access controls.
            </p>
            <ul className="trust-points">
              {points.map(({ Icon, text }) => (
                <li key={text}><Icon size={18} strokeWidth={2.2} aria-hidden="true" />{text}</li>
              ))}
            </ul>
            <Link href="/privacy-policy" className="trust-link">Read the privacy policy</Link>
          </div>
        </div>
      </div>

      <style>{`
        .trust-panel {
          position: relative; overflow: hidden; isolation: isolate; border-radius: 36px;
          display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); align-items: center; gap: 32px 64px;
          padding: 88px 80px;
          background:
            radial-gradient(70% 90% at 15% 100%, rgba(255,222,2,0.12), transparent 60%),
            radial-gradient(60% 80% at 100% 0%, rgba(52,211,153,0.10), transparent 60%),
            linear-gradient(160deg, #141418 0%, #08080A 100%);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .trust-lock { position: relative; width: 100%; max-width: 320px; aspect-ratio: 1; justify-self: center; container-type: inline-size; }
        .sd-bezel {
          position: absolute; inset: 0; border-radius: 50%; padding: 6.5cqi;
          background:
            radial-gradient(circle at 50% 50%, transparent 62%, rgba(0,0,0,0.35) 70%, transparent 71%),
            conic-gradient(from 210deg, #6C6F76, #C9CCD2, #5A5D63, #2A2C31, #8E9198, #D4D7DC, #4C4F55, #2A2C31, #6C6F76);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.45),
            inset 0 -2px 4px rgba(0,0,0,0.6),
            0 0 0 1px rgba(0,0,0,0.6),
            0 40px 70px -20px rgba(0,0,0,0.85),
            0 0 90px -10px rgba(255,222,2,0.12);
        }
        .sd-rubber {
          width: 100%; height: 100%; border-radius: 50%; padding: 3.5cqi;
          background: radial-gradient(circle, #1A1B1F 60%, #0B0B0D 100%);
          box-shadow: inset 0 3px 8px rgba(0,0,0,0.9), inset 0 -1px 0 rgba(255,255,255,0.08);
        }
        .sd-turn { position: relative; width: 100%; height: 100%; border-radius: 50%; animation: sd-dial 14s cubic-bezier(.65,0,.35,1) infinite; }
        .sd-face { position: absolute; inset: 0; width: 100%; height: 100%; border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08); }
        .sd-accent {
          position: absolute; inset: 28%; border-radius: 50%; padding: 1.6cqi;
          background: linear-gradient(160deg, #FFE94D, #E6C200 55%, #A88E00);
          box-shadow: 0 0 0 1px rgba(0,0,0,0.5), 0 6px 18px rgba(0,0,0,0.6), 0 0 24px rgba(255,222,2,0.25);
        }
        .sd-knob {
          width: 100%; height: 100%; border-radius: 50%;
          background:
            radial-gradient(circle, rgba(255,255,255,0.22), transparent 55%),
            repeating-radial-gradient(circle, rgba(255,255,255,0.05) 0 1px, rgba(0,0,0,0.04) 1px 2px),
            conic-gradient(from 20deg, #7D8087, #E9EBEE 12%, #8C8F95 25%, #5B5E64 37%, #D9DCE0 50%, #7D8087 62%, #4F5258 75%, #CDD0D4 88%, #7D8087);
          box-shadow: inset 0 0 0 1.2cqi rgba(20,20,24,0.25), inset 0 0 0 1.5cqi rgba(255,255,255,0.35), inset 0 -6px 14px rgba(0,0,0,0.45);
          outline: 1px dashed rgba(255,255,255,0.35); outline-offset: -3.4cqi;
        }
        .sd-index {
          position: absolute; left: 50%; top: 1.2cqi; translate: -50% 0; z-index: 2;
          width: 0; height: 0; border-left: 2.6cqi solid transparent; border-right: 2.6cqi solid transparent; border-top: 4cqi solid var(--accent);
          filter: drop-shadow(0 2px 3px rgba(0,0,0,0.6));
        }
        @keyframes sd-dial {
          0%, 8% { transform: rotate(0deg); }
          30%, 38% { transform: rotate(-126deg); }
          58%, 66% { transform: rotate(54deg); }
          86%, 100% { transform: rotate(0deg); }
        }
        @media (prefers-reduced-motion: reduce) { .sd-turn { animation: none; } }
        .trust-copy { display: flex; flex-direction: column; gap: 16px; align-items: flex-start; }
        .trust-title { font-family: var(--font-display); font-size: clamp(44px, 5vw, 76px); line-height: 0.95; text-transform: uppercase; }
        .trust-lead { font-size: 17px; line-height: 1.6; color: #C9CBD3; max-width: 560px; }
        .trust-points { list-style: none; display: grid; gap: 12px; margin-top: 6px; }
        .trust-points li { display: flex; align-items: flex-start; gap: 12px; font-size: 15.5px; font-weight: 600; color: #fff; line-height: 1.45; }
        .trust-points li svg { color: var(--accent); margin-top: 2px; flex-shrink: 0; }
        .trust-link { display: inline-flex; align-items: center; min-height: 44px; margin-top: 4px; color: #fff; font-weight: 700; text-decoration: underline; text-underline-offset: 4px; text-decoration-color: var(--accent); }
        @media (max-width: 900px) {
          .trust-panel { grid-template-columns: 1fr; padding: 56px 28px; text-align: left; }
          .trust-lock { max-width: 200px; justify-self: start; }
        }
      `}</style>
    </section>
  );
}
