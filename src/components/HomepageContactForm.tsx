import { useState } from "react";
import { Mail } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { toast } from "sonner";

const HomepageContactForm = () => {
  const { content } = useSiteContent();
  const contact = content.contact;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.email) {
      toast.error("Contact email not configured");
      return;
    }

    setSending(true);
    try {
      const mailtoLink = `mailto:${contact.email}?subject=New message from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
      )}`;
      window.open(mailtoLink, "_blank");
      toast.success("Opening your email client…");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="py-24 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">
            Get in Touch
          </p>
          <h2 className="font-headline text-2xl md:text-3xl font-light text-foreground">
            Send Us a Message
          </h2>
        </div>

        <div className="ghost-border rounded-xl bg-surface-container-low p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="h-10 px-4 bg-surface-container border border-outline-variant/30 rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="h-10 px-4 bg-surface-container border border-outline-variant/30 rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
              className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
            />
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={sending}
                className="h-11 px-8 bg-primary text-primary-foreground font-body text-xs tracking-wider uppercase rounded-xl hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
              >
                <Mail size={14} />
                Send Message
              </button>
              {contact.email && (
                <span className="font-body text-xs text-muted-foreground">
                  → {contact.email}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HomepageContactForm;
