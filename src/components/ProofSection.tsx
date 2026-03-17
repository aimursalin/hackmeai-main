import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Zap, Target } from "lucide-react";

const industries = [
  {
    id: "travel",
    name: "Triply",
    title: "Travel Booking Platform",
    description: "Complete UI/UX overhaul for a global travel booking engine, focusing on simplifying the complex multi-city search flow.",
    stats: [
      { label: "Conversion Rate", value: "+42%", icon: <TrendingUp className="w-4 h-4 text-emerald-400" /> },
      { label: "Launch Speed", value: "3x Faster", icon: <Zap className="w-4 h-4 text-amber-400" /> },
    ],
    ceo: { name: "Shubho Al-Farooque", org: "CEO", avatar: "SA" },
    color: "bg-[#9ba1ff]", 
    textColor: "text-[#1e1e1e]",
  },
  {
    id: "saas",
    name: "Yenex",
    title: "Energy Analytics Dashboard",
    description: "Designed a complex data visualization dashboard for B2B energy managers to track and reduce carbon footprints across facilities.",
    stats: [
      { label: "User Retention", value: "+28%", icon: <Target className="w-4 h-4 text-blue-400" /> },
      { label: "Time to Value", value: "-45%", icon: <Zap className="w-4 h-4 text-amber-400" /> },
    ],
    ceo: { name: "Ted Nash", org: "Founder", avatar: "TN" },
    color: "bg-[#fcdca1]",
    textColor: "text-[#1e1e1e]",
  }
];

const ProofSection = () => {
  return (
    <section className="py-32 px-6 bg-background relative z-20 overflow-hidden">
      {/* Top Metrics Bar */}
      <div className="max-w-6xl mx-auto mb-20 relative z-10">
         <div className="glass-surface p-8 rounded-3xl border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y divide-white/5 md:divide-y-0 md:divide-x">
            <div className="flex flex-col items-center justify-center text-center px-4 pt-4 md:pt-0">
               <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">42%</div>
               <p className="text-sm text-white/50 font-medium">Average conversion lift</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4 pt-8 md:pt-0">
               <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">3x</div>
               <p className="text-sm text-white/50 font-medium">Faster launch cycles</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4 pt-8 md:pt-0">
               <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">50+</div>
               <p className="text-sm text-white/50 font-medium">Startups supported</p>
            </div>
         </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-16 text-center"
        >
          <div className="inline-block border border-blue-500/30 text-blue-400 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider mb-6 bg-blue-500/5 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.15)] uppercase">
            Proven Results
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1]">
            Real Impact for <br />
            <span className="italic font-light text-foreground/80">Real Companies</span>
          </h2>
        </motion.div>

        {/* Stacking Cards Container */}
        <div className="relative pb-20">
          {industries.map((ind, i) => (
            <div
              key={ind.id}
              className="sticky"
              style={{ top: `calc(15vh + ${i * 45}px)`, marginBottom: "40px" }}
            >
              <div 
                className={`w-full ${ind.color} ${ind.textColor} rounded-[2rem] p-6 lg:p-10 shadow-2xl transition-transform duration-500 hover:scale-[1.01] border border-black/5`}
                style={{ 
                   boxShadow: "0 -20px 40px rgba(0,0,0,0.3), 0 20px 40px rgba(0,0,0,0.2)",
                   transformOrigin: "top center"
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  
                  {/* Content Side */}
                  <div>
                    <h3 className="text-sm font-black tracking-widest uppercase mb-4 opacity-50">{ind.name}</h3>
                    <h4 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight leading-tight">{ind.title}</h4>
                    <p className="text-base opacity-80 leading-relaxed mb-8 max-w-sm font-medium">
                      {ind.description}
                    </p>

                    <div className="grid grid-cols-2 gap-6 mb-10 bg-black/5 p-6 rounded-2xl border border-black/5">
                      {ind.stats.map((stat) => (
                        <div key={stat.label}>
                          <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-2">{stat.label}</p>
                          <div className="flex items-center gap-2">
                             {stat.icon}
                             <p className="text-2xl font-black">{stat.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div 
                      className="flex items-center justify-between group cursor-pointer"
                      onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center font-bold text-sm shadow-inner">
                          {ind.ceo.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-sm">
                            {ind.ceo.name}
                          </p>
                          <p className="text-xs font-bold opacity-50 uppercase tracking-widest mt-0.5">{ind.ceo.org}</p>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                         <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all text-black" />
                      </div>
                    </div>
                  </div>

                  {/* Visual Side */}
                  <div className="relative h-full min-h-[400px] w-full bg-black/5 rounded-3xl overflow-hidden flex items-center justify-center p-6 border border-black/5 shadow-inner">
                    <div className="w-full h-full bg-black/10 rounded-2xl shadow-2xl relative overflow-hidden backdrop-blur-md border border-black/10 flex items-center justify-center">
                       <span className="font-bold text-black/30 text-sm uppercase tracking-widest">{ind.name} Product View</span>
                       
                       {/* Subtle UI Accents */}
                       <div className="absolute top-4 left-4 right-4 h-4 border-b border-black/10 flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-black/20" />
                          <div className="w-2.5 h-2.5 rounded-full bg-black/20" />
                          <div className="w-2.5 h-2.5 rounded-full bg-black/20" />
                       </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
