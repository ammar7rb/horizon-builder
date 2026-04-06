import { useState, useCallback } from "react";
import IntroScreen from "@/components/IntroScreen";

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
        {/* Hero section will be added in Phase 2 */}
        <div className="flex items-center justify-center min-h-screen">
          <p className="font-headline text-muted-foreground text-lg tracking-wide">
            Phase 2: Hero Section — Coming Next
          </p>
        </div>
      </div>
    </>
  );
};

export default Index;
