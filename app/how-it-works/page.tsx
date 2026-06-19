import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "How It Works — The CALIBRATE Protocol",
  description: "The DMAIC coaching process explained: Define, Measure, Analyse, Improve, Control — applied to body recomposition for busy professionals. From first call to transformed in 12–24 weeks.",
  openGraph: {
    title: "How It Works | CALIBRATE",
    description: "The DMAIC protocol applied to body recomposition. Custom training, weekly data analysis, and automatic adjustments — built around your actual schedule.",
  },
};

import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const dmaic = [
  {
    letter: "D",
    word: "Define",
    color: "#D4AF37",
    rgb: "212,175,55",
    description: "Constraint mapping around your actual work schedule, lifestyle, and body. We don't fit you into a programme — we build the programme around you.",
  },
  {
    letter: "M",
    word: "Measure",
    color: "#3B82F6",
    rgb: "59,130,246",
    description: "Weekly data analysis with measurable metrics — bodyweight trends, training performance, nutrition compliance, energy, and sleep. No guessing.",
  },
  {
    letter: "A",
    word: "Analyze",
    color: "#22C55E",
    rgb: "34,197,94",
    description: "Root cause diagnosis when progress stalls. Instead of pushing harder, we identify exactly what's blocking results and fix the variable.",
  },
  {
    letter: "I",
    word: "Improve",
    color: "#A855F7",
    rgb: "168,85,247",
    description: "Protocol adjustments based on your actual feedback loop. Nutrition targets, training volume, recovery — everything gets tuned week by week.",
  },
  {
    letter: "C",
    word: "Control",
    color: "#F97316",
    rgb: "249,115,22",
    description: "Self-correcting systems built to handle life disruptions — travel, illness, schedule changes — without derailing months of progress.",
  },
];

const steps = [
  {
    number: "01",
    title: "Free Consultation Call",
    duration: "30 min",
    description:
      "We start with a call to understand where you are, what you've tried, and what you actually want. I'll ask about your training history, nutrition habits, lifestyle, and goals — then tell you exactly what your program will look like.",
    bullets: [
      "No obligation — this is a conversation, not a sales call",
      "Understand your schedule, equipment, and starting point",
      "You'll know whether this is right for you by the end",
    ],
    color: "#D4AF37",
  },
  {
    number: "02",
    title: "Your Custom Program Is Built",
    duration: "Within 48 hours",
    description:
      "After we speak, I build your training and nutrition plan from scratch. Not a template. Every exercise, every calorie target, every macro split — written specifically for you.",
    bullets: [
      "Custom training split based on your goals and schedule",
      "Nutrition targets built around your body and lifestyle",
      "Full exercise library with video guidance",
    ],
    color: "#3B82F6",
  },
  {
    number: "03",
    title: "You Start & We Track Everything",
    duration: "Week 1 onwards",
    description:
      "You access your program inside the CALIBRATE app. Log your sessions, track your nutrition, and send me updates through the week. We use real data to make sure the program is working.",
    bullets: [
      "Daily workout logging inside the app",
      "Nutrition tracking with your custom targets",
      "Bodyweight, measurements, and strength records",
    ],
    color: "#22C55E",
  },
  {
    number: "04",
    title: "Weekly Check-ins & Adjustments",
    duration: "Every week",
    description:
      "Every week, you complete a check-in: how training felt, energy levels, sleep, compliance. I review everything and adjust the plan accordingly. No two weeks are exactly the same — your program evolves as you do.",
    bullets: [
      "Video or written check-in each week",
      "I review your data before every response",
      "Plan updated immediately based on progress",
    ],
    color: "#A855F7",
  },
  {
    number: "05",
    title: "Real Results. Lasting Change.",
    duration: "12-24 weeks",
    description:
      "By the end of your program, you won't just look different — you'll know exactly how to train and eat for the rest of your life. Most clients continue beyond their first program because this becomes a new standard for them.",
    bullets: [
      "Body composition results you can measure",
      "Strength gains you can track week by week",
      "The knowledge and habits to maintain this forever",
    ],
    color: "#D4AF37",
  },
];

export default function HowItWorksPage() {
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
              background: "radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.05) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ maxWidth: "680px", margin: "0 auto", position: "relative" }}>
            <div className="tag" style={{ marginBottom: "24px" }}>The Process</div>
            <h1
              style={{
                fontSize: "clamp(40px, 5vw, 60px)",
                fontWeight: 600,
                color: "#FFFFFF",
                marginBottom: "20px",
                letterSpacing: "-0.02em",
              }}
            >
              From first call to{" "}
              <span className="gold-text">transformed</span>
            </h1>
            <p
              style={{
                fontSize: "17px",
                color: "#9AA4B2",
                lineHeight: 1.65,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Every CALIBRATE coaching journey follows a clear process. Here's exactly what happens from the moment you book your free call.
            </p>
          </div>
        </section>

        {/* DMAIC Protocol */}
        <section style={{ padding: "80px 24px", background: "rgba(12,18,26,0.5)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <div className="tag" style={{ marginBottom: "20px" }}>The Calibration Protocol</div>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 48px)", color: "#FFFFFF", letterSpacing: "-0.02em", marginBottom: "16px" }}>
                DMAIC — applied to{" "}
                <span className="gold-text">body optimisation</span>
              </h2>
              <p style={{ fontSize: "16px", color: "#9AA4B2", lineHeight: 1.65, fontFamily: "'Plus Jakarta Sans', sans-serif", maxWidth: "580px", margin: "0 auto 56px" }}>
                The same data-driven framework used in aerospace and precision engineering — adapted for body recomposition. Not motivation. Not guesswork. A process.
              </p>
            </div>

            {/* DMAIC cards */}
            <div
              style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}
              className="dmaic-grid"
            >
              {dmaic.map((d) => (
                <div
                  key={d.letter}
                  style={{
                    background: "rgba(22,33,45,0.7)",
                    border: `1px solid rgba(${d.rgb}, 0.2)`,
                    borderRadius: "16px",
                    padding: "28px 20px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      fontSize: "80px",
                      fontWeight: 900,
                      color: `rgba(${d.rgb}, 0.04)`,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      lineHeight: 1,
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  >
                    {d.letter}
                  </div>
                  <div
                    style={{
                      width: "44px", height: "44px", borderRadius: "12px",
                      background: `rgba(${d.rgb}, 0.12)`,
                      border: `1px solid rgba(${d.rgb}, 0.25)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "22px", fontWeight: 800, color: d.color,
                      marginBottom: "16px",
                    }}
                  >
                    {d.letter}
                  </div>
                  <p style={{ fontSize: "11px", fontWeight: 700, color: d.color, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "10px" }}>
                    {d.word}
                  </p>
                  <p style={{ fontSize: "13px", color: "#9AA4B2", lineHeight: 1.65, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {d.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Philosophy callout */}
            <div
              style={{
                marginTop: "32px",
                padding: "28px 36px",
                background: "rgba(212,175,55,0.05)",
                border: "1px solid rgba(212,175,55,0.15)",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                gap: "24px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: "4px", minHeight: "48px", borderRadius: "2px",
                  background: "linear-gradient(to bottom, #D4AF37, transparent)",
                  flexShrink: 0,
                }}
              />
              <div>
                <p style={{ fontSize: "18px", fontWeight: 700, color: "#FFFFFF", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.02em", marginBottom: "6px" }}>
                  &ldquo;Your body is a process. Processes can be optimised.&rdquo;
                </p>
                <p style={{ fontSize: "13px", color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  — Guhayavarman, Founder & Head Coach
                </p>
              </div>
            </div>
          </div>
          <style>{`
            @media (max-width: 900px) { .dmaic-grid { grid-template-columns: 1fr 1fr !important; } }
            @media (max-width: 500px) { .dmaic-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>

        {/* Steps */}
        <section style={{ padding: "80px 24px 120px" }}>
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            {steps.map((step, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: "32px",
                  marginBottom: i < steps.length - 1 ? "56px" : 0,
                  position: "relative",
                }}
                className="step-row"
              >
                {/* Left: number + line */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "16px",
                      background: `rgba(${step.color === "#D4AF37" ? "212,175,55" : step.color === "#3B82F6" ? "59,130,246" : step.color === "#22C55E" ? "34,197,94" : step.color === "#A855F7" ? "168,85,247" : "212,175,55"}, 0.1)`,
                      border: `1px solid rgba(${step.color === "#D4AF37" ? "212,175,55" : step.color === "#3B82F6" ? "59,130,246" : step.color === "#22C55E" ? "34,197,94" : step.color === "#A855F7" ? "168,85,247" : "212,175,55"}, 0.25)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "22px",
                      fontWeight: 600,
                      color: step.color,
                      flexShrink: 0,
                    }}
                  >
                    {step.number}
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      style={{
                        width: "1px",
                        flex: 1,
                        background: "linear-gradient(to bottom, rgba(212,175,55,0.2), transparent)",
                        marginTop: "12px",
                        minHeight: "40px",
                      }}
                    />
                  )}
                </div>

                {/* Right: content */}
                <div
                  style={{
                    background: "rgba(22,33,45,0.6)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "16px",
                    padding: "32px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: "12px",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "clamp(20px, 2.5vw, 26px)",
                        color: "#FFFFFF",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {step.title}
                    </h2>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: step.color,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        background: `rgba(${step.color === "#D4AF37" ? "212,175,55" : step.color === "#3B82F6" ? "59,130,246" : step.color === "#22C55E" ? "34,197,94" : step.color === "#A855F7" ? "168,85,247" : "212,175,55"}, 0.1)`,
                        padding: "4px 10px",
                        borderRadius: "999px",
                        border: `1px solid rgba(${step.color === "#D4AF37" ? "212,175,55" : step.color === "#3B82F6" ? "59,130,246" : step.color === "#22C55E" ? "34,197,94" : step.color === "#A855F7" ? "168,85,247" : "212,175,55"}, 0.2)`,
                        flexShrink: 0,
                      }}
                    >
                      {step.duration}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "#9AA4B2",
                      lineHeight: 1.7,
                      marginBottom: "20px",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {step.description}
                  </p>
                  <ul style={{ listStyle: "none" }}>
                    {step.bullets.map((b) => (
                      <li
                        key={b}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                          marginBottom: "8px",
                          fontSize: "14px",
                          color: "#FFFFFF",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginTop: "2px", flexShrink: 0 }}>
                          <path d="M2.5 7L5.5 10L11.5 4" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            padding: "80px 24px 120px",
            textAlign: "center",
            background: "rgba(12,18,26,0.5)",
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
              Ready to get started?
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#9AA4B2",
                lineHeight: 1.65,
                marginBottom: "32px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Step one is a free 30-minute call. No commitment, no pressure.
            </p>
            <Link href="/book" className="btn-primary" style={{ fontSize: "15px", padding: "14px 32px" }}>
              Book Free Consultation
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
