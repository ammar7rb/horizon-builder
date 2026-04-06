export interface Article {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image?: string;
  content?: string;
}

export const articles: Article[] = [
  {
    slug: "future-of-trans-continental-supply-chains",
    category: "Logistics & Supply",
    title: "The Future of Trans-Continental Supply Chains",
    excerpt:
      "As global trade routes evolve, Horizon General Trading explores the integration of AI-driven logistics to minimize carbon footprints and maximize operational efficiency.",
    date: "March 14, 2024",
    readTime: "6 min read",
  },
  {
    slug: "transitioning-assets-sustainable-energy-commodities",
    category: "Energy Sector",
    title: "Transitioning Assets: Sustainable Energy Commodities",
    excerpt:
      "The shift towards renewable energy requires a fundamental rethinking of trading commodities. We analyze the market demand for lithium, cobalt, and beyond.",
    date: "February 28, 2024",
    readTime: "5 min read",
  },
  {
    slug: "architectural-approach-to-general-trading",
    category: "Corporate Strategy",
    title: "The Architectural Approach to General Trading",
    excerpt:
      "Building a trading empire requires more than just capital; it requires a structural blueprint. How we apply architectural principles to market stability.",
    date: "January 15, 2024",
    readTime: "7 min read",
  },
];
