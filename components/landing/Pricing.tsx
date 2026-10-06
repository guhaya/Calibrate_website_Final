"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PricingRate } from "@/lib/supabase";
import { Arrow, Check } from "./ui";

// Shown only until /api/form-data responds. Live plans are managed in /admin (Rates).
const FALLBACK_PLANS: PricingRate[] = [
  {
    id: "fallback-monthly",
    order_index: 1,
    name: "Monthly",
    tagline: "Flexible commitment",
    price: 25000,
    currency: "INR",
    billing_note: "per month · minimum 3-month commitment",
    discount_label: null,
    features: [
      "Calibration Assessment Report",
      "Custom training programme",
      "Personalised nutrition protocol",
      "Weekly check-in & adjustments",
      "WhatsApp coach support",
    ],
    highlight: false,
    active: true,
  },
  {
    id: "fallback-quarterly",
    order_index: 2,
    name: "Quarterly",
    tagline: "Best value",
    price: 65000,
    currency: "INR",
    billing_note: "billed upfront · full 3-month programme",
    discount_label: "Save ₹10,000",
    features: [
      "Everything in Monthly",
      "Quarterly re-calibration audit",
      "Priority application review",
      "Saves ₹10,000 vs monthly",
    ],
    highlight: true,
    active: true,
  },
];

function formatPrice(rate: PricingRate) {
  if (rate.currency === "INR") return `₹${rate.price.toLocaleString("en-IN")}`;
  return `${rate.currency} ${rate.price.toLocaleString()}`;
}

export default function Pricing({ fallback = FALLBACK_PLANS, showMoreLink = true, heading = true }: { fallback?: PricingRate[]; showMoreLink?: boolean; heading?: boolean }) {
  const [plans, setPlans] = useState<PricingRate[]>(fallback);

  useEffect(() => {
    fetch("/api/form-data", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        if (json.rates && json.rates.length > 0) setPlans(json.rates);
      })
      .catch(() => { /* keep fallback */ });
  }, []);

  const cols = Math.min(plans.length, 3) || 1;

  return (
    <section className="sec pr" id="pricing">
      <div className="wrap">
        {heading && <div className="sec-head">
          <span className="tag rv">Investment</span>
          <h2 className="display-lg rv balance" style={{ ["--d" as string]: "80ms" }}>
            One protocol. Zero guesswork.
          </h2>
          <p className="lead rv" style={{ ["--d" as string]: "160ms", maxWidth: 560 }}>
            Every plan includes the full CALIBRATE system, your Vemisis app access, weekly analysis and direct coach access.
          </p>
        </div>}

        <div className="pr-grid" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, maxWidth: cols === 1 ? 480 : cols === 2 ? 920 : 1240 }}>
          {plans.map((plan, i) => (
            <article key={plan.id} className={`pr-card rv ${plan.highlight ? "is-hl" : ""}`} style={{ ["--d" as string]: `${i * 120}ms` }}>
              {plan.highlight && plan.discount_label && <span className="pr-badge">{plan.discount_label}</span>}
              {plan.tagline && <p className="mono pr-tagline">{plan.tagline}</p>}
              <h3 className="pr-name">{plan.name}</h3>
              <p className="pr-price">{formatPrice(plan)}</p>
              {plan.billing_note && <p className="pr-note">{plan.billing_note}</p>}
              <Link href="/apply" className={plan.highlight ? "btn-primary" : "btn-secondary"} style={{ width: "100%", margin: "26px 0 28px" }}>
                Apply for {plan.name} <Arrow />
              </Link>
              <ul className="pr-feats">
                {plan.features.map((f) => (
                  <li key={f}><Check color={plan.highlight ? "#050506" : "#FFDE02"} />{f}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="pr-guarantee rv">
          <div className="pr-shield" aria-hidden="true">
            <svg width="30" height="30" viewBox="0 0 34 34" fill="none">
              <path d="M17 3l11 5v8c0 8-5 12.5-11 15-6-2.5-11-7-11-15V8l11-5z" stroke="#050506" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M12 17l3.5 3.5L22 13" stroke="#050506" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <p className="display-sm" style={{ marginBottom: 6 }}>The risk-free guarantee</p>
            <p className="body-sm">
              Follow the protocol for 30 days. If you don&apos;t see measurable progress in your check-in data, we rebuild your
              plan from scratch, free, until you do.
            </p>
          </div>
          <ul className="pr-g-list">
            {["No fine print", "No hidden fees", "3-month minimum, then month to month"].map((t) => (
              <li key={t}><Check />{t}</li>
            ))}
          </ul>
        </div>

        {showMoreLink && (
          <p className="body-sm" style={{ textAlign: "center", marginTop: 28 }}>
            Full plan breakdown and FAQ on the <Link href="/pricing" className="link-underline">pricing page</Link>.
          </p>
        )}
      </div>

      <style>{`
        .pr-grid { display: grid; gap: 20px; margin: 0 auto; align-items: stretch; }
        .pr-card {
          position: relative; padding: 38px 34px; border-radius: 30px;
          background: var(--surface-1); border: 1px solid var(--line);
          display: flex; flex-direction: column;
        }
        .pr-card.is-hl { background: var(--accent); color: #050506; border-color: var(--accent); box-shadow: 0 40px 90px -30px rgba(255,222,2,0.5); }
        .pr-card.is-hl .btn-primary { background: #050506; color: #fff; }
        .pr-card.is-hl .btn-primary:hover { box-shadow: 0 16px 40px -10px rgba(0,0,0,0.5); }
        .pr-badge {
          position: absolute; top: 22px; right: 22px;
          padding: 7px 14px; border-radius: 999px; background: #050506; color: var(--accent);
          font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
        }
        .pr-tagline { color: var(--text-muted); }
        .pr-card.is-hl .pr-tagline { color: rgba(5,5,6,0.65); }
        .pr-name { font-family: var(--font-display); font-size: 42px; line-height: 1; margin-top: 10px; }
        .pr-card.is-hl .pr-name, .pr-card.is-hl .pr-price { color: #050506; }
        .pr-price { font-family: var(--font-display); font-size: clamp(54px, 5.4vw, 76px); line-height: 1; margin-top: 18px; color: #fff; }
        .pr-note { font-size: 13.5px; color: var(--text-muted); margin-top: 8px; }
        .pr-card.is-hl .pr-note { color: rgba(5,5,6,0.7); }
        .pr-feats { list-style: none; display: grid; gap: 12px; }
        .pr-feats li { display: flex; gap: 10px; align-items: flex-start; font-size: 14.5px; line-height: 1.45; font-weight: 600; }
        .pr-card.is-hl .pr-feats svg circle { fill: rgba(5,5,6,0.12); stroke: rgba(5,5,6,0.3); }
        .pr-guarantee {
          margin: 28px auto 0; max-width: 920px;
          display: flex; align-items: center; gap: 28px; flex-wrap: wrap;
          padding: 30px 34px; border-radius: 28px;
          background: var(--surface-1); border: 1px solid rgba(255,222,2,0.25);
        }
        .pr-shield { width: 64px; height: 64px; border-radius: 50%; background: var(--accent); display: grid; place-items: center; flex-shrink: 0; }
        .pr-g-list { list-style: none; display: grid; gap: 8px; }
        .pr-g-list li { display: flex; gap: 8px; align-items: center; font-size: 13.5px; font-weight: 600; white-space: nowrap; }
        @media (max-width: 760px) {
          .pr-grid { grid-template-columns: 1fr !important; max-width: 480px !important; }
          .pr-card { padding: 32px 26px; }
          .pr-guarantee { padding: 26px 22px; gap: 20px; }
        }
      `}</style>
    </section>
  );
}
