"use client";

import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const categories = ["All", "Nutrition", "Training", "Mindset", "Transformation Stories", "Lifestyle"];

const posts = [
  {
    category: "Nutrition",
    title: "Why Tracking Macros Changed Everything (And How to Start Without Going Crazy)",
    excerpt: "Most people overcomplicate nutrition. This is a practical guide to macro tracking that actually fits your life, no weighing every leaf of lettuce required.",
    readTime: "7 min read",
    date: "Jun 14, 2026",
    featured: true,
    color: "#FFDE02",
  },
  {
    category: "Transformation Stories",
    title: "Marcus Lost 14kg in 14 Weeks. Here's Exactly What We Did.",
    excerpt: "No crash diet. No two-a-day workouts. A structured plan, consistent check-ins, and a few key adjustments that made all the difference.",
    readTime: "9 min read",
    date: "Jun 7, 2026",
    featured: true,
    color: "#22C55E",
  },
  {
    category: "Training",
    title: "Progressive Overload: The Simplest Principle Most People Completely Ignore",
    excerpt: "If your workouts look the same as they did six months ago, you've stopped making progress. Here's why progressive overload is non-negotiable, and how to apply it.",
    readTime: "6 min read",
    date: "May 30, 2026",
    featured: false,
    color: "#3B82F6",
  },
  {
    category: "Mindset",
    title: "The Real Reason You Keep Starting Over (And How to Finally Break the Cycle)",
    excerpt: "It's not willpower. It's not motivation. The reason most people restart the same programme every January comes down to one thing, and it's fixable.",
    readTime: "8 min read",
    date: "May 22, 2026",
    featured: false,
    color: "#A855F7",
  },
  {
    category: "Nutrition",
    title: "Eating Out Without Destroying Your Progress: A Complete Guide",
    excerpt: "Restaurants don't have to be the enemy. Here's how to eat out socially, enjoy your food, and still hit your physique goals, week after week.",
    readTime: "5 min read",
    date: "May 14, 2026",
    featured: false,
    color: "#FFDE02",
  },
  {
    category: "Lifestyle",
    title: "How to Stay On Track When You're Travelling for Work",
    excerpt: "Hotel gyms, business dinners, disrupted routines, travel is one of the most common reasons people stall. Here's the system that keeps CALIBRATE clients on track regardless.",
    readTime: "6 min read",
    date: "May 6, 2026",
    featured: false,
    color: "#F59E0B",
  },
  {
    category: "Training",
    title: "Home Gym vs Commercial Gym: Which Gets You Better Results?",
    excerpt: "The honest answer might surprise you. The best gym is the one you consistently show up to, but there are real differences in what each enables.",
    readTime: "5 min read",
    date: "Apr 28, 2026",
    featured: false,
    color: "#22C55E",
  },
  {
    category: "Mindset",
    title: "What Accountability Actually Looks Like in Coaching (And Why It Works)",
    excerpt: "Accountability isn't someone screaming at you to work harder. Here's what real coaching accountability looks like, and the data on why it drives results.",
    readTime: "7 min read",
    date: "Apr 20, 2026",
    featured: false,
    color: "#A855F7",
  },
];

function getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    "Nutrition": "#FFDE02",
    "Training": "#3B82F6",
    "Mindset": "#A855F7",
    "Transformation Stories": "#22C55E",
    "Lifestyle": "#F59E0B",
  };
  return map[category] || "#B7B9C3";
}

function getCategoryColorRGB(category: string): string {
  const map: Record<string, string> = {
    "Nutrition": "255,222,2",
    "Training": "59,130,246",
    "Mindset": "168,85,247",
    "Transformation Stories": "34,197,94",
    "Lifestyle": "245,158,11",
  };
  return map[category] || "154,164,178";
}

export default function BlogClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredPosts = activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);
  const featured = filteredPosts.filter((p) => p.featured);
  const rest = filteredPosts.filter((p) => !p.featured);

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section style={{ padding: "140px 24px 80px", position: "relative" }} className="grid-bg">
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 30%, rgba(255,222,2,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative" }}>
            <div className="tag" style={{ marginBottom: "24px" }}>Blog</div>
            <h1 style={{ fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 600, color: "#FFFFFF", marginBottom: "20px", letterSpacing: "-0.02em" }}>
              Training. Nutrition.{" "}
              <span className="gold-text">Transformation.</span>
            </h1>
            <p style={{ fontSize: "18px", color: "#B7B9C3", lineHeight: 1.65, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Practical guidance on training, nutrition, mindset, and building the body you want, written by coaches, not content marketers.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section style={{ padding: "0 24px 48px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {categories.map((cat) => {
                const active = cat === activeCategory;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={active}
                    style={{
                      padding: "8px 16px",
                      background: active ? "rgba(255,222,2,0.1)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${active ? "rgba(255,222,2,0.25)" : "rgba(255,255,255,0.06)"}`,
                      borderRadius: "999px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: active ? "#FFDE02" : "#B7B9C3",
                      cursor: "pointer",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured posts */}
        <section style={{ padding: "0 24px 80px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginBottom: "20px" }} className="featured-grid">
              {featured.map((post, i) => (
                <a
                  key={i}
                  href="#"
                  style={{ textDecoration: "none", background: "rgba(23,23,23,0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "36px", display: "block", transition: "all 0.25s ease", position: "relative", overflow: "hidden" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,222,2,0.2)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                >
                  <div style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", background: `rgba(${getCategoryColorRGB(post.category)}, 0.1)`, border: `1px solid rgba(${getCategoryColorRGB(post.category)}, 0.2)`, borderRadius: "999px", fontSize: "11px", fontWeight: 600, color: getCategoryColor(post.category), marginBottom: "16px", letterSpacing: "0.04em", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {post.category}
                  </div>
                  <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "24px", fontWeight: 600, color: "#FFFFFF", lineHeight: 1.25, marginBottom: "12px", letterSpacing: "-0.01em" }}>
                    {post.title}
                  </h2>
                  <p style={{ fontSize: "14px", color: "#B7B9C3", lineHeight: 1.65, marginBottom: "24px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{post.excerpt}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <span style={{ fontSize: "12px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{post.date}</span>
                    <span style={{ fontSize: "12px", color: "#7E8395" }}>·</span>
                    <span style={{ fontSize: "12px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{post.readTime}</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Rest of posts */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "12px", overflow: "hidden" }}>
              {rest.map((post, i) => (
                <a
                  key={i}
                  href="#"
                  style={{ textDecoration: "none", background: "#07070A", padding: "24px 28px", display: "flex", alignItems: "flex-start", gap: "20px", transition: "background 0.2s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#13202E"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#07070A"; }}
                >
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: getCategoryColor(post.category), flexShrink: 0, marginTop: "8px" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "11px", fontWeight: 600, color: getCategoryColor(post.category), letterSpacing: "0.04em", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{post.category}</span>
                      <span style={{ fontSize: "11px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{post.date}</span>
                      <span style={{ fontSize: "11px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{post.readTime}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "18px", fontWeight: 600, color: "#FFFFFF", marginBottom: "6px", lineHeight: 1.3, letterSpacing: "-0.01em" }}>{post.title}</h3>
                    <p style={{ fontSize: "13px", color: "#B7B9C3", lineHeight: 1.6, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{post.excerpt}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: "4px", color: "#7E8395" }}>
                    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <style>{`@media (max-width: 768px) { .featured-grid { grid-template-columns: 1fr !important; } }`}</style>
        </section>

        {/* Subscribe */}
        <section style={{ padding: "80px 24px 120px", background: "rgba(9,9,11,0.5)" }}>
          <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
            <div className="tag" style={{ marginBottom: "20px" }}>Newsletter</div>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", color: "#FFFFFF", marginBottom: "16px", letterSpacing: "-0.01em" }}>
              Training and nutrition insights.{" "}
              <span className="gold-text">Every week.</span>
            </h2>
            <p style={{ color: "#B7B9C3", fontSize: "16px", lineHeight: 1.65, marginBottom: "32px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Practical guidance on training, nutrition, and mindset, delivered to your inbox every week. No fluff.
            </p>
            {subscribed ? (
              <div style={{ padding: "16px 24px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "10px" }}>
                <p style={{ fontSize: "15px", color: "#22C55E", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                  You&apos;re subscribed. Expect the first issue shortly.
                </p>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", gap: "8px" }} className="subscribe-form">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ flex: 1, padding: "12px 18px", background: "rgba(23,23,23,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#FFFFFF", fontSize: "14px", fontFamily: "'Plus Jakarta Sans', sans-serif", outline: "none" }}
                  />
                  <button className="btn-primary" onClick={() => { if (email.includes("@")) setSubscribed(true); }}>
                    Subscribe
                  </button>
                </div>
                <p style={{ marginTop: "12px", fontSize: "12px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  No spam. Unsubscribe anytime.
                </p>
              </>
            )}
          </div>
          <style>{`@media (max-width: 480px) { .subscribe-form { flex-direction: column !important; } }`}</style>
        </section>
      </main>
      <Footer />
    </>
  );
}
