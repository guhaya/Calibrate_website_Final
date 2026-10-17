import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import ProofStrip from "@/components/landing/ProofStrip";
import Problem from "@/components/landing/Problem";
import Method from "@/components/landing/Method";
import AppSection from "@/components/landing/AppSection";
import Goals from "@/components/landing/Goals";
import Results from "@/components/landing/Results";
import Coach from "@/components/landing/Coach";
import Pricing from "@/components/landing/Pricing";
import Faq from "@/components/landing/Faq";
import FinalCta from "@/components/landing/FinalCta";
import WorksWith from "@/components/landing/WorksWith";
import SignalCards from "@/components/landing/SignalCards";
import TrustPanel from "@/components/landing/TrustPanel";
import LabsOrbit from "@/components/landing/LabsOrbit";
import Reviews from "@/components/landing/Reviews";
import AppQrCard from "@/components/shared/AppQrCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main id="main">
        <Hero />
        <WorksWith />
        <ProofStrip />
        <Problem />
        <Method />
        <SignalCards />
        <LabsOrbit />
        <AppSection />
        <TrustPanel />
        <Goals />
        <Results />
        <Reviews />
        <Pricing />
        <Coach />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <AppQrCard />
    </>
  );
}
