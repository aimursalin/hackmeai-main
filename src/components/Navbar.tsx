import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LayoutGrid, Tag, Info, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/${href}`;
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navTabs = [
    { title: "Services", icon: LayoutGrid, onClick: () => scrollTo("#services") },
    { title: "Pricing", icon: Tag, onClick: () => scrollTo("#pricing") },
    { title: "About", icon: Info, onClick: () => scrollTo("#about") },
    { title: "FAQ", icon: HelpCircle, onClick: () => scrollTo("#faq") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-foreground font-semibold tracking-tight text-lg"
          onClick={handleLogoClick}
        >
          Dominance<span className="text-muted-foreground font-light ml-1">Digital</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <ExpandableTabs tabs={navTabs} className="bg-transparent border-none p-0" />
          
          <div className="h-6 w-px bg-white/10 mx-2" />

          <div className="flex items-center gap-2">
            <Link to="/portal">
              <Button variant="glass" size="sm" className="h-9 px-4 text-xs">
                Client Portal
              </Button>
            </Link>
            <Link to="/portal/admin">
              <Button variant="glass" size="sm" className="h-9 px-4 text-xs border-accent/20 hover:bg-accent/5">
                Admin
              </Button>
            </Link>
            <Button variant="superior" size="sm" className="h-9 px-5 text-xs" onClick={() => scrollTo("#pricing")}>
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/[0.04]"
          >
            <div className="px-6 py-6 space-y-4">
              {navTabs.map((link) => (
                <button
                  key={link.title}
                  onClick={link.onClick}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-left"
                >
                  <link.icon size={18} />
                  {link.title}
                </button>
              ))}
              <div className="pt-4 flex flex-col gap-2">
                <Link to="/portal" onClick={() => setMobileOpen(false)}>
                  <Button variant="glass" size="sm" className="w-full">
                    Client Portal
                  </Button>
                </Link>
                <Link to="/portal/admin" onClick={() => setMobileOpen(false)}>
                  <Button variant="glass" size="sm" className="w-full border-accent/20">
                    Admin
                  </Button>
                </Link>
                <Button variant="superior" size="sm" className="w-full" onClick={() => scrollTo("#pricing")}>
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
