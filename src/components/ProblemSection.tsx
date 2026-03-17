import { motion } from "framer-motion";
import { Clock, UserX, DollarSign, RefreshCcw } from "lucide-react";

const problems = [
  {
    icon: <Clock className="w-6 h-6 text-rose-400" />,
    title: "Hiring takes months",
    description: "Sifting through portfolios, interviewing, and onboarding slows your growth to a halt."
  },
  {
    icon: <UserX className="w-6 h-6 text-amber-400" />,
    title: "Freelancers disappear",
    description: "Unreliable communication, missed deadlines, and sudden mid-project ghosting."
  },
  {
    icon: <DollarSign className="w-6 h-6 text-emerald-400" />,
    title: "Agencies cost $10k+",
    description: "Bloated retainers, long minimum contracts, and paying for account managers you don't need."
  },
  {
    icon: <RefreshCcw className="w-6 h-6 text-purple-400" />,
    title: "Management chaos",
    description: "Juggling multiple freelancers, tools, and Slack channels becomes a full-time job."
  }
];

const ProblemSection = () => {
  return (
    <section className="py-24 px-6 bg-[#03000a] relative border-t border-white/5">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />
      
      <div className="max-w-5xl mx-auto">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
         >
            <div className="inline-block border border-rose-500/30 text-rose-400 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider mb-6 bg-rose-500/5 backdrop-blur-sm shadow-[0_0_15px_rgba(244,63,94,0.15)] uppercase">
              The Reality
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Design shouldn't slow <br className="hidden md:block" />
              <span className="italic font-light text-white/80">your company down.</span>
            </h2>
         </motion.div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-surface p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors"
              >
                 <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
                    {problem.icon}
                 </div>
                 <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                    {problem.icon}
                 </div>
                 <h3 className="text-lg font-bold text-white mb-3 tracking-wide">{problem.title}</h3>
                 <p className="text-sm text-white/50 leading-relaxed font-medium">
                    {problem.description}
                 </p>
              </motion.div>
            ))}
         </div>

         <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 text-center"
         >
            <p className="text-xl md:text-2xl font-medium text-white/80 tracking-wide">
               Growing companies need design <strong className="text-white font-bold">every week</strong>, <br className="hidden sm:block" />not once per quarter.
            </p>
         </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
