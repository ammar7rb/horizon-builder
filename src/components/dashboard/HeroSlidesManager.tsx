import { useSiteContent } from "@/contexts/SiteContentContext";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { useCallback } from "react";

const HeroSlidesManager = () => {
  const { content, updateConfig, addHeroSlide, updateHeroSlide, removeHeroSlide, uploadImage } = useSiteContent();
  const slides = content.heroSlides;
  const cfg = content.config;

  const handleAdd = useCallback(() => {
    addHeroSlide({ image: "", label: "New Slide" });
  }, [addHeroSlide]);

  const handleImageUpload = useCallback(
    async (id: string, file: File) => {
      const url = await uploadImage(file, "hero");
      await updateHeroSlide(id, "image", url);
    },
    [updateHeroSlide, uploadImage]
  );

  const handleBulkUpload = useCallback(
    async (files: FileList) => {
      for (const file of Array.from(files)) {
        const url = await uploadImage(file, "hero");
        await addHeroSlide({ image: url, label: file.name.replace(/\.[^.]+$/, "") });
      }
    },
    [addHeroSlide, uploadImage]
  );

  const inputClass = "w-full h-10 px-4 bg-surface-container border border-outline-variant/30 rounded-lg font-body text-sm text-foreground focus:outline-none focus:border-primary/50";

  return (
    <div className="space-y-8">
      {/* Hero Text Editor */}
      <div className="space-y-4">
        <h2 className="font-headline text-xl text-foreground">Hero Text</h2>
        <div className="space-y-3">
          <div>
            <label className="font-body text-xs text-muted-foreground mb-1 block">Tagline</label>
            <input value={cfg.heroTagline} onChange={(e) => updateConfig({ heroTagline: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="font-body text-xs text-muted-foreground mb-1 block">Title (Main)</label>
            <input value={cfg.heroTitle} onChange={(e) => updateConfig({ heroTitle: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="font-body text-xs text-muted-foreground mb-1 block">Title (Highlight)</label>
            <input value={cfg.heroTitleHighlight} onChange={(e) => updateConfig({ heroTitleHighlight: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="font-body text-xs text-muted-foreground mb-1 block">Description</label>
            <textarea value={cfg.heroDescription} onChange={(e) => updateConfig({ heroDescription: e.target.value })}
              className={`${inputClass} min-h-[80px] py-2`} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-body text-xs text-muted-foreground mb-1 block">Button 1 Text</label>
              <input value={cfg.heroButton1Text} onChange={(e) => updateConfig({ heroButton1Text: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="font-body text-xs text-muted-foreground mb-1 block">Button 1 Link</label>
              <input value={cfg.heroButton1Link} onChange={(e) => updateConfig({ heroButton1Link: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="font-body text-xs text-muted-foreground mb-1 block">Button 2 Text</label>
              <input value={cfg.heroButton2Text} onChange={(e) => updateConfig({ heroButton2Text: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="font-body text-xs text-muted-foreground mb-1 block">Button 2 Link</label>
              <input value={cfg.heroButton2Link} onChange={(e) => updateConfig({ heroButton2Link: e.target.value })} className={inputClass} />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Slides */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-headline text-xl text-foreground">Hero Slides</h2>
          <div className="flex gap-2">
            <label className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-body hover:bg-primary/90 transition-colors cursor-pointer">
              <Plus size={14} /> Upload Images
              <input type="file" accept="image/*" multiple className="hidden"
                onChange={(e) => e.target.files?.length && handleBulkUpload(e.target.files)} />
            </label>
            <button onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 bg-surface-container border border-outline-variant/30 text-foreground rounded-lg text-sm font-body hover:border-primary/50 transition-colors">
              <Plus size={14} /> Empty Slide
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {slides.map((slide) => (
            <div key={slide.id} className="ghost-border rounded-lg bg-surface-container-low p-4 flex gap-4 items-start">
              <GripVertical size={16} className="text-muted-foreground mt-3 shrink-0 cursor-grab" />
              <div className="w-32 h-20 rounded-lg overflow-hidden bg-surface-container shrink-0">
                {slide.image ? (
                  <img src={slide.image} alt={slide.label} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No image</div>
                )}
              </div>
              <div className="flex-1 space-y-3">
                <input value={slide.label} onChange={(e) => updateHeroSlide(slide.id, "label", e.target.value)}
                  placeholder="Slide label"
                  className="w-full h-9 px-3 bg-surface-container border border-outline-variant/30 rounded-lg font-body text-sm text-foreground focus:outline-none focus:border-primary/50" />
                <div className="flex gap-2">
                  <input value={slide.image} onChange={(e) => updateHeroSlide(slide.id, "image", e.target.value)}
                    placeholder="Image URL"
                    className="flex-1 h-9 px-3 bg-surface-container border border-outline-variant/30 rounded-lg font-body text-xs text-muted-foreground focus:outline-none focus:border-primary/50" />
                  <label className="h-9 px-3 flex items-center bg-surface-container border border-outline-variant/30 rounded-lg font-body text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                    Upload
                    <input type="file" accept="image/*" className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(slide.id, e.target.files[0])} />
                  </label>
                </div>
              </div>
              <button onClick={() => removeHeroSlide(slide.id)}
                className="text-muted-foreground hover:text-destructive transition-colors mt-3">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlidesManager;
