"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Who is CALIBRATE built for?",
    a: "Engineers, product managers, consultants, and founders who work 10+ hour days and have failed at generic fitness programmes before. The system is built around data, not motivation.",
  },
  {
    q: "Why a 3-month minimum commitment?",
    a: "Real body recomposition takes time. The first month establishes baselines. Months two and three are where the compounding effect of weekly adjustments produces visible, measurable results.",
  },
  {
    q: "How does WhatsApp support work?",
    a: "Your coach is reachable via WhatsApp on weekdays with a maximum 4-hour response window — covering questions, adjustments, and anything between weekly check-ins.",
  },
  {
    q: "What is the maximum client capacity?",
    a: "CALIBRATE takes a maximum of 5 new clients per quarter. This allows every application to be personally reviewed and coaching quality to stay high.",
  },
  {
    q: "Do I need a gym?",
    a: "No. Programmes are built for gym, home gym, hotel gym, or bodyweight setups. Your training is written around what you have access to.",
  },
  {
    q: "Is the diagnostic call really free?",
    a: "Completely free. It's a 20-minute call — not a sales call. We review your situation and tell you honestly whether the programme fits your goals and timeline.",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section style={{ padding: "120px 24px" }}>
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div className="tag" style={{ marginBottom: "20px" }}>FAQ</div>
          <h2 style={{ fontSize: "clamp(32px, 4.5vw, 58px)", color: "#FFFFFF" }}>
            Questions, <span className="gold-text">answered</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                style={{
                  border: `1px solid ${isOpen ? "rgba(255,222,2,0.28)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "rgba(17,17,20,0.7)",
                  transition: "border-color 0.2s ease",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  style={{
                    width: "100%", padding: "22px 26px", background: "transparent", border: "none",
                    cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
                    gap: "16px", textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: "16px", fontWeight: 700, color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {faq.q}
                  </span>
                  <span style={{
                    flexShrink: 0, width: "28px", height: "28px", borderRadius: "50%",
                    background: isOpen ? "#FFDE02" : "rgba(255,255,255,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.25s ease, background 0.2s ease",
                  }}>
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <path d="M3 5.5l4 4 4-4" stroke={isOpen ? "#07070A" : "#B7B9C3"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  style={{
                    maxHeight: isOpen ? "260px" : "0px",
                    transition: "max-height 0.3s cubic-bezier(0.16,1,0.3,1)",
                    overflow: "hidden",
                  }}
                >
                  <p style={{ padding: "0 26px 22px", fontSize: "14px", color: "#B7B9C3", lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
