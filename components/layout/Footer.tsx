import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";
import FooterWord from "./FooterWord";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Coaching: [
    { label: "The CALIBRATE Method", href: "/how-it-works" },
    { label: "Vemisis App", href: "/features" },
    { label: "Your Experience", href: "/clients" },
    { label: "Pricing", href: "/pricing" },
    { label: "Apply", href: "/apply" },
  ],
  Company: [
    { label: "Meet the Coaches", href: "/coaches" },
    { label: "Results", href: "/success-stories" },
    { label: "Blog", href: "/blog" },
    { label: "Book your free call", href: "/book" },
  ],
  Support: [
    { label: "Contact", href: "/contact" },
    { label: "Help Centre", href: "/support" },
    { label: "FAQ", href: "/contact#faq" },
    { label: "Admin@gvnfit.online", href: "mailto:Admin@gvnfit.online" },
  ],
};

const legal = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
];

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
            <div className="ft-status">
              <span className="status-dot" />
              <span>Currently accepting new clients</span>
            </div>

            <div className="ft-app">
              <Image src="/media/brand/vemisis-app-icon.png" alt="Vemisis app icon" width={52} height={52} className="ft-app-icon" />
              <div>
                <p className="mono c-accent" style={{ marginBottom: 4 }}>The training app</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Vemisis, included with every plan</p>
                <p style={{ fontSize: 12.5, color: "var(--text-muted)" }}>Built for iPhone and Android</p>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="ft-col">
              <p className="mono" style={{ color: "#fff", marginBottom: 20 }}>{category}</p>
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
          <div className="ft-legal">
            {legal.map((item) => (
              <Link key={item.href} href={item.href} className="ft-link" style={{ fontSize: 13 }}>{item.label}</Link>
            ))}
          </div>
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
        .ft-top { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 48px; position: relative; }
        .ft-status { margin-top: 22px; display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text-muted); }
        .ft-app {
          margin-top: 28px; display: flex; align-items: center; gap: 14px;
          padding: 14px 18px 14px 14px; border-radius: 20px;
          background: var(--surface-1); border: 1px solid var(--line);
          max-width: 360px;
        }
        .ft-app-icon { border-radius: 14px; flex-shrink: 0; }
        .ft-col ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .ft-link { color: var(--text-muted); font-size: 14.5px; text-decoration: none; transition: color 0.2s ease; }
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
