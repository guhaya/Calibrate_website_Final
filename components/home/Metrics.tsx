"use client";

import { useEffect, useRef, useState } from "react";

const metrics = [
  { value: 200, suffix: "+", label: "Clients Transformed", description: "Real people. Real results." },
  { value: 98, suffix: "%", label: "Client Satisfaction", description: "Based on post-program surveys" },
  { value: 9.8, suffix: "kg", label: "Avg Fat Lost (12wk)", description: "Without losing muscle" },
  { value: 4.9, suffix: "/5", label: "Average Rating", description: "From verified client reviews" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(parseFloat(current.toFixed(1)));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const display = target % 1 !== 0 ? count.toFixed(1) : Math.floor(count);

  return (
    <span ref={ref} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {display}
      {suffix}
    </span>
  );
}

export default function Metrics() {
  return (
    <section
      style={{
        padding: "80px 24px",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        background: "rgba(16,22,30,0.6)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "24px",
        }}
        className="metrics-grid"
      >
        {metrics.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              padding: "32px 20px",
              borderRight: i < metrics.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
            }}
            className="metric-item"
          >
            <div
              style={{
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 800,
                lineHeight: 1,
                marginBottom: "8px",
                background: "linear-gradient(135deg, #FFDE02 0%, #FFF07A 50%, #E6C700 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <Counter target={m.value} suffix={m.suffix} />
            </div>
            <p
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: "4px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {m.label}
            </p>
            <p style={{ fontSize: "13px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {m.description}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .metrics-grid { grid-template-columns: 1fr 1fr !important; }
          .metric-item { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.05); }
          .metric-item:nth-child(3), .metric-item:nth-child(4) { border-bottom: none; }
        }
      `}</style>
    </section>
  );
}
