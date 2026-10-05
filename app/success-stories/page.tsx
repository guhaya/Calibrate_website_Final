import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Client Transformations",
  description: "Real results from CALIBRATE clients, engineers, product managers, and consultants who transformed their body with data-driven coaching. Detailed stories, metrics, and outcomes.",
  openGraph: {
    title: "Client Transformations | CALIBRATE by GVNFIT",
    description: "Real results from engineers, PMs, and founders who used the CALIBRATE protocol. Honest stories with before/after metrics.",
  },
};

import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/landing/PageHero";
import FinalCta from "@/components/landing/FinalCta";
import { CountUp, Hl } from "@/components/landing/ui";

const highlights = [
  { stat: "−14kg", label: "Marcus T. · 14 weeks" },
  { stat: "30% → 22%", label: "Priya S. · body fat" },
  { stat: "+60kg", label: "Arjun K. · deadlift" },
  { stat: "0", label: "Generic templates used" },
];

const stories = [
  {
    name: "Marcus T.",
    age: 34,
    occupation: "Software Engineer",
    program: "Performance · 14 Weeks",
    headline: "Lost 14kg while gaining strength, all without giving up his social life",
    story: [
      "Marcus came to CALIBRATE exhausted by fitness content that promised everything and delivered nothing. He'd done gym programmes, downloaded apps, and even hired a trainer through a gym, but nothing had lasted more than six weeks.",
      "The problem wasn't discipline. It was that nothing was built around his actual life: a demanding job, frequent travel, and a love of restaurants. Every previous programme fell apart the moment his schedule changed.",
      "We built Marcus a training structure that worked in hotel gyms and his home setup equally well. His nutrition plan had specific strategies for eating out without derailing progress. Weekly check-ins adapted when his travel weeks inevitably happened.",
      "Fourteen weeks later, Marcus had lost 14kg, while actually getting stronger in every major lift. More importantly, he now knows exactly how to train and eat for the rest of his life.",
    ],
    metrics: [
      { label: "Weight", before: "97kg", after: "83kg" },
      { label: "Body Fat", before: "28%", after: "16%" },
      { label: "Bench Press", before: "80kg", after: "105kg" },
    ],
    quote: "I'd genuinely given up on personal coaching. I thought I just wasn't the type of person this worked for. Turns out I just hadn't had the right coach.",
  },
  {
    name: "Priya S.",
    age: 29,
    occupation: "Marketing Director",
    program: "Performance · 16 Weeks",
    headline: "Recomped from 30% to 22% body fat, without eating less food",
    story: [
      "Priya's goal wasn't to lose a lot of weight, she wanted to look lean and feel strong. She'd spent years doing cardio-heavy classes that left her tired but not visibly different. She came to CALIBRATE after seeing a friend's results.",
      "The breakthrough came from understanding that Priya's issue was composition, not calories. She needed to build muscle and drop fat simultaneously, something that requires a very specific approach to training and nutrition that generic programmes miss entirely.",
      "We prioritised resistance training, set her protein targets high, and gave her a calorie target that still let her enjoy meals with friends. No food was off-limits. Her body changed every single week.",
      "By week 16, Priya had gone from 30% to 22% body fat while her scale weight had barely moved, the definition of a successful body recomposition.",
    ],
    metrics: [
      { label: "Body Fat", before: "30%", after: "22%" },
      { label: "Weight", before: "65kg", after: "62kg" },
      { label: "Squat", before: "50kg", after: "82kg" },
    ],
    quote: "I never thought I could eat like this and look like this at the same time. My coach completely changed the way I understand my body.",
  },
  {
    name: "Arjun K.",
    age: 31,
    occupation: "Staff Engineer, Bangalore",
    program: "Quarterly Protocol · 20 Weeks",
    headline: "From 'skinny fat' to genuinely lean, four years of training, fixed in 20 weeks",
    story: [
      "Arjun had been training consistently for four years. He was disciplined, he showed up, and he genuinely enjoyed lifting. But he didn't look like he trained, the classic skinny fat trap. A layer of fat that never shifted despite months in the gym.",
      "When we assessed his programme and nutrition, the problems were immediately visible: zero progressive overload structure (he'd been running the same split for nearly two years), and a calorie intake quietly sitting him in a surplus without him realising.",
      "We rebuilt everything around systematic progressive overload and restructured his nutrition to support body recomposition. Visible changes appeared by week three. Strength climbed every single week for the first four months.",
      "Twenty weeks in, Arjun had the physique he'd been chasing since his mid-20s, and the understanding of why previous years hadn't worked and how to keep progressing independently.",
    ],
    metrics: [
      { label: "Weight", before: "76kg", after: "79kg" },
      { label: "Body Fat", before: "22%", after: "13%" },
      { label: "Deadlift", before: "100kg", after: "160kg" },
    ],
    quote: "Four years of training and I made more progress in 20 weeks than in everything before it combined. The difference was a system, not more effort.",
  },
];

export default function SuccessStoriesPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          compact
          eyebrow="Verified results"
          title={<>Real people. <Hl ink>Real numbers.</Hl></>}
          lead="Engineers, product managers and founders who stopped guessing and started calibrating. Honest stories, measured outcomes, no filters."
          ctas={[{ label: "Start your story", href: "/apply" }, { label: "Book your free call", href: "/book", variant: "secondary" }]}
        />

        <section className="wrap ss-highlights">
          {highlights.map((h, i) => (
            <div key={h.label} className="ss-hl rv" style={{ ["--d" as string]: `${i * 80}ms` }}>
              <CountUp value={h.stat} className="ss-hl-v" />
              <p className="mono c-muted">{h.label}</p>
            </div>
          ))}
        </section>

        <section className="sec">
          <div className="wrap ss-list">
            {stories.map((s) => (
              <article key={s.name} className="panel ss-story rv">
                <div className="ss-main">
                  <div className="ss-meta">
                    <span className="ss-av">{s.name[0]}</span>
                    <div>
                      <p style={{ fontWeight: 800, fontSize: 17 }}>{s.name} <span className="c-muted" style={{ fontWeight: 500 }}>· {s.age}</span></p>
                      <p className="c-muted" style={{ fontSize: 13.5 }}>{s.occupation}</p>
                    </div>
                    <span className="ss-prog">{s.program}</span>
                  </div>
                  <h2 className="ss-headline">{s.headline}</h2>
                  <div className="ss-text">
                    {s.story.map((p, k) => <p key={k}>{p}</p>)}
                  </div>
                </div>

                <aside className="ss-side">
                  <p className="mono c-accent">Measured results</p>
                  <div className="ss-metrics">
                    {s.metrics.map((m) => {
                      return (
                        <div key={m.label} className="ss-metric">
                          <div className="ss-metric-top">
                            <span style={{ fontWeight: 700 }}>{m.label}</span>
                            <span><span className="c-muted">{m.before}</span> <span className="c-accent">→ {m.after}</span></span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <blockquote className="ss-quote">&ldquo;{s.quote}&rdquo;</blockquote>
                </aside>
              </article>
            ))}
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />

      <style>{`
        .ss-highlights { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-top: -24px; }
        .ss-hl { padding: 26px; border-radius: 24px; background: var(--surface-1); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 8px; }
        .ss-hl-v { font-family: var(--font-display); font-size: clamp(30px, 3vw, 46px); line-height: 1; color: var(--accent); white-space: nowrap; }
        .ss-list { display: flex; flex-direction: column; gap: 24px; }
        .ss-story { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr); gap: 0; }
        .ss-main { padding: 48px; display: flex; flex-direction: column; gap: 22px; }
        .ss-meta { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
        .ss-av { width: 46px; height: 46px; border-radius: 50%; background: var(--accent); color: #050506; display: grid; place-items: center; font-weight: 800; font-size: 18px; flex-shrink: 0; }
        .ss-prog { margin-left: auto; font-family: var(--font-mono); font-size: 10.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 7px 12px; border-radius: 999px; color: var(--accent); background: rgba(255,222,2,0.08); border: 1px solid rgba(255,222,2,0.25); }
        .ss-headline { font-family: var(--font-display); font-size: clamp(30px, 3vw, 46px); line-height: 1; text-wrap: balance; }
        .ss-text { display: flex; flex-direction: column; gap: 14px; }
        .ss-text p { font-size: 15.5px; line-height: 1.75; color: var(--text-secondary); }
        .ss-side { padding: 48px 40px; background: linear-gradient(180deg, rgba(255,222,2,0.08), transparent 60%), #0A0A0C; border-left: 1px solid var(--line); display: flex; flex-direction: column; gap: 26px; }
        .ss-metrics { display: flex; flex-direction: column; gap: 22px; }
        .ss-metric-top { display: flex; justify-content: space-between; gap: 12px; font-size: 14.5px; padding-bottom: 14px; border-bottom: 1px solid var(--line); }
        .ss-quote { margin-top: auto; padding: 22px; border-radius: 20px; background: var(--accent); color: #050506; font-weight: 700; font-size: 15.5px; line-height: 1.55; }
        @media (max-width: 900px) {
          .ss-highlights { grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 0; }
          .ss-hl { padding: 20px; }
          .ss-hl-v { font-size: 28px; }
          .ss-story { grid-template-columns: 1fr; }
          .ss-side { border-left: none; border-top: 1px solid var(--line); }
        }
        @media (max-width: 560px) {
          .ss-main, .ss-side { padding: 28px 22px; }
          .ss-prog { margin-left: 0; }
        }
      `}</style>
    </>
  );
}
