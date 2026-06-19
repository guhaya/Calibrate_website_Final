import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Coaching Team",
  description: "Meet the CALIBRATE team — head coach Guhayavarman, certified trainers across Chennai, Bangalore, and Coimbatore, and on-call nutrition specialists. The people behind your protocol.",
  openGraph: {
    title: "Coaching Team | CALIBRATE",
    description: "Guhayavarman and the full CALIBRATE coaching team. Certified trainers, nutrition specialists, and a head coach who reviews every application personally.",
  },
};

import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Icon from "@/components/shared/Icon";

const headCoach = {
  name: "Guhayavarman",
  handle: "@fitguhay",
  role: "Founder & Head Coach",
  bio: [
    "I started CALIBRATE because I kept seeing the same pattern: smart, motivated people failing to reach their goals — not from lack of effort, but from lack of the right system. Engineers, founders, product managers putting in the work but getting nowhere.",
    "The fitness industry profits from confusion. CALIBRATE is built on the opposite principle — the same data-driven frameworks used in precision engineering, applied to body optimisation. Your body is a process. Processes can be optimised.",
  ],
  stats: [
    { value: "10+", label: "Active clients" },
    { value: "5+", label: "Years coaching" },
    { value: "12+", label: "Countries reached" },
    { value: "200+", label: "Transformations" },
  ],
  credentials: [
    "Level 4 Personal Training Certification",
    "Sports Nutrition Specialist",
    "DMAIC-certified performance protocol",
    "Competitive athlete background",
    "Based in Chennai, Tamil Nadu",
  ],
};

const trainers = [
  {
    name: "Ashok",
    role: "Personal Trainer · Certified Strength & Conditioning Coach",
    experience: "10+ years",
    location: "Bangalore",
    specialisation: "Strength & Conditioning",
    description: "Ashok brings over a decade of strength and conditioning expertise to CALIBRATE. As an online trainer, he designs progressive programming for clients across all levels — from foundational strength work to performance-focused conditioning cycles.",
    color: "#D4AF37",
    initials: "A",
  },
  {
    name: "Rajavel",
    role: "Certified Personal Trainer",
    experience: "8+ years",
    location: "Mumbai",
    specialisation: "Personal Training",
    description: "Rajavel is a certified personal trainer with eight years of experience working with clients across diverse goals and backgrounds. His coaching is grounded in building sustainable habits and consistent progress — no extremes, no shortcuts.",
    color: "#22C55E",
    initials: "R",
  },
  {
    name: "Balaji",
    role: "NASM CPT · Online Trainer",
    experience: "5+ years",
    location: "Coimbatore",
    specialisation: "NASM Certified Training",
    description: "Balaji is NASM-certified and specialises in online coaching, delivering structured, evidence-based programmes remotely. His methodical approach ensures clients get expert-level training regardless of where they're based.",
    color: "#3B82F6",
    initials: "B",
  },
];

const specialists = [
  {
    name: "Naren",
    role: "Nutritionist & Fitness Data Analyst",
    credentials: "Nutritionist · Fitness Data Analyst · 10+ years",
    location: "Malaysia",
    description: "Naren combines nutritional expertise with data-driven fitness analysis — a rare combination that lets him translate raw client metrics into precise dietary strategies. With over a decade of experience, he handles complex nutrition protocols and performance-level goals.",
    color: "#A855F7",
    initials: "N",
  },
  {
    name: "Karthika D'Souza",
    role: "Dietician & Clinical Health Analyst",
    credentials: "Registered Dietician · Clinical Health Analyst · 10+ years",
    location: "Malaysia",
    description: "Karthika brings clinical-grade expertise to the team — managing medical dietary requirements, health risk analysis, and evidence-based nutrition intervention for clients who need specialist-level dietary support.",
    color: "#F97316",
    initials: "K",
  },
];

const values = [
  {
    title: "No generic programmes",
    description: "Every client gets a plan built from scratch. Templates are for people who want average results.",
    icon: "target",
  },
  {
    title: "Radical accountability",
    description: "We track everything — not to judge, but because the data is what lets us make the right adjustments.",
    icon: "trending",
  },
  {
    title: "Sustainable, not extreme",
    description: "Crash diets and punishment workouts don't work. Real body change comes from systems you can maintain.",
    icon: "refresh",
  },
  {
    title: "Education alongside results",
    description: "The goal isn't dependency. By the end of your programme, you understand your body well enough to stay there.",
    icon: "brain",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section
          style={{ padding: "140px 24px 100px", position: "relative" }}
          className="grid-bg"
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at 30% 50%, rgba(212,175,55,0.05) 0%, transparent 55%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "64px",
              alignItems: "center",
              position: "relative",
            }}
            className="about-grid"
          >
            {/* Left */}
            <div>
              <div className="tag" style={{ marginBottom: "28px" }}>About</div>
              <h1
                style={{
                  fontSize: "clamp(36px, 4.5vw, 58px)",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  marginBottom: "24px",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                }}
              >
                A team built around{" "}
                <span className="gold-text">one obsession:</span>{" "}
                your results.
              </h1>
              <p style={{ fontSize: "17px", color: "#9AA4B2", lineHeight: 1.7, marginBottom: "20px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                CALIBRATE isn&apos;t one coach with a template. It&apos;s a precision team — a head coach, certified trainers, and on-call specialists — all operating from the same data-driven protocol.
              </p>
              <p style={{ fontSize: "17px", color: "#9AA4B2", lineHeight: 1.7, marginBottom: "36px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Based across Chennai, Bangalore, Hyderabad, and Coimbatore. Serving clients across India.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link href="/book" className="btn-primary" style={{ fontSize: "15px", padding: "14px 28px" }}>
                  Book Free Consultation
                </Link>
                <Link href="/success-stories" className="btn-secondary" style={{ fontSize: "15px", padding: "14px 24px" }}>
                  See Client Results
                </Link>
              </div>
            </div>

            {/* Right: philosophy card */}
            <div
              style={{
                background: "rgba(22,33,45,0.7)",
                border: "1px solid rgba(212,175,55,0.15)",
                borderRadius: "20px",
                padding: "40px",
              }}
            >
              <div style={{ marginBottom: "28px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#D4AF37", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "12px" }}>Core Philosophy</p>
                <p style={{ fontSize: "22px", fontWeight: 700, color: "#FFFFFF", fontFamily: "'Barlow Condensed', sans-serif", lineHeight: 1.2, letterSpacing: "0.01em" }}>
                  &ldquo;Your body is a process.<br />Processes can be optimised.&rdquo;
                </p>
              </div>
              <div className="hr-gold" style={{ marginBottom: "28px" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                {headCoach.stats.map((s) => (
                  <div key={s.label}>
                    <p style={{ fontSize: "28px", fontWeight: 800, color: "#D4AF37", fontFamily: "'Barlow Condensed', sans-serif", lineHeight: 1 }}>{s.value}</p>
                    <p style={{ fontSize: "12px", color: "#9AA4B2", fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: "4px" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <style>{`@media (max-width: 900px) { .about-grid { grid-template-columns: 1fr !important; } }`}</style>
        </section>

        {/* Head Coach */}
        <section style={{ padding: "80px 24px", background: "rgba(12,18,26,0.5)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <div className="tag" style={{ marginBottom: "20px" }}>Founder</div>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", color: "#FFFFFF", letterSpacing: "-0.02em" }}>
                Head Coach
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.4fr",
                gap: "40px",
                alignItems: "start",
                background: "rgba(22,33,45,0.6)",
                border: "1px solid rgba(212,175,55,0.2)",
                borderRadius: "20px",
                overflow: "hidden",
              }}
              className="coach-hero-grid"
            >
              {/* Left panel */}
              <div
                style={{
                  padding: "40px",
                  background: "rgba(212,175,55,0.04)",
                  borderRight: "1px solid rgba(212,175,55,0.1)",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: "72px", height: "72px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #D4AF37, #B8962E)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "28px", fontWeight: 800, color: "#0E1720",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    marginBottom: "20px",
                  }}
                >
                  G
                </div>
                <h3 style={{ fontSize: "24px", color: "#FFFFFF", marginBottom: "4px", letterSpacing: "-0.01em" }}>
                  {headCoach.name}
                </h3>
                <p style={{ fontSize: "13px", color: "#D4AF37", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, marginBottom: "6px" }}>
                  {headCoach.role}
                </p>
                <p style={{ fontSize: "12px", color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "28px" }}>
                  {headCoach.handle} · Chennai, TN
                </p>
                <div className="hr-gold" style={{ marginBottom: "24px" }} />
                <ul style={{ listStyle: "none" }}>
                  {headCoach.credentials.map((c) => (
                    <li key={c} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px", fontSize: "13px", color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginTop: "1px", flexShrink: 0 }}>
                        <circle cx="7" cy="7" r="6" fill="rgba(212,175,55,0.1)" />
                        <path d="M4 7l2 2 4-4" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Right panel */}
              <div style={{ padding: "40px" }}>
                {headCoach.bio.map((para, i) => (
                  <p key={i} style={{ fontSize: "16px", color: "#9AA4B2", lineHeight: 1.75, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: i < headCoach.bio.length - 1 ? "20px" : "0" }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <style>{`@media (max-width: 768px) { .coach-hero-grid { grid-template-columns: 1fr !important; } }`}</style>
        </section>

        {/* Certified Trainers */}
        <section style={{ padding: "80px 24px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <div className="tag" style={{ marginBottom: "20px" }}>The Team</div>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", color: "#FFFFFF", letterSpacing: "-0.02em", marginBottom: "12px" }}>
                Certified Trainers
              </h2>
              <p style={{ fontSize: "16px", color: "#9AA4B2", fontFamily: "'Plus Jakarta Sans', sans-serif", maxWidth: "520px", margin: "0 auto" }}>
                Each trainer specialises in a distinct domain. You get the right expertise for your specific goal.
              </p>
            </div>
            <div
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}
              className="trainers-grid"
            >
              {trainers.map((t) => {
                const rgbMap: Record<string, string> = { "#D4AF37": "212,175,55", "#22C55E": "34,197,94", "#3B82F6": "59,130,246" };
                const rgb = rgbMap[t.color];
                return (
                  <div
                    key={t.name}
                    style={{
                      background: "rgba(22,33,45,0.6)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "18px",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ padding: "28px 28px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <div
                        style={{
                          width: "52px", height: "52px", borderRadius: "50%",
                          background: `rgba(${rgb}, 0.15)`,
                          border: `1px solid rgba(${rgb}, 0.3)`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "20px", fontWeight: 800, color: t.color,
                          fontFamily: "'Barlow Condensed', sans-serif",
                          marginBottom: "16px",
                        }}
                      >
                        {t.initials}
                      </div>
                      <h3 style={{ fontSize: "20px", color: "#FFFFFF", marginBottom: "4px" }}>{t.name}</h3>
                      <p style={{ fontSize: "11px", fontWeight: 700, color: t.color, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "4px" }}>
                        {t.specialisation}
                      </p>
                      <p style={{ fontSize: "12px", color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {t.experience} · {t.location}
                      </p>
                    </div>
                    <div style={{ padding: "20px 28px 28px" }}>
                      <p style={{ fontSize: "14px", color: "#9AA4B2", lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {t.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <style>{`@media (max-width: 900px) { .trainers-grid { grid-template-columns: 1fr !important; } }`}</style>
        </section>

        {/* On-Call Specialists */}
        <section style={{ padding: "0 24px 80px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <div className="tag" style={{ marginBottom: "20px" }}>Specialists</div>
              <h2 style={{ fontSize: "clamp(26px, 3vw, 40px)", color: "#FFFFFF", letterSpacing: "-0.02em", marginBottom: "12px" }}>
                On-Call Specialists
              </h2>
              <p style={{ fontSize: "15px", color: "#9AA4B2", fontFamily: "'Plus Jakarta Sans', sans-serif", maxWidth: "480px", margin: "0 auto" }}>
                For clients who need clinical-level nutrition or complex dietary support, these specialists step in.
              </p>
            </div>
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
              className="specialists-grid"
            >
              {specialists.map((s) => {
                const rgbMap: Record<string, string> = { "#A855F7": "168,85,247", "#F97316": "249,115,22" };
                const rgb = rgbMap[s.color];
                return (
                  <div
                    key={s.name}
                    style={{
                      background: "rgba(22,33,45,0.5)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "16px",
                      padding: "32px",
                      display: "flex",
                      gap: "20px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: "48px", height: "48px", borderRadius: "50%",
                        background: `rgba(${rgb}, 0.12)`,
                        border: `1px solid rgba(${rgb}, 0.25)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "18px", fontWeight: 800, color: s.color,
                        fontFamily: "'Barlow Condensed', sans-serif",
                        flexShrink: 0,
                      }}
                    >
                      {s.initials}
                    </div>
                    <div>
                      <h3 style={{ fontSize: "18px", color: "#FFFFFF", marginBottom: "3px" }}>{s.name}</h3>
                      <p style={{ fontSize: "12px", fontWeight: 700, color: s.color, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.04em", marginBottom: "3px" }}>
                        {s.role}
                      </p>
                      <p style={{ fontSize: "11px", color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "14px" }}>
                        {s.credentials} · {s.location}
                      </p>
                      <p style={{ fontSize: "14px", color: "#9AA4B2", lineHeight: 1.65, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {s.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <style>{`@media (max-width: 700px) { .specialists-grid { grid-template-columns: 1fr !important; } }`}</style>
        </section>

        {/* Values */}
        <section style={{ padding: "80px 24px 120px", background: "rgba(12,18,26,0.5)" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <div className="tag" style={{ marginBottom: "20px" }}>Philosophy</div>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", color: "#FFFFFF", letterSpacing: "-0.02em" }}>
                How we think about coaching
              </h2>
            </div>
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
              className="values-grid"
            >
              {values.map((v, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(22,33,45,0.6)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "16px",
                    padding: "32px",
                  }}
                >
                  <div
                    style={{
                      width: "44px", height: "44px", borderRadius: "12px",
                      background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#D4AF37", marginBottom: "16px",
                    }}
                  >
                    <Icon name={v.icon} size={20} />
                  </div>
                  <h3 style={{ fontSize: "18px", color: "#FFFFFF", marginBottom: "10px", letterSpacing: "-0.01em" }}>
                    {v.title}
                  </h3>
                  <p style={{ fontSize: "15px", color: "#9AA4B2", lineHeight: 1.65, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media (max-width: 700px) { .values-grid { grid-template-columns: 1fr !important; } }`}</style>
        </section>

        {/* CTA */}
        <section style={{ padding: "80px 24px 120px", textAlign: "center" }}>
          <div style={{ maxWidth: "560px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "#FFFFFF", marginBottom: "16px", letterSpacing: "-0.02em" }}>
              Ready to work with the team?
            </h2>
            <p style={{ fontSize: "16px", color: "#9AA4B2", lineHeight: 1.65, marginBottom: "32px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Guhay personally reviews every application. Book a free 20-minute diagnostic call — not a sales call.
            </p>
            <Link href="/book" className="btn-primary" style={{ fontSize: "15px", padding: "14px 32px" }}>
              Book Free Consultation
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
