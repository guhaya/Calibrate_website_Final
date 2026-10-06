import Image from "next/image";
import Link from "next/link";
import { Arrow, Check } from "./ui";

const goals = [
  {
    title: "Fat Loss",
    line: "Drop body fat while holding onto every bit of muscle, without the crash-diet spiral.",
    points: ["Custom calorie and macro targets", "Strength-preserving training split", "Weekly check-in adjustments"],
    img: "/media/life/me-park-run.webp",
    alt: "Coach running outdoors at sunrise",
  },
  {
    title: "Muscle Gain",
    line: "A structured hypertrophy programme with progressive overload tracked every session.",
    points: ["Progressive overload tracking", "Surplus calibrated to your metabolism", "Video form checks on request"],
    img: "/media/life/me-bench.webp",
    alt: "Coach training on the bench press",
  },
  {
    title: "Recomposition",
    line: "Lose fat and build muscle at the same time. The hardest goal to programme, and the one CALIBRATE was built for.",
    points: ["Nutrient timing around training", "Bi-weekly composition scans", "Slowest, most rewarding path"],
    img: "/media/life/me-deadlift.webp",
    alt: "Coach performing a heavy deadlift",
  },
];

export default function Goals() {
  return (
    <section className="sec goals">
      <div className="wrap">
        <div className="sec-head left goals-head">
          <h2 className="display-lg rv">
            No generic plans. Ever.
          </h2>
          <p className="lead rv" style={{ ["--d" as string]: "100ms", maxWidth: 560 }}>
            Your programme is written for the outcome you&apos;re chasing, then rewritten every week as your body responds.
          </p>
        </div>

        <div className="goals-grid">
          {goals.map((g, i) => (
            <article key={g.title} className={`goal rv ${i === 0 ? "goal-lead" : ""}`} style={{ ["--d" as string]: `${i * 110}ms` }}>
              <Image src={g.img} alt={g.alt} fill sizes="(max-width: 900px) 100vw, 400px" className="goal-img" />
              <div className="goal-shade" />
              <div className="goal-body">
                <h3 className="goal-title">{g.title}</h3>
                <p className="goal-line">{g.line}</p>
                <ul className="goal-points">
                  {g.points.map((p) => (
                    <li key={p}><Check />{p}</li>
                  ))}
                </ul>
                <Link href="/apply" className="arrow-link goal-link">
                  Start with {g.title.toLowerCase()} <span className="ar"><Arrow size={12} /></span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <Link href="/programmes" className="arrow-link goals-more rv">
          Explore every goal we coach, including Longevity and GLP-1 Support <span className="ar"><Arrow size={12} /></span>
        </Link>
      </div>

      <style>{`
        .goals-head { margin-bottom: 56px; }
        .goals-grid { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); grid-template-rows: repeat(2, minmax(330px, auto)); gap: 20px; }
        .goal { position: relative; border-radius: 28px; overflow: hidden; min-height: 330px; isolation: isolate; border: 1px solid var(--line); }
        .goal-lead { grid-row: span 2; min-height: 680px; }
        .goal-lead .goal-title { font-size: clamp(48px, 5vw, 72px); }
        .goal-lead .goal-points { max-height: 140px; opacity: 1; margin: 4px 0 6px; }
        .goal-img { object-fit: cover; transition: transform 1.2s var(--ease-out), filter 0.6s ease; filter: saturate(0.9); z-index: -2; }
        .goal:hover .goal-img { transform: scale(1.06); filter: saturate(1.05); }
        .goal-shade { position: absolute; inset: 0; z-index: -1; background: linear-gradient(180deg, rgba(5,5,6,0.15) 0%, rgba(5,5,6,0.35) 40%, rgba(5,5,6,0.96) 78%); }
        .goal-body { position: absolute; inset: auto 0 0 0; padding: 30px 28px; display: flex; flex-direction: column; gap: 12px; }
        .goal-title { font-family: var(--font-display); font-size: clamp(40px, 3.6vw, 54px); line-height: 0.95; }
        .goal-line { font-size: 14.5px; color: #D7D9E0; line-height: 1.6; }
        .goal-points {
          list-style: none; display: grid; gap: 8px;
          max-height: 0; opacity: 0; overflow: hidden;
          transition: max-height 0.6s var(--ease-out), opacity 0.5s ease, margin 0.6s var(--ease-out);
        }
        .goal-points li { display: flex; gap: 10px; align-items: center; font-size: 14px; color: #fff; font-weight: 600; }
        .goal:hover .goal-points, .goal:focus-within .goal-points { max-height: 140px; opacity: 1; margin: 4px 0 6px; }
        .goal-link { margin-top: 4px; }
        .goals-more { margin-top: 32px; display: inline-flex; }
        @media (hover: none), (max-width: 900px) {
          .goal-points { max-height: 140px; opacity: 1; margin: 4px 0 6px; }
        }
        @media (max-width: 900px) {
          .goals-grid { grid-template-columns: 1fr; grid-template-rows: none; }
          .goal, .goal-lead { min-height: 520px; grid-row: auto; }
        }
      `}</style>
    </section>
  );
}
