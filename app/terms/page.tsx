import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms of Service",
  description: "CALIBRATE terms of service — the agreement governing your use of our coaching services and website.",
  robots: { index: false, follow: false },
};

import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const LAST_UPDATED = "19 June 2026";

const sections = [
  {
    title: "1. Agreement to Terms",
    content: `By accessing the CALIBRATE website (calibrate.gvnfit.online) or enrolling in any CALIBRATE coaching programme, you agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and GVN Fit (trading as CALIBRATE), operated by Guhayavarman, Chennai, Tamil Nadu, India.

If you do not agree to these terms, please do not use our services or website.`,
  },
  {
    title: "2. Services Provided",
    content: `CALIBRATE offers the following online coaching services:

— **Monthly Coaching** — Full CALIBRATE protocol including custom training programme, personalised nutrition targets, weekly check-ins, and WhatsApp coach access. Minimum 3-month commitment. Priced at ₹25,000 per month.

— **Quarterly Protocol** — Complete 3-month coaching engagement billed upfront, including quarterly re-calibration audit and priority coach review. Priced at ₹65,000 per quarter.

All services are delivered remotely. Coaching does not include in-person training sessions unless explicitly stated in a separate agreement.`,
  },
  {
    title: "3. Eligibility",
    content: `To use CALIBRATE services, you must:

— Be at least 18 years of age
— Have no medical conditions that would make physical training or dietary changes unsafe without direct medical supervision
— Provide accurate and truthful information during the application process

CALIBRATE reserves the right to refuse service to any applicant at its sole discretion.`,
  },
  {
    title: "4. Application & Onboarding",
    content: `Coaching engagement begins with a free diagnostic consultation call. Acceptance into the programme is at CALIBRATE's discretion following this call. Enrolment is confirmed only upon receipt of the first payment.

You are responsible for providing accurate health, fitness, and lifestyle information during onboarding. Withholding relevant medical information may compromise the safety and effectiveness of your programme.`,
  },
  {
    title: "5. Payment Terms",
    content: `**Monthly Coaching**
Payment of ₹25,000 is due at the start of each month. A minimum 3-month commitment is required from the date of enrolment. Early termination within the 3-month period does not entitle you to a refund of remaining months.

**Quarterly Protocol**
Payment of ₹65,000 is due in full at the time of enrolment.

**Payment Methods**
Payments are processed securely via Razorpay or other designated payment gateways. By providing payment details, you authorise CALIBRATE to charge the applicable fee.

**Late Payments**
Access to coaching services may be suspended if payment is not received within 5 business days of the due date.`,
  },
  {
    title: "6. Refund & Cancellation Policy",
    content: `**Cancellation**
You may cancel your coaching engagement by providing 14 days' written notice to Admin@gvnfit.online. Cancellation takes effect at the end of the current billing period.

**Refunds**
— Payments already processed are non-refundable once coaching has commenced for that period.
— If CALIBRATE is unable to deliver the service due to circumstances on our end, a pro-rata refund will be issued for the unused portion of the paid period.
— Refunds are not provided for lack of results due to non-compliance with the programme.

**Exceptional Circumstances**
Refund requests based on medical emergencies or other exceptional circumstances will be reviewed on a case-by-case basis. Contact Admin@gvnfit.online with documentation.`,
  },
  {
    title: "7. Health & Medical Disclaimer",
    content: `CALIBRATE coaching is a fitness and nutrition service — it is not a medical service and does not constitute medical advice, diagnosis, or treatment.

You acknowledge that:

— You are responsible for consulting a qualified medical professional before beginning any new exercise or dietary programme
— CALIBRATE coaches are not licensed medical practitioners, physiotherapists, or registered dieticians (except where specialists are explicitly engaged)
— Any health information provided to your coach is used solely to personalise your fitness programme
— You participate in all training and nutrition activities at your own risk

CALIBRATE accepts no liability for injury, illness, or adverse health outcomes that arise from participation in the programme where the client has not disclosed relevant medical conditions or has acted contrary to coach guidance.`,
  },
  {
    title: "8. Client Responsibilities",
    content: `To get the most from CALIBRATE and to hold up your end of the agreement, you agree to:

— Complete weekly check-ins honestly and on time
— Follow your programme consistently and communicate deviations to your coach
— Respond to coach communications within a reasonable timeframe
— Notify your coach immediately of any injury, illness, or significant lifestyle change that affects your ability to train
— Treat all CALIBRATE team members with respect`,
  },
  {
    title: "9. Intellectual Property",
    content: `All content on the CALIBRATE website and within your coaching programme — including training plans, nutrition protocols, written materials, graphics, and methodology — is the intellectual property of GVN Fit and is protected by applicable copyright laws.

You may not reproduce, distribute, share, or resell any CALIBRATE programme materials without prior written consent. Your coaching programme is created for your personal use only.`,
  },
  {
    title: "10. Confidentiality",
    content: `CALIBRATE treats all client health, fitness, and personal data as strictly confidential. Your information will not be shared with third parties except as described in our Privacy Policy.

Client testimonials and transformation results may be shared publicly (on the website, social media, or marketing materials) only with your explicit written consent.`,
  },
  {
    title: "11. Limitation of Liability",
    content: `To the maximum extent permitted by applicable law, CALIBRATE and GVN Fit shall not be liable for:

— Any indirect, incidental, or consequential loss or damage
— Loss of results, income, or business opportunity
— Physical injury arising from failure to disclose medical conditions or follow programme guidance safely
— Service interruptions caused by third-party platforms (payment processors, hosting services, communication tools)

CALIBRATE's total liability to you under these terms shall not exceed the total fees paid by you in the 3 months preceding the claim.`,
  },
  {
    title: "12. Governing Law",
    content: `These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Chennai, Tamil Nadu, India.`,
  },
  {
    title: "13. Changes to These Terms",
    content: `CALIBRATE reserves the right to update these Terms of Service at any time. We will notify active clients of material changes by email. Continued use of our services after the effective date of any changes constitutes your acceptance of the revised terms.`,
  },
  {
    title: "14. Contact",
    content: `For any questions about these Terms of Service:

**Email:** Admin@gvnfit.online
**Website:** calibrate.gvnfit.online
**Business:** GVN Fit, Chennai, Tamil Nadu, India

For additional information, visit gvnfit.online.`,
  },
];

export default function TermsPage() {
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
              Terms of Service
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
                Please read these Terms of Service carefully before enrolling in any CALIBRATE coaching programme or using this website. By proceeding, you agree to these terms in full.
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
                    if (line.startsWith("— **")) {
                      const match = line.match(/— \*\*(.+?)\*\* — (.+)/);
                      if (match) {
                        return (
                          <p key={li} style={{ marginBottom: "6px", paddingLeft: "12px" }}>
                            — <span style={{ color: "#FFDE02", fontWeight: 600 }}>{match[1]}</span> — {match[2]}
                          </p>
                        );
                      }
                    }
                    if (line.startsWith("— ")) {
                      return <p key={li} style={{ marginBottom: "6px", paddingLeft: "12px" }}>{line}</p>;
                    }
                    if (line.trim() === "") return <br key={li} />;
                    return <p key={li} style={{ marginBottom: "12px" }}>{line}</p>;
                  })}
                </div>
              </div>
            ))}

            <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/privacy-policy" className="btn-secondary" style={{ fontSize: "14px" }}>
                Privacy Policy →
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
