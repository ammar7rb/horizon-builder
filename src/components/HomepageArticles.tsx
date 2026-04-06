import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/data/articles";

const HomepageArticles = () => {
  const latestArticles = articles.slice(0, 3);

  return (
    <section className="py-24 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">
              Knowledge Hub
            </p>
            <h2 className="font-headline text-2xl md:text-3xl font-light text-foreground">
              Latest Insights
            </h2>
          </div>
          <Link
            to="/articles"
            className="hidden md:inline-flex items-center gap-2 font-body text-xs tracking-wider uppercase text-primary hover:text-primary/80 transition-colors group"
          >
            View All
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        <Link
          to="/articles"
          className="md:hidden inline-flex items-center gap-2 font-body text-xs tracking-wider uppercase text-primary mt-8"
        >
          View All Articles
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};

export default HomepageArticles;
