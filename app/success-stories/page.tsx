import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Client Transformations",
  description: "Real results from CALIBRATE clients — engineers, product managers, and consultants who transformed their body with data-driven coaching. Detailed stories, metrics, and outcomes.",
  openGraph: {
    title: "Client Transformations | CALIBRATE",
    description: "Real results from engineers, PMs, and founders who used the CALIBRATE protocol. Honest stories with before/after metrics.",
  },
};

import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const stories = [
  {
    name: "Marcus T.",
    age: 34,
    occupation: "Software Engineer",
    program: "Performance · 14 Weeks",
    headline: "Lost 14kg while gaining strength — all without giving up his social life",
    story: [
      "Marcus came to CALIBRATE exhausted by fitness content that promised everything and delivered nothing. He'd done gym programmes, downloaded apps, and even hired a trainer through a gym — but nothing had lasted more than six weeks.",
      "The problem wasn't discipline. It was that nothing was built around his actual life: a demanding job, frequent travel, and a love of restaurants. Every previous programme fell apart the moment his schedule changed.",
      "We built Marcus a training structure that worked in hotel gyms and his home setup equally well. His nutrition plan had specific strategies for eating out without derailing progress. Weekly check-ins adapted when his travel weeks inevitably happened.",
      "Fourteen weeks later, Marcus had lost 14kg — while actually getting stronger in every major lift. More importantly, he now knows exactly how to train and eat for the rest of his life.",
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
    headline: "Recomped from 30% to 22% body fat — without eating less food",
    story: [
      "Priya's goal wasn't to lose a lot of weight — she wanted to look lean and feel strong. She'd spent years doing cardio-heavy classes that left her tired but not visibly different. She came to CALIBRATE after seeing a friend's results.",
      "The breakthrough came from understanding that Priya's issue was composition, not calories. She needed to build muscle and drop fat simultaneously — something that requires a very specific approach to training and nutrition that generic programmes miss entirely.",
      "We prioritised resistance training, set her protein targets high, and gave her a calorie target that still let her enjoy meals with friends. No food was off-limits. Her body changed every single week.",
      "By week 16, Priya had gone from 30% to 22% body fat while her scale weight had barely moved — the definition of a successful body recomposition.",
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
    headline: "From 'skinny fat' to genuinely lean — four years of training, fixed in 20 weeks",
    story: [
      "Arjun had been training consistently for four years. He was disciplined, he showed up, and he genuinely enjoyed lifting. But he didn't look like he trained — the classic skinny fat trap. A layer of fat that never shifted despite months in the gym.",
      "When we assessed his programme and nutrition, the problems were immediately visible: zero progressive overload structure (he'd been running the same split for nearly two years), and a calorie intake quietly sitting him in a surplus without him realising.",
      "We rebuilt everything around systematic progressive overload and restructured his nutrition to support body recomposition. Visible changes appeared by week three. Strength climbed every single week for the first four months.",
      "Twenty weeks in, Arjun had the physique he'd been chasing since his mid-20s — and the understanding of why previous years hadn't worked and how to keep progressing independently.",
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
        {/* Hero */}
        <section
          style={{
            padding: "140px 24px 80px",
            textAlign: "center",
            position: "relative",
          }}
          className="grid-bg"
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at 50% 30%, rgba(255,222,2,0.05) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ maxWidth: "680px", margin: "0 auto", position: "relative" }}>
            <div className="tag" style={{ marginBottom: "24px" }}>Transformations</div>
            <h1
              style={{
                fontSize: "clamp(40px, 5vw, 60px)",
                fontWeight: 600,
                color: "#FFFFFF",
                marginBottom: "20px",
                letterSpacing: "-0.02em",
              }}
            >
              Real results from{" "}
              <span className="gold-text">real people</span>
            </h1>
            <p
              style={{
                fontSize: "17px",
                color: "#B7B9C3",
                lineHeight: 1.65,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Not a highlight reel. These are client stories — honest, detailed, and representative of what coaching with CALIBRATE actually looks like.
            </p>
          </div>
        </section>

        {/* Stories */}
        <section style={{ padding: "40px 24px 120px" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            {stories.map((story, si) => (
              <div
                key={si}
                style={{
                  marginBottom: si < stories.length - 1 ? "80px" : 0,
                  background: "rgba(23,23,23,0.6)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "24px",
                  overflow: "hidden",
                }}
              >
                {/* Card header */}
                <div
                  style={{
                    padding: "32px 40px",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    background: "rgba(17,17,20,0.5)",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #FFDE02, #E6C700)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "18px",
                          fontWeight: 700,
                          color: "#07070A",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                      >
                        {story.name[0]}
                      </div>
                      <div>
                        <p style={{ fontSize: "17px", fontWeight: 700, color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {story.name}, {story.age}
                        </p>
                        <p style={{ fontSize: "13px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {story.occupation}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="tag">{story.program}</div>
                </div>

                {/* Headline */}
                <div style={{ padding: "32px 40px 0" }}>
                  <h2
                    style={{
                      fontSize: "clamp(20px, 2.5vw, 28px)",
                      color: "#FFFFFF",
                      marginBottom: "28px",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.2,
                    }}
                  >
                    {story.headline}
                  </h2>

                  {/* Metrics */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "12px",
                      marginBottom: "32px",
                    }}
                    className="metrics-row"
                  >
                    {story.metrics.map((m) => (
                      <div
                        key={m.label}
                        style={{
                          background: "rgba(17,17,20,0.7)",
                          borderRadius: "12px",
                          padding: "16px",
                          border: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <p style={{ fontSize: "11px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                          {m.label}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "14px", fontWeight: 700, color: "#DE3033", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {m.before}
                          </span>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2.5 7H11.5M8 4L11.5 7L8 10" stroke="#B7B9C3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span style={{ fontSize: "14px", fontWeight: 700, color: "#22C55E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {m.after}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Story paragraphs */}
                  <div style={{ marginBottom: "28px" }}>
                    {story.story.map((para, pi) => (
                      <p
                        key={pi}
                        style={{
                          fontSize: "15px",
                          color: "#B7B9C3",
                          lineHeight: 1.75,
                          marginBottom: "16px",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote
                    style={{
                      borderLeft: "3px solid #FFDE02",
                      paddingLeft: "20px",
                      marginBottom: "40px",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "20px",
                      fontStyle: "italic",
                      color: "#FFFFFF",
                      lineHeight: 1.5,
                    }}
                  >
                    "{story.quote}"
                    <cite
                      style={{
                        display: "block",
                        marginTop: "8px",
                        fontSize: "13px",
                        fontStyle: "normal",
                        color: "#B7B9C3",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      — {story.name}
                    </cite>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            padding: "80px 24px 120px",
            background: "rgba(9,9,11,0.5)",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "560px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                color: "#FFFFFF",
                marginBottom: "16px",
                letterSpacing: "-0.02em",
              }}
            >
              Your story starts with a call.
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#B7B9C3",
                lineHeight: 1.65,
                marginBottom: "32px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Every transformation above started with a free 30-minute consultation. Yours can too.
            </p>
            <Link href="/apply" className="btn-primary" style={{ fontSize: "15px", padding: "14px 32px" }}>
              Apply to CALIBRATE
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 600px) {
          .metrics-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
