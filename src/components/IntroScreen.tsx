import { useState, useEffect } from "react";
import horizonLogo from "@/assets/horizon-logo.jpg";

const IntroScreen = ({ onFinished }: { onFinished: () => void }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 3800);

    const finishTimer = setTimeout(() => {
      onFinished();
    }, 4600);

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [onFinished]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <img
        src={horizonLogo}
        alt="Horizon"
        className="fade-in w-56 md:w-80 mb-4 object-contain"
      />

      <h1 className="fade-in font-headline text-lg md:text-xl font-light tracking-[0.2em] text-foreground mb-10 uppercase">
        General Trading
      </h1>

      <div className="w-48 md:w-64 h-[1px] bg-outline-variant overflow-hidden rounded-full">
        <div className="loading-bar h-full bg-primary rounded-full" />
      </div>
    </div>
  );
};

export default IntroScreen;
