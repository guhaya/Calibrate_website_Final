"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const faqs = [
  {
    q: "How does online coaching actually work?",
    a: "You get a custom training programme and nutrition targets delivered through the CALIBRATE app. Each week you complete a structured check-in covering your training, nutrition, energy, and sleep. Your coach reviews everything and responds with specific feedback and adjustments. You also have direct messaging access for questions between check-ins.",
  },
  {
    q: "Do I need a gym membership?",
    a: "No. Your programme is written around whatever equipment you have — commercial gym, home gym, hotel gym, or bodyweight only. We'll establish exactly what you have access to before writing anything.",
  },
  {
    q: "How quickly will I see results?",
    a: "Most clients notice meaningful changes in energy, performance, and body composition within 4–6 weeks. Visible physical changes typically show clearly by weeks 8–12. Results depend on your starting point, consistency, and how closely you follow the plan.",
  },
  {
    q: "What's included in the free consultation?",
    a: "A 30-minute call where we cover your current situation, what you've tried before, your goals, lifestyle, and any constraints. You'll leave with clarity on your path forward. No pressure to sign up — the call is genuinely about figuring out if we're a good fit.",
  },
  {
    q: "How is this different from following a YouTube programme?",
    a: "A generic programme isn't designed for your body, your schedule, or your goals. It doesn't adjust when you plateau, doesn't account for your injury history, and doesn't hold you accountable. Coaching gives you a plan that evolves with you every single week.",
  },
  {
    q: "What if I travel a lot or have an unpredictable schedule?",
    a: "That's exactly what coaching is built for. Your programme is designed around your reality — including travel weeks, busy periods, and schedule changes. We adjust in real time rather than leaving you to figure it out alone.",
  },
  {
    q: "Can I do this if I'm a complete beginner?",
    a: "Absolutely. Some of our best transformations have come from complete beginners. You don't need experience — you need a structured starting point and someone to guide you through the early stages correctly.",
  },
  {
    q: "How do I pay? Are there contracts?",
    a: "Coaching is billed monthly. There are no long-term contracts — you can cancel at the end of any billing period. We also offer a quarterly option with a 14% saving for clients who want to commit to a full transformation block.",
  },
  {
    q: "What app do you use?",
    a: "CALIBRATE clients use a dedicated coaching app for training, nutrition tracking, progress photos, check-ins, and direct coach messaging. Everything is in one place — no juggling multiple apps.",
  },
  {
    q: "Is there a minimum commitment period?",
    a: "We ask for a minimum of one month — enough time to go through the assessment, receive your plan, and complete your first full week. Real results take 8–12 weeks, but we'll never lock you into something you're not benefiting from.",
  },
];

export default function ContactClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "", sent: false });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Enquiry from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    );
    window.location.href = `mailto:Admin@gvnfit.online?subject=${subject}&body=${body}`;
    setFormState((p) => ({ ...p, sent: true }));
  }

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section
          style={{ padding: "140px 24px 80px", textAlign: "center", position: "relative" }}
          className="grid-bg"
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at 50% 30%, rgba(255,222,2,0.06) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative" }}>
            <div className="tag" style={{ marginBottom: "24px" }}>Get In Touch</div>
            <h1
              style={{
                fontSize: "clamp(40px, 5.5vw, 64px)",
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: "20px",
                letterSpacing: "-0.01em",
                lineHeight: 1.05,
              }}
            >
              Let&apos;s start a{" "}
              <span className="gold-text">conversation</span>
            </h1>
            <p
              style={{
                fontSize: "17px",
                color: "#B7B9C3",
                lineHeight: 1.65,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                marginBottom: "40px",
              }}
            >
              Have a question before booking? Want to know if coaching is right for you?
              Reach out — every message gets a personal response within 24 hours.
            </p>
            <Link href="/book" className="btn-primary" style={{ fontSize: "15px", padding: "14px 32px" }}>
              Book Free Consultation
            </Link>
          </div>
        </section>

        {/* Contact methods */}
        <section style={{ padding: "80px 24px 0" }}>
          <div
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
            className="contact-grid"
          >
            {/* Email */}
            <a href="mailto:Admin@gvnfit.online" style={{ textDecoration: "none" }} className="contact-card-hover">
              <div
                className="glass-card"
                style={{
                  borderRadius: "16px", padding: "32px 28px", textAlign: "center",
                  transition: "border-color 0.3s ease, transform 0.3s ease", cursor: "pointer",
                  border: "1px solid rgba(255,222,2,0.12)",
                }}
              >
                <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "rgba(255,222,2,0.1)", border: "1px solid rgba(255,222,2,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M3 6l8 5 8-5M3 6h16v12H3V6z" stroke="#FFDE02" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </div>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#FFDE02", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>Email Us</p>
                <p style={{ fontSize: "15px", color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, marginBottom: "6px" }}>Admin@gvnfit.online</p>
                <p style={{ fontSize: "13px", color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Response within 24 hours</p>
              </div>
            </a>

            {/* Book a call */}
            <Link href="/book" style={{ textDecoration: "none" }} className="contact-card-hover">
              <div
                className="glass-card"
                style={{
                  borderRadius: "16px", padding: "32px 28px", textAlign: "center",
                  transition: "border-color 0.3s ease, transform 0.3s ease", cursor: "pointer",
                  border: "1px solid rgba(34,197,94,0.12)",
                }}
              >
                <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <rect x="3" y="4" width="16" height="16" rx="3" stroke="#22C55E" strokeWidth="1.5" />
                    <path d="M7 2v4M15 2v4M3 10h16" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#22C55E", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>Book a Call</p>
                <p style={{ fontSize: "15px", color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, marginBottom: "6px" }}>Free Consultation</p>
                <p style={{ fontSize: "13px", color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>30 minutes · No commitment</p>
              </div>
            </Link>

            {/* Instagram */}
            <a href="https://instagram.com/fitguhay" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }} className="contact-card-hover">
              <div
                className="glass-card"
                style={{
                  borderRadius: "16px", padding: "32px 28px", textAlign: "center",
                  transition: "border-color 0.3s ease, transform 0.3s ease", cursor: "pointer",
                  border: "1px solid rgba(168,85,247,0.12)",
                }}
              >
                <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <rect x="3" y="3" width="16" height="16" rx="4" stroke="#A855F7" strokeWidth="1.5" />
                    <circle cx="11" cy="11" r="3.5" stroke="#A855F7" strokeWidth="1.5" />
                    <circle cx="15.5" cy="6.5" r="1" fill="#A855F7" />
                  </svg>
                </div>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#A855F7", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>Instagram</p>
                <p style={{ fontSize: "15px", color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, marginBottom: "6px" }}>@fitguhay</p>
                <p style={{ fontSize: "13px", color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Follow for daily content</p>
              </div>
            </a>
          </div>
        </section>

        {/* Email form + FAQ side by side */}
        <section style={{ padding: "80px 24px" }}>
          <div
            style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}
            className="contact-main-grid"
          >
            {/* Email form */}
            <div>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", color: "#FFFFFF", marginBottom: "12px", letterSpacing: "-0.01em" }}>
                Send a message
              </h2>
              <p style={{ fontSize: "15px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "32px", lineHeight: 1.6 }}>
                Prefer email? Fill this out and it opens your email client pre-filled — or just email directly.
              </p>

              {formState.sent ? (
                <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "14px", padding: "32px", textAlign: "center" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M5 11l4.5 4.5 8-9" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <p style={{ fontSize: "16px", color: "#22C55E", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>Email client opened</p>
                  <p style={{ fontSize: "14px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: "8px" }}>Hit send in your email app. We respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    { label: "Your name", type: "text", key: "name", placeholder: "Alex Mitchell" },
                    { label: "Email address", type: "email", key: "email", placeholder: "alex@email.com" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "8px" }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        required
                        placeholder={field.placeholder}
                        value={formState[field.key as "name" | "email"]}
                        onChange={(e) => setFormState((p) => ({ ...p, [field.key]: e.target.value }))}
                        style={{ width: "100%", padding: "14px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#FFFFFF", fontSize: "15px", fontFamily: "'Plus Jakarta Sans', sans-serif", outline: "none", boxSizing: "border-box" }}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(255,222,2,0.4)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "8px" }}>
                      Message
                    </label>
                    <textarea
                      required
                      placeholder="Tell me about your goals, current situation, or any questions you have..."
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))}
                      style={{ width: "100%", padding: "14px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#FFFFFF", fontSize: "15px", fontFamily: "'Plus Jakarta Sans', sans-serif", outline: "none", resize: "vertical", boxSizing: "border-box" }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(255,222,2,0.4)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ fontSize: "15px", padding: "14px 28px", justifyContent: "center" }}>
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <p style={{ fontSize: "12px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif", textAlign: "center" }}>
                    This opens your email client with a pre-filled message to Admin@gvnfit.online
                  </p>
                </form>
              )}
            </div>

            {/* FAQ */}
            <div>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", color: "#FFFFFF", marginBottom: "12px", letterSpacing: "-0.01em" }}>
                Frequently asked
              </h2>
              <p style={{ fontSize: "15px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "28px", lineHeight: 1.6 }}>
                Most questions answered. If yours isn't here, just ask.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    style={{
                      background: openFaq === i ? "rgba(255,222,2,0.05)" : "rgba(255,255,255,0.02)",
                      border: `1px solid ${openFaq === i ? "rgba(255,222,2,0.2)" : "rgba(255,255,255,0.06)"}`,
                      borderRadius: "12px", overflow: "hidden", transition: "all 0.25s ease",
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      style={{ width: "100%", padding: "18px 20px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", textAlign: "left" }}
                    >
                      <span style={{ fontSize: "14px", fontWeight: 600, color: openFaq === i ? "#FFFFFF" : "#C4CDD8", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.4 }}>
                        {faq.q}
                      </span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.25s ease", color: openFaq === i ? "#FFDE02" : "#6B7280" }}>
                        <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                    {openFaq === i && (
                      <div style={{ padding: "0 20px 18px" }}>
                        <p style={{ fontSize: "14px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.7 }}>{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section style={{ padding: "80px 24px 120px", textAlign: "center" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto", padding: "56px 48px", background: "rgba(255,222,2,0.04)", border: "1px solid rgba(255,222,2,0.15)", borderRadius: "24px" }}>
            <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(255,222,2,0.1)", border: "1px solid rgba(255,222,2,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", animation: "pulse-gold 2s ease infinite" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#FFDE02" strokeWidth="1.5" />
                <path d="M12 6v6l4 2" stroke="#FFDE02" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)", color: "#FFFFFF", marginBottom: "14px", letterSpacing: "-0.01em" }}>Still deciding?</h2>
            <p style={{ fontSize: "15px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.65, marginBottom: "28px" }}>
              The free consultation exists for this exact moment. 30 minutes, no pitch, no pressure. Just an honest conversation about whether coaching makes sense for you.
            </p>
            <Link href="/book" className="btn-primary" style={{ fontSize: "15px", padding: "14px 32px" }}>
              Book Your Free Call
            </Link>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .contact-card-hover:hover > div { transform: translateY(-3px); border-color: rgba(255,255,255,0.12) !important; }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-main-grid { grid-template-columns: 1fr !important; }
        }
        input::placeholder, textarea::placeholder { color: #3D4550; }
      `}</style>
    </>
  );
}
