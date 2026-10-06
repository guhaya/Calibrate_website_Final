"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export function Hl({ children, ink = false }: { children: ReactNode; ink?: boolean }) {
  return (
    <span className={`hl ${ink ? "ink" : ""}`}>
      {children}
      <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
        <path d="M4 17 C 60 7, 140 4, 296 12" />
      </svg>
    </span>
  );
}

export function Arrow({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Check({ color = "#FFDE02", size = 16 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="7.25" fill="rgba(255,222,2,0.12)" stroke="rgba(255,222,2,0.35)" strokeWidth="0.5" />
      <path d="M5 8.2l2 2 4-4.2" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Stars({ n = 5, size = 14 }: { n?: number; size?: number }) {
  return (
    <span role="img" style={{ display: "inline-flex", gap: 2 }} aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 12 12" fill={i < n ? "#FFDE02" : "rgba(255,255,255,0.18)"} aria-hidden="true">
          <path d="M6 1l1.3 3.9h4.1l-3.3 2.4 1.3 3.9L6 9 2.6 11.2l1.3-3.9L.6 4.9h4.1L6 1z" />
        </svg>
      ))}
    </span>
  );
}

export function Device({
  src,
  alt,
  width = 280,
  preload = false,
  style,
  className = "",
  sizes,
}: {
  src: string;
  alt: string;
  width?: number | string;
  preload?: boolean;
  style?: CSSProperties;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={`device ${className}`} style={{ width, ...style }}>
      <div className="device-screen">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? (typeof width === "number" ? `${width}px` : "300px")}
          preload={preload}
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </div>
    </div>
  );
}

/** Animates a number from 0 when it scrolls into view. Keeps prefix/suffix text intact. */
export function CountUp({ value, duration = 1600, className, style }: { value: string; duration?: number; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^([^0-9]*)([0-9]+(?:[.,][0-9]+)?)(.*)$/);
  // Render the real figure on the server and before hydration, so crawlers,
  // link previews and no-JS visitors never see "0".
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!match || !ref.current) return;
    const [, pre, num, post] = match;
    // Already on screen at load: keep the final value rather than flashing 0.
    if (ref.current.getBoundingClientRect().top < window.innerHeight) return;
    const target = parseFloat(num.replace(",", "."));
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    let raf = 0;
    if (!reduce) raf = requestAnimationFrame(() => setDisplay(`${pre}0${post}`));
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (reduce) { setDisplay(value); return; }
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 4);
          setDisplay(`${pre}${(target * eased).toFixed(decimals)}${post}`);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {display}
    </span>
  );
}

/** Splits a line into words that rise in sequence on mount. */
export function RiseLine({ text, delay = 0, step = 70 }: { text: string; delay?: number; step?: number }) {
  return (
    <>
      {text.split(" ").map((w, i, arr) => (
        <span key={i}>
          <span className="rise">
            <span style={{ ["--d" as string]: `${delay + i * step}ms` }}>{w}</span>
          </span>
          {i < arr.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
