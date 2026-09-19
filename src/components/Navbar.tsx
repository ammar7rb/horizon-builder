import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { CONTACT_WHATSAPP_LINK } from "@/lib/contactDetails";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Articles", path: "/articles" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { content } = useSiteContent();
  const { config } = content;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const Logo = () =>
    config.logoType === "image" && config.logoImage ? (
      <img src={config.logoImage} alt="Logo" className="h-7 object-contain" />
    ) : (
      <span className="font-headline text-sm font-semibold tracking-[0.15em] text-foreground uppercase">
        {config.logoText}
      </span>
    );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-outline-variant/30" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
        <Link to="/"><Logo /></Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}
              className={`font-body text-xs tracking-wider uppercase transition-colors duration-300 ${
                location.pathname === link.path ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >{link.label}</Link>
          ))}
        </div>

        <a
          href={CONTACT_WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center justify-center h-9 px-5 text-xs font-medium tracking-wider uppercase border border-primary/40 text-primary rounded-xl hover:bg-primary/10 transition-all duration-300"
        >WhatsApp</a>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground p-1" aria-label="Toggle menu">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-outline-variant/20 px-6 pb-6 pt-4 space-y-4">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}
              className={`block font-body text-sm tracking-wider uppercase transition-colors ${
                location.pathname === link.path ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >{link.label}</Link>
          ))}
          <a
            href={CONTACT_WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-9 px-5 text-xs font-medium tracking-wider uppercase border border-primary/40 text-primary rounded-xl hover:bg-primary/10 transition-all duration-300 mt-2"
          >WhatsApp</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
