import { motion } from "framer-motion";
import { Star, Play, MessageSquare, Layout, BarChart3, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const FloatingCard = ({ delay, yOffset, xOffset, duration, className, children }: any) => (
  <motion.div
    initial={{ opacity: 0, y: yOffset + 30, x: xOffset }}
    animate={{ opacity: 1, y: [yOffset, yOffset - 20, yOffset], x: xOffset }}
    transition={{
      opacity: { duration: 0.8, delay },
      y: { duration, repeat: Infinity, ease: "easeInOut", delay: delay * 0.2 }
    }}
    className={`absolute hidden lg:block z-0 pointer-events-none ${className}`}
  >
    <div className="glass-surface p-4 rounded-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-md bg-white/[0.04]">
      {children}
    </div>
  </motion.div>
);

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.15)_0%,_transparent_60%)] pointer-events-none" />
      
      {/* Ethereal Relaxing Ambient Background (Spiritual, soothing aurora blobs) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center mix-blend-screen opacity-80">
         <motion.div 
            animate={{ 
               scale: [1, 1.25, 1],
               opacity: [0.3, 0.6, 0.3],
               rotate: [0, 90, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-blue-600/20 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[120px]"
         />
         <motion.div 
            animate={{ 
               scale: [1, 1.15, 1],
               opacity: [0.2, 0.5, 0.2],
               rotate: [0, -90, 0]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
            className="absolute top-20 -right-20 w-[700px] h-[700px] bg-indigo-500/20 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-[140px]"
         />
         <motion.div 
            animate={{ 
               scale: [1, 1.3, 1],
               opacity: [0.2, 0.4, 0.2],
               rotate: [0, 45, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-500/20 rounded-[50%] blur-[100px]"
         />
      </div>
      
      {/* --- Floating Elements (Elementary Mockups) --- */}
      <FloatingCard delay={0.2} yOffset={-120} xOffset={-450} duration={6} className="w-64 rotate-[-6deg]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center"><Layout className="w-4 h-4 text-accent" /></div>
          <div className="flex-1 h-3 rounded-full bg-white/10" />
        </div>
        <div className="space-y-2 mb-6">
          <div className="h-2 rounded-full bg-white/5 w-full" />
          <div className="h-2 rounded-full bg-white/5 w-4/5" />
          <div className="h-2 rounded-full bg-white/5 w-5/6" />
        </div>
        <div className="flex justify-between gap-2">
           <div className="h-20 w-full rounded-xl bg-gradient-to-br from-accent/20 to-transparent border border-white/5" />
           <div className="h-20 w-full rounded-xl bg-white/5 border border-white/5" />
        </div>
      </FloatingCard>

      <FloatingCard delay={0.4} yOffset={140} xOffset={-380} duration={7} className="w-56 rotate-[4deg]">
        <div className="w-full h-36 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/10 border border-white/5 mb-4 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite]" />
            <Play className="w-8 h-8 text-white/50" fill="currentColor" />
        </div>
        <div className="flex items-center justify-between">
           <div className="h-3 w-1/2 rounded-full bg-white/10" />
           <div className="flex -space-x-2">
               <div className="w-6 h-6 rounded-full bg-zinc-700 border-2 border-[hsl(var(--surface))]" />
               <div className="w-6 h-6 rounded-full bg-zinc-600 border-2 border-[hsl(var(--surface))]" />
               <div className="w-6 h-6 rounded-full bg-zinc-500 border-2 border-[hsl(var(--surface))]" />
           </div>
        </div>
      </FloatingCard>

      <FloatingCard delay={0.3} yOffset={-140} xOffset={420} duration={5.5} className="w-60 rotate-[8deg]">
         <div className="flex items-end gap-2 h-24 mb-6">
            <div className="w-1/4 h-[60%] bg-white/10 rounded-t-md" />
            <div className="w-1/4 h-[80%] bg-accent/30 rounded-t-md relative overflow-hidden"><div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10" /></div>
            <div className="w-1/4 h-full bg-accent text-accent-foreground rounded-t-md relative shadow-[0_0_15px_rgba(var(--accent),0.4)]">
               <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[11px] font-bold text-white tracking-widest">+86%</div>
            </div>
            <div className="w-1/4 h-[40%] bg-white/10 rounded-t-md" />
         </div>
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white/40" />
            </div>
            <div className="flex-1 space-y-2">
               <div className="h-2 w-full rounded-full bg-white/10" />
               <div className="h-2 w-2/3 rounded-full bg-white/5" />
            </div>
         </div>
      </FloatingCard>

      <FloatingCard delay={0.5} yOffset={100} xOffset={380} duration={6.5} className="w-64 rotate-[-5deg]">
         <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="h-24 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-white/5 rounded-xl" />
            <div className="h-24 bg-gradient-to-br from-rose-500/20 to-orange-500/10 border border-white/5 rounded-xl" />
         </div>
         <div className="h-3 w-3/4 bg-white/10 rounded-full mx-auto" />
      </FloatingCard>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center w-full"
        >
          {/* Top Rating Pill */}
          <div className="flex items-center gap-3 glass-surface rounded-full px-5 py-2 mb-8 cursor-default hover:bg-white/[0.08] transition-colors border border-white/10">
             <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-[10px] font-bold text-white shadow-lg z-20">C</div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center text-[10px] font-bold text-white shadow-lg z-10">G</div>
             </div>
             <div className="flex items-center gap-1.5 border-l border-white/10 pl-3">
                <span className="text-sm font-semibold text-foreground">4.9</span>
                <div className="flex text-amber-500">
                   <Star className="w-3.5 h-3.5 fill-current" />
                   <Star className="w-3.5 h-3.5 fill-current" />
                   <Star className="w-3.5 h-3.5 fill-current" />
                   <Star className="w-3.5 h-3.5 fill-current" />
                   <Star className="w-3.5 h-3.5 fill-current text-amber-500/40" />
                </div>
             </div>
          </div>

          <p className="text-base md:text-lg font-medium text-foreground/80 tracking-wide mb-6">
             Leading UI/UX & Social Media Ads Design Agency
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold leading-[1.1] tracking-tight text-foreground mb-8 max-w-4xl mx-auto">
            We <span className="italic font-light opacity-90">Design</span> Products That<br /> Drive <span className="bg-white text-background px-4 py-1 rounded-2xl inline-block -rotate-2 ml-2 shadow-[0_0_30px_rgba(255,255,255,0.3)]">Results</span>
          </h1>

          <div className="flex flex-col items-center gap-3 mb-12">
             <div className="flex items-center gap-4 text-xs font-medium text-foreground/40 uppercase tracking-[0.2em]">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                Onboarding Live Clients
             </div>
             <AnimatedTooltip items={[
                {
                  id: 1,
                  name: "Alex Mercer",
                  designation: "CTO @ Nexus",
                  image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&h=100&auto=format&fit=crop",
                },
                {
                  id: 2,
                  name: "Sarah Miller",
                  designation: "Founder @ Relaxy",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&h=100&auto=format&fit=crop",
                },
                {
                  id: 3,
                  name: "Michael Chen",
                  designation: "CEO @ Yenex",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop",
                },
                {
                   id: 4,
                   name: "Sofia G",
                   designation: "Design @ Esdiac",
                   image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&auto=format&fit=crop",
                 },
                 {
                   id: 5,
                   name: "Neil Saidi",
                   designation: "PM @ Plate",
                   image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop",
                 }
             ]} />
          </div>

          {/* Countries Pill */}
          <div className="flex items-center gap-3 glass-surface rounded-full px-6 py-2.5 mb-10 text-sm text-foreground/80 border border-white/10 shadow-lg">
             <span className="text-lg">🇺🇸 🇦🇪 🇦🇺 🇮🇹</span>
             <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
             <span className="tracking-wide">Designing across 8+ countries</span>
             <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
             <span className="text-lg">🇮🇩 🇦🇹 🇿🇦 🇧🇩</span>
          </div>

          <div className="flex justify-center w-full relative z-20">
            <div className="relative group">
              <GlowingEffect
                spread={40}
                glow
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                className="rounded-2xl"
              />
              <Button 
                 variant="default" 
                 className="relative h-14 px-8 text-sm md:text-base font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all ease-out duration-300 rounded-xl group overflow-hidden" 
                 onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                <MessageSquare className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Get Your Pass Now
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default Hero;
