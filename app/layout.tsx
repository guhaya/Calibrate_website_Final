import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://calibrate.gvnfit.online"),
  title: {
    default: "CALIBRATE — Precision Coaching for High-Performing Professionals",
    template: "%s | CALIBRATE",
  },
  description:
    "Data-driven body recomposition coaching for engineers, PMs, consultants, and founders. DMAIC-based protocol — custom training, nutrition, and weekly analysis built around your actual schedule.",
  keywords: [
    "online fitness coach India",
    "body recomposition coach India",
    "performance coaching for engineers",
    "fitness coach for software engineers",
    "data-driven fitness coaching",
    "executive fitness coaching India",
    "online personal trainer premium India",
    "DMAIC fitness coaching",
    "coaching for product managers",
    "coaching for founders India",
    "fitness coach for busy professionals",
    "body recomposition India",
    "precision coaching India",
    "1-on-1 fitness coaching India",
    "online fitness coaching premium",
  ],
  authors: [{ name: "Guhayavarman", url: "https://calibrate.gvnfit.online/coaches" }],
  creator: "CALIBRATE",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://calibrate.gvnfit.online",
    siteName: "CALIBRATE",
    title: "CALIBRATE — Precision Coaching for High-Performing Professionals",
    description:
      "Your body is a process. Processes can be optimised. DMAIC-based coaching for engineers, founders, and executives who want real results — without generic fitness programmes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CALIBRATE — Precision Performance Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CALIBRATE — Precision Coaching for High-Performing Professionals",
    description: "DMAIC-based body recomposition coaching for engineers, founders, and executives. Data-driven. Built around your schedule.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap&font-display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "@id": "https://calibrate.gvnfit.online/#business",
                name: "CALIBRATE",
                description: "Precision performance coaching for engineers, product managers, consultants, and founders. Data-driven body recomposition using the DMAIC framework — custom training, nutrition, and weekly analysis built around your actual schedule.",
                url: "https://calibrate.gvnfit.online",
                email: "Admin@gvnfit.online",
                foundingDate: "2024",
                areaServed: { "@type": "Country", name: "India" },
                serviceType: "Personal Fitness Coaching",
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: "CALIBRATE Coaching Plans",
                  itemListElement: [
                    {
                      "@type": "Offer",
                      name: "Monthly Coaching",
                      description: "Full CALIBRATE protocol — custom training, nutrition, weekly check-ins, WhatsApp support. Minimum 3-month commitment.",
                      price: "25000",
                      priceCurrency: "INR",
                      priceSpecification: { "@type": "UnitPriceSpecification", price: "25000", priceCurrency: "INR", unitText: "month" },
                    },
                    {
                      "@type": "Offer",
                      name: "Quarterly Coaching",
                      description: "Complete 3-month protocol billed upfront. Includes quarterly re-calibration audit and priority review.",
                      price: "65000",
                      priceCurrency: "INR",
                    },
                  ],
                },
                employee: {
                  "@type": "Person",
                  name: "Guhayavarman",
                  jobTitle: "Founder & Head Coach",
                  url: "https://calibrate.gvnfit.online/coaches",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://calibrate.gvnfit.online/#website",
                url: "https://calibrate.gvnfit.online",
                name: "CALIBRATE",
                publisher: { "@id": "https://calibrate.gvnfit.online/#business" },
              },
            ]),
          }}
        />
      </head>
      <body className="min-h-full">
        <div className="hud-scanline" aria-hidden="true" />
        {children}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var io = new IntersectionObserver(function(entries) {
              entries.forEach(function(e) {
                if (e.isIntersecting) { e.target.classList.add('in-view'); }
              });
            }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
            function observe() {
              document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right,.reveal-scale,.reveal').forEach(function(el) {
                io.observe(el);
              });
            }
            if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', observe); }
            else { observe(); }
            var mo = new MutationObserver(observe);
            mo.observe(document.body, { childList: true, subtree: true });
          })();
        `}} />
      </body>
    </html>
  );
}
