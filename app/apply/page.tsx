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

const FORM_URL = "https://app.gvnfit.online/forms";

const steps = [
  { num: "01", label: "Fill the form", detail: "6 sections covering your goals, schedule, and lifestyle — takes about 8 minutes." },
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
              background: "radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.06) 0%, transparent 60%)",
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
                color: "#9AA4B2",
                lineHeight: 1.65,
                marginBottom: "40px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Reviewed personally by Guhay. Maximum 5 new clients per quarter. Fill in your details and you&apos;ll hear back within 48 hours.
            </p>

            {/* Primary CTA */}
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: "16px", padding: "16px 40px", display: "inline-flex" }}
            >
              Start Your Application
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 14L14 2M8 2h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <p style={{ marginTop: "16px", fontSize: "12px", color: "#4E5A6A", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Opens the secure application form · takes ~8 minutes
            </p>

            {/* Scarcity */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "rgba(212,175,55,0.06)",
                border: "1px solid rgba(212,175,55,0.18)",
                borderRadius: "999px",
                padding: "8px 20px",
                marginTop: "28px",
              }}
            >
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#D4AF37", flexShrink: 0, boxShadow: "0 0 8px rgba(212,175,55,0.6)" }} />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#D4AF37", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                2 of 5 slots remaining — Q3 2026
              </span>
            </div>
          </div>
        </section>

        {/* What happens next */}
        <section style={{ padding: "80px 24px", background: "rgba(12,18,26,0.5)" }}>
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
                    background: "rgba(22,33,45,0.7)",
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
                      color: "#D4AF37",
                      letterSpacing: "0.06em",
                      marginBottom: "12px",
                    }}
                  >
                    {s.num}
                  </div>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "10px" }}>
                    {s.label}
                  </p>
                  <p style={{ fontSize: "13px", color: "#9AA4B2", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.65 }}>
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
                        <path d="M4 8h8M9 5l3 3-3 3" stroke="rgba(212,175,55,0.3)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
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

        {/* Bottom CTA */}
        <section style={{ padding: "80px 24px 120px", textAlign: "center" }}>
          <div style={{ maxWidth: "520px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", color: "#FFFFFF", letterSpacing: "-0.02em", marginBottom: "16px" }}>
              Ready to apply?
            </h2>
            <p style={{ fontSize: "15px", color: "#9AA4B2", lineHeight: 1.65, marginBottom: "32px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              The form takes ~8 minutes. Not sure yet?{" "}
              <Link href="/book" style={{ color: "#D4AF37", textDecoration: "none" }}>Book a free 20-minute diagnostic call</Link>{" "}
              first — no commitment required.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ fontSize: "15px", padding: "14px 32px" }}
              >
                Open Application Form
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12L12 2M7 2h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <Link href="/book" className="btn-secondary" style={{ fontSize: "15px", padding: "14px 32px" }}>
                Free Diagnostic Call
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
