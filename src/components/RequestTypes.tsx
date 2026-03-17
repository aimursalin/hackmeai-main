import { motion } from "framer-motion";
import { Layout, Smartphone, AppWindow, BarChart, PenTool, Mail, Share2, Target } from "lucide-react";

const RequestTypes = () => {
  const requests = [
    { name: "Landing pages", icon: <Layout className="w-5 h-5 text-indigo-400" /> },
    { name: "Product UI/UX", icon: <Smartphone className="w-5 h-5 text-blue-400" /> },
    { name: "Website design", icon: <AppWindow className="w-5 h-5 text-emerald-400" /> },
    { name: "Dashboards", icon: <BarChart className="w-5 h-5 text-purple-400" /> },
    { name: "Ad creatives", icon: <Target className="w-5 h-5 text-rose-400" /> },
    { name: "Email graphics", icon: <Mail className="w-5 h-5 text-amber-400" /> },
    { name: "Social media assets", icon: <Share2 className="w-5 h-5 text-sky-400" /> },
    { name: "Conversion optimization", icon: <PenTool className="w-5 h-5 text-teal-400" /> },
  ];

  return (
    <section className="py-24 px-6 bg-[#03000a] border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
         >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Everything Your Team Needs, <br className="hidden md:block" />
              <span className="italic font-light opacity-80 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Designed.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg leading-relaxed text-white/50 font-medium">
              If you can request it, we can design it. Submit unlimited requests and we'll work through them one by one.
            </p>
         </motion.div>

         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {requests.map((req, i) => (
               <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="glass-surface p-5 rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-3 text-center hover:bg-white/5 transition-colors group"
               >
                  <div className="w-12 h-12 rounded-full bg-white/[0.03] flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                     {req.icon}
                  </div>
                  <span className="text-sm font-semibold text-white/80">{req.name}</span>
               </motion.div>
            ))}
         </div>

         <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center"
         >
            <p className="text-sm text-indigo-200">
               <strong className="text-indigo-400 font-bold uppercase tracking-wider text-xs mr-2">Note:</strong> 
               Large projects like full UI/UX revamps are broken down into smaller, daily deliverables so you always see progress without scope creep fear.
            </p>
         </motion.div>
      </div>
    </section>
  );
};

export default RequestTypes;
