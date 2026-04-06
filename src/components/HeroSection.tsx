import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Radial glow background */}
      <div className="absolute inset-0 horizon-glow pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <p className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-primary/70 mb-6 fade-in">
          Global Commerce Reimagined
        </p>

        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-light leading-tight text-foreground mb-6 fade-in" style={{ animationDelay: "0.3s" }}>
          Industrial Stability.{" "}
          <br className="hidden sm:block" />
          <span className="text-primary/90">Ethereal Motion.</span>
        </h1>

        <p className="font-body text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed fade-in" style={{ animationDelay: "0.6s" }}>
          Navigating the complexities of international trade with precision,
          transparency, and a relentless focus on logistical excellence.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in" style={{ animationDelay: "0.9s" }}>
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

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground fade-in" style={{ animationDelay: "1.5s" }}>
        <span className="font-body text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <ChevronDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
