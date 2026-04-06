import { useState, useCallback } from "react";
import IntroScreen from "@/components/IntroScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

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

        {/* Placeholder for Phase 3+ sections */}
        <div className="h-screen flex items-center justify-center">
          <p className="font-headline text-muted-foreground/50 text-sm tracking-wide">
            More sections coming in next phases
          </p>
        </div>
      </div>
    </>
  );
};

export default Index;
