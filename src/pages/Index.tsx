import { useState, useCallback } from "react";
import IntroScreen from "@/components/IntroScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StrategicSection from "@/components/StrategicSection";
import HomepageArticles from "@/components/HomepageArticles";
import QuoteSection from "@/components/QuoteSection";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  const [introFinished, setIntroFinished] = useState(false);

  const handleIntroFinished = useCallback(() => {
    setIntroFinished(true);
  }, []);

  return (
    <>
      {!introFinished && <IntroScreen onFinished={handleIntroFinished} />}

      <div
        className={`min-h-screen bg-background transition-opacity duration-700 ${
          introFinished ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />
        <HeroSection />
        <StrategicSection />
        <HomepageArticles />
        <QuoteSection />
        <StatsSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
