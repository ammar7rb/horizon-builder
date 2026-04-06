import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { defaultSiteContent, type SiteContent } from "@/data/siteContent";

const STORAGE_KEY = "horizon-site-content";

interface SiteContentContextType {
  content: SiteContent;
  updateContent: (updater: (prev: SiteContent) => SiteContent) => void;
  resetContent: () => void;
}

const SiteContentContext = createContext<SiteContentContextType | null>(null);

export const useSiteContent = () => {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error("useSiteContent must be used within SiteContentProvider");
  return ctx;
};

const loadContent = (): SiteContent => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultSiteContent, ...parsed };
    }
  } catch {}
  return defaultSiteContent;
};

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(loadContent);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  // Update favicon dynamically
  useEffect(() => {
    if (content.config.favicon) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = content.config.favicon;
    }
  }, [content.config.favicon]);

  const updateContent = useCallback((updater: (prev: SiteContent) => SiteContent) => {
    setContent((prev) => updater(prev));
  }, []);

  const resetContent = useCallback(() => {
    setContent(defaultSiteContent);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <SiteContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </SiteContentContext.Provider>
  );
};
