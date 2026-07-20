export default function GuaranteeBanner() {
  return (
    <section style={{ padding: "0 24px 120px" }}>
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "32px",
          flexWrap: "wrap",
          padding: "40px 44px",
          borderRadius: "24px",
          background: "linear-gradient(135deg, rgba(255,222,2,0.08), rgba(255,222,2,0.02))",
          border: "1px solid rgba(255,222,2,0.22)",
        }}
        className="guarantee-banner"
      >
        <div style={{
          width: "72px", height: "72px", borderRadius: "50%", flexShrink: 0,
          background: "#FFDE02", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <path d="M17 3l11 5v8c0 8-5 12.5-11 15-6-2.5-11-7-11-15V8l11-5z" stroke="#07070A" strokeWidth="2" strokeLinejoin="round" />
            <path d="M12 17l3.5 3.5L22 13" stroke="#07070A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div style={{ flex: 1, minWidth: "260px" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "26px", color: "#FFFFFF", marginBottom: "8px", textTransform: "uppercase" }}>
            The risk-free guarantee
          </p>
          <p style={{ fontSize: "14px", color: "#B7B9C3", lineHeight: 1.65, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Follow the protocol for 30 days. If you don't see measurable progress in your check-in data, we rebuild your plan from scratch — free — until you do.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", flexShrink: 0 }}>
          {["No fine print", "No hidden fees", "Cancel anytime after month 1"].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7L5.5 10L11.5 4" stroke="#FFDE02" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: "13px", color: "#F5F3EE", fontFamily: "'Plus Jakarta Sans', sans-serif", whiteSpace: "nowrap" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .guarantee-banner { flex-direction: column; text-align: center; align-items: center !important; }
        }
      `}</style>
    </section>
  );
}
