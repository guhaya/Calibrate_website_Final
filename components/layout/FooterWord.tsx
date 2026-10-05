"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// "Calibrate" transliterated (it is a brand name, so it is spelled out, not translated).
// Order requested: Tamil, English, Malayalam, Kannada, Telugu, the remaining
// scheduled languages of India, then Japanese and Arabic.
const WORDS: { lang: string; text: string; font: string; rtl?: boolean; tall?: boolean }[] = [
  { lang: "Tamil", text: "கலிப்ரேட்", font: "'Noto Sans Tamil'" },
  { lang: "English", text: "CALIBRATE", font: "var(--font-display)" },
  { lang: "Malayalam", text: "കാലിബ്രേറ്റ്", font: "'Noto Sans Malayalam'" },
  { lang: "Kannada", text: "ಕ್ಯಾಲಿಬ್ರೇಟ್", font: "'Noto Sans Kannada'" },
  { lang: "Telugu", text: "కాలిబ్రేట్", font: "'Noto Sans Telugu'" },
  { lang: "Hindi", text: "कैलिब्रेट", font: "'Noto Sans Devanagari'" },
  { lang: "Bengali", text: "ক্যালিব্রেট", font: "'Noto Sans Bengali'" },
  { lang: "Marathi", text: "कॅलिब्रेट", font: "'Noto Sans Devanagari'" },
  { lang: "Gujarati", text: "કેલિબ્રેટ", font: "'Noto Sans Gujarati'" },
  { lang: "Punjabi", text: "ਕੈਲੀਬ੍ਰੇਟ", font: "'Noto Sans Gurmukhi'" },
  { lang: "Odia", text: "କ୍ୟାଲିବ୍ରେଟ", font: "'Noto Sans Oriya'" },
  { lang: "Urdu", text: "کیلیبریٹ", font: "'Noto Nastaliq Urdu'", rtl: true, tall: true },
  { lang: "Assamese", text: "কেলিব্ৰেট", font: "'Noto Sans Bengali'" },
  { lang: "Konkani", text: "कॅलिब्रेट", font: "'Noto Sans Devanagari'" },
  { lang: "Nepali", text: "क्यालिब्रेट", font: "'Noto Sans Devanagari'" },
  { lang: "Sanskrit", text: "कैलिब्रेट्", font: "'Noto Sans Devanagari'" },
  { lang: "Maithili", text: "कैलिब्रेट", font: "'Noto Sans Devanagari'" },
  { lang: "Dogri", text: "कैलिब्रेट", font: "'Noto Sans Devanagari'" },
  { lang: "Bodo", text: "केलिब्रेट", font: "'Noto Sans Devanagari'" },
  { lang: "Kashmiri", text: "کیلِبریٹ", font: "'Noto Nastaliq Urdu'", rtl: true, tall: true },
  { lang: "Sindhi", text: "کيليبريٽ", font: "'Noto Sans Arabic'", rtl: true },
  { lang: "Manipuri", text: "ꯀꯦꯂꯤꯕ꯭ꯔꯦꯠ", font: "'Noto Sans Meetei Mayek'" },
  { lang: "Santali", text: "ᱠᱮᱞᱤᱵᱨᱮᱴ", font: "'Noto Sans Ol Chiki'" },
  { lang: "Japanese", text: "キャリブレート", font: "'Noto Sans JP'" },
  { lang: "Arabic", text: "كاليبريت", font: "'Noto Sans Arabic'", rtl: true },
];

const HOLD_MS = 2400;

export default function FooterWord() {
  const boxRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [idx, setIdx] = useState(0);
  const [scales, setScales] = useState<number[]>(() => WORDS.map(() => 1));
  const [visible, setVisible] = useState(false);
  const prev = (idx - 1 + WORDS.length) % WORDS.length;

  // Fit every word inside the box: scripts differ wildly in width and height.
  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const measure = () => {
      const cw = box.clientWidth;
      const ch = box.clientHeight;
      setScales(
        WORDS.map((_, i) => {
          const el = wordRefs.current[i];
          if (!el || !el.offsetWidth) return 1;
          return Math.min(1, (cw * 0.96) / el.offsetWidth, (ch * 1.05) / el.offsetHeight);
        })
      );
    };
    measure();
    document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  // Only cycle while the footer is on screen.
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(box);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = window.setInterval(() => {
      setIdx((i) => (i + 1) % WORDS.length);
    }, HOLD_MS);
    return () => window.clearInterval(t);
  }, [visible]);

  return (
    <div className="fw" aria-hidden="true">
      <div className="fw-box" ref={boxRef}>
        {WORDS.map((w, i) => (
          <span
            key={w.lang}
            ref={(el) => { wordRefs.current[i] = el; }}
            dir={w.rtl ? "rtl" : undefined}
            className={`fw-word ${w.lang === "English" ? "is-latin" : ""} ${w.tall ? "is-tall" : ""} ${i === idx ? "is-in" : i === prev ? "is-out" : ""}`}
            style={{ fontFamily: w.font, ["--s" as string]: scales[i] }}
          >
            {w.text}
          </span>
        ))}
      </div>
      <p className="fw-lang">
        <span key={idx} className="fw-lang-in">{WORDS[idx].lang}</span>
        <span className="fw-count">{String(idx + 1).padStart(2, "0")} / {WORDS.length}</span>
      </p>

      <style>{`
        .fw { margin: 88px 0 28px; }
        .fw-box {
          position: relative;
          font-size: clamp(64px, 17.5vw, 268px);
          height: 0.86em;
          user-select: none;
        }
        .fw-word {
          position: absolute; left: 50%; top: 50%;
          white-space: nowrap;
          font-size: 0.6em; font-weight: 700; line-height: 1.45;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.22);
          opacity: 0;
          --y: 28%;
          transform: translate(-50%, -50%) translateY(var(--y)) scale(var(--s, 1));
          filter: blur(10px);
          transition: opacity 0.7s var(--ease-out), transform 0.9s var(--ease-out), filter 0.7s var(--ease-out);
        }
        .fw-word.is-latin { font-size: 1em; font-weight: 400; line-height: 0.82; letter-spacing: 0.02em; }
        .fw-word.is-tall { line-height: 2.3; }
        .fw-word.is-in { opacity: 1; --y: 0%; filter: none; }
        .fw-word.is-out { opacity: 0; --y: -28%; filter: blur(10px); }
        .fw-lang {
          display: flex; justify-content: space-between; align-items: center;
          margin-top: 20px; font-family: var(--font-mono); font-size: 11.5px; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase;
        }
        .fw-lang-in { color: var(--accent); animation: fade-up 0.6s var(--ease-out) both; }
        .fw-count { color: var(--text-muted); font-variant-numeric: tabular-nums; }
        @media (max-width: 520px) { .fw { margin: 56px 0 20px; } }
        @media (prefers-reduced-motion: reduce) {
          .fw-word { transition: none; filter: none; }
        }
      `}</style>
    </div>
  );
}
