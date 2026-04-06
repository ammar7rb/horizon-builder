import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building2, Globe, Shield, TrendingUp } from "lucide-react";

const sectors = [
  { icon: Building2, name: "Aviation", description: "Aircraft components, MRO services, and aviation logistics." },
  { icon: TrendingUp, name: "Oil Refining & LNG", description: "Crude processing, refined products, and liquefied natural gas trading." },
  { icon: Globe, name: "Mining", description: "Strategic minerals sourcing and supply chain management." },
  { icon: Shield, name: "Telecommunications", description: "Infrastructure equipment and connectivity solutions." },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-16 px-6 md:px-10 max-w-4xl mx-auto">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-primary/70 mb-4">
          About Us
        </p>
        <h1 className="font-headline text-3xl md:text-5xl font-light text-foreground mb-6">
          Connecting Industries Through Expertise and Innovation.
        </h1>
        <p className="font-body text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
          Horizon General Trading is a multi-sector trading house operating at the
          intersection of aviation, oil refining, LNG, mining, and
          telecommunications. We deliver precision, transparency, and value across
          every transaction.
        </p>
      </section>

      {/* Mission */}
      <section className="px-6 md:px-10 max-w-4xl mx-auto pb-20">
        <div className="ghost-border rounded-xl bg-surface-container-low p-8 md:p-12">
          <h2 className="font-headline text-xl md:text-2xl font-light text-foreground mb-4">
            Our Mission
          </h2>
          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
            To build resilient global supply chains that serve both commerce and
            sustainability. We believe that the future of international trade
            depends on integrity, innovation, and an unwavering commitment to
            operational excellence.
          </p>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            Founded on the principle that every great structure begins with a
            solid blueprint, we apply architectural precision to every aspect of
            our trading operations — from procurement to delivery, from partner
            selection to risk management.
          </p>
        </div>
      </section>

      {/* Sectors */}
      <section className="px-6 md:px-10 max-w-4xl mx-auto pb-20">
        <h2 className="font-headline text-xl md:text-2xl font-light text-foreground mb-10">
          Sectors We Serve
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sectors.map((sector) => (
            <div
              key={sector.name}
              className="ghost-border rounded-xl bg-surface-container-low p-6 flex items-start gap-4 transition-all duration-300 hover:bg-surface-container"
            >
              <sector.icon size={20} className="text-primary/80 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-headline text-base font-medium text-foreground mb-1.5">
                  {sector.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {sector.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="px-6 md:px-10 max-w-4xl mx-auto pb-24">
        <div className="border-t border-outline-variant/15 pt-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { title: "Integrity", text: "Radical transparency in every transaction." },
            { title: "Innovation", text: "Leveraging technology to optimize global trade." },
            { title: "Excellence", text: "Precision and discipline in execution." },
          ].map((v) => (
            <div key={v.title}>
              <h3 className="font-headline text-base font-medium text-foreground mb-2">
                {v.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
