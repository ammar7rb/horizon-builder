import { useState } from "react";
import Navbar from "@/components/Navbar";
import ArticleCard from "@/components/ArticleCard";
import Footer from "@/components/Footer";
import { useSiteContent } from "@/contexts/SiteContentContext";

const Articles = () => {
  const [email, setEmail] = useState("");
  const { content } = useSiteContent();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-12 px-6 md:px-10 max-w-5xl mx-auto text-center">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-primary/70 mb-4">Knowledge Hub</p>
        <h1 className="font-headline text-3xl md:text-5xl font-light text-foreground mb-5">
          Insights into the Global Trade Horizon.
        </h1>
        <p className="font-body text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Analyzing market shifts, sustainable logistics, and the future of industrial procurement through an ethereal architectural lens.
        </p>
      </section>

      <section className="px-6 md:px-10 max-w-5xl mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 max-w-3xl mx-auto pb-24 text-center">
        <div className="ghost-border rounded-xl bg-surface-container-low p-8 md:p-12">
          <h2 className="font-headline text-xl md:text-2xl font-light text-foreground mb-3">
            Stay at the Horizon of Industry Updates.
          </h2>
          <p className="font-body text-xs text-muted-foreground mb-6">
            Weekly insights delivered directly to your executive suite. No clutter, just intelligence.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); setEmail(""); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-10 px-4 bg-surface-container border border-outline-variant/30 rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors" />
            <button type="submit" className="h-10 px-6 bg-primary text-primary-foreground font-body text-xs tracking-wider uppercase rounded-xl hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Articles;
