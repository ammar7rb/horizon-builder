const QuoteSection = () => {
  return (
    <section className="py-20 px-6 md:px-10">
      <div className="max-w-3xl mx-auto text-center">
        <blockquote className="font-headline text-xl md:text-2xl font-light text-foreground/80 italic leading-relaxed mb-4">
          "Where the horizon meets the foundation."
        </blockquote>
        <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
          — Corporate Ethos
        </p>
      </div>
    </section>
  );
};

export default QuoteSection;
