"use client";

import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Icon from "@/components/shared/Icon";
import CalendarBooking from "@/components/shared/CalendarBooking";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "What happens on the free consultation call?",
        a: "We'll spend 30 minutes talking about your goals, where you are now, and what's held you back before. I'll ask about your training history, nutrition, lifestyle, and schedule — then tell you exactly what your programme would look like. No pitch, no pressure. You'll know if it's right for you by the end of the call.",
      },
      {
        q: "How quickly can I start?",
        a: "If we're a good fit after the call, you can start within 48 hours. Your full programme — training, nutrition, and app access — will be ready for your first session.",
      },
      {
        q: "Do I need any equipment?",
        a: "No specific equipment is required. Programmes are built around what you have access to: commercial gym, home gym, or even bodyweight only. We work with your situation.",
      },
      {
        q: "What if I'm a complete beginner?",
        a: "Beginners often see the fastest results because everything is new stimulus. Your programme will be built at your level and progressively increase in intensity as your fitness improves.",
      },
    ],
  },
  {
    category: "Coaching & Programme",
    questions: [
      {
        q: "How often do we communicate?",
        a: "You have direct messaging access to your coach every day. Weekly check-ins are structured, but you can message anytime with questions, updates, or if something needs adjusting. Responses within 24 hours, typically much sooner.",
      },
      {
        q: "Can you accommodate dietary restrictions?",
        a: "Yes — completely. Vegan, vegetarian, halal, gluten-free, food intolerances — all fully accommodated. Your nutrition plan is built around what you can and will eat.",
      },
      {
        q: "What if I'm travelling or my schedule changes?",
        a: "This is one of the biggest advantages of coaching versus a static programme. When life changes, your plan changes with it. Just message your coach and the programme is adjusted immediately.",
      },
      {
        q: "How are check-ins done?",
        a: "You have the choice of video check-ins or written check-ins via the app. You'll complete a weekly check-in form covering training, nutrition, energy, sleep, and any questions — and receive detailed feedback from your coach.",
      },
    ],
  },
  {
    category: "Pricing & Commitment",
    questions: [
      {
        q: "Is the free consultation really free?",
        a: "Yes — completely free. No credit card required, no obligation. It's a conversation to see if we're a good fit.",
      },
      {
        q: "How long is the minimum commitment?",
        a: "The minimum is 12 weeks. Real transformation takes time, and 12 weeks is where most clients see genuinely significant changes. Anything shorter doesn't do justice to the process.",
      },
      {
        q: "Can I pause my programme?",
        a: "Yes. Life happens. If you need to pause due to illness, travel, or any other reason, we'll hold your spot and resume when you're ready.",
      },
    ],
  },
];

const contactMethods = [
  {
    icon: "calendar",
    title: "Book a Free Call",
    description: "Schedule a 30-minute consultation. No commitment, no pitch.",
    cta: "Book now",
    href: "#booking",
    color: "#FFDE02",
  },
  {
    icon: "message",
    title: "Email",
    description: "Send a message and we'll respond within 24 hours.",
    cta: "Email us",
    href: "mailto:Admin@gvnfit.online",
    color: "#3B82F6",
  },
  {
    icon: "star",
    title: "Browse Results",
    description: "Read client transformation stories before committing.",
    cta: "See results",
    href: "/success-stories",
    color: "#22C55E",
  },
];

export default function SupportClient() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section style={{ padding: "140px 24px 80px", textAlign: "center", position: "relative" }} className="grid-bg">
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 30%, rgba(255,222,2,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative" }}>
            <div className="tag" style={{ marginBottom: "24px" }}>Contact & FAQ</div>
            <h1 style={{ fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 600, color: "#FFFFFF", marginBottom: "20px", letterSpacing: "-0.02em" }}>
              We're here to{" "}
              <span className="gold-text">help you succeed</span>
            </h1>
            <p style={{ fontSize: "17px", color: "#B7B9C3", lineHeight: 1.65, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Questions about coaching, pricing, or getting started? Find answers below or reach out directly.
            </p>
          </div>
        </section>

        {/* Contact methods */}
        <section style={{ padding: "0 24px 80px" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }} className="contact-grid">
              {contactMethods.map((method, i) => (
                <a
                  key={i}
                  href={method.href}
                  style={{ textDecoration: "none", background: "rgba(23,23,23,0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "32px", display: "block", transition: "all 0.25s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,222,2,0.2)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                >
                  <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: `rgba(${method.color === "#FFDE02" ? "255,222,2" : method.color === "#3B82F6" ? "59,130,246" : "34,197,94"}, 0.1)`, display: "flex", alignItems: "center", justifyContent: "center", color: method.color, marginBottom: "16px" }}>
                    <Icon name={method.icon} size={20} />
                  </div>
                  <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#FFFFFF", marginBottom: "8px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{method.title}</h3>
                  <p style={{ fontSize: "14px", color: "#B7B9C3", lineHeight: 1.6, marginBottom: "20px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{method.description}</p>
                  <span style={{ fontSize: "13px", color: method.color, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif", display: "flex", alignItems: "center", gap: "5px" }}>
                    {method.cta}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </a>
              ))}
            </div>
          </div>
          <style>{`@media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
        </section>

        {/* Booking */}
        <section id="booking" style={{ padding: "80px 24px", background: "rgba(9,9,11,0.5)" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <div className="tag" style={{ marginBottom: "20px" }}>Book a Call</div>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", color: "#FFFFFF", marginBottom: "16px", letterSpacing: "-0.01em" }}>
                Book your free <span className="gold-text">consultation</span>
              </h2>
              <p style={{ color: "#B7B9C3", fontSize: "16px", lineHeight: 1.65, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                30 minutes. We'll cover your goals, your situation, and exactly what coaching would look like for you.
              </p>
            </div>
            <div style={{ background: "rgba(23,23,23,0.7)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", padding: "40px" }}>
              <CalendarBooking />
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section style={{ padding: "80px 24px 120px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <div className="tag" style={{ marginBottom: "20px" }}>FAQ</div>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", color: "#FFFFFF", letterSpacing: "-0.01em" }}>Common questions</h2>
            </div>

            {faqs.map((section, si) => (
              <div key={si} style={{ marginBottom: "48px" }}>
                <p style={{ fontWeight: 700, fontSize: "11px", color: "#FFDE02", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {section.category}
                </p>
                <div style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", overflow: "hidden" }}>
                  {section.questions.map((faq, fi) => {
                    const key = `${si}-${fi}`;
                    const isOpen = openFaq === key;
                    return (
                      <div key={fi} style={{ borderBottom: fi < section.questions.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : key)}
                          style={{ width: "100%", padding: "20px 24px", background: isOpen ? "rgba(23,23,23,0.9)" : "rgba(17,17,20,0.9)", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", textAlign: "left", transition: "background 0.2s ease" }}
                        >
                          <span style={{ fontWeight: 600, fontSize: "15px", color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{faq.q}</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
                            <path d="M4 6l4 4 4-4" stroke="#B7B9C3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        {isOpen && (
                          <div style={{ padding: "0 24px 20px", background: "rgba(23,23,23,0.9)" }}>
                            <p style={{ fontSize: "15px", color: "#B7B9C3", lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
