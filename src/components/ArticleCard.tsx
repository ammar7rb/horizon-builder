import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ArticleData } from "@/data/siteContent";

const categoryColors: Record<string, string> = {
  "Logistics & Supply": "from-primary/20 to-primary/5",
  "Refineries": "from-emerald-500/20 to-emerald-500/5",
  "Corporate Strategy": "from-amber-500/20 to-amber-500/5",
  "Aviation": "from-sky-500/20 to-sky-500/5",
  "Drill-Rigs": "from-orange-500/20 to-orange-500/5",
  "Telecommunications": "from-violet-500/20 to-violet-500/5",
};

const ArticleCard = ({ article }: { article: ArticleData }) => {
  const gradient = categoryColors[article.category] || "from-primary/20 to-primary/5";

  // Combine bannerImage + bannerImages into one array
  const allImages = [
    ...(article.bannerImage ? [article.bannerImage] : []),
    ...(article.bannerImages || []),
  ].filter((img, i, arr) => img && arr.indexOf(img) === i); // dedupe

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (allImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [allImages.length]);

  return (
    <article className="group ghost-border rounded-xl bg-surface-container-low overflow-hidden flex flex-col transition-all duration-300 hover:bg-surface-container">
      {/* Banner */}
      <div className={`h-32 md:h-36 bg-gradient-to-br ${gradient} relative flex items-end p-5 overflow-hidden`}>
        {allImages.map((img, i) => (
          <img
            key={img}
            src={img}
            alt={article.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              i === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <span className="relative z-10 font-body text-[10px] tracking-[0.2em] uppercase text-foreground/70 bg-background/30 backdrop-blur-sm px-3 py-1 rounded-full">
          {article.category}
        </span>
      </div>

      <div className="p-6 md:p-7 flex flex-col gap-3 flex-1">
        <h3 className="font-headline text-lg md:text-xl font-medium text-foreground leading-snug">{article.title}</h3>
        <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">{article.excerpt}</p>
        <Link to={`/articles/${article.slug}`} className="inline-flex items-center gap-2 font-body text-xs tracking-wider uppercase text-primary hover:text-primary/80 transition-colors duration-300 mt-2 group/link">
          Read More
          <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;
