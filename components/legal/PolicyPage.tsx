import type { ReactNode } from "react";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import type { PublicPolicy, PolicyType } from "@/lib/policies";

const OTHER_POLICIES: { type: PolicyType; label: string; href: string }[] = [
  { type: "terms", label: "Terms of Service", href: "/terms" },
  { type: "privacy", label: "Privacy Policy", href: "/privacy-policy" },
  { type: "refund", label: "Refund Policy", href: "/refund" },
];

export default function PolicyPage({ policy, policyType, intro }: {
  policy: PublicPolicy;
  policyType: PolicyType;
  intro: string;
}) {
  const lastUpdated = new Date(policy.updatedAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
  const otherLinks = OTHER_POLICIES.filter(p => p.type !== policyType);
  const slugify = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <>
      <Navigation />
      <main>
        <section style={{ padding: "140px 24px 80px", position: "relative" }} className="grid-bg">
          <div
            style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 50% 30%, rgba(255,222,2,0.05) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ maxWidth: "720px", margin: "0 auto", position: "relative" }}>
            <div className="tag" style={{ marginBottom: "24px" }}>Legal</div>
            <h1
              style={{
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 600,
                color: "#FFFFFF",
                marginBottom: "16px",
                letterSpacing: "-0.02em",
              }}
            >
              {policy.title}
            </h1>
            <p style={{ fontSize: "14px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "28px" }}>
              Version {policy.versionNumber} · Last updated: {lastUpdated}
            </p>
            {policy.sections.length > 1 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {policy.sections.map((section, i) => (
                  <a
                    key={i}
                    href={`#${slugify(section.title)}`}
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#B7B9C3",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      textDecoration: "none",
                      padding: "6px 14px",
                      borderRadius: "999px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <section style={{ padding: "40px 24px 120px" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <div
              style={{
                background: "rgba(255,222,2,0.06)",
                border: "1px solid rgba(255,222,2,0.18)",
                borderRadius: "12px",
                padding: "20px 24px",
                marginBottom: "48px",
              }}
            >
              <p style={{ fontSize: "14px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.7 }}>
                {intro}
              </p>
            </div>

            {policy.sections.map((section, i) => (
              <div
                key={i}
                id={slugify(section.title)}
                style={{
                  marginBottom: "40px",
                  paddingBottom: "40px",
                  borderBottom: i < policy.sections.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  scrollMarginTop: "100px",
                }}
              >
                <h2
                  style={{
                    fontSize: "20px",
                    color: "#FFFFFF",
                    marginBottom: "16px",
                    letterSpacing: "-0.01em",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {section.title}
                </h2>
                <div style={{ fontSize: "15px", color: "#B7B9C3", lineHeight: 1.8, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  <PolicyBody content={section.content} />
                </div>
              </div>
            ))}

            <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {otherLinks.map(link => (
                <Link key={link.type} href={link.href} className="btn-secondary" style={{ fontSize: "14px" }}>
                  {link.label} →
                </Link>
              ))}
              <Link href="/contact" className="btn-secondary" style={{ fontSize: "14px" }}>
                Contact Us →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// Coaches write fairly ordinary markdown by hand in the admin editor —
// "### " sub-headings, "---" dividers, "**bold**", "- "/"* " bullets — so
// this renders that common subset line by line rather than requiring a
// stricter format.
function PolicyBody({ content }: { content: string }) {
  const lines = content.split("\n");
  const nodes: ReactNode[] = [];
  let list: string[] = [];

  const flushList = (key: string) => {
    if (list.length) {
      nodes.push(
        <ul key={key} style={{ margin: "0 0 12px", paddingLeft: "12px", listStyle: "none" }}>
          {list.map((item, i) => (
            <li key={i} style={{ marginBottom: "6px" }}>
              - <Inline text={item} />
            </li>
          ))}
        </ul>
      );
      list = [];
    }
  };

  lines.forEach((raw, i) => {
    const line = raw.trim();
    if (!line) { flushList(`ul-${i}`); return; }
    if (line === "---") {
      flushList(`ul-${i}`);
      nodes.push(<hr key={i} style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.08)", margin: "20px 0" }} />);
      return;
    }
    if (line.startsWith("### ")) {
      flushList(`ul-${i}`);
      nodes.push(
        <p key={i} style={{ fontWeight: 700, color: "#FFFFFF", marginTop: "16px", marginBottom: "8px" }}>
          <Inline text={line.slice(4)} />
        </p>
      );
      return;
    }
    if (line.startsWith("- ") || line.startsWith("* ")) { list.push(line.slice(2)); return; }
    flushList(`ul-${i}`);
    nodes.push(<p key={i} style={{ marginBottom: "12px" }}><Inline text={line} /></p>);
  });
  flushList("ul-end");

  return <>{nodes}</>;
}

function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*.+?\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**")
          ? <strong key={i} style={{ color: "#FFFFFF" }}>{part.slice(2, -2)}</strong>
          : <span key={i}>{part}</span>
      )}
    </>
  );
}
