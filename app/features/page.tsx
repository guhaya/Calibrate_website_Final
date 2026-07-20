"use client";

import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import DemoCTA from "@/components/home/DemoCTA";
import Icon from "@/components/shared/Icon";

const sections = [
  {
    id: "training",
    label: "Training",
    headline: "Your training programme, built from scratch",
    description:
      "Not a template. Not a generic plan from the internet. Every session in your programme is written based on your goals, your body, and your available equipment — then updated every week based on your actual performance.",
    features: [
      {
        title: "Progressive overload baked in",
        description: "Every session builds on the last. Your weights, reps, and volume increase systematically — the only way to guarantee consistent progress.",
      },
      {
        title: "Works with any setup",
        description: "Commercial gym, home gym, hotel gym, or bodyweight — your programme is written around what you have, not what we assume.",
      },
      {
        title: "Exercise video library",
        description: "Every movement in your plan has clear video guidance. No second-guessing form. No YouTube rabbit holes.",
      },
      {
        title: "Session logging",
        description: "Log every session in the app. Your coach reviews performance data weekly and adjusts accordingly.",
      },
    ],
    color: "#FFDE02",
    icon: "lightning",
  },
  {
    id: "nutrition",
    label: "Nutrition",
    headline: "Nutrition that works with your life",
    description:
      "Custom macro targets built around your body, your goal, and your lifestyle. Not a rigid meal plan. A flexible framework that lets you eat the foods you enjoy, socialise normally, and still hit your physique targets.",
    features: [
      {
        title: "Custom macros",
        description: "Protein, carbohydrates, and fat targets calculated specifically for your body weight, composition, and goal.",
      },
      {
        title: "Flexible approach",
        description: "No banned foods. No meal-by-meal prescriptions. You hit your targets in a way that fits your life.",
      },
      {
        title: "Eating out guidance",
        description: "Strategies for restaurants, social events, and travel — so real life never becomes an excuse to fall off track.",
      },
      {
        title: "Nutrition phase cycling",
        description: "For Performance clients: your nutrition targets are cycled strategically to drive fat loss while protecting muscle.",
      },
    ],
    color: "#22C55E",
    icon: "leaf",
  },
  {
    id: "accountability",
    label: "Check-ins",
    headline: "Weekly check-ins that actually drive results",
    description:
      "Every week, you complete a structured check-in covering training, nutrition, energy, sleep, and compliance. Your coach reviews everything and responds with specific feedback, plan adjustments, and clear direction for the week ahead.",
    features: [
      {
        title: "Video or written",
        description: "Some clients prefer video check-ins for the personal connection. Others prefer written for convenience. You choose.",
      },
      {
        title: "Data-driven adjustments",
        description: "Your coach doesn't guess. They use your body weight trend, training data, and check-in answers to make precise adjustments.",
      },
      {
        title: "Direct messaging",
        description: "Questions, concerns, or wins between check-ins? Message your coach directly in the app. Responses within 24 hours.",
      },
      {
        title: "No one-size-fits-all",
        description: "Your feedback directly shapes next week's programme. Two clients in the same programme will have completely different experiences based on their progress.",
      },
    ],
    color: "#3B82F6",
    icon: "calendar",
  },
  {
    id: "progress",
    label: "Progress",
    headline: "Track everything. See everything.",
    description:
      "Your transformation is measurable. Body weight, measurements, body fat estimates, strength records, energy, sleep — all logged and visible inside the CALIBRATE app so you can see exactly how far you've come.",
    features: [
      {
        title: "Bodyweight trend",
        description: "Daily weigh-ins plotted as a 7-day average — the most accurate way to track true body weight change versus water fluctuation.",
      },
      {
        title: "Strength records",
        description: "Every personal best logged. Watch your strength climb week by week.",
      },
      {
        title: "Measurements & photos",
        description: "Monthly body measurements and progress photos provide concrete evidence of change beyond the scale.",
      },
      {
        title: "Coach visibility",
        description: "Your coach can see all your data. Nothing is hidden. This is what makes real adjustments possible.",
      },
    ],
    color: "#A855F7",
    icon: "trending",
  },
];

export default function FeaturesPage() {
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
            <div className="tag" style={{ marginBottom: "24px" }}>Inside the Programme</div>
            <h1
              style={{
                fontSize: "clamp(40px, 5vw, 60px)",
                fontWeight: 600,
                color: "#FFFFFF",
                marginBottom: "20px",
                letterSpacing: "-0.02em",
              }}
            >
              Every pillar of your{" "}
              <span className="gold-text">transformation</span>
            </h1>
            <p
              style={{
                fontSize: "17px",
                color: "#B7B9C3",
                lineHeight: 1.65,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Training. Nutrition. Accountability. Progress tracking. Here's what each component looks like inside a CALIBRATE coaching programme.
            </p>
          </div>
        </section>

        {/* Sections */}
        {sections.map((section, si) => {
          const colorRgb: Record<string, string> = {
            "#FFDE02": "255,222,2",
            "#22C55E": "34,197,94",
            "#3B82F6": "59,130,246",
            "#A855F7": "168,85,247",
          };
          const rgb = colorRgb[section.color];
          const isReversed = si % 2 === 1;
          return (
            <section
              key={section.id}
              id={section.id}
              style={{
                padding: "100px 24px",
                background: si % 2 === 1 ? "rgba(9,9,11,0.5)" : "transparent",
              }}
            >
              <div
                style={{
                  maxWidth: "1100px",
                  margin: "0 auto",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "64px",
                  alignItems: "start",
                  direction: isReversed ? "rtl" : "ltr",
                }}
                className="section-grid"
              >
                <div style={{ direction: "ltr" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "6px 14px",
                      background: `rgba(${rgb}, 0.1)`,
                      border: `1px solid rgba(${rgb}, 0.2)`,
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: section.color,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      marginBottom: "20px",
                    }}
                  >
                    <Icon name={section.icon} size={13} style={{ color: section.color }} /> {section.label}
                  </div>
                  <h2
                    style={{
                      fontSize: "clamp(28px, 3.5vw, 44px)",
                      color: "#FFFFFF",
                      marginBottom: "16px",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {section.headline}
                  </h2>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#B7B9C3",
                      lineHeight: 1.7,
                      marginBottom: "32px",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {section.description}
                  </p>
                  <Link href="/book" className="btn-primary" style={{ fontSize: "14px", padding: "12px 24px" }}>
                    Book Free Call
                  </Link>
                </div>

                <div style={{ direction: "ltr" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {section.features.map((f) => (
                      <div
                        key={f.title}
                        style={{
                          background: "rgba(23,23,23,0.6)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          borderRadius: "12px",
                          padding: "20px 24px",
                          display: "flex",
                          gap: "14px",
                          alignItems: "flex-start",
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: "3px", flexShrink: 0 }}>
                          <circle cx="8" cy="8" r="7" fill={`rgba(${rgb}, 0.12)`} />
                          <path d="M5 8l2 2 4-4" stroke={section.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div>
                          <p style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "4px" }}>
                            {f.title}
                          </p>
                          <p style={{ fontSize: "14px", color: "#B7B9C3", lineHeight: 1.6, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {f.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <style>{`
                @media (max-width: 900px) {
                  .section-grid { grid-template-columns: 1fr !important; direction: ltr !important; }
                }
              `}</style>
            </section>
          );
        })}

        <DemoCTA />
      </main>
      <Footer />
    </>
  );
}
