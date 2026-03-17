import { motion } from "framer-motion";
import { Zap, Clock, CalendarDays } from "lucide-react";

const SpeedSection = () => {
  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
         >
           <div className="inline-flex items-center gap-2 border border-emerald-500/30 text-emerald-400 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider mb-6 bg-emerald-500/5 backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.15)] uppercase">
              <Zap className="w-3.5 h-3.5 fill-current" /> Speed as a Feature
           </div>
           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
             Ship Designs Faster <br className="hidden md:block" />
             <span className="italic font-light opacity-80">Than Your Competitors</span>
           </h2>
         </motion.div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* The Agencies */}
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.1 }}
               className="glass-surface p-8 rounded-3xl border border-rose-500/10 opacity-70 flex flex-col items-center text-center relative overflow-hidden"
            >
               <div className="absolute inset-x-0 top-0 h-1 bg-rose-500/20" />
               <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mb-6">
                  <CalendarDays className="w-5 h-5 text-rose-400" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Traditional Agencies</h3>
               <div className="text-3xl font-black text-white/50 mb-4 tracking-tighter">3-4 Weeks</div>
               <p className="text-sm text-white/40 font-medium">For a single landing page because of endless meetings and bloated processes.</p>
            </motion.div>

            {/* Dominance */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.2 }}
               className="glass-surface p-8 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 flex flex-col items-center text-center relative overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.1)] transform md:-translate-y-4"
            >
               <div className="absolute inset-x-0 top-0 h-1 bg-emerald-500" />
               <div className="absolute top-0 right-0 p-4 opacity-20"><Zap className="w-24 h-24 text-emerald-500" /></div>
               
               <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-6 relative z-10 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                  <Zap className="w-8 h-8 text-emerald-400 fill-current" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Dominance Team</h3>
               <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="text-4xl lg:text-5xl font-black text-white tracking-tighter shadow-black drop-shadow-lg">24-48</div>
                  <div className="text-left leading-tight">
                     <div className="font-bold text-emerald-400">HOURS</div>
                     <div className="text-[10px] text-white/60 uppercase tracking-widest">Average</div>
                  </div>
               </div>
               <p className="text-sm text-white/70 font-medium relative z-10 leading-relaxed">
                  Our teams work inside a heavily optimized, asynchronous queue. You request, we ship.
               </p>
            </motion.div>

            {/* Freelancers */}
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.3 }}
               className="glass-surface p-8 rounded-3xl border border-amber-500/10 opacity-70 flex flex-col items-center text-center relative overflow-hidden"
            >
               <div className="absolute inset-x-0 top-0 h-1 bg-amber-500/20" />
               <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-6">
                  <Clock className="w-5 h-5 text-amber-400" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Random Freelancers</h3>
               <div className="text-3xl font-black text-white/50 mb-4 tracking-tighter">Unreliable</div>
               <p className="text-sm text-white/40 font-medium">Juggling 5 other clients, meaning your delivery time is whenever they get around to it.</p>
            </motion.div>
         </div>
      </div>
    </section>
  );
};

export default SpeedSection;
