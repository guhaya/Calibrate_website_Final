"use client";

import Link from "next/link";
import { useRef } from "react";
import { Arrow, Hl, Stars } from "./ui";

const transformations = [
  { name: "Marcus T.", role: "Software Engineer, 34", before: "97kg · 28% BF", after: "83kg · 16% BF", headline: "−14kg", sub: "fat lost", weeks: 14, bfFrom: 28, bfTo: 16 },
  { name: "Priya S.", role: "Marketing Director, 29", before: "65kg · 30% BF", after: "62kg · 22% BF", headline: "−8%", sub: "body fat, lean mass up", weeks: 16, bfFrom: 30, bfTo: 22 },
  { name: "James O.", role: "Teacher, 27", before: "76kg · 22% BF", after: "79kg · 13% BF", headline: "−9%", sub: "body fat while gaining 3kg", weeks: 20, bfFrom: 22, bfTo: 13 },
  { name: "Ritika M.", role: "Consultant, 31", before: "71kg · 27% BF", after: "60kg · 19% BF", headline: "−11kg", sub: "fat lost", weeks: 12, bfFrom: 27, bfTo: 19 },
];

const reviews = [
  { name: "Marcus T.", role: "Software Engineer", quote: "My coach actually cared about my specific situation and adjusted my plan when I was travelling for work. I didn't think I could look like this.", rating: 5 },
  { name: "Priya S.", role: "Marketing Director", quote: "The weekly check-ins kept me honest without feeling like I was being judged. I genuinely look forward to my workouts now.", rating: 5 },
  { name: "James O.", role: "Teacher", quote: "Turns out my nutrition was completely off and my programming was basically random. CALIBRATE fixed both, every week, real progress.", rating: 5 },
  { name: "Ritika M.", role: "Consultant", quote: "I've done three other programmes before this. None of them adjusted around my travel schedule. This one actually did.", rating: 5 },
  { name: "Devan K.", role: "Product Manager", quote: "The app makes it stupid simple to know what to do every day. No more spreadsheets, no more guessing.", rating: 4 },
];

function Review({ r }: { r: (typeof reviews)[number] }) {
  return (
    <figure className="rvw">
      <Stars n={r.rating} />
      <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>
      <figcaption>
        <span className="rvw-av">{r.name[0]}</span>
        <span>
          <strong>{r.name}</strong>
          <span className="c-muted" style={{ display: "block", fontSize: 12.5 }}>{r.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Results() {
  const rail = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: number) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".cs");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 400) + 20), behavior: "smooth" });
  };

  return (
    <section className="sec res" id="results">
      <div className="wrap">
        <div className="res-head">
          <div className="sec-head left" style={{ marginBottom: 0 }}>
            <span className="tag rv">Verified results</span>
            <h2 className="display-lg rv" style={{ ["--d" as string]: "80ms" }}>
              The numbers <Hl>don&apos;t lie.</Hl>
            </h2>
          </div>
          <div className="res-arrows rv">
            <button className="carousel-arrow" onClick={() => scrollBy(-1)} aria-label="Previous result">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3.5L5 8l5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button className="carousel-arrow" onClick={() => scrollBy(1)} aria-label="Next result">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3.5L11 8l-5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="cs-rail" ref={rail}>
        {transformations.map((t, i) => (
          <article key={t.name} className="cs rv" style={{ ["--d" as string]: `${i * 90}ms` }}>
            <div className="cs-top">
              <span className="mono c-muted">{t.role}</span>
              <span className="cs-weeks">{t.weeks} weeks</span>
            </div>
            <p className="cs-big">{t.headline}</p>
            <p className="cs-sub">{t.sub}</p>
            <div className="cs-bars" aria-label={`Body fat from ${t.bfFrom}% to ${t.bfTo}%`}>
              <div className="cs-bar">
                <span className="mono c-muted">Before</span>
                <div className="cs-track"><div className="cs-fill cs-fill-b" style={{ width: `${t.bfFrom * 2.6}%` }} /></div>
                <span className="cs-val">{t.before}</span>
              </div>
              <div className="cs-bar">
                <span className="mono c-accent">After</span>
                <div className="cs-track"><div className="cs-fill cs-fill-a" style={{ width: `${t.bfTo * 2.6}%` }} /></div>
                <span className="cs-val" style={{ color: "#fff" }}>{t.after}</span>
              </div>
            </div>
            <p className="cs-name">{t.name}</p>
          </article>
        ))}
        <Link href="/success-stories" className="cs cs-more">
          <span className="display-sm">More transformation stories</span>
          <span className="arrow-link" style={{ marginTop: 16 }}>Read them <span className="ar"><Arrow size={12} /></span></span>
        </Link>
      </div>

      <div className="rvw-rows">
        <div className="mq" style={{ ["--mq-dur" as string]: "60s" }}>
          <div className="mq-track">
            {[...reviews, ...reviews].map((r, i) => <Review key={`a${i}`} r={r} />)}
          </div>
        </div>
        <div className="mq" style={{ ["--mq-dur" as string]: "70s" }}>
          <div className="mq-track rev">
            {[...reviews.slice(2), ...reviews.slice(0, 2), ...reviews.slice(2), ...reviews.slice(0, 2)].map((r, i) => <Review key={`b${i}`} r={r} />)}
          </div>
        </div>
      </div>

      <style>{`
        .res-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; margin-bottom: 48px; }
        .res-arrows { display: flex; gap: 10px; }
        .cs-rail {
          display: flex; gap: 20px; overflow-x: auto; scroll-snap-type: x mandatory;
          --rail-pad: max(24px, calc((100vw - var(--container)) / 2 + 24px));
          padding: 4px var(--rail-pad) 24px;
          scroll-padding-inline: var(--rail-pad);
          scrollbar-width: none;
        }
        .cs-rail::-webkit-scrollbar { display: none; }
        .cs {
          scroll-snap-align: start; flex: 0 0 min(420px, 84vw);
          border-radius: 28px; padding: 30px; min-height: 440px;
          background: var(--surface-1); border: 1px solid var(--line);
          display: flex; flex-direction: column; gap: 6px; position: relative; overflow: hidden;
          transition: border-color 0.3s ease, transform 0.5s var(--ease-out);
        }
        .cs:hover { border-color: rgba(255,222,2,0.4); }
        .cs::after { content: ''; position: absolute; right: -80px; top: -80px; width: 220px; height: 220px; border-radius: 50%; background: radial-gradient(closest-side, rgba(255,222,2,0.16), transparent); }
        .cs-top { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 18px; }
        .cs-weeks { font-size: 12px; font-weight: 800; padding: 6px 12px; border-radius: 999px; background: var(--accent); color: #050506; letter-spacing: 0.04em; text-transform: uppercase; white-space: nowrap; }
        .cs-big { font-family: var(--font-display); font-size: clamp(84px, 9vw, 128px); line-height: 0.85; color: var(--accent); }
        .cs-sub { font-size: 15px; font-weight: 700; color: #fff; margin-top: 8px; }
        .cs-bars { margin-top: auto; padding-top: 28px; display: grid; gap: 14px; }
        .cs-bar { display: grid; grid-template-columns: 58px 1fr; gap: 6px 12px; align-items: center; }
        .cs-track { height: 8px; border-radius: 8px; background: rgba(255,255,255,0.06); overflow: hidden; }
        .cs-fill { height: 100%; border-radius: 8px; transform-origin: left; transform: scaleX(0); transition: transform 1.2s var(--ease-out) 0.3s; }
        .cs.in-view .cs-fill { transform: scaleX(1); }
        .cs-fill-b { background: rgba(255,255,255,0.28); }
        .cs-fill-a { background: var(--accent); }
        .cs-val { grid-column: 2; font-size: 13px; color: var(--text-muted); font-weight: 600; }
        .cs-name { margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--line); font-weight: 800; font-size: 16px; }
        .cs-more { justify-content: center; align-items: flex-start; text-decoration: none; color: #fff; background: transparent; border-style: dashed; }

        .rvw-rows { margin-top: 64px; display: grid; gap: 20px; }
        .rvw {
          width: 380px; margin-right: 20px; padding: 26px; border-radius: 22px;
          background: var(--surface-1); border: 1px solid var(--line);
          display: flex; flex-direction: column; gap: 16px; flex-shrink: 0;
        }
        .rvw blockquote { font-size: 15px; line-height: 1.6; color: #E9EAEE; flex: 1; }
        .rvw figcaption { display: flex; align-items: center; gap: 12px; font-size: 14px; }
        .rvw-av { width: 38px; height: 38px; border-radius: 50%; background: var(--accent); color: #050506; display: grid; place-items: center; font-weight: 800; flex-shrink: 0; }
        @media (max-width: 600px) { .rvw { width: 300px; padding: 22px; } .cs { min-height: 400px; padding: 26px; } }
      `}</style>
    </section>
  );
}
