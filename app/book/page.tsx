import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Book a Free Diagnostic Call",
  description: "Book a free 20-minute diagnostic call with Guhayavarman. Honest assessment of your situation — no sales pressure.",
  openGraph: {
    title: "Book a Call | CALIBRATE",
    description: "20 minutes. Free. Guhay reviews your situation and tells you honestly whether CALIBRATE is the right fit.",
  },
};

import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import CalendarBooking from "@/components/shared/CalendarBooking";

export default function BookPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section
          style={{
            padding: "140px 24px 80px",
            textAlign: "center",
            position: "relative",
          }}
          className="grid-bg"
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at 50% 30%, rgba(255,222,2,0.06) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative" }}>
            <div className="tag" style={{ marginBottom: "24px" }}>Free Consultation</div>
            <h1
              style={{
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 600,
                color: "#FFFFFF",
                marginBottom: "20px",
                letterSpacing: "-0.02em",
              }}
            >
              Let's talk about{" "}
              <span className="gold-text">your goals</span>
            </h1>
            <p
              style={{
                fontSize: "17px",
                color: "#B7B9C3",
                lineHeight: 1.65,
                marginBottom: "12px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              A free 30-minute call — no pressure, no pitch. We'll talk about where you are, where you want to be, and whether coaching is the right fit for you.
            </p>
          </div>
        </section>

        {/* What to expect */}
        <section style={{ padding: "0 24px 60px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
              }}
              className="expect-grid"
            >
              {[
                {
                  step: "01",
                  title: "You share your goals",
                  desc: "Tell me what you're working towards, your current situation, and what's held you back before.",
                },
                {
                  step: "02",
                  title: "We find the right approach",
                  desc: "I'll outline exactly what your coaching program would look like — training, nutrition, check-in structure.",
                },
                {
                  step: "03",
                  title: "You decide, no pressure",
                  desc: "If it feels right, we start immediately. If not, you leave with clarity either way.",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  style={{
                    background: "rgba(23,23,23,0.6)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "14px",
                    padding: "28px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "28px",
                      fontWeight: 300,
                      color: "rgba(255,222,2,0.4)",
                      marginBottom: "10px",
                    }}
                  >
                    {s.step}
                  </p>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      marginBottom: "8px",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#B7B9C3", lineHeight: 1.6, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 700px) {
              .expect-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>

        {/* Booking form */}
        <section
          style={{
            padding: "40px 24px 120px",
          }}
        >
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <div
              style={{
                background: "rgba(23,23,23,0.7)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "20px",
                padding: "40px",
              }}
            >
              <CalendarBooking />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
