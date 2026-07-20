"use client";

import { useState } from "react";

const testimonials = [
  {
    name: "Marcus T.",
    result: "Lost 14kg in 14 weeks",
    role: "Software Engineer, 34",
    text: "I'd tried everything, gym membership, YouTube programs, two different apps. Nothing stuck. CALIBRATE was different from week one. My coach actually cared about my specific situation and adjusted my plan when I was travelling for work. I genuinely didn't think I could look like this.",
    metrics: { before: "97kg / 28% BF", after: "83kg / 16% BF", weeks: 14 },
  },
  {
    name: "Priya S.",
    result: "Body recomp, first time feeling confident",
    role: "Marketing Director, 29",
    text: "I wasn't looking to lose a huge amount of weight, I just wanted to feel lean and strong. My coach designed a plan that built muscle while I leaned out. The weekly check-ins kept me honest without feeling like I was being judged. I genuinely look forward to my workouts now.",
    metrics: { before: "65kg / 30% BF", after: "62kg / 22% BF", weeks: 16 },
  },
  {
    name: "James O.",
    result: "From 'skinny fat' to genuinely lean",
    role: "Teacher, 27",
    text: "I'd been training for years but never looked like I trained. Turns out my nutrition was completely off and my programming was basically random. CALIBRATE fixed both. My strength went up every single week and I finally have the physique I always wanted.",
    metrics: { before: "76kg / 22% BF", after: "79kg / 13% BF", weeks: 20 },
  },
];

function StarRating() {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#FFDE02">
          <path d="M7 1l1.5 4.5h4.5l-3.5 2.5 1.5 4.5L7 10 3 12.5 4.5 8 1 5.5h4.5L7 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section style={{ padding: "120px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="tag" style={{ marginBottom: "20px" }}>Transformations</div>
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              color: "#FFFFFF",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            Real people.{" "}
            <span className="gold-text">Real results.</span>
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "#B7B9C3",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.65,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Not a highlight reel. These are clients who showed up, did the work, and completely changed their bodies.
          </p>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "40px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                padding: "10px 20px",
                borderRadius: "999px",
                border: active === i ? "1px solid rgba(255,222,2,0.4)" : "1px solid rgba(255,255,255,0.08)",
                background: active === i ? "rgba(255,222,2,0.08)" : "transparent",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 600,
                color: active === i ? "#FFDE02" : "#B7B9C3",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: "all 0.2s ease",
              }}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Card */}
        <div
          style={{
            background: "rgba(23,23,23,0.7)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "24px",
            padding: "48px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "48px",
            alignItems: "start",
          }}
          className="testimonial-card"
        >
          <div>
            <StarRating />
            <blockquote
              style={{
                fontSize: "clamp(17px, 2vw, 22px)",
                color: "#FFFFFF",
                lineHeight: 1.65,
                margin: "20px 0 28px",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              "{testimonials[active].text}"
            </blockquote>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #FFDE02, #E6C700)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#07070A",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {testimonials[active].name[0]}
              </div>
              <div>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {testimonials[active].name}
                </p>
                <p style={{ fontSize: "13px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {testimonials[active].role}
                </p>
              </div>
              <div
                style={{
                  marginLeft: "auto",
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  borderRadius: "999px",
                  padding: "6px 14px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#22C55E",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {testimonials[active].result}
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div
            style={{
              background: "rgba(17,17,20,0.7)",
              borderRadius: "16px",
              padding: "28px 24px",
              minWidth: "180px",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
            className="testimonial-metrics"
          >
            <p
              style={{
                fontSize: "10px",
                color: "#7E8395",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                marginBottom: "16px",
              }}
            >
              Stats
            </p>
            <div style={{ marginBottom: "16px" }}>
              <p style={{ fontSize: "11px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "4px" }}>Before</p>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#DE3033", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {testimonials[active].metrics.before}
              </p>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <p style={{ fontSize: "11px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "4px" }}>After</p>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#22C55E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {testimonials[active].metrics.after}
              </p>
            </div>
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.05)",
                paddingTop: "16px",
              }}
            >
              <p style={{ fontSize: "11px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "4px" }}>Duration</p>
              <p style={{ fontSize: "18px", fontWeight: 800, color: "#FFDE02", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {testimonials[active].metrics.weeks} weeks
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testimonial-card { grid-template-columns: 1fr !important; }
          .testimonial-metrics { min-width: auto !important; display: grid; grid-template-columns: 1fr 1fr 1fr; }
        }
      `}</style>
    </section>
  );
}
