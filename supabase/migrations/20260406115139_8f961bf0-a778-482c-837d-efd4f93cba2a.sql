
-- Drop old permissive write policies
DROP POLICY IF EXISTS "Public write site_config" ON public.site_config;
DROP POLICY IF EXISTS "Public insert site_config" ON public.site_config;
DROP POLICY IF EXISTS "Public write hero_slides" ON public.hero_slides;
DROP POLICY IF EXISTS "Public write articles" ON public.articles;
DROP POLICY IF EXISTS "Public write about_content" ON public.about_content;
DROP POLICY IF EXISTS "Public insert about_content" ON public.about_content;
DROP POLICY IF EXISTS "Public write about_sectors" ON public.about_sectors;
DROP POLICY IF EXISTS "Public write about_values" ON public.about_values;
DROP POLICY IF EXISTS "Public write contact_content" ON public.contact_content;
DROP POLICY IF EXISTS "Public insert contact_content" ON public.contact_content;

-- Site config: auth required for write
CREATE POLICY "Auth update site_config" ON public.site_config FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth insert site_config" ON public.site_config FOR INSERT TO authenticated WITH CHECK (true);

-- Hero slides: auth required for write
CREATE POLICY "Auth manage hero_slides" ON public.hero_slides FOR ALL TO authenticated USING (true);

-- Articles: auth required for write
CREATE POLICY "Auth manage articles" ON public.articles FOR ALL TO authenticated USING (true);

-- About content: auth required for write
CREATE POLICY "Auth update about_content" ON public.about_content FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth insert about_content" ON public.about_content FOR INSERT TO authenticated WITH CHECK (true);

-- About sectors: auth required for write
CREATE POLICY "Auth manage about_sectors" ON public.about_sectors FOR ALL TO authenticated USING (true);

-- About values: auth required for write
CREATE POLICY "Auth manage about_values" ON public.about_values FOR ALL TO authenticated USING (true);

-- Contact content: auth required for write
CREATE POLICY "Auth update contact_content" ON public.contact_content FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth insert contact_content" ON public.contact_content FOR INSERT TO authenticated WITH CHECK (true);

-- Storage: auth required for uploads
DROP POLICY IF EXISTS "Public upload site-images" ON storage.objects;
DROP POLICY IF EXISTS "Public update site-images" ON storage.objects;
DROP POLICY IF EXISTS "Public delete site-images" ON storage.objects;

CREATE POLICY "Auth upload site-images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-images');
CREATE POLICY "Auth update site-images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'site-images');
CREATE POLICY "Auth delete site-images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'site-images');
