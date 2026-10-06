"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Arrow } from "@/components/landing/ui";

const faqs = [
  {
    q: "How does online coaching actually work?",
    a: "You get a custom training programme and nutrition targets delivered through the Vemisis app. Each week you complete a structured check-in covering your training, nutrition, energy, and sleep. Your coach reviews everything and responds with specific feedback and adjustments. You also have direct messaging access for questions between check-ins.",
  },
  {
    q: "Do I need a gym membership?",
    a: "No. Your programme is written around whatever equipment you have, commercial gym, home gym, hotel gym, or bodyweight only. We'll establish exactly what you have access to before writing anything.",
  },
  {
    q: "How quickly will I see results?",
    a: "Most clients notice meaningful changes in energy, performance, and body composition within 4-6 weeks. Visible physical changes typically show clearly by weeks 8-12. Results depend on your starting point, consistency, and how closely you follow the plan.",
  },
  {
    q: "What's included in the free consultation?",
    a: "A 30-minute call where we cover your current situation, what you've tried before, your goals, lifestyle, and any constraints. You'll leave with clarity on your path forward. No pressure to sign up, the call is genuinely about figuring out if we're a good fit.",
  },
  {
    q: "How is this different from following a YouTube programme?",
    a: "A generic programme isn't designed for your body, your schedule, or your goals. It doesn't adjust when you plateau, doesn't account for your injury history, and doesn't hold you accountable. Coaching gives you a plan that evolves with you every single week.",
  },
  {
    q: "What if I travel a lot or have an unpredictable schedule?",
    a: "That's exactly what coaching is built for. Your programme is designed around your reality, including travel weeks, busy periods, and schedule changes. We adjust in real time rather than leaving you to figure it out alone.",
  },
  {
    q: "Can I do this if I'm a complete beginner?",
    a: "Absolutely. Some of our best transformations have come from complete beginners. You don't need experience, you need a structured starting point and someone to guide you through the early stages correctly.",
  },
  {
    q: "How do I pay? Are there contracts?",
    a: "Every CALIBRATE plan has a 3-month minimum commitment. The Monthly plan is billed each month; the Quarterly plan is paid upfront and saves ₹10,000 over the three months. After the minimum, you continue month to month and can cancel with 7 days' notice before your next billing date.",
  },
  {
    q: "What app do you use?",
    a: "CALIBRATE clients use a dedicated coaching app for training, nutrition tracking, progress photos, check-ins, and direct coach messaging. Everything is in one place, no juggling multiple apps.",
  },
  {
    q: "Is there a minimum commitment period?",
    a: "Yes, the minimum commitment is 3 months. The first month sets your baselines; months two and three are where results become visible and measurable. After that you can continue month to month or cancel at the end of any billing cycle.",
  },
];

type Channel = {
  n: string;
  channel: string;
  detail: string;
  expect: string;
  href?: string;
  internal?: boolean;
};

const channels: Channel[] = [
  { n: "01", channel: "Email", detail: "Admin@gvnfit.online", expect: "Response within 4 hours", href: "mailto:Admin@gvnfit.online" },
  { n: "02", channel: "WhatsApp", detail: "Coach support for clients, weekdays", expect: "Response within 4 hours" },
  { n: "03", channel: "Book a free call", detail: "Free consultation, 30 minutes", expect: "No commitment", href: "/book", internal: true },
];

function RowInner({ c }: { c: Channel }) {
  return (
    <>
      <span className="mono c-muted ct-n">{c.n}</span>
      <span className="ct-ch">{c.channel}</span>
      <span className="ct-detail">{c.detail}</span>
      <span className="ct-expect">{c.expect}</span>
      {c.href ? (
        <span className="ct-ar" aria-hidden="true"><Arrow /></span>
      ) : (
        <span className="ct-ar-none" aria-hidden="true" />
      )}
    </>
  );
}

export default function ContactClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "", sent: false });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Enquiry from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    );
    window.location.href = `mailto:Admin@gvnfit.online?subject=${subject}&body=${body}`;
    setFormState((p) => ({ ...p, sent: true }));
  }

  return (
    <>
      <Navigation />
      <main id="main">
        {/* Opener: three direct channels */}
        <section className="ct-open">
          <div className="ct-bg grid-lines" aria-hidden="true" />
          <div className="wrap">
            <div className="ct-head">
              <span className="tag ct-in" style={{ ["--d" as string]: "0ms" }}>Get in touch</span>
              <h1 className="ct-title ct-in" style={{ ["--d" as string]: "90ms" }}>Talk to a coach.</h1>
              <p className="lead ct-lead ct-in" style={{ ["--d" as string]: "180ms" }}>
                Have a question before booking? Want to know if coaching is right for you? Reach out, every message gets a personal response within 4 hours.
              </p>
            </div>

            <ul className="ct-rows ct-in" style={{ ["--d" as string]: "260ms" }}>
              {channels.map((c) => (
                <li key={c.channel}>
                  {c.href && c.internal ? (
                    <Link href={c.href} className="ct-row is-link"><RowInner c={c} /></Link>
                  ) : c.href ? (
                    <a href={c.href} className="ct-row is-link"><RowInner c={c} /></a>
                  ) : (
                    <div className="ct-row"><RowInner c={c} /></div>
                  )}
                </li>
              ))}
            </ul>

            <p className="body-sm ct-social">
              Prefer social? Follow along on Instagram at{" "}
              <a href="https://instagram.com/fitguhay" target="_blank" rel="noopener noreferrer" className="ct-inline">@fitguhay</a>.
            </p>
          </div>
        </section>

        {/* Email form + FAQ side by side */}
        <section className="sec-tight ct-main">
          <div className="wrap ct-grid">
            <div className="ct-form-col rv">
              <h2 className="display-sm">Send a message</h2>
              <p className="body-sm ct-sub">
                Prefer email? Fill this out and it opens your email client pre-filled, or just email directly.
              </p>

              {formState.sent ? (
                <div className="ct-sent" role="status">
                  <span className="ct-sent-ico" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none"><path d="M5 11l4.5 4.5 8-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <p className="ct-sent-title">Email client opened</p>
                  <p className="body-sm">Hit send in your email app. We respond within 4 hours.</p>
                  <p className="body-sm ct-sent-fallback">
                    Nothing opened? Email <a href="mailto:Admin@gvnfit.online" className="ct-inline">Admin@gvnfit.online</a> directly or DM <a href="https://instagram.com/fitguhay" target="_blank" rel="noopener noreferrer" className="ct-inline">@fitguhay</a> on Instagram.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="ct-form">
                  {[
                    { label: "Your name", type: "text", key: "name", placeholder: "Priya Raman" },
                    { label: "Email address", type: "email", key: "email", placeholder: "priya@email.com" },
                  ].map((field) => (
                    <div key={field.key} className="ct-field">
                      <label htmlFor={`contact-${field.key}`} className="mono ct-label">
                        {field.label}
                      </label>
                      <input
                        id={`contact-${field.key}`}
                        type={field.type}
                        required
                        placeholder={field.placeholder}
                        value={formState[field.key as "name" | "email"]}
                        onChange={(e) => setFormState((p) => ({ ...p, [field.key]: e.target.value }))}
                        className="ct-input"
                      />
                    </div>
                  ))}
                  <div className="ct-field">
                    <label htmlFor="contact-message" className="mono ct-label">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      placeholder="Tell me about your goals, current situation, or any questions you have..."
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))}
                      className="ct-input ct-textarea"
                    />
                  </div>
                  <button type="submit" className="btn-primary btn-primary-lg ct-submit">
                    Send message <Arrow />
                  </button>
                  <p className="ct-note">
                    This opens your email client with a pre-filled message to Admin@gvnfit.online
                  </p>
                </form>
              )}
            </div>

            {/* FAQ */}
            <div id="faq" className="ct-faq">
              <h2 className="display-sm rv">Frequently asked</h2>
              <p className="body-sm ct-sub rv" style={{ ["--d" as string]: "60ms" }}>
                Most questions answered. If yours isn&apos;t here, just ask.
              </p>
              <div className="ct-faq-list">
                {faqs.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div key={faq.q} className={`ct-fi ${isOpen ? "is-open" : ""}`}>
                      <button
                        className="ct-fq"
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`ct-fa-${i}`}
                        id={`ct-fq-${i}`}
                      >
                        <span>{faq.q}</span>
                        <span className="ct-fico" aria-hidden="true"><span /><span /></span>
                      </button>
                      <div className="ct-fa" id={`ct-fa-${i}`} role="region" aria-labelledby={`ct-fq-${i}`}>
                        <div><p>{faq.a}</p></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="ct-end">
          <div className="wrap">
            <div className="ct-end-row rv">
              <h2 className="display-md">Still deciding?</h2>
              <div className="ct-end-copy">
                <p className="lead">
                  The free consultation exists for this exact moment. 30 minutes, no pitch, no pressure. Just an honest conversation about whether coaching makes sense for you.
                </p>
                <Link href="/book" className="btn-primary btn-primary-lg">
                  Book your free call <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .ct-open { position: relative; padding: 168px 0 72px; isolation: isolate; overflow: hidden; }
        .ct-bg { position: absolute; inset: 0; z-index: -1; }
        .ct-head { display: flex; flex-direction: column; align-items: flex-start; gap: 22px; max-width: 900px; margin-bottom: 56px; }
        .ct-title { font-family: var(--font-display); font-weight: 400; font-size: clamp(54px, 8.6vw, 138px); line-height: 0.9; text-transform: uppercase; color: #fff; }
        .ct-lead { max-width: 620px; text-wrap: pretty; }
        .ct-in { animation: fade-up 0.9s var(--ease-out) both; animation-delay: var(--d); }

        .ct-rows { list-style: none; border-top: 1px solid var(--line-strong); }
        .ct-rows li { border-bottom: 1px solid var(--line-strong); }
        .ct-row {
          display: grid; grid-template-columns: 56px minmax(0, 1.1fr) minmax(0, 1.2fr) minmax(0, 0.9fr) 44px;
          align-items: center; gap: 24px; min-height: 104px; padding: 20px 8px;
          color: #fff; text-decoration: none; border-radius: 14px;
          transition: background 0.3s ease;
        }
        .ct-row.is-link:hover { background: rgba(255,255,255,0.03); }
        .ct-ch { font-family: var(--font-display); font-size: clamp(30px, 3.4vw, 52px); line-height: 1; text-transform: uppercase; }
        .ct-detail { font-size: 17px; font-weight: 700; color: #fff; overflow-wrap: anywhere; }
        .ct-expect { font-size: 14.5px; color: var(--text-secondary); }
        .ct-ar {
          width: 44px; height: 44px; border-radius: 999px; display: grid; place-items: center;
          border: 1px solid var(--line-strong); transition: all 0.3s var(--ease-out);
        }
        .ct-row.is-link:hover .ct-ar { background: var(--accent); border-color: var(--accent); color: #050506; transform: rotate(-45deg); }
        .ct-social { margin-top: 28px; }
        .ct-inline { color: #fff; font-weight: 700; text-decoration: underline; text-decoration-color: var(--line-strong); text-underline-offset: 3px; display: inline-block; padding: 12px 0; margin: -12px 0; }
        .ct-inline:hover { text-decoration-color: var(--accent); }

        .ct-main { border-top: 1px solid var(--line); }
        .ct-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 72px; align-items: start; }
        .ct-sub { margin-top: 12px; margin-bottom: 32px; max-width: 520px; }
        .ct-form { display: flex; flex-direction: column; gap: 18px; }
        .ct-field { display: flex; flex-direction: column; gap: 10px; }
        .ct-label { color: var(--text-secondary); }
        .ct-input {
          width: 100%; min-height: 52px; padding: 14px 18px; border-radius: 14px;
          background: var(--surface-1); border: 1px solid var(--line-strong);
          color: #fff; font: inherit; font-size: 15px; transition: border-color 0.2s ease;
        }
        .ct-input:hover { border-color: rgba(255,255,255,0.28); }
        .ct-input:focus { border-color: var(--accent); }
        .ct-input::placeholder { color: var(--text-muted); }
        .ct-textarea { resize: vertical; min-height: 140px; }
        .ct-submit { width: 100%; margin-top: 6px; }
        .ct-note { font-size: 13px; color: var(--text-muted); text-align: center; }
        .ct-sent { padding: 32px; border-radius: 24px; background: var(--surface-1); border: 1px solid var(--line-strong); display: flex; flex-direction: column; gap: 10px; align-items: flex-start; }
        .ct-sent-ico { width: 44px; height: 44px; border-radius: 999px; display: grid; place-items: center; background: var(--accent); color: #050506; margin-bottom: 6px; }
        .ct-sent-title { font-size: 18px; font-weight: 800; color: #fff; }
        .ct-sent-fallback { margin-top: 6px; }

        .ct-faq { scroll-margin-top: 110px; }
        .ct-faq-list { display: flex; flex-direction: column; gap: 10px; }
        .ct-fi { border-radius: 14px; background: var(--surface-1); border: 1px solid var(--line); transition: border-color 0.3s ease, background 0.3s ease; }
        .ct-fi.is-open { border-color: rgba(255,222,2,0.35); background: #111114; }
        .ct-fq {
          width: 100%; min-height: 56px; display: flex; align-items: center; justify-content: space-between; gap: 16px;
          padding: 14px 18px 14px 20px; background: none; border: none; cursor: pointer; text-align: left; border-radius: 14px;
          font: inherit; font-size: 15px; font-weight: 700; color: #fff; line-height: 1.4;
        }
        .ct-fico { position: relative; width: 30px; height: 30px; border-radius: 999px; flex-shrink: 0; background: rgba(255,255,255,0.06); transition: background 0.3s ease, transform 0.4s var(--ease-out); }
        .ct-fico span { position: absolute; left: 9px; right: 9px; top: 14px; height: 2px; border-radius: 999px; background: #fff; transition: transform 0.4s var(--ease-out), background 0.3s; }
        .ct-fico span:last-child { transform: rotate(90deg); }
        .ct-fi.is-open .ct-fico { background: var(--accent); transform: rotate(180deg); }
        .ct-fi.is-open .ct-fico span { background: #050506; }
        .ct-fi.is-open .ct-fico span:last-child { transform: rotate(0deg); }
        .ct-fa { display: grid; grid-template-rows: 0fr; visibility: hidden; transition: grid-template-rows 0.45s var(--ease-out), visibility 0.45s; }
        .ct-fa > div { overflow: hidden; }
        .ct-fi.is-open .ct-fa { grid-template-rows: 1fr; visibility: visible; }
        .ct-fa p { padding: 0 20px 20px; font-size: 14.5px; line-height: 1.7; color: var(--text-secondary); }

        .ct-end { padding: 0 0 120px; }
        .ct-end-row { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: 48px; align-items: start; padding-top: 56px; border-top: 1px solid var(--line-strong); }
        .ct-end-copy { display: flex; flex-direction: column; align-items: flex-start; gap: 28px; max-width: 600px; }

        @media (max-width: 900px) {
          .ct-open { padding: 128px 0 56px; }
          .ct-head { margin-bottom: 40px; }
          .ct-row { grid-template-columns: minmax(0, 1fr) 44px; grid-template-areas: "ch ar" "detail ar" "expect ar"; gap: 6px 16px; padding: 22px 4px; min-height: 0; }
          .ct-n { display: none; }
          .ct-ch { grid-area: ch; margin-bottom: 6px; }
          .ct-detail { grid-area: detail; font-size: 16px; }
          .ct-expect { grid-area: expect; }
          .ct-ar, .ct-ar-none { grid-area: ar; }
          .ct-grid { grid-template-columns: 1fr; gap: 64px; }
          .ct-end { padding-bottom: 88px; }
          .ct-end-row { grid-template-columns: 1fr; gap: 24px; padding-top: 40px; }
        }
      `}</style>
    </>
  );
}
