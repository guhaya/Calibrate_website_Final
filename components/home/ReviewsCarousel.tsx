"use client";

import { useState } from "react";

const reviews = [
  { name: "Marcus T.", role: "Software Engineer", quote: "My coach actually cared about my specific situation and adjusted my plan when I was travelling for work. I didn't think I could look like this.", rating: 5 },
  { name: "Priya S.", role: "Marketing Director", quote: "The weekly check-ins kept me honest without feeling like I was being judged. I genuinely look forward to my workouts now.", rating: 5 },
  { name: "James O.", role: "Teacher", quote: "Turns out my nutrition was completely off and my programming was basically random. CALIBRATE fixed both, every week, real progress.", rating: 5 },
  { name: "Ritika M.", role: "Consultant", quote: "I've done three other programmes before this. None of them adjusted around my travel schedule. This one actually did.", rating: 5 },
  { name: "Devan K.", role: "Product Manager", quote: "The app makes it stupid simple to know what to do every day. No more spreadsheets, no more guessing.", rating: 4 },
];

const CARDS_VISIBLE_DESKTOP = 3;

export default function ReviewsCarousel() {
  const [start, setStart] = useState(0);

  const go = (dir: number) => {
    setStart((s) => (s + dir + reviews.length) % reviews.length);
  };

  const visible = Array.from({ length: CARDS_VISIBLE_DESKTOP }, (_, i) => reviews[(start + i) % reviews.length]);

  return (
    <section style={{ padding: "120px 24px", background: "rgba(9,9,11,0.5)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          flexWrap: "wrap", gap: "24px", marginBottom: "48px",
        }}>
          <div>
            <div className="tag" style={{ marginBottom: "20px" }}>Community</div>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", color: "#FFFFFF" }}>
              What clients <span className="gold-text">say</span>
            </h2>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="carousel-arrow" onClick={() => go(-1)} aria-label="Previous review">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3.5L5 8l5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button className="carousel-arrow" onClick={() => go(1)} aria-label="Next review">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3.5L11 8l-5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="reviews-grid">
          {visible.map((r, i) => (
            <div key={`${r.name}-${i}`} style={{
              background: "rgba(17,17,20,0.85)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px", padding: "28px", display: "flex", flexDirection: "column",
            }}>
              <div style={{ display: "flex", gap: "2px", marginBottom: "16px" }}>
                {[...Array(5)].map((_, si) => (
                  <svg key={si} width="14" height="14" viewBox="0 0 12 12" fill={si < r.rating ? "#FFDE02" : "rgba(255,255,255,0.15)"}>
                    <path d="M6 1l1.3 3.9h4.1l-3.3 2.4 1.3 3.9L6 9 2.6 11.2l1.3-3.9L.6 4.9h4.1L6 1z" />
                  </svg>
                ))}
              </div>
              <p style={{ fontSize: "15px", color: "#F5F3EE", lineHeight: 1.65, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "20px", flex: 1 }}>
                "{r.quote}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%", background: "#FFDE02",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "13px", fontWeight: 800, color: "#07070A", fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                  {r.name[0]}
                </div>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{r.name}</p>
                  <p style={{ fontSize: "12px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "32px" }}>
          {reviews.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === start ? "active" : ""}`}
              style={{ width: i === start ? "22px" : "7px", height: "7px" }}
              onClick={() => setStart(i)}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .reviews-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
