import { motion } from "framer-motion";
import { Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const designers = [
  {
    role: "SaaS Product Designer",
    name: "Alex",
    rating: 5.0,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&auto=format&fit=crop",
    portfolio: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&h=250&auto=format&fit=crop",
    industries: ["SaaS", "B2B", "AI/ML"],
    available: true
  },
  {
    role: "Fintech UX Specialist",
    name: "Sarah",
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop",
    portfolio: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=400&h=250&auto=format&fit=crop",
    industries: ["Fintech", "Web3", "Banking"],
    available: true
  },
  {
    role: "Ecommerce UI Designer",
    name: "Marcus",
    rating: 5.0,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
    portfolio: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=400&h=250&auto=format&fit=crop",
    industries: ["Retail", "DTC", "Fashion"],
    available: false
  },
  {
    role: "Healthcare UX Lead",
    name: "Elena",
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop",
    portfolio: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=400&h=250&auto=format&fit=crop",
    industries: ["Healthtech", "MedTech", "Wellness"],
    available: true
  }
];

const DesignerMarketplace = () => {
  return (
    <section id="marketplace" className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.05)_0%,_transparent_50%)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
           <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white/30 mb-6">The Marketplace</p>
           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
             Work With Designers Who <br className="hidden md:block" />
             <span className="italic font-light opacity-80">Understand Your Industry</span>
           </h2>
           <p className="max-w-2xl mx-auto text-lg leading-relaxed text-white/50 font-medium">
             Don't settle for generic generalists. Get paired with specialists who already know the design patterns that convert in your specific market.
           </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {designers.map((designer, i) => (
              <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: i * 0.1 }}
                 className="glass-surface rounded-3xl overflow-hidden border border-white/5 group hover:border-white/10 transition-all hover:translate-y-[-4px] shadow-xl relative"
              >
                 {/* Portfolio Preview */}
                 <div className="h-40 w-full overflow-hidden relative bg-white/5">
                    <img src={designer.portfolio} alt={`${designer.role} portfolio`} className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                 </div>

                 <div className="p-6 pt-0 relative">
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-4 border-background absolute -top-8 left-6 bg-white/10 shadow-lg">
                       <img src={designer.image} alt={designer.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Status Badge */}
                    <div className="absolute -top-4 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider">
                       <span className={`w-1.5 h-1.5 rounded-full ${designer.available ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                       {designer.available ? <span className="text-emerald-400">Available</span> : <span className="text-amber-400">Booked</span>}
                    </div>

                    <div className="mt-12">
                       <h3 className="text-lg font-bold text-white mb-1">{designer.role}</h3>
                       
                       <div className="flex items-center gap-2 mb-4">
                          <div className="flex text-amber-500">
                             <Star className="w-3.5 h-3.5 fill-current" />
                             <Star className="w-3.5 h-3.5 fill-current" />
                             <Star className="w-3.5 h-3.5 fill-current" />
                             <Star className="w-3.5 h-3.5 fill-current" />
                             <Star className="w-3.5 h-3.5 fill-current" />
                          </div>
                          <span className="text-sm font-semibold text-white/90">{designer.rating}</span>
                          <span className="text-xs text-white/40">({designer.reviews})</span>
                       </div>

                       <div className="space-y-3 pt-4 border-t border-white/5">
                          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Industries Served</p>
                          <div className="flex flex-wrap gap-2">
                             {designer.industries.map((ind, j) => (
                                <span key={j} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-semibold text-white/70">
                                   {ind}
                                </span>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>
              </motion.div>
           ))}
        </div>

        <div className="mt-12 text-center">
           <Button variant="outline" className="rounded-full bg-white/5 hover:bg-white/10 border-white/10 text-white font-medium">
              View All 40+ Specialists
           </Button>
        </div>
      </div>
    </section>
  );
};

export default DesignerMarketplace;
