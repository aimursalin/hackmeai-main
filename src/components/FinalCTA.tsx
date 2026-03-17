import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-black font-sans">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(79,70,229,0.15)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-10 shadow-[0_0_50px_rgba(99,102,241,0.2)]">
             <Zap className="w-8 h-8 text-indigo-400 fill-current" />
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.05]">
            Stop Managing Freelancers.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300 italic font-light">Start Shipping Designs.</span>
          </h2>
          
          <p className="text-xl md:text-2xl font-medium text-white/50 max-w-2xl mx-auto mb-12">
             Join 50+ growing companies scaling their creative output without adding headcount.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto h-16 px-10 rounded-xl text-lg font-bold bg-white text-black hover:bg-white/90 shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all hover:scale-105"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm font-bold uppercase tracking-widest text-white/30">
             <span>✓ No contracts</span>
             <span>✓ Cancel anytime</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
