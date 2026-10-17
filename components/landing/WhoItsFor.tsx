import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./ui";

// Each profile is backed by a real 5-star Google review. Quotes are word for word from the
// reviews in lib/reviews.ts (shorter spans of the same text).
const people = [
  {
    id: "professionals",
    who: "Busy professionals",
    line: "Long days, travel, a calendar that changes every week.",
    how: "Online coaching built around your real schedule, with the plan adjusted every week from your data.",
    mode: "Online",
    img: "/media/campaign/persona-founders-lounge.webp",
    alt: "Coach Guhayavarman in a calm consultation room",
    href: "/how-it-works",
    cta: "See how it works",
    quote: "He is extremely good with online training.",
    by: "Mathew A.",
  },
  {
    id: "seniors",
    who: "Adults 60 and over",
    line: "Strength, balance and confidence for everyday life.",
    how: "Slow, safe progressions that respect joints and medical history, with a coach watching every rep.",
    mode: "Online or in person",
    img: "/media/programmes/p08-seniors-inperson.webp",
    alt: "Coach Guhayavarman supporting a senior woman during a sit-to-stand with light dumbbells",
    href: "/programmes#seniors",
    cta: "Senior citizens programme",
    quote: "He structures each session so thoughtfully, tailoring exercises to their abilities while still challenging them to improve every day.",
    by: "Divya S., about her parents",
  },
  {
    id: "return",
    who: "Coming back from pain",
    line: "A shoulder, knee, neck or back that keeps getting in the way.",
    how: "Form first, the cause found early, and training adjusted so you keep moving while it settles.",
    mode: "Online or in person",
    img: "/media/programmes/p06-return-stepdown.webp",
    alt: "Coach Guhayavarman guiding a controlled single-leg step-down",
    href: "/programmes#return",
    cta: "Return to Training programme",
    quote: "He quickly identified the cause of my shoulder pain and adjusted my workouts to help with recovery.",
    by: "Leo",
  },
  {
    id: "beginners",
    who: "Starting from zero",
    line: "New to training, or back after years away.",
    how: "Every session tracked, so intensity rises only when your body is ready for it.",
    mode: "Online or in person",
    img: "/media/programmes/p01-hero-coaching-squat.webp",
    alt: "Coach Guhayavarman coaching a client through a kettlebell goblet squat",
    href: "/programmes",
    cta: "See all programmes",
    quote: "I always feel challenged and good after my workouts without fear of injury.",
    by: "Gowrishankar T.",
  },
];

export default function WhoItsFor() {
  return (
    <section className="sec wif" aria-labelledby="wif-title">
      <div className="wrap">
        <div className="wif-head">
          <h2 id="wif-title" className="display-lg rv" style={{ ["--d" as string]: "60ms" }}>
            Who we coach.
          </h2>
        </div>

        <ul className="wif-grid">
          {people.map((p, i) => (
            <li key={p.id} className="wif-card rv" style={{ ["--d" as string]: `${i * 80}ms` }}>
              <div className="wif-photo">
                <Image src={p.img} alt={p.alt} fill sizes="(max-width: 640px) 92vw, (max-width: 1100px) 46vw, 300px" style={{ objectFit: "cover", objectPosition: "50% 30%" }} />
                <span className="wif-mode">{p.mode}</span>
              </div>
              <div className="wif-body">
                <h3 className="wif-who">{p.who}</h3>
                <p className="wif-line">{p.line}</p>
                <p className="wif-how">{p.how}</p>
                <figure className="wif-quote">
                  <blockquote>“{p.quote}”</blockquote>
                  <figcaption>{p.by}, Google review</figcaption>
                </figure>
                <Link href={p.href} className="wif-link">
                  {p.cta} <span className="ar"><Arrow size={12} /></span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .wif-head { margin-bottom: 48px; }
        .wif-head h2 { margin-top: 12px; max-width: 14ch; text-wrap: balance; }
        .wif-grid { list-style: none; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; }
        .wif-card {
          display: flex; flex-direction: column; overflow: hidden; border-radius: 26px;
          background: linear-gradient(180deg, #121216 0%, #0B0B0E 100%);
          border: 1px solid var(--border);
          transition: border-color 0.3s var(--ease-out), transform 0.5s var(--ease-out);
        }
        .wif-card:hover { border-color: var(--border-strong); transform: translateY(-4px); }
        .wif-photo { position: relative; aspect-ratio: 4 / 3.4; overflow: hidden; }
        .wif-photo::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 55%, rgba(11,11,14,0.85)); pointer-events: none; }
        .wif-mode {
          position: absolute; left: 14px; top: 14px; z-index: 1; padding: 5px 10px; border-radius: 999px;
          font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
          background: rgba(7,7,10,0.72); border: 1px solid rgba(255,255,255,0.14); color: #fff;
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
        }
        .wif-body { display: flex; flex-direction: column; gap: 10px; padding: 20px 22px 22px; flex: 1; }
        .wif-who { font-size: clamp(20px, 1.7vw, 23px); line-height: 1.2; }
        .wif-line { font-size: 15px; font-weight: 700; color: #fff; line-height: 1.45; }
        .wif-how { font-size: 14px; color: var(--text-secondary); line-height: 1.6; }
        .wif-quote { margin: 6px 0 0; padding-left: 12px; border-left: 2px solid var(--accent); }
        .wif-quote blockquote { margin: 0; font-size: 13.5px; line-height: 1.55; color: #E4E5EA; font-style: italic; }
        .wif-quote figcaption { margin-top: 6px; font-size: 12px; color: var(--text-muted); }
        .wif-link { margin-top: auto; padding-top: 10px; display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 800; color: var(--accent); }
        .wif-link:hover { text-decoration: underline; text-underline-offset: 3px; }
        .wif-link:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 4px; }

        @media (max-width: 1100px) { .wif-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 640px) { .wif-grid { grid-template-columns: 1fr; } .wif-photo { aspect-ratio: 16 / 11; } }
        @media (prefers-reduced-motion: reduce) { .wif-card { transition: none; } .wif-card:hover { transform: none; } }
      `}</style>
    </section>
  );
}
