import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { defaultSiteContent, type SiteContent, type HeroSlide, type ArticleData, type SectorData, type AboutContent, type ContactContent, type SiteConfig, type FooterLink, type FooterContent } from "@/data/siteContent";

interface SiteContentContextType {
  content: SiteContent;
  loading: boolean;
  updateConfig: (config: Partial<SiteConfig>) => Promise<void>;
  addHeroSlide: (slide: { image: string; label: string }) => Promise<void>;
  updateHeroSlide: (id: string, field: "label" | "image", value: string) => Promise<void>;
  removeHeroSlide: (id: string) => Promise<void>;
  addArticle: (article: Omit<ArticleData, "id">) => Promise<string>;
  updateArticle: (slug: string, fields: Partial<ArticleData>) => Promise<void>;
  deleteArticle: (slug: string) => Promise<void>;
  updateAbout: (fields: Partial<AboutContent>) => Promise<void>;
  addSector: (sector: { name: string; description: string; icon: string }) => Promise<void>;
  updateSector: (id: string, fields: Partial<SectorData>) => Promise<void>;
  removeSector: (id: string) => Promise<void>;
  updateValue: (id: string, fields: { title?: string; text?: string }) => Promise<void>;
  updateContact: (fields: Partial<ContactContent>) => Promise<void>;
  updateFooter: (fields: Partial<FooterContent>) => Promise<void>;
  addFooterLink: (link: { label: string; url: string }) => Promise<void>;
  updateFooterLink: (id: string, fields: Partial<FooterLink>) => Promise<void>;
  removeFooterLink: (id: string) => Promise<void>;
  uploadImage: (file: File, path: string) => Promise<string>;
  refreshContent: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextType | null>(null);

export const useSiteContent = () => {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error("useSiteContent must be used within SiteContentProvider");
  return ctx;
};

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    try {
      const [configRes, slidesRes, articlesRes, aboutRes, sectorsRes, valuesRes, contactRes] = await Promise.all([
        supabase.from("site_config").select("*").limit(1).single(),
        supabase.from("hero_slides").select("*").order("sort_order"),
        supabase.from("articles").select("*").order("created_at", { ascending: false }),
        supabase.from("about_content").select("*").limit(1).single(),
        supabase.from("about_sectors").select("*").order("sort_order"),
        supabase.from("about_values").select("*").order("sort_order"),
        supabase.from("contact_content").select("*").limit(1).single(),
      ]);

      setContent({
        config: configRes.data ? {
          logoType: configRes.data.logo_type as "text" | "image",
          logoText: configRes.data.logo_text,
          logoImage: configRes.data.logo_image,
          favicon: configRes.data.favicon,
        } : defaultSiteContent.config,
        heroSlides: slidesRes.data?.map((s) => ({
          id: s.id,
          image: s.image,
          label: s.label,
        })) || defaultSiteContent.heroSlides,
        articles: articlesRes.data?.map((a) => ({
          slug: a.slug,
          category: a.category,
          title: a.title,
          excerpt: a.excerpt,
          date: a.date,
          readTime: a.read_time,
          bannerImage: a.banner_image,
          content: a.content,
        })) || defaultSiteContent.articles,
        about: aboutRes.data ? {
          tagline: aboutRes.data.tagline,
          title: aboutRes.data.title,
          description: aboutRes.data.description,
          missionTitle: aboutRes.data.mission_title,
          missionText: aboutRes.data.mission_text,
          missionText2: aboutRes.data.mission_text2,
          sectors: sectorsRes.data?.map((s) => ({
            id: s.id,
            name: s.name,
            description: s.description,
            icon: s.icon,
          })) || [],
          values: valuesRes.data?.map((v) => ({
            id: v.id,
            title: v.title,
            text: v.text,
          })) || [],
        } : defaultSiteContent.about,
        contact: contactRes.data ? {
          tagline: contactRes.data.tagline,
          title: contactRes.data.title,
          description: contactRes.data.description,
          email: contactRes.data.email,
          office: contactRes.data.office,
          availability: contactRes.data.availability,
        } : defaultSiteContent.contact,
      });
    } catch (err) {
      console.error("Failed to fetch site content:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // Favicon effect
  useEffect(() => {
    if (content.config.favicon) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) { link = document.createElement("link"); link.rel = "icon"; document.head.appendChild(link); }
      link.href = content.config.favicon;
    }
  }, [content.config.favicon]);

  const uploadImage = useCallback(async (file: File, path: string): Promise<string> => {
    const ext = file.name.split(".").pop();
    const filePath = `${path}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("site-images").upload(filePath, file);
    if (error) throw error;
    const { data } = supabase.storage.from("site-images").getPublicUrl(filePath);
    return data.publicUrl;
  }, []);

  const updateConfig = useCallback(async (fields: Partial<SiteConfig>) => {
    const mapped: Record<string, string> = {};
    if (fields.logoType !== undefined) mapped.logo_type = fields.logoType;
    if (fields.logoText !== undefined) mapped.logo_text = fields.logoText;
    if (fields.logoImage !== undefined) mapped.logo_image = fields.logoImage;
    if (fields.favicon !== undefined) mapped.favicon = fields.favicon;
    const { data: existing } = await supabase.from("site_config").select("id").limit(1).single();
    if (existing) {
      await supabase.from("site_config").update(mapped).eq("id", existing.id);
    }
    setContent((prev) => ({ ...prev, config: { ...prev.config, ...fields } }));
  }, []);

  const addHeroSlide = useCallback(async (slide: { image: string; label: string }) => {
    const maxOrder = content.heroSlides.length;
    const { data } = await supabase.from("hero_slides").insert({ image: slide.image, label: slide.label, sort_order: maxOrder }).select().single();
    if (data) {
      setContent((prev) => ({ ...prev, heroSlides: [...prev.heroSlides, { id: data.id, image: data.image, label: data.label }] }));
    }
  }, [content.heroSlides.length]);

  const updateHeroSlide = useCallback(async (id: string, field: "label" | "image", value: string) => {
    await supabase.from("hero_slides").update({ [field]: value }).eq("id", id);
    setContent((prev) => ({ ...prev, heroSlides: prev.heroSlides.map((s) => s.id === id ? { ...s, [field]: value } : s) }));
  }, []);

  const removeHeroSlide = useCallback(async (id: string) => {
    await supabase.from("hero_slides").delete().eq("id", id);
    setContent((prev) => ({ ...prev, heroSlides: prev.heroSlides.filter((s) => s.id !== id) }));
  }, []);

  const addArticle = useCallback(async (article: Omit<ArticleData, "id">): Promise<string> => {
    const { data } = await supabase.from("articles").insert({
      slug: article.slug, category: article.category, title: article.title,
      excerpt: article.excerpt, date: article.date, read_time: article.readTime,
      banner_image: article.bannerImage, content: article.content,
    }).select().single();
    const slug = data?.slug || article.slug;
    setContent((prev) => ({ ...prev, articles: [{ ...article, slug }, ...prev.articles] }));
    return slug;
  }, []);

  const updateArticle = useCallback(async (slug: string, fields: Partial<ArticleData>) => {
    const mapped: Record<string, unknown> = {};
    if (fields.title !== undefined) mapped.title = fields.title;
    if (fields.slug !== undefined) mapped.slug = fields.slug;
    if (fields.category !== undefined) mapped.category = fields.category;
    if (fields.excerpt !== undefined) mapped.excerpt = fields.excerpt;
    if (fields.date !== undefined) mapped.date = fields.date;
    if (fields.readTime !== undefined) mapped.read_time = fields.readTime;
    if (fields.bannerImage !== undefined) mapped.banner_image = fields.bannerImage;
    if (fields.content !== undefined) mapped.content = fields.content;
    await supabase.from("articles").update(mapped).eq("slug", slug);
    setContent((prev) => ({
      ...prev,
      articles: prev.articles.map((a) => a.slug === slug ? { ...a, ...fields } : a),
    }));
  }, []);

  const deleteArticle = useCallback(async (slug: string) => {
    await supabase.from("articles").delete().eq("slug", slug);
    setContent((prev) => ({ ...prev, articles: prev.articles.filter((a) => a.slug !== slug) }));
  }, []);

  const updateAbout = useCallback(async (fields: Partial<AboutContent>) => {
    const mapped: Record<string, string> = {};
    if (fields.tagline !== undefined) mapped.tagline = fields.tagline;
    if (fields.title !== undefined) mapped.title = fields.title;
    if (fields.description !== undefined) mapped.description = fields.description;
    if (fields.missionTitle !== undefined) mapped.mission_title = fields.missionTitle;
    if (fields.missionText !== undefined) mapped.mission_text = fields.missionText;
    if (fields.missionText2 !== undefined) mapped.mission_text2 = fields.missionText2;
    const { data: existing } = await supabase.from("about_content").select("id").limit(1).single();
    if (existing) await supabase.from("about_content").update(mapped).eq("id", existing.id);
    setContent((prev) => ({ ...prev, about: { ...prev.about, ...fields } }));
  }, []);

  const addSector = useCallback(async (sector: { name: string; description: string; icon: string }) => {
    const maxOrder = content.about.sectors.length;
    const { data } = await supabase.from("about_sectors").insert({ ...sector, sort_order: maxOrder }).select().single();
    if (data) {
      setContent((prev) => ({
        ...prev,
        about: { ...prev.about, sectors: [...prev.about.sectors, { id: data.id, name: data.name, description: data.description, icon: data.icon }] },
      }));
    }
  }, [content.about.sectors.length]);

  const updateSector = useCallback(async (id: string, fields: Partial<SectorData>) => {
    await supabase.from("about_sectors").update(fields).eq("id", id);
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, sectors: prev.about.sectors.map((s) => (s as any).id === id ? { ...s, ...fields } : s) },
    }));
  }, []);

  const removeSector = useCallback(async (id: string) => {
    await supabase.from("about_sectors").delete().eq("id", id);
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, sectors: prev.about.sectors.filter((s) => (s as any).id !== id) },
    }));
  }, []);

  const updateValue = useCallback(async (id: string, fields: { title?: string; text?: string }) => {
    await supabase.from("about_values").update(fields).eq("id", id);
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, values: prev.about.values.map((v) => (v as any).id === id ? { ...v, ...fields } : v) },
    }));
  }, []);

  const updateContact = useCallback(async (fields: Partial<ContactContent>) => {
    const { data: existing } = await supabase.from("contact_content").select("id").limit(1).single();
    if (existing) await supabase.from("contact_content").update(fields).eq("id", existing.id);
    setContent((prev) => ({ ...prev, contact: { ...prev.contact, ...fields } }));
  }, []);

  return (
    <SiteContentContext.Provider value={{
      content, loading, updateConfig, addHeroSlide, updateHeroSlide, removeHeroSlide,
      addArticle, updateArticle, deleteArticle, updateAbout, addSector, updateSector, removeSector,
      updateValue, updateContact, uploadImage, refreshContent: fetchAll,
    }}>
      {children}
    </SiteContentContext.Provider>
  );
};
