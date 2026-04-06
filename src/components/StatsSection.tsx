const stats = [
  { value: "12B+", label: "Asset Volume" },
  { value: "45", label: "Partner Nations" },
  { value: "24/7", label: "Trade Support" },
  { value: "100%", label: "Transparency" },
];

const StatsSection = () => {
  return (
    <section className="py-20 px-6 md:px-10 border-t border-b border-outline-variant/15">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-primary/70 mb-4 text-center">
          Proven Industrial Impact
        </p>
        <p className="font-body text-sm text-muted-foreground max-w-xl mx-auto text-center leading-relaxed mb-14">
          Our presence across continents ensures that we remain at the forefront
          of global trade dynamics and industrial evolution.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-headline text-3xl md:text-4xl font-light text-foreground mb-2">
                {stat.value}
              </p>
              <p className="font-body text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
