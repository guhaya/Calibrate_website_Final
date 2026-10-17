import Link from "next/link";
import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Arrow } from "@/components/landing/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const routes = [
  { href: "/", label: "Home", note: "How CALIBRATE coaching works, start to finish" },
  { href: "/programmes", label: "Programmes", note: "Every goal we coach, online and in person" },
  { href: "/features", label: "The Vemisis app", note: "What you use every day as a client" },
  { href: "/contact", label: "Contact", note: "Email or WhatsApp a coach directly" },
];

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main id="main" className="nf">
        <div className="wrap nf-grid">
          <div>
            <p className="nf-code tnum" aria-hidden="true">404</p>
            <h1 className="nf-title">We couldn&apos;t find that page.</h1>
            <p className="nf-lead">
              The link may be old, or the address may have a typo. These are the pages people usually look for.
            </p>
            <Link href="/book" className="btn-primary nf-cta">
              Book your free call <Arrow />
            </Link>
          </div>
          <ul className="nf-list">
            {routes.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="nf-link">
                  <span className="nf-label">{r.label}</span>
                  <span className="nf-note">{r.note}</span>
                  <span className="nf-arrow" aria-hidden="true"><Arrow size={14} /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />

      <style>{`
        .nf { padding: 168px 0 120px; }
        .nf-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 56px 80px; align-items: end; }
        .nf-code { font-family: var(--font-display); font-size: clamp(120px, 18vw, 240px); line-height: 0.8; color: var(--accent); margin-bottom: 28px; }
        .nf-title { font-family: var(--font-display); font-size: clamp(40px, 4.4vw, 64px); line-height: 0.98; max-width: 14ch; text-wrap: balance; }
        .nf-lead { margin-top: 18px; font-size: 17px; line-height: 1.6; color: var(--text-secondary); max-width: 46ch; }
        .nf-cta { margin-top: 30px; }
        .nf-list { list-style: none; border-top: 1px solid var(--border); }
        .nf-link {
          display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 2px 16px; padding: 20px 4px;
          border-bottom: 1px solid var(--border); color: #fff; text-decoration: none;
          transition: background-color 0.25s var(--ease-out);
        }
        .nf-link:hover { background-color: rgba(255,255,255,0.03); }
        .nf-label { font-weight: 700; font-size: 18px; }
        .nf-note { grid-column: 1; font-size: 14px; color: var(--text-muted); }
        .nf-arrow { grid-column: 2; grid-row: 1 / span 2; align-self: center; color: var(--accent); transition: transform 0.25s var(--ease-out); }
        .nf-link:hover .nf-arrow { transform: translateX(4px); }
        @media (max-width: 860px) {
          .nf { padding: 128px 0 88px; }
          .nf-grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) { .nf-arrow { transition: none; } }
      `}</style>
    </>
  );
}
