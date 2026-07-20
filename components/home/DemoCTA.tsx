import Link from "next/link";

export default function DemoCTA() {
  return (
    <section
      style={{
        padding: "120px 24px",
        background: "rgba(9,9,11,0.5)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(255,222,2,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", position: "relative" }}>
        <div className="tag" style={{ marginBottom: "28px" }}>Free Consultation</div>
        <h2
          style={{
            fontSize: "clamp(36px, 5vw, 60px)",
            color: "#FFFFFF",
            marginBottom: "20px",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          Your transformation{" "}
          <span className="gold-text">starts with a conversation.</span>
        </h2>
        <p
          style={{
            fontSize: "18px",
            color: "#B7B9C3",
            lineHeight: 1.7,
            marginBottom: "40px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Book a free 30-minute call. We'll talk about your goals, where you are now, and whether coaching is the right fit. No pressure. No commitment.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "32px" }}>
          <Link href="/book" className="btn-primary" style={{ fontSize: "16px", padding: "16px 36px" }}>
            Book Free Consultation
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/success-stories" className="btn-secondary" style={{ fontSize: "16px", padding: "16px 28px" }}>
            See Results First
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
          {[
            "Free 30-min call",
            "No commitment",
            "Spots limited",
          ].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7L5.5 10L11.5 4" stroke="#FFDE02" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: "13px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
