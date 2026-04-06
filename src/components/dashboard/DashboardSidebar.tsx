import { Settings, Image, FileText, Users, Phone } from "lucide-react";

export type DashboardSection = "general" | "hero" | "articles" | "about" | "contact";

const sections: { id: DashboardSection; label: string; icon: React.ElementType }[] = [
  { id: "general", label: "General", icon: Settings },
  { id: "hero", label: "Hero Slides", icon: Image },
  { id: "articles", label: "Articles", icon: FileText },
  { id: "about", label: "About Page", icon: Users },
  { id: "contact", label: "Contact Page", icon: Phone },
];

interface Props {
  active: DashboardSection;
  onSelect: (s: DashboardSection) => void;
}

const DashboardSidebar = ({ active, onSelect }: Props) => (
  <aside className="w-56 shrink-0 border-r border-outline-variant/20 bg-surface-container-low min-h-screen p-4 space-y-1">
    <h2 className="font-headline text-sm font-semibold text-foreground tracking-wider uppercase px-3 py-3 mb-2">
      Dashboard
    </h2>
    {sections.map((s) => (
      <button
        key={s.id}
        onClick={() => onSelect(s.id)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-colors ${
          active === s.id
            ? "bg-primary/15 text-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-surface-container"
        }`}
      >
        <s.icon size={16} />
        {s.label}
      </button>
    ))}
  </aside>
);

export default DashboardSidebar;
