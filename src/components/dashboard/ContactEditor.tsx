import { useSiteContent } from "@/contexts/SiteContentContext";

const ContactEditor = () => {
  const { content, updateContact } = useSiteContent();
  const contact = content.contact;

  const inputClass = "w-full h-10 px-3 bg-surface-container border border-outline-variant/30 rounded-lg font-body text-sm text-foreground focus:outline-none focus:border-primary/50";

  return (
    <div className="space-y-8">
      <h2 className="font-headline text-xl text-foreground">Contact Page</h2>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="font-body text-xs text-muted-foreground">Tagline</label>
          <input value={contact.tagline} onChange={(e) => updateContact({ tagline: e.target.value })} className={inputClass} />
        </div>
        <div className="space-y-1">
          <label className="font-body text-xs text-muted-foreground">Title</label>
          <input value={contact.title} onChange={(e) => updateContact({ title: e.target.value })} className={inputClass} />
        </div>
        <div className="space-y-1">
          <label className="font-body text-xs text-muted-foreground">Description</label>
          <input value={contact.description} onChange={(e) => updateContact({ description: e.target.value })} className={inputClass} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-headline text-base text-foreground">Contact Info</h3>
        <div className="space-y-1">
          <label className="font-body text-xs text-muted-foreground">Email</label>
          <input value={contact.email} onChange={(e) => updateContact({ email: e.target.value })} className={inputClass} />
        </div>
        <div className="space-y-1">
          <label className="font-body text-xs text-muted-foreground">Office</label>
          <input value={contact.office} onChange={(e) => updateContact({ office: e.target.value })} className={inputClass} />
        </div>
        <div className="space-y-1">
          <label className="font-body text-xs text-muted-foreground">Availability</label>
          <input value={contact.availability} onChange={(e) => updateContact({ availability: e.target.value })} className={inputClass} />
        </div>
      </div>
    </div>
  );
};

export default ContactEditor;
