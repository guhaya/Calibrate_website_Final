import { APP_STORE_URL } from "@/lib/appLinks";

// "Download on the App Store" button for the Vemisis iPhone app.
export default function AppStoreBadge({ size = "md" }: { size?: "sm" | "md" }) {
  const sm = size === "sm";
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="asb"
      aria-label="Download on the App Store: Vemisis for iPhone"
      style={{
        display: "inline-flex", alignItems: "center", gap: sm ? 8 : 10,
        padding: sm ? "7px 14px 7px 11px" : "10px 20px 10px 16px",
        borderRadius: sm ? 10 : 12, background: "#000", color: "#fff",
        border: "1px solid rgba(255,255,255,0.28)", textDecoration: "none", lineHeight: 1,
      }}
    >
      <svg width={sm ? 18 : 24} height={sm ? 22 : 29} viewBox="0 0 814 1000" aria-hidden="true" fill="#fff">
        <path d="M788 341c-6 4-108 62-108 190 0 148 130 200 134 202-1 3-21 72-69 142-43 62-88 124-156 124s-86-40-165-40c-77 0-104 41-166 41s-106-58-156-128C44 790 0 669 0 554c0-185 120-283 239-283 63 0 115 41 155 41 38 0 97-44 169-44 27 0 126 3 192 98l33-25zM554 168c30-35 51-84 51-133 0-7-1-14-2-19-48 2-105 32-140 72-27 31-53 80-53 130 0 8 1 15 2 18 3 1 8 1 13 1 43 0 97-29 129-69z"/>
      </svg>
      <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontSize: sm ? 9 : 11, letterSpacing: "0.02em", opacity: 0.9 }}>Download on the</span>
        <span style={{ fontSize: sm ? 15 : 20, fontWeight: 600, letterSpacing: "-0.01em" }}>App Store</span>
      </span>
    </a>
  );
}
