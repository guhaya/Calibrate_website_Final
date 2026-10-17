import Link from "next/link";
import { EyeOff, ShieldCheck, Trash2, Unplug } from "lucide-react";

// Every line here is backed by the privacy policy (/privacy-policy).
const points = [
  { Icon: ShieldCheck, text: "We do not sell your personal information." },
  { Icon: EyeOff, text: "Progress photos and health data are visible only to your coach." },
  { Icon: Unplug, text: "Disconnect Apple Health or Health Connect at any time." },
  { Icon: Trash2, text: "Delete your account and data from the app's Profile screen." },
];

export default function TrustPanel() {
  return (
    <section className="sec-tight trust" aria-labelledby="trust-title">
      <div className="wrap-wide">
        <div className="trust-panel rv rv-scale">
          <svg className="trust-lock" viewBox="0 0 200 240" aria-hidden="true">
            <defs>
              <linearGradient id="tl-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
              </linearGradient>
              <linearGradient id="tl-edge" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
                <stop offset="60%" stopColor="rgba(255,255,255,0.08)" />
                <stop offset="100%" stopColor="rgba(255,222,2,0.4)" />
              </linearGradient>
            </defs>
            <path d="M54 104 V72 a46 46 0 0 1 92 0 V104" fill="none" stroke="url(#tl-edge)" strokeWidth="16" strokeLinecap="round" />
            <rect x="22" y="100" width="156" height="128" rx="30" fill="url(#tl-body)" stroke="url(#tl-edge)" strokeWidth="2" />
            <circle cx="100" cy="156" r="14" fill="rgba(255,222,2,0.85)" />
            <rect x="94" y="164" width="12" height="30" rx="6" fill="rgba(255,222,2,0.85)" />
          </svg>

          <div className="trust-copy">
            <p className="mono c-accent">Built for privacy</p>
            <h2 id="trust-title" className="trust-title">Your data is yours.</h2>
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
        .trust-lock { width: 100%; max-width: 300px; justify-self: center; filter: drop-shadow(0 40px 60px rgba(0,0,0,0.6)); }
        .trust-copy { display: flex; flex-direction: column; gap: 16px; align-items: flex-start; }
        .trust-title { font-family: var(--font-display); font-size: clamp(44px, 5vw, 76px); line-height: 0.95; text-transform: uppercase; }
        .trust-lead { font-size: 17px; line-height: 1.6; color: #C9CBD3; max-width: 560px; }
        .trust-points { list-style: none; display: grid; gap: 12px; margin-top: 6px; }
        .trust-points li { display: flex; align-items: flex-start; gap: 12px; font-size: 15.5px; font-weight: 600; color: #fff; line-height: 1.45; }
        .trust-points li svg { color: var(--accent); margin-top: 2px; flex-shrink: 0; }
        .trust-link { display: inline-flex; align-items: center; min-height: 44px; margin-top: 4px; color: #fff; font-weight: 700; text-decoration: underline; text-underline-offset: 4px; text-decoration-color: var(--accent); }
        @media (max-width: 900px) {
          .trust-panel { grid-template-columns: 1fr; padding: 56px 28px; text-align: left; }
          .trust-lock { max-width: 170px; justify-self: start; }
        }
      `}</style>
    </section>
  );
}
