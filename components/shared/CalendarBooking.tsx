const CALENDAR_URL =
  process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_URL ||
  "https://calendar.app.google/KXRdoq7FDQ348e6E6";

export default function CalendarBooking() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px", textAlign: "center" }}>
      <div>
        <h3
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "28px",
            fontWeight: 800,
            color: "#FFFFFF",
            marginBottom: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.02em",
          }}
        >
          Pick a time that suits you
        </h3>
        <p
          style={{
            color: "#B7B9C3",
            fontSize: "15px",
            lineHeight: 1.65,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            maxWidth: "420px",
            margin: "0 auto",
          }}
        >
          Choose any open slot in the calendar. Google Calendar sends you the confirmation and a reminder.
        </p>
      </div>

      <div>
        <a
          href={CALENDAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ width: "100%", justifyContent: "center", fontSize: "15px", padding: "15px" }}
        >
          Book your free call
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
            <path d="M2 7h12M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </a>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "16px", marginTop: "12px" }}>
          {["Free · no commitment", "30 minutes", "Spots limited"].map((t) => (
            <span
              key={t}
              style={{
                fontSize: "11px",
                color: "#7E8395",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <svg width="5" height="5" viewBox="0 0 5 5" fill="none" aria-hidden="true"><circle cx="2.5" cy="2.5" r="2" fill="#FFDE02"/></svg>
              {t}
            </span>
          ))}
        </div>
      </div>

      <p style={{ fontSize: "12px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        Opens Google Calendar in a new tab. Questions first? Email{" "}
        <a href="mailto:Admin@gvnfit.online" style={{ color: "#B7B9C3" }}>Admin@gvnfit.online</a>
      </p>
    </div>
  );
}
