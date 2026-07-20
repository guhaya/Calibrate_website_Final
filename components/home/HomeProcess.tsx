"use client";

import { useState } from "react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Free Consultation",
    duration: "30 minutes",
    color: "#FFDE02",
    rgb: "255,222,2",
    description:
      "We start with a no-obligation call to understand where you are right now, what you've tried before, and exactly what you want to achieve. You'll leave with clarity, whether you move forward or not.",
    details: [
      "Current situation & history",
      "Goal clarification",
      "Lifestyle & schedule audit",
      "Nutrition habits baseline",
      "Q&A: ask anything",
    ],
    outcome: "You'll know exactly what's holding you back.",
  },
  {
    number: "02",
    title: "Full Assessment",
    duration: "Week 1",
    color: "#3B82F6",
    rgb: "59,130,246",
    description:
      "Before we write a single workout, we assess your training history, current stats, equipment access, food preferences, and recovery capacity. Every variable is accounted for.",
    details: [
      "Body measurements & photos",
      "Strength baseline testing",
      "Metabolic rate calculation",
      "Equipment & gym access check",
      "Recovery & sleep profile",
    ],
    outcome: "Your data becomes your starting point, not a guess.",
  },
  {
    number: "03",
    title: "Personalised Plan",
    duration: "Week 1–2",
    color: "#22C55E",
    rgb: "34,197,94",
    description:
      "Your training programme and nutrition targets are built from scratch, no templates. Your plan is designed around your life, not the other way around.",
    details: [
      "Custom training programme",
      "Macro targets & meal timing",
      "Exercise video library access",
      "CALIBRATE app onboarding",
      "Supplement stack (if applicable)",
    ],
    outcome: "A plan you can actually follow, built for you, not the internet.",
  },
  {
    number: "04",
    title: "Weekly Accountability",
    duration: "Ongoing",
    color: "#A855F7",
    rgb: "168,85,247",
    description:
      "Every week you check in. Every week your coach responds with specific adjustments, feedback, and direction. Nothing slips through the cracks. Nothing is left to guesswork.",
    details: [
      "Structured weekly check-in",
      "Training data review",
      "Nutrition adherence tracking",
      "Plan adjustments each week",
      "Direct coach messaging",
    ],
    outcome: "Consistency becomes a system, not a personality trait.",
  },
  {
    number: "05",
    title: "Transformation",
    duration: "12+ weeks",
    color: "#F97316",
    rgb: "249,115,22",
    description:
      "The results accumulate. Body composition shifts. Strength climbs. Habits are ingrained. Most clients continue beyond their initial programme because the lifestyle sticks.",
    details: [
      "Body composition change",
      "Strength personal bests",
      "Sustainable habit formation",
      "Progress photo documentation",
      "Programme continuation options",
    ],
    outcome: "A body and mindset you maintain for life.",
  },
];

export default function HomeProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const step = steps[activeStep];

  return (
    <section
      className="home-process-section"
      style={{
        padding: "120px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(9,9,11,0.6)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(800px, 100%)",
          height: "min(800px, 100vw)",
          background: `radial-gradient(ellipse, rgba(${step.rgb}, 0.04) 0%, transparent 70%)`,
          pointerEvents: "none",
          transition: "background 0.5s ease",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <div className="section-eyebrow" style={{ marginBottom: "20px" }}>
            The Process
          </div>
          <h2
            style={{
              fontSize: "clamp(36px, 4.5vw, 56px)",
              fontWeight: 600,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            How your{" "}
            <span className="gold-text">transformation</span> unfolds
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "#B7B9C3",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.65,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            From first conversation to lasting results, a structured process
            that removes all the guesswork.
          </p>
        </div>

        {/* Step navigator */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0",
            marginBottom: "64px",
            position: "relative",
          }}
        >
          {/* Connector line */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "calc(10% + 20px)",
              right: "calc(10% + 20px)",
              height: "1px",
              background: "rgba(255,255,255,0.08)",
              zIndex: 0,
            }}
          />
          {/* Active progress */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "calc(10% + 20px)",
              width: `${(activeStep / (steps.length - 1)) * (80)}%`,
              height: "1px",
              background: `rgba(${step.rgb}, 0.5)`,
              zIndex: 0,
              transition: "width 0.4s ease, background 0.4s ease",
            }}
          />
          {steps.map((s, i) => (
            <button
              key={s.number}
              onClick={() => setActiveStep(i)}
              style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                background: "none",
                border: "none",
                cursor: "pointer",
                position: "relative",
                zIndex: 1,
                padding: "0 8px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background:
                    i === activeStep
                      ? s.color
                      : i < activeStep
                      ? `rgba(${s.rgb}, 0.3)`
                      : "rgba(255,255,255,0.06)",
                  border: `2px solid ${
                    i === activeStep
                      ? s.color
                      : i < activeStep
                      ? `rgba(${s.rgb}, 0.4)`
                      : "rgba(255,255,255,0.1)"
                  }`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: i === activeStep ? "#07070A" : i < activeStep ? s.color : "#6B7280",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {i < activeStep ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className="process-step-label"
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: i === activeStep ? "#FFFFFF" : "#6B7280",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  transition: "color 0.3s ease",
                }}
              >
                {s.title}
              </span>
            </button>
          ))}
        </div>

        {/* Step detail card */}
        <div
          key={activeStep}
          style={{
            background: "rgba(16,24,35,0.8)",
            border: `1px solid rgba(${step.rgb}, 0.2)`,
            borderRadius: "20px",
            padding: "48px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "start",
            animation: "scale-up 0.25s ease",
          }}
          className="process-card"
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                background: `rgba(${step.rgb}, 0.1)`,
                border: `1px solid rgba(${step.rgb}, 0.2)`,
                borderRadius: "999px",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: step.color,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Step {step.number}
              </span>
              <span
                style={{
                  width: "1px",
                  height: "10px",
                  background: `rgba(${step.rgb}, 0.3)`,
                }}
              />
              <span
                style={{
                  fontSize: "11px",
                  color: `rgba(${step.rgb}, 0.7)`,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {step.duration}
              </span>
            </div>
            <h3
              style={{
                fontSize: "clamp(28px, 3vw, 40px)",
                color: "#FFFFFF",
                marginBottom: "16px",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#B7B9C3",
                lineHeight: 1.7,
                marginBottom: "28px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {step.description}
            </p>

            {/* Outcome callout */}
            <div
              style={{
                background: `rgba(${step.rgb}, 0.06)`,
                border: `1px solid rgba(${step.rgb}, 0.15)`,
                borderRadius: "10px",
                padding: "16px 20px",
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{ flexShrink: 0, marginTop: "2px" }}
              >
                <path
                  d="M8 1v6l3 3"
                  stroke={step.color}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle
                  cx="8"
                  cy="8"
                  r="6.5"
                  stroke={step.color}
                  strokeWidth="1"
                  opacity="0.4"
                />
              </svg>
              <p
                style={{
                  fontSize: "14px",
                  color: step.color,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {step.outcome}
              </p>
            </div>
          </div>

          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#6B7280",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              What&apos;s covered
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {step.details.map((detail) => (
                <div
                  key={detail}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="7" cy="7" r="6" fill={`rgba(${step.rgb}, 0.12)`} />
                    <path
                      d="M4.5 7l2 2 3-3"
                      stroke={step.color}
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#D1D5DB",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {detail}
                  </span>
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "28px",
                alignItems: "center",
              }}
            >
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: activeStep === 0 ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: activeStep === 0 ? "#3D4550" : "#B7B9C3",
                  cursor: activeStep === 0 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M8.5 3.5L5.5 7l3 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                disabled={activeStep === steps.length - 1}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background:
                    activeStep === steps.length - 1
                      ? "rgba(255,255,255,0.04)"
                      : `rgba(${step.rgb}, 0.15)`,
                  border: `1px solid ${
                    activeStep === steps.length - 1
                      ? "rgba(255,255,255,0.1)"
                      : `rgba(${step.rgb}, 0.3)`
                  }`,
                  color:
                    activeStep === steps.length - 1 ? "#3D4550" : step.color,
                  cursor:
                    activeStep === steps.length - 1 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5.5 3.5L8.5 7l-3 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {activeStep === steps.length - 1 && (
                <Link
                  href="/book"
                  className="btn-primary"
                  style={{ fontSize: "13px", padding: "10px 20px", marginLeft: "8px" }}
                >
                  Start your journey
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Step dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "6px",
            marginTop: "24px",
          }}
        >
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              style={{
                width: i === activeStep ? "20px" : "6px",
                height: "6px",
                borderRadius: "999px",
                background: i === activeStep ? step.color : "rgba(255,255,255,0.15)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-card { grid-template-columns: 1fr !important; gap: 32px !important; padding: 28px !important; }
        }
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
