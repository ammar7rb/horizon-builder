export interface HeroSlide {
  id: string;
  image: string;
  label: string;
}

export interface ArticleData {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  bannerImage: string;
  content: string;
}

export interface SectorData {
  id?: string;
  name: string;
  description: string;
  icon: string;
}

export interface AboutContent {
  tagline: string;
  title: string;
  description: string;
  missionTitle: string;
  missionText: string;
  missionText2: string;
  sectors: SectorData[];
  values: { id?: string; title: string; text: string }[];
}

export interface ContactContent {
  tagline: string;
  title: string;
  description: string;
  email: string;
  office: string;
  availability: string;
}

export interface SiteConfig {
  logoType: "text" | "image";
  logoText: string;
  logoImage: string;
  favicon: string;
}

export interface SiteContent {
  config: SiteConfig;
  heroSlides: HeroSlide[];
  articles: ArticleData[];
  about: AboutContent;
  contact: ContactContent;
}

export const defaultSiteContent: SiteContent = {
  config: {
    logoType: "text",
    logoText: "Horizon General Trading",
    logoImage: "",
    favicon: "",
  },
  heroSlides: [],
  articles: [],
  about: {
    tagline: "About Us",
    title: "",
    description: "",
    missionTitle: "Our Mission",
    missionText: "",
    missionText2: "",
    sectors: [],
    values: [],
  },
  contact: {
    tagline: "Contact",
    title: "",
    description: "",
    email: "",
    office: "",
    availability: "",
  },
};
