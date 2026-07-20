import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Current Clients | Portal",
  description: "CALIBRATE client portal. Access your protocol, track check-ins, and connect with your coach.",
  robots: { index: false, follow: false },
};

import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Icon from "@/components/shared/Icon";

const experiences = [
  {
    phase: "Week 1–2",
    title: "You get your full programme",
    description: "Within 48 hours of your first call, your complete training and nutrition plan lands in the CALIBRATE app. Every session is already loaded, every meal target is set, every exercise has video guidance. You start with complete clarity.",
    icon: "target",
    color: "#FFDE02",
  },
  {
    phase: "Week 3–4",
    title: "The momentum builds",
    description: "You're tracking sessions, logging nutrition, and sending check-ins. Your coach reviews everything weekly and sends feedback. Small adjustments. Big compounding results. Most clients report visible changes by week four.",
    icon: "trending",
    color: "#22C55E",
  },
  {
    phase: "Week 5–8",
    title: "You hit your stride",
    description: "By now you're not thinking about the plan, you're living it. Training feels natural. Nutrition is second nature. Your coach adjusts intensity and targets as your fitness improves. This is where the real progress accelerates.",
    icon: "lightning",
    color: "#3B82F6",
  },
  {
    phase: "Week 9–12",
    title: "The transformation is visible",
    description: "The before and after difference is undeniable. Strength is up. Body composition is transformed. You have the system, the habits, and the knowledge to maintain this for the rest of your life.",
    icon: "star",
    color: "#A855F7",
  },
];

const inclusions = [
  { icon: "lightning", title: "Custom Training Programme", desc: "Built for your goals, schedule, and equipment." },
  { icon: "leaf", title: "Nutrition Targets", desc: "Custom macros with flexible guidance for real life." },
  { icon: "calendar", title: "Weekly Check-ins", desc: "Video or written, you decide what works for you." },
  { icon: "message", title: "Direct Coach Access", desc: "Message anytime. Responses within 24 hours." },
  { icon: "trending", title: "Progress App", desc: "Log workouts, track body metrics, see your data." },
  { icon: "dumbbell", title: "Exercise Library", desc: "Video guidance on every movement in your plan." },
  { icon: "refresh", title: "Plan Adjustments", desc: "Updated every week based on your actual progress." },
  { icon: "supplement", title: "Supplement Guidance", desc: "Evidence-based recommendations only." },
];

export default function ClientsPage() {
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
            <div className="tag" style={{ marginBottom: "24px" }}>Your Experience</div>
            <h1
              style={{
                fontSize: "clamp(40px, 5vw, 60px)",
                fontWeight: 600,
                color: "#FFFFFF",
                marginBottom: "20px",
                letterSpacing: "-0.02em",
              }}
            >
              What coaching with{" "}
              <span className="gold-text">CALIBRATE</span> looks like
            </h1>
            <p
              style={{
                fontSize: "17px",
                color: "#B7B9C3",
                lineHeight: 1.65,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              From day one to your final result, here's exactly what you get, what to expect, and how the process works.
            </p>
          </div>
        </section>

        {/* Journey phases */}
        <section style={{ padding: "40px 24px 100px" }}>
          <div style={{ maxWidth: "880px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <h2
                style={{
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  marginBottom: "12px",
                }}
              >
                Your 12-week journey
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#B7B9C3",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  lineHeight: 1.65,
                }}
              >
                Every phase is designed. Nothing is left to chance.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {experiences.map((exp, i) => {
                const colorRgb: Record<string, string> = {
                  "#FFDE02": "255,222,2",
                  "#22C55E": "34,197,94",
                  "#3B82F6": "59,130,246",
                  "#A855F7": "168,85,247",
                };
                const rgb = colorRgb[exp.color];
                return (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "160px 1fr",
                      gap: "0",
                      background: "rgba(23,23,23,0.6)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "16px",
                      overflow: "hidden",
                    }}
                    className="experience-row"
                  >
                    <div
                      style={{
                        padding: "32px 24px",
                        background: `rgba(${rgb}, 0.06)`,
                        borderRight: `1px solid rgba(${rgb}, 0.12)`,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "10px",
                          background: `rgba(${rgb}, 0.12)`,
                          border: `1px solid rgba(${rgb}, 0.25)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: exp.color,
                          marginBottom: "12px",
                        }}
                      >
                        <Icon name={exp.icon} size={18} />
                      </div>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: exp.color,
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                        }}
                      >
                        {exp.phase}
                      </p>
                    </div>
                    <div style={{ padding: "32px" }}>
                      <h3
                        style={{
                          fontSize: "clamp(18px, 2vw, 22px)",
                          color: "#FFFFFF",
                          marginBottom: "10px",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {exp.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "15px",
                          color: "#B7B9C3",
                          lineHeight: 1.7,
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                      >
                        {exp.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <style>{`
            @media (max-width: 600px) {
              .experience-row { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>

        {/* What's included */}
        <section style={{ padding: "80px 24px", background: "rgba(9,9,11,0.5)" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <div className="tag" style={{ marginBottom: "20px" }}>All Inclusive</div>
              <h2
                style={{
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                }}
              >
                Everything included in your programme
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "16px",
              }}
              className="inclusions-grid"
            >
              {inclusions.map((inc, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(23,23,23,0.6)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "14px",
                    padding: "24px",
                  }}
                >
                  <div
                    style={{
                      color: "#FFDE02",
                      marginBottom: "12px",
                    }}
                  >
                    <Icon name={inc.icon} size={20} />
                  </div>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      marginBottom: "6px",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {inc.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#B7B9C3",
                      lineHeight: 1.6,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {inc.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 900px) { .inclusions-grid { grid-template-columns: 1fr 1fr !important; } }
            @media (max-width: 500px) { .inclusions-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>

        {/* CTA */}
        <section style={{ padding: "100px 24px 120px", textAlign: "center" }}>
          <div style={{ maxWidth: "560px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                color: "#FFFFFF",
                marginBottom: "16px",
                letterSpacing: "-0.02em",
              }}
            >
              Ready to start your journey?
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
              Book your free 30-minute call today. We'll map out your programme and get you started within the week.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/book" className="btn-primary" style={{ fontSize: "15px", padding: "14px 32px" }}>
                Book Free Call
              </Link>
              <Link href="/pricing" className="btn-secondary" style={{ fontSize: "15px", padding: "14px 28px" }}>
                View Packages
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
