import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import StatMarquee from "@/components/home/StatMarquee";
import AudienceSplit from "@/components/home/AudienceSplit";
import TransformationCarousel from "@/components/home/TransformationCarousel";
import PainGrid from "@/components/home/PainGrid";
import AppShowcase from "@/components/home/AppShowcase";
import WeeklyPlanMockup from "@/components/home/WeeklyPlanMockup";
import PricingCards from "@/components/home/PricingCards";
import GuaranteeBanner from "@/components/home/GuaranteeBanner";
import ComparisonTable from "@/components/home/ComparisonTable";
import ThreeStepKickoff from "@/components/home/ThreeStepKickoff";
import ReviewsCarousel from "@/components/home/ReviewsCarousel";
import FAQAccordion from "@/components/home/FAQAccordion";
import DemoCTA from "@/components/home/DemoCTA";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <StatMarquee />
        <AudienceSplit />
        <TransformationCarousel />
        <PainGrid />
        <AppShowcase />
        <WeeklyPlanMockup />
        <PricingCards />
        <GuaranteeBanner />
        <ComparisonTable />
        <ThreeStepKickoff />
        <ReviewsCarousel />
        <FAQAccordion />
        <DemoCTA />
      </main>
      <Footer />
    </>
  );
}
