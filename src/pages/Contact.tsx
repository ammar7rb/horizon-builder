import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const CONTACT_PHONE_DISPLAY = "+1 929 762 2246";
const CONTACT_PHONE_E164 = "+19297622246";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.04 2a9.84 9.84 0 0 0-8.34 15.08L2 22l5.02-1.66A9.93 9.93 0 0 0 12.04 22c5.45 0 9.88-4.43 9.88-9.88 0-2.64-1.03-5.13-2.9-7A9.8 9.8 0 0 0 12.04 2Zm0 18.15c-1.55 0-3.07-.42-4.39-1.2l-.31-.19-2.98.99 1-2.9-.2-.3a8.03 8.03 0 0 1-1.23-4.43C3.93 7.65 7.57 4 12.05 4a8.06 8.06 0 0 1 5.74 2.39 8.06 8.06 0 0 1 2.38 5.75c-.01 4.46-3.65 8.11-8.13 8.11Zm4.45-6.08c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.25-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.35-1.69-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.43.12-.14.16-.24.24-.41.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.47-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.85.83-.85 2.03 0 1.2.87 2.36.99 2.52.12.16 1.72 2.62 4.16 3.68.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.28Z"
    />
  </svg>
);

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const { content } = useSiteContent();
  const contact = content.contact;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setSending(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: form.name.trim(),
          email: form.email.trim(),
          message: `${form.subject ? `[${form.subject.trim()}] ` : ""}${form.message.trim()}`,
        },
      });
      if (error) throw error;
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-12 px-6 md:px-10 max-w-4xl mx-auto">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-primary/70 mb-4">{contact.tagline}</p>
        <h1 className="font-headline text-3xl md:text-5xl font-light text-foreground mb-5">{contact.title}</h1>
        <p className="font-body text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">{contact.description}</p>
      </section>

      <section className="px-6 md:px-10 max-w-4xl mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-start gap-3">
              <div className="flex items-center gap-2 pt-0.5 text-primary/80">
                <a
                  aria-label={`Call ${CONTACT_PHONE_DISPLAY}`}
                  className="rounded-md transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  href={`tel:${CONTACT_PHONE_E164}`}
                >
                  <Phone aria-hidden="true" size={16} />
                </a>
                <a
                  aria-label={`Chat on WhatsApp with ${CONTACT_PHONE_DISPLAY}`}
                  className="rounded-md transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  href={`https://wa.me/${CONTACT_PHONE_E164.slice(1)}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                </a>
              </div>
              <div>
                <h3 className="font-headline text-sm font-medium text-foreground mb-1">Phone &amp; WhatsApp</h3>
                <a
                  className="font-body text-sm text-muted-foreground transition-colors hover:text-primary"
                  href={`tel:${CONTACT_PHONE_E164}`}
                >
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </div>
            </div>
            {contact.office && (
              <div>
                <h3 className="font-headline text-sm font-medium text-foreground mb-1">Office</h3>
                <p className="font-body text-sm text-muted-foreground">{contact.office}</p>
              </div>
            )}
            {contact.availability && (
              <div>
                <h3 className="font-headline text-sm font-medium text-foreground mb-1">Availability</h3>
                <p className="font-body text-sm text-muted-foreground">{contact.availability}</p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input type="text" placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                className="h-10 px-4 bg-surface-container border border-outline-variant/30 rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors" />
              <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
                className="h-10 px-4 bg-surface-container border border-outline-variant/30 rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors" />
            </div>
            <input type="text" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required
              className="w-full h-10 px-4 bg-surface-container border border-outline-variant/30 rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors" />
            <textarea placeholder="Your Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5}
              className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none" />
            <button type="submit" disabled={sending} className="h-11 px-8 bg-primary text-primary-foreground font-body text-xs tracking-wider uppercase rounded-xl hover:bg-primary/90 transition-all duration-300 disabled:opacity-50">
              {sending ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
