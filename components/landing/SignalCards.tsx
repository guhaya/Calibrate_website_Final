import Image from "next/image";

// Three tall cards, each with a real Vemisis screen and a floating data chip
// that spills over the card edge. Chip values match the sample data shown on
// the screens.
const cards = [
  {
    key: "score",
    title: "One number for your week",
    body: "Training, nutrition, sleep and habits rolled into a single score, with the biggest opportunity called out for you.",
    img: "/media/app/insights.webp",
    alt: "Vemisis Insights screen showing an overall score of 62 out of 100",
    chipLabel: "Overall score",
    chipValue: "62 / 100",
    chipNote: "+22 from last week",
    tint: "rgba(255, 222, 2, 0.26)",
  },
  {
    key: "nutrition",
    title: "Know exactly what you've eaten",
    body: "Calories and macros against the targets your coach set, with your usual meals one tap away.",
    img: "/media/app/nutrition.webp",
    alt: "Vemisis Nutrition screen showing 1,300 of 2,200 kcal and macro bars",
    chipLabel: "Protein today",
    chipValue: "96 / 180 g",
    chipNote: "84 g to go",
    tint: "rgba(52, 211, 153, 0.22)",
  },
  {
    key: "recovery",
    title: "Train hard, or take it easy",
    body: "HRV, resting heart rate and sleep from your wearable, turned into a daily readiness call.",
    img: "/media/app/recovery.webp",
    alt: "Vemisis Recovery screen showing a recovery score of 72 out of 100",
    chipLabel: "Recovery",
    chipValue: "72 / 100",
    chipNote: "Ready to train",
    tint: "rgba(139, 132, 255, 0.24)",
  },
];

export default function SignalCards() {
  return (
    <section className="sec sig" aria-labelledby="sig-title">
      <div className="wrap">
        <div className="sig-head">
          <h2 id="sig-title" className="display-lg rv">Start every day knowing where you stand.</h2>
          <p className="lead rv" style={{ ["--d" as string]: "80ms" }}>
            Your body&apos;s signals, turned into three clear numbers in the Vemisis app. You see them every morning, and so does your coach.
          </p>
        </div>

        <div className="sig-grid">
          {cards.map((c, i) => (
            <article key={c.key} className="sig-card rv" style={{ ["--d" as string]: `${i * 90}ms`, ["--tint" as string]: c.tint }}>
              <div className="sig-copy">
                <h3 className="sig-title">{c.title}</h3>
                <p className="sig-body">{c.body}</p>
              </div>
              <div className="sig-shot">
                <div className="device sig-device">
                  <div className="device-screen">
                    <Image src={c.img} alt={c.alt} fill sizes="(max-width: 900px) 70vw, 300px" style={{ objectFit: "cover", objectPosition: "top" }} />
                  </div>
                </div>
              </div>
              <div className="sig-chip" aria-hidden="true">
                <span className="sig-chip-label">{c.chipLabel}</span>
                <span className="sig-chip-value">{c.chipValue}</span>
                <span className="sig-chip-note">{c.chipNote}</span>
              </div>
            </article>
          ))}
        </div>
        <p className="sig-sample">Screens show sample data.</p>
      </div>

      <style>{`
        .sig-head { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 24px 64px; align-items: end; margin-bottom: 56px; }
        .sig-head .lead { max-width: 520px; }
        .sig-grid { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1fr); gap: 20px; align-items: start; }
        /* Staggered, not three identical tiles in a row. */
        .sig-card:nth-child(2) { margin-top: 56px; }
        .sig-card:nth-child(3) { margin-top: 112px; }
        .sig-card {
          position: relative; display: flex; flex-direction: column; min-height: 640px; padding: 32px 30px 0;
          border-radius: 32px; overflow: visible; isolation: isolate;
          background:
            radial-gradient(120% 70% at 50% 100%, var(--tint), transparent 65%),
            linear-gradient(180deg, #121216 0%, #0B0B0E 100%);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 40px 80px -40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06);
        }
        .sig-copy { display: flex; flex-direction: column; gap: 10px; }
        .sig-title { font-size: clamp(22px, 1.9vw, 27px); line-height: 1.18; text-wrap: balance; }
        .sig-body { font-size: 15px; line-height: 1.6; color: #C9CBD3; max-width: 320px; }
        .sig-shot { position: relative; margin-top: auto; padding-top: 28px; display: flex; justify-content: center; overflow: hidden; border-radius: 0 0 32px 32px; height: 360px; }
        .sig-device {
          width: 72%; align-self: flex-start; flex: none;
          transition: transform 0.7s var(--ease-out);
        }
        .sig-card:hover .sig-device { transform: translateY(-10px); }
        .sig-chip {
          position: absolute; left: -14px; bottom: 120px; z-index: 2;
          display: flex; flex-direction: column; gap: 2px; padding: 14px 18px; min-width: 172px;
          border-radius: 18px; background: rgba(20,20,24,0.78); border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 24px 48px -16px rgba(0,0,0,0.7);
        }
        .sig-chip-label { font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); }
        .sig-chip-value { font-family: var(--font-display); font-size: 30px; line-height: 1.05; color: #fff; }
        .sig-chip-note { font-size: 12.5px; font-weight: 700; color: var(--accent); }
        .sig-sample { margin-top: 18px; font-size: 12.5px; color: var(--text-muted); }

        @media (max-width: 1000px) {
          .sig-grid { grid-template-columns: 1fr; max-width: 520px; margin: 0 auto; }
          .sig-card:nth-child(2), .sig-card:nth-child(3) { margin-top: 0; }
          .sig-card { min-height: 0; }
          .sig-chip { left: 12px; }
        }
        @media (max-width: 860px) {
          .sig-head { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) { .sig-device { transition: none; } .sig-card:hover .sig-device { transform: none; } }
      `}</style>
    </section>
  );
}
