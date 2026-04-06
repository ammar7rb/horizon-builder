import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/data/articles";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="font-headline text-2xl text-foreground mb-4">Article Not Found</h1>
            <Link to="/articles" className="text-primary font-body text-sm hover:underline">
              ← Back to Articles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedArticles = articles.filter((a) => a.slug !== slug).slice(0, 2);

  // Convert markdown-like content to paragraphs and headings
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("## ")) {
        return (
          <h2
            key={i}
            className="font-headline text-xl md:text-2xl font-medium text-foreground mt-10 mb-4"
          >
            {block.replace("## ", "")}
          </h2>
        );
      }
      return (
        <p key={i} className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
          {block}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article className="pt-24 pb-16 px-6 md:px-10 max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 font-body text-xs tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Back to Articles
        </Link>

        {/* Category */}
        <span className="block font-body text-[10px] tracking-[0.2em] uppercase text-primary/70 mb-4">
          {article.category}
        </span>

        {/* Title */}
        <h1 className="font-headline text-3xl md:text-5xl font-light text-foreground leading-tight mb-6">
          {article.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-5 text-muted-foreground mb-12 pb-8 border-b border-outline-variant/20">
          <span className="inline-flex items-center gap-1.5 font-body text-xs">
            <Calendar size={13} />
            {article.date}
          </span>
          <span className="inline-flex items-center gap-1.5 font-body text-xs">
            <Clock size={13} />
            {article.readTime}
          </span>
        </div>

        {/* Content */}
        <div>{renderContent(article.content)}</div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="px-6 md:px-10 max-w-5xl mx-auto pb-20">
          <h3 className="font-headline text-lg font-medium text-foreground mb-6">
            Related Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ArticleDetail;
