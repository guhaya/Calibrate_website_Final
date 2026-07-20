import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "CALIBRATE privacy policy, how we collect, use, and protect your personal information.",
  robots: { index: false, follow: false },
};

import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const LAST_UPDATED = "19 June 2026";

const sections = [
  {
    title: "1. Who We Are",
    content: `CALIBRATE is a precision performance coaching service operated by Guhayavarman under GVN Fit, based in Chennai, Tamil Nadu, India. We provide personalised fitness coaching, nutrition guidance, and body recomposition programmes to clients across India and internationally.

For any privacy-related queries, contact us at: Admin@gvnfit.online`,
  },
  {
    title: "2. Information We Collect",
    content: `We collect the following categories of personal information:

**Contact & Identity Information**
- Full name, email address, phone number, and location when you apply or register for coaching.

**Health & Fitness Data**
- Body measurements, weight history, fitness goals, dietary preferences, training history, and health conditions you voluntarily share with your coach. This is necessary to deliver your coaching programme.

**Payment Information**
- Billing name and payment details processed through our secure payment partners. We do not store full card numbers on our servers.

**Usage Data**
- Pages visited on this website, device type, browser, and general location (city/region level) collected via standard analytics tools.

**Communication Records**
- Messages, check-in submissions, and coach feedback exchanged through WhatsApp, email, or the CALIBRATE app.`,
  },
  {
    title: "3. How We Use Your Information",
    content: `We use your personal data to:

- Deliver, manage, and personalise your coaching programme
- Communicate with you about your progress, check-ins, and programme adjustments
- Process payments and maintain billing records
- Send service-related notifications and updates
- Improve our coaching methodology and website experience
- Comply with applicable legal obligations

We do not sell, rent, or trade your personal information to any third party.`,
  },
  {
    title: "4. Legal Basis for Processing",
    content: `We process your personal data on the following grounds:

- **Contractual necessity**: to fulfil our coaching agreement with you
- **Legitimate interest**: to operate, improve, and communicate about our services
- **Consent**: where you have given explicit consent (e.g. marketing emails)
- **Legal obligation**: where required by applicable Indian law`,
  },
  {
    title: "5. Third-Party Services",
    content: `We use the following trusted third-party services to operate CALIBRATE. Each is bound by its own privacy policy:

- **Supabase**: secure database and authentication infrastructure
- **Vercel**: website hosting and delivery
- **WhatsApp Business**: coach-client communication
- **Payment processors**: Razorpay or similar gateways for billing
- **Google Analytics**: anonymous website usage analytics

We do not grant third parties access to your health or fitness data without your explicit consent.`,
  },
  {
    title: "6. Data Retention",
    content: `We retain your personal data for as long as your coaching relationship with us is active, plus a reasonable period thereafter for legal and business record-keeping purposes (typically 2 years post-engagement).

Health and fitness data is deleted upon your written request, except where retention is required by law.`,
  },
  {
    title: "7. Your Rights",
    content: `You have the right to:

- **Access** the personal data we hold about you
- **Correct** inaccurate or incomplete information
- **Delete** your personal data (subject to legal obligations)
- **Withdraw consent** at any time where processing is based on consent
- **Object** to processing for direct marketing purposes
- **Receive a copy** of your data in a portable format

To exercise any of these rights, email us at Admin@gvnfit.online with the subject line "Data Rights Request". We will respond within 30 days.`,
  },
  {
    title: "8. Data Security",
    content: `We take the security of your data seriously. We implement:

- Encrypted data storage via Supabase with row-level security
- HTTPS encryption across all website connections
- Restricted staff access to personal and health data
- Regular security reviews of our data infrastructure

No method of digital transmission is 100% secure. While we take all reasonable precautions, we cannot guarantee absolute security.`,
  },
  {
    title: "9. Children's Privacy",
    content: `CALIBRATE services are intended for adults aged 18 and over. We do not knowingly collect personal information from minors. If you believe a minor has submitted data to us, please contact us immediately and we will delete it.`,
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. When we do, we will update the "Last Updated" date at the top of this page. For significant changes, we will notify active clients by email. Continued use of our services after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "11. Contact Us",
    content: `For any privacy questions, requests, or concerns:

**Email:** Admin@gvnfit.online
**Website:** calibrate.gvnfit.online
**Business:** GVN Fit, Chennai, Tamil Nadu, India

For additional information about our services, visit gvnfit.online.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navigation />
      <main>
        <section
          style={{ padding: "140px 24px 80px", position: "relative" }}
          className="grid-bg"
        >
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
              Privacy Policy
            </h1>
            <p style={{ fontSize: "14px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Last updated: {LAST_UPDATED}
            </p>
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
                This Privacy Policy explains how CALIBRATE (operated by GVN Fit) collects, uses, and protects your personal information when you use our website or coaching services. Please read it carefully.
              </p>
            </div>

            {sections.map((section, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "40px",
                  paddingBottom: "40px",
                  borderBottom: i < sections.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
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
                  {section.content.split("\n").map((line, li) => {
                    if (line.startsWith("**") && line.endsWith("**")) {
                      return (
                        <p key={li} style={{ fontWeight: 700, color: "#FFFFFF", marginBottom: "8px", marginTop: li > 0 ? "16px" : 0 }}>
                          {line.replace(/\*\*/g, "")}
                        </p>
                      );
                    }
                    if (line.startsWith("- **")) {
                      const match = line.match(/- \*\*(.+?)\*\*: (.+)/);
                      if (match) {
                        return (
                          <p key={li} style={{ marginBottom: "6px", paddingLeft: "12px" }}>
                            - <span style={{ color: "#FFDE02", fontWeight: 600 }}>{match[1]}</span>: {match[2]}
                          </p>
                        );
                      }
                    }
                    if (line.startsWith("- ")) {
                      return <p key={li} style={{ marginBottom: "6px", paddingLeft: "12px" }}>{line}</p>;
                    }
                    if (line.trim() === "") return <br key={li} />;
                    return <p key={li} style={{ marginBottom: "12px" }}>{line}</p>;
                  })}
                </div>
              </div>
            ))}

            <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/terms" className="btn-secondary" style={{ fontSize: "14px" }}>
                Terms of Service →
              </Link>
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
