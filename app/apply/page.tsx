import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Apply to CALIBRATE",
  description: "Apply for CALIBRATE coaching. Maximum 5 clients per quarter. Applications reviewed personally by Guhayavarman within 48 hours.",
  openGraph: {
    title: "Apply | CALIBRATE",
    description: "Start your application for CALIBRATE coaching. Limited spots. Reviewed by the head coach personally.",
  },
};

import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ApplyForm from "@/components/apply/ApplyForm";

const steps = [
  { num: "01", label: "Fill the form", detail: "A few sections covering your goals, schedule, and lifestyle, takes a few minutes." },
  { num: "02", label: "Personal review", detail: "Guhay reviews every application himself within 48 hours." },
  { num: "03", label: "Diagnostic call", detail: "A free 20-minute call to confirm fit and outline your exact protocol." },
  { num: "04", label: "Programme begins", detail: "Custom training and nutrition plan delivered within 48 hours of your call." },
];

export default function ApplyPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section
          className="grid-bg"
          style={{ padding: "140px 24px 80px", textAlign: "center", position: "relative" }}
        >
          <div
            style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 50% 30%, rgba(255,222,2,0.06) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ maxWidth: "620px", margin: "0 auto", position: "relative" }}>
            <div className="tag" style={{ marginBottom: "24px" }}>Client Application</div>
            <h1
              style={{
                fontSize: "clamp(40px, 5vw, 60px)",
                fontWeight: 600,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}
            >
              Apply to <span className="gold-text">CALIBRATE</span>
            </h1>
            <p
              style={{
                fontSize: "17px",
                color: "#B7B9C3",
                lineHeight: 1.65,
                marginBottom: "40px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Reviewed personally by Guhay. Maximum 5 new clients per quarter. Fill in your details and you&apos;ll hear back within 48 hours.
            </p>

            {/* Primary CTA */}
            <a
              href="#application-form"
              className="btn-primary"
              style={{ fontSize: "16px", padding: "16px 40px", display: "inline-flex" }}
            >
              Start Your Application
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <p style={{ marginTop: "16px", fontSize: "12px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Takes a few minutes · reviewed personally within 48 hours
            </p>

            {/* Scarcity */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "rgba(255,222,2,0.06)",
                border: "1px solid rgba(255,222,2,0.18)",
                borderRadius: "999px",
                padding: "8px 20px",
                marginTop: "28px",
              }}
            >
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FFDE02", flexShrink: 0, boxShadow: "0 0 8px rgba(255,222,2,0.6)" }} />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#FFDE02", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                2 of 5 slots remaining, Q3 2026
              </span>
            </div>
          </div>
        </section>

        {/* What happens next */}
        <section style={{ padding: "80px 24px", background: "rgba(9,9,11,0.5)" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "52px" }}>
              <div className="tag" style={{ marginBottom: "20px" }}>What Happens Next</div>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", color: "#FFFFFF", letterSpacing: "-0.01em" }}>
                Four steps from application to results
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }} className="apply-steps-grid">
              {steps.map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(23,23,23,0.7)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "16px",
                    padding: "28px 24px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "13px",
                      fontWeight: 800,
                      color: "#FFDE02",
                      letterSpacing: "0.06em",
                      marginBottom: "12px",
                    }}
                  >
                    {s.num}
                  </div>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "10px" }}>
                    {s.label}
                  </p>
                  <p style={{ fontSize: "13px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.65 }}>
                    {s.detail}
                  </p>
                  {i < steps.length - 1 && (
                    <div style={{
                      position: "absolute",
                      top: "50%",
                      right: "-9px",
                      transform: "translateY(-50%)",
                      zIndex: 1,
                    }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 8h8M9 5l3 3-3 3" stroke="rgba(255,222,2,0.3)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <style>{`@media (max-width: 768px) { .apply-steps-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
          <style>{`@media (max-width: 480px) { .apply-steps-grid { grid-template-columns: 1fr !important; } }`}</style>
        </section>

        {/* Application form */}
        <section id="application-form" style={{ padding: "80px 24px 120px", scrollMarginTop: "96px" }}>
          <div style={{ maxWidth: "620px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <div className="tag" style={{ marginBottom: "20px" }}>Your Application</div>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", color: "#FFFFFF", letterSpacing: "-0.02em", marginBottom: "16px" }}>
                Tell us about you
              </h2>
              <p style={{ fontSize: "15px", color: "#B7B9C3", lineHeight: 1.65, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Not sure yet?{" "}
                <Link href="/book" style={{ color: "#FFDE02", textDecoration: "none" }}>Book a free 20-minute diagnostic call</Link>{" "}
                first, no commitment required.
              </p>
            </div>
            <ApplyForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
