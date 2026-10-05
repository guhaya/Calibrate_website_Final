import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Coaching Team",
  description: "Meet the CALIBRATE team, head coach Guhayavarman, certified trainers across Chennai, Bangalore, and Coimbatore, and on-call nutrition specialists. The people behind your protocol.",
  openGraph: {
    title: "Coaching Team | CALIBRATE by GVNFIT",
    description: "Guhayavarman and the full CALIBRATE coaching team. Certified trainers, nutrition specialists, and a head coach who reviews every application personally.",
  },
};

import Image from "next/image";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Icon from "@/components/shared/Icon";
import PageHero from "@/components/landing/PageHero";
import FinalCta from "@/components/landing/FinalCta";
import { Check, Hl } from "@/components/landing/ui";
import { getTeamMembers } from "@/lib/team";

// Reads live from Supabase on every request so edits made in /admin (Team)
// show up here immediately instead of only after the next deploy.
export const dynamic = "force-dynamic";

function hexToRgb(hex: string): string {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = parseInt(full, 16);
  if (Number.isNaN(num) || full.length !== 6) return "255,222,2";
  return `${(num >> 16) & 255},${(num >> 8) & 255},${num & 255}`;
}

const locations = ["Chennai", "Bangalore", "Hyderabad", "Coimbatore"];

const values = [
  {
    title: "No generic programmes",
    description: "Every client gets a plan built from scratch. Templates are for people who want average results.",
    icon: "target",
  },
  {
    title: "Radical accountability",
    description: "We track everything, not to judge, but because the data is what lets us make the right adjustments.",
    icon: "trending",
  },
  {
    title: "Sustainable, not extreme",
    description: "Crash diets and punishment workouts don't work. Real body change comes from systems you can maintain.",
    icon: "refresh",
  },
  {
    title: "Education alongside results",
    description: "The goal isn't dependency. By the end of your programme, you understand your body well enough to stay there.",
    icon: "brain",
  },
];

export default async function AboutPage() {
  const members = await getTeamMembers();
  const headCoach = members.find((m) => m.category === "head_coach") ?? {
    name: "Guhayavarman", handle: "@fitguhay", role: "Founder & Head Coach", location: "Chennai, TN",
    bio: [] as string[], credentials: [] as string[], stats: [] as { value: string; label: string }[],
    color: "#FFDE02", initials: "G",
  };
  const trainers = members.filter((m) => m.category === "trainer");
  const specialists = members.filter((m) => m.category === "specialist");
  const accent = headCoach.color || "#FFDE02";

  return (
    <>
      <Navigation />
      <main>
        <PageHero
          compact
          eyebrow="The people behind your protocol"
          title={<>Meet your <Hl ink>coaching team.</Hl></>}
          lead="A head coach who reviews every application personally, certified trainers across India and on-call specialists for clinical-level nutrition. One team, one method."
        />

        <section className="ps" aria-label="Where our coaches are based" style={{ padding: "26px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "#08080A" }}>
          <div className="mq" style={{ ["--mq-dur" as string]: "30s" }}>
            <div className="mq-track">
              {[...locations, ...locations, ...locations, ...locations].map((l, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 18, padding: "0 28px", fontFamily: "var(--font-display)", fontSize: 30, textTransform: "uppercase" }}>
                  {l}
                  <svg width="16" height="16" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 4 C54 38 62 46 96 50 C62 54 54 62 50 96 C46 62 38 54 4 50 C38 46 46 38 50 4Z" fill="#FFDE02" /></svg>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Head coach */}
        <section className="sec">
          <div className="wrap co-head">
            <div className="co-photo rv rv-left">
              <div className="co-frame" style={{ background: accent }} aria-hidden="true" />
              <div className="co-img">
                <Image src="/media/coach/guhay-090.webp" alt={`${headCoach.name}, ${headCoach.role ?? "Head Coach"}`} fill sizes="(max-width: 900px) 90vw, 480px" style={{ objectFit: "cover", objectPosition: "50% 15%" }} />
              </div>
            </div>
            <div className="co-copy">
              <span className="tag rv">{headCoach.role ?? "Founder & Head Coach"}</span>
              <h2 className="display-lg rv" style={{ ["--d" as string]: "80ms" }}>{headCoach.name}</h2>
              <p className="mono c-muted rv" style={{ ["--d" as string]: "120ms" }}>
                {[headCoach.handle, headCoach.location].filter(Boolean).join(" · ")}
              </p>
              {(headCoach.bio ?? []).map((para, i) => (
                <p key={i} className={i === 0 ? "lead rv" : "body-sm rv"} style={{ ["--d" as string]: `${160 + i * 60}ms` }}>{para}</p>
              ))}
              {(headCoach.credentials ?? []).length > 0 && (
                <ul className="co-creds rv">
                  {(headCoach.credentials ?? []).map((c) => (
                    <li key={c}><Check />{c}</li>
                  ))}
                </ul>
              )}
              {(headCoach.stats ?? []).length > 0 && (
                <div className="co-stats rv">
                  {(headCoach.stats ?? []).map((st) => (
                    <div key={st.label}>
                      <p className="co-stat-v">{st.value}</p>
                      <p className="mono c-muted">{st.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Trainers */}
        {trainers.length > 0 && (
          <section className="sec-tight">
            <div className="wrap">
              <div className="sec-head">
                <h2 className="display-lg rv balance" style={{ ["--d" as string]: "80ms" }}>On the floor, <Hl>on your side.</Hl></h2>
              </div>
              <div className="co-grid">
                {trainers.map((t, i) => (
                  <article key={t.id ?? t.name} className="card card-hover co-card rv" style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}>
                    <div className="co-card-top">
                      <span className="co-av" style={{ background: t.color || "#FFDE02", boxShadow: `0 0 30px rgba(${hexToRgb(t.color || "#FFDE02")},0.35)` }}>{t.initials || t.name.charAt(0)}</span>
                      {t.experience && <span className="co-chip">{t.experience}</span>}
                    </div>
                    <h3 className="display-sm">{t.name}</h3>
                    {t.role && <p style={{ fontWeight: 700, fontSize: 14 }}>{t.role}</p>}
                    <p className="mono c-accent">{[t.specialisation, t.location].filter(Boolean).join(" · ")}</p>
                    {t.description && <p className="body-sm">{t.description}</p>}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Specialists */}
        {specialists.length > 0 && (
          <section className="sec-tight">
            <div className="wrap">
              <div className="sec-head">
                <h2 className="display-lg rv balance" style={{ ["--d" as string]: "80ms" }}>Clinical depth <Hl>when you need it.</Hl></h2>
                <p className="lead rv" style={{ ["--d" as string]: "140ms", maxWidth: 600 }}>
                  For clients who need clinical-level nutrition or complex dietary support, these specialists step in.
                </p>
              </div>
              <div className="co-grid co-grid-2">
                {specialists.map((sp, i) => (
                  <article key={sp.id ?? sp.name} className="card card-hover co-card co-spec rv" style={{ ["--d" as string]: `${i * 90}ms` }}>
                    <span className="co-av" style={{ background: sp.color || "#FFDE02" }}>{sp.initials || sp.name.charAt(0)}</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <h3 className="display-sm">{sp.name}</h3>
                      {sp.role && <p style={{ fontWeight: 700, fontSize: 14 }}>{sp.role}</p>}
                      <p className="mono c-accent">{[sp.credentials_line, sp.location].filter(Boolean).join(" · ")}</p>
                      {sp.description && <p className="body-sm">{sp.description}</p>}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Values */}
        <section className="sec">
          <div className="wrap">
            <div className="sec-head">
              <h2 className="display-lg rv balance" style={{ ["--d" as string]: "80ms" }}>Four rules we <Hl>never break.</Hl></h2>
            </div>
            <div className="co-values">
              {values.map((v, i) => (
                <div key={v.title} className="card co-value rv" style={{ ["--d" as string]: `${i * 80}ms` }}>
                  <span className="co-v-ico"><Icon name={v.icon} size={22} style={{ color: "#050506" }} /></span>
                  <h3 className="display-sm" style={{ fontSize: 28 }}>{v.title}</h3>
                  <p className="body-sm">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />

      <style>{`
        .co-head { display: grid; grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr); gap: 72px; align-items: center; }
        .co-photo { position: relative; padding: 0 22px 22px 0; }
        .co-frame { position: absolute; inset: 22px 0 0 22px; border-radius: 32px; }
        .co-img { position: relative; aspect-ratio: 4 / 5; border-radius: 32px; overflow: hidden; border: 1px solid var(--line-strong); background: #111; }
        .co-copy { display: flex; flex-direction: column; gap: 18px; align-items: flex-start; }
        .co-creds { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 10px 20px; margin-top: 6px; }
        .co-creds li { display: flex; gap: 10px; align-items: flex-start; font-size: 14px; color: #E4E5EA; line-height: 1.45; }
        .co-stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; width: 100%; padding-top: 22px; border-top: 1px solid var(--line); }
        .co-stat-v { font-family: var(--font-display); font-size: clamp(36px, 3.6vw, 54px); line-height: 1; }
        .co-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
        .co-grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .co-card { padding: 30px; display: flex; flex-direction: column; gap: 10px; }
        .co-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
        .co-av { width: 56px; height: 56px; border-radius: 18px; display: grid; place-items: center; font-family: var(--font-display); font-size: 26px; color: #050506; flex-shrink: 0; }
        .co-chip { font-family: var(--font-mono); font-size: 10.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 6px 10px; border-radius: 999px; color: var(--accent); background: rgba(255,222,2,0.08); border: 1px solid rgba(255,222,2,0.25); }
        .co-spec { flex-direction: row; gap: 20px; align-items: flex-start; }
        .co-values { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
        .co-value { padding: 28px; display: flex; flex-direction: column; gap: 12px; }
        .co-v-ico { width: 48px; height: 48px; border-radius: 14px; background: var(--accent); display: grid; place-items: center; margin-bottom: 6px; }
        @media (max-width: 1000px) {
          .co-values { grid-template-columns: 1fr 1fr; }
          .co-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 900px) {
          .co-head { grid-template-columns: 1fr; gap: 48px; }
          .co-photo { max-width: 440px; margin: 0 auto; width: 100%; }
          .co-stats { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .co-grid, .co-grid-2, .co-values { grid-template-columns: 1fr; }
          .co-creds { grid-template-columns: 1fr; }
          .co-spec { flex-direction: column; }
        }
      `}</style>
    </>
  );
}
