import Image from "next/image";
import Link from "next/link";
import { Arrow, Hl } from "./ui";

const steps = [
  {
    n: "01",
    when: "30 minutes",
    title: "Free consultation",
    body: "A no-pressure call to understand where you are, what you've tried, and what you actually want to achieve.",
    img: "/media/life/me-video-call.webp",
    alt: "Coach on a video consultation call",
    kind: "photo" as const,
  },
  {
    n: "02",
    when: "Within 5 days",
    title: "Your personal protocol",
    body: "Training and nutrition built from scratch around your schedule, then loaded straight into your Vemisis app.",
    img: "/media/app/diet-plan.webp",
    alt: "Vemisis plan screen with daily calorie and protein targets",
    kind: "screen" as const,
  },
  {
    n: "03",
    when: "Every week",
    title: "Weekly calibration",
    body: "You check in, your coach analyses the data and adjusts. Consistency becomes a system, not a personality trait.",
    img: "/media/app/notifications.webp",
    alt: "Vemisis notifications showing coach updates and weekly consistency",
    kind: "screen" as const,
  },
];

export default function Steps() {
  return (
    <section className="sec steps">
      <div className="wrap">
        <div className="sec-head">
          <span className="tag rv">Getting started</span>
          <h2 className="display-lg rv balance" style={{ ["--d" as string]: "80ms" }}>
            Start in <Hl>three steps.</Hl>
          </h2>
          <p className="lead rv" style={{ ["--d" as string]: "160ms", maxWidth: 520 }}>
            From first conversation to your first calibrated week, here is exactly what happens.
          </p>
        </div>

        <div className="st-grid">
          <div className="st-line rv" aria-hidden="true"><span /></div>
          {steps.map((s, i) => (
            <article key={s.n} className="card st-card rv" style={{ ["--d" as string]: `${i * 140}ms` }}>
              <div className="st-num">{s.n}</div>
              <div className={`st-media st-${s.kind}`}>
                {s.kind === "photo" ? (
                  <Image src={s.img} alt={s.alt} fill sizes="(max-width: 900px) 90vw, 380px" style={{ objectFit: "cover", objectPosition: "center 30%" }} />
                ) : (
                  <Image src={s.img} alt={s.alt} width={640} height={1391} sizes="220px" className="st-shot" />
                )}
              </div>
              <div className="st-body">
                <p className="mono c-accent">{s.when}</p>
                <h3 className="display-sm">{s.title}</h3>
                <p className="body-sm">{s.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 56 }}>
          <Link href="/book" className="btn-primary btn-primary-lg">Book your free consultation <Arrow /></Link>
        </div>
      </div>

      <style>{`
        .st-grid { position: relative; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
        .st-line { position: absolute; left: 16%; right: 16%; top: 31px; height: 2px; background: rgba(255,255,255,0.08); z-index: 0; }
        .st-line span { position: absolute; inset: 0; background: linear-gradient(90deg, var(--accent), #FFE85C); transform: scaleX(0); transform-origin: left; transition: transform 1.6s var(--ease-out) 0.4s; box-shadow: 0 0 14px rgba(255,222,2,0.6); }
        .st-line.in-view span { transform: scaleX(1); }
        .st-card { padding: 0; display: flex; flex-direction: column; z-index: 1; overflow: visible; background: transparent; border: none; }
        .st-num {
          width: 64px; height: 64px; border-radius: 50%; margin: 0 auto 22px;
          display: grid; place-items: center;
          font-family: var(--font-display); font-size: 24px; color: #050506;
          background: var(--accent); box-shadow: 0 0 0 8px var(--bg-base), 0 0 40px rgba(255,222,2,0.4);
        }
        .st-media { position: relative; height: 260px; border-radius: 24px 24px 0 0; overflow: hidden; border: 1px solid var(--line); border-bottom: none; background: #101013; }
        .st-screen { background: radial-gradient(80% 90% at 50% 100%, rgba(255,222,2,0.22), #0E0E11 70%); }
        .st-shot { position: absolute; left: 50%; top: 28px; width: 58%; height: auto; transform: translateX(-50%); border-radius: 22px 22px 0 0; border: 1px solid var(--line-strong); transition: transform 0.7s var(--ease-out); }
        .st-card:hover .st-shot { transform: translateX(-50%) translateY(-8px); }
        .st-body { padding: 26px 26px 30px; display: flex; flex-direction: column; gap: 10px; background: var(--surface-1); border: 1px solid var(--line); border-top: none; border-radius: 0 0 24px 24px; flex: 1; }
        @media (max-width: 900px) {
          .st-grid { grid-template-columns: 1fr; gap: 40px; max-width: 480px; margin: 0 auto; }
          .st-line { left: 50%; right: auto; width: 2px; top: 32px; bottom: 32px; height: auto; }
          .st-line span { transform: scaleY(0); transform-origin: top; }
          .st-line.in-view span { transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
