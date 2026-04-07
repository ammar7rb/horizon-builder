
ALTER TABLE public.site_config
  ADD COLUMN hero_tagline text NOT NULL DEFAULT 'Global Commerce Reimagined',
  ADD COLUMN hero_title text NOT NULL DEFAULT 'Industrial Stability.',
  ADD COLUMN hero_title_highlight text NOT NULL DEFAULT 'Ethereal Motion.',
  ADD COLUMN hero_description text NOT NULL DEFAULT 'Navigating the complexities of international trade with precision, transparency, and a relentless focus on logistical excellence.',
  ADD COLUMN hero_button1_text text NOT NULL DEFAULT 'Explore Ventures',
  ADD COLUMN hero_button1_link text NOT NULL DEFAULT '/articles',
  ADD COLUMN hero_button2_text text NOT NULL DEFAULT 'Our Portfolio',
  ADD COLUMN hero_button2_link text NOT NULL DEFAULT '/about';
