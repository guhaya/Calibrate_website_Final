"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import PageHero from "@/components/landing/PageHero";
import Footer from "@/components/layout/Footer";
import { Arrow } from "@/components/landing/ui";

const categories = ["All", "Nutrition", "Training", "Mindset", "Lifestyle"];

// Articles are not published yet. Each one is shown as "Coming soon" and is not a link.
const posts = [
  {
    category: "Nutrition",
    title: "Why tracking macros changed everything (and how to start without going crazy)",
    excerpt: "Most people overcomplicate nutrition. This is a practical guide to macro tracking that actually fits your life, no weighing every leaf of lettuce required.",
    readTime: "7 min read",
    featured: true,
  },
  {
    category: "Training",
    title: "Progressive overload: the simplest principle most people completely ignore",
    excerpt: "If your workouts look the same as they did six months ago, you've stopped making progress. Here's why progressive overload is non-negotiable, and how to apply it.",
    readTime: "6 min read",
    featured: true,
  },
  {
    category: "Mindset",
    title: "The real reason you keep starting over (and how to finally break the cycle)",
    excerpt: "It's not willpower. It's not motivation. The reason most people restart the same programme every January comes down to one thing, and it's fixable.",
    readTime: "8 min read",
    featured: false,
  },
  {
    category: "Nutrition",
    title: "Eating out without destroying your progress: a complete guide",
    excerpt: "Restaurants don't have to be the enemy. Here's how to eat out socially, enjoy your food, and still hit your physique goals, week after week.",
    readTime: "5 min read",
    featured: false,
  },
  {
    category: "Lifestyle",
    title: "How to stay on track when you're travelling for work",
    excerpt: "Hotel gyms, business dinners, disrupted routines, travel is one of the most common reasons people stall. Here's the system that keeps CALIBRATE clients on track regardless.",
    readTime: "6 min read",
    featured: false,
  },
  {
    category: "Training",
    title: "Home gym vs commercial gym: which gets you better results?",
    excerpt: "The honest answer might surprise you. The best gym is the one you consistently show up to, but there are real differences in what each enables.",
    readTime: "5 min read",
    featured: false,
  },
  {
    category: "Mindset",
    title: "What accountability actually looks like in coaching (and why it works)",
    excerpt: "Accountability isn't someone screaming at you to work harder. Here's what real coaching accountability looks like, and the data on why it drives results.",
    readTime: "7 min read",
    featured: false,
  },
];

export default function BlogClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);
  const featured = filteredPosts.filter((p) => p.featured);
  const rest = filteredPosts.filter((p) => !p.featured);

  return (
    <>
      <Navigation />
      <main id="main">
        <PageHero
          compact
          eyebrow="Blog"
          title={<>Training and nutrition, explained by coaches.</>}
          lead="Practical guidance on training, nutrition, mindset and building the body you want, written by coaches, not content marketers. The first articles are being written now."
        />

        <section className="bl" aria-label="Upcoming articles">
          <div className="wrap">
            <div className="bl-bar">
              <div className="bl-chips" role="group" aria-label="Filter articles by category">
                {categories.map((cat) => {
                  const active = cat === activeCategory;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      aria-pressed={active}
                      className={active ? "bl-chip is-active" : "bl-chip"}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
              <p className="mono c-muted bl-count" aria-live="polite">
                {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"} in progress
              </p>
            </div>

            {featured.length > 0 && (
              <div className={featured.length > 1 ? "bl-featured" : "bl-featured is-single"}>
                {featured.map((post) => (
                  <article key={post.title} className="bl-card">
                    <div className="bl-meta">
                      <span className="mono c-muted">{post.category}</span>
                      <span className="bl-soon mono">Coming soon</span>
                    </div>
                    <h2 className="bl-card-title">{post.title}</h2>
                    <p className="body-sm">{post.excerpt}</p>
                    <p className="mono c-muted bl-read">{post.readTime}</p>
                  </article>
                ))}
              </div>
            )}

            {rest.length > 0 && (
              <ul className="bl-list">
                {rest.map((post) => (
                  <li key={post.title} className="bl-row">
                    <article className="bl-row-inner">
                      <p className="mono c-muted bl-row-cat">{post.category}</p>
                      <div className="bl-row-main">
                        <h3 className="bl-row-title">{post.title}</h3>
                        <p className="body-sm">{post.excerpt}</p>
                      </div>
                      <div className="bl-row-side">
                        <span className="bl-soon mono">Coming soon</span>
                        <span className="mono c-muted">{post.readTime}</span>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="sec-tight">
          <div className="wrap">
            <div className="panel bl-follow rv">
              <div className="bl-follow-copy">
                <h2 className="display-md">
                  Training and nutrition insights. <span className="c-accent">Every week.</span>
                </h2>
                <p className="lead">
                  Articles are on the way. Until then, follow along on Instagram for daily training and nutrition tips, or book a free call to talk through your goals.
                </p>
              </div>
              <div className="bl-follow-actions">
                <a href="https://instagram.com/fitguhay" target="_blank" rel="noopener noreferrer" className="btn-primary btn-primary-lg">
                  Follow @fitguhay <Arrow />
                </a>
                <Link href="/book" className="btn-secondary btn-primary-lg">
                  Book your free call
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .bl { padding: 8px 0 24px; }
        .bl-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px 24px; padding-bottom: 28px; margin-bottom: 32px; border-bottom: 1px solid var(--line); }
        .bl-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .bl-chip {
          display: inline-flex; align-items: center; min-height: 44px; padding: 0 20px;
          border-radius: 999px; border: 1px solid var(--border-strong); background: transparent;
          font-family: var(--font-body); font-size: 14px; font-weight: 700; color: var(--text-secondary);
          cursor: pointer; transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        }
        .bl-chip:hover { color: #fff; border-color: rgba(255,255,255,0.3); }
        .bl-chip.is-active { background: var(--accent); border-color: var(--accent); color: #050506; }
        .bl-chip:focus-visible { border-radius: 999px; }
        .bl-count { margin: 0; }

        .bl-soon { display: inline-flex; align-items: center; padding: 6px 10px; border-radius: 999px; color: var(--accent); background: rgba(255,222,2,0.08); border: 1px solid rgba(255,222,2,0.25); font-size: 10.5px; white-space: nowrap; }

        .bl-featured { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: 16px; margin-bottom: 48px; }
        .bl-featured.is-single { grid-template-columns: minmax(0, 1fr); }
        .bl-card { display: flex; flex-direction: column; gap: 16px; padding: 36px; border-radius: 24px; background: var(--surface-1); border: 1px solid var(--line); }
        .bl-featured .bl-card:first-child { background: radial-gradient(90% 120% at 100% 0%, rgba(255,222,2,0.09), var(--surface-1) 60%); }
        .bl-meta { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .bl-card-title { font-size: clamp(26px, 2.4vw, 36px); line-height: 1; text-wrap: balance; }
        .bl-card .body-sm { max-width: 560px; }
        .bl-read { margin-top: auto; padding-top: 8px; }

        .bl-list { list-style: none; border-top: 1px solid var(--line-strong); }
        .bl-row { border-bottom: 1px solid var(--line); }
        .bl-row-inner { display: grid; grid-template-columns: 160px minmax(0, 1fr) auto; gap: 12px 40px; padding: 28px 0; align-items: start; }
        .bl-row-cat { padding-top: 6px; }
        .bl-row-main { display: flex; flex-direction: column; gap: 8px; max-width: 720px; }
        .bl-row-title { font-size: clamp(20px, 1.7vw, 24px); line-height: 1.08; text-wrap: balance; }
        .bl-row-side { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }

        .panel.bl-follow { border-radius: 24px; padding: 56px; display: grid; grid-template-columns: minmax(0, 1.3fr) auto; gap: 32px 56px; align-items: end; background: radial-gradient(80% 120% at 100% 0%, rgba(255,222,2,0.12), var(--surface-1) 60%); }
        .bl-follow-copy { display: flex; flex-direction: column; gap: 18px; max-width: 640px; }
        .bl-follow-actions { display: flex; flex-wrap: wrap; gap: 12px; }

        @media (max-width: 900px) {
          .bl-featured { grid-template-columns: minmax(0, 1fr); }
          .bl-row-inner { grid-template-columns: minmax(0, 1fr); gap: 10px; }
          .bl-row-cat { padding-top: 0; }
          .bl-row-side { flex-direction: row; align-items: center; justify-content: flex-start; gap: 14px; }
          .panel.bl-follow { grid-template-columns: 1fr; align-items: start; }
        }
        @media (max-width: 640px) {
          .bl-card { padding: 26px 22px; }
          .panel.bl-follow { padding: 36px 24px; }
          .bl-follow-actions { flex-direction: column; align-items: stretch; }
        }
      `}</style>
    </>
  );
}
