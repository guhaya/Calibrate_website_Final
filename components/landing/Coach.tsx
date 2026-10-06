import Image from "next/image";
import Link from "next/link";
import { Arrow, Check, CountUp } from "./ui";

const creds = [
  "Level 4 Personal Training Certification",
  "Sports Nutrition Specialist",
  "DMAIC-certified performance protocol",
  "Competitive athlete background",
];

const stats = [
  { value: "45", label: "Clients coached" },
  { value: "10", label: "Countries reached" },
  { value: "5+", label: "Years coaching" },
];

export default function Coach() {
  return (
    <section className="sec coach">
      <div className="wrap coach-grid">
        <div className="coach-photo rv rv-left">
          <div className="coach-frame" aria-hidden="true" />
          <div className="coach-img">
            <Image
              src="/media/coach/guhay-016.webp"
              alt="Guhayavarman, founder and head coach of CALIBRATE, in a black t-shirt with arms crossed"
              fill
              sizes="(max-width: 900px) 90vw, 520px"
              style={{ objectFit: "cover", objectPosition: "50% 20%" }}
            />
          </div>
          <div className="float-card coach-tag bob-2">
            <Image src="/media/brand/gvnfit-wordmark-white.png" alt="Guhayavarman Fitness" width={150} height={19} style={{ height: "auto" }} />
            <p className="mono c-muted" style={{ marginTop: 8 }}>Chennai, Tamil Nadu</p>
          </div>
        </div>

        <div className="coach-copy">
          <h2 className="display-lg rv">
            Why I built CALIBRATE.
          </h2>
          <p className="lead rv" style={{ ["--d" as string]: "140ms" }}>
            I started CALIBRATE because I kept seeing the same pattern: smart, motivated people failing to reach their
            goals, not from lack of effort, but from lack of the right system. Engineers, founders and product managers
            putting in the work and getting nowhere.
          </p>
          <p className="body-sm rv" style={{ ["--d" as string]: "200ms" }}>
            The fitness industry profits from confusion. CALIBRATE is built on the opposite principle: the same
            data-driven frameworks used in precision engineering, applied to your body.
          </p>
          <p className="coach-sign rv" style={{ ["--d" as string]: "240ms" }}>
            Guhayavarman <span className="c-muted">· Founder &amp; Head Coach, GVNFIT</span>
          </p>

          <ul className="coach-creds rv" style={{ ["--d" as string]: "280ms" }}>
            {creds.map((c) => (
              <li key={c}><Check />{c}</li>
            ))}
          </ul>

          <div className="coach-stats rv" style={{ ["--d" as string]: "340ms" }}>
            {stats.map((s) => (
              <div key={s.label}>
                <CountUp value={s.value} className="coach-stat-v" />
                <p className="mono c-muted">{s.label}</p>
              </div>
            ))}
          </div>

          <Link href="/coaches" className="btn-secondary rv" style={{ ["--d" as string]: "400ms", alignSelf: "flex-start" }}>
            Meet the full coaching team <Arrow />
          </Link>
        </div>
      </div>

      <style>{`
        .coach-grid { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 80px; align-items: center; }
        .coach-photo { position: relative; padding: 0 24px 24px 0; }
        .coach-frame { position: absolute; inset: 24px 0 0 24px; border-radius: 32px; background: var(--accent); }
        .coach-img { position: relative; aspect-ratio: 4 / 5; border-radius: 32px; overflow: hidden; border: 1px solid var(--line-strong); background: #111; }
        .coach-tag { left: -18px; bottom: 64px; }
        .coach-copy { display: flex; flex-direction: column; gap: 22px; align-items: flex-start; }
        .coach-sign { font-weight: 800; font-size: 15px; }
        .coach-creds { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 12px 20px; }
        .coach-creds li { display: flex; gap: 10px; align-items: flex-start; font-size: 14px; color: #E4E5EA; line-height: 1.45; }
        .coach-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 24px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .coach-stat-v { font-family: var(--font-display); font-size: clamp(44px, 4.4vw, 64px); line-height: 1; color: #fff; display: block; margin-bottom: 6px; }
        @media (max-width: 900px) {
          .coach-grid { grid-template-columns: 1fr; gap: 56px; }
          .coach-photo { max-width: 460px; margin: 0 auto; width: 100%; }
        }
        @media (max-width: 520px) {
          .coach-creds { grid-template-columns: 1fr; }
          .coach-tag { left: 8px; bottom: 40px; }
        }
      `}</style>
    </section>
  );
}
