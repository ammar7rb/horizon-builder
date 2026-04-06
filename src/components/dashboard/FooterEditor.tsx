import { useSiteContent } from "@/contexts/SiteContentContext";
import { Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const DebouncedInput = ({ value, onChange, ...props }: { value: string; onChange: (v: string) => void } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) => {
  const [local, setLocal] = useState(value);
  useEffect(() => { setLocal(value); }, [value]);
  useEffect(() => {
    const t = setTimeout(() => { if (local !== value) onChange(local); }, 600);
    return () => clearTimeout(t);
  }, [local, value, onChange]);
  return <input {...props} value={local} onChange={(e) => setLocal(e.target.value)} />;
};

const FooterEditor = () => {
  const { content, updateFooter, addFooterLink, updateFooterLink, removeFooterLink } = useSiteContent();
  const { footer } = content;

  const handleAddLink = useCallback(() => {
    addFooterLink({ label: "New Link", url: "#" });
  }, [addFooterLink]);

  const inputClass = "w-full h-9 px-3 bg-surface-container border border-outline-variant/30 rounded-lg font-body text-sm text-foreground focus:outline-none focus:border-primary/50";

  return (
    <div className="space-y-8">
      <h2 className="font-headline text-xl text-foreground">Footer Settings</h2>

      {/* Copyright */}
      <div className="space-y-2">
        <label className="font-body text-xs text-muted-foreground uppercase tracking-wider">Copyright Text</label>
        <DebouncedInput
          value={footer.copyrightText}
          onChange={(v) => updateFooter({ copyrightText: v })}
          placeholder="© 2024 Company Name"
          className={inputClass}
        />
      </div>

      {/* Links */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-body text-xs text-muted-foreground uppercase tracking-wider">Footer Links</label>
          <button onClick={handleAddLink}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-body hover:bg-primary/90 transition-colors">
            <Plus size={14} /> Add Link
          </button>
        </div>

        <div className="space-y-3">
          {footer.links.map((link) => (
            <div key={link.id} className="ghost-border rounded-lg bg-surface-container-low p-4 flex gap-4 items-center">
              <div className="flex-1 grid grid-cols-2 gap-3">
                <DebouncedInput
                  value={link.label}
                  onChange={(v) => updateFooterLink(link.id!, { label: v })}
                  placeholder="Link label"
                  className={inputClass}
                />
                <DebouncedInput
                  value={link.url}
                  onChange={(v) => updateFooterLink(link.id!, { url: v })}
                  placeholder="https://..."
                  className={inputClass}
                />
              </div>
              <button onClick={() => removeFooterLink(link.id!)}
                className="text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {footer.links.length === 0 && (
            <p className="text-sm text-muted-foreground font-body text-center py-4">No footer links yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FooterEditor;
