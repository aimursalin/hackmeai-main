import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const solutions = [
  "Submit any design request via your dashboard.",
  "Assign to designers specialized in your exact industry.",
  "Track progress in real time with clear task stages.",
  "Receive high-quality designs within 24–48 hours.",
  "All for one predictable monthly subscription."
];

const SolutionSection = () => {
  return (
    <section className="py-24 px-6 bg-background relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(139,92,246,0.05)_0%,_transparent_50%)]" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="glass-surface p-12 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl relative"
         >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none rounded-[3rem]" />
            
            <div className="inline-block border border-indigo-500/30 text-indigo-400 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider mb-6 bg-indigo-500/5 backdrop-blur-sm shadow-[0_0_15px_rgba(99,102,241,0.15)] uppercase">
              The Solution
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 tracking-tight leading-tight">
              A Creative Team <br className="block sm:hidden" />
              <span className="italic font-light opacity-90">Without the Hiring.</span>
            </h2>

            <div className="flex flex-col gap-4 max-w-lg mx-auto text-left">
               {solutions.map((item, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
                     className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                  >
                     <div className="mt-0.5">
                        <CheckCircle2 className="w-5 h-5 text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
                     </div>
                     <p className="text-white/80 font-medium tracking-wide">
                        {item}
                     </p>
                  </motion.div>
               ))}
            </div>
         </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
