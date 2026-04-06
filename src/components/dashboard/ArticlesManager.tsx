import { useState, useCallback } from "react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { Plus, Trash2, Edit, ArrowLeft } from "lucide-react";
import ArticleEditor from "./ArticleEditor";
import type { ArticleData } from "@/data/siteContent";

const categories = ["Logistics & Supply", "Energy Sector", "Corporate Strategy", "Aviation", "Mining", "Telecommunications"];

const generateSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const ArticlesManager = () => {
  const { content, updateContent } = useSiteContent();
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  const editing = editingSlug ? content.articles.find((a) => a.slug === editingSlug) : null;

  const addArticle = useCallback(() => {
    const newArticle: ArticleData = {
      slug: `new-article-${Date.now()}`,
      category: "Corporate Strategy",
      title: "New Article",
      excerpt: "",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      readTime: "3 min read",
      bannerImage: "",
      content: "<p>Start writing your article here...</p>",
    };
    updateContent((prev) => ({ ...prev, articles: [newArticle, ...prev.articles] }));
    setEditingSlug(newArticle.slug);
  }, [updateContent]);

  const deleteArticle = useCallback(
    (slug: string) => {
      updateContent((prev) => ({ ...prev, articles: prev.articles.filter((a) => a.slug !== slug) }));
      if (editingSlug === slug) setEditingSlug(null);
    },
    [updateContent, editingSlug]
  );

  const updateArticle = useCallback(
    (slug: string, field: keyof ArticleData, value: string) => {
      updateContent((prev) => ({
        ...prev,
        articles: prev.articles.map((a) => {
          if (a.slug !== slug) return a;
          const updated = { ...a, [field]: value };
          if (field === "title") updated.slug = generateSlug(value);
          return updated;
        }),
      }));
      if (field === "title") {
        setEditingSlug(generateSlug(value));
      }
    },
    [updateContent]
  );

  const handleBannerUpload = useCallback(
    (slug: string, file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => updateArticle(slug, "bannerImage", e.target?.result as string);
      reader.readAsDataURL(file);
    },
    [updateArticle]
  );

  if (editing) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setEditingSlug(null)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
        >
          <ArrowLeft size={14} /> Back to Articles
        </button>

        <div className="space-y-4">
          <input
            value={editing.title}
            onChange={(e) => updateArticle(editingSlug!, "title", e.target.value)}
            className="w-full h-12 px-4 bg-surface-container border border-outline-variant/30 rounded-lg font-headline text-lg text-foreground focus:outline-none focus:border-primary/50"
            placeholder="Article title"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              value={editing.category}
              onChange={(e) => updateArticle(editingSlug!, "category", e.target.value)}
              className="h-10 px-3 bg-surface-container border border-outline-variant/30 rounded-lg font-body text-sm text-foreground focus:outline-none focus:border-primary/50"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input
              value={editing.readTime}
              onChange={(e) => updateArticle(editingSlug!, "readTime", e.target.value)}
              className="h-10 px-3 bg-surface-container border border-outline-variant/30 rounded-lg font-body text-sm text-foreground focus:outline-none focus:border-primary/50"
              placeholder="Read time"
            />
          </div>

          <textarea
            value={editing.excerpt}
            onChange={(e) => updateArticle(editingSlug!, "excerpt", e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-lg font-body text-sm text-foreground focus:outline-none focus:border-primary/50 resize-none"
            placeholder="Article excerpt"
          />

          {/* Banner */}
          <div className="space-y-2">
            <label className="font-body text-sm text-muted-foreground">Banner Image</label>
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleBannerUpload(editingSlug!, e.target.files[0])}
                className="font-body text-sm text-muted-foreground"
              />
            </div>
            {editing.bannerImage && (
              <img src={editing.bannerImage} alt="Banner" className="w-full h-40 object-cover rounded-lg mt-2" />
            )}
          </div>

          {/* Rich text editor */}
          <div className="space-y-2">
            <label className="font-body text-sm text-muted-foreground">Article Content</label>
            <ArticleEditor
              content={editing.content}
              onChange={(html) => updateArticle(editingSlug!, "content", html)}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-headline text-xl text-foreground">Articles</h2>
        <button
          onClick={addArticle}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-body hover:bg-primary/90 transition-colors"
        >
          <Plus size={14} /> New Article
        </button>
      </div>

      <div className="space-y-3">
        {content.articles.map((article) => (
          <div
            key={article.slug}
            className="ghost-border rounded-lg bg-surface-container-low p-4 flex items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <span className="font-body text-[10px] tracking-wider uppercase text-primary/70">
                {article.category}
              </span>
              <h3 className="font-headline text-sm text-foreground truncate">{article.title}</h3>
              <p className="font-body text-xs text-muted-foreground">{article.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditingSlug(article.slug)}
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Edit size={14} />
              </button>
              <button
                onClick={() => deleteArticle(article.slug)}
                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesManager;
