"use client";

import Link from "next/link";

const plans = [
  {
    name: "Monthly",
    tagline: "Flexible commitment",
    price: 25000,
    billingNote: "per month · minimum 3-month commitment",
    features: [
      "Calibration Assessment Report",
      "Custom training programme",
      "Personalised nutrition protocol",
      "Weekly check-in & adjustments",
      "WhatsApp coach support",
    ],
    cta: "Apply: Monthly",
    highlight: false,
  },
  {
    name: "Quarterly",
    tagline: "Best value",
    discount: "Save ₹10,000",
    price: 65000,
    billingNote: "billed upfront · full 3-month programme",
    features: [
      "Everything in Monthly",
      "Quarterly re-calibration audit",
      "Priority application review",
      "Saves ₹10,000 vs monthly",
    ],
    cta: "Apply: Quarterly",
    highlight: true,
  },
];

export default function PricingCards() {
  return (
    <section style={{ padding: "120px 24px", background: "rgba(9,9,11,0.5)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div className="tag" style={{ marginBottom: "20px" }}>Investment</div>
          <h2 style={{ fontSize: "clamp(32px, 4.5vw, 58px)", color: "#FFFFFF", marginBottom: "16px" }}>
            Two tiers. <span className="gold-text">One protocol.</span>
          </h2>
          <p style={{ fontSize: "17px", color: "#B7B9C3", maxWidth: "480px", margin: "0 auto", lineHeight: 1.65, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Every plan includes the full CALIBRATE system, training, nutrition, weekly analysis, and direct coach access.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", alignItems: "start" }} className="pricing-grid">
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                background: plan.highlight ? "rgba(23,23,23,0.95)" : "rgba(17,17,20,0.7)",
                border: plan.highlight ? "1.5px solid rgba(255,222,2,0.4)" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: "24px",
                padding: "40px 36px",
                position: "relative",
                boxShadow: plan.highlight ? "0 24px 64px rgba(255,222,2,0.10)" : "none",
              }}
            >
              {plan.highlight && (
                <div style={{
                  position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)",
                  background: "#FFDE02", color: "#07070A", fontSize: "11px", fontWeight: 800,
                  fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "6px 20px", borderRadius: "0 0 12px 12px", whiteSpace: "nowrap",
                }}>
                  {plan.discount}
                </div>
              )}
              <p style={{ fontSize: "11px", fontWeight: 700, color: plan.highlight ? "#FFDE02" : "#7E8395", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "12px", marginTop: plan.highlight ? "12px" : 0 }}>
                {plan.tagline}
              </p>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "32px", color: "#FFFFFF", marginBottom: "20px", textTransform: "uppercase" }}>{plan.name}</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: "3px", marginBottom: "8px" }}>
                <span style={{ fontSize: "22px", fontWeight: 700, color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>₹</span>
                <span style={{ fontSize: "48px", fontWeight: 800, color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1 }}>{plan.price.toLocaleString("en-IN")}</span>
              </div>
              <p style={{ fontSize: "13px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "28px" }}>{plan.billingNote}</p>
              <Link href="/apply" className={plan.highlight ? "btn-primary" : "btn-secondary"} style={{ width: "100%", justifyContent: "center", marginBottom: "28px" }}>
                {plan.cta}
              </Link>
              <ul style={{ listStyle: "none" }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "12px", fontSize: "14px", color: "#F5F3EE", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ marginTop: "1px", flexShrink: 0 }}>
                      <circle cx="7.5" cy="7.5" r="6.5" fill="rgba(255,222,2,0.12)" />
                      <path d="M4.5 7.5l2 2 4-4" stroke="#FFDE02" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: "28px", fontSize: "13px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Full plan breakdown and FAQ on the <Link href="/pricing" className="link-underline">pricing page</Link>.
        </p>
      </div>

      <style>{`@media (max-width: 700px) { .pricing-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
