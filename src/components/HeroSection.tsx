import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";

const HeroSection = () => {
  const { content } = useSiteContent();
  const slides = content.heroSlides;
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  const goTo = useCallback(
    (index: number) => {
      setFade(false);
      setTimeout(() => {
        setCurrent(index);
        setFade(true);
      }, 400);
    },
    []
  );

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, slides.length, goTo]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background images */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{
            backgroundImage: `url(${slide.image})`,
            opacity: i === current && fade ? 1 : 0,
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        <p className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-primary/70 mb-6 fade-in">
          Global Commerce Reimagined
        </p>

        <h1
          className="font-headline text-4xl md:text-6xl lg:text-7xl font-light leading-tight text-foreground mb-6 fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          Industrial Stability.{" "}
          <br className="hidden sm:block" />
          <span className="text-primary/90">Ethereal Motion.</span>
        </h1>

        <p
          className="font-body text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          Navigating the complexities of international trade with precision,
          transparency, and a relentless focus on logistical excellence.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in"
          style={{ animationDelay: "0.9s" }}
        >
          <Link
            to="/articles"
            className="h-11 px-8 inline-flex items-center justify-center font-body text-xs tracking-wider uppercase bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300"
          >
            Explore Ventures
          </Link>
          <Link
            to="/about"
            className="h-11 px-8 inline-flex items-center justify-center font-body text-xs tracking-wider uppercase border border-outline-variant text-foreground rounded-xl hover:border-primary/40 hover:text-primary transition-all duration-300"
          >
            Our Portfolio
          </Link>
        </div>
      </div>

      {/* Slide indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-8 h-2 bg-primary"
                  : "w-2 h-2 bg-muted-foreground/40 hover:bg-muted-foreground/70"
              }`}
              aria-label={slide.label}
            />
          ))}
        </div>
      )}

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground fade-in z-10"
        style={{ animationDelay: "1.5s" }}
      >
        <span className="font-body text-[10px] tracking-[0.25em] uppercase">
          Scroll
        </span>
        <ChevronDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
