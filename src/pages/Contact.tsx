import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MapPin, Clock } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const { content } = useSiteContent();
  const contact = content.contact;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForm({ name: "", email: "", subject: "", message: "" });
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
            {contact.email && (
              <div>
                <h3 className="font-headline text-sm font-medium text-foreground mb-1">Email</h3>
                <p className="font-body text-sm text-muted-foreground">{contact.email}</p>
              </div>
            )}
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
            <button type="submit" className="h-11 px-8 bg-primary text-primary-foreground font-body text-xs tracking-wider uppercase rounded-xl hover:bg-primary/90 transition-all duration-300">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
