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
import Steps from "@/components/landing/Steps";
import Pricing from "@/components/landing/Pricing";
import Faq from "@/components/landing/Faq";
import FinalCta from "@/components/landing/FinalCta";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ProofStrip />
        <Problem />
        <Method />
        <AppSection />
        <Goals />
        <Results />
        <Coach />
        <Steps />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
