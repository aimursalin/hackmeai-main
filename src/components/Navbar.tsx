import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.1;
      setScrolled(window.scrollY > scrollThreshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const navLinks = [
    { title: "Work", href: "#services" },
    { title: "Services", href: "#services" },
    { title: "About", href: "#about" },
    { title: "FAQ", href: "#faq" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 grid grid-cols-3 items-center">
        {/* Logo — left */}
        <Link 
          to="/" 
          className="text-foreground font-semibold tracking-tight text-lg justify-self-start"
          onClick={handleLogoClick}
        >
          Dominance<span className="text-muted-foreground font-light ml-1">Digital</span>
        </Link>

        {/* Navigation links — center */}
        <div className="hidden md:flex items-center justify-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.title}
              onClick={() => scrollTo(link.href)}
              className="relative px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:text-[#fa2a65] rounded-lg group"
            >
              {link.title}
              <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#fa2a65] rounded-full transition-all duration-300 group-hover:w-4/5" />
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3 justify-self-end">
          <Link to="/portal">
            <Button variant="glass" size="sm" className="h-9 px-4 text-xs">
              Client Portal
            </Button>
          </Link>
          <Link to="/portal/admin">
            <Button variant="glass" size="sm" className="h-9 px-4 text-xs border-white/10 hover:border-[#fa2a65]/30 hover:text-[#fa2a65]">
              Admin
            </Button>
          </Link>
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Button 
              variant="superior" 
              size="sm" 
              className="h-9 px-5 text-xs" 
              onClick={() => scrollTo("#pricing")}
            >
              Get Started
            </Button>
          </motion.div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-foreground justify-self-end" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"}>
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
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.title}
                  onClick={() => scrollTo(link.href)}
                  className="block w-full text-left text-sm text-white hover:text-[#fa2a65] transition-colors py-3 px-2 rounded-lg hover:bg-white/[0.03]"
                >
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
                  <Button variant="glass" size="sm" className="w-full border-white/10">
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
