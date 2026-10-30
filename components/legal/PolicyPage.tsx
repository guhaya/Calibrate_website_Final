import type { ReactNode } from "react";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { POLICIES, getPolicyInfo, type PublicPolicy, type PolicyType } from "@/lib/policies";

const PLACEHOLDER = /\[[^\]]+\]/;

// Anchor IDs come from the heading text without its number, so linking to
// "#data-retention" keeps working if sections are renumbered.
function makeSlugger() {
  const seen = new Map<string, number>();
  return (title: string) => {
    const base = title
      .replace(/^\d+(\.\d+)*\.?\s+/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "section";
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return n ? `${base}-${n + 1}` : base;
  };
}

export default function PolicyPage({ policy, policyType }: {
  policy: PublicPolicy;
  policyType: PolicyType;
}) {
  const info = getPolicyInfo(policyType);
  const slug = makeSlugger();
  const sections = policy.sections.map((s) => ({ ...s, id: slug(s.title) }));
  const lastUpdated = policy.lastUpdated ?? new Date(policy.updatedAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
  const hasPlaceholders =
    [policy.effectiveDate ?? "", policy.lastUpdated ?? ""].some((d) => PLACEHOLDER.test(d)) ||
    sections.some((s) => PLACEHOLDER.test(s.content));
  const related = POLICIES.filter((p) => p.type !== policyType);

  const toc = (
    <ol className="pg-toc-list">
      {sections.map((s) => (
        <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
      ))}
    </ol>
  );

  return (
    <>
      <Navigation />
      <main id="main">
        <section className="grid-bg pg-hero">
          <div
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 50% 30%, rgba(255,222,2,0.05) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
          {/* z-index keeps the content above .grid-bg's bottom fade overlay. */}
          <div className="pg-wrap" style={{ position: "relative", zIndex: 1 }}>
            <nav aria-label="Breadcrumb" className="pg-crumbs">
              <ol>
                <li><Link href="/">Home</Link></li>
                <li aria-current="page">{info.heading}</li>
              </ol>
            </nav>

            <h1 className="pg-h1">{info.heading}</h1>
            <p className="pg-intro">{info.intro}</p>

            <dl className="pg-dates">
              <div><dt>Effective date</dt><dd><Inline text={policy.effectiveDate ?? "[Not stated]"} /></dd></div>
              <div><dt>Last updated</dt><dd><Inline text={lastUpdated} /></dd></div>
              {policy.versionNumber > 0 && <div><dt>Version</dt><dd>{policy.versionNumber}</dd></div>}
            </dl>

            {policy.isDraftPreview && (
              <p className="pg-note">
                Draft preview: this page is showing the local review text from docs/policies, not the published version.
              </p>
            )}
            {hasPlaceholders && (
              <p className="pg-note">
                Details shown <mark className="pg-ph">in brackets like this</mark> are not yet confirmed and must be completed before this policy is relied on.
              </p>
            )}

            <nav aria-label="Policies" className="pg-policies">
              <ul>
                {POLICIES.map((p) => (
                  <li key={p.type}>
                    <Link
                      href={p.path}
                      aria-current={p.type === policyType ? "page" : undefined}
                      className={p.type === policyType ? "is-active" : undefined}
                    >
                      {p.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        <div className="pg-wrap pg-layout">
          {sections.length > 1 && (
            <aside className="pg-toc-desk">
              <nav aria-label="On this page">
                <p className="pg-toc-title">On this page</p>
                {toc}
              </nav>
            </aside>
          )}

          <div className="pg-body">
            {sections.length > 1 && (
              <details className="pg-toc-mob">
                <summary>On this page <span className="c-muted">({sections.length} sections)</span></summary>
                <nav aria-label="On this page">{toc}</nav>
              </details>
            )}

            {sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id} className="pg-section">
                <h2 id={section.id} className="pg-h2">{section.title}</h2>
                <PolicyBody content={section.content} slug={slug} />
              </section>
            ))}

            <nav aria-label="Related policies" className="pg-related">
              <p className="pg-toc-title">Related policies</p>
              <ul>
                {related.map((p) => (
                  <li key={p.type}><Link href={p.path} className="btn-secondary">{p.heading}</Link></li>
                ))}
                <li><Link href="/contact" className="btn-secondary">Contact GVNFIT</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .pg-hero { padding: 152px 24px 56px; position: relative; }
        .pg-wrap { max-width: 1104px; margin: 0 auto; }
        .pg-crumbs ol { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; font-size: 14px; color: var(--text-muted); margin-bottom: 20px; }
        .pg-crumbs li + li::before { content: "/"; margin-right: 8px; color: var(--text-muted); }
        .pg-crumbs a { display: inline-block; padding: 4px 0; color: var(--text-secondary); text-decoration: none; }
        .pg-crumbs a:hover { color: var(--accent); }
        .pg-crumbs [aria-current] { color: var(--text-primary); }
        .pg-h1 { font-size: clamp(40px, 6vw, 76px); color: #fff; letter-spacing: -0.01em; max-width: 900px; margin-bottom: 20px; overflow-wrap: anywhere; }
        .pg-intro { max-width: 680px; font-size: 17px; color: var(--text-secondary); margin-bottom: 24px; }
        .pg-dates { display: flex; flex-wrap: wrap; gap: 8px 28px; font-size: 14px; margin-bottom: 20px; }
        .pg-dates div { display: flex; gap: 8px; flex-wrap: wrap; }
        .pg-dates dt { color: var(--text-muted); }
        .pg-dates dd { color: var(--text-primary); font-weight: 600; }
        .pg-note { max-width: 680px; font-size: 14px; color: var(--text-secondary); margin-bottom: 16px; }
        .pg-ph { background: rgba(255,222,2,0.12); color: #fff; border: 1px dashed var(--accent-border); border-radius: 4px; padding: 0 4px; }
        .pg-policies ul { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
        .pg-policies a {
          display: inline-flex; align-items: center; min-height: 44px; padding: 0 18px;
          border-radius: 999px; border: 1px solid var(--line-strong);
          color: var(--text-secondary); font-size: 14px; font-weight: 600; text-decoration: none;
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .pg-policies a:hover { color: #fff; border-color: rgba(255,255,255,0.32); }
        .pg-policies a.is-active { background: var(--accent); border-color: var(--accent); color: #050506; }

        .pg-layout { display: grid; grid-template-columns: 240px minmax(0, 720px); gap: 64px; padding: 48px 24px 112px; }
        .pg-toc-desk nav { position: sticky; top: 112px; max-height: calc(100vh - 136px); overflow-y: auto; padding-right: 8px; }
        .pg-toc-title { font-size: 13px; font-weight: 700; color: #fff; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 12px; }
        .pg-toc-list { list-style: none; display: flex; flex-direction: column; gap: 2px; }
        .pg-toc-list a {
          display: block; padding: 6px 10px; border-radius: 8px; min-height: 32px;
          font-size: 14px; line-height: 1.4; color: var(--text-muted); text-decoration: none;
        }
        .pg-toc-list a:hover { color: #fff; background: rgba(255,255,255,0.05); }
        .pg-toc-mob { display: none; margin-bottom: 40px; border: 1px solid var(--line-strong); border-radius: 12px; background: var(--surface-1); }
        .pg-toc-mob summary { cursor: pointer; min-height: 48px; display: flex; align-items: center; gap: 6px; padding: 0 16px; font-weight: 700; font-size: 15px; color: #fff; }
        .pg-toc-mob nav { padding: 0 6px 12px; }

        .pg-section { padding-bottom: 36px; margin-bottom: 36px; border-bottom: 1px solid var(--line); }
        .pg-section:last-of-type { border-bottom: none; }
        .pg-section [id] { scroll-margin-top: 112px; }
        .pg-h2 { scroll-margin-top: 112px; font-family: var(--font-body); text-transform: none; font-weight: 700; font-size: 22px; line-height: 1.3; letter-spacing: -0.01em; color: #fff; margin-bottom: 16px; }
        .pg-h3 { font-size: 17px; line-height: 1.4; color: #fff; margin: 24px 0 8px; }
        .pg-text { font-size: 16px; line-height: 1.75; color: var(--text-secondary); overflow-wrap: anywhere; }
        .pg-text p { margin-bottom: 14px; }
        .pg-text ul { margin: 0 0 14px; padding-left: 22px; list-style: disc; }
        .pg-text li { margin-bottom: 6px; }
        .pg-text li::marker { color: var(--accent); }
        .pg-text strong { color: #fff; font-weight: 600; }
        .pg-text a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }
        .pg-text hr { border: none; border-top: 1px solid var(--line); margin: 20px 0; }
        .pg-related ul { list-style: none; display: flex; flex-wrap: wrap; gap: 12px; }
        .pg-related .btn-secondary { white-space: normal; text-align: center; max-width: 100%; }
        .pg-related { margin-top: 16px; padding-top: 32px; border-top: 1px solid var(--line); }

        @media (max-width: 1023px) {
          .pg-layout { grid-template-columns: minmax(0, 1fr); gap: 0; padding-top: 32px; max-width: 768px; }
          .pg-toc-desk { display: none; }
          .pg-toc-mob { display: block; }
        }
        @media (max-width: 520px) {
          .pg-hero { padding: 120px 16px 40px; }
          .pg-layout { padding-left: 16px; padding-right: 16px; }
          .pg-intro { font-size: 16px; }
          .pg-h2 { font-size: 20px; }
          .pg-related .btn-secondary { width: 100%; justify-content: center; }
          .pg-related li { flex: 1 1 100%; }
        }
      `}</style>
    </>
  );
}

// Coaches write fairly ordinary markdown by hand in the admin editor:
// "### " sub-headings, "---" dividers, "**bold**", "- "/"* " bullets, so
// this renders that common subset line by line rather than requiring a
// stricter format. Text is rendered as React text nodes, never as HTML.
function PolicyBody({ content, slug }: { content: string; slug: (title: string) => string }) {
  const lines = content.split("\n");
  const nodes: ReactNode[] = [];
  let list: string[] = [];

  const flushList = (key: string) => {
    if (list.length) {
      nodes.push(
        <ul key={key}>
          {list.map((item, i) => <li key={i}><Inline text={item} /></li>)}
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
      nodes.push(<hr key={i} />);
      return;
    }
    if (line.startsWith("### ")) {
      flushList(`ul-${i}`);
      const text = line.slice(4);
      nodes.push(<h3 key={i} id={slug(text)} className="pg-h3"><Inline text={text} /></h3>);
      return;
    }
    if (line.startsWith("- ") || line.startsWith("* ")) { list.push(line.slice(2)); return; }
    flushList(`ul-${i}`);
    nodes.push(<p key={i}><Inline text={line} /></p>);
  });
  flushList("ul-end");

  return <div className="pg-text">{nodes}</div>;
}

// **bold**, [unconfirmed placeholder], web addresses, email addresses and
// Indian phone numbers. Everything else stays plain text.
const TOKEN = /(\*\*.+?\*\*|\[[^\]]+\]|https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.-]*\w|\+91 \d{5} \d{5})/g;

function Inline({ text }: { text: string }) {
  const parts = text.split(TOKEN);
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
        if (part.startsWith("[") && part.endsWith("]")) return <mark key={i} className="pg-ph">{part}</mark>;
        if (/^https?:\/\//.test(part)) return <a key={i} href={part}>{part.replace(/^https?:\/\//, "")}</a>;
        if (/^[\w.+-]+@/.test(part)) return <a key={i} href={`mailto:${part}`}>{part}</a>;
        if (part.startsWith("+91 ")) return <a key={i} href={`tel:${part.replace(/\s/g, "")}`}>{part}</a>;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
