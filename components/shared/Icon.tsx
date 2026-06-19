interface IconProps {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const icons: Record<string, (s: number) => React.ReactElement> = {
  lightning: (s) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.5 2L4 11h7l-1 7 9-10h-7l1.5-6z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  target: (s) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="1" fill="currentColor" />
    </svg>
  ),
  calendar: (s) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2.5" y="4" width="15" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 8.5h15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.5 2v3M13.5 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.5 13l2 2 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  message: (s) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.5 10c0 3.866-3.358 7-7.5 7a8.16 8.16 0 0 1-3.5-.78L2.5 17.5l1.284-3.752A6.9 6.9 0 0 1 2.5 10c0-3.866 3.358-7 7.5-7s7.5 3.134 7.5 7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  trending: (s) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 15l5-5.5 3.5 3L16 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 5.5H16V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  diamond: (s) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2.5l7.5 7.5-7.5 7.5L2.5 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  dumbbell: (s) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="8" width="3" height="4" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="15.5" y="8" width="3" height="4" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="4" y="7" width="2.5" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="13.5" y="7" width="2.5" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6.5 10h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  brain: (s) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 17V8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M10 8.5A4 4 0 0 1 10 1a4 4 0 0 1 0 7.5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 8.5c-2.5 0-5 1.5-5 4.5 0 1.5.5 2.5 1.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M10 8.5c2.5 0 5 1.5 5 4.5 0 1.5-.5 2.5-1.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  refresh: (s) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 10a7 7 0 0 1 12-4.9L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 10a7 7 0 0 1-12 4.9L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 5H17V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 15H3v-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  grid: (s) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2.5" y="2.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="11" y="2.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="2.5" y="11" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="11" y="11" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  layout: (s) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2.5" y="2.5" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 7h15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8 7v10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  quote: (s) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9c0-3 1.5-5 4.5-5v2C5.5 6 5 7 5 9h2.5v6H3V9zM11 9c0-3 1.5-5 4.5-5v2c-2 0-2.5 1-2.5 3H15.5v6H11V9z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  ),
  settings: (s) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.1 4.1l1.4 1.4M14.5 14.5l1.4 1.4M4.1 15.9l1.4-1.4M14.5 5.5l1.4-1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  check: (s) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 10.5l4.5 4.5 7.5-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  fire: (s) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 18c-4 0-6.5-2.5-6.5-5.5 0-2 1-3.5 2-4.5.5 1.5 1.5 2 2 2C7.5 7 9 4.5 8 2c3 1.5 5.5 4.5 5.5 7.5 0 .5 0 1-.5 1.5C12.5 9.5 12 8 11 7.5c.5 2-.5 4-1 5.5.5-2-1-3.5-1.5-4C7.5 11 7 14 10 18z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  star: (s) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2l2.4 5.1 5.6.7-4 4 1 5.6L10 15l-5 2.4 1-5.6-4-4 5.6-.7z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  leaf: (s) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 16c0 0 1-8 8-10 3-1 5-1 5-1s0 2-1 5C14 14 10 16 6 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 16l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  supplement: (s) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="10" cy="10" rx="4" ry="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.1 10h7.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  faq: (s) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7.5 7.5a2.5 2.5 0 0 1 5 0c0 2-2.5 2.5-2.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="10" cy="15" r="0.8" fill="currentColor" />
    </svg>
  ),
  pricing: (s) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2.5v15M7 5.5a3 3 0 0 1 3-2h2a2.5 2.5 0 0 1 0 5H8a2.5 2.5 0 0 0 0 5h3a3 3 0 0 0 3-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  contact: (s) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 8c0 0 2.5 5.5 6 5.5S16 8 16 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M2.5 10h15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
};

export default function Icon({ name, size = 18, className, style }: IconProps) {
  const render = icons[name];
  if (!render) return null;
  return (
    <span className={className} style={{ display: "inline-flex", ...style }}>
      {render(size)}
    </span>
  );
}
