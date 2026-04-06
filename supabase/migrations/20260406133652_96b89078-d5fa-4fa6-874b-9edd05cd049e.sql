
-- Footer content (copyright text etc.)
CREATE TABLE public.footer_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  copyright_text TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.footer_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read footer_content" ON public.footer_content FOR SELECT TO public USING (true);
CREATE POLICY "Auth update footer_content" ON public.footer_content FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth insert footer_content" ON public.footer_content FOR INSERT TO authenticated WITH CHECK (true);

-- Insert default row
INSERT INTO public.footer_content (copyright_text) VALUES ('© 2024 Horizon General Trading. All rights reserved.');

-- Footer links
CREATE TABLE public.footer_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL DEFAULT '#',
  sort_order INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE public.footer_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read footer_links" ON public.footer_links FOR SELECT TO public USING (true);
CREATE POLICY "Auth manage footer_links" ON public.footer_links FOR ALL TO authenticated USING (true);

-- Insert default links
INSERT INTO public.footer_links (label, url, sort_order) VALUES
('LinkedIn', '#', 0),
('Privacy Policy', '#', 1),
('Terms of Service', '#', 2);

-- Trigger for updated_at
CREATE TRIGGER update_footer_content_updated_at
BEFORE UPDATE ON public.footer_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
