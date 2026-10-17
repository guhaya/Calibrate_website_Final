import { Check, Device } from "./ui";

// Sample values only, for illustration. The app reads each marker from the uploaded report and
// compares it to the range printed on that report (low / normal / high).
const markers = [
  { name: "Vitamin D", value: "18", unit: "ng/mL", flag: "Low" },
  { name: "HbA1c", value: "5.3", unit: "%", flag: "Normal" },
  { name: "Ferritin", value: "42", unit: "ng/mL", flag: "Normal" },
  { name: "LDL", value: "142", unit: "mg/dL", flag: "High" },
  { name: "TSH", value: "2.1", unit: "mIU/L", flag: "Normal" },
  { name: "Haemoglobin", value: "14.6", unit: "g/dL", flag: "Normal" },
];

const points = [
  "Add a blood test as a photo or file",
  "Each marker is shown against the range printed on your report",
  "Your coach reviews it alongside your training and recovery",
];

export default function LabsOrbit() {
  return (
    <section className="sec lo" aria-labelledby="lo-title">
      <div className="wrap lo-grid">
        <div className="lo-copy">
          <h2 id="lo-title" className="display-lg rv" style={{ ["--d" as string]: "60ms" }}>
            Blood tests belong in your plan too.
          </h2>
          <p className="lead rv" style={{ ["--d" as string]: "120ms" }}>
            Bring your latest blood test into Vemisis. The numbers sit next to your daily data, so your coach plans with the full picture.
          </p>
          <ul className="lo-points">
            {points.map((p, i) => (
              <li key={p} className="rv" style={{ ["--d" as string]: `${180 + i * 60}ms` }}>
                <Check size={16} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="lo-sample">Marker values shown are samples.</p>
        </div>

        <div className="lo-stage" aria-hidden="true">
          <div className="lo-glow" />
          <div className="lo-track lo-track-a" />
          <div className="lo-track lo-track-b" />
          <Device src="/media/app/vitals.webp" alt="" width={240} sizes="240px" className="lo-device" />
          <div className="lo-ring">
            {markers.map((m, i) => (
              <div key={m.name} className="lo-slot" style={{ ["--a" as string]: `${(360 / markers.length) * i}deg` }}>
                <div className="lo-chip">
                  <span className="lo-name">{m.name}</span>
                  <span className="lo-val">
                    {m.value} <small>{m.unit}</small>
                  </span>
                  <span className={`lo-flag is-${m.flag.toLowerCase()}`}>{m.flag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .lo { overflow: hidden; }
        .lo-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); gap: 48px 64px; align-items: center; }
        .lo-copy h2 { margin: 14px 0 20px; text-wrap: balance; }
        .lo-copy .lead { max-width: 500px; }
        .lo-points { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-top: 28px; }
        .lo-points li { display: flex; gap: 12px; align-items: flex-start; font-size: 15.5px; color: #E4E5EA; line-height: 1.5; }
        .lo-points li svg { flex: none; margin-top: 3px; color: var(--accent); }
        .lo-sample { margin-top: 22px; font-size: 12.5px; color: var(--text-muted); }

        .lo-stage { container-type: inline-size; position: relative; height: 640px; display: grid; place-items: center; }
        .lo-stage > * { --r: min(270px, calc(50cqi - 86px)); }
        .lo-glow { position: absolute; width: 70%; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(closest-side, rgba(255,222,2,0.16), transparent); filter: blur(10px); }
        .lo-track { position: absolute; border-radius: 50%; border: 1px dashed rgba(255,255,255,0.10); }
        .lo-track-a { width: calc(var(--r) * 2); height: calc(var(--r) * 2); }
        .lo-track-b { width: calc(var(--r) * 1.5); height: calc(var(--r) * 1.5); border-style: solid; border-color: rgba(255,255,255,0.05); }
        .lo-device { position: relative; z-index: 1; width: min(220px, 31cqi) !important; }

        .lo-ring { position: absolute; inset: 0; z-index: 2; animation: lo-spin 70s linear infinite; }
        .lo-slot { position: absolute; left: 50%; top: 50%; width: 0; height: 0; transform: rotate(var(--a)) translateX(var(--r)) rotate(calc(-1 * var(--a))); }
        .lo-chip {
          position: absolute; left: 0; top: 0; translate: -50% -50%;
          display: grid; grid-template-columns: auto auto; gap: 2px 12px; align-items: center; min-width: 156px;
          padding: 12px 14px; border-radius: 16px;
          background: rgba(18,18,22,0.82); border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 20px 40px -16px rgba(0,0,0,0.75);
          animation: lo-spin 70s linear infinite reverse;
        }
        .lo-name { grid-column: 1 / -1; font-size: 11px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); }
        .lo-val { font-family: var(--font-display); font-size: 24px; line-height: 1.05; color: #fff; white-space: nowrap; }
        .lo-val small { font-family: var(--font-body, inherit); font-size: 11px; font-weight: 700; color: var(--text-secondary); }
        .lo-flag { justify-self: end; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 999px; }
        .lo-flag.is-normal { color: #22C55E; background: rgba(34,197,94,0.12); }
        .lo-flag.is-low, .lo-flag.is-high { color: var(--accent); background: var(--accent-dim); }
        @keyframes lo-spin { to { transform: rotate(360deg); } }

        @media (max-width: 960px) {
          .lo-grid { grid-template-columns: 1fr; }
          .lo-stage { height: 560px; }
        }
        @media (max-width: 560px) {
          .lo-stage { height: auto; display: flex; flex-direction: column; align-items: center; gap: 28px; padding-top: 8px; }
          .lo-track { display: none; }
          .lo-glow { top: 0; width: 90%; }
          .lo-device { width: 210px !important; }
          .lo-ring { position: relative; inset: auto; width: 100%; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; animation: none; }
          .lo-slot { position: static; width: auto; height: auto; transform: none; }
          .lo-chip { position: static; translate: none; animation: none; min-width: 0; width: 100%; padding: 12px 12px; }
          .lo-val { font-size: 21px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lo-ring, .lo-chip { animation: none; }
        }
      `}</style>
    </section>
  );
}
