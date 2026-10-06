import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Book a Free Diagnostic Call",
  description: "Book a free 30-minute diagnostic call with Guhayavarman. Honest assessment of your situation, no sales pressure.",
  alternates: { canonical: "/book" },
  openGraph: {
    ...ogBase,
    url: `${SITE_URL}/book`,
    title: "Book a Call | CALIBRATE",
    description: "30 minutes. Free. Guhay reviews your situation and tells you honestly whether CALIBRATE is the right fit.",
  },
};

import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import CalendarBooking from "@/components/shared/CalendarBooking";
import { SITE_URL, ogBase } from "@/lib/seo";

const steps = [
  {
    step: "01",
    title: "You share your goals",
    desc: "Tell me what you're working towards, your current situation, and what's held you back before.",
  },
  {
    step: "02",
    title: "We find the right approach",
    desc: "I'll outline exactly what your coaching program would look like, training, nutrition, check-in structure.",
  },
  {
    step: "03",
    title: "You decide, no pressure",
    desc: "If it feels right, we start immediately. If not, you leave with clarity either way.",
  },
];

export default function BookPage() {
  return (
    <>
      <Navigation />
      <main id="main">
        <section className="bk-open" aria-labelledby="bk-title">
          <div className="wrap bk-grid">
            <div className="bk-copy">
              <p className="mono c-accent">Free consultation</p>
              <h1 id="bk-title" className="bk-title">Let&apos;s talk about your goals.</h1>
              <p className="bk-lead">
                A free 30-minute call, no pressure, no pitch. Guhay reviews your situation and tells you honestly whether coaching is the right fit.
              </p>
            </div>
            <div className="bk-card">
              <CalendarBooking />
            </div>
          </div>
        </section>

        <section className="bk-expect" aria-labelledby="bk-expect-title">
          <div className="wrap bk-expect-grid">
            <div className="bk-expect-head">
              <h2 id="bk-expect-title" className="display-md rv">What to expect on the call</h2>
              <p className="body-sm rv" style={{ ["--d" as string]: "80ms" }}>
                We&apos;ll talk about where you are, where you want to be, and whether coaching is the right fit for you.
              </p>
              <Link href="/apply" className="arrow-link rv" style={{ ["--d" as string]: "140ms" }}>
                Already sure? Apply directly
                <span className="ar" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </Link>
            </div>
            <ol className="bk-steps">
              {steps.map((s, i) => (
                <li key={s.step} className="bk-step rv" style={{ ["--d" as string]: `${i * 90}ms` }}>
                  <span className="bk-num" aria-hidden="true">{s.step}</span>
                  <div>
                    <h3 className="bk-step-title">{s.title}</h3>
                    <p className="body-sm">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <style>{`
          .bk-open { padding: 136px 0 72px; }
          .bk-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 520px); gap: 56px; align-items: center; }
          .bk-copy { display: flex; flex-direction: column; gap: 20px; align-items: flex-start; }
          .bk-title { font-family: var(--font-display); font-weight: 400; text-transform: uppercase; font-size: clamp(44px, 5.6vw, 88px); line-height: 0.92; color: #fff; text-wrap: balance; }
          .bk-lead { font-size: clamp(16px, 1.3vw, 18px); line-height: 1.6; color: var(--text-secondary); max-width: 480px; text-wrap: pretty; }
          .bk-card { background: var(--surface-1); border: 1px solid var(--line-strong); border-radius: 24px; padding: 36px; }
          .bk-expect { padding: 72px 0 128px; border-top: 1px solid var(--line); }
          .bk-expect-grid { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: 56px; align-items: start; }
          .bk-expect-head { display: flex; flex-direction: column; gap: 16px; align-items: flex-start; }
          .bk-steps { list-style: none; display: flex; flex-direction: column; }
          .bk-step { display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: 20px; padding: 24px 0; border-bottom: 1px solid var(--line); }
          .bk-step:first-child { padding-top: 4px; }
          .bk-num { font-family: var(--font-display); font-size: 32px; line-height: 1; color: var(--accent); }
          .bk-step-title { font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 6px; }
          @media (max-width: 900px) {
            .bk-grid, .bk-expect-grid { grid-template-columns: 1fr; gap: 28px; }
            .bk-copy { gap: 14px; }
          }
          @media (max-width: 600px) {
            .bk-open { padding: 104px 0 56px; }
            .bk-title { font-size: 40px; }
            .bk-lead { font-size: 15px; }
            .bk-card { padding: 24px 20px; }
            .bk-expect { padding: 56px 0 88px; }
            .bk-step { grid-template-columns: 48px minmax(0, 1fr); gap: 14px; }
            .bk-num { font-size: 26px; }
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}
