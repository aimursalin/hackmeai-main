import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AIPowered from "@/components/AIPowered";
import SuccessStories from "@/components/SuccessStories";
import IndustryWins from "@/components/IndustryWins";
import Trustpilot from "@/components/Trustpilot";
import Pricing from "@/components/Pricing";
import Team from "@/components/Team";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <IndustryWins />
      <AIPowered />
      <Services />
      <SuccessStories />
      <Trustpilot />
      <Pricing />
      <Team />
      <About />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
