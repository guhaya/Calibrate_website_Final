"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ── Animated weight-loss graph inside the phone ── */
function WeightGraph() {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 800);
    return () => clearTimeout(t);
  }, []);

  // 12-week weight data points (normalized 0-100 range, descending)
  const points = [96, 93.5, 91.2, 89.8, 88.4, 87.1, 85.6, 84.3, 83.2, 82.1, 81.4, 80.2];
  const w = 220, h = 80;
  const minV = 79, maxV = 98;
  const px = (i: number) => (i / (points.length - 1)) * w;
  const py = (v: number) => h - ((v - minV) / (maxV - minV)) * h;

  // Build smooth SVG path
  const pathD = points.reduce((acc, v, i) => {
    if (i === 0) return `M ${px(i)},${py(v)}`;
    const cpx = px(i - 0.5);
    return `${acc} C ${cpx},${py(points[i - 1])} ${cpx},${py(v)} ${px(i)},${py(v)}`;
  }, "");

  // Area fill path
  const areaD = `${pathD} L ${w},${h} L 0,${h} Z`;

  return (
    <div style={{ position: "relative", padding: "0 4px" }}>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", overflow: "visible" }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#B8962E" />
            <stop offset="100%" stopColor="#F0D060" />
          </linearGradient>
        </defs>
        {/* Area fill */}
        {drawn && (
          <path d={areaD} fill="url(#areaGrad)" style={{ transition: "opacity 0.5s ease" }} />
        )}
        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`chart-line ${drawn ? "animate" : ""}`}
          style={{ strokeDasharray: 1000, strokeDashoffset: drawn ? 0 : 1000, transition: "stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1)" }}
        />
        {/* End dot */}
        {drawn && (
          <circle cx={px(points.length - 1)} cy={py(points[points.length - 1])} r="3.5"
            fill="#D4AF37" stroke="#0C1520" strokeWidth="1.5"
            style={{ animation: "scale-up 0.4s ease 2s both" }} />
        )}
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((t) => (
          <line key={t} x1={0} y1={h * t} x2={w} y2={h * t}
            stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3 4" />
        ))}
      </svg>
    </div>
  );
}

/* ── Macro ring ── */
function MacroRing({ pct, color, label, value }: { pct: number; color: string; label: string; value: string }) {
  const r = 18, circ = 2 * Math.PI * r;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
      <svg width="44" height="44" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
        <circle cx="22" cy="22" r={r} fill="none" stroke={color} strokeWidth="3"
          strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
          strokeLinecap="round" transform="rotate(-90 22 22)"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1) 1s" }} />
        <text x="22" y="26" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
          {Math.round(pct * 100)}%
        </text>
      </svg>
      <span style={{ fontSize: "9px", color: "#8A96A8", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.04em" }}>{label}</span>
      <span style={{ fontSize: "10px", color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>{value}</span>
    </div>
  );
}

/* ── Main phone mockup ── */
function PhoneMockup() {
  const [week, setWeek] = useState(1);
  useEffect(() => {
    const id = setInterval(() => setWeek(w => w < 12 ? w + 1 : 12), 600);
    return () => clearInterval(id);
  }, []);

  const weightByWeek = (w: number) => (96 - (w - 1) * 1.4).toFixed(1);
  const lostByWeek = (w: number) => ((w - 1) * 1.4).toFixed(1);

  return (
    <div
      className="phone-frame"
      style={{ width: "280px", height: "560px", margin: "0 auto", flexShrink: 0 }}
    >
      <div className="phone-screen" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Notch */}
        <div className="phone-notch">
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#1A2840" }} />
          <div style={{ width: "44px", height: "8px", borderRadius: "4px", background: "#1A2840" }} />
        </div>

        {/* App content */}
        <div style={{ flex: 1, overflowY: "hidden", padding: "12px 16px 16px" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <div>
              <p style={{ fontSize: "10px", color: "#8A96A8", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "1px" }}>Good morning,</p>
              <p style={{ fontSize: "14px", fontWeight: 800, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Alex Mitchell</p>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{
                width: "34px", height: "34px", borderRadius: "50%",
                background: "linear-gradient(135deg, #D4AF37, #B8962E)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "13px", fontWeight: 800, color: "#0C1520", fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}>A</div>
              <div style={{
                position: "absolute", bottom: 0, right: 0, width: "9px", height: "9px",
                borderRadius: "50%", background: "#22C55E", border: "1.5px solid #0C1520"
              }} />
            </div>
          </div>

          {/* Week progress bar */}
          <div style={{
            background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)",
            borderRadius: "10px", padding: "10px 12px", marginBottom: "12px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "10px", color: "#D4AF37", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
                WEEK {week} OF 12
              </span>
              <span style={{ fontSize: "10px", color: "#8A96A8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {Math.round((week / 12) * 100)}% complete
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(week / 12) * 100}%` }} />
            </div>
          </div>

          {/* Weight trend */}
          <div style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px", padding: "12px", marginBottom: "10px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "8px" }}>
              <div>
                <p style={{ fontSize: "9px", color: "#8A96A8", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Body Weight</p>
                <p style={{ fontSize: "20px", fontWeight: 800, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1 }}>
                  {weightByWeek(week)}<span style={{ fontSize: "11px", color: "#8A96A8", marginLeft: "2px" }}>kg</span>
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "3px",
                  padding: "3px 7px", background: "rgba(34,197,94,0.12)",
                  border: "1px solid rgba(34,197,94,0.2)", borderRadius: "999px"
                }}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M4 6V2M2 4l2-2 2 2" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: "9px", fontWeight: 700, color: "#22C55E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    ↓{lostByWeek(week)}kg lost
                  </span>
                </div>
              </div>
            </div>
            <WeightGraph />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
              {["W1", "W4", "W8", "W12"].map(l => (
                <span key={l} style={{ fontSize: "8px", color: "#4E5A6A", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l}</span>
              ))}
            </div>
          </div>

          {/* Macros */}
          <div style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px", padding: "12px", marginBottom: "10px"
          }}>
            <p style={{ fontSize: "9px", color: "#8A96A8", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Today's Nutrition</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "4px" }}>
              <MacroRing pct={0.78} color="#D4AF37" label="Protein" value="156g" />
              <MacroRing pct={0.65} color="#3B82F6" label="Carbs" value="182g" />
              <MacroRing pct={0.80} color="#A855F7" label="Fats" value="58g" />
            </div>
          </div>

          {/* Today's session */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.18)",
            borderRadius: "10px", padding: "10px 12px"
          }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "8px",
              background: "rgba(212,175,55,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h2M9 7h2M5 7V4.5M9 7V4.5M5 4.5h4" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "9px", color: "#D4AF37", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Today</p>
              <p style={{ fontSize: "11px", color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                Upper Strength A
              </p>
            </div>
            <div style={{
              fontSize: "9px", fontWeight: 700, color: "#D4AF37", fontFamily: "'Plus Jakarta Sans', sans-serif",
              background: "rgba(212,175,55,0.12)", padding: "3px 7px", borderRadius: "999px"
            }}>Start <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{display:"inline",verticalAlign:"middle"}}><path d="M1 4h6M4 1l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
          </div>
        </div>

        {/* Bottom nav */}
        <div style={{
          height: "48px", borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "space-around",
          padding: "0 8px", background: "rgba(10,18,28,0.9)"
        }}>
          {[
            { svg: <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1.5" y="1.5" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="7.5" y="1.5" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="1.5" y="7.5" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="7.5" y="7.5" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/></svg>, label: "Home", active: true },
            { svg: <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M7.5 1.5L3 7h4.5L6 11.5l6-6.5H8l.5-3.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: "Train", active: false },
            { svg: <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 9.5c0-1.5 1.5-3.5 4-4.5 1-.5 2-1 2-2.5 0-1-1-1.5-2-1 M6.5 9.5c0-1.5.5-2.5 1.5-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><circle cx="6.5" cy="10" r="1" fill="currentColor"/></svg>, label: "Nutrition", active: false },
            { svg: <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 10l3-3.5 2.5 2L10 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 4h2v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: "Progress", active: false },
          ].map(n => (
            <div key={n.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", color: n.active ? "#D4AF37" : "#4E5A6A" }}>
              {n.svg}
              <span style={{ fontSize: "7px", color: n.active ? "#D4AF37" : "#4E5A6A", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>{n.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Floating notification cards ── */
function CoachCard() {
  return (
    <div
      className="float-card-1 glass-card-bright"
      style={{
        position: "absolute", left: "-80px", bottom: "120px",
        borderRadius: "14px", padding: "12px 14px", width: "200px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
        <div style={{
          width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg,#D4AF37,#B8962E)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "11px", fontWeight: 800, color: "#0C1520", fontFamily: "'Plus Jakarta Sans', sans-serif"
        }}>G</div>
        <div>
          <p style={{ fontSize: "10px", fontWeight: 700, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Coach Guha</p>
          <p style={{ fontSize: "9px", color: "#8A96A8", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.4, marginTop: "2px" }}>
            Excellent week Alex! Protein is up — let's push intensity on Thursday.
          </p>
          <p style={{ fontSize: "8px", color: "#4E5A6A", fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: "4px" }}>2m ago</p>
        </div>
      </div>
    </div>
  );
}

function StreakCard() {
  return (
    <div
      className="float-card-2 glass-card-bright"
      style={{
        position: "absolute", right: "-64px", top: "80px",
        borderRadius: "12px", padding: "12px 14px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{
          width: "32px", height: "32px", borderRadius: "10px",
          background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#D4AF37"
        }}>
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M10 18c-4 0-6.5-2.5-6.5-5.5 0-2 1-3.5 2-4.5.5 1.5 1.5 2 2 2C7.5 7 9 4.5 8 2c3 1.5 5.5 4.5 5.5 7.5 0 .5 0 1-.5 1.5C12.5 9.5 12 8 11 7.5c.5 2-.5 4-1 5.5.5-2-1-3.5-1.5-4C7.5 11 7 14 10 18z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div>
          <p style={{ fontSize: "16px", fontWeight: 800, color: "#D4AF37", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1 }}>8</p>
          <p style={{ fontSize: "9px", color: "#8A96A8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>week streak</p>
        </div>
      </div>
    </div>
  );
}

function WeightBadge() {
  return (
    <div
      className="float-card-3 glass-card-bright"
      style={{
        position: "absolute", right: "-56px", bottom: "160px",
        borderRadius: "12px", padding: "10px 14px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 14V4M5 8l4-4 4 4" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div>
          <p style={{ fontSize: "16px", fontWeight: 800, color: "#22C55E", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1 }}>−9.8kg</p>
          <p style={{ fontSize: "9px", color: "#8A96A8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>avg lost</p>
        </div>
      </div>
    </div>
  );
}

/* ── Social proof avatars ── */
function SocialProof() {
  const initials = ["M", "P", "J", "S", "R"];
  const colors = ["#D4AF37", "#22C55E", "#3B82F6", "#A855F7", "#F59E0B"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={{ display: "flex" }}>
        {initials.map((init, i) => (
          <div key={i} style={{
            width: "32px", height: "32px", borderRadius: "50%",
            background: `linear-gradient(135deg, ${colors[i]}, ${colors[i]}aa)`,
            border: "2px solid #0C1520",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "11px", fontWeight: 800, color: "#0C1520", fontFamily: "'Plus Jakarta Sans', sans-serif",
            marginLeft: i === 0 ? 0 : "-10px", zIndex: 5 - i, position: "relative"
          }}>{init}</div>
        ))}
      </div>
      <div>
        <div style={{ display: "flex", gap: "1px", marginBottom: "2px" }}>
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="11" height="11" viewBox="0 0 12 12" fill="#D4AF37">
              <path d="M6 1l1.3 3.9h4.1l-3.3 2.4 1.3 3.9L6 9 2.6 11.2l1.3-3.9L.6 4.9h4.1L6 1z" />
            </svg>
          ))}
        </div>
        <p style={{ fontSize: "12px", color: "#8A96A8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <span style={{ color: "white", fontWeight: 700 }}>200+ clients</span> transformed
        </p>
      </div>
    </div>
  );
}

/* ── Hero ── */
export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        padding: "96px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background layers */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(212,175,55,0.07) 0%, transparent 60%)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        pointerEvents: "none",
        maskImage: "radial-gradient(ellipse at 30% 50%, black 30%, transparent 80%)"
      }} />
      <div style={{
        position: "absolute", top: "10%", right: "10%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <div style={{ maxWidth: "1160px", margin: "0 auto", width: "100%", position: "relative" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "center",
          }}
          className="hero-layout"
        >
          {/* ── Left: Copy ── */}
          <div>
            {/* Eyebrow */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                background: "rgba(34,197,94,0.10)",
                border: "1px solid rgba(34,197,94,0.22)",
                borderRadius: "999px",
                marginBottom: "28px",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <div className="status-dot" />
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#22C55E", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.05em" }}>
                Now accepting new clients
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontSize: "clamp(48px, 5.5vw, 80px)",
                fontWeight: 600,
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                marginBottom: "24px",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
              }}
            >
              Your body is a process.{" "}
              <span className="gold-text">Processes can be optimised.</span>
            </h1>

            {/* Sub */}
            <p
              style={{
                fontSize: "18px",
                color: "#8A96A8",
                lineHeight: 1.7,
                marginBottom: "40px",
                maxWidth: "480px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 400,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
              }}
            >
              Precision performance coaching for high-earning professionals. Data-driven protocols, weekly analysis, and automatic adjustments — built around your actual schedule.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "44px",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
              }}
            >
              <Link
                href="/book"
                className="btn-primary btn-primary-lg"
              >
                Book Free Consultation
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/success-stories" className="btn-secondary" style={{ fontSize: "15px", padding: "14px 28px" }}>
                View Transformations
              </Link>
            </div>

            {/* Social proof */}
            <div
              style={{
                opacity: mounted ? 1 : 0,
                transition: "opacity 0.7s ease 0.45s",
              }}
            >
              <SocialProof />
            </div>
          </div>

          {/* ── Right: Mockup ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.9s ease 0.25s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            {/* Glow behind phone */}
            <div style={{
              position: "absolute",
              width: "320px", height: "320px",
              background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(40px)",
              pointerEvents: "none",
            }} />

            <div style={{ position: "relative" }}>
              <PhoneMockup />
              <CoachCard />
              <StreakCard />
              <WeightBadge />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-layout {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-layout > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-layout > div:last-child {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
