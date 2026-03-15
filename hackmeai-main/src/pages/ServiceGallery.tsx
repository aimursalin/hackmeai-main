import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X, Briefcase, TrendingUp, Award, Palette, Layout, Globe, Megaphone, Sparkles, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services, type Designer } from "@/data/services";
import confetti from "canvas-confetti";
import { toast } from "sonner";

const serviceIcons: Record<string, React.ElementType> = {
  "graphic-design": Palette,
  "ui-ux-design": Layout,
  "web-design": Globe,
  "ads-design": Megaphone,
};

const gradients = [
  "from-blue-500/20 to-purple-600/20",
  "from-emerald-500/20 to-teal-600/20",
  "from-orange-500/20 to-red-600/20",
  "from-pink-500/20 to-rose-600/20",
  "from-violet-500/20 to-indigo-600/20",
  "from-cyan-500/20 to-blue-600/20",
  "from-amber-500/20 to-yellow-600/20",
  "from-lime-500/20 to-green-600/20",
  "from-fuchsia-500/20 to-pink-600/20",
  "from-sky-500/20 to-cyan-600/20",
  "from-rose-500/20 to-orange-600/20",
  "from-teal-500/20 to-emerald-600/20",
];

const ServiceGallery = () => {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  const [selectedDesigners, setSelectedDesigners] = useState<string[]>([]);
  const [showDesigners, setShowDesigners] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Service not found.</p>
      </div>
    );
  }

  const ServiceIcon = serviceIcons[service.id] || Palette;

  const toggleDesigner = (id: string) => {
    setSelectedDesigners((prev) => {
      if (prev.includes(id)) return []; // unselect if already selected
      return [id]; // Replace selection entirely with one item
    });
  };

  // Generate default or custom portfolio items
  const portfolioItems = service.portfolio
    ? service.portfolio.map((item, i) => ({
        ...item,
        aspect: item.aspect || (i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-square" : "aspect-[3/4]"),
        gradient: "",
      }))
    : Array.from({ length: 12 }, (_, i) => {
        const w = (i % 3 === 0) ? 800 : (i % 3 === 1) ? 800 : 600;
        const h = (i % 3 === 0) ? 1000 : (i % 3 === 1) ? 800 : 800;
        return {
          id: i + 1,
          title: `${service.title} Project ${i + 1}`,
          image: `https://picsum.photos/seed/${service.id}-${i}/${w}/${h}`,
          aspect: i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-square" : "aspect-[3/4]",
          gradient: "",
        };
      });

  const handleConfirmDesigners = () => {
    setShowDesigners(false);
    setTimeout(() => {
      setShowCheckout(true);
    }, 400);
  };

  const fireEliteConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#FFFFFF", "#CCCCCC", "#999999", "#E5E4E2", "#D4AF37"]
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#FFFFFF", "#CCCCCC", "#999999", "#E5E4E2", "#D4AF37"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleBooking = () => {
    fireEliteConfetti();
    toast.success("Welcome to Dominance.", {
      description: "An elite representative will be with you shortly to onboard your designers.",
      position: "top-center",
      duration: 5000,
    });
    setTimeout(() => {
      setShowCheckout(false);
      setSelectedDesigners([]);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors" aria-label="Go back to home">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-sm">Back</span>
          </Link>
          <h1 className="text-sm font-medium text-foreground">{service.title}</h1>
          <Button
            variant="superior"
            size="sm"
            className="h-9 px-5 text-xs"
            onClick={() => setShowDesigners(true)}
            id="select-designers-btn"
          >
            Select Designers
            {selectedDesigners.length > 0 && (
              <span className="ml-2 bg-background/20 px-2 py-0.5 rounded-full text-[10px]">
                {selectedDesigners.length}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {portfolioItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="break-inside-avoid"
              >
                <div className={`glass-surface-hover rounded-2xl overflow-hidden cursor-pointer group ${item.aspect}`}>
                  <div className={`w-full h-full flex items-center justify-center relative ${item.image ? "bg-muted" : `bg-gradient-to-br ${item.gradient}`}`}>
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        {/* Decorative pattern */}
                        <div className="absolute inset-0 opacity-[0.03]" style={{
                          backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
                          backgroundSize: "24px 24px",
                        }} />
                        <div className="text-center p-6 relative z-10">
                          <ServiceIcon className="w-8 h-8 text-foreground/20 mx-auto mb-3" strokeWidth={1} />
                          <p className="text-xs text-muted-foreground/60 mb-1 tabular-nums">#{String(item.id).padStart(2, '0')}</p>
                          <p className="text-sm font-medium text-foreground/60">{item.title}</p>
                        </div>
                      </>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">Click to view details</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Designer Selection Modal */}
      <AnimatePresence>
        {showDesigners && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm p-6"
            onClick={() => setShowDesigners(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="glass-surface rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Select Your Designer</h3>
                  <p className="text-sm text-muted-foreground mt-1">Choose an exclusive designer for your project</p>
                </div>
                <button
                  onClick={() => setShowDesigners(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close designer selection"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.designers.map((designer) => {
                  const isSelected = selectedDesigners.includes(designer.id);
                  return (
                    <motion.button
                      key={designer.id}
                      onClick={() => toggleDesigner(designer.id)}
                      className={`relative text-left rounded-2xl p-5 transition-all duration-200 ${
                        isSelected
                          ? "ring-2 ring-accent bg-accent/[0.06]"
                          : "bg-white/[0.03] hover:bg-white/[0.06]"
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-accent flex items-center justify-center"
                        >
                          <Check className="w-3.5 h-3.5 text-accent-foreground" strokeWidth={2.5} />
                        </motion.div>
                      )}

                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-white/[0.08] flex items-center justify-center text-sm font-medium text-foreground">
                          {designer.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{designer.name}</p>
                          <p className="text-xs text-muted-foreground">{designer.role}</p>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground mb-4">{designer.bio}</p>

                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 tabular-nums">
                          <Briefcase className="w-3 h-3" strokeWidth={1.5} />
                          {designer.activeProjects} active
                        </span>
                        <span className="flex items-center gap-1 tabular-nums">
                          <TrendingUp className="w-3 h-3" strokeWidth={1.5} />
                          {designer.successRate}%
                        </span>
                        <span className="flex items-center gap-1 tabular-nums">
                          <Award className="w-3 h-3" strokeWidth={1.5} />
                          {designer.completedProjects}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {selectedDesigners.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <Button variant="superior" size="lg" className="w-full" onClick={handleConfirmDesigners}>
                    Confirm Selected Designer
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Elite Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-background/90 backdrop-blur-md p-6"
            onClick={() => setShowCheckout(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative gradient-border rounded-3xl p-10 max-w-lg w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Opulent Backdrop Polish */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.08)_0%,_transparent_60%)] pointer-events-none" />

              <button
                onClick={() => setShowCheckout(false)}
                className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors z-10"
                aria-label="Close checkout"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>

              <div className="relative z-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-6 shadow-glow">
                  <Sparkles className="w-8 h-8 text-foreground" strokeWidth={1.5} />
                </div>
                
                <h2 className="text-3xl font-light text-foreground mb-3 tracking-tight">
                  Designers Secured
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[85%] mx-auto mb-8 font-light">
                  You have elected {selectedDesigners.length} premier talents.
                  This level of craft will command authority within your niche.
                </p>

                <div className="w-full flex justify-center mb-10 gap-[-10px]">
                   {selectedDesigners.map((id, index) => {
                      const d = service.designers.find((desc) => desc.id === id);
                      if (!d) return null;
                      return (
                        <div 
                          key={d.id} 
                          className="w-12 h-12 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center text-xs font-medium text-foreground z-10"
                          style={{ marginLeft: index > 0 ? "-12px" : "0", zIndex: 10 - index }}
                        >
                          {d.avatar}
                        </div>
                      )
                   })}
                </div>

                <div className="w-full flex gap-4 mt-2">
                   <Button variant="superior" size="lg" className="w-full relative overflow-hidden group py-6 text-sm tracking-wide" onClick={handleBooking}>
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                     Initialize Booking <MoveRight className="ml-3 w-4 h-4" />
                   </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceGallery;
