import { useState, useCallback, useRef, useEffect } from "react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { Plus, Trash2, Edit, ArrowLeft } from "lucide-react";
import ArticleEditor from "./ArticleEditor";
import type { ArticleData } from "@/data/siteContent";

const categories = ["Logistics & Supply", "Energy Sector", "Corporate Strategy", "Aviation", "Mining", "Telecommunications"];

const generateSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Debounced input that only calls onChange after user stops typing
const DebouncedInput = ({ value, onChange, className, placeholder, as = "input", rows }: {
  value: string; onChange: (v: string) => void; className?: string; placeholder?: string; as?: "input" | "textarea"; rows?: number;
}) => {
  const [local, setLocal] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => { setLocal(value); }, [value]);

  const handleChange = (v: string) => {
    setLocal(v);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onChange(v), 600);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  if (as === "textarea") {
    return <textarea value={local} onChange={(e) => handleChange(e.target.value)} className={className} placeholder={placeholder} rows={rows} />;
  }
  return <input value={local} onChange={(e) => handleChange(e.target.value)} className={className} placeholder={placeholder} />;
};

const ArticlesManager = () => {
  const { content, addArticle, updateArticle, deleteArticle, uploadImage } = useSiteContent();
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  const editing = editingSlug ? content.articles.find((a) => a.slug === editingSlug) : null;

  const handleAdd = useCallback(async () => {
    const newArticle: Omit<ArticleData, "id"> = {
      slug: `new-article-${Date.now()}`,
      category: "Corporate Strategy",
      title: "New Article",
      excerpt: "",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      readTime: "3 min read",
      bannerImage: "",
      bannerImages: [],
      content: "<p>Start writing your article here...</p>",
    };
    const slug = await addArticle(newArticle);
    setEditingSlug(slug);
  }, [addArticle]);

  const handleDelete = useCallback(
    (slug: string) => {
      deleteArticle(slug);
      if (editingSlug === slug) setEditingSlug(null);
    },
    [deleteArticle, editingSlug]
  );

  const handleUpdate = useCallback(
    async (slug: string, field: keyof ArticleData, value: string) => {
      const fields: Partial<ArticleData> = { [field]: value };
      if (field === "title") {
        const newSlug = generateSlug(value);
        fields.slug = newSlug;
        await updateArticle(slug, fields);
        setEditingSlug(newSlug);
      } else {
        await updateArticle(slug, fields);
      }
    },
    [updateArticle]
  );

  const handleBannerUpload = useCallback(
    async (slug: string, file: File) => {
      const url = await uploadImage(file, "article-banners");
      await updateArticle(slug, { bannerImage: url });
    },
    [updateArticle, uploadImage]
  );

  if (editing) {
    return (
      <div className="space-y-6">
        <button onClick={() => setEditingSlug(null)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
          <ArrowLeft size={14} /> Back to Articles
        </button>

        <div className="space-y-4">
          <DebouncedInput value={editing.title}
            onChange={(v) => handleUpdate(editingSlug!, "title", v)}
            className="w-full h-12 px-4 bg-surface-container border border-outline-variant/30 rounded-lg font-headline text-lg text-foreground focus:outline-none focus:border-primary/50"
            placeholder="Article title" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select value={editing.category}
              onChange={(e) => handleUpdate(editingSlug!, "category", e.target.value)}
              className="h-10 px-3 bg-surface-container border border-outline-variant/30 rounded-lg font-body text-sm text-foreground focus:outline-none focus:border-primary/50">
              {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
            <DebouncedInput value={editing.readTime}
              onChange={(v) => handleUpdate(editingSlug!, "readTime", v)}
              className="h-10 px-3 bg-surface-container border border-outline-variant/30 rounded-lg font-body text-sm text-foreground focus:outline-none focus:border-primary/50"
              placeholder="Read time" />
          </div>

          <DebouncedInput value={editing.excerpt}
            onChange={(v) => handleUpdate(editingSlug!, "excerpt", v)}
            as="textarea" rows={3}
            className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-lg font-body text-sm text-foreground focus:outline-none focus:border-primary/50 resize-none"
            placeholder="Article excerpt" />

          <div className="space-y-2">
            <label className="font-body text-sm text-muted-foreground">Banner Images (auto-rotate on article card)</label>
            <div className="flex gap-2 flex-wrap">
              {(editing.bannerImages || []).map((img, i) => (
                <div key={i} className="relative w-24 h-16 rounded-lg overflow-hidden group/img">
                  <img src={img} alt={`Banner ${i + 1}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => {
                      const updated = [...(editing.bannerImages || [])];
                      updated.splice(i, 1);
                      updateArticle(editingSlug!, { bannerImages: updated });
                    }}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white text-xs transition-opacity"
                  >✕</button>
                </div>
              ))}
              <label className="w-24 h-16 flex items-center justify-center border border-dashed border-outline-variant/40 rounded-lg cursor-pointer text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors text-xs">
                + Add
                <input type="file" accept="image/*" className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const url = await uploadImage(file, "article-banners");
                    const updated = [...(editing.bannerImages || []), url];
                    await updateArticle(editingSlug!, { bannerImages: updated, bannerImage: updated[0] });
                  }} />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-body text-sm text-muted-foreground">Article Content</label>
            <ArticleEditor content={editing.content}
              onChange={(html) => handleUpdate(editingSlug!, "content", html)} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-headline text-xl text-foreground">Articles</h2>
        <button onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-body hover:bg-primary/90 transition-colors">
          <Plus size={14} /> New Article
        </button>
      </div>

      <div className="space-y-3">
        {content.articles.map((article) => (
          <div key={article.slug} className="ghost-border rounded-lg bg-surface-container-low p-4 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <span className="font-body text-[10px] tracking-wider uppercase text-primary/70">{article.category}</span>
              <h3 className="font-headline text-sm text-foreground truncate">{article.title}</h3>
              <p className="font-body text-xs text-muted-foreground">{article.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setEditingSlug(article.slug)} className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <Edit size={14} />
              </button>
              <button onClick={() => handleDelete(article.slug)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
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
