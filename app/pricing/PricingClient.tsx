import Image from "next/image";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/landing/PageHero";
import Pricing from "@/components/landing/Pricing";
import Faq, { type FaqItem } from "@/components/landing/Faq";
import FinalCta from "@/components/landing/FinalCta";
import { Hl } from "@/components/landing/ui";
import type { PricingRate } from "@/lib/supabase";

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
      "Calibration Assessment Report (Week 0)",
      "Custom training programme (4-week blocks)",
      "Personalised nutrition protocol",
      "Weekly check-in analysis & adjustments",
      "WhatsApp support, weekdays, 4-hour response",
      "Monthly bloodwork review",
      "Vemisis app access",
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
      "Saves ₹10,000 vs monthly billing",
    ],
    highlight: true,
    active: true,
  },
];

const inclusions = [
  "Custom training programme",
  "Personalised nutrition",
  "Weekly check-in analysis",
  "Vemisis app access",
  "WhatsApp coach support",
  "Monthly bloodwork review",
];

const profiles = [
  { role: "Engineers & Developers", detail: "Complex problem-solvers who prefer systems over motivation.", img: "/media/life/me-coffee-laptop.webp" },
  { role: "Product Managers", detail: "Detail-oriented professionals who want measurable outcomes.", img: "/media/life/me-tablet-review.webp" },
  { role: "Consultants & Founders", detail: "High travel, high pressure. The protocol adapts to your schedule.", img: "/media/life/me-steps-watch.webp" },
];

const faqs: FaqItem[] = [
  {
    q: "Who is CALIBRATE built for?",
    a: "Engineers, product managers, consultants and founders who work 10+ hour days and have failed at generic fitness programmes before. The system is built around data, not motivation, specifically for people with demanding schedules and limited time.",
  },
  {
    q: "Why a 3-month minimum commitment?",
    a: "Real body recomposition takes time. The first month establishes baselines and builds the system. Months two and three are where the compounding effect of weekly adjustments produces visible, measurable results.",
  },
  {
    q: "What does the Calibration Assessment Report include?",
    a: "A full baseline analysis covering your body composition starting point, movement quality assessment, nutritional audit and constraint mapping around your actual work schedule. This is Week 0, before any training begins.",
  },
  {
    q: "How does WhatsApp support work?",
    a: "Your coach is reachable via WhatsApp on weekdays with a maximum 4-hour response window. This covers questions, adjustments and anything that comes up between weekly check-ins.",
  },
  {
    q: "How quickly can I start?",
    a: "Applications are open to everyone and Guhay reviews each one personally, usually within 48 hours. Because coaching is one-to-one, onboarding is paced to keep every programme's quality high. If there's a short wait when you apply, we'll tell you upfront.",
  },
  {
    q: "Do I need a gym?",
    a: "No. Programmes are built for gym, home gym, hotel gym or bodyweight setups. Your training is written around what you have access to, not what we assume.",
  },
  {
    q: "Is the consultation call really free?",
    a: "Completely free, and not a sales call. Guhay reviews your situation and tells you honestly whether the programme is the right fit for your goals and timeline.",
  },
];

export default function PricingClient() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          compact
          eyebrow="Coaching investment"
          title={<>Invest in a <Hl ink>system,</Hl> not a guess.</>}
          lead="Two tiers, one protocol. Every plan includes the full CALIBRATE method, the Vemisis app and direct access to your coach. Applications are reviewed personally within 48 hours."
        />

        <section className="ps" aria-label="Included in every plan" style={{ padding: "26px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "#08080A" }}>
          <div className="mq" style={{ ["--mq-dur" as string]: "38s" }}>
            <div className="mq-track">
              {[...inclusions, ...inclusions, ...inclusions].map((t, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "0 26px", fontFamily: "var(--font-display)", fontSize: 26, textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  {t}
                  <svg width="16" height="16" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 4 C54 38 62 46 96 50 C62 54 54 62 50 96 C46 62 38 54 4 50 C38 46 46 38 50 4Z" fill="#FFDE02" /></svg>
                </span>
              ))}
            </div>
          </div>
        </section>

        <Pricing fallback={FALLBACK_PLANS} showMoreLink={false} heading={false} />

        <section className="sec-tight">
          <div className="wrap">
            <div className="sec-head">
              <span className="tag rv">Who this is for</span>
              <h2 className="display-lg rv balance" style={{ ["--d" as string]: "80ms" }}>Built for <Hl>high performers.</Hl></h2>
            </div>
            <div className="pp-grid">
              {profiles.map((p, i) => (
                <article key={p.role} className="pp-card rv" style={{ ["--d" as string]: `${i * 100}ms` }}>
                  <Image src={p.img} alt="" fill sizes="(max-width: 800px) 100vw, 400px" style={{ objectFit: "cover" }} />
                  <div className="pp-shade" />
                  <div className="pp-body">
                    <h3 className="display-sm">{p.role}</h3>
                    <p style={{ fontSize: 14.5, color: "#D7D9E0", lineHeight: 1.55 }}>{p.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <style>{`
            .pp-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
            .pp-card { position: relative; min-height: 420px; border-radius: 28px; overflow: hidden; border: 1px solid var(--line); isolation: isolate; }
            .pp-card img { z-index: -2; transition: transform 1s var(--ease-out); }
            .pp-card:hover img { transform: scale(1.05); }
            .pp-shade { position: absolute; inset: 0; z-index: -1; background: linear-gradient(180deg, transparent 30%, rgba(5,5,6,0.95) 82%); }
            .pp-body { position: absolute; left: 0; right: 0; bottom: 0; padding: 26px; display: flex; flex-direction: column; gap: 8px; }
            @media (max-width: 800px) { .pp-grid { grid-template-columns: 1fr; } .pp-card { min-height: 360px; } }
          `}</style>
        </section>

        <Faq items={faqs} title={<>Questions before you <Hl>commit.</Hl></>} />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
