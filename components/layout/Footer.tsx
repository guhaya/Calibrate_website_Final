import Link from "next/link";
import AppStoreBadge from "@/components/shared/AppStoreBadge";
import Image from "next/image";
import Logo from "./Logo";
import FooterWord from "./FooterWord";
import { POLICIES } from "@/lib/policy-routes";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Coaching: [
    { label: "The CALIBRATE method", href: "/how-it-works" },
    { label: "Programmes", href: "/programmes" },
    { label: "Vemisis app", href: "/features" },
    { label: "Your first 12 weeks", href: "/clients" },
    { label: "Coaches", href: "/coaches" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
  ],
  "Get in touch": [
    { label: "Book your free call", href: "/book" },
    { label: "Apply", href: "/apply" },
    { label: "Contact", href: "/contact" },
    { label: "Help centre", href: "/support" },
    { label: "Admin@gvnfit.online", href: "mailto:Admin@gvnfit.online" },
  ],
};

const legal = POLICIES.map((p) => ({ label: p.navLabel, href: p.path }));

export default function Footer() {
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-top">
          <div className="ft-brand">
            <Logo size={38} />
            <p className="body-sm" style={{ marginTop: 22, maxWidth: 340 }}>
              CALIBRATE is the precision coaching methodology of GVNFIT (Guhayavarman Fitness). Data-driven body
              recomposition, built around your real schedule and delivered day to day through the Vemisis app.
            </p>
            <p className="ft-note">Taking new clients now. Vemisis, the training app, is included with every plan.</p>
            <div className="ft-app">
              <Image src="/media/brand/vemisis-app-icon.png" alt="Vemisis app icon" width={40} height={40} className="ft-app-icon" />
              <AppStoreBadge size="sm" />
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="ft-col">
              <p className="ft-cat">{category}</p>
              <ul>
                {links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("mailto:") ? (
                      <a href={link.href} className="ft-link">{link.label}</a>
                    ) : (
                      <Link href={link.href} className="ft-link">{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <FooterWord />

        <div className="ft-bottom">
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <Image src="/media/brand/gvnfit-wordmark-white.png" alt="Guhayavarman Fitness" width={150} height={19} style={{ opacity: 0.7, height: "auto" }} />
            <span className="c-muted" style={{ fontSize: 13 }}>
              © {new Date().getFullYear()} GVNFIT. CALIBRATE and Vemisis are part of Guhayavarman Fitness.
            </span>
          </div>
          <nav aria-label="Legal" className="ft-legal">
            {legal.map((item) => (
              <Link key={item.href} href={item.href} className="ft-link" style={{ fontSize: 13 }}>{item.label}</Link>
            ))}
          </nav>
        </div>
      </div>

      <style>{`
        .ft {
          position: relative;
          padding: 96px 0 36px;
          background: #08080A;
          border-top: 1px solid var(--line);
          overflow: hidden;
        }
        .ft::before {
          content: ''; position: absolute; left: 50%; top: -260px; transform: translateX(-50%);
          width: 900px; height: 420px; border-radius: 50%;
          background: radial-gradient(closest-side, rgba(255,222,2,0.10), transparent);
          pointer-events: none;
        }
        .ft-top { display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr) minmax(0, 1fr); gap: 48px 64px; position: relative; }
        .ft-note { margin-top: 14px; font-size: 14px; line-height: 1.6; color: var(--text-secondary); max-width: 340px; }
        .ft-app { margin-top: 22px; display: flex; align-items: center; gap: 12px; }
        .ft-app-icon { border-radius: 11px; flex-shrink: 0; }
        .ft-cat { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 18px; }
        .ft-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .ft-link { display: inline-block; padding: 4px 0; min-height: 24px; color: var(--text-muted); font-size: 14.5px; text-decoration: none; transition: color 0.2s ease; }
        .ft-link:hover { color: var(--accent); }
        .ft-bottom {
          display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
          padding-top: 24px; border-top: 1px solid var(--line);
        }
        .ft-legal { display: flex; gap: 24px; flex-wrap: wrap; }
        @media (max-width: 960px) {
          .ft-top { grid-template-columns: 1fr 1fr; }
          .ft-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 520px) {
          .ft { padding-top: 72px; }
          .ft-top { gap: 36px 24px; }
        }
      `}</style>
    </footer>
  );
}
