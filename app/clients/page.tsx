import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Current Clients | Portal",
  description: "CALIBRATE client portal. Access your protocol, track check-ins, and connect with your coach.",
  robots: { index: false, follow: false },
};

import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import PageHero from "@/components/landing/PageHero";
import Footer from "@/components/layout/Footer";
import { Arrow } from "@/components/landing/ui";

const experiences = [
  {
    number: "01",
    phase: "Week 1-2",
    title: "You get your full programme",
    description: "Within 48 hours of your first call, your complete training and nutrition plan lands in the Vemisis app. Every session is already loaded, every meal target is set, every exercise has video guidance. You start with complete clarity.",
  },
  {
    number: "02",
    phase: "Week 3-4",
    title: "The momentum builds",
    description: "You're tracking sessions, logging nutrition, and sending check-ins. Your coach reviews everything weekly and sends feedback. Small adjustments that compound week on week. Most clients report visible changes by week four.",
  },
  {
    number: "03",
    phase: "Week 5-8",
    title: "You hit your stride",
    description: "By now you're not thinking about the plan, you're living it. Training feels natural. Nutrition is second nature. Your coach adjusts intensity and targets as your fitness improves. This is where the real progress accelerates.",
  },
  {
    number: "04",
    phase: "Week 9-12",
    title: "Changes you can see",
    description: "By now the changes show up in your numbers: strength is up and body composition has moved. You have the system, the habits, and the knowledge to maintain this for the rest of your life.",
  },
];

const inclusions = [
  { title: "Custom training programme", desc: "Built for your goals, schedule, and equipment." },
  { title: "Nutrition targets", desc: "Custom macros with flexible guidance for real life." },
  { title: "Weekly check-ins", desc: "Video or written, you decide what works for you." },
  { title: "Direct coach access", desc: "Message anytime. Responses within 4 hours." },
  { title: "Progress app", desc: "Log workouts, track body metrics, see your data." },
  { title: "Exercise library", desc: "Video guidance on every movement in your plan." },
  { title: "Plan adjustments", desc: "Updated every week based on your actual progress." },
  { title: "Supplement guidance", desc: "Evidence-based recommendations only." },
];

export default function ClientsPage() {
  return (
    <>
      <Navigation />
      <main id="main">
        <PageHero
          compact
          eyebrow="Your experience"
          title={<>What coaching with CALIBRATE looks like</>}
          lead="From day one to your final result, here's exactly what you get, what to expect, and how the process works inside the Vemisis app."
        />

        {/* Inclusions marquee (the only marquee on this page) */}
        <section className="cl-strip" aria-label="Included in every programme">
          <div className="mq" style={{ ["--mq-dur" as string]: "48s" }}>
            <div className="mq-track">
              {[...inclusions, ...inclusions].map((inc, i) => (
                <span key={i} className="cl-strip-item" aria-hidden={i >= inclusions.length ? true : undefined}>
                  {inc.title}
                  <svg width="14" height="14" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 4 C54 38 62 46 96 50 C62 54 54 62 50 96 C46 62 38 54 4 50 C38 46 46 38 50 4Z" fill="#FFDE02" /></svg>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Phase timeline */}
        <section className="sec cl-phases" aria-labelledby="cl-phases-title">
          <div className="wrap cl-phases-grid">
            <div className="cl-side">
              <p className="mono c-accent rv">12 weeks, four phases</p>
              <h2 id="cl-phases-title" className="display-lg rv" style={{ ["--d" as string]: "80ms" }}>Your first 12 weeks</h2>
              <p className="lead rv" style={{ ["--d" as string]: "160ms" }}>Every phase is designed. Nothing is left to chance.</p>
            </div>

            <ol className="cl-timeline">
              {experiences.map((exp, i) => (
                <li key={exp.number} className="cl-phase rv" style={{ ["--d" as string]: `${i * 70}ms` }}>
                  <div className="cl-rail" aria-hidden="true">
                    <span className="cl-num">{exp.number}</span>
                    {i < experiences.length - 1 && <span className="cl-line" />}
                  </div>
                  <div className="cl-phase-body">
                    <p className="mono c-accent">{exp.phase}</p>
                    <h3 className="display-sm">{exp.title}</h3>
                    <p className="body-sm">{exp.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* What's included */}
        <section className="sec-tight cl-incl" aria-labelledby="cl-incl-title">
          <div className="wrap cl-incl-grid">
            <div className="cl-incl-head">
              <h2 id="cl-incl-title" className="display-md rv">Everything included in your programme</h2>
              <p className="body-sm rv" style={{ ["--d" as string]: "80ms" }}>
                Eight parts of one plan, built for you and updated every week based on your actual progress.
              </p>
            </div>
            <dl className="cl-list rv" style={{ ["--d" as string]: "120ms" }}>
              {inclusions.map((inc, i) => (
                <div key={inc.title} className="cl-row">
                  <span className="cl-row-num mono" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <dt>{inc.title}</dt>
                  <dd>{inc.desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA */}
        <section className="sec-tight">
          <div className="wrap">
            <div className="panel cl-cta rv">
              <div className="cl-cta-copy">
                <h2 className="display-md">Ready to start?</h2>
                <p className="lead">
                  Book your free 30-minute call today. We&apos;ll map out your programme and get you started within the week.
                </p>
              </div>
              <div className="cl-cta-actions">
                <Link href="/book" className="btn-primary btn-primary-lg">
                  Book your free call <Arrow />
                </Link>
                <Link href="/pricing" className="btn-secondary btn-primary-lg">
                  View packages
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .cl-strip { padding: 22px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); background: #08080A; }
        .cl-strip-item { display: inline-flex; align-items: center; gap: 20px; padding: 0 14px; font-family: var(--font-display); font-size: 26px; line-height: 1.1; text-transform: uppercase; color: #fff; white-space: nowrap; }

        .cl-phases-grid { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: 72px; align-items: start; }
        .cl-side { position: sticky; top: 130px; display: flex; flex-direction: column; gap: 22px; align-items: flex-start; }
        .cl-timeline { list-style: none; display: flex; flex-direction: column; }
        .cl-phase { display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: 24px; }
        .cl-rail { display: flex; flex-direction: column; align-items: center; }
        .cl-num { width: 56px; height: 56px; border-radius: 999px; display: grid; place-items: center; flex-shrink: 0; font-family: var(--font-display); font-size: 22px; color: #050506; background: var(--accent); }
        .cl-line { flex: 1; width: 2px; margin: 8px 0; min-height: 40px; background: linear-gradient(var(--accent), rgba(255,222,2,0.08)); }
        .cl-phase-body { display: flex; flex-direction: column; gap: 12px; padding: 12px 0 48px; border-bottom: 1px solid var(--line); margin-bottom: 28px; }
        .cl-phase:last-child .cl-phase-body { border-bottom: 0; margin-bottom: 0; padding-bottom: 0; }
        .cl-phase-body .body-sm { font-size: 15.5px; max-width: 600px; }

        .cl-incl-grid { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: 32px 72px; align-items: start; }
        .cl-incl-head { display: flex; flex-direction: column; gap: 20px; }
        .cl-incl-head .body-sm { max-width: 400px; }
        .cl-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 40px; border-top: 1px solid var(--line-strong); }
        .cl-row { display: grid; grid-template-columns: 36px minmax(0, 1fr); gap: 4px 12px; padding: 22px 0; border-bottom: 1px solid var(--line); }
        .cl-row-num { grid-row: span 2; color: var(--accent); padding-top: 3px; }
        .cl-row dt { font-weight: 800; font-size: 16px; color: #fff; line-height: 1.35; }
        .cl-row dd { font-size: 14.5px; color: var(--text-secondary); line-height: 1.6; }

        .panel.cl-cta { border-radius: 24px; padding: 56px; display: grid; grid-template-columns: minmax(0, 1.3fr) auto; gap: 32px 56px; align-items: end; background: radial-gradient(80% 120% at 100% 0%, rgba(255,222,2,0.12), var(--surface-1) 60%); }
        .cl-cta-copy { display: flex; flex-direction: column; gap: 18px; max-width: 620px; }
        .cl-cta-actions { display: flex; flex-wrap: wrap; gap: 12px; }

        @media (max-width: 900px) {
          .cl-phases-grid, .cl-incl-grid { grid-template-columns: 1fr; gap: 40px; }
          .cl-side { position: static; }
          .panel.cl-cta { grid-template-columns: 1fr; align-items: start; }
        }
        @media (max-width: 640px) {
          .cl-strip-item { font-size: 22px; }
          .cl-phase { grid-template-columns: 44px minmax(0, 1fr); gap: 14px; }
          .cl-num { width: 42px; height: 42px; font-size: 17px; }
          .cl-phase-body { padding: 8px 0 36px; }
          .cl-list { grid-template-columns: 1fr; }
          .panel.cl-cta { padding: 36px 24px; }
          .cl-cta-actions { flex-direction: column; align-items: stretch; }
        }
      `}</style>
    </>
  );
}
