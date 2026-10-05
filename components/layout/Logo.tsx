interface LogoProps {
  size?: number;
  showText?: boolean;
  showSub?: boolean;
}

/** CALIBRATE mark: a "C" drawn as a calibration dial, needle pointing into the open gap. */
export function LogoMark({ size = 36, ticks = false }: { size?: number; ticks?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0, overflow: "visible" }}>
      <path d="M50.4 17.6 A24 24 0 1 0 50.4 46.4" stroke="#FFDE02" strokeWidth="8.5" strokeLinecap="round" />
      {ticks && (
        <g stroke="#FFDE02" strokeWidth="2.4" strokeLinecap="round" opacity="0.55">
          <line x1="55" y1="25" x2="59" y2="24" />
          <line x1="56" y1="32" x2="60" y2="32" />
          <line x1="55" y1="39" x2="59" y2="40" />
        </g>
      )}
      <line x1="32" y1="32" x2="46" y2="23" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" />
      <circle cx="32" cy="32" r="6" fill="#FFFFFF" />
    </svg>
  );
}

export default function Logo({ size = 36, showText = true, showSub = true }: LogoProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: Math.round(size * 0.3) }}>
      <LogoMark size={size} />
      {showText && (
        <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: Math.round(size * 0.66),
              color: "#FFFFFF",
              letterSpacing: "0.07em",
              lineHeight: 1,
            }}
          >
            CALIBRATE
          </span>
          {showSub && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: Math.max(8, Math.round(size * 0.24)),
                fontWeight: 600,
                color: "#8A8D99",
                letterSpacing: "0.26em",
                marginTop: Math.round(size * 0.12),
              }}
            >
              BY GVNFIT
            </span>
          )}
        </span>
      )}
    </div>
  );
}
