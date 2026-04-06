import { useSiteContent } from "@/contexts/SiteContentContext";
import { Plus, Trash2 } from "lucide-react";

const AboutEditor = () => {
  const { content, updateContent } = useSiteContent();
  const about = content.about;

  const updateField = (field: string, value: string) => {
    updateContent((prev) => ({ ...prev, about: { ...prev.about, [field]: value } }));
  };

  const updateSector = (index: number, field: "name" | "description", value: string) => {
    updateContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        sectors: prev.about.sectors.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
      },
    }));
  };

  const addSector = () => {
    updateContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        sectors: [...prev.about.sectors, { name: "New Sector", description: "", icon: "Building2" }],
      },
    }));
  };

  const removeSector = (index: number) => {
    updateContent((prev) => ({
      ...prev,
      about: { ...prev.about, sectors: prev.about.sectors.filter((_, i) => i !== index) },
    }));
  };

  const updateValue = (index: number, field: "title" | "text", value: string) => {
    updateContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        values: prev.about.values.map((v, i) => (i === index ? { ...v, [field]: value } : v)),
      },
    }));
  };

  const inputClass = "w-full h-10 px-3 bg-surface-container border border-outline-variant/30 rounded-lg font-body text-sm text-foreground focus:outline-none focus:border-primary/50";
  const textareaClass = "w-full px-3 py-2 bg-surface-container border border-outline-variant/30 rounded-lg font-body text-sm text-foreground focus:outline-none focus:border-primary/50 resize-none";

  return (
    <div className="space-y-8">
      <h2 className="font-headline text-xl text-foreground">About Page</h2>

      <div className="space-y-4">
        <input value={about.tagline} onChange={(e) => updateField("tagline", e.target.value)} className={inputClass} placeholder="Tagline" />
        <input value={about.title} onChange={(e) => updateField("title", e.target.value)} className={inputClass} placeholder="Title" />
        <textarea value={about.description} onChange={(e) => updateField("description", e.target.value)} rows={3} className={textareaClass} placeholder="Description" />
      </div>

      <div className="space-y-4">
        <h3 className="font-headline text-base text-foreground">Mission</h3>
        <input value={about.missionTitle} onChange={(e) => updateField("missionTitle", e.target.value)} className={inputClass} placeholder="Mission title" />
        <textarea value={about.missionText} onChange={(e) => updateField("missionText", e.target.value)} rows={3} className={textareaClass} />
        <textarea value={about.missionText2} onChange={(e) => updateField("missionText2", e.target.value)} rows={3} className={textareaClass} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-headline text-base text-foreground">Sectors</h3>
          <button onClick={addSector} className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-body">
            <Plus size={14} /> Add
          </button>
        </div>
        {about.sectors.map((sector, i) => (
          <div key={i} className="ghost-border rounded-lg p-4 space-y-2 bg-surface-container-low">
            <div className="flex items-center justify-between">
              <input value={sector.name} onChange={(e) => updateSector(i, "name", e.target.value)} className={inputClass} placeholder="Sector name" />
              <button onClick={() => removeSector(i)} className="ml-2 text-muted-foreground hover:text-destructive">
                <Trash2 size={14} />
              </button>
            </div>
            <textarea value={sector.description} onChange={(e) => updateSector(i, "description", e.target.value)} rows={2} className={textareaClass} />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-headline text-base text-foreground">Values</h3>
        {about.values.map((v, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input value={v.title} onChange={(e) => updateValue(i, "title", e.target.value)} className={inputClass} placeholder="Value title" />
            <input value={v.text} onChange={(e) => updateValue(i, "text", e.target.value)} className={`${inputClass} sm:col-span-2`} placeholder="Value text" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutEditor;
