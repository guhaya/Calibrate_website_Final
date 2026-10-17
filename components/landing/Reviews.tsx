import { GOOGLE_RATING, REVIEWS, type Review } from "@/lib/reviews";
import { Arrow, Stars } from "./ui";

// Two rows that drift in opposite directions. Each row is rendered twice so the loop is seamless;
// the second copy is aria-hidden so screen readers hear every review once.
const half = Math.ceil(REVIEWS.length / 2);
const rows: Review[][] = [REVIEWS.slice(0, half), REVIEWS.slice(half)];

function Card({ r }: { r: Review }) {
  return (
    <figure className="rvw-card">
      <Stars n={5} size={13} />
      <blockquote className="rvw-quote">“{r.quote}”</blockquote>
      <figcaption className="rvw-by">
        <span className="rvw-avatar" aria-hidden="true">{r.name.charAt(0)}</span>
        <span className="rvw-who">
          <span className="rvw-name">{r.name}</span>
          <span className="rvw-tag">{r.tag}</span>
        </span>
        <span className="rvw-src">Google review</span>
      </figcaption>
    </figure>
  );
}

export default function Reviews() {
  return (
    <section className="sec rvw" aria-labelledby="rvw-title">
      <div className="wrap rvw-head">
        <div>
          <p className="mono c-accent rv">From the people we coach</p>
          <h2 id="rvw-title" className="display-lg rv" style={{ ["--d" as string]: "60ms" }}>
            Rated {GOOGLE_RATING.score} on Google.
          </h2>
        </div>
        <div className="rvw-score rv" style={{ ["--d" as string]: "120ms" }}>
          <span className="rvw-big">{GOOGLE_RATING.score}</span>
          <span className="rvw-meta">
            <Stars n={5} size={16} />
            <span>
              {GOOGLE_RATING.count} Google reviews of Guhayavarman Fitness, {GOOGLE_RATING.captured}
            </span>
            <a className="rvw-link" href={GOOGLE_RATING.url} target="_blank" rel="noopener noreferrer">
              Read them all on Google <span className="ar"><Arrow size={12} /></span>
            </a>
          </span>
        </div>
      </div>

      <div className="rvw-rows">
        {rows.map((row, i) => (
          <div key={i} className={`rvw-row ${i === 1 ? "is-rev" : ""}`}>
            <div className="rvw-track">
              <div className="rvw-set">
                {row.map((r) => <Card key={r.name} r={r} />)}
              </div>
              <div className="rvw-set" aria-hidden="true">
                {row.map((r) => <Card key={r.name} r={r} />)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="wrap rvw-note">Excerpts from public Google reviews, quoted word for word. Names shortened.</p>

      <style>{`
        .rvw { overflow: hidden; }
        .rvw-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 28px 48px; margin-bottom: 52px; }
        .rvw-head h2 { margin-top: 12px; max-width: 12ch; text-wrap: balance; }
        .rvw-score { display: flex; align-items: center; gap: 18px; }
        .rvw-big { font-family: var(--font-display); font-size: clamp(72px, 8vw, 112px); line-height: 0.85; color: #fff; }
        .rvw-meta { display: flex; flex-direction: column; gap: 6px; font-size: 14px; color: var(--text-secondary); max-width: 240px; }
        .rvw-link { display: inline-flex; align-items: center; gap: 6px; font-weight: 800; color: var(--accent); }
        .rvw-link:hover { text-decoration: underline; text-underline-offset: 3px; }
        .rvw-link:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 4px; }

        .rvw-rows { display: flex; flex-direction: column; gap: 18px;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
                  mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); }
        .rvw-row { overflow: hidden; }
        .rvw-track { display: flex; width: max-content; animation: rvw-slide 90s linear infinite; }
        .rvw-row.is-rev .rvw-track { animation-direction: reverse; animation-duration: 100s; }
        .rvw-rows:hover .rvw-track, .rvw-rows:focus-within .rvw-track { animation-play-state: paused; }
        .rvw-set { display: flex; gap: 18px; padding-right: 18px; }
        @keyframes rvw-slide { to { transform: translateX(-50%); } }

        .rvw-card {
          display: flex; flex-direction: column; gap: 16px; width: 380px; flex: none; margin: 0;
          padding: 26px 26px 22px; border-radius: 24px;
          background: linear-gradient(180deg, #121216 0%, #0C0C0F 100%);
          border: 1px solid var(--border);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .rvw-quote { margin: 0; font-size: 15.5px; line-height: 1.6; color: #E4E5EA; }
        .rvw-by { margin-top: auto; display: flex; align-items: center; gap: 12px; }
        .rvw-avatar { width: 36px; height: 36px; flex: none; border-radius: 50%; display: grid; place-items: center;
          background: var(--accent-dim); border: 1px solid var(--accent-border); color: var(--accent); font-weight: 800; font-size: 14px; }
        .rvw-who { display: flex; flex-direction: column; min-width: 0; }
        .rvw-name { font-weight: 800; font-size: 14.5px; color: #fff; }
        .rvw-tag { font-size: 12.5px; color: var(--text-muted); }
        .rvw-src { margin-left: auto; font-size: 11px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); white-space: nowrap; }
        .rvw-note { margin-top: 18px; font-size: 12.5px; color: var(--text-muted); }

        @media (max-width: 560px) {
          .rvw-card { width: 300px; padding: 22px 20px 18px; }
          .rvw-quote { font-size: 14.5px; }
          .rvw-score { gap: 14px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rvw-track { animation: none; }
          .rvw-row { overflow-x: auto; scroll-snap-type: x mandatory; }
          .rvw-set[aria-hidden="true"] { display: none; }
          .rvw-card { scroll-snap-align: start; }
        }
      `}</style>
    </section>
  );
}
