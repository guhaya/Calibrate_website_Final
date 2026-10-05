import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "./ui";

type Cta = { label: string; href: string; variant?: "primary" | "secondary" };

export default function PageHero({
  eyebrow,
  title,
  lead,
  ctas = [],
  visual,
  align = "center",
  compact = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  ctas?: Cta[];
  visual?: ReactNode;
  align?: "center" | "split";
  compact?: boolean;
}) {
  const split = align === "split" && !!visual;
  return (
    <section className={`ph ${split ? "ph-split" : ""} ${compact ? "ph-compact" : ""}`}>
      <div className="ph-bg grid-lines" aria-hidden="true" />
      <div className="ph-glow" aria-hidden="true" />
      <div className="wrap ph-inner">
        <div className="ph-copy">
          <span className="tag ph-in" style={{ ["--d" as string]: "0ms" }}>{eyebrow}</span>
          <h1 className="ph-title ph-in" style={{ ["--d" as string]: "90ms" }}>{title}</h1>
          {lead && <p className="lead ph-lead ph-in" style={{ ["--d" as string]: "180ms" }}>{lead}</p>}
          {ctas.length > 0 && (
            <div className="ph-ctas ph-in" style={{ ["--d" as string]: "260ms" }}>
              {ctas.map((c) => (
                <Link key={c.href + c.label} href={c.href} className={c.variant === "secondary" ? "btn-secondary btn-primary-lg" : "btn-primary btn-primary-lg"}>
                  {c.label} {c.variant !== "secondary" && <Arrow />}
                </Link>
              ))}
            </div>
          )}
        </div>
        {visual && <div className="ph-visual ph-in" style={{ ["--d" as string]: "200ms" }}>{visual}</div>}
      </div>

      <style>{`
        .ph { position: relative; padding: 168px 0 96px; overflow: hidden; isolation: isolate; }
        .ph-compact { padding-bottom: 56px; }
        .ph-bg { position: absolute; inset: 0; z-index: -2; }
        .ph-glow { position: absolute; z-index: -1; left: 50%; top: 10%; width: 1000px; height: 640px; margin-left: -500px; border-radius: 50%; background: radial-gradient(closest-side, rgba(255,222,2,0.12), transparent); pointer-events: none; }
        .ph-inner { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 56px; }
        .ph-copy { display: flex; flex-direction: column; align-items: center; gap: 24px; max-width: 980px; }
        .ph-title { font-family: var(--font-display); font-size: clamp(48px, 7.2vw, 112px); line-height: 0.92; text-transform: uppercase; text-wrap: balance; }
        .ph-lead { max-width: 660px; text-wrap: pretty; }
        .ph-ctas { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-top: 6px; }
        .ph-in { animation: fade-up 0.9s var(--ease-out) both; animation-delay: var(--d); }
        .ph-visual { width: 100%; display: flex; justify-content: center; }
        .ph-split .ph-inner { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); text-align: left; align-items: center; gap: 48px; }
        .ph-split .ph-copy { align-items: flex-start; }
        .ph-split .ph-ctas { justify-content: flex-start; }
        .ph-split .ph-title { font-size: clamp(46px, 6vw, 96px); }
        @media (max-width: 900px) {
          .ph { padding: 128px 0 64px; }
          .ph-split .ph-inner { grid-template-columns: 1fr; text-align: center; }
          .ph-split .ph-copy { align-items: center; }
          .ph-split .ph-ctas { justify-content: center; }
        }
      `}</style>
    </section>
  );
}
