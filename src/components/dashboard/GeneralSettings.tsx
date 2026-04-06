import { useSiteContent } from "@/contexts/SiteContentContext";
import { useCallback } from "react";

const GeneralSettings = () => {
  const { content, updateConfig, uploadImage } = useSiteContent();
  const { config } = content;

  const handleLogoType = useCallback(
    (type: "text" | "image") => { updateConfig({ logoType: type }); },
    [updateConfig]
  );

  const handleFileUpload = useCallback(
    async (field: "logoImage" | "favicon", file: File) => {
      const url = await uploadImage(file, field === "logoImage" ? "logos" : "favicons");
      await updateConfig({ [field]: url });
    },
    [updateConfig, uploadImage]
  );

  return (
    <div className="space-y-8">
      <h2 className="font-headline text-xl text-foreground">General Settings</h2>

      <div className="space-y-4">
        <label className="font-body text-sm text-muted-foreground">Logo Type</label>
        <div className="flex gap-3">
          {(["text", "image"] as const).map((t) => (
            <button key={t} onClick={() => handleLogoType(t)}
              className={`px-4 py-2 rounded-lg text-sm font-body capitalize transition-colors ${
                config.logoType === t ? "bg-primary text-primary-foreground" : "bg-surface-container text-muted-foreground hover:text-foreground"
              }`}>{t}</button>
          ))}
        </div>
      </div>

      {config.logoType === "text" && (
        <div className="space-y-2">
          <label className="font-body text-sm text-muted-foreground">Logo Text</label>
          <input value={config.logoText}
            onChange={(e) => updateConfig({ logoText: e.target.value })}
            className="w-full h-10 px-4 bg-surface-container border border-outline-variant/30 rounded-lg font-body text-sm text-foreground focus:outline-none focus:border-primary/50" />
        </div>
      )}

      {config.logoType === "image" && (
        <div className="space-y-2">
          <label className="font-body text-sm text-muted-foreground">Logo Image</label>
          <input type="file" accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFileUpload("logoImage", e.target.files[0])}
            className="font-body text-sm text-muted-foreground" />
          {config.logoImage && <img src={config.logoImage} alt="Logo preview" className="h-10 mt-2 object-contain" />}
        </div>
      )}

      <div className="space-y-2">
        <label className="font-body text-sm text-muted-foreground">Favicon (Tab Icon)</label>
        <input type="file" accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFileUpload("favicon", e.target.files[0])}
          className="font-body text-sm text-muted-foreground" />
        {config.favicon && <img src={config.favicon} alt="Favicon preview" className="h-8 mt-2" />}
      </div>

      <div className="ghost-border rounded-lg p-4 bg-surface-container-low">
        <p className="font-body text-xs text-muted-foreground mb-2">Preview</p>
        <div className="flex items-center gap-2">
          {config.logoType === "image" && config.logoImage ? (
            <img src={config.logoImage} alt="Logo" className="h-6 object-contain" />
          ) : (
            <span className="font-headline text-sm font-semibold tracking-[0.15em] text-foreground uppercase">{config.logoText}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
