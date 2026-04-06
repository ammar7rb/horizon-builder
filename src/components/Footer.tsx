import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-outline-variant/20 px-6 md:px-10 py-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Link
          to="/"
          className="font-headline text-xs font-semibold tracking-[0.15em] text-foreground uppercase"
        >
          Horizon General Trading
        </Link>

        <div className="flex items-center gap-6 text-muted-foreground">
          <a
            href="#"
            className="font-body text-[11px] tracking-wider uppercase hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="font-body text-[11px] tracking-wider uppercase hover:text-foreground transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="font-body text-[11px] tracking-wider uppercase hover:text-foreground transition-colors"
          >
            Terms of Service
          </a>
        </div>

        <p className="font-body text-[11px] text-muted-foreground">
          © 2024 Horizon General Trading. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
