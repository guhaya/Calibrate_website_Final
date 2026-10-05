"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Arrow, Check, Hl } from "./ui";

const phases = [
  {
    letter: "D",
    word: "Define",
    week: "Week 0",
    desc: "Constraint mapping around your actual work schedule, lifestyle and body. We don't fit you into a programme, we build the programme around you.",
    app: ["Goal and starting point captured at onboarding", "Your calendar, equipment and food habits mapped"],
    img: "/media/app/onboarding.webp",
    alt: "Vemisis onboarding screen asking for your main goal",
  },
  {
    letter: "M",
    word: "Measure",
    week: "Every day",
    desc: "Bodyweight trends, training performance, nutrition compliance, energy and sleep. Measured continuously, so nothing is left to guesswork.",
    app: ["Vitals synced from Apple Health and Health Connect", "Meals, weight, sleep and water logged in seconds"],
    img: "/media/app/vitals.webp",
    alt: "Vemisis vitals screen with recovery, sleep, HRV and resting heart rate",
  },
  {
    letter: "A",
    word: "Analyse",
    week: "Every week",
    desc: "Root cause diagnosis when progress stalls. Instead of pushing harder, we identify exactly which variable is blocking results.",
    app: ["Your Vemisis Score breaks down what is driving progress", "Biggest opportunity surfaced for you and your coach"],
    img: "/media/app/insights-drivers.webp",
    alt: "Vemisis insights screen showing what is driving your score",
  },
  {
    letter: "I",
    word: "Improve",
    week: "Week by week",
    desc: "Protocol adjustments based on your real feedback loop. Nutrition targets, training volume and recovery are tuned every single week.",
    app: ["Updated macros and meal plan pushed to your phone", "Training progressions set before every session"],
    img: "/media/app/diet-plan.webp",
    alt: "Vemisis plan screen in the Improve phase with daily calorie and protein targets",
  },
  {
    letter: "C",
    word: "Control",
    week: "For life",
    desc: "Self-correcting systems that handle travel, illness and schedule changes without derailing months of progress.",
    app: ["Trends and compliance tracked against your target", "Habits that hold long after the programme ends"],
    img: "/media/app/progress.webp",
    alt: "Vemisis progress screen showing weight trend and weekly compliance",
  },
];

export default function Method({ showLink = true }: { showLink?: boolean }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: scroller, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(phases.length - 1, Math.max(0, Math.floor(v * phases.length * 0.999)));
    setActive((cur) => (cur === idx ? cur : idx));
  });

  return (
    <section className="mth" id="method">
      <div className="wrap sec-tight" style={{ paddingBottom: 0 }}>
        <div className="sec-head">
          <span className="tag rv">The CALIBRATE Method</span>
          <h2 className="display-lg rv balance" style={{ ["--d" as string]: "80ms" }}>
            Five phases. <Hl>One system.</Hl>
          </h2>
          <p className="lead rv" style={{ ["--d" as string]: "160ms", maxWidth: 640 }}>
            DMAIC is the improvement framework engineers use to perfect complex processes. CALIBRATE applies it to your
            body, and Vemisis runs it for you every day.
          </p>
        </div>
      </div>

      {/* Desktop: pinned scroll story */}
      <div className="mth-scroller" ref={scroller} style={{ height: `${phases.length * 85}vh` }}>
        <div className="mth-sticky">
          <div className="wrap mth-grid">
            <div className="mth-rail" aria-hidden="true">
              {phases.map((p, i) => (
                <div key={p.letter} className={`mth-letter ${i === active ? "is-on" : ""} ${i < active ? "is-done" : ""}`}>
                  {p.letter}
                </div>
              ))}
              <div className="mth-track"><div className="mth-fill" style={{ height: `${((active + 1) / phases.length) * 100}%` }} /></div>
            </div>

            <div className="mth-copy">
              {phases.map((p, i) => (
                <div key={p.word} className={`mth-panel ${i === active ? "is-on" : ""}`} aria-hidden={i !== active}>
                  <p className="mono c-accent">Phase 0{i + 1} · {p.week}</p>
                  <h3 className="mth-word">{p.word}</h3>
                  <p className="lead" style={{ maxWidth: 480 }}>{p.desc}</p>
                  <div className="mth-app">
                    <p className="mono" style={{ color: "#fff", marginBottom: 12 }}>In Vemisis</p>
                    {p.app.map((a) => (
                      <p key={a} className="mth-app-row"><Check />{a}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mth-visual">
              <div className="mth-halo" />
              <div className="device mth-device">
                <div className="device-screen">
                  {phases.map((p, i) => (
                    <Image
                      key={p.img}
                      src={p.img}
                      alt={p.alt}
                      fill
                      sizes="320px"
                      className={`mth-shot ${i === active ? "is-on" : ""}`}
                      style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                  ))}
                </div>
              </div>
              <div className="float-card mth-badge">
                <span className="mth-badge-letter">{phases[active].letter}</span>
                <div>
                  <p className="mono c-muted">Current phase</p>
                  <p style={{ fontWeight: 800, fontSize: 15 }}>{phases[active].word}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked cards */}
      <div className="wrap mth-mobile">
        {phases.map((p, i) => (
          <article key={p.word} className="card mth-mcard rv">
            <div className="mth-mhead">
              <span className="mth-mletter">{p.letter}</span>
              <div>
                <p className="mono c-accent">Phase 0{i + 1} · {p.week}</p>
                <h3 className="display-sm">{p.word}</h3>
              </div>
            </div>
            <p className="body-sm">{p.desc}</p>
            <div className="mth-mshot">
              <Image src={p.img} alt={p.alt} width={640} height={1391} sizes="(max-width: 600px) 70vw, 300px" />
            </div>
          </article>
        ))}
      </div>

      {showLink && (
        <div className="wrap" style={{ display: "flex", justifyContent: "center", padding: "56px 24px 0" }}>
          <Link href="/how-it-works" className="btn-secondary">Explore the full method <Arrow /></Link>
        </div>
      )}

      <style>{`
        .mth { position: relative; padding-bottom: 120px; }
        .mth-scroller { position: relative; }
        .mth-sticky { position: sticky; top: 0; height: 100vh; height: 100dvh; min-height: 640px; display: flex; align-items: center; overflow: hidden; }
        .mth-grid { display: grid; grid-template-columns: 90px minmax(0, 1fr) minmax(0, 420px); gap: 48px; align-items: center; }
        .mth-rail { position: relative; display: flex; flex-direction: column; gap: 6px; align-items: center; }
        .mth-letter {
          font-family: var(--font-display); font-size: 54px; line-height: 1.05;
          color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.22);
          transition: color 0.5s var(--ease-out), -webkit-text-stroke-color 0.5s, transform 0.5s var(--ease-out);
          position: relative; z-index: 1;
        }
        .mth-letter.is-done { -webkit-text-stroke-color: rgba(255,222,2,0.6); }
        .mth-letter.is-on { color: var(--accent); -webkit-text-stroke-color: var(--accent); transform: scale(1.18); }
        .mth-track { position: absolute; right: -14px; top: 8px; bottom: 8px; width: 2px; background: rgba(255,255,255,0.08); border-radius: 2px; }
        .mth-fill { width: 100%; background: var(--accent); border-radius: 2px; transition: height 0.6s var(--ease-out); box-shadow: 0 0 12px rgba(255,222,2,0.7); }
        .mth-copy { position: relative; min-height: 440px; }
        .mth-panel {
          position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; gap: 18px;
          opacity: 0; transform: translateY(30px); pointer-events: none;
          transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
        }
        .mth-panel.is-on { opacity: 1; transform: none; pointer-events: auto; }
        .mth-word { font-family: var(--font-display); font-size: clamp(64px, 8vw, 128px); line-height: 0.9; }
        .mth-app { margin-top: 8px; padding: 20px 22px; border-radius: 20px; background: var(--surface-1); border: 1px solid var(--line); max-width: 480px; }
        .mth-app-row { display: flex; gap: 10px; align-items: flex-start; font-size: 14.5px; color: #E4E5EA; line-height: 1.5; }
        .mth-app-row + .mth-app-row { margin-top: 10px; }
        .mth-visual { position: relative; display: grid; place-items: center; }
        .mth-halo { position: absolute; width: 440px; height: 440px; border-radius: 50%; background: radial-gradient(closest-side, rgba(255,222,2,0.28), transparent); filter: blur(10px); }
        .mth-device { width: min(300px, 26vw); max-height: 76vh; }
        .mth-shot { opacity: 0; transform: scale(1.04); transition: opacity 0.7s var(--ease-out), transform 0.9s var(--ease-out) !important; }
        .mth-shot.is-on { opacity: 1; transform: scale(1); }
        .mth-badge { position: absolute; left: -10px; bottom: 14%; display: flex; align-items: center; gap: 12px; }
        .mth-badge-letter { width: 40px; height: 40px; border-radius: 12px; background: var(--accent); color: #050506; display: grid; place-items: center; font-family: var(--font-display); font-size: 22px; }

        .mth-mobile { display: none; }
        .mth-mcard { padding: 26px 22px 0; display: flex; flex-direction: column; gap: 14px; }
        .mth-mcard + .mth-mcard { margin-top: 16px; }
        .mth-mhead { display: flex; align-items: center; gap: 14px; }
        .mth-mletter { width: 52px; height: 52px; border-radius: 16px; background: var(--accent); color: #050506; display: grid; place-items: center; font-family: var(--font-display); font-size: 28px; flex-shrink: 0; }
        .mth-mshot { margin: 6px auto 0; width: 62%; max-width: 260px; border-radius: 22px 22px 0 0; overflow: hidden; border: 1px solid var(--line-strong); border-bottom: none; max-height: 330px; }
        .mth-mshot img { width: 100%; height: auto; }

        @media (max-width: 1100px) {
          .mth-grid { grid-template-columns: 70px minmax(0, 1fr) minmax(0, 320px); gap: 32px; }
          .mth-letter { font-size: 44px; }
        }
        @media (max-width: 900px), (max-height: 600px) {
          .mth-scroller { display: none; }
          .mth-mobile { display: block; padding-top: 8px; }
        }
      `}</style>
    </section>
  );
}
