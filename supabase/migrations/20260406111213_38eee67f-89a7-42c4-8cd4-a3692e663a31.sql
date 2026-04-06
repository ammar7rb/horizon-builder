
-- Site config (single row)
CREATE TABLE public.site_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  logo_type TEXT NOT NULL DEFAULT 'text' CHECK (logo_type IN ('text', 'image')),
  logo_text TEXT NOT NULL DEFAULT 'Horizon General Trading',
  logo_image TEXT NOT NULL DEFAULT '',
  favicon TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site_config" ON public.site_config FOR SELECT USING (true);
CREATE POLICY "Public write site_config" ON public.site_config FOR UPDATE USING (true);
CREATE POLICY "Public insert site_config" ON public.site_config FOR INSERT WITH CHECK (true);

-- Hero slides
CREATE TABLE public.hero_slides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image TEXT NOT NULL,
  label TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read hero_slides" ON public.hero_slides FOR SELECT USING (true);
CREATE POLICY "Public write hero_slides" ON public.hero_slides FOR ALL USING (true);

-- Articles
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  date TEXT NOT NULL DEFAULT '',
  read_time TEXT NOT NULL DEFAULT '3 min read',
  banner_image TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Public write articles" ON public.articles FOR ALL USING (true);

-- About content (single row)
CREATE TABLE public.about_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tagline TEXT NOT NULL DEFAULT 'About Us',
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  mission_title TEXT NOT NULL DEFAULT 'Our Mission',
  mission_text TEXT NOT NULL DEFAULT '',
  mission_text2 TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read about_content" ON public.about_content FOR SELECT USING (true);
CREATE POLICY "Public write about_content" ON public.about_content FOR UPDATE USING (true);
CREATE POLICY "Public insert about_content" ON public.about_content FOR INSERT WITH CHECK (true);

-- About sectors
CREATE TABLE public.about_sectors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'Building2',
  sort_order INT NOT NULL DEFAULT 0
);

ALTER TABLE public.about_sectors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read about_sectors" ON public.about_sectors FOR SELECT USING (true);
CREATE POLICY "Public write about_sectors" ON public.about_sectors FOR ALL USING (true);

-- About values
CREATE TABLE public.about_values (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  text TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0
);

ALTER TABLE public.about_values ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read about_values" ON public.about_values FOR SELECT USING (true);
CREATE POLICY "Public write about_values" ON public.about_values FOR ALL USING (true);

-- Contact content (single row)
CREATE TABLE public.contact_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tagline TEXT NOT NULL DEFAULT 'Contact',
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  office TEXT NOT NULL DEFAULT '',
  availability TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read contact_content" ON public.contact_content FOR SELECT USING (true);
CREATE POLICY "Public write contact_content" ON public.contact_content FOR UPDATE USING (true);
CREATE POLICY "Public insert contact_content" ON public.contact_content FOR INSERT WITH CHECK (true);

-- Timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_site_config_updated_at BEFORE UPDATE ON public.site_config FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_about_content_updated_at BEFORE UPDATE ON public.about_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_contact_content_updated_at BEFORE UPDATE ON public.contact_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);

CREATE POLICY "Public read site-images" ON storage.objects FOR SELECT USING (bucket_id = 'site-images');
CREATE POLICY "Public upload site-images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'site-images');
CREATE POLICY "Public update site-images" ON storage.objects FOR UPDATE USING (bucket_id = 'site-images');
CREATE POLICY "Public delete site-images" ON storage.objects FOR DELETE USING (bucket_id = 'site-images');
