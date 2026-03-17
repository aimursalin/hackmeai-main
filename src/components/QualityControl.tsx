import { motion } from "framer-motion";
import { ShieldCheck, Search, Users } from "lucide-react";

const QualityControl = () => {
  return (
    <section className="py-24 px-6 bg-[#03000a] text-center border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
           <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
             Unlimited Doesn't Mean <br className="hidden md:block" />
             <span className="italic font-light opacity-80 text-rose-300">Low Quality</span>
           </h2>
           <p className="max-w-2xl mx-auto text-lg leading-relaxed text-white/50 font-medium mb-16">
             Fast execution is useless if the design fails to convert. We've built quality control directly into our pipeline.
           </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center"
           >
              <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
                 <ShieldCheck className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Strict QA Layer</h3>
              <p className="text-sm text-white/50 leading-relaxed font-medium">
                 Every design passes through an internal quality assurance checklist before it ever reaches your dashboard.
              </p>
           </motion.div>

           <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center"
           >
              <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
                 <Search className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Senior Reviews</h3>
              <p className="text-sm text-white/50 leading-relaxed font-medium">
                 Designers don't work in silos. Our Senior Design Leads review critical project files to ensure top-tier standards.
              </p>
           </motion.div>

           <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center"
           >
              <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                 <Users className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Industry Specialists</h3>
              <p className="text-sm text-white/50 leading-relaxed font-medium">
                 A healthcare app requires a different approach than an eCommerce site. Your tasks go to specialists in your niche.
              </p>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QualityControl;
