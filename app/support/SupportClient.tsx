"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import PageHero from "@/components/landing/PageHero";
import Footer from "@/components/layout/Footer";
import CalendarBooking from "@/components/shared/CalendarBooking";
import { Arrow } from "@/components/landing/ui";

const faqs = [
  {
    category: "Getting started",
    questions: [
      {
        q: "What happens on the free consultation call?",
        a: "We'll spend 30 minutes talking about your goals, where you are now, and what's held you back before. I'll ask about your training history, nutrition, lifestyle, and schedule, then tell you exactly what your programme would look like. No pitch, no pressure. You'll know if it's right for you by the end of the call.",
      },
      {
        q: "How quickly can I start?",
        a: "If we're a good fit after the call, you can start within 48 hours. Your full programme, training, nutrition, and app access, will be ready for your first session.",
      },
      {
        q: "Do I need any equipment?",
        a: "No specific equipment is required. Programmes are built around what you have access to: commercial gym, home gym, or even bodyweight only. We work with your situation.",
      },
      {
        q: "What if I'm a complete beginner?",
        a: "Beginners often see the fastest results because everything is new stimulus. Your programme will be built at your level and progressively increase in intensity as your fitness improves.",
      },
    ],
  },
  {
    category: "Coaching & programme",
    questions: [
      {
        q: "How often do we communicate?",
        a: "You have direct messaging access to your coach every day. Weekly check-ins are structured, but you can message anytime with questions, updates, or if something needs adjusting. Responses within 4 hours, typically much sooner.",
      },
      {
        q: "Can you accommodate dietary restrictions?",
        a: "Yes, completely. Vegan, vegetarian, halal, gluten-free, food intolerances, all fully accommodated. Your nutrition plan is built around what you can and will eat.",
      },
      {
        q: "What if I'm travelling or my schedule changes?",
        a: "This is one of the biggest advantages of coaching versus a static programme. When life changes, your plan changes with it. Just message your coach and the programme is adjusted immediately.",
      },
      {
        q: "How are check-ins done?",
        a: "You have the choice of video check-ins or written check-ins via the app. You'll complete a weekly check-in form covering training, nutrition, energy, sleep, and any questions, and receive detailed feedback from your coach.",
      },
    ],
  },
  {
    category: "Pricing & commitment",
    questions: [
      {
        q: "Is the free consultation really free?",
        a: "Yes, completely free. No credit card required, no obligation. It's a conversation to see if we're a good fit.",
      },
      {
        q: "How long is the minimum commitment?",
        a: "The minimum is 3 months. Real transformation takes time, and 3 months is where most clients see genuinely significant changes. After that you can continue month to month or cancel at the end of any billing cycle.",
      },
      {
        q: "Can I pause my programme?",
        a: "Yes. Life happens. If you need to pause due to illness, travel, or any other reason, we'll hold your spot and resume when you're ready.",
      },
    ],
  },
];

const helpOptions = [
  {
    n: "01",
    title: "Book a free call",
    description: "Schedule a 30-minute consultation. No commitment, no pitch.",
    cta: "Book your free call",
    href: "#booking",
  },
  {
    n: "02",
    title: "Email",
    description: "Send a message and we'll respond within 4 hours.",
    cta: "Email us",
    href: "mailto:Admin@gvnfit.online",
  },
];

export default function SupportClient() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <>
      <Navigation />
      <main id="main">
        <PageHero
          compact
          eyebrow="Contact & FAQ"
          title={<>Help with coaching and the Vemisis app.</>}
          lead="Questions about coaching, pricing or getting started? Find answers below or reach out directly."
        />

        {/* Ways to get help */}
        <section className="sp-help">
          <div className="wrap">
            <ol className="sp-rows">
              {helpOptions.map((o, i) => (
                <li key={o.n} className="sp-row rv" style={{ ["--d" as string]: `${i * 80}ms` }}>
                  <span className="mono c-accent sp-n">{o.n}</span>
                  <h2 className="display-sm sp-title">{o.title}</h2>
                  <p className="body-sm sp-desc">{o.description}</p>
                  <a href={o.href} className="arrow-link sp-cta">
                    {o.cta}
                    <span className="ar" aria-hidden="true"><Arrow size={12} /></span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Booking */}
        <section id="booking" className="sec-tight sp-book">
          <div className="wrap sp-book-grid">
            <div className="sp-book-copy rv">
              <span className="tag">Free consultation</span>
              <h2 className="display-md">Book your free consultation</h2>
              <p className="lead">
                30 minutes. We&apos;ll cover your goals, your situation, and exactly what coaching would look like for you.
              </p>
            </div>
            <div className="sp-book-card rv" style={{ ["--d" as string]: "120ms" }}>
              <CalendarBooking />
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="sec sp-faq">
          <div className="wrap sp-faq-grid">
            <div className="sp-faq-side">
              <h2 className="display-lg rv">Common questions</h2>
              <p className="body-sm rv" style={{ ["--d" as string]: "80ms" }}>
                Can&apos;t find your answer? <Link href="/contact" className="sp-inline">Message us</Link> and a coach will reply.
              </p>
            </div>

            <div className="sp-faq-groups">
              {faqs.map((section, si) => (
                <div key={section.category} className="sp-group">
                  <p className="mono c-accent sp-cat rv">{section.category}</p>
                  <div className="sp-list">
                    {section.questions.map((faq, fi) => {
                      const key = `${si}-${fi}`;
                      const isOpen = openFaq === key;
                      return (
                        <div key={faq.q} className="rv" style={{ ["--d" as string]: `${fi * 50}ms` }}>
                          <div className={`sp-item ${isOpen ? "is-open" : ""}`}>
                            <button
                              className="sp-q"
                              onClick={() => setOpenFaq(isOpen ? null : key)}
                              aria-expanded={isOpen}
                              aria-controls={`sp-a-${key}`}
                              id={`sp-q-${key}`}
                            >
                              <span>{faq.q}</span>
                              <span className="sp-ico" aria-hidden="true"><span /><span /></span>
                            </button>
                            <div className="sp-a" id={`sp-a-${key}`} role="region" aria-labelledby={`sp-q-${key}`}>
                              <div><p>{faq.a}</p></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .sp-help { padding: 8px 0 96px; }
        .sp-rows { list-style: none; border-top: 1px solid var(--line-strong); max-width: 1040px; margin: 0 auto; }
        .sp-row {
          display: grid; grid-template-columns: 64px minmax(0, 0.9fr) minmax(0, 1.2fr) auto;
          align-items: center; gap: 28px; padding: 30px 4px; border-bottom: 1px solid var(--line-strong);
        }
        .sp-title { font-size: clamp(26px, 2.4vw, 34px); }
        .sp-desc { max-width: 420px; }
        .sp-cta { justify-self: end; }

        .sp-book { border-top: 1px solid var(--line); background: var(--surface-1); }
        .sp-book-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 64px; align-items: center; }
        .sp-book-copy { display: flex; flex-direction: column; align-items: flex-start; gap: 22px; }
        .sp-book-card { padding: 40px; border-radius: 24px; background: var(--bg-base); border: 1px solid var(--line-strong); }

        .sp-faq-grid { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: 72px; align-items: start; }
        .sp-faq-side { position: sticky; top: 120px; display: flex; flex-direction: column; gap: 22px; align-items: flex-start; }
        .sp-inline { color: #fff; font-weight: 700; text-decoration: underline; text-decoration-color: var(--line-strong); text-underline-offset: 3px; display: inline-block; padding: 12px 0; margin: -12px 0; }
        .sp-inline:hover { text-decoration-color: var(--accent); }
        .sp-faq-groups { display: flex; flex-direction: column; gap: 48px; }
        .sp-cat { margin-bottom: 16px; }
        .sp-list { display: flex; flex-direction: column; gap: 12px; }
        .sp-item { border-radius: 24px; background: var(--surface-1); border: 1px solid var(--line); transition: border-color 0.3s ease, background 0.3s ease; }
        .sp-item.is-open { border-color: rgba(255,222,2,0.35); background: #111114; }
        .sp-q {
          width: 100%; min-height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 18px;
          padding: 18px 20px 18px 24px; background: none; border: none; cursor: pointer; text-align: left; border-radius: 24px;
          font: inherit; font-size: 16.5px; font-weight: 700; color: #fff; line-height: 1.4;
        }
        .sp-ico { position: relative; width: 34px; height: 34px; border-radius: 999px; flex-shrink: 0; background: rgba(255,255,255,0.06); transition: background 0.3s ease, transform 0.4s var(--ease-out); }
        .sp-ico span { position: absolute; left: 11px; right: 11px; top: 16px; height: 2px; border-radius: 999px; background: #fff; transition: transform 0.4s var(--ease-out), background 0.3s; }
        .sp-ico span:last-child { transform: rotate(90deg); }
        .sp-item.is-open .sp-ico { background: var(--accent); transform: rotate(180deg); }
        .sp-item.is-open .sp-ico span { background: #050506; }
        .sp-item.is-open .sp-ico span:last-child { transform: rotate(0deg); }
        .sp-a { display: grid; grid-template-rows: 0fr; visibility: hidden; transition: grid-template-rows 0.45s var(--ease-out), visibility 0.45s; }
        .sp-a > div { overflow: hidden; }
        .sp-item.is-open .sp-a { grid-template-rows: 1fr; visibility: visible; }
        .sp-a p { padding: 0 24px 24px; font-size: 15px; line-height: 1.7; color: var(--text-secondary); max-width: 640px; }

        @media (max-width: 900px) {
          .sp-help { padding-bottom: 64px; }
          .sp-row { grid-template-columns: 40px minmax(0, 1fr); gap: 8px 16px; padding: 24px 0; align-items: start; }
          .sp-n { padding-top: 8px; }
          .sp-desc, .sp-cta { grid-column: 2; }
          .sp-cta { justify-self: start; }
          .sp-book-grid { grid-template-columns: 1fr; gap: 40px; }
          .sp-book-card { padding: 28px 20px; }
          .sp-faq-grid { grid-template-columns: 1fr; gap: 40px; }
          .sp-faq-side { position: static; }
        }
      `}</style>
    </>
  );
}
