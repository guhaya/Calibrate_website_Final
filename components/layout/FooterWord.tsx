"use client";

import { useEffect, useRef } from "react";

// "Calibrate" transliterated (it is a brand name, so it is spelled out, not translated).
// Order: Tamil, English, Malayalam, Kannada, Telugu, the remaining scheduled
// languages of India, then Japanese and Arabic.
const WORDS: { text: string; font: string; weight: number; rtl?: boolean }[] = [
  { text: "கலிப்ரேட்", font: "Noto Sans Tamil", weight: 700 }, // Tamil
  { text: "CALIBRATE", font: "Anton", weight: 400 }, // English
  { text: "കാലിബ്രേറ്റ്", font: "Noto Sans Malayalam", weight: 700 }, // Malayalam
  { text: "ಕ್ಯಾಲಿಬ್ರೇಟ್", font: "Noto Sans Kannada", weight: 700 }, // Kannada
  { text: "కాలిబ్రేట్", font: "Noto Sans Telugu", weight: 700 }, // Telugu
  { text: "कैलिब्रेट", font: "Noto Sans Devanagari", weight: 700 }, // Hindi
  { text: "ক্যালিব্রেট", font: "Noto Sans Bengali", weight: 700 }, // Bengali
  { text: "कॅलिब्रेट", font: "Noto Sans Devanagari", weight: 700 }, // Marathi
  { text: "કેલિબ્રેટ", font: "Noto Sans Gujarati", weight: 700 }, // Gujarati
  { text: "ਕੈਲੀਬ੍ਰੇਟ", font: "Noto Sans Gurmukhi", weight: 700 }, // Punjabi
  { text: "କ୍ୟାଲିବ୍ରେଟ", font: "Noto Sans Oriya", weight: 700 }, // Odia
  { text: "کیلیبریٹ", font: "Noto Nastaliq Urdu", weight: 700, rtl: true }, // Urdu
  { text: "কেলিব্ৰেট", font: "Noto Sans Bengali", weight: 700 }, // Assamese
  { text: "कॅलिब्रेट", font: "Noto Sans Devanagari", weight: 700 }, // Konkani
  { text: "क्यालिब्रेट", font: "Noto Sans Devanagari", weight: 700 }, // Nepali
  { text: "कैलिब्रेट्", font: "Noto Sans Devanagari", weight: 700 }, // Sanskrit
  { text: "कैलिब्रेट", font: "Noto Sans Devanagari", weight: 700 }, // Maithili
  { text: "कैलिब्रेट", font: "Noto Sans Devanagari", weight: 700 }, // Dogri
  { text: "केलिब्रेट", font: "Noto Sans Devanagari", weight: 700 }, // Bodo
  { text: "کیلِبریٹ", font: "Noto Nastaliq Urdu", weight: 700, rtl: true }, // Kashmiri
  { text: "کيليبريٽ", font: "Noto Sans Arabic", weight: 700, rtl: true }, // Sindhi
  { text: "ꯀꯦꯂꯤꯕ꯭ꯔꯦꯠ", font: "Noto Sans Meetei Mayek", weight: 700 }, // Manipuri
  { text: "ᱠᱮᱞᱤᱵᱨᱮᱴ", font: "Noto Sans Ol Chiki", weight: 700 }, // Santali
  { text: "キャリブレート", font: "Noto Sans JP", weight: 700 }, // Japanese
  { text: "كاليبريت", font: "Noto Sans Arabic", weight: 700, rtl: true }, // Arabic
];

const HOLD_MS = 2600;

type Pt = { x: number; y: number };
type Particle = {
  x: number; y: number; // current
  tx: number; ty: number; // target
  sx: number; sy: number; // scatter offset used by the scroll reveal
  delay: number; // per-dot stagger when morphing, 0..1
  on: number; // 0 hidden .. 1 visible
  ton: number; // target visibility
};

/** Rasterise a word and return the grid points that fall inside its glyphs. */
function sample(word: (typeof WORDS)[number], w: number, h: number, gap: number): Pt[] {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  let size = h * 0.92;
  ctx.font = `${word.weight} ${size}px "${word.font}"`;
  const m = ctx.measureText(word.text);
  const th = (m.actualBoundingBoxAscent || size * 0.8) + (m.actualBoundingBoxDescent || 0);
  size *= Math.min((w * 0.94) / m.width, (h * 0.86) / th);
  ctx.font = `${word.weight} ${size}px "${word.font}"`;
  ctx.direction = word.rtl ? "rtl" : "ltr";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  const m2 = ctx.measureText(word.text);
  const asc = m2.actualBoundingBoxAscent || size * 0.8;
  const desc = m2.actualBoundingBoxDescent || 0;
  ctx.fillStyle = "#fff";
  ctx.fillText(word.text, w / 2, h / 2 + (asc - desc) / 2);
  const data = ctx.getImageData(0, 0, w, h).data;
  const pts: Pt[] = [];
  for (let y = gap / 2; y < h; y += gap) {
    for (let x = gap / 2; x < w; x += gap) {
      if (data[((y | 0) * w + (x | 0)) * 4 + 3] > 120) pts.push({ x, y });
    }
  }
  return pts;
}

export default function FooterWord() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, dpr = 1, gap = 6, dot = 2;
    let cache = new Map<number, Pt[]>();
    let particles: Particle[] = [];
    let idx = 0;
    let raf = 0;
    let running = false;
    let reveal = reduce ? 1 : 0;
    let lastSwap = performance.now();
    const mouse = { x: -9999, y: -9999 };

    const points = (i: number) => {
      let p = cache.get(i);
      if (!p) { p = sample(WORDS[i], W, H, gap); cache.set(i, p); }
      return p;
    };

    // Point every dot at the next word. Dots are paired by horizontal order so the
    // shape flows left to right; surplus dots fade out, missing ones fade in.
    const retarget = (i: number, instant = false) => {
      const pts = points(i).slice().sort((a, b) => a.x - b.x || a.y - b.y);
      while (particles.length < pts.length) {
        const r = pts[particles.length];
        particles.push({ x: r.x, y: r.y, tx: r.x, ty: r.y, sx: (Math.random() - 0.5) * 140, sy: 40 + Math.random() * 120, delay: Math.random(), on: 0, ton: 0 });
      }
      const order = particles.map((_, k) => k).sort((a, b) => particles[a].x - particles[b].x);
      order.forEach((k, n) => {
        const p = particles[k];
        if (n < pts.length) {
          p.tx = pts[n].x; p.ty = pts[n].y; p.ton = 1;
        } else {
          const r = pts[(n * 7) % Math.max(1, pts.length)] ?? { x: W / 2, y: H / 2 };
          p.tx = r.x; p.ty = r.y; p.ton = 0;
        }
        p.delay = Math.random();
        if (instant) { p.x = p.tx; p.y = p.ty; p.on = p.ton; }
      });
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, Math.round(rect.width));
      H = Math.max(1, Math.round(rect.height));
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      gap = W < 600 ? 4 : W < 1000 ? 5 : 6;
      dot = W < 600 ? 1.6 : 2;
      cache = new Map();
      particles = [];
      retarget(idx, true);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      // Scroll reveal: dots start scattered and dim, and settle into the word as it scrolls in.
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const target = reduce ? 1 : Math.min(1, Math.max(0, (vh - r.top) / (r.height * 0.9)));
      reveal += (target - reveal) * 0.08;
      if (Math.abs(target - reveal) < 0.002) reveal = target;

      if (now - lastSwap > HOLD_MS) {
        lastSwap = now;
        idx = (idx + 1) % WORDS.length;
        retarget(idx, reduce);
      }
      const t = Math.min(1, (now - lastSwap) / 900);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const R = 90;
      for (const p of particles) {
        // Staggered morph: each dot starts moving after its own small delay.
        const k = reduce ? 1 : Math.max(0, Math.min(1, (t - p.delay * 0.45) / 0.55));
        const ease = 0.06 + 0.16 * k;
        p.x += (p.tx - p.x) * ease;
        p.y += (p.ty - p.y) * ease;
        p.on += (p.ton - p.on) * 0.12;
        if (p.on < 0.02) continue;

        let x = p.x + p.sx * (1 - reveal);
        let y = p.y + p.sy * (1 - reveal);
        let heat = 0;
        if (!reduce) {
          const dx = x - mouse.x, dy = y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const f = 1 - d / R;
            x += (dx / d) * f * 22;
            y += (dy / d) * f * 22;
            heat = f;
          }
        }
        const a = p.on * reveal * (0.3 + 0.25 * (1 - p.ty / H)) + heat * 0.6;
        ctx.fillStyle = heat > 0.05 ? `rgba(255,222,2,${Math.min(1, a)})` : `rgba(255,255,255,${a})`;
        ctx.fillRect(Math.round(x - dot / 2), Math.round(y - dot / 2), dot, dot);
      }
    };

    const start = () => { if (!running) { running = true; lastSwap = performance.now(); raf = requestAnimationFrame(frame); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    let ro: ResizeObserver | null = null;
    let io: IntersectionObserver | null = null;
    let cancelled = false;

    // Wait for the script fonts so every word rasterises with its real glyphs.
    const loads = WORDS.map((w) => document.fonts?.load(`${w.weight} 64px "${w.font}"`, w.text).catch(() => []));
    Promise.all(loads).then(() => {
      if (cancelled) return;
      resize();
      ro = new ResizeObserver(() => resize());
      ro.observe(wrap);
      io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { rootMargin: "120px 0px" });
      io.observe(wrap);
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
    });

    return () => {
      cancelled = true;
      stop();
      ro?.disconnect();
      io?.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="fw" ref={wrapRef} aria-hidden="true">
      <canvas ref={canvasRef} className="fw-canvas" />
      <style>{`
        .fw { position: relative; margin: 72px 0 24px; height: clamp(120px, 26vw, 340px); }
        .fw-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
        @media (max-width: 520px) { .fw { margin: 48px 0 16px; } }
      `}</style>
    </div>
  );
}
