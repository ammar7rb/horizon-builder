import { Phone } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_LINK,
  CONTACT_WHATSAPP_LINK,
} from "@/lib/contactDetails";

const HomepageContactForm = () => {
  return (
    <section className="py-24 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">
            Get in Touch
          </p>
          <h2 className="font-headline text-2xl md:text-3xl font-light text-foreground">
            Contact Us Directly
          </h2>
        </div>

        <div className="rounded-xl border border-outline-variant/20 bg-[#111111] p-8 md:p-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
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
