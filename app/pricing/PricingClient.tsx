"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const plans = [
  {
    name: "Monthly",
    tagline: "Flexible commitment",
    price: 25000,
    billingNote: "per month · minimum 3-month commitment",
    description: "Full access to the CALIBRATE system with monthly flexibility. Ideal for professionals who want to start and assess results before committing to a longer cycle.",
    features: [
      "Calibration Assessment Report (Week 0)",
      "Custom training programme (4-week blocks)",
      "Personalised nutrition protocol",
      "Weekly check-in analysis & adjustments",
      "WhatsApp support — weekdays, 4-hour response",
      "Monthly bloodwork review",
      "CALIBRATE app access",
    ],
    cta: "Apply — Monthly",
    highlight: false,
  },
  {
    name: "Quarterly",
    tagline: "Best value · Save ₹10,000",
    price: 65000,
    billingNote: "billed upfront · full 3-month programme",
    description: "The complete Calibration Protocol at a single investment. Includes quarterly re-calibration audit and priority application review. Saves ₹10,000 versus monthly.",
    features: [
      "Everything in Monthly",
      "Quarterly re-calibration audit",
      "Priority application review",
      "Saves ₹10,000 vs monthly billing",
    ],
    cta: "Apply — Quarterly",
    highlight: true,
  },
];

const faqs = [
  {
    q: "Who is CALIBRATE built for?",
    a: "Engineers, product managers, consultants, and founders who work 10+ hour days and have failed at generic fitness programmes before. The system is built around data, not motivation — specifically for people with demanding schedules and limited time.",
  },
  {
    q: "Why a 3-month minimum commitment?",
    a: "Real body recomposition takes time. The first month establishes baselines and builds the system. Months two and three are where the compounding effect of weekly adjustments produces visible, measurable results. One month isn't enough to see what the protocol can do.",
  },
  {
    q: "What does the Calibration Assessment Report include?",
    a: "A full baseline analysis covering your body composition starting point, movement quality assessment, nutritional audit, and constraint mapping around your actual work schedule. This is Week 0 — before any training begins.",
  },
  {
    q: "How does WhatsApp support work?",
    a: "Your coach is reachable via WhatsApp on weekdays with a maximum 4-hour response window. This covers questions, adjustments, and anything that comes up between weekly check-ins.",
  },
  {
    q: "What is the maximum client capacity?",
    a: "CALIBRATE takes a maximum of 5 new clients per quarter. This isn't artificial scarcity — it's the number that allows Guhay to personally review every application and maintain coaching quality across the team.",
  },
  {
    q: "Do I need a gym?",
    a: "No. Programmes are built for gym, home gym, hotel gym, or bodyweight setups. Your training is written around what you have access to — not what we assume.",
  },
  {
    q: "Is the diagnostic call really free?",
    a: "Completely free. It's a 20-minute call — not a sales call. Guhay reviews your situation and tells you honestly whether the programme is the right fit for your goals and timeline.",
  },
];

export default function PricingClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section style={{ padding: "140px 24px 80px", textAlign: "center", position: "relative" }} className="grid-bg">
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 30%, rgba(255,222,2,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative" }}>
            <div className="tag" style={{ marginBottom: "24px" }}>Coaching Investment</div>
            <h1 style={{ fontSize: "clamp(40px, 5vw, 60px)", fontWeight: 600, color: "#FFFFFF", marginBottom: "20px", letterSpacing: "-0.02em" }}>
              Precision coaching for{" "}
              <span className="gold-text">serious professionals</span>
            </h1>
            <p style={{ fontSize: "17px", color: "#B7B9C3", lineHeight: 1.65, marginBottom: "32px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Two tiers. One protocol. All include the full CALIBRATE system — custom training, nutrition, weekly analysis, and direct coach access.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(255,222,2,0.08)", border: "1px solid rgba(255,222,2,0.2)", borderRadius: "999px", padding: "8px 20px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FFDE02", flexShrink: 0, boxShadow: "0 0 8px rgba(255,222,2,0.6)" }} />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#FFDE02", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                2 of 5 slots remaining — Q3 2026
              </span>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section style={{ padding: "0 24px 80px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", alignItems: "start" }} className="plans-grid">
              {plans.map((plan, i) => (
                <div
                  key={i}
                  style={{
                    background: plan.highlight ? "rgba(23,23,23,0.95)" : "rgba(23,23,23,0.6)",
                    border: plan.highlight ? "1px solid rgba(255,222,2,0.3)" : "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "20px", padding: "36px", position: "relative",
                  }}
                >
                  {plan.highlight && (
                    <div style={{ position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)", background: "linear-gradient(90deg, #E6C700, #FFDE02)", color: "#07070A", fontSize: "11px", fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", padding: "5px 18px", borderRadius: "0 0 10px 10px", whiteSpace: "nowrap" }}>
                      Best Value
                    </div>
                  )}
                  <p style={{ fontSize: "11px", fontWeight: 700, color: plan.highlight ? "#FFDE02" : "#B7B9C3", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "8px" }}>
                    {plan.tagline}
                  </p>
                  <h2 style={{ fontSize: "28px", color: "#FFFFFF", marginBottom: "20px", letterSpacing: "-0.01em" }}>{plan.name}</h2>
                  <div style={{ marginBottom: "8px" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
                      <span style={{ fontSize: "22px", fontWeight: 700, color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1 }}>₹</span>
                      <span style={{ fontSize: "52px", fontWeight: 800, color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1 }}>{plan.price.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: "13px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "20px" }}>{plan.billingNote}</p>
                  <p style={{ fontSize: "14px", color: "#B7B9C3", lineHeight: 1.65, marginBottom: "28px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{plan.description}</p>
                  <Link href="/apply" className={plan.highlight ? "btn-primary" : "btn-secondary"} style={{ width: "100%", justifyContent: "center", marginBottom: "28px", fontSize: "14px" }}>
                    {plan.cta}
                  </Link>
                  <ul style={{ listStyle: "none" }}>
                    {plan.features.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px", fontSize: "14px", color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ marginTop: "1px", flexShrink: 0 }}>
                          <circle cx="7.5" cy="7.5" r="6.5" fill="rgba(255,222,2,0.1)" />
                          <path d="M4.5 7.5l2 2 4-4" stroke="#FFDE02" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "24px", padding: "20px 28px", background: "rgba(23,23,23,0.4)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", display: "flex", alignItems: "center", gap: "14px" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="8" cy="8" r="7" stroke="#FFDE02" strokeWidth="1.3" />
                <path d="M8 5v4M8 11v.5" stroke="#FFDE02" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <p style={{ fontSize: "13px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.5 }}>
                All applications are reviewed personally by Guhay within 48 hours. A free 20-minute diagnostic call precedes any commitment.
              </p>
            </div>
          </div>
          <style>{`@media (max-width: 700px) { .plans-grid { grid-template-columns: 1fr !important; } }`}</style>
        </section>

        {/* Target client */}
        <section style={{ padding: "80px 24px", background: "rgba(9,9,11,0.5)" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <div className="tag" style={{ marginBottom: "20px" }}>Who This Is For</div>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", color: "#FFFFFF", letterSpacing: "-0.01em", marginBottom: "48px" }}>
              Built for high-performers with demanding schedules
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", textAlign: "left" }} className="profile-grid">
              {[
                { role: "Engineers & Developers", detail: "Complex problem-solvers who prefer systems over motivation." },
                { role: "Product Managers", detail: "Detail-oriented professionals who want measurable outcomes." },
                { role: "Consultants & Founders", detail: "High-travel, high-pressure — the protocol adapts to your schedule." },
              ].map((p) => (
                <div key={p.role} style={{ background: "rgba(23,23,23,0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", padding: "24px" }}>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "8px" }}>{p.role}</p>
                  <p style={{ fontSize: "13px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.6 }}>{p.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media (max-width: 700px) { .profile-grid { grid-template-columns: 1fr !important; } }`}</style>
        </section>

        {/* FAQ */}
        <section style={{ padding: "80px 24px 120px" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <div className="tag" style={{ marginBottom: "20px" }}>FAQ</div>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", color: "#FFFFFF", letterSpacing: "-0.01em" }}>Questions before you commit</h2>
            </div>
            <div style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", overflow: "hidden" }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ borderBottom: i < faqs.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: "100%", padding: "20px 24px", background: openFaq === i ? "rgba(23,23,23,0.9)" : "rgba(17,17,20,0.9)", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", textAlign: "left" }}
                  >
                    <span style={{ fontSize: "15px", fontWeight: 600, color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{faq.q}</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
                      <path d="M4 6l4 4 4-4" stroke="#B7B9C3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: "0 24px 20px", background: "rgba(23,23,23,0.9)" }}>
                      <p style={{ fontSize: "15px", color: "#B7B9C3", lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
