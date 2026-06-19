"use client";

import { useState } from "react";

const pillars = [
  {
    id: "training",
    label: "Training",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 10h2M14 10h2M6 10V7M14 10V7M6 7h8M7 7V5h6v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="4" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="16" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    headline: "Training Built For You",
    description:
      "Your workouts are written specifically for your goals, experience level, equipment access, and schedule. Nothing generic. Nothing off the shelf.",
    bullets: [
      "Progressive overload programming",
      "Adapts weekly based on your performance",
      "Works with any equipment setup",
      "Video guidance on every exercise",
    ],
    color: "#D4AF37",
  },
  {
    id: "nutrition",
    label: "Nutrition",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3C10 3 6 7 6 11a4 4 0 008 0c0-4-4-8-4-8z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 11V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    headline: "Nutrition That Actually Works",
    description:
      "A custom nutrition plan that fits your lifestyle — not the other way around. You'll eat the foods you enjoy and still hit your physique goals.",
    bullets: [
      "Custom macros built for your goal",
      "Flexible — no rigid meal plans",
      "Eating out strategies included",
      "Supplement guidance if needed",
    ],
    color: "#22C55E",
  },
  {
    id: "accountability",
    label: "Accountability",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L12 7h5l-4 3 1.5 5L10 12l-4.5 3L7 10 3 7h5L10 2z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    headline: "Accountability That Drives Results",
    description:
      "Weekly check-ins, direct messaging with your coach, and real-time feedback mean you never feel alone — and you never stall without a solution.",
    bullets: [
      "Weekly video or written check-ins",
      "Direct messaging with your coach",
      "Instant plan adjustments if life happens",
      "Progress tracking inside the app",
    ],
    color: "#3B82F6",
  },
  {
    id: "progress",
    label: "Progress",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <polyline points="3,14 7,9 11,12 17,5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="17" cy="5" r="1.5" fill="currentColor" />
      </svg>
    ),
    headline: "Visible, Measurable Progress",
    description:
      "Every week, you can see the difference. Body weight, measurements, strength numbers, energy levels — all tracked so your results are undeniable.",
    bullets: [
      "Weekly body metrics logged",
      "Strength progression charts",
      "Before & after photo tracking",
      "Coach reviews your data every week",
    ],
    color: "#A855F7",
  },
];

export default function ProductEcosystem() {
  const [active, setActive] = useState("training");
  const current = pillars.find((p) => p.id === active) || pillars[0];

  const colorRgb: Record<string, string> = {
    "#D4AF37": "212,175,55",
    "#22C55E": "34,197,94",
    "#3B82F6": "59,130,246",
    "#A855F7": "168,85,247",
  };

  return (
    <section style={{ padding: "120px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="tag" style={{ marginBottom: "20px" }}>What You Get</div>
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              color: "#FFFFFF",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            Everything you need{" "}
            <span className="gold-text">to transform</span>
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "#9AA4B2",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.65,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Four pillars that work together to get you from where you are now to where you want to be.
          </p>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "40px",
            padding: "4px",
            background: "rgba(22,33,45,0.7)",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.06)",
            overflowX: "auto",
          }}
        >
          {pillars.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              style={{
                flex: "1 0 auto",
                padding: "12px 24px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: "all 0.2s ease",
                background: active === p.id ? "rgba(255,255,255,0.08)" : "transparent",
                color: active === p.id ? "#FFFFFF" : "#9AA4B2",
              }}
            >
              <span style={{ color: active === p.id ? p.color : "#9AA4B2" }}>{p.icon}</span>
              {p.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            alignItems: "center",
          }}
          className="ecosystem-content"
        >
          <div>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                background: `rgba(${colorRgb[current.color]}, 0.12)`,
                border: `1px solid rgba(${colorRgb[current.color]}, 0.25)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: current.color,
                marginBottom: "20px",
              }}
            >
              {current.icon}
            </div>
            <h3
              style={{
                fontSize: "clamp(24px, 3vw, 36px)",
                color: "#FFFFFF",
                marginBottom: "16px",
                letterSpacing: "-0.01em",
              }}
            >
              {current.headline}
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#9AA4B2",
                lineHeight: 1.7,
                marginBottom: "28px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {current.description}
            </p>
            <ul style={{ listStyle: "none" }}>
              {current.bullets.map((b) => (
                <li
                  key={b}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "12px",
                    fontSize: "15px",
                    color: "#FFFFFF",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" fill={`rgba(${colorRgb[current.color]}, 0.12)`} />
                    <path d="M5 8l2 2 4-4" stroke={current.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual card */}
          <div
            style={{
              background: "rgba(22,33,45,0.7)",
              border: `1px solid rgba(${colorRgb[current.color]}, 0.15)`,
              borderRadius: "20px",
              padding: "36px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-40px",
                right: "-40px",
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                background: `rgba(${colorRgb[current.color]}, 0.06)`,
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                fontSize: "64px",
                marginBottom: "16px",
                lineHeight: 1,
              }}
            >
              {current.id === "training" && "🏋️"}
              {current.id === "nutrition" && "🥗"}
              {current.id === "accountability" && "📲"}
              {current.id === "progress" && "📈"}
            </div>
            <p
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: current.color,
                fontFamily: "'Barlow Condensed', sans-serif",
                marginBottom: "8px",
                letterSpacing: "-0.01em",
              }}
            >
              {current.id === "training" && "Your program. Your rules."}
              {current.id === "nutrition" && "Eat well. Live well."}
              {current.id === "accountability" && "Never do it alone."}
              {current.id === "progress" && "Results you can see."}
            </p>
            <p style={{ fontSize: "14px", color: "#9AA4B2", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.6 }}>
              {current.id === "training" && "Workouts designed specifically for your body and goals — updated every week."}
              {current.id === "nutrition" && "A flexible approach that gets you lean without feeling restricted."}
              {current.id === "accountability" && "Direct access to your coach. Real feedback. Real support."}
              {current.id === "progress" && "Every metric tracked so you can see exactly how far you've come."}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ecosystem-content { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
