import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building2, Globe, Shield, TrendingUp } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";

const iconMap: Record<string, React.ElementType> = {
  Building2, TrendingUp, Globe, Shield,
};

const About = () => {
  const { content } = useSiteContent();
  const about = content.about;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 px-6 md:px-10 max-w-4xl mx-auto">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-primary/70 mb-4">{about.tagline}</p>
        <h1 className="font-headline text-3xl md:text-5xl font-light text-foreground mb-6">{about.title}</h1>
        <p className="font-body text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">{about.description}</p>
      </section>

      <section className="px-6 md:px-10 max-w-4xl mx-auto pb-20">
        <div className="ghost-border rounded-xl bg-surface-container-low p-8 md:p-12">
          <h2 className="font-headline text-xl md:text-2xl font-light text-foreground mb-4">{about.missionTitle}</h2>
          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">{about.missionText}</p>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">{about.missionText2}</p>
        </div>
      </section>

      <section className="px-6 md:px-10 max-w-4xl mx-auto pb-20">
        <h2 className="font-headline text-xl md:text-2xl font-light text-foreground mb-10">Sectors We Serve</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {about.sectors.map((sector) => {
            const Icon = iconMap[sector.icon] || Building2;
            return (
              <div key={sector.name} className="ghost-border rounded-xl bg-surface-container-low p-6 flex items-start gap-4 transition-all duration-300 hover:bg-surface-container">
                <Icon size={20} className="text-primary/80 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-headline text-base font-medium text-foreground mb-1.5">{sector.name}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{sector.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-6 md:px-10 max-w-4xl mx-auto pb-24">
        <div className="border-t border-outline-variant/15 pt-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {about.values.map((v) => (
            <div key={v.title}>
              <h3 className="font-headline text-base font-medium text-foreground mb-2">{v.title}</h3>
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
