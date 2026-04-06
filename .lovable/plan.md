

# Horizon General Trading — Full Implementation Plan

## Overview
A premium dark-mode-only corporate website for Horizon General Trading. Built with React + Tailwind CSS, using Manrope (headlines) and Inter (body) fonts. The site presents articles in a minimal, professional layout.

---

## Phase 1: Foundation + Intro/Loading Screen

**Design System Setup:**
- Update `tailwind.config.ts` with full Horizon color palette (surface: `#0e0e0e`, primary: `#89ceff`, outline: `#767575`, etc.)
- Add Manrope + Inter fonts via `index.html`
- Set `<html class="dark">` permanently, update `index.css` with dark-only variables
- Remove default `App.css` styles

**Intro Screen Component:**
- Full-screen dark background (`#0e0e0e`)
- Centered "Horizon General Trading" text in Manrope
- Subtle horizontal loading bar (primary blue, ~3-4s animation)
- Fade-out transition → reveals main content
- State managed in `Index.tsx` with `useState`/`useEffect`

**Files:** `index.html`, `tailwind.config.ts`, `src/index.css`, `src/App.css`, `src/components/IntroScreen.tsx`, `src/pages/Index.tsx`

---

## Phase 2: Navigation + Hero Section

**Navigation Bar:**
- Fixed top navbar with "Horizon General Trading" logo on left
- Links: Home, Articles, About, Contact
- "Connect" button (primary styled)
- Transparent background, blur effect on scroll
- Mobile hamburger menu

**Hero Section:**
- Full-viewport height dark section with subtle radial glow effect
- Large headline: "Industrial Stability. Ethereal Motion." in Manrope
- Subtitle paragraph in Inter
- Two CTA buttons: "Explore Ventures" + "Our Portfolio"
- "Scroll" indicator at bottom
- Smooth fade-in animations on load

**Files:** `src/components/Navbar.tsx`, `src/components/HeroSection.tsx`, `src/pages/Index.tsx`

---

## Phase 3: Articles Cards Section

**Articles Page:**
- "Knowledge Hub" heading with subtitle
- Grid layout (responsive: 1 col mobile, 2-3 cols desktop)
- Each card: category tag, title, description, "READ MORE" link
- Ghost border styling, subtle hover effects
- Newsletter subscription section at bottom

**Article Data:**
- Static article data in a `src/data/articles.ts` file
- 3 sample articles (Logistics, Energy, Corporate Strategy) matching the design

**Files:** `src/data/articles.ts`, `src/components/ArticleCard.tsx`, `src/pages/Articles.tsx`, `src/App.tsx` (add route)

---

## Phase 4: Article Details Page

**Article Detail View:**
- Dynamic route `/articles/:slug`
- Large featured image area
- Category tag + date metadata
- Article title in large Manrope heading
- Clean readable body text in Inter
- Back navigation
- Related articles suggestion at bottom

**Files:** `src/pages/ArticleDetail.tsx`, `src/App.tsx` (add route)

---

## Phase 5: Supporting Sections + Final Polish

**Homepage Additional Sections (from design):**
- "Strategic Framework" section with icon cards (Structural Integrity, Global Network, Rapid Execution)
- Stats section (12B+ Asset Volume, 45 Partner Nations, etc.)
- "Ready to expand your reach?" CTA section
- Corporate quote block

**Footer:**
- "Horizon General Trading" branding
- LinkedIn link, Privacy Policy, Terms of Service
- Copyright notice

**Final Polish:**
- Responsive testing and fixes (mobile, tablet, desktop)
- Smooth scroll behavior
- Performance optimization (lazy loading, proper image handling)
- Clean meta tags for SEO
- Production-ready structure for domain deployment

**Files:** `src/components/StrategicSection.tsx`, `src/components/StatsSection.tsx`, `src/components/CTASection.tsx`, `src/components/Footer.tsx`, various page updates

---

## Route Structure
```text
/              → Home (Intro → Hero → Sections → Footer)
/articles      → Articles listing page
/articles/:slug → Article detail page
*              → 404 Not Found
```

## Color Tokens (Key)
```text
Background:  #0e0e0e
Surface:     #191a1a
Primary:     #89ceff
On-Surface:  #e7e5e4
Outline:     #767575
```

---

After your approval, I will start implementing **Phase 1** (Foundation + Intro Screen).

