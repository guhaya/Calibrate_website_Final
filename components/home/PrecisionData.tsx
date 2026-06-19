"use client";
import { useEffect, useRef, useState } from "react";

function Sparkline({ data, color = "#D4AF37" }: { data: number[]; color?: string }) {
  const w = 56, h = 22;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 2) - 1}`)
    .join(" ");
  const last = pts.split(" ").at(-1)?.split(",") ?? ["0", "0"];
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible", flexShrink: 0 }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" opacity={0.7} />
      <circle cx={last[0]} cy={last[1]} r="2.5" fill={color} />
    </svg>
  );
}

function BodyFigure() {
  const [scanPct, setScanPct] = useState(0);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    let prev = 0;
    const tick = (now: number) => {
      const dt = now - prev;
      prev = now;
      timeRef.current = (timeRef.current + dt * 0.028) % 100;
      setScanPct(timeRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const joints: [number, number][] = [
    [80, 36],   // head
    [80, 76],   // neck
    [48, 90],   // L shoulder
    [112, 90],  // R shoulder
    [32, 160],  // L elbow
    [128, 160], // R elbow
    [24, 222],  // L wrist
    [136, 222], // R wrist
    [60, 255],  // L hip
    [100, 255], // R hip
    [56, 345],  // L knee
    [104, 345], // R knee
    [54, 420],  // L ankle
    [106, 420], // R ankle
  ];

  const bones: [number, number][] = [
    [0, 1], [1, 2], [1, 3],  // spine, shoulders
    [2, 4], [4, 6],           // L arm
    [3, 5], [5, 7],           // R arm
    [1, 8], [1, 9],           // torso to hips (approximated)
    [8, 10], [10, 12],        // L leg
    [9, 11], [11, 13],        // R leg
    [8, 9],                   // hip span
    [2, 3],                   // shoulder span
  ];

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "200px", margin: "0 auto" }}>
      {/* Base glow */}
      <div style={{
        position: "absolute", bottom: "-16px", left: "50%",
        transform: "translateX(-50%)",
        width: "110px", height: "18px",
        background: "radial-gradient(ellipse, rgba(212,175,55,0.55) 0%, transparent 70%)",
        filter: "blur(6px)",
        borderRadius: "50%",
      }} />

      <svg viewBox="0 0 160 450" style={{ width: "100%", height: "auto", overflow: "visible" }}>
        <defs>
          {/* Body silhouette clip path */}
          <clipPath id="body-clip">
            <circle cx="80" cy="36" r="25" />
            {/* Neck */}
            <rect x="72" y="60" width="16" height="18" rx="4" />
            {/* Torso */}
            <path d="M 46,78 Q 80,72 114,78 L 120,165 Q 110,240 100,255 L 60,255 Q 50,240 40,165 Z" />
            {/* Left arm */}
            <path d="M 46,82 L 32,88 L 18,162 L 16,228 L 30,228 L 34,164 L 48,94 Z" />
            {/* Right arm */}
            <path d="M 114,82 L 128,88 L 142,162 L 144,228 L 130,228 L 126,164 L 112,94 Z" />
            {/* Left leg */}
            <path d="M 46,252 L 68,252 L 66,350 L 62,430 L 46,430 L 44,350 Z" />
            {/* Right leg */}
            <path d="M 92,252 L 114,252 L 116,350 L 114,430 L 98,430 L 94,350 Z" />
          </clipPath>

          <filter id="joint-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          <filter id="scan-glow" x="-10%" y="-100%" width="120%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          <linearGradient id="body-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(212,175,55,0.12)" />
            <stop offset="100%" stopColor="rgba(212,175,55,0.04)" />
          </linearGradient>
        </defs>

        {/* Filled body with grid inside clip */}
        <g clipPath="url(#body-clip)">
          <rect x="0" y="0" width="160" height="450" fill="url(#body-fill)" />
          {/* Horizontal grid lines */}
          {Array.from({ length: 24 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 20} x2="160" y2={i * 20}
              stroke="rgba(212,175,55,0.10)" strokeWidth="0.7" />
          ))}
          {/* Vertical grid lines */}
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="450"
              stroke="rgba(212,175,55,0.10)" strokeWidth="0.7" />
          ))}
          {/* Diagonal accent lines */}
          {Array.from({ length: 12 }, (_, i) => (
            <line key={`d${i}`}
              x1={-40 + i * 28} y1="0" x2={-40 + i * 28 + 200} y2="450"
              stroke="rgba(212,175,55,0.04)" strokeWidth="0.6" />
          ))}

          {/* Scan line */}
          <rect x="0" y={`${scanPct}%`} width="160" height="6"
            fill="rgba(212,175,55,0.18)" filter="url(#scan-glow)" />
          <rect x="0" y={`${scanPct}%`} width="160" height="1.5"
            fill="rgba(212,175,55,0.95)" />
          <rect x="0" y={`${scanPct}%`} width="160" height="0.5"
            fill="rgba(255,240,160,1)" />
        </g>

        {/* Bone connectors */}
        {bones.map(([a, b], i) => (
          <line key={i}
            x1={joints[a][0]} y1={joints[a][1]}
            x2={joints[b][0]} y2={joints[b][1]}
            stroke="rgba(212,175,55,0.22)" strokeWidth="1"
          />
        ))}

        {/* Center spine dashed */}
        <line x1="80" y1="76" x2="80" y2="255"
          stroke="rgba(212,175,55,0.18)" strokeWidth="0.8" strokeDasharray="3 5" />

        {/* Measurement tick marks */}
        {[90, 165, 255, 345].map((y, i) => (
          <g key={i}>
            <line x1="-8" y1={y} x2="10" y2={y} stroke="rgba(212,175,55,0.45)" strokeWidth="0.8" />
            <line x1="150" y1={y} x2="168" y2={y} stroke="rgba(212,175,55,0.45)" strokeWidth="0.8" />
          </g>
        ))}

        {/* Joint nodes */}
        {joints.map(([cx, cy], i) => (
          <g key={i} filter="url(#joint-glow)">
            <circle cx={cx} cy={cy} r={i === 0 ? 0 : 4.5}
              fill="rgba(212,175,55,0.12)" stroke="rgba(212,175,55,0.6)" strokeWidth="1" />
            <circle cx={cx} cy={cy} r={i === 0 ? 0 : 1.8} fill="rgba(212,175,55,0.95)" />
          </g>
        ))}

        {/* Body outline strokes */}
        <circle cx="80" cy="36" r="25" fill="none"
          stroke="rgba(212,175,55,0.55)" strokeWidth="1.2" filter="url(#joint-glow)" />
        <path d="M 46,78 Q 80,72 114,78 L 120,165 Q 110,240 100,255 L 60,255 Q 50,240 40,165 Z"
          fill="none" stroke="rgba(212,175,55,0.45)" strokeWidth="1" />
        <path d="M 46,82 L 32,88 L 18,162 L 16,228 L 30,228 L 34,164 L 48,94 Z"
          fill="none" stroke="rgba(212,175,55,0.35)" strokeWidth="1" />
        <path d="M 114,82 L 128,88 L 142,162 L 144,228 L 130,228 L 126,164 L 112,94 Z"
          fill="none" stroke="rgba(212,175,55,0.35)" strokeWidth="1" />
        <path d="M 46,252 L 68,252 L 66,350 L 62,430 L 46,430 L 44,350 Z"
          fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="1" />
        <path d="M 92,252 L 114,252 L 116,350 L 114,430 L 98,430 L 94,350 Z"
          fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="1" />

        {/* Platform ring */}
        <ellipse cx="80" cy="442" rx="52" ry="8"
          fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
        <ellipse cx="80" cy="442" rx="36" ry="5"
          fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

const METRICS = [
  {
    label: "Body Fat",
    value: "14.7%",
    rating: "Athletic Range",
    pct: 0.85,
    trend: [22, 20, 18.5, 17.2, 16.1, 15.3, 14.7],
    side: "left",
  },
  {
    label: "Muscle Mass",
    value: "72.4%",
    rating: "Excellent",
    pct: 0.72,
    trend: [62, 64, 66.5, 68, 70, 71.5, 72.4],
    side: "left",
  },
  {
    label: "VO₂ Max",
    value: "46.2",
    rating: "Above Average",
    pct: 0.68,
    trend: [38, 40, 41.5, 43, 44.5, 45.5, 46.2],
    side: "right",
  },
  {
    label: "Metabolic Age",
    value: "29 yrs",
    rating: "5 yrs younger",
    pct: 0.82,
    trend: [35, 34, 33, 32, 31, 30, 29],
    side: "right",
  },
];

const BADGES = [
  { symbol: "◎", label: "Data-Driven" },
  { symbol: "◈", label: "Weekly Analysis" },
  { symbol: "⊕", label: "Auto-Adjusted" },
  { symbol: "⟡", label: "Zero Guesswork" },
];

export default function PrecisionData() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const leftMetrics = METRICS.filter((m) => m.side === "left");
  const rightMetrics = METRICS.filter((m) => m.side === "right");

  return (
    <section
      ref={sectionRef}
      style={{ padding: "100px 24px 120px", position: "relative", overflow: "hidden" }}
    >
      {/* Section ambient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(212,175,55,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.025) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 75%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          textAlign: "center", marginBottom: "72px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          <div className="hud-label" style={{ justifyContent: "center", marginBottom: "20px" }}>
            CALIBRATE DATA PROTOCOL
          </div>
          <h2 style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 0.95,
            letterSpacing: "-0.025em",
            marginBottom: "20px",
          }}>
            Precision Body<br />
            <span className="gold-text">Composition Insights</span>
          </h2>
          <p style={{
            fontSize: "17px", color: "#8A96A8", lineHeight: 1.65,
            maxWidth: "480px", margin: "0 auto",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            Every variable tracked. Every metric analysed. Your protocol adjusts weekly — because real data, not assumptions, drives real results.
          </p>
        </div>

        {/* Main 3-column layout */}
        <div className="precision-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 220px 1fr",
          gap: "32px",
          alignItems: "center",
        }}>
          {/* Left metrics */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {leftMetrics.map((m, i) => (
              <MetricCard
                key={m.label}
                metric={m}
                delay={i * 0.12}
                visible={visible}
                dir="left"
              />
            ))}
          </div>

          {/* Center body scan */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
            transition: "opacity 0.9s ease 0.15s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s",
          }}>
            <BodyFigure />
          </div>

          {/* Right metrics */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {rightMetrics.map((m, i) => (
              <MetricCard
                key={m.label}
                metric={m}
                delay={i * 0.12}
                visible={visible}
                dir="right"
              />
            ))}
          </div>
        </div>

        {/* Bottom badges */}
        <div style={{
          display: "flex", gap: "32px", justifyContent: "center", flexWrap: "wrap",
          marginTop: "72px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
        }}>
          {BADGES.map((b) => (
            <div key={b.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "50%",
                background: "rgba(212,175,55,0.07)",
                border: "1px solid rgba(212,175,55,0.22)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "20px", color: "#D4AF37",
              }}>
                {b.symbol}
              </div>
              <span style={{
                fontSize: "11px", color: "#8A96A8",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
              }}>
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .precision-grid { grid-template-columns: 1fr !important; }
          .precision-grid > div:nth-child(2) { order: -1; max-width: 200px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}

function MetricCard({
  metric,
  delay,
  visible,
  dir,
}: {
  metric: typeof METRICS[0];
  delay: number;
  visible: boolean;
  dir: "left" | "right";
}) {
  const [filled, setFilled] = useState(false);
  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setFilled(true), (delay + 0.5) * 1000);
      return () => clearTimeout(t);
    }
  }, [visible, delay]);

  return (
    <div
      className="hud-corners"
      style={{
        background: "rgba(20,32,46,0.72)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px",
        padding: "22px 24px",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0)"
          : `translateX(${dir === "left" ? "-28px" : "28px"})`,
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "14px" }}>
        <div>
          <p style={{
            fontSize: "10px", color: "#5A6475",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px",
          }}>
            {metric.label}
          </p>
          <p style={{
            fontSize: "30px", fontWeight: 800, color: "#FFFFFF",
            fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1,
          }}>
            {metric.value}
          </p>
          <p style={{
            fontSize: "11px", color: "#D4AF37", fontWeight: 700,
            fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: "5px",
          }}>
            ↑ {metric.rating}
          </p>
        </div>
        <div style={{ paddingTop: "4px" }}>
          <Sparkline data={metric.trend} />
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        height: "3px", borderRadius: "999px",
        background: "rgba(255,255,255,0.05)", overflow: "hidden",
      }}>
        <div style={{
          height: "100%", borderRadius: "999px",
          background: "linear-gradient(90deg, #9A7020, #D4AF37, #F0D060)",
          width: filled ? `${metric.pct * 100}%` : "0%",
          transition: "width 1.4s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: "0 0 8px rgba(212,175,55,0.4)",
        }} />
      </div>
    </div>
  );
}
