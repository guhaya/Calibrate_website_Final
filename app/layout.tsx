import type { Metadata } from "next";
import "./globals.css";
import VisitorTracker from "@/components/shared/VisitorTracker";
import RevealObserver from "@/components/shared/RevealObserver";

export const metadata: Metadata = {
  metadataBase: new URL("https://calibrate.gvnfit.online"),
  title: {
    default: "CALIBRATE by GVNFIT | Precision Coaching, Delivered Through the Vemisis App",
    template: "%s | CALIBRATE",
  },
  description:
    "Data-driven body recomposition coaching for engineers, PMs, consultants, and founders. DMAIC-based protocol, custom training, nutrition, and weekly analysis built around your actual schedule.",
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
    title: "CALIBRATE | Precision Coaching for High-Performing Professionals",
    description:
      "Your body is a process. Processes can be optimised. DMAIC-based coaching for engineers, founders, and executives who want real results, without generic fitness programmes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CALIBRATE | Precision Performance Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CALIBRATE | Precision Coaching for High-Performing Professionals",
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
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <head>
        <meta name="theme-color" content="#07070A" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Condensed:wght@600;700;800&family=JetBrains+Mono:wght@500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Script fonts for the footer word, subset to only the glyphs it uses */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@700&family=Noto+Sans+Malayalam:wght@700&family=Noto+Sans+Kannada:wght@700&family=Noto+Sans+Telugu:wght@700&family=Noto+Sans+Devanagari:wght@700&family=Noto+Sans+Bengali:wght@700&family=Noto+Sans+Gujarati:wght@700&family=Noto+Sans+Gurmukhi:wght@700&family=Noto+Sans+Oriya:wght@700&family=Noto+Nastaliq+Urdu:wght@700&family=Noto+Sans+Arabic:wght@700&family=Noto+Sans+Meetei+Mayek:wght@700&family=Noto+Sans+Ol+Chiki:wght@700&family=Noto+Sans+JP:wght@700&text=%D8%A7%D8%A8%D8%AA%D8%B1%D9%83%D9%84%D9%8A%D9%90%D9%B9%D9%BD%DA%A9%DB%8C%E0%A4%95%E0%A4%9F%E0%A4%AC%E0%A4%AF%E0%A4%B0%E0%A4%B2%E0%A4%BE%E0%A4%BF%E0%A5%85%E0%A5%87%E0%A5%88%E0%A5%8D%E0%A6%95%E0%A6%9F%E0%A6%AC%E0%A6%AF%E0%A6%B0%E0%A6%B2%E0%A6%BE%E0%A6%BF%E0%A7%87%E0%A7%8D%E0%A7%B0%E0%A8%95%E0%A8%9F%E0%A8%AC%E0%A8%B0%E0%A8%B2%E0%A9%80%E0%A9%87%E0%A9%88%E0%A9%8D%E0%AA%95%E0%AA%9F%E0%AA%AC%E0%AA%B0%E0%AA%B2%E0%AA%BF%E0%AB%87%E0%AB%8D%E0%AC%95%E0%AC%9F%E0%AC%AC%E0%AC%B0%E0%AC%B2%E0%AC%BE%E0%AC%BF%E0%AD%87%E0%AD%8D%E0%AD%9F%E0%AE%95%E0%AE%9F%E0%AE%AA%E0%AE%B0%E0%AE%B2%E0%AE%BF%E0%AF%87%E0%AF%8D%E0%B0%95%E0%B0%9F%E0%B0%AC%E0%B0%B0%E0%B0%B2%E0%B0%BE%E0%B0%BF%E0%B1%87%E0%B1%8D%E0%B2%95%E0%B2%9F%E0%B2%AC%E0%B2%AF%E0%B2%B0%E0%B2%B2%E0%B2%BE%E0%B2%BF%E0%B3%87%E0%B3%8D%E0%B4%95%E0%B4%AC%E0%B4%B0%E0%B4%B1%E0%B4%B2%E0%B4%BE%E0%B4%BF%E0%B5%87%E0%B5%8D%E1%B1%9E%E1%B1%A0%E1%B1%A4%E1%B1%A8%E1%B1%AE%E1%B1%B4%E1%B1%B5%E3%82%AD%E3%83%88%E3%83%96%E3%83%A3%E3%83%AA%E3%83%AC%E3%83%BC%EA%AF%80%EA%AF%82%EA%AF%94%EA%AF%95%EA%AF%A0%EA%AF%A4%EA%AF%A6%EA%AF%AD&display=swap" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "@id": "https://calibrate.gvnfit.online/#business",
                name: "CALIBRATE",
                description: "Precision performance coaching for engineers, product managers, consultants, and founders. Data-driven body recomposition using the DMAIC framework, custom training, nutrition, and weekly analysis built around your actual schedule.",
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
                      description: "Full CALIBRATE protocol, custom training, nutrition, weekly check-ins, WhatsApp support. Minimum 3-month commitment.",
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
        <a href="#main" className="skip-link">Skip to content</a>
        <noscript><style>{`.rv{opacity:1 !important;transform:none !important}`}</style></noscript>
        <VisitorTracker />
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
