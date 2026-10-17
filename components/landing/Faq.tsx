import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { Arrow } from "./ui";

const DEFAULT_FAQS = [
  {
    q: "Who is CALIBRATE built for?",
    a: "Engineers, product managers, consultants and founders who work 10+ hour days and have failed at generic fitness programmes before. The system is built around data, not motivation.",
  },
  {
    q: "What is the difference between CALIBRATE and Vemisis?",
    a: "CALIBRATE is the coaching methodology from GVNFIT (Guhayavarman Fitness): the DMAIC protocol, your coach and the weekly analysis. Vemisis is the app that delivers it, holding your sessions, nutrition, recovery data and coach chat in one place.",
  },
  {
    q: "Why a 3-month minimum commitment?",
    a: "Real body recomposition takes time. The first month establishes baselines. Months two and three are where the compounding effect of weekly adjustments produces visible, measurable results.",
  },
  {
    q: "How does coach support work?",
    a: "Your coach is reachable via WhatsApp on weekdays with a maximum 4-hour response window, covering questions, adjustments and anything between weekly check-ins. You can also message your coach inside Vemisis.",
  },
  {
    q: "How quickly can I start?",
    a: "Applications are open to everyone and each one is personally reviewed, usually within 48 hours. Onboarding is paced so coaching quality stays high.",
  },
  {
    q: "Do I need a gym?",
    a: "No. Programmes are built for a gym, home gym, hotel gym or bodyweight setup. Your training is written around what you have access to.",
  },
  {
    q: "Is the consultation call really free?",
    a: "Completely free, and not a sales call. We review your situation and tell you honestly whether the programme fits your goals and timeline.",
  },
];

export type FaqItem = { q: string; a: string };

export default function Faq({ items = DEFAULT_FAQS, title }: { items?: FaqItem[]; title?: React.ReactNode }) {
  // An open question-and-answer list, not an accordion: every answer is
  // readable at a glance (and by search engines), set in two columns.
  return (
    <section className="sec faq" id="faq">
      <div className="wrap">
        <div className="faq-head">
          <h2 className="display-lg rv">{title ?? <>What people ask before booking.</>}</h2>
          <p className="faq-more rv" style={{ ["--d" as string]: "100ms" }}>
            <Image src="/media/coach/guhay-028.webp" alt="" width={44} height={44} className="faq-av" />
            <span>
              Something else on your mind?{" "}
              <Link href="/contact" className="faq-link">Message a coach <Arrow size={12} /></Link>
            </span>
          </p>
        </div>

        <dl className="faq-list">
          {items.map((f, i) => (
            <div key={f.q} className="faq-item rv" style={{ ["--d" as string]: `${(i % 2) * 60}ms` }}>
              <dt className="faq-q">{f.q}</dt>
              <dd className="faq-a">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>

      <style>{`
        .faq-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 24px 48px; margin-bottom: 48px; }
        .faq-head h2 { max-width: 14ch; text-wrap: balance; }
        .faq-more { display: flex; align-items: center; gap: 14px; font-size: 15px; color: var(--text-secondary); }
        .faq-av { border-radius: 14px; object-fit: cover; object-position: 50% 18%; width: 44px; height: 44px; flex: none; }
        .faq-link { color: var(--accent); font-weight: 700; display: inline-flex; align-items: center; gap: 6px; }
        .faq-link:hover { text-decoration: underline; text-underline-offset: 3px; }
        .faq-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 64px; border-top: 1px solid var(--border-strong); }
        .faq-item { padding: 26px 0 28px; border-bottom: 1px solid var(--border); }
        .faq-q { font-size: 17px; font-weight: 700; color: #fff; line-height: 1.4; text-wrap: balance; }
        .faq-a { margin: 10px 0 0; font-size: 15px; line-height: 1.7; color: var(--text-secondary); max-width: 60ch; }
        @media (max-width: 860px) {
          .faq-list { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
