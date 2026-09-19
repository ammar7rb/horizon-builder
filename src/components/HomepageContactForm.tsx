import { useState } from "react";
import { Phone, Send } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { supabase } from "@/integrations/supabase/client";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_LINK,
  CONTACT_WHATSAPP_LINK,
} from "@/lib/contactDetails";
import { toast } from "sonner";

const HomepageContactForm = () => {
  const { content } = useSiteContent();
  const contact = content.contact;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

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
          message: form.message.trim(),
        },
      });

      if (error) throw error;
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
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

        <div className="rounded-xl border border-outline-variant/20 bg-[#111111] p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="h-11 px-4 bg-[#1a1a1a] border border-white/10 rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="h-11 px-4 bg-[#1a1a1a] border border-white/10 rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={sending}
              className="h-11 px-8 bg-primary text-primary-foreground font-body text-xs tracking-wider uppercase rounded-xl hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
            >
              <Send size={14} />
              {sending ? "Sending…" : "Send Message"}
            </button>
          </form>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-white/10 pt-6">
            <div>
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-primary/70 mb-1">
                Prefer to talk directly?
              </p>
              <a
                href={CONTACT_PHONE_LINK}
                className="font-headline text-base text-foreground transition-colors hover:text-primary"
              >
                {CONTACT_PHONE_DISPLAY}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <a
                aria-label={`Call ${CONTACT_PHONE_DISPLAY}`}
                href={CONTACT_PHONE_LINK}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 text-primary transition-all hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <Phone aria-hidden="true" size={16} />
              </a>
              <a
                aria-label={`Chat on WhatsApp with ${CONTACT_PHONE_DISPLAY}`}
                href={CONTACT_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-primary/30 px-4 font-body text-xs font-medium tracking-wider uppercase text-primary transition-all hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageContactForm;
