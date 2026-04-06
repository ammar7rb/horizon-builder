import { Link } from "react-router-dom";
import { useSiteContent } from "@/contexts/SiteContentContext";

const Footer = () => {
  const { content } = useSiteContent();
  const { footer, config } = content;

  return (
    <footer className="border-t border-outline-variant/20 px-6 md:px-10 py-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Link
          to="/"
          className="font-headline text-xs font-semibold tracking-[0.15em] text-foreground uppercase"
        >
          {config.logoText || "Horizon General Trading"}
        </Link>

        {footer.links.length > 0 && (
          <div className="flex items-center gap-6 text-muted-foreground">
            {footer.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="font-body text-[11px] tracking-wider uppercase hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        <p className="font-body text-[11px] text-muted-foreground">
          {footer.copyrightText}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
