import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Metrics from "@/components/home/Metrics";
import AppShowcase from "@/components/home/AppShowcase";
import HomeProcess from "@/components/home/HomeProcess";
import ProductEcosystem from "@/components/home/ProductEcosystem";
import FeatureShowcase from "@/components/home/FeatureShowcase";
import ComparisonTable from "@/components/home/ComparisonTable";
import Testimonials from "@/components/home/Testimonials";
import DemoCTA from "@/components/home/DemoCTA";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Metrics />
        <AppShowcase />
        <HomeProcess />
        <ProductEcosystem />
        <FeatureShowcase />
        <ComparisonTable />
        <Testimonials />
        <DemoCTA />
      </main>
      <Footer />
    </>
  );
}
