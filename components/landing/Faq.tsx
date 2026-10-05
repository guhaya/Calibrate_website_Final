"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type React from "react";
import { Arrow, Hl } from "./ui";

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
  const faqs = items;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="sec faq" id="faq">
      <div className="wrap faq-grid">
        <div className="faq-side">
          <span className="tag rv">FAQ</span>
          <h2 className="display-lg rv" style={{ ["--d" as string]: "80ms" }}>
            {title ?? <>Questions, <Hl>answered.</Hl></>}
          </h2>
          <div className="card faq-help rv" style={{ ["--d" as string]: "160ms" }}>
            <Image src="/media/coach/guhay-028.webp" alt="Coach Guhayavarman" width={64} height={64} className="faq-av" />
            <p className="display-sm" style={{ fontSize: 26 }}>Still have questions?</p>
            <p className="body-sm">Can&apos;t find what you&apos;re looking for? Message us and you&apos;ll hear back from a real coach.</p>
            <Link href="/contact" className="btn-secondary" style={{ marginTop: 6 }}>Message us <Arrow /></Link>
          </div>
        </div>

        <div className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="rv" style={{ ["--d" as string]: `${i * 50}ms` }}>
              <div className={`faq-item ${isOpen ? "is-open" : ""}`}>
                <button
                  className="faq-q"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  id={`faq-q-${i}`}
                >
                  <span>{f.q}</span>
                  <span className="faq-ico" aria-hidden="true"><span /><span /></span>
                </button>
                <div className="faq-a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                  <div><p>{f.a}</p></div>
                </div>
              </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .faq-grid { display: grid; grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr); gap: 72px; align-items: start; }
        .faq-side { position: sticky; top: 120px; display: flex; flex-direction: column; gap: 24px; align-items: flex-start; }
        .faq-help { padding: 28px; display: flex; flex-direction: column; gap: 10px; align-items: flex-start; margin-top: 16px; max-width: 400px; }
        .faq-av { border-radius: 50%; object-fit: cover; object-position: 50% 18%; width: 64px; height: 64px; border: 2px solid var(--accent); }
        .faq-list { display: flex; flex-direction: column; gap: 12px; }
        .faq-item { border-radius: 22px; background: var(--surface-1); border: 1px solid var(--line); transition: border-color 0.3s ease, background 0.3s ease; }
        .faq-item.is-open { border-color: rgba(255,222,2,0.35); background: #111114; }
        .faq-q {
          width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 18px;
          padding: 22px 24px; background: none; border: none; cursor: pointer; text-align: left;
          font-family: var(--font-body); font-size: 16.5px; font-weight: 700; color: #fff; line-height: 1.4;
        }
        .faq-ico { position: relative; width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0; background: rgba(255,255,255,0.06); transition: background 0.3s ease, transform 0.4s var(--ease-out); }
        .faq-ico span { position: absolute; left: 11px; right: 11px; top: 16px; height: 2px; border-radius: 2px; background: #fff; transition: transform 0.4s var(--ease-out), background 0.3s; }
        .faq-ico span:last-child { transform: rotate(90deg); }
        .faq-item.is-open .faq-ico { background: var(--accent); transform: rotate(180deg); }
        .faq-item.is-open .faq-ico span { background: #050506; }
        .faq-item.is-open .faq-ico span:last-child { transform: rotate(0deg); }
        .faq-a { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.45s var(--ease-out); }
        .faq-a > div { overflow: hidden; }
        .faq-item.is-open .faq-a { grid-template-rows: 1fr; }
        .faq-a p { padding: 0 24px 24px; font-size: 15px; line-height: 1.7; color: var(--text-secondary); max-width: 640px; }
        @media (max-width: 900px) {
          .faq-grid { grid-template-columns: 1fr; gap: 40px; }
          .faq-side { position: static; }
          .faq-help { display: none; }
        }
      `}</style>
    </section>
  );
}
