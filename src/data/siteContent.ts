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
  values: { title: string; text: string }[];
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
  heroSlides: [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1920&q=80",
      label: "Aviation",
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1920&q=80",
      label: "Oil & Energy",
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80",
      label: "Telecommunications",
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1920&q=80",
      label: "Mining",
    },
  ],
  articles: [
    {
      slug: "future-of-trans-continental-supply-chains",
      category: "Logistics & Supply",
      title: "The Future of Trans-Continental Supply Chains",
      excerpt: "As global trade routes evolve, Horizon General Trading explores the integration of AI-driven logistics to minimize carbon footprints and maximize operational efficiency.",
      date: "March 14, 2024",
      readTime: "6 min read",
      bannerImage: "",
      content: `<h2>The Challenge of Modern Logistics</h2><p>Traditional supply chain models were built for a world of relative stability. Fixed routes, predictable demand patterns, and established partnerships formed the backbone of international trade. However, the past decade has shattered these assumptions.</p><p>Today's supply chains must contend with unprecedented volatility — from pandemic-induced disruptions to climate-related port closures, from shifting tariff regimes to rapidly evolving consumer expectations.</p><h2>AI-Driven Solutions</h2><p>Our approach integrates machine learning algorithms that continuously analyze thousands of variables — weather patterns, port congestion data, fuel prices, regulatory changes — to dynamically optimize shipping routes in real-time.</p><p>This isn't merely about finding the fastest path from point A to point B. It's about creating resilient, adaptive networks that can absorb shocks and maintain operational continuity even under extreme conditions.</p><h2>Sustainability at the Core</h2><p>Perhaps most critically, our AI logistics platform enables significant reductions in carbon footprint. By optimizing routes for fuel efficiency and consolidating shipments intelligently, we've helped our partners achieve an average 23% reduction in transport-related emissions.</p>`,
    },
    {
      slug: "transitioning-assets-sustainable-energy-commodities",
      category: "Energy Sector",
      title: "Transitioning Assets: Sustainable Energy Commodities",
      excerpt: "The shift towards renewable energy requires a fundamental rethinking of trading commodities. We analyze the market demand for lithium, cobalt, and beyond.",
      date: "February 28, 2024",
      readTime: "5 min read",
      bannerImage: "",
      content: `<h2>The New Energy Commodities</h2><p>Lithium, cobalt, nickel, rare earth elements — these materials have become the strategic assets of the 21st century. They power electric vehicles, energy storage systems, wind turbines, and the vast digital infrastructure that underpins modern economies.</p><h2>Market Dynamics</h2><p>The supply-demand dynamics for these commodities are unlike anything the trading world has encountered before. Unlike oil or natural gas, many critical minerals are concentrated in a handful of countries, creating complex geopolitical dependencies.</p><h2>Horizon's Approach</h2><p>We have developed a comprehensive framework for sustainable commodity trading that addresses both market opportunity and ethical responsibility. Our due diligence processes ensure full supply chain transparency, from mine to manufacturer.</p>`,
    },
    {
      slug: "architectural-approach-to-general-trading",
      category: "Corporate Strategy",
      title: "The Architectural Approach to General Trading",
      excerpt: "Building a trading empire requires more than just capital; it requires a structural blueprint. How we apply architectural principles to market stability.",
      date: "January 15, 2024",
      readTime: "7 min read",
      bannerImage: "",
      content: `<h2>Foundation: Trust and Transparency</h2><p>Just as a building requires a solid foundation, a trading company must be built on unwavering trust. Every transaction we execute, every partnership we forge, is anchored in radical transparency and mutual accountability.</p><h2>Structure: Diversified Portfolios</h2><p>Architectural integrity demands that no single point of failure can bring down the entire structure. Similarly, our trading portfolio is deliberately diversified across sectors — aviation, oil refining, LNG, mining, and telecommunications.</p><h2>Design: Adaptive Systems</h2><p>The most enduring buildings are those designed to adapt — to accommodate new technologies, changing uses, and evolving regulations. Our trading systems are built with the same adaptive philosophy.</p>`,
    },
  ],
  about: {
    tagline: "About Us",
    title: "Connecting Industries Through Expertise and Innovation.",
    description: "Horizon General Trading is a multi-sector trading house operating at the intersection of aviation, oil refining, LNG, mining, and telecommunications. We deliver precision, transparency, and value across every transaction.",
    missionTitle: "Our Mission",
    missionText: "To build resilient global supply chains that serve both commerce and sustainability. We believe that the future of international trade depends on integrity, innovation, and an unwavering commitment to operational excellence.",
    missionText2: "Founded on the principle that every great structure begins with a solid blueprint, we apply architectural precision to every aspect of our trading operations — from procurement to delivery, from partner selection to risk management.",
    sectors: [
      { name: "Aviation", description: "Aircraft components, MRO services, and aviation logistics.", icon: "Building2" },
      { name: "Oil Refining & LNG", description: "Crude processing, refined products, and liquefied natural gas trading.", icon: "TrendingUp" },
      { name: "Mining", description: "Strategic minerals sourcing and supply chain management.", icon: "Globe" },
      { name: "Telecommunications", description: "Infrastructure equipment and connectivity solutions.", icon: "Shield" },
    ],
    values: [
      { title: "Integrity", text: "Radical transparency in every transaction." },
      { title: "Innovation", text: "Leveraging technology to optimize global trade." },
      { title: "Excellence", text: "Precision and discipline in execution." },
    ],
  },
  contact: {
    tagline: "Contact",
    title: "Let's Start a Conversation.",
    description: "Whether you're exploring partnership opportunities or seeking trading solutions, we're ready to connect.",
    email: "info@horizongt.com",
    office: "Global Headquarters",
    availability: "24/7 Trade Support",
  },
};
