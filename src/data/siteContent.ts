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
  bannerImages: string[];
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

export interface FooterLink {
  id?: string;
  label: string;
  url: string;
}

export interface FooterContent {
  copyrightText: string;
  links: FooterLink[];
}

export interface SiteConfig {
  logoType: "text" | "image";
  logoText: string;
  logoImage: string;
  favicon: string;
  heroTagline: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroDescription: string;
  heroButton1Text: string;
  heroButton1Link: string;
  heroButton2Text: string;
  heroButton2Link: string;
}

export interface SiteContent {
  config: SiteConfig;
  heroSlides: HeroSlide[];
  articles: ArticleData[];
  about: AboutContent;
  contact: ContactContent;
  footer: FooterContent;
}

export const defaultSiteContent: SiteContent = {
  config: {
    logoType: "text",
    logoText: "Horizon General Trading",
    logoImage: "",
    favicon: "",
    heroTagline: "Global Commerce Reimagined",
    heroTitle: "Industrial Stability.",
    heroTitleHighlight: "Ethereal Motion.",
    heroDescription: "Navigating the complexities of international trade with precision, transparency, and a relentless focus on logistical excellence.",
    heroButton1Text: "Explore Ventures",
    heroButton1Link: "/articles",
    heroButton2Text: "Our Portfolio",
    heroButton2Link: "/about",
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
  footer: {
    copyrightText: "© 2024 Horizon General Trading. All rights reserved.",
    links: [],
  },
};
