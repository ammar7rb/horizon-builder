import { useState, useEffect } from "react";
import horizonIntroLogo from "@/assets/horizon-intro-logo.png";

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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ backgroundColor: "#000000" }}
    >
      <img
        src={horizonIntroLogo}
        alt="Horizon"
        className="fade-in w-72 md:w-[500px] object-contain"
      />

      <div className="w-48 md:w-64 h-[1px] bg-outline-variant overflow-hidden rounded-full mt-10">
        <div className="loading-bar h-full bg-primary rounded-full" />
      </div>
    </div>
  );
};

export default IntroScreen;
