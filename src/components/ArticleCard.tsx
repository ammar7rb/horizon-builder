import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/data/articles";

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <article className="group ghost-border rounded-xl bg-surface-container-low p-6 md:p-8 flex flex-col gap-4 transition-all duration-300 hover:bg-surface-container">
      {/* Category */}
      <span className="font-body text-[10px] tracking-[0.2em] uppercase text-primary/70">
        {article.category}
      </span>

      {/* Title */}
      <h3 className="font-headline text-xl md:text-2xl font-medium text-foreground leading-snug">
        {article.title}
      </h3>

      {/* Excerpt */}
      <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">
        {article.excerpt}
      </p>

      {/* Read More */}
      <Link
        to={`/articles/${article.slug}`}
        className="inline-flex items-center gap-2 font-body text-xs tracking-wider uppercase text-primary hover:text-primary/80 transition-colors duration-300 mt-2 group/link"
      >
        Read More
        <ArrowRight
          size={14}
          className="transition-transform duration-300 group-hover/link:translate-x-1"
        />
      </Link>
    </article>
  );
};

export default ArticleCard;
