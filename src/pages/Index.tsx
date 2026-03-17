import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorksSteps from "@/components/HowItWorks";
import DesignerMarketplace from "@/components/DesignerMarketplace";
import RequestTypes from "@/components/RequestTypes";
import SpeedSection from "@/components/SpeedSection";
import QualityControl from "@/components/QualityControl";
import ProofSection from "@/components/ProofSection";
import Trustpilot from "@/components/Trustpilot";
import Pricing from "@/components/Pricing";
import RiskRemoval from "@/components/RiskRemoval";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSteps />
      <DesignerMarketplace />
      <RequestTypes />
      <SpeedSection />
      <QualityControl />
      <ProofSection />
      <Trustpilot />
      <Pricing />
      <RiskRemoval />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
