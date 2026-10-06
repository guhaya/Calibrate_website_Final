import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Coaching Team",
  description: "Meet the CALIBRATE team, head coach Guhayavarman, certified trainers across Chennai, Bangalore, and Coimbatore, and on-call nutrition specialists. The people behind your protocol.",
  alternates: { canonical: "/coaches" },
  openGraph: {
    ...ogBase,
    url: `${SITE_URL}/coaches`,
    title: "Coaching Team | CALIBRATE by GVNFIT",
    description: "Guhayavarman and the full CALIBRATE coaching team. Certified trainers, nutrition specialists, and a head coach who reviews every application personally.",
  },
};

import Image from "next/image";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Icon from "@/components/shared/Icon";
import Link from "next/link";
import FinalCta from "@/components/landing/FinalCta";
import { Arrow, Check } from "@/components/landing/ui";
import { getTeamMembers } from "@/lib/team";
import { SITE_URL, ogBase } from "@/lib/seo";

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

  return (
    <>
      <Navigation />
      <main id="main">
        <section className="co-open" aria-labelledby="co-title">
          <div className="co-open-media">
            <Image
              src="/media/coach/guhay-090.webp"
              alt={`${headCoach.name}, ${headCoach.role ?? "Head Coach"}`}
              fill
              preload
              sizes="(max-width: 900px) 100vw, 62vw"
              style={{ objectFit: "cover", objectPosition: "50% 30%" }}
            />
            <div className="co-open-shade" aria-hidden="true" />
          </div>
          <div className="wrap co-open-inner">
            <div className="co-open-copy">
              <p className="mono c-accent">{[headCoach.name, headCoach.role ?? "Founder & Head Coach"].join(" · ")}</p>
              <h1 id="co-title" className="co-title">The people behind your protocol.</h1>
              <p className="co-lead">
                A head coach who reviews every application personally, certified trainers across India and on-call specialists for clinical-level nutrition. One team, one method.
              </p>
              <div className="co-open-ctas">
                <Link href="/book" className="btn-primary btn-primary-lg">Book your free call <Arrow /></Link>
                <Link href="/apply" className="btn-secondary btn-primary-lg">Apply</Link>
              </div>
            </div>
          </div>
        </section>

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
        <section className="sec" aria-labelledby="co-head-name">
          <div className="wrap co-head">
            <div className="co-head-id">
              <span className="tag rv">{headCoach.role ?? "Founder & Head Coach"}</span>
              <h2 id="co-head-name" className="display-md co-head-name rv" style={{ ["--d" as string]: "80ms" }}>{headCoach.name}</h2>
              <p className="mono c-muted rv" style={{ ["--d" as string]: "120ms" }}>
                {[headCoach.handle, headCoach.location].filter(Boolean).join(" · ")}
              </p>
            </div>
            <div className="co-copy">
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
                <h2 className="display-lg rv balance" style={{ ["--d" as string]: "80ms" }}>On the floor, on your side.</h2>
              </div>
              <div className="co-grid">
                {trainers.map((t, i) => (
                  <article key={t.id ?? t.name} className="card card-hover co-card rv" style={{ ["--d" as string]: `${(i % 2) * 90}ms` }}>
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
                <h2 className="display-lg rv balance" style={{ ["--d" as string]: "80ms" }}>Clinical depth when you need it.</h2>
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
              <h2 className="display-lg rv balance" style={{ ["--d" as string]: "80ms" }}>Four rules we never break.</h2>
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
        .co-open { position: relative; min-height: min(100svh, 940px); display: flex; align-items: flex-end; isolation: isolate; overflow: hidden; background: #050506; }
        .co-open-media { position: absolute; top: 0; right: 0; bottom: 0; width: 62%; z-index: -1; }
        .co-open-shade { position: absolute; inset: 0; background:
          linear-gradient(90deg, #050506 0%, rgba(5,5,6,0.6) 22%, rgba(5,5,6,0) 52%),
          linear-gradient(0deg, #050506 0%, rgba(5,5,6,0) 32%),
          linear-gradient(180deg, rgba(5,5,6,0.55) 0%, rgba(5,5,6,0) 18%); }
        .co-open-inner { padding-top: 140px; padding-bottom: 88px; }
        .co-open-copy { max-width: 640px; display: flex; flex-direction: column; gap: 22px; align-items: flex-start; }
        .co-title { font-family: var(--font-display); font-weight: 400; text-transform: uppercase; color: #fff; font-size: clamp(48px, 6.4vw, 104px); line-height: 0.92; text-wrap: balance; }
        .co-lead { font-size: clamp(16px, 1.3vw, 18px); line-height: 1.65; color: #D7D9E0; max-width: 520px; text-wrap: pretty; }
        .co-open-ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 4px; }
        .co-head { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: 72px; align-items: start; }
        .co-head-name { overflow-wrap: anywhere; }
        .co-head-id { display: flex; flex-direction: column; gap: 18px; align-items: flex-start; position: sticky; top: 120px; }
        .co-copy { display: flex; flex-direction: column; gap: 18px; align-items: flex-start; }
        .co-creds { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 10px 20px; margin-top: 6px; }
        .co-creds li { display: flex; gap: 10px; align-items: flex-start; font-size: 14px; color: #E4E5EA; line-height: 1.45; }
        .co-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 16px; width: 100%; padding-top: 22px; border-top: 1px solid var(--line); }
        .co-stat-v { font-family: var(--font-display); font-size: clamp(36px, 3.6vw, 54px); line-height: 1; }
        .co-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
        .co-grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .co-card { padding: 30px; display: flex; flex-direction: column; gap: 10px; }
        .co-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
        .co-av { width: 56px; height: 56px; border-radius: 14px; display: grid; place-items: center; font-family: var(--font-display); font-size: 26px; color: #050506; flex-shrink: 0; }
        .co-chip { font-family: var(--font-mono); font-size: 10.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 6px 10px; border-radius: 999px; color: var(--accent); background: rgba(255,222,2,0.08); border: 1px solid rgba(255,222,2,0.25); }
        .co-spec { flex-direction: row; gap: 20px; align-items: flex-start; }
        .co-values { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
        .co-value { padding: 28px; display: flex; flex-direction: column; gap: 12px; }
        .co-v-ico { width: 48px; height: 48px; border-radius: 14px; background: var(--accent); display: grid; place-items: center; margin-bottom: 6px; }
        @media (max-width: 1000px) {
          .co-values { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 900px) {
          .co-head { grid-template-columns: 1fr; gap: 32px; }
          .co-head-id { position: static; }
          .co-open { min-height: 0; display: block; }
          .co-open-media { position: relative; width: 100%; height: 62svh; min-height: 380px; max-height: 560px; }
          .co-open-shade { background: linear-gradient(0deg, #050506 0%, rgba(5,5,6,0.88) 26%, rgba(5,5,6,0) 62%), linear-gradient(180deg, rgba(5,5,6,0.6) 0%, rgba(5,5,6,0) 22%); }
          .co-open-inner { padding-top: 0; padding-bottom: 64px; margin-top: -104px; position: relative; }
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
