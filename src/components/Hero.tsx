import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 bg-[#03000a]">
      {/* Ambient Blur Gradient Animation — bottom-left to upper viewport */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Primary gradient blob — anchored bottom-left, sweeps upward ~35% */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1.03, 1],
            opacity: [0.55, 0.75, 0.6, 0.55],
            x: [0, 15, -10, 0],
            y: [0, -20, -5, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[10%] -left-[10%] w-[55vw] h-[60vh]"
          style={{
            background: "radial-gradient(ellipse at 20% 80%, #fa2a65 0%, #c2185b 30%, #4a0011 60%, transparent 85%)",
            filter: "blur(100px)",
            borderRadius: "50%",
          }}
        />

        {/* Secondary bloom — slightly higher, wider spread for diffusion */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1.05, 1],
            opacity: [0.35, 0.55, 0.4, 0.35],
            x: [0, 25, 10, 0],
            y: [0, -30, -10, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[5%] -left-[5%] w-[50vw] h-[50vh]"
          style={{
            background: "radial-gradient(ellipse at 30% 70%, #e91e63 0%, #880e4f 35%, #1a0008 65%, transparent 90%)",
            filter: "blur(120px)",
            borderRadius: "50%",
          }}
        />

        {/* Tertiary haze — softest layer, gives depth and color bleed toward center */}
        <motion.div
          animate={{
            scale: [1, 1.06, 1],
            opacity: [0.2, 0.38, 0.2],
            rotate: [0, 3, -2, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute bottom-[0%] left-[0%] w-[65vw] h-[55vh]"
          style={{
            background: "radial-gradient(ellipse at 25% 75%, #ff4081 0%, #ad1457 25%, #2c0014 55%, transparent 80%)",
            filter: "blur(140px)",
            borderRadius: "50%",
          }}
        />

        {/* Faint warm edge — subtle warm tone creeping along the bottom edge */}
        <motion.div
          animate={{
            opacity: [0.12, 0.25, 0.15, 0.12],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-[15%] left-[10%] w-[45vw] h-[30vh]"
          style={{
            background: "radial-gradient(ellipse at 40% 90%, #d32f2f 0%, #6a0020 40%, transparent 75%)",
            filter: "blur(110px)",
            borderRadius: "50%",
          }}
        />

        {/* ═══ TOP-RIGHT ACCENT GRADIENT (#a265df purple) ═══ */}
        {/* Primary accent blob — top-right corner */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1.04, 1],
            opacity: [0.45, 0.65, 0.5, 0.45],
            x: [0, -18, 8, 0],
            y: [0, 22, 6, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -top-[12%] -right-[10%] w-[50vw] h-[55vh]"
          style={{
            background: "radial-gradient(ellipse at 80% 20%, #a265df 0%, #7b3aaf 28%, #2d0050 55%, transparent 82%)",
            filter: "blur(110px)",
            borderRadius: "50%",
          }}
        />
        {/* Secondary accent diffusion — top-right spread */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.25, 0.45, 0.25],
            rotate: [0, -3, 2, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute -top-[5%] -right-[5%] w-[55vw] h-[50vh]"
          style={{
            background: "radial-gradient(ellipse at 75% 25%, #b87ae0 0%, #6a1b9a 30%, #1a0033 60%, transparent 88%)",
            filter: "blur(130px)",
            borderRadius: "50%",
          }}
        />
        {/* Faint accent edge — top-right purple bleed */}
        <motion.div
          animate={{
            opacity: [0.1, 0.22, 0.12, 0.1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute -top-[10%] right-[5%] w-[40vw] h-[35vh]"
          style={{
            background: "radial-gradient(ellipse at 70% 30%, #ce93d8 0%, #7b1fa2 35%, transparent 75%)",
            filter: "blur(120px)",
            borderRadius: "50%",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center w-full"
        >
          <h1 className="text-5xl md:text-7xl lg:text-[6rem] leading-[1.05] tracking-tight text-white mb-6 w-full mx-auto">
            <span className="font-light">We</span>{" "}
            <motion.span
              className="font-bold text-white px-6 py-1 rounded-3xl inline-block relative overflow-hidden"
              style={{ rotate: "-2deg", background: "#a265df" }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(162,101,223,0.4), 0 0 60px rgba(162,101,223,0.15)",
                  "0 0 35px rgba(162,101,223,0.7), 0 0 80px rgba(162,101,223,0.3)",
                  "0 0 20px rgba(162,101,223,0.4), 0 0 60px rgba(162,101,223,0.15)",
                ],
                scale: [1, 1.03, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Shimmer sweep overlay */}
              <motion.span
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
              />
              <span className="relative z-10">Design</span>
            </motion.span>{" "}
            <br />
            <span className="font-bold">Products</span> <span className="font-light">That</span> <br />
            <span className="font-bold">Drive</span>{" "}
            <motion.span
              className="font-bold text-white px-6 py-1 rounded-3xl inline-block mt-2 relative"
              style={{ rotate: "2deg", background: "#fa2a65" }}
            >
              Results
            </motion.span>
          </h1>

          <p className="text-base md:text-lg font-normal text-white/60 tracking-wide mb-10 max-w-2xl mx-auto leading-relaxed">
             We help ambitious businesses tell their story, strengthen their presence, and connect with their audience through strategic media and cutting-edge design.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full relative z-20">
            {/* Primary CTA — Get your 1-day free trial */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative group"
            >
              {/* Animated glow pulse behind button */}
              <motion.div
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.15, 1],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-[#fa2a65]/40 blur-xl pointer-events-none group-hover:bg-[#fa2a65]/60 transition-colors"
              />
              <Button 
                className="relative w-full sm:w-auto h-13 px-10 text-sm md:text-base font-bold transition-all ease-out duration-300 rounded-full bg-[#fa2a65] hover:bg-[#e0235a] text-white shadow-[0_0_30px_rgba(250,42,101,0.4)] hover:shadow-[0_0_45px_rgba(250,42,101,0.6)]" 
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get your 1-day free trial
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Secondary CTA — Show your work */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button 
                variant="outline" 
                className="w-full sm:w-auto h-13 px-10 text-sm md:text-base font-semibold transition-all ease-out duration-300 rounded-full bg-transparent text-white border border-white/20 hover:border-[#fa2a65]/50 hover:bg-[#fa2a65]/10 hover:text-white backdrop-blur-sm" 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="w-4 h-4 mr-2 fill-current" />
                Show your work
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.4 }}
           className="mt-24 flex flex-col items-center w-full"
        >
           <p className="text-white/60 text-sm font-medium mb-8 tracking-wide">
              Trusted by scrappy startups & breakout brands alike
           </p>
           
           <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
              {/* Mock Logoipsum SVGs */}
              {[1, 2, 3, 4, 5].map((i) => (
                 <div key={i} className="flex items-center gap-2 grayscale brightness-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                       <path d="M12 2L2 7l10 5 10-5-10-5z" />
                       <path d="M2 17l10 5 10-5" />
                       <path d="M2 12l10 5 10-5" />
                    </svg>
                    <span className="text-white font-bold text-lg tracking-tight">Logoipsum</span>
                 </div>
              ))}
           </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#03000a] to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default Hero;
