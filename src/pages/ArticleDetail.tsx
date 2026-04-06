import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { useSiteContent } from "@/contexts/SiteContentContext";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { content } = useSiteContent();
  const article = content.articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="font-headline text-2xl text-foreground mb-4">Article Not Found</h1>
            <Link to="/articles" className="text-primary font-body text-sm hover:underline">← Back to Articles</Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedArticles = content.articles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article className="pt-24 pb-16 px-6 md:px-10 max-w-3xl mx-auto">
        <Link to="/articles" className="inline-flex items-center gap-2 font-body text-xs tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors mb-10">
          <ArrowLeft size={14} /> Back to Articles
        </Link>

        <span className="block font-body text-[10px] tracking-[0.2em] uppercase text-primary/70 mb-4">{article.category}</span>

        <h1 className="font-headline text-3xl md:text-5xl font-light text-foreground leading-tight mb-6">{article.title}</h1>

        {article.bannerImage && (
          <img src={article.bannerImage} alt={article.title} className="w-full h-56 md:h-72 object-cover rounded-xl mb-8" />
        )}

        <div className="flex items-center gap-5 text-muted-foreground mb-12 pb-8 border-b border-outline-variant/20">
          <span className="inline-flex items-center gap-1.5 font-body text-xs"><Calendar size={13} />{article.date}</span>
          <span className="inline-flex items-center gap-1.5 font-body text-xs"><Clock size={13} />{article.readTime}</span>
        </div>

        <div
          className="prose prose-invert prose-sm max-w-none [&_h1]:font-headline [&_h1]:text-2xl [&_h1]:font-medium [&_h1]:text-foreground [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:font-headline [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-headline [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:font-body [&_p]:text-sm [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-5 [&_img]:rounded-xl [&_img]:my-6"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {relatedArticles.length > 0 && (
        <section className="px-6 md:px-10 max-w-5xl mx-auto pb-20">
          <h3 className="font-headline text-lg font-medium text-foreground mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((a) => (<ArticleCard key={a.slug} article={a} />))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ArticleDetail;
