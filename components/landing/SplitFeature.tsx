import { Check, Device } from "./ui";

export type SplitFeatureProps = {
  id: string;
  title: string;
  body: string;
  points: string[];
  shot: { src: string; alt: string };
  flip?: boolean;
};

// Wide section: a big headline on one side, a real app screen on the other. Alternate with `flip`.
export default function SplitFeature({ id, title, body, points, shot, flip = false }: SplitFeatureProps) {
  return (
    <section id={id} className={`sec sf ${flip ? "sf-flip" : ""}`} aria-labelledby={`${id}-title`}>
      <div className="wrap sf-grid">
        <div className="sf-copy">
          <h2 id={`${id}-title`} className="display-lg rv" style={{ ["--d" as string]: "60ms" }}>{title}</h2>
          <p className="lead rv" style={{ ["--d" as string]: "120ms" }}>{body}</p>
          <ul className="sf-points">
            {points.map((p, i) => (
              <li key={p} className="rv" style={{ ["--d" as string]: `${180 + i * 60}ms` }}>
                <Check size={16} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="sf-visual rv rv-scale" style={{ ["--d" as string]: "100ms" }}>
          <div className="sf-glow" aria-hidden="true" />
          <Device src={shot.src} alt={shot.alt} width={290} sizes="(max-width: 560px) 240px, 290px" className="sf-device" />
        </div>
      </div>

      <style>{`
        .sf-grid { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: 48px 72px; align-items: center; }
        .sf-flip .sf-copy { order: 2; }
        .sf-copy h2 { margin: 14px 0 20px; max-width: 12ch; text-wrap: balance; }
        .sf-copy .lead { max-width: 520px; }
        .sf-points { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-top: 28px; }
        .sf-points li { display: flex; gap: 12px; align-items: flex-start; font-size: 15.5px; color: #E4E5EA; line-height: 1.5; }
        .sf-points li svg { flex: none; margin-top: 3px; }
        .sf-visual { position: relative; display: grid; place-items: center; padding: 24px 0; }
        .sf-glow { position: absolute; width: 80%; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(closest-side, rgba(255,222,2,0.18), transparent); filter: blur(12px); }
        .sf-device { position: relative; }
        @media (max-width: 900px) {
          .sf-grid { grid-template-columns: 1fr; }
          .sf-flip .sf-copy { order: 0; }
        }
        @media (max-width: 560px) {
          .sf-device { width: 240px !important; }
        }
      `}</style>
    </section>
  );
}
