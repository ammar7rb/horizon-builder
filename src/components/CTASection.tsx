import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 px-6 md:px-10">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-headline text-2xl md:text-4xl font-light text-foreground mb-5">
          Ready to expand your reach?
        </h2>
        <p className="font-body text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
          Partner with a trading house that prioritizes integrity and
          architectural precision in every transaction.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center h-11 px-8 bg-primary text-primary-foreground font-body text-xs tracking-wider uppercase rounded-xl hover:bg-primary/90 transition-all duration-300"
        >
          Initiate Consultation
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
