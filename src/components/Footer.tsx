import { Link } from "react-router-dom";

import { toast } from "sonner";

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.href = `/#${id}`;
  }
};

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Subscribed successfully", { description: "Welcome to our daily newsletter." });
  };
  return (
    <footer className="border-t border-white/[0.04] pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link 
              to="/" 
              className="text-foreground font-semibold tracking-tight text-lg"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  scrollTo("hero");
                }
              }}
            >
              Dominance<span className="text-muted-foreground font-light ml-1">Digital</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Superior design for those who dominate their niche. Crafted with obsessive precision.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-medium text-foreground uppercase tracking-[0.15em] mb-4">Services</h4>
            <ul className="space-y-2.5">
              {["Graphic Design", "UI/UX Design", "Web Design", "Ads Design"].map((s) => (
                <li key={s}>
                  <Link
                    to={`/services/${s.toLowerCase().replace(/[\/\s]+/g, "-")}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-medium text-foreground uppercase tracking-[0.15em] mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About", action: () => scrollTo("about") },
                { label: "Our Team", action: () => scrollTo("team") },
                { label: "Pricing", action: () => scrollTo("pricing") },
                { label: "FAQ", action: () => scrollTo("faq") },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={item.action}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/career" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Career
                </Link>
              </li>
              <li>
                <Link to="/career/intern" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Intern
                </Link>
              </li>
              <li>
                <Link to="/portal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Client Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-medium text-foreground uppercase tracking-[0.15em] mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
                <li key={link}>
                  <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
           <div>
             <h4 className="text-xs font-medium text-foreground uppercase tracking-[0.15em] mb-4">Newsletter</h4>
             <p className="text-sm text-muted-foreground mb-4">Subscribe for daily design inspiration and elite insights.</p>
             <form onSubmit={handleSubscribe} className="space-y-2">
               <input 
                 type="email" 
                 placeholder="Enter your email" 
                 required
                 className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent/40 text-foreground transition-colors" 
               />
               <button type="submit" className="w-full bg-white/[0.06] hover:bg-white/[0.1] text-foreground rounded-xl px-4 py-2.5 text-sm transition-colors border border-transparent hover:border-white/[0.08]">
                 Subscribe Us
               </button>
             </form>
           </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Dominance Digital. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: "Twitter / X", href: "#" },
              { label: "Dribbble", href: "#" },
              { label: "LinkedIn", href: "#" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.label}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
