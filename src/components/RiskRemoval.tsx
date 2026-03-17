import { motion } from "framer-motion";
import { ShieldCheck, CalendarClock, PauseCircle, FileX } from "lucide-react";
import { Button } from "@/components/ui/button";

const RiskRemoval = () => {
  return (
    <section className="py-24 px-6 bg-[#03000a] text-center border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(244,63,94,0.05)_0%,_transparent_60%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="glass-surface p-12 md:p-16 rounded-[3rem] border border-white/10 shadow-[0_0_50px_rgba(244,63,94,0.05)] relative"
        >
           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
             Try It <span className="italic font-light opacity-90 text-rose-300">Risk Free</span>
           </h2>
           <p className="text-lg text-white/50 mb-12 max-w-xl mx-auto font-medium">
             We know committing to a new design team is scary. That's why we've removed all the friction.
           </p>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="flex flex-col items-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                    <CalendarClock className="w-5 h-5 text-rose-400" />
                 </div>
                 <span className="text-sm font-semibold text-white/80">3-Day Free Trial</span>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <PauseCircle className="w-5 h-5 text-white/60" />
                 </div>
                 <span className="text-sm font-semibold text-white/80">Pause Anytime</span>
              </div>

              <div className="flex flex-col items-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-white/60" />
                 </div>
                 <span className="text-sm font-semibold text-white/80">Cancel Anytime</span>
              </div>

              <div className="flex flex-col items-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <FileX className="w-5 h-5 text-white/60" />
                 </div>
                 <span className="text-sm font-semibold text-white/80">No Contracts</span>
              </div>
           </div>

           <Button 
               size="lg"
               className="h-14 px-8 text-base font-bold bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.2)] rounded-xl"
               onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
               Start Your Free Trial
            </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default RiskRemoval;
