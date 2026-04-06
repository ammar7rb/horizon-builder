import { Building2, Globe, Zap, Leaf, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Structural Integrity",
    description: "Establishing robust supply chains that withstand global volatility.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Leveraging partnerships across five continents for seamless procurement.",
  },
  {
    icon: Zap,
    title: "Rapid Execution",
    description: "Swift decision-making and agile operations in dynamic markets.",
  },
];

const StrategicSection = () => {
  return (
    <section className="py-24 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <p className="font-body text-xs tracking-[0.3em] uppercase text-primary/70 mb-4">
          Strategic Framework
        </p>
        <h2 className="font-headline text-3xl md:text-4xl font-light text-foreground mb-16">
          Global Supply Chain Excellence
        </h2>

        {/* Description */}
        <p className="font-body text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed mb-14">
          Leveraging a vast network of international partners to provide seamless
          procurement and logistics solutions for heavy industries worldwide.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="ghost-border rounded-xl bg-surface-container-low p-8 flex flex-col gap-4 transition-all duration-300 hover:bg-surface-container"
            >
              <feature.icon size={22} className="text-primary/80" />
              <h3 className="font-headline text-base font-medium text-foreground">
                {feature.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Sustainability Card */}
        <div className="mt-6 ghost-border rounded-xl bg-surface-container-low p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 transition-all duration-300 hover:bg-surface-container">
          <Leaf size={24} className="text-primary/80 shrink-0" />
          <div className="flex-1">
            <h3 className="font-headline text-base font-medium text-foreground mb-2">
              Sustainable Growth
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Long-term value creation across emerging markets. Innovation in LNG
              and green energy transition strategies.
            </p>
          </div>
          <ArrowRight size={16} className="text-primary/60 shrink-0 hidden md:block" />
        </div>
      </div>
    </section>
  );
};

export default StrategicSection;
