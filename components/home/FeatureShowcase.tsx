"use client";

import Link from "next/link";
import Icon from "@/components/shared/Icon";

const benefits = [
  {
    icon: "target",
    title: "A Plan Written For You",
    description: "Not a template. Not a generic program. Your training is designed from scratch around your goals, your body, and your life.",
  },
  {
    icon: "leaf",
    title: "Nutrition You Can Sustain",
    description: "Custom macros that actually work with your lifestyle. You'll get lean without giving up the foods you love.",
  },
  {
    icon: "calendar",
    title: "Weekly Check-ins",
    description: "Every week we review your progress, address what's working, and adjust what isn't. No more guessing.",
  },
  {
    icon: "message",
    title: "Direct Coach Access",
    description: "Message your coach anytime inside the app. Questions, struggles, wins — your coach is always on the other side.",
  },
  {
    icon: "trending",
    title: "Progress Tracking",
    description: "Body weight, measurements, strength records, energy — all logged and visible in one place.",
  },
  {
    icon: "dumbbell",
    title: "Workout Guidance",
    description: "Every exercise comes with clear instructions and video demos. You'll never be unsure about form or execution.",
  },
  {
    icon: "refresh",
    title: "Plan Adjustments",
    description: "Travel, injury, schedule change — your coach adapts the plan immediately so you never lose momentum.",
  },
  {
    icon: "brain",
    title: "Mindset Coaching",
    description: "The physical transformation starts in the mind. We work on discipline, habit-building, and removing the mental blocks that held you back.",
  },
];

export default function FeatureShowcase() {
  return (
    <section
      style={{
        padding: "120px 24px",
        background: "rgba(9,9,11,0.5)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ maxWidth: "600px", marginBottom: "64px" }}>
          <div className="tag" style={{ marginBottom: "20px" }}>Why CALIBRATE</div>
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              color: "#FFFFFF",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            Everything you need.{" "}
            <span className="gold-text">Nothing you don't.</span>
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "#B7B9C3",
              lineHeight: 1.65,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Most people fail not because they lack effort — but because they lack the right system and support. CALIBRATE gives you both.
          </p>
        </div>

        {/* Benefits grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.04)",
            borderRadius: "16px",
            overflow: "hidden",
            marginBottom: "64px",
          }}
          className="benefits-grid"
        >
          {benefits.map((b, i) => (
            <div
              key={i}
              style={{
                padding: "32px 28px",
                background: "rgba(17,17,20,0.8)",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(23,23,23,0.95)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(17,17,20,0.8)";
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(255,222,2,0.08)",
                  border: "1px solid rgba(255,222,2,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFDE02",
                  marginBottom: "16px",
                }}
              >
                <Icon name={b.icon} size={18} />
              </div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  marginBottom: "8px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  lineHeight: 1.3,
                }}
              >
                {b.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#B7B9C3", lineHeight: 1.65, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {b.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "16px", color: "#B7B9C3", marginBottom: "20px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Ready to find out what coaching can do for you?
          </p>
          <Link href="/book" className="btn-primary" style={{ fontSize: "15px", padding: "14px 32px" }}>
            Book Your Free Call
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .benefits-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .benefits-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
