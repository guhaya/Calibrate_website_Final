import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/landing/PageHero";
import Faq from "@/components/landing/Faq";
import FinalCta from "@/components/landing/FinalCta";
import { Arrow, Check } from "@/components/landing/ui";
import { adaptive, faqs, pillars, tracks } from "./data";
import type { Mode } from "./data";
import { SITE_URL, ogBase } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "Coaching for every goal: fat loss, muscle gain, recomposition, performance, health, movement and lifestyle, plus Longevity, GLP-1 Support, Hybrid & Hyrox, Metabolic Health and Return to Training, in-person sessions for kids with autism, and online or in-person training for senior citizens.",
  alternates: { canonical: "/programmes" },
  openGraph: {
    ...ogBase,
    url: `${SITE_URL}/programmes`,
    title: "Programmes | CALIBRATE by GVNFIT",
    description: "Specialist tracks, adaptive coaching for kids with autism and senior citizens, and coaching for every aesthetic, performance, health, movement and lifestyle goal.",
  },
};

function ModeBadge({ mode }: { mode: Mode }) {
  return (
    <span className={`pg-mode ${mode === "In person" ? "pg-mode-in" : "pg-mode-on"}`}>
      <span className="pg-mode-dot" aria-hidden="true" />
      {mode}
    </span>
  );
}

export default function ProgrammesPage() {
  return (
    <>
      <Navigation />
      <main id="main">
        <PageHero
          align="split"
          title={<>Train for the outcome you want.</>}
          lead="Whether you want to look different, perform better, protect your health or simply feel capable every day, your programme is written for that goal, then adjusted every week as your body responds. Online worldwide, and in person by arrangement for kids with autism and senior citizens."
          ctas={[
            { label: "Book your free call", href: "/book" },
            { label: "See pricing", href: "/pricing", variant: "secondary" },
          ]}
          visual={
            <figure className="pg-hero-visual">
              <div className="pg-hero-img">
                <Image src="/media/programmes/p01-hero-coaching-squat.webp" alt="Coach Guhayavarman coaching a client through a kettlebell goblet squat" fill preload sizes="(max-width: 900px) 90vw, 460px" style={{ objectFit: "cover" }} />
              </div>
              <div className="float-card bob pg-hero-card pg-hero-card-a">
                <p className="mono c-accent">Online</p>
                <p className="pg-hero-card-t">Coaching worldwide</p>
              </div>
              <div className="float-card bob-2 pg-hero-card pg-hero-card-b">
                <p className="mono c-accent">In person · by arrangement</p>
                <p className="pg-hero-card-t">Kids with autism · Seniors</p>
              </div>
            </figure>
          }
        />

        <nav className="pg-jump wrap" aria-label="Jump to a section">
          {tracks.map((t) => (
            <a key={t.id} href={`#${t.id}`} className="pg-chip pg-chip-accent">{t.name}</a>
          ))}
          {adaptive.map((a) => (
            <a key={a.id} href={`#${a.id}`} className="pg-chip pg-chip-accent">{a.name}</a>
          ))}
          <span className="pg-jump-sep" aria-hidden="true" />
          {pillars.map((p) => (
            <a key={p.id} href={`#${p.id}`} className="pg-chip">{p.name}</a>
          ))}
        </nav>

        {/* Specialist tracks: photo-led rows */}
        <section className="sec pg-tracks" id="specialist" aria-labelledby="pg-tracks-title">
          <div className="wrap">
            <div className="pg-sec-head">
              <h2 id="pg-tracks-title" className="display-lg rv">Specialist tracks</h2>
              <p className="lead rv" style={{ ["--d" as string]: "80ms" }}>
                Coaching for the goals people bring to us most now: living longer and stronger, training on GLP-1 medication, racing hybrid events, looking after the numbers on a health report, and getting back to training after injury.
              </p>
            </div>

            <div className="pg-rows">
              {tracks.map((t, i) => (
                <article key={t.id} id={t.id} className={`pg-row rv ${i % 2 ? "pg-row-flip" : ""}`}>
                  <div className="pg-row-img">
                    <Image src={t.img} alt={t.alt} fill sizes="(max-width: 860px) 92vw, 460px" style={{ objectFit: "cover", objectPosition: "50% 22%" }} />
                    <span className="pg-row-num mono" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="pg-row-body">
                    <div className="pg-modes"><ModeBadge mode="Online" /></div>
                    <h3 className="pg-track-name">{t.name}</h3>
                    <p className="subhead">{t.kicker}</p>
                    <p className="pg-line">{t.line}</p>
                    <ul className="pg-points">
                      {t.points.map((pt) => (
                        <li key={pt}><Check />{pt}</li>
                      ))}
                    </ul>
                    {t.note && <p className="pg-note">{t.note}</p>}
                  </div>
                </article>
              ))}
            </div>

            <p className="pg-included rv">
              Every specialist track is included in your CALIBRATE plan at no extra cost.{" "}
              <Link href="/pricing" className="pg-inline-link">See pricing <Arrow size={12} /></Link>
            </p>
          </div>
        </section>

        {/* Adaptive coaching: kids with autism, senior citizens */}
        <section className="sec pg-adaptive" id="adaptive" aria-labelledby="pg-adaptive-title">
          <div className="wrap">
            <div className="pg-sec-head">
              <h2 id="pg-adaptive-title" className="display-lg rv">Adaptive coaching</h2>
              <p className="lead rv" style={{ ["--d" as string]: "80ms" }}>
                Coaching built around the person, not a template: one-to-one movement sessions for kids with autism, and strength and balance training for senior citizens, online or in person.
              </p>
            </div>

            <div className="pg-adapt-list">
              {adaptive.map((a) => (
                <article key={a.id} id={a.id} className={`pg-adapt rv ${a.photos.length > 1 ? "pg-adapt-two" : ""}`}>
                  <div className="pg-adapt-photos">
                    {a.photos.map((ph) => (
                      <figure key={ph.img} className="pg-adapt-ph">
                        <Image src={ph.img} alt={ph.alt} fill sizes="(max-width: 860px) 92vw, 420px" style={{ objectFit: "cover", objectPosition: "50% 22%" }} />
                        {a.photos.length > 1 && <figcaption><ModeBadge mode={ph.caption as Mode} /></figcaption>}
                      </figure>
                    ))}
                  </div>
                  <div className="pg-adapt-body">
                    <div className="pg-modes">{a.modes.map((m) => <ModeBadge key={m} mode={m} />)}</div>
                    <h3 className="pg-track-name">{a.name}</h3>
                    <p className="subhead">{a.kicker}</p>
                    <p className="pg-line">{a.line}</p>
                    <ul className="pg-points">
                      {a.points.map((pt) => (
                        <li key={pt}><Check />{pt}</li>
                      ))}
                    </ul>
                    <p className="pg-note">{a.note}</p>
                    <p className="pg-booking">{a.booking}</p>
                    <Link href="/book" className="pg-inline-link">Ask about {a.name.toLowerCase()} sessions <Arrow size={12} /></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sec pg-pillars" aria-labelledby="pg-pillars-title">
          <div className="wrap">
            <div className="pg-sec-head">
              <h2 id="pg-pillars-title" className="display-lg rv">Every goal we coach</h2>
              <p className="lead rv" style={{ ["--d" as string]: "80ms" }}>
                Most people want more than one thing. We map your goals across five areas, agree the priority order with you, and train the physical qualities that move each one.
              </p>
            </div>

            <ol className="pg-pillar-list">
              {pillars.map((p) => (
                <li key={p.id} id={p.id} className="pg-pillar rv">
                  <div className="pg-pillar-head">
                    <span className="pg-num mono">{p.number}</span>
                    <h3 className="pg-pillar-name">{p.name}</h3>
                    <p className="pg-line">{p.line}</p>
                    <div className="pg-pillar-img">
                      <Image src={p.img} alt={p.alt} fill sizes="(max-width: 860px) 92vw, 380px" style={{ objectFit: "cover" }} />
                    </div>
                  </div>

                  <div className="pg-pillar-body">
                    <ul className="pg-goals" aria-label={`${p.name} goals`}>
                      {p.goals.map((g) => (
                        <li key={g}>{g}</li>
                      ))}
                    </ul>

                    <details className="pg-qual">
                      <summary>
                        What we train for {p.name.toLowerCase()} goals
                        <span className="pg-qual-count mono">{p.qualities.length} qualities</span>
                      </summary>
                      <dl className="pg-qualities">
                        {p.qualities.map((q) => (
                          <div key={q.name} className="pg-quality">
                            <dt>{q.name}</dt>
                            <dd>{q.means}</dd>
                            <dd className="pg-train">{q.train}</dd>
                          </div>
                        ))}
                      </dl>
                    </details>
                  </div>
                </li>
              ))}
            </ol>

            <aside className="pg-cta panel-yellow rv">
              <h3 className="pg-cta-title">Not sure where you fit?</h3>
              <p>On a free 30-minute call we go through your goals, history and schedule, then tell you exactly how your programme would be built, online or in person.</p>
              <Link href="/book" className="btn-primary pg-dark-btn">Book your free call <Arrow /></Link>
            </aside>

            <p className="pg-disclaimer">
              <strong>Health note.</strong> CALIBRATE is fitness and nutrition coaching, not medical care or therapy. If you have a medical condition, take prescription medication including GLP-1 medicines, are recovering from injury or surgery, or are pregnant, speak to your doctor before starting and tell us about it when you apply. Sessions for children with autism and for senior citizens are planned with families and alongside existing therapists and doctors. We never diagnose, treat or advise on medication.
            </p>
          </div>
        </section>

        <Faq items={faqs} title={<>Questions about programmes</>} />

        <FinalCta />
      </main>
      <Footer />

      <style>{`
        .pg-hero-visual { position: relative; width: 100%; max-width: 440px; margin: 0 auto; }
        .pg-hero-img { position: relative; aspect-ratio: 4 / 5; border-radius: 24px; overflow: hidden; border: 1px solid var(--line); }
        .pg-hero-card { position: absolute; z-index: 2; }
        .pg-hero-card-a { left: -8%; top: 14%; }
        .pg-hero-card-b { right: -6%; bottom: 12%; }
        .pg-hero-card-t { font-weight: 800; font-size: 15px; margin-top: 4px; }

        .pg-jump { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding-top: 8px; padding-bottom: 8px; }
        .pg-chip {
          display: inline-flex; align-items: center; min-height: 44px; padding: 0 18px;
          border-radius: 999px; border: 1px solid var(--border-strong);
          font-size: 14px; font-weight: 700; color: var(--text-secondary); text-decoration: none;
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .pg-chip:hover { color: #fff; border-color: rgba(255,255,255,0.3); }
        .pg-chip-accent { color: #fff; border-color: var(--accent-border); }
        .pg-chip-accent:hover { border-color: var(--accent); }
        .pg-jump-sep { width: 1px; height: 24px; background: var(--border-strong); margin: 0 6px; }

        .pg-sec-head { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); gap: 24px 64px; align-items: end; margin-bottom: 48px; }
        .pg-sec-head .lead { max-width: 560px; }
        .pg-line { color: #D7D9E0; font-size: 15.5px; line-height: 1.65; }

        .pg-modes { display: flex; gap: 8px; flex-wrap: wrap; }
        .pg-mode { display: inline-flex; align-items: center; gap: 8px; height: 30px; padding: 0 12px; border-radius: 999px; font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
        .pg-mode-dot { width: 7px; height: 7px; border-radius: 50%; }
        .pg-mode-in { background: var(--accent); color: #07070A; }
        .pg-mode-in .pg-mode-dot { background: #07070A; }
        .pg-mode-on { border: 1px solid var(--accent-border); color: #fff; background: rgba(5,5,6,0.6); backdrop-filter: blur(6px); }
        .pg-mode-on .pg-mode-dot { background: var(--accent); }

        .pg-rows { display: flex; flex-direction: column; gap: 28px; }
        .pg-row {
          display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: 0;
          border-radius: 28px; overflow: hidden; border: 1px solid var(--border); background: var(--surface-1);
          scroll-margin-top: 110px;
        }
        .pg-row-flip .pg-row-img { order: 2; }
        .pg-row-img { position: relative; min-height: 460px; }
        .pg-row-img::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 60%, rgba(5,5,6,0.35)); pointer-events: none; }
        .pg-row-num { position: absolute; left: 20px; bottom: 18px; z-index: 1; font-size: 13px; letter-spacing: 0.14em; color: #fff; background: rgba(5,5,6,0.55); padding: 6px 10px; border-radius: 8px; backdrop-filter: blur(6px); }
        .pg-row-body { padding: 44px 48px; display: flex; flex-direction: column; justify-content: center; gap: 14px; }
        .pg-track-name { font-family: var(--font-display); font-weight: 400; font-size: clamp(36px, 3.4vw, 54px); line-height: 0.95; text-transform: uppercase; }
        .pg-points { list-style: none; display: grid; gap: 10px; margin-top: 4px; }
        .pg-points li { display: flex; gap: 10px; align-items: flex-start; font-size: 14.5px; color: #fff; font-weight: 600; line-height: 1.45; }
        .pg-points li svg { margin-top: 2px; flex-shrink: 0; }
        .pg-note { padding-top: 6px; font-size: 13px; color: var(--text-secondary); line-height: 1.55; border-left: 2px solid var(--accent-border); padding-left: 12px; }
        .pg-booking { font-size: 14px; font-weight: 700; color: #fff; }
        .pg-included { margin-top: 28px; font-size: 15px; color: var(--text-secondary); }
        .pg-inline-link { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; color: #fff; font-weight: 700; text-decoration: underline; text-underline-offset: 4px; text-decoration-color: var(--accent); }

        .pg-adaptive { background: radial-gradient(90% 60% at 50% 0%, rgba(255,222,2,0.07), transparent 70%); }
        .pg-adapt-list { display: flex; flex-direction: column; gap: 28px; }
        .pg-adapt {
          display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: 0;
          border-radius: 28px; overflow: hidden; border: 1px solid var(--accent-border); background: var(--surface-1);
          scroll-margin-top: 110px;
        }
        .pg-adapt-two { grid-template-columns: minmax(0, 7fr) minmax(0, 6fr); }
        .pg-adapt-photos { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 4px; min-height: 480px; }
        .pg-adapt-ph { position: relative; margin: 0; }
        .pg-adapt-ph figcaption { position: absolute; left: 16px; top: 16px; z-index: 1; }
        .pg-adapt-body { padding: 44px 48px; display: flex; flex-direction: column; justify-content: center; gap: 14px; }

        .pg-pillar-list { list-style: none; border-top: 1px solid var(--border); }
        .pg-pillar {
          display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.6fr); gap: 32px 64px;
          padding: 40px 0; border-bottom: 1px solid var(--border); scroll-margin-top: 110px;
        }
        .pg-pillar-head { display: flex; flex-direction: column; gap: 10px; }
        .pg-pillar-img { position: relative; aspect-ratio: 16 / 10; border-radius: 18px; overflow: hidden; border: 1px solid var(--border); margin-top: 8px; }
        .pg-num { color: var(--accent); font-size: 13px; letter-spacing: 0.12em; }
        .pg-pillar-name { font-family: var(--font-display); font-weight: 400; font-size: clamp(36px, 3.4vw, 52px); line-height: 0.95; text-transform: uppercase; }
        .pg-pillar-body { display: flex; flex-direction: column; gap: 20px; }
        .pg-goals { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; }
        .pg-goals li { padding: 9px 14px; border-radius: 12px; background: rgba(255,255,255,0.04); border: 1px solid var(--border); font-size: 14px; font-weight: 600; color: #fff; line-height: 1.3; }

        .pg-qual { border-radius: 14px; border: 1px solid var(--border); }
        .pg-qual summary {
          list-style: none; cursor: pointer; min-height: 48px; padding: 12px 18px;
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          font-size: 14px; font-weight: 700; color: var(--text-secondary);
        }
        .pg-qual summary::-webkit-details-marker { display: none; }
        .pg-qual summary::after { content: "+"; font-size: 20px; line-height: 1; color: var(--accent); margin-left: 8px; }
        .pg-qual[open] summary::after { content: "\\2212"; }
        .pg-qual summary:hover { color: #fff; }
        .pg-qual-count { margin-left: auto; font-size: 12px; color: var(--text-muted); }
        .pg-qualities { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1px; background: var(--border); border-top: 1px solid var(--border); border-radius: 0 0 14px 14px; overflow: hidden; }
        .pg-quality { padding: 16px 18px; background: var(--bg-primary); }
        .pg-quality dt { font-weight: 800; font-size: 15px; color: #fff; margin-bottom: 4px; }
        .pg-quality dd { font-size: 14px; color: var(--text-secondary); line-height: 1.55; }
        .pg-train { margin-top: 8px; color: #E7E8EE !important; }
        .pg-train::before { content: "Trained with: "; color: var(--text-muted); }

        .pg-cta { margin-top: 56px; border-radius: 24px; padding: 36px 40px; color: #07070A; display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.3fr) auto; align-items: center; gap: 16px 40px; }
        .pg-cta-title { font-family: var(--font-display); font-weight: 400; font-size: clamp(30px, 2.8vw, 42px); line-height: 0.95; text-transform: uppercase; color: #07070A; }
        .pg-cta p { line-height: 1.6; }
        .pg-dark-btn { justify-self: end; white-space: nowrap; background: #07070A !important; color: #fff !important; }
        .pg-disclaimer { margin-top: 24px; font-size: 13.5px; color: var(--text-secondary); line-height: 1.65; max-width: 880px; }
        .pg-disclaimer strong { color: #fff; }

        @media (max-width: 1100px) {
          .pg-cta { grid-template-columns: 1fr; }
          .pg-dark-btn { justify-self: start; }
          .pg-row-body, .pg-adapt-body { padding: 36px 32px; }
        }
        @media (max-width: 860px) {
          .pg-sec-head { grid-template-columns: 1fr; }
          .pg-pillar { grid-template-columns: 1fr; gap: 20px; padding: 32px 0; }
          .pg-row, .pg-adapt, .pg-adapt-two { grid-template-columns: 1fr; }
          .pg-row-flip .pg-row-img { order: 0; }
          .pg-row-img { min-height: 0; aspect-ratio: 4 / 3; }
          .pg-adapt-photos { min-height: 0; aspect-ratio: 4 / 3; }
          .pg-hero-card-a { left: -2%; }
          .pg-hero-card-b { right: -2%; }
        }
        @media (max-width: 680px) {
          .pg-jump-sep { display: none; }
          .pg-cta { padding: 28px 24px; }
          .pg-row-body, .pg-adapt-body { padding: 28px 22px; }
          .pg-adapt-two .pg-adapt-photos { grid-auto-flow: row; aspect-ratio: auto; }
          .pg-adapt-two .pg-adapt-ph { aspect-ratio: 4 / 3; }
        }
      `}</style>
    </>
  );
}
