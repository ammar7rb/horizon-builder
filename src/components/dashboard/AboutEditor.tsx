import { useSiteContent } from "@/contexts/SiteContentContext";
import { Plus, Trash2 } from "lucide-react";

const AboutEditor = () => {
  const { content, updateAbout, addSector, updateSector, removeSector, updateValue } = useSiteContent();
  const about = content.about;

  const inputClass = "w-full h-10 px-3 bg-surface-container border border-outline-variant/30 rounded-lg font-body text-sm text-foreground focus:outline-none focus:border-primary/50";
  const textareaClass = "w-full px-3 py-2 bg-surface-container border border-outline-variant/30 rounded-lg font-body text-sm text-foreground focus:outline-none focus:border-primary/50 resize-none";

  return (
    <div className="space-y-8">
      <h2 className="font-headline text-xl text-foreground">About Page</h2>

      <div className="space-y-4">
        <input value={about.tagline} onChange={(e) => updateAbout({ tagline: e.target.value })} className={inputClass} placeholder="Tagline" />
        <input value={about.title} onChange={(e) => updateAbout({ title: e.target.value })} className={inputClass} placeholder="Title" />
        <textarea value={about.description} onChange={(e) => updateAbout({ description: e.target.value })} rows={3} className={textareaClass} placeholder="Description" />
      </div>

      <div className="space-y-4">
        <h3 className="font-headline text-base text-foreground">Mission</h3>
        <input value={about.missionTitle} onChange={(e) => updateAbout({ missionTitle: e.target.value })} className={inputClass} placeholder="Mission title" />
        <textarea value={about.missionText} onChange={(e) => updateAbout({ missionText: e.target.value })} rows={3} className={textareaClass} />
        <textarea value={about.missionText2} onChange={(e) => updateAbout({ missionText2: e.target.value })} rows={3} className={textareaClass} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-headline text-base text-foreground">Sectors</h3>
          <button onClick={() => addSector({ name: "New Sector", description: "", icon: "Building2" })}
            className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-body">
            <Plus size={14} /> Add
          </button>
        </div>
        {about.sectors.map((sector) => (
          <div key={(sector as any).id || sector.name} className="ghost-border rounded-lg p-4 space-y-2 bg-surface-container-low">
            <div className="flex items-center justify-between">
              <input value={sector.name}
                onChange={(e) => (sector as any).id && updateSector((sector as any).id, { name: e.target.value })}
                className={inputClass} placeholder="Sector name" />
              <button onClick={() => (sector as any).id && removeSector((sector as any).id)}
                className="ml-2 text-muted-foreground hover:text-destructive">
                <Trash2 size={14} />
              </button>
            </div>
            <textarea value={sector.description}
              onChange={(e) => (sector as any).id && updateSector((sector as any).id, { description: e.target.value })}
              rows={2} className={textareaClass} />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-headline text-base text-foreground">Values</h3>
        {about.values.map((v) => (
          <div key={(v as any).id || v.title} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input value={v.title}
              onChange={(e) => (v as any).id && updateValue((v as any).id, { title: e.target.value })}
              className={inputClass} placeholder="Value title" />
            <input value={v.text}
              onChange={(e) => (v as any).id && updateValue((v as any).id, { text: e.target.value })}
              className={`${inputClass} sm:col-span-2`} placeholder="Value text" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutEditor;
