import type { Metadata } from "next";
import Image from "next/image";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/landing/PageHero";
import FinalCta from "@/components/landing/FinalCta";
import { Device, Hl } from "@/components/landing/ui";

export const metadata: Metadata = {
  title: "Vemisis App",
  description:
    "Vemisis is the training app that delivers the CALIBRATE method: custom training, flexible nutrition, weekly check-ins, recovery scores, fasting, wearable sync and direct access to your coach.",
};

const pillars = [
  {
    id: "training",
    label: "Training",
    headline: "Your training programme, built from scratch",
    description:
      "Not a template. Every session is written for your goals, your body and your available equipment, then updated every week based on your actual performance.",
    features: [
      { title: "Progressive overload baked in", description: "Weights, reps and volume increase systematically, session after session." },
      { title: "Works with any setup", description: "Commercial gym, home gym, hotel gym or bodyweight. Written around what you have." },
      { title: "Exercise video library", description: "Clear video guidance for every movement. No YouTube rabbit holes." },
      { title: "Session logging", description: "Every set logged in the app and reviewed by your coach weekly." },
    ],
    shots: [
      { src: "/media/app/workout.webp", alt: "Vemisis workout detail with sets, reps and rest" },
      { src: "/media/app/active-workout.webp", alt: "Vemisis active workout logging screen" },
    ],
  },
  {
    id: "nutrition",
    label: "Nutrition",
    headline: "Nutrition that works with your life",
    description:
      "Custom macro targets built around your body, your goal and your lifestyle. A flexible framework that lets you eat foods you enjoy, socialise normally and still hit your targets.",
    features: [
      { title: "Custom macros", description: "Protein, carbs and fat calculated for your bodyweight, composition and goal." },
      { title: "Flexible approach", description: "No banned foods and no rigid meal-by-meal prescriptions." },
      { title: "Fast logging", description: "Barcode scanning and a food database covering Indian and global cuisine." },
      { title: "Eating out guidance", description: "Strategies for restaurants, social events and travel." },
    ],
    shots: [
      { src: "/media/app/nutrition.webp", alt: "Vemisis nutrition screen with a calorie ring and macros" },
      { src: "/media/app/food-log.webp", alt: "Vemisis food log with meals" },
    ],
  },
  {
    id: "coach",
    label: "Coach & check-ins",
    headline: "Weekly check-ins that actually drive results",
    description:
      "Every week you complete a structured check-in covering training, nutrition, energy, sleep and compliance. Your coach responds with specific feedback, plan adjustments and clear direction.",
    features: [
      { title: "Video or written", description: "Choose the check-in format that suits you." },
      { title: "Data-driven adjustments", description: "Weight trend, training data and your answers drive every change." },
      { title: "Direct messaging", description: "Message your coach in the app between check-ins. Responses within 4 hours." },
      { title: "A.L.F.R.E.D AI", description: "Ask questions any time and get answers from your coach's own playbook." },
    ],
    shots: [
      { src: "/media/app/messages.webp", alt: "Vemisis coach messages" },
      { src: "/media/app/coach-hub.webp", alt: "Vemisis coach hub with your next step" },
    ],
  },
  {
    id: "progress",
    label: "Progress",
    headline: "Track everything. See everything.",
    description:
      "Bodyweight, measurements, strength records, energy and sleep, all logged and visible so you can see exactly how far you've come.",
    features: [
      { title: "Bodyweight trend", description: "Daily weigh-ins plotted as a 7-day average to cut through water noise." },
      { title: "Vemisis Score", description: "One number that shows what is driving your progress, and what is holding it back." },
      { title: "Measurements & photos", description: "Concrete evidence of change beyond the scale." },
      { title: "Coach visibility", description: "Your coach sees all your data, which is what makes precise adjustments possible." },
    ],
    shots: [
      { src: "/media/app/progress.webp", alt: "Vemisis progress screen with weight trend" },
      { src: "/media/app/insights.webp", alt: "Vemisis insights with overall score" },
    ],
  },
];

const extras = [
  { title: "Recovery score", body: "Daily readiness from HRV, resting heart rate and sleep.", img: "/media/app/recovery.webp" },
  { title: "Fasting timer", body: "16:8, 18:6, OMAD or custom with live metabolic stages.", img: "/media/app/fasting.webp" },
  { title: "Wearable sync", body: "Apple Health, Apple Watch and Oura on iPhone, Health Connect on Android.", img: "/media/app/connections.webp" },
  { title: "Vitals", body: "HRV, resting heart rate, sleep, SpO2 and more, trended over time.", img: "/media/app/vitals.webp" },
  { title: "Sessions", body: "Book, reschedule and review your 1-on-1 coaching sessions.", img: "/media/app/sessions.webp" },
  { title: "Smart notifications", body: "Plan updates, session reminders and weekly consistency nudges.", img: "/media/app/notifications.webp" },
];

export default function FeaturesPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          align="split"
          eyebrow="Vemisis · the CALIBRATE app"
          title={<>Every day, <Hl ink>already decided.</Hl></>}
          lead="Vemisis is the training app built for CALIBRATE clients. Open it, see today's session and targets, log in seconds, and let your coach handle the adjustments."
          ctas={[
            { label: "Book your free call", href: "/book" },
            { label: "How the method works", href: "/how-it-works", variant: "secondary" },
          ]}
          visual={
            <div className="ft-hero-vis">
              <Image src="/media/brand/vemisis-app-icon.png" alt="Vemisis app icon" width={96} height={96} className="ft-hero-icon" />
              <Device src="/media/app/home.webp" alt="Vemisis home screen" width={250} preload className="ft-hero-a" sizes="250px" />
              <Device src="/media/app/training.webp" alt="Vemisis training screen" width={220} className="ft-hero-b" sizes="220px" />
            </div>
          }
        />

        <nav className="ft-jump" aria-label="App sections">
          {pillars.map((p) => (
            <a key={p.id} href={`#${p.id}`}>{p.label}</a>
          ))}
          <a href="#more">More</a>
        </nav>

        {pillars.map((p, i) => (
          <section key={p.id} id={p.id} className={`sec-tight ft-pillar ${i % 2 ? "is-rev" : ""}`}>
            <div className="wrap ft-pillar-grid">
              <div className="ft-copy">
                <h2 className="display-md rv balance" style={{ ["--d" as string]: "80ms" }}>{p.headline}</h2>
                <p className="lead rv" style={{ ["--d" as string]: "140ms" }}>{p.description}</p>
                <div className="ft-feats">
                  {p.features.map((f, k) => (
                    <div key={f.title} className="ft-feat rv" style={{ ["--d" as string]: `${180 + k * 60}ms` }}>
                      <p style={{ fontWeight: 800, fontSize: 15.5 }}>{f.title}</p>
                      <p className="body-sm" style={{ fontSize: 14 }}>{f.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ft-vis rv rv-scale">
                <div className="ft-vis-glow" aria-hidden="true" />
                <Device src={p.shots[0].src} alt={p.shots[0].alt} width={250} className="ft-ph-a" sizes="250px" />
                <Device src={p.shots[1].src} alt={p.shots[1].alt} width={220} className="ft-ph-b" sizes="220px" />
              </div>
            </div>
          </section>
        ))}

        <section id="more" className="sec">
          <div className="wrap">
            <div className="sec-head">
              <h2 className="display-lg rv balance" style={{ ["--d" as string]: "80ms" }}>Built for the <Hl>whole you.</Hl></h2>
            </div>
            <div className="ft-extras">
              {extras.map((e, i) => (
                <article key={e.title} className="card card-hover ft-extra rv" style={{ ["--d" as string]: `${(i % 3) * 80}ms` }}>
                  <div>
                    <h3 className="display-sm">{e.title}</h3>
                    <p className="body-sm" style={{ marginTop: 8 }}>{e.body}</p>
                  </div>
                  <div className="ft-extra-shot">
                    <Image src={e.img} alt={`Vemisis ${e.title.toLowerCase()} screen`} width={640} height={1391} sizes="220px" />
                  </div>
                </article>
              ))}
            </div>
            <p className="mono c-muted" style={{ textAlign: "center", marginTop: 32 }}>Screens shown with sample client data</p>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />

      <style>{`
        .ft-hero-vis { position: relative; width: 100%; max-width: 520px; height: 600px; margin: 0 auto; }
        .ft-hero-vis::before { content: ''; position: absolute; inset: 15% 5%; border-radius: 50%; background: radial-gradient(closest-side, rgba(255,222,2,0.3), transparent); filter: blur(20px); }
        .ft-hero-icon { position: absolute; left: 4%; top: 2%; border-radius: 24px; z-index: 3; box-shadow: 0 20px 50px -10px rgba(255,222,2,0.45); animation: bob 6s ease-in-out infinite; }
        .ft-hero-a { position: absolute !important; right: 8%; top: 0; z-index: 2; transform: rotate(5deg); }
        .ft-hero-b { position: absolute !important; left: 8%; bottom: 0; z-index: 1; transform: rotate(-6deg); }
        .ft-jump {
          position: sticky; top: 92px; z-index: 20; margin: 0 auto; width: max-content; max-width: calc(100% - 32px);
          display: flex; gap: 4px; padding: 5px; border-radius: 999px; overflow-x: auto; scrollbar-width: none;
          background: rgba(14,14,18,0.82); border: 1px solid var(--line-strong);
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
        }
        .ft-jump::-webkit-scrollbar { display: none; }
        .ft-jump a { padding: 9px 16px; border-radius: 999px; font-size: 13px; font-weight: 700; color: var(--text-secondary); text-decoration: none; white-space: nowrap; transition: all 0.2s ease; }
        .ft-jump a:hover { background: var(--accent); color: #050506; }
        .ft-pillar { scroll-margin-top: 140px; }
        .ft-pillar-grid { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr); gap: 64px; align-items: center; }
        .ft-pillar.is-rev .ft-copy { order: 2; }
        .ft-copy { display: flex; flex-direction: column; gap: 20px; align-items: flex-start; }
        .ft-feats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%; margin-top: 8px; }
        .ft-feat { padding: 20px; border-radius: 20px; background: var(--surface-1); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 6px; }
        .ft-vis { position: relative; height: 560px; }
        .ft-vis-glow { position: absolute; inset: 12%; border-radius: 50%; background: radial-gradient(closest-side, rgba(255,222,2,0.22), transparent); filter: blur(20px); }
        .ft-ph-a { position: absolute !important; left: 14%; top: 0; z-index: 2; transform: rotate(-4deg); }
        .ft-ph-b { position: absolute !important; right: 10%; bottom: 0; z-index: 1; transform: rotate(5deg); }
        .ft-extras { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
        .ft-extra { padding: 28px 28px 0; display: flex; flex-direction: column; gap: 22px; min-height: 380px; }
        .ft-extra-shot { margin-top: auto; align-self: center; width: 62%; -webkit-mask-image: linear-gradient(#000 65%, transparent); mask-image: linear-gradient(#000 65%, transparent); }
        .ft-extra-shot img { width: 100%; height: auto; max-height: 230px; object-fit: cover; object-position: top; border-radius: 22px 22px 0 0; border: 1px solid var(--line-strong); }
        @media (max-width: 960px) {
          .ft-pillar-grid { grid-template-columns: 1fr; gap: 40px; }
          .ft-pillar.is-rev .ft-copy { order: 0; }
          .ft-vis { height: 480px; max-width: 460px; margin: 0 auto; width: 100%; }
          .ft-extras { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .ft-hero-vis { height: 470px; }
          .ft-hero-a { width: 200px !important; right: 2%; }
          .ft-hero-b { width: 175px !important; left: 2%; }
          .ft-hero-icon { width: 72px; height: 72px; }
          .ft-feats { grid-template-columns: 1fr; }
          .ft-vis { height: 420px; }
          .ft-ph-a { width: 200px !important; left: 4%; }
          .ft-ph-b { width: 175px !important; right: 2%; }
          .ft-extras { grid-template-columns: 1fr; }
          .ft-extra { min-height: 0; }
          .ft-jump { top: 84px; }
        }
      `}</style>
    </>
  );
}
