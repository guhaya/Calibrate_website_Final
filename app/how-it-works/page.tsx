import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/landing/PageHero";
import Method from "@/components/landing/Method";
import Journey, { type JourneyStep } from "@/components/landing/Journey";
import FinalCta from "@/components/landing/FinalCta";
import { Device, Hl } from "@/components/landing/ui";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "The DMAIC coaching process explained: Define, Measure, Analyse, Improve, Control, applied to body recomposition for busy professionals and delivered through the Vemisis app. From first call to transformed in 12 to 24 weeks.",
  openGraph: {
    title: "How It Works | CALIBRATE by GVNFIT",
    description: "The DMAIC protocol applied to body recomposition. Custom training, weekly data analysis and automatic adjustments, built around your actual schedule.",
  },
};

const steps: JourneyStep[] = [
  {
    number: "01",
    title: "Free Consultation Call",
    duration: "30 min",
    description:
      "We start with a call to understand where you are, what you've tried, and what you actually want. I'll ask about your training history, nutrition habits, lifestyle and goals, then tell you exactly what your programme will look like.",
    bullets: [
      "No obligation, this is a conversation, not a sales call",
      "Understand your schedule, equipment and starting point",
      "You'll know whether this is right for you by the end",
    ],
  },
  {
    number: "02",
    title: "Your Custom Programme Is Built",
    duration: "Within 5 days",
    description:
      "After we speak, I build your training and nutrition plan from scratch. Not a template. Every exercise, every calorie target, every macro split, written specifically for you.",
    bullets: [
      "Custom training split based on your goals and schedule",
      "Nutrition targets built around your body and lifestyle",
      "Full exercise library with video guidance",
    ],
  },
  {
    number: "03",
    title: "You Start & We Track Everything",
    duration: "Week 1 onwards",
    description:
      "You access your programme inside the Vemisis app. Log your sessions, track your nutrition and send me updates through the week. We use real data to make sure the programme is working.",
    bullets: [
      "Daily workout logging inside the app",
      "Nutrition tracking with your custom targets",
      "Bodyweight, measurements and strength records",
    ],
    img: { src: "/media/app/home.webp", alt: "Vemisis home screen with today's session" },
  },
  {
    number: "04",
    title: "Weekly Check-ins & Adjustments",
    duration: "Every week",
    description:
      "Every week you complete a check-in: how training felt, energy levels, sleep, compliance. I review everything and adjust the plan accordingly. No two weeks are exactly the same, your programme evolves as you do.",
    bullets: [
      "Video or written check-in each week",
      "I review your data before every response",
      "Plan updated immediately based on progress",
    ],
    img: { src: "/media/app/insights.webp", alt: "Vemisis insights screen with your weekly score" },
  },
  {
    number: "05",
    title: "Real Results. Lasting Change.",
    duration: "12 to 24 weeks",
    description:
      "By the end of your programme you won't just look different, you'll know exactly how to train and eat for the rest of your life. Most clients continue beyond their first programme because this becomes their new standard.",
    bullets: [
      "Body composition results you can measure",
      "Strength gains you can track week by week",
      "The knowledge and habits to maintain this for good",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          align="split"
          eyebrow="The CALIBRATE Method"
          title={<>From first call to <Hl ink>transformed.</Hl></>}
          lead="Every CALIBRATE coaching journey follows a clear, engineered process. Here is exactly what happens from the moment you book your free call, and how the Vemisis app keeps every week on track."
          ctas={[
            { label: "Book your free call", href: "/book" },
            { label: "See pricing", href: "/pricing", variant: "secondary" },
          ]}
          visual={
            <div style={{ position: "relative", display: "flex", justifyContent: "center", width: "100%" }}>
              <div className="hiw-halo" aria-hidden="true" />
              <Device src="/media/app/phase.webp" alt="Vemisis screen showing the current coaching phase and week" width={290} preload sizes="290px" />
              <div className="float-card bob" style={{ left: "4%", top: "18%" }}>
                <p className="mono c-muted">Where you are</p>
                <p style={{ fontWeight: 800, fontSize: 16, marginTop: 4 }}>Day 85 · Week 13</p>
              </div>
              <div className="float-card bob-2" style={{ right: "2%", bottom: "16%" }}>
                <p className="mono c-accent">Current phase</p>
                <p style={{ fontWeight: 800, fontSize: 16, marginTop: 4 }}>Improve</p>
              </div>
              <style>{`.hiw-halo{position:absolute;inset:10% 10%;border-radius:50%;background:radial-gradient(closest-side,rgba(255,222,2,0.3),transparent);filter:blur(20px)} @media(max-width:560px){.hiw-halo + .device{width:230px !important}}`}</style>
            </div>
          }
        />

        <Method showLink={false} />

        <Journey
          eyebrow="Your journey"
          title={<>Week by week, <Hl>step by step.</Hl></>}
          lead="From the first conversation to lasting results. No mystery, no black box, just a process you can see working."
          steps={steps}
        />

        <section className="sec-tight">
          <div className="wrap">
            <figure className="panel hiw-quote rv">
              <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true"><path d="M8 34c0-10 5-17 14-20l2 4c-5 2-8 6-8 10h6v12H8V34zm20 0c0-10 5-17 14-20l2 4c-5 2-8 6-8 10h6v12H28V34z" fill="#FFDE02" /></svg>
              <blockquote className="display-md">Your body is a process. Processes can be <span className="c-accent">optimised.</span></blockquote>
              <figcaption className="mono c-muted">Guhayavarman · Founder &amp; Head Coach, GVNFIT</figcaption>
            </figure>
          </div>
          <style>{`.hiw-quote{padding:64px 56px;display:flex;flex-direction:column;gap:22px;align-items:flex-start;background:radial-gradient(80% 120% at 100% 0%,rgba(255,222,2,0.12),var(--surface-1) 60%)} @media(max-width:600px){.hiw-quote{padding:40px 26px}}`}</style>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
