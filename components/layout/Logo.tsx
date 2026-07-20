interface LogoProps {
  size?: number;
  showText?: boolean;
}

export default function Logo({ size = 36, showText = true }: LogoProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <filter id="logo-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#logo-glow)">
          {/* Circle ring */}
          <circle cx="50" cy="52" r="27" stroke="#FFDE02" strokeWidth="4.5" />
          {/* Top tick */}
          <line x1="50" y1="5" x2="50" y2="25" stroke="#FFDE02" strokeWidth="4.5" strokeLinecap="round" />
          {/* Bottom tick */}
          <line x1="50" y1="79" x2="50" y2="97" stroke="#FFDE02" strokeWidth="4.5" strokeLinecap="round" />
          {/* Left tick */}
          <line x1="3" y1="52" x2="23" y2="52" stroke="#FFDE02" strokeWidth="4.5" strokeLinecap="round" />
          {/* Right tick */}
          <line x1="77" y1="52" x2="97" y2="52" stroke="#FFDE02" strokeWidth="4.5" strokeLinecap="round" />
          {/* Chevron up */}
          <path d="M36 60 L50 46 L64 60" stroke="#FFDE02" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
      {showText && (
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "22px",
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "0.06em",
          }}
        >
          CALIBRATE
        </span>
      )}
    </div>
  );
}
