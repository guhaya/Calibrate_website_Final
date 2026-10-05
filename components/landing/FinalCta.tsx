import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./ui";

export default function FinalCta() {
  return (
    <section className="sec-tight fcta">
      <div className="wrap-wide">
        <div className="panel-yellow fcta-panel rv rv-scale">
          <div className="fcta-grid-bg" aria-hidden="true" />
          <svg className="fcta-ribbon" viewBox="0 0 1100 600" preserveAspectRatio="none" aria-hidden="true">
            <path d="M480 720 C 600 600, 680 440, 800 320 S 1000 70, 1180 50" stroke="#050506" strokeWidth="90" fill="none" opacity="0.92" />
            <path d="M462 702 C 582 582, 662 422, 782 302 S 982 52, 1180 32" stroke="#FFDE02" strokeWidth="3" fill="none" opacity="0.55" />
          </svg>

          <div className="fcta-copy">
            <span className="fcta-chip">Free 30-minute consultation</span>
            <h2 className="fcta-title">
              Your body is a process. Let&apos;s calibrate it.
            </h2>
            <p className="fcta-lead">
              Tell us where you are and where you want to be. We&apos;ll show you exactly how CALIBRATE and the Vemisis app
              would work around your schedule. No pressure, no commitment.
            </p>
            <div className="fcta-ctas">
              <Link href="/book" className="fcta-btn">Book your free call <Arrow /></Link>
              <Link href="/apply" className="fcta-link">Or apply directly <Arrow /></Link>
            </div>
          </div>

          <div className="fcta-coach">
            <Image
              src="/media/coach/cut-163.webp"
              alt="Coach Guhayavarman checking the Vemisis app on his phone"
              width={739}
              height={1400}
              sizes="(max-width: 900px) 70vw, 460px"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .fcta-panel { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); align-items: end; min-height: 600px; padding: 0 0 0 72px; }
        .fcta-grid-bg {
          position: absolute; inset: 0; z-index: -2; opacity: 0.5;
          background-image: linear-gradient(rgba(5,5,6,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(5,5,6,0.08) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .fcta-ribbon { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -1; overflow: visible; }
        .fcta-copy { padding: 88px 0; display: flex; flex-direction: column; gap: 22px; align-items: flex-start; align-self: center; }
        .fcta-chip { display: inline-flex; padding: 8px 14px; border-radius: 999px; background: #050506; color: var(--accent); font-size: 12px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; }
        .fcta-title { font-family: var(--font-display); font-size: clamp(42px, 6vw, 96px); line-height: 0.92; color: #050506; text-wrap: balance; }
        .fcta-lead { font-size: 17px; line-height: 1.6; color: rgba(5,5,6,0.78); max-width: 520px; font-weight: 500; }
        .fcta-ctas { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; margin-top: 6px; }
        .fcta-btn {
          display: inline-flex; align-items: center; gap: 10px; padding: 19px 32px; border-radius: 999px;
          background: #050506; color: #fff; text-decoration: none;
          font-weight: 800; font-size: 14.5px; letter-spacing: 0.06em; text-transform: uppercase;
          transition: transform 0.35s var(--ease-out), box-shadow 0.35s var(--ease-out);
        }
        .fcta-btn:hover { transform: translateY(-2px); box-shadow: 0 18px 40px -12px rgba(0,0,0,0.6); }
        .fcta-btn svg, .fcta-link svg { transition: transform 0.3s var(--ease-out); }
        .fcta-btn:hover svg, .fcta-link:hover svg { transform: translateX(3px); }
        .fcta-link { display: inline-flex; align-items: center; gap: 8px; color: #050506; font-weight: 800; font-size: 14.5px; text-decoration: none; border-bottom: 2px solid #050506; padding-bottom: 2px; }
        .fcta-coach { align-self: end; justify-self: center; width: 100%; max-width: 360px; margin-top: 80px; filter: drop-shadow(0 30px 40px rgba(0,0,0,0.35)); }
        @media (max-width: 900px) {
          .fcta-panel { grid-template-columns: 1fr; padding: 0 28px; min-height: 0; }
          .fcta-copy { padding: 64px 0 8px; }
          .fcta-coach { max-width: 320px; margin-top: 16px; }
          .fcta-ribbon { top: auto; height: 50%; }
        }
      `}</style>
    </section>
  );
}
