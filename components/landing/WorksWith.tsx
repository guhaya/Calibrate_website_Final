import { Activity, CircleDot, Heart, Watch } from "lucide-react";

// Only integrations Vemisis actually supports (see AppSection "sync" tile).
const items = [
  { name: "Apple Health", Icon: Heart },
  { name: "Apple Watch", Icon: Watch },
  { name: "Oura", Icon: CircleDot },
  { name: "Health Connect", Icon: Activity },
];

export default function WorksWith() {
  return (
    <section className="ww" aria-label="Vemisis works with">
      <div className="wrap ww-inner">
        <p className="ww-label mono">Works with</p>
        <ul className="ww-list">
          {items.map(({ name, Icon }) => (
            <li key={name}>
              <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
      <style>{`
        .ww { padding: 36px 0 28px; }
        .ww-inner { display: flex; flex-direction: column; align-items: center; gap: 16px; }
        .ww-label { font-size: 12px; letter-spacing: 0.18em; color: var(--text-muted); }
        .ww-list { list-style: none; display: flex; flex-wrap: wrap; justify-content: center; gap: 12px 44px; }
        .ww-list li { display: inline-flex; align-items: center; gap: 10px; font-size: 17px; font-weight: 700; color: #E6E7EC; letter-spacing: -0.01em; opacity: 0.85; }
        .ww-list li svg { color: #fff; }
        @media (max-width: 560px) { .ww-list { gap: 12px 26px; } .ww-list li { font-size: 15px; } }
      `}</style>
    </section>
  );
}
