import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ConnectSection } from "@/components/ConnectSection";
import Services from "@/components/Services";
import AIPowered from "@/components/AIPowered";
import SuccessStories from "@/components/SuccessStories";
import IndustryWins from "@/components/IndustryWins";
import Trustpilot from "@/components/Trustpilot";
import Pricing from "@/components/Pricing";
import Team from "@/components/Team";
import About from "@/components/About";
import { Calendar } from "@/components/ui/calendar-bento";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ConnectSection />
      <IndustryWins />
      <AIPowered />
      <Services />
      <SuccessStories />
      <Trustpilot />
      <Pricing />
      <Team />
      <About />
      <Calendar />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
