"use client";

import { useState } from "react";

const CALENDAR_URL =
  process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_URL ||
  "https://calendar.app.google/KXRdoq7FDQ348e6E6";

interface FormData {
  name: string;
  email: string;
  goal: string;
  message: string;
}

const goals = [
  "Lose body fat",
  "Build muscle / body recomposition",
  "Improve fitness & performance",
  "Prepare for a physique event",
  "Fix my nutrition & habits",
  "General health & lifestyle",
];

export default function CalendarBooking() {
  const [step, setStep] = useState<"form" | "done">("form");
  const [data, setData] = useState<FormData>({ name: "", email: "", goal: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 16px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: "10px",
    color: "#FFFFFF",
    fontSize: "15px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxSizing: "border-box" as const,
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "11px",
    fontWeight: 700,
    color: "#6B7280",
    marginBottom: "8px",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  };

  function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.target.style.borderColor = "rgba(255,222,2,0.5)";
    e.target.style.boxShadow = "0 0 0 3px rgba(255,222,2,0.08)";
  }
  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.target.style.borderColor = "rgba(255,255,255,0.09)";
    e.target.style.boxShadow = "none";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    // Open the booking calendar in a new tab
    window.open(CALENDAR_URL, "_blank", "noopener,noreferrer");
    setStep("done");
    setSubmitting(false);
  }

  if (step === "done") {
    return (
      <div style={{ textAlign: "center", padding: "16px 0" }}>
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            animation: "pulse-success 2s ease infinite",
          }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M7 15l5.5 5.5 10.5-11" stroke="#22C55E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "28px",
            fontWeight: 800,
            color: "#FFFFFF",
            marginBottom: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.02em",
          }}
        >
          {data.name ? `You're set, ${data.name.split(" ")[0]}!` : "You're all set!"}
        </h3>
        <p
          style={{
            color: "#B7B9C3",
            fontSize: "15px",
            lineHeight: 1.65,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            marginBottom: "28px",
            maxWidth: "380px",
            margin: "0 auto 28px",
          }}
        >
          Your booking calendar opened in a new tab. Pick any available slot, the call is 30 minutes and completely free.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: "14px", padding: "13px 28px" }}
          >
            Open Calendar Again
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L12 2M7 2h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <p style={{ fontSize: "12px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Confirmation sent to {data.email || "your email"} · Admin@gvnfit.online
          </p>
        </div>
        <style>{`@keyframes pulse-success { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.15)} 50%{box-shadow:0 0 0 10px rgba(34,197,94,0)} }`}</style>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      {/* Name + Email row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="booking-2col">
        <div>
          <label style={labelStyle}>Your name *</label>
          <input
            type="text"
            required
            placeholder="Alex Mitchell"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <label style={labelStyle}>Email address *</label>
          <input
            type="email"
            required
            placeholder="alex@email.com"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </div>

      {/* Goal */}
      <div>
        <label style={labelStyle}>What&apos;s your main goal?</label>
        <select
          value={data.goal}
          onChange={(e) => setData({ ...data, goal: e.target.value })}
          style={{ ...inputStyle, color: data.goal ? "#FFFFFF" : "#7E8395" }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <option value="" style={{ background: "#07070A" }}>Select your goal</option>
          {goals.map((g) => (
            <option key={g} value={g} style={{ background: "#07070A" }}>{g}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label style={labelStyle}>Anything else? <span style={{ opacity: 0.5, textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
        <textarea
          placeholder="Current situation, what you've tried before, any questions..."
          value={data.message}
          onChange={(e) => setData({ ...data, message: e.target.value })}
          rows={3}
          style={{ ...inputStyle, resize: "vertical" as const, minHeight: "88px" }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          className="btn-primary"
          disabled={submitting}
          style={{
            width: "100%",
            justifyContent: "center",
            fontSize: "15px",
            padding: "15px",
            opacity: submitting ? 0.75 : 1,
            cursor: submitting ? "wait" : "pointer",
          }}
        >
          {submitting ? (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: "spin 0.7s linear infinite" }}>
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="20 17" />
              </svg>
              Opening calendar…
            </>
          ) : (
            <>
              Book Free Consultation
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M2 7h12M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </>
          )}
        </button>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginTop: "12px" }}>
          {["Free · no commitment", "30 minutes", "Spots limited"].map((t) => (
            <span
              key={t}
              style={{
                fontSize: "11px",
                color: "#7E8395",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <svg width="5" height="5" viewBox="0 0 5 5" fill="none"><circle cx="2.5" cy="2.5" r="2" fill="#FFDE02"/></svg>
              {t}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 560px) { .booking-2col { grid-template-columns: 1fr !important; } }
        select option { background: #07070A; }
        input::placeholder, textarea::placeholder { color: #3D4550; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
}
